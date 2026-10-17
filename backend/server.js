const express = require("express");
const cors = require("cors");
const path = require("path");
const { db } = require("./database");
const { extractKeywords, classifyOpinion, generateHeatPoint, aggregateStats } = require("./ai-engine");
const { processChat, generateReport, getSuggestedQuestions } = require("./ai-assistant");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

/* CORS — permissive by default so the demo also works when index.html is
   opened directly from the filesystem. Set CORS_ORIGIN (comma-separated)
   to restrict it, e.g. CORS_ORIGIN="http://localhost:3000" */
const CORS_ORIGIN = process.env.CORS_ORIGIN;
app.use(cors(CORS_ORIGIN ? { origin: CORS_ORIGIN.split(",").map(s => s.trim()) } : {}));
app.use(express.json({ limit: "64kb" }));

/* ---- Static frontend ------------------------------------------------
   express.static is mounted on the project root so index.html is served.
   The backend directory must stay unreachable: it holds the source code
   AND the SQLite database file (data/greenspace.db). This guard runs first. */
app.use((req, res, next) => {
  if (/^\/backend(\/|$)/i.test(req.path)) {
    return res.status(404).json({ error: "Not found" });
  }
  next();
});
app.use(express.static(path.join(__dirname, ".."), { dotfiles: "deny" }));
/* Static mount for /public — serves anchor photos and other assets.
   /public/anchor-photos/*.webp → /anchor-photos/*.webp in URLs. */
app.use("/anchor-photos", express.static(path.join(__dirname, "..", "public", "anchor-photos")));

/* ================================================================
   GET /api/zones  — return all green space zones
   ================================================================ */
app.get("/api/zones", (req, res) => {
  const rows = db.prepare(`
    SELECT id, name_en, name_zh_cn, name_zh_tw, type,
           type_label_en, type_label_zh_cn, type_label_zh_tw,
           area_en, area_zh_cn, area_zh_tw, status_key,
           desc_en, desc_zh_cn, desc_zh_tw,
           functions_en, functions_zh_cn, functions_zh_tw,
           coord_x, coord_y, attention
    FROM zones
  `).all();

  /* One grouped pass each, so the endpoint stays O(1) queries instead of
     two per zone. Opinion counts come from heat_points — the same rows the
     map and the dashboard table read — while submissions come from surveys. */
  const opRows = db.prepare(
    "SELECT zone_id, COUNT(*) as c FROM heat_points GROUP BY zone_id"
  ).all();
  const subRows = db.prepare(
    "SELECT zone_id, COUNT(*) as c, AVG(rating) as a FROM surveys GROUP BY zone_id"
  ).all();

  const opByZone = {}, subByZone = {};
  opRows.forEach(r => { opByZone[r.zone_id] = r.c; });
  subRows.forEach(r => { subByZone[r.zone_id] = r; });

  const zones = rows.map(r => {
    const sub = subByZone[r.id];
    return {
      ...r,
      functions_en: r.functions_en ? r.functions_en.split("|") : [],
      functions_zh_cn: r.functions_zh_cn ? r.functions_zh_cn.split("|") : [],
      functions_zh_tw: r.functions_zh_tw ? r.functions_zh_tw.split("|") : [],
      opinion_count: opByZone[r.id] || 0,
      /* null means "nobody has rated this zone yet" — a real 0 rating is
         impossible because the survey form only allows 1-5. */
      avg_satisfaction: (sub && sub.a !== null) ? parseFloat(sub.a.toFixed(1)) : null,
      submission_count: sub ? sub.c : 0,
    };
  });

  res.json({ zones });
});

/* ================================================================
   GET /api/zones/:id  — get single zone detail
   ================================================================ */
app.get("/api/zones/:id", (req, res) => {
  const zone = db.prepare("SELECT * FROM zones WHERE id = ?").get(req.params.id);
  if (!zone) return res.status(404).json({ error: "Zone not found" });

  zone.functions_en = zone.functions_en ? zone.functions_en.split("|") : [];
  zone.functions_zh_cn = zone.functions_zh_cn ? zone.functions_zh_cn.split("|") : [];
  zone.functions_zh_tw = zone.functions_zh_tw ? zone.functions_zh_tw.split("|") : [];

  /* Use heat_points for opinion_count (same as /api/zones) so the two
     endpoints never disagree. Surveys give us submission_count and avg. */
  zone.opinion_count = db.prepare("SELECT COUNT(*) as c FROM heat_points WHERE zone_id = ?").get(zone.id).c;
  zone.submission_count = db.prepare("SELECT COUNT(*) as c FROM surveys WHERE zone_id = ?").get(zone.id).c;
  const avg = db.prepare("SELECT AVG(rating) as a FROM surveys WHERE zone_id = ?").get(zone.id).a;
  zone.avg_satisfaction = avg ? parseFloat(avg.toFixed(1)) : 0;

  res.json({ zone });
});

/* ================================================================
   POST /api/surveys  — submit a survey
   body: { zone_id, rating, functions[], suggestion }
   ================================================================ */
app.post("/api/surveys", (req, res) => {
  const body = req.body || {};
  const { zone_id, rating, functions, suggestion } = body;

  /* ---- validation ---- */
  if (typeof zone_id !== "string" || !zone_id.trim())
    return res.status(400).json({ error: "zone_id must be a non-empty string" });

  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5)
    return res.status(400).json({ error: "rating must be an integer between 1 and 5" });

  let funcs = [];
  if (functions !== undefined && functions !== null) {
    if (!Array.isArray(functions))
      return res.status(400).json({ error: "functions must be an array" });
    funcs = functions
      .filter(f => typeof f === "string" && f.trim())
      .map(f => f.trim().slice(0, 60))
      .slice(0, 20);
  }

  let text = "";
  if (suggestion !== undefined && suggestion !== null) {
    if (typeof suggestion !== "string")
      return res.status(400).json({ error: "suggestion must be a string" });
    text = suggestion.trim().slice(0, 2000);
  }

  const zone = db.prepare("SELECT * FROM zones WHERE id = ?").get(zone_id);
  if (!zone) return res.status(404).json({ error: "Zone not found" });

  const opinionType = classifyOpinion(ratingNum, text, funcs);
  const keywords = extractKeywords(text);
  /* De-duplicate: a ticked function may already have been matched from the
     free text (e.g. "儿童" -> func.children), which would otherwise store the
     same keyword twice. */
  funcs.forEach(f => { if (!keywords.includes(f)) keywords.push(f); });

  /* ---- atomic write: survey + heat point ----
     Wrapped in a transaction so a failure never leaves an orphan survey
     without its heat point (or vice versa). */
  const writeSurvey = db.transaction(() => {
    const result = db.prepare(`
      INSERT INTO surveys (zone_id, rating, functions, suggestion, opinion_type, keywords)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      zone_id,
      ratingNum,
      JSON.stringify(funcs),
      text,
      opinionType,
      JSON.stringify(keywords)
    );

    const heatPoint = generateHeatPoint(
      { opinion_type: opinionType, suggestion: text, keywords },
      zone
    );

    db.prepare(`
      INSERT INTO heat_points (zone_id, x, y, radius, intensity, type, text_en, text_zh_cn, text_zh_tw, tag, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'survey')
    `).run(
      heatPoint.zone_id, heatPoint.x, heatPoint.y, heatPoint.radius,
      heatPoint.intensity, heatPoint.type,
      heatPoint.text_en, heatPoint.text_zh_cn, heatPoint.text_zh_tw,
      heatPoint.tag
    );

    return { surveyId: result.lastInsertRowid, heatPoint };
  });

  const { surveyId, heatPoint } = writeSurvey();

  const totalSurveys = db.prepare("SELECT COUNT(*) as c FROM surveys").get().c;
  const todayNew = db.prepare(`
    SELECT COUNT(*) as c FROM surveys
    WHERE date(created_at) = date('now')
  `).get().c;

  res.json({
    success: true,
    survey_id: surveyId,
    opinion_type: opinionType,
    keywords,
    total_surveys: totalSurveys,
    today_new: todayNew,
    heat_point: heatPoint,
  });
});

/* ================================================================
   GET /api/heatmap  — get aggregated opinion heat points
   query: ?type=all|positive|improve|concern|function
   ================================================================ */
app.get("/api/heatmap", (req, res) => {
  const type = req.query.type || "all";
  let rows;
  if (type === "all") {
    rows = db.prepare(`
      SELECT hp.*, z.name_en, z.name_zh_cn, z.name_zh_tw
      FROM heat_points hp
      JOIN zones z ON z.id = hp.zone_id
      ORDER BY hp.intensity DESC
    `).all();
  } else {
    rows = db.prepare(`
      SELECT hp.*, z.name_en, z.name_zh_cn, z.name_zh_tw
      FROM heat_points hp
      JOIN zones z ON z.id = hp.zone_id
      WHERE hp.type = ?
      ORDER BY hp.intensity DESC
    `).all(type);
  }

  const total = rows.length;
  const byType = { positive: 0, improve: 0, concern: 0, function: 0 };
  rows.forEach(r => { if (byType[r.type] !== undefined) byType[r.type]++; });

  res.json({
    total,
    type_counts: byType,
    points: rows,
  });
});

/* ================================================================
   GET /api/dashboard  — get dashboard statistics
   ================================================================ */
app.get("/api/dashboard", (req, res) => {
  const stats = aggregateStats(db);
  const todayNew = db.prepare(`
    SELECT COUNT(*) as c FROM surveys
    WHERE date(created_at) = date('now')
  `).get().c;

  /* ---- opinion aggregates --------------------------------------------
     `heat_points` IS the opinion dataset: one row per aggregated opinion,
     whether it came from the seed baseline or from a resident submission.
     The dashboard, the pie chart, the per-zone opinion counts and the heat
     map therefore all read the same rows and can never disagree.
     `surveys` only supplies submission-level facts: how many people
     submitted, when, and what they rated. */
  const hpRows = db.prepare("SELECT zone_id, type, tag, source FROM heat_points").all();

  const totalOpinions = hpRows.length;
  const opTypeCount = { positive: 0, improve: 0, concern: 0, function: 0 };
  const opTypePercent = { positive: 0, improve: 0, concern: 0, function: 0 };
  const zoneOpinions = {};
  const tagCount = {};
  const funcCount = {};

  hpRows.forEach(r => {
    if (opTypeCount[r.type] !== undefined) opTypeCount[r.type]++;
    zoneOpinions[r.zone_id] = (zoneOpinions[r.zone_id] || 0) + 1;
    if (r.tag) tagCount[r.tag] = (tagCount[r.tag] || 0) + 1;
  });

  /* ---- function-demand distribution (the pie chart) -------------------
     A heat point carries only ONE tag. When a resident's free text matches a
     keyword ("遮阳" -> tag.shade) that keyword takes the tag slot and pushes
     out the function they actually ticked — so the pie never moved even
     though the submission was saved. Read the ticked functions straight from
     `surveys` (the authoritative record, immune to the free text) and take
     only the SEED baseline from heat_points, so a submission is never
     counted twice. */
  hpRows.forEach(r => {
    if (r.source === "seed" && r.tag && r.tag.indexOf("func.") === 0)
      funcCount[r.tag] = (funcCount[r.tag] || 0) + 1;
  });
  db.prepare("SELECT functions FROM surveys").all().forEach(s => {
    let list;
    try { list = JSON.parse(s.functions || "[]"); } catch { list = []; }
    if (!Array.isArray(list)) return;
    list.forEach(f => {
      if (typeof f === "string" && f.indexOf("func.") === 0)
        funcCount[f] = (funcCount[f] || 0) + 1;
    });
  });

  if (totalOpinions > 0) {
    Object.keys(opTypePercent).forEach(k => {
      opTypePercent[k] = Math.round(opTypeCount[k] / totalOpinions * 100);
    });
  }

  /* Hot topics — count each tag individually.
     (The previous version grouped by the whole JSON array string, so two
     submissions with the same tags in a different order counted as two
     separate groups and never aggregated.) */
  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, c]) => ({ tag, c }));

  /* No opinions yet -> no hot topic. Returning a default tag here would
     make an empty database display a "most discussed" topic it never had. */
  const hotTopic = topTags.length > 0 ? topTags[0].tag : null;

  /* Per-zone row: opinion points from heat_points, submissions from surveys. */
  const zoneTable = stats.zone_stats.map(r => Object.assign({}, r, {
    opinions: zoneOpinions[r.id] || 0,
    submissions: r.survey_count || 0,
  }));

  /* Count survey-originated heat points so the dashboard can distinguish
     seed baseline opinions from real resident submissions. */
  const surveyHpCount = db.prepare("SELECT COUNT(*) as c FROM heat_points WHERE source = 'survey'").get().c;

  res.json({
    total_surveys: stats.total,
    total_opinions: totalOpinions,
    resident_opinions: surveyHpCount,   /* opinions that came from real survey submissions */
    today_new: todayNew,
    avg_rating: stats.avg_rating,
    active_zones: stats.active_zones,
    type_percent: opTypePercent,
    type_counts: opTypeCount,
    hot_topic: hotTopic,
    top_tags: topTags,
    func_distribution: funcCount,
    zone_table: zoneTable,
  });
});

/* ================================================================
   GET /api/anchors  — return all map site markers
   query: ?zone=z1  (optional — filter by zone_id)
   ================================================================ */
app.get("/api/anchors", (req, res) => {
  const zone = req.query.zone;
  let rows;
  if (zone) {
    rows = db.prepare(`
      SELECT id, zone_id, x, y, name, desc, source, caveat, images
      FROM anchors
      WHERE zone_id = ?
      ORDER BY id
    `).all(zone);
  } else {
    rows = db.prepare(`
      SELECT id, zone_id, x, y, name, desc, source, caveat, images
      FROM anchors
      ORDER BY zone_id, id
    `).all();
  }

  const anchors = rows.map(r => ({
    id: r.id,
    zone: r.zone_id,
    x: r.x,
    y: r.y,
    name: JSON.parse(r.name || "{}"),
    desc: JSON.parse(r.desc || "{}"),
    source: JSON.parse(r.source || "{}"),
    caveat: JSON.parse(r.caveat || "{}"),
    images: JSON.parse(r.images || "[]"),
  }));

  res.json({ anchors, total: anchors.length });
});

/* ================================================================
   GET /api/anchors/:zoneId  — return anchors for a specific zone
   ================================================================ */
app.get("/api/anchors/:zoneId", (req, res) => {
  const rows = db.prepare(`
    SELECT id, zone_id, x, y, name, desc, source, caveat, images
    FROM anchors
    WHERE zone_id = ?
    ORDER BY id
  `).all(req.params.zoneId);

  if (rows.length === 0)
    return res.status(404).json({ error: "No anchors found for this zone" });

  const anchors = rows.map(r => ({
    id: r.id,
    zone: r.zone_id,
    x: r.x,
    y: r.y,
    name: JSON.parse(r.name || "{}"),
    desc: JSON.parse(r.desc || "{}"),
    source: JSON.parse(r.source || "{}"),
    caveat: JSON.parse(r.caveat || "{}"),
    images: JSON.parse(r.images || "[]"),
  }));

  res.json({ anchors, total: anchors.length });
});

/* ================================================================
   POST /api/ai/chat  — AI assistant chat
   body: { message, lang }
   Returns: { answer, intent, tags, quickActions, dataSources, lang }
   ================================================================ */
app.post("/api/ai/chat", (req, res) => {
  const { message, lang } = req.body;

  if (!message || !message.trim())
    return res.status(400).json({ error: "message is required" });

  try {
    const result = processChat(db, message, lang || "zh-CN");
    res.json(result);
  } catch (err) {
    console.error("[AI Chat Error]", err);
    res.status(500).json({ error: "AI processing failed", detail: err.message });
  }
});

/* ================================================================
   POST /api/ai/report  — generate construction report
   body: { lang }
   Returns: { title, generatedAt, lang, sections, markdown, stats }
   ================================================================ */
app.post("/api/ai/report", (req, res) => {
  try {
    const { lang } = req.body || {};
    const report = generateReport(db, lang || "zh-CN");
    res.json(report);
  } catch (err) {
    console.error("[AI Report Error]", err);
    res.status(500).json({ error: "Report generation failed", detail: err.message });
  }
});

/* ================================================================
   GET /api/ai/suggest  — get suggested questions
   query: ?lang=zh-CN|en|zh-TW
   ================================================================ */
app.get("/api/ai/suggest", (req, res) => {
  const lang = req.query.lang || "zh-CN";
  const questions = getSuggestedQuestions(lang);
  res.json({ questions });
});

/* ================================================================
   404 + error handling
   ================================================================ */
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[Server Error]", err.message);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
});

/* ================================================================
   Start server
   ================================================================ */
app.listen(PORT, () => {
  console.log(`\n  GreenSpace NM API Server running at http://localhost:${PORT}`);
  console.log(`  Frontend: http://localhost:${PORT}/  (backend/ is blocked from static access)`);
  console.log(`  Endpoints:`);
  console.log(`    GET  /api/zones         - all green space zones`);
  console.log(`    GET  /api/zones/:id     - single zone detail`);
  console.log(`    GET  /api/anchors      - all map site markers`);
  console.log(`    GET  /api/anchors/:zid  - site markers by zone`);
  console.log(`    POST /api/surveys       - submit a survey`);
  console.log(`    GET  /api/heatmap       - opinion heat points`);
  console.log(`    GET  /api/dashboard     - dashboard statistics`);
  console.log(`    POST /api/ai/chat       - AI assistant chat`);
  console.log(`    POST /api/ai/report     - generate construction report`);
  console.log(`    GET  /api/ai/suggest    - suggested questions\n`);
});
