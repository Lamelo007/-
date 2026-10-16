const express = require("express");
const cors = require("cors");
const { db } = require("./database");
const { extractKeywords, classifyOpinion, generateHeatPoint, aggregateStats } = require("./ai-engine");
const { processChat, generateReport, getSuggestedQuestions } = require("./ai-assistant");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/.."));

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

  const zones = rows.map(r => ({
    ...r,
    functions_en: r.functions_en ? r.functions_en.split("|") : [],
    functions_zh_cn: r.functions_zh_cn ? r.functions_zh_cn.split("|") : [],
    functions_zh_tw: r.functions_zh_tw ? r.functions_zh_tw.split("|") : [],
    opinion_count: db.prepare("SELECT COUNT(*) as c FROM surveys WHERE zone_id = ?").get(r.id).c,
    avg_satisfaction: (() => {
      const avg = db.prepare("SELECT AVG(rating) as a FROM surveys WHERE zone_id = ?").get(r.id).a;
      return avg ? parseFloat(avg.toFixed(1)) : 0;
    })(),
  }));

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

  zone.opinion_count = db.prepare("SELECT COUNT(*) as c FROM surveys WHERE zone_id = ?").get(zone.id).c;
  const avg = db.prepare("SELECT AVG(rating) as a FROM surveys WHERE zone_id = ?").get(zone.id).a;
  zone.avg_satisfaction = avg ? parseFloat(avg.toFixed(1)) : 0;

  res.json({ zone });
});

/* ================================================================
   POST /api/surveys  — submit a survey
   body: { zone_id, rating, functions[], suggestion }
   ================================================================ */
app.post("/api/surveys", (req, res) => {
  const { zone_id, rating, functions, suggestion } = req.body;

  if (!zone_id) return res.status(400).json({ error: "zone_id is required" });
  if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: "rating must be 1-5" });

  const zone = db.prepare("SELECT * FROM zones WHERE id = ?").get(zone_id);
  if (!zone) return res.status(404).json({ error: "Zone not found" });

  const opinionType = classifyOpinion(rating, suggestion, functions);
  const keywords = extractKeywords(suggestion);
  if (functions && functions.length) keywords.push(...functions);

  const result = db.prepare(`
    INSERT INTO surveys (zone_id, rating, functions, suggestion, opinion_type, keywords)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    zone_id,
    rating,
    JSON.stringify(functions || []),
    suggestion || "",
    opinionType,
    JSON.stringify(keywords)
  );

  const heatPoint = generateHeatPoint(
    { opinion_type: opinionType, suggestion, keywords },
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

  const totalSurveys = db.prepare("SELECT COUNT(*) as c FROM surveys").get().c;
  const todayNew = db.prepare(`
    SELECT COUNT(*) as c FROM surveys
    WHERE date(created_at) = date('now')
  `).get().c;

  res.json({
    success: true,
    survey_id: result.lastInsertRowid,
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

  const funcDist = db.prepare(`
    SELECT functions FROM surveys
    WHERE functions IS NOT NULL AND functions != '[]'
  `).all();

  const funcCount = {};
  funcDist.forEach(r => {
    try {
      const arr = JSON.parse(r.functions);
      arr.forEach(f => { funcCount[f] = (funcCount[f] || 0) + 1; });
    } catch(e) {}
  });

  const topTags = db.prepare(`
    SELECT keywords, COUNT(*) as c FROM surveys
    WHERE keywords IS NOT NULL AND keywords != '[]'
    GROUP BY keywords
    ORDER BY c DESC
    LIMIT 5
  `).all();

  const hotTopic = topTags.length > 0
    ? (() => {
        try {
          const kws = JSON.parse(topTags[0].keywords);
          return kws[0] || "tag.shade";
        } catch(e) { return "tag.shade"; }
      })()
    : "tag.shade";

  res.json({
    total_surveys: stats.total,
    today_new: todayNew,
    avg_rating: stats.avg_rating,
    active_zones: stats.active_zones,
    type_percent: stats.type_percent,
    hot_topic: hotTopic,
    func_distribution: funcCount,
    zone_table: stats.zone_stats,
  });
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
   Start server
   ================================================================ */
app.listen(PORT, () => {
  console.log(`\n  GreenSpace NM API Server running at http://localhost:${PORT}`);
  console.log(`  Endpoints:`);
  console.log(`    GET  /api/zones         - all green space zones`);
  console.log(`    GET  /api/zones/:id     - single zone detail`);
  console.log(`    POST /api/surveys       - submit a survey`);
  console.log(`    GET  /api/heatmap       - opinion heat points`);
  console.log(`    GET  /api/dashboard     - dashboard statistics`);
  console.log(`    POST /api/ai/chat       - AI assistant chat`);
  console.log(`    POST /api/ai/report     - generate construction report`);
  console.log(`    GET  /api/ai/suggest     - suggested questions\n`);
});
