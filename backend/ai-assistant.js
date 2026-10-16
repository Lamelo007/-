/**
 * AI Assistant Backend Engine
 *
 * Uses real database data (zones, surveys, heat_points) to answer
 * visitor questions and generate construction-suggestion reports.
 *
 * Intents:
 *  1. overview      — aggregate platform statistics
 *  2. hot            — top trending topics
 *  3. zone           — zone-specific detail query
 *  4. compare        — multi-zone comparison
 *  5. satisfaction   — satisfaction analysis
 *  6. area           — zone area / size
 *  7. location       — where are the zones
 *  8. guide          — how to participate
 *  9. report         — trigger report generation
 *  10. fallback       — no-match default
 */

const { extractKeywords } = require("./ai-engine");

/* ---- i18n label maps ---- */
const TYPE_LABELS = {
  en:   { wetland: "Wetland", park: "Eco Park", reserve: "Conservation Reserve" },
  "zh-CN": { wetland: "湿地", park: "生态公园", reserve: "自然保育地" },
  "zh-TW": { wetland: "濕地", park: "生態公園", reserve: "自然保育地" },
};

const PRIORITY_LABELS = {
  en:     { high: "High", mid: "Medium", low: "Low" },
  "zh-CN": { high: "高", mid: "中", low: "低" },
  "zh-TW": { high: "高", mid: "中", low: "低" },
};

const STATUS_LABELS = {
  en:     { designated: "Designated", restoring: "Restoring", planning: "Planning" },
  "zh-CN": { designated: "已划定", restoring: "修复中", planning: "规划中" },
  "zh-TW": { designated: "已劃定", restoring: "修復中", planning: "規劃中" },
};

/* ---- zone name getter ---- */
function zoneName(zone, lang) {
  const k = lang === "en" ? "name_en" : lang === "zh-TW" ? "name_zh_tw" : "name_zh_cn";
  return zone[k] || zone.name_en;
}
function zoneTypeLabel(zone, lang) {
  const k = lang === "en" ? "type_label_en" : lang === "zh-TW" ? "type_label_zh_tw" : "type_label_zh_cn";
  return zone[k] || zone.type_label_en;
}
function zoneDesc(zone, lang) {
  const k = lang === "en" ? "desc_en" : lang === "zh-TW" ? "desc_zh_tw" : "desc_zh_cn";
  return zone[k] || zone.desc_en;
}
function zoneArea(zone, lang) {
  const k = lang === "en" ? "area_en" : lang === "zh-TW" ? "area_zh_tw" : "area_zh_cn";
  return zone[k] || zone.area_en;
}
function zoneFunctions(zone, lang) {
  const k = lang === "en" ? "functions_en" : lang === "zh-TW" ? "functions_zh_tw" : "functions_zh_cn";
  const raw = zone[k] || zone.functions_en || "";
  return raw ? raw.split("|") : [];
}
function zoneStatus(zone, lang) {
  const sk = zone.status_key || "planning";
  return STATUS_LABELS[lang]?.[sk] || STATUS_LABELS["en"]?.[sk] || sk;
}

/* ---- intent detection ---- */
const ZONE_ALIASES = {
  z1: ["maipo","mai po","mai-po","ramsar","米埔","拉姆萨尔","拉姆薩爾"],
  z2: ["deep bay","deepbay","后海湾","后海灣","深湾"],
  z3: ["long valley","longvalley","ho sheung","塱原","河上乡","河上鄉"],
  z4: ["fung yuen","fungyuen","凤园","鳳園","蝴蝶"],
  z5: ["sha lo tung","shalotung","沙罗洞","沙羅洞","蜻蜓"],
  z6: ["luk keng","lukkeng","鹿颈","鹿頸","鹭鸟","鷺鳥"],
  z7: ["wu kau tang","wukautang","乌蛟腾","烏蛟騰","风水林","風水林"],
};

function detectZones(text) {
  const lower = (text || "").toLowerCase();
  const matched = [];
  for (const [id, aliases] of Object.entries(ZONE_ALIASES)) {
    for (const a of aliases) {
      if (lower.includes(a.toLowerCase())) { matched.push(id); break; }
    }
  }
  return [...new Set(matched)];
}

function detectIntent(message, zones) {
  const m = (message || "").trim().toLowerCase();
  if (!m) return "fallback";

  if (/报告|報告|report|建议书|建議書/.test(m) ||
     (/(生成|產生|build|generate)/.test(m) && /(报告|報告|report)/.test(m)))
    return "report";

  /* Participation guidance must require an actual participation phrase.
     Matching a bare "如何" / "how" used to swallow ordinary questions such as
     "拉姆萨尔湿地的情况如何", which are zone lookups, not how-to questions. */
  if (/如何参与|怎麼參與|怎么参与|怎樣參與|怎样参与|如何参加|如何參加|如何提交|如何填写|如何填寫|提交问卷|提交問卷|填写问卷|填寫問卷|参与方式|參與方式|问卷怎么|問卷怎麼|how (to|do i|can i) (participate|join|submit|take part)|participat|how does (the )?survey/.test(m))
    return "guide";

  if (/对比|對比|比较|比較|compare|哪个|哪個|which|versus|vs/.test(m) || detectZones(m).length >= 2)
    return "compare";

  if (/热门|熱門|hot|议题|議題|关注|關注|topic|最多/.test(m))
    return "hot";

  if (/满意|滿意|satisfaction|评分|評分|rating|score/.test(m))
    return "satisfaction";

  if (/面积|面積|area|公顷|公頃|多大|size/.test(m))
    return "area";

  if (/在哪|在哪裡|在哪裏|where|位置|location|怎么去|怎麼去/.test(m))
    return "location";

  /* Bare "总" also matched inside unrelated words, so require a full
     overview-style phrase. */
  if (/总共|總共|总数|總數|总体|總體|总览|總覽|全部|所有|overview|概览|概覽|综合|綜合|整體|整体|summary|概况|概況/.test(m) && !detectZones(m).length)
    return "overview";

  if (detectZones(m).length >= 1)
    return "zone";

  return "fallback";
}

/* ---- data helpers ----
   Opinions live in `heat_points` (baseline samples plus one row per resident
   submission); star ratings only exist on `surveys`. Every count below reads
   heat_points so the assistant can never quote a different opinion total from
   the map and the dashboard. */

function getAllZones(db) {
  return db.prepare("SELECT * FROM zones ORDER BY id").all();
}

/* Same rule as the frontend: an unrated zone has no satisfaction score, so a
   missing rating must not be treated as a bad one. */
function priorityFor(count, avg, hasRating) {
  if (!count) return "low";
  if (hasRating && avg < 3.5) return "high";
  if (count > 80) return "high";
  if (hasRating && avg < 4.0) return "mid";
  if (count > 30) return "mid";
  return "low";
}

/* Never print "0 / 5.0" for a zone nobody has rated — that reads as the worst
   possible score instead of "no data". */
function avgText(avg, hasRating, isZh) {
  return hasRating ? `${avg} / 5.0` : (isZh ? "暂无评分" : "no ratings yet");
}

function getZoneStats(db, zoneId) {
  const count = db.prepare("SELECT COUNT(*) as c FROM heat_points WHERE zone_id = ?").get(zoneId).c;

  const avgRow = db.prepare(
    "SELECT AVG(rating) as a, COUNT(*) as n FROM surveys WHERE zone_id = ?"
  ).get(zoneId);
  const hasRating = avgRow.n > 0 && avgRow.a !== null;
  const avg = hasRating ? parseFloat(avgRow.a.toFixed(1)) : 0;

  const typeRows = db.prepare(
    "SELECT type, COUNT(*) as c FROM heat_points WHERE zone_id = ? GROUP BY type"
  ).all(zoneId);
  const types = { positive: 0, improve: 0, concern: 0, function: 0 };
  typeRows.forEach(r => { if (types[r.type] !== undefined) types[r.type] = r.c; });

  const tagRows = db.prepare(
    "SELECT tag, COUNT(*) as c FROM heat_points WHERE zone_id = ? AND tag IS NOT NULL GROUP BY tag"
  ).all(zoneId);
  const topTopics = tagRows.sort((a, b) => b.c - a.c).slice(0, 3).map(r => r.tag);

  return {
    count, avg, hasRating, types, topTopics,
    heatCount: count,
    priority: priorityFor(count, avg, hasRating),
  };
}

function getPlatformStats(db) {
  const total = db.prepare("SELECT COUNT(*) as c FROM heat_points").get().c;
  const typeRows = db.prepare("SELECT type, COUNT(*) as c FROM heat_points GROUP BY type").all();
  const types = { positive: 0, improve: 0, concern: 0, function: 0 };
  typeRows.forEach(r => { if (types[r.type] !== undefined) types[r.type] = r.c; });

  const avgRow = db.prepare("SELECT AVG(rating) as a, COUNT(*) as n FROM surveys").get();
  const hasRating = avgRow.n > 0 && avgRow.a !== null;
  const avg = hasRating ? parseFloat(avgRow.a.toFixed(1)) : 0;

  const activeZones = db.prepare("SELECT COUNT(DISTINCT zone_id) as c FROM heat_points").get().c;
  const zoneCount = db.prepare("SELECT COUNT(*) as c FROM zones").get().c;
  const submissions = db.prepare("SELECT COUNT(*) as c FROM surveys").get().c;

  const totalCount = total || 1;
  return {
    total, submissions, avg, hasRating, activeZones, zoneCount,
    heatCount: total, types,
    typePercent: {
      positive: Math.round(types.positive / totalCount * 100),
      improve: Math.round(types.improve / totalCount * 100),
      concern: Math.round(types.concern / totalCount * 100),
      function: Math.round(types.function / totalCount * 100),
    },
  };
}

function getHotTopics(db, limit = 5) {
  const rows = db.prepare(
    "SELECT tag, COUNT(*) as c FROM heat_points WHERE tag IS NOT NULL GROUP BY tag"
  ).all();
  return rows
    .sort((a, b) => b.c - a.c)
    .slice(0, limit)
    .map(r => ({ tag: r.tag, count: r.c }));
}

/* ================================================================
   Main: processChat
   Returns { answer, intent, tags, quickActions, dataSources }
   ================================================================ */
function processChat(db, message, lang) {
  lang = lang || "zh-CN";
  const intent = detectIntent(message);
  const zones = getAllZones(db);
  const isZh = lang.indexOf("zh") === 0;

  let answer = "";
  let tags = [];
  let quickActions = [];
  let dataSources = [];

  switch (intent) {

    /* ---- REPORT ---- */
    case "report": {
      dataSources = ["zones", "surveys", "heatmap", "dashboard"];
      answer = isZh
        ? "已为您生成建设建议报告。请在前端点击「📋 生成报告」按钮查看完整报告，支持复制 Markdown、下载 .md/.html 文件或打印导出 PDF。"
        : "The construction report has been generated. Click the 📋 Build Report button on the front end to view the full report, copy Markdown, download .md/.html, or print to PDF.";
      tags = [{ text: isZh ? "报告" : "Report", type: "info" }];
      break;
    }

    /* ---- GUIDE ---- */
    case "guide": {
      dataSources = [];
      answer = isZh
        ? "【如何参与】\n\n您可以按以下步骤参与北部都会区绿化空间规划：\n\n1. 🗺️ **查看绿化地图** — 点击导航栏「绿化地图」，在地图上点击任意绿化区域查看规划详情、面积和功能。\n2. 📝 **填写居民问卷** — 点击「居民问卷」，选择您最关注的区域，给出满意度评分、选择期望功能并填写建议。\n3. 🗺️ **查看意见热图** — 提交后 AI 会自动聚合您的意见到「AI 意见热图」上。\n4. 📊 **政府看板** — 您的意见会实时反映到政府决策看板的统计中。\n\n您的每一条意见都会通过 AI 自动分析并空间化，帮助政府直观了解居民诉求。"
        : "【How to Participate】\n\n1. 🗺️ **Explore the Green Map** — Click \"Green Map\" in the nav, then click any green zone for planning details.\n2. 📝 **Take the Survey** — Click \"Survey\", pick a zone, rate satisfaction, choose desired functions, and add suggestions.\n3. 🗺️ **See the Heatmap** — Your input is AI-aggregated onto the opinion heatmap.\n4. 📊 **Dashboard** — Your opinion updates the government dashboard in real time.";
      tags = [{ text: isZh ? "参与指南" : "Guide", type: "info" }];
      break;
    }

    /* ---- OVERVIEW ---- */
    case "overview": {
      dataSources = ["zones", "surveys", "heatmap", "dashboard"];
      const st = getPlatformStats(db);
      const allStats = zones.map(z => ({ z, s: getZoneStats(db, z.id) }));
      const highPri = allStats.filter(r => r.s.priority === "high");

      answer = isZh
        ? `【综合数据概览】\n\n北部都会区（总面积约30,000公顷）绿化空间平台目前覆盖 **${st.zoneCount} 个规划绿化区域**，已聚合 **${st.total.toLocaleString()} 条**意见，生成 **${st.heatCount} 个**空间意见热力点。北部都会区发展策略拟建立约2,000公顷的湿地及海岸保育系统。\n\n📊 **意见类型分布**\n• 正面评价：${st.typePercent.positive}%\n• 改进建议：${st.typePercent.improve}%\n• 担忧反馈：${st.typePercent.concern}%\n• 功能需求：${st.typePercent.function}%\n\n⭐ **平均满意度**：${avgText(st.avg, st.hasRating, isZh)}\n\n🔴 **高优先级区域（需重点关注）**：${highPri.length ? highPri.map(r => zoneName(r.z, lang)).join("、") : "暂无"}\n\n您可以输入具体区域名称（如「米埔」「塱原」）查看详情，或输入「报告」生成完整建设建议报告。\n\n数据来源：渔护署(AFCD)、WWF-HK、北部都会区发展策略`
        : `【Overview】\n\nThe Northern Metropolis (~30,000 ha) green space platform covers **${st.zoneCount} planned green zones** with **${st.total.toLocaleString()} aggregated opinions** and **${st.heatCount} spatial heat points**. The development strategy plans a ~2,000-ha wetland and coastal conservation system.\n\n📊 **Opinion types**: Positive ${st.typePercent.positive}% · Improvement ${st.typePercent.improve}% · Concerns ${st.typePercent.concern}% · Function needs ${st.typePercent.function}%\n\n⭐ **Avg satisfaction**: ${avgText(st.avg, st.hasRating, isZh)}\n\n🔴 **High-priority zones**: ${highPri.length ? highPri.map(r => zoneName(r.z, lang)).join(", ") : "none"}\n\nType a zone name (e.g. "Mai Po") for details, or "report" for a full suggestion report.\n\nSources: AFCD, WWF-HK, Northern Metropolis Development Strategy`;
      tags = [
        { text: `${st.zoneCount} zones`, type: "info" },
        { text: `${st.total} opinions`, type: "info" },
        { text: st.hasRating ? `${st.avg}/5.0` : (isZh ? "暂无评分" : "no ratings"), type: "hot" },
      ];
      quickActions = [
        { text: isZh ? "🔥 热门议题" : "🔥 Hot Topics", query: isZh ? "热门议题" : "hot topics" },
        { text: isZh ? "📊 满意度" : "📊 Satisfaction", query: isZh ? "满意度" : "satisfaction" },
      ];
      break;
    }

    /* ---- HOT TOPICS ---- */
    case "hot": {
      dataSources = ["surveys"];
      const topics = getHotTopics(db, 5);
      const topicLabel = (tag) => {
        const map = {
          "tag.shade": isZh ? "遮阴设施" : "Shade",
          "tag.walkable": isZh ? "步行可达" : "Walkability",
          "tag.lighting": isZh ? "夜间照明" : "Lighting",
          "tag.accessible": isZh ? "无障碍" : "Accessibility",
          "func.sports": isZh ? "运动设施" : "Sports",
          "func.children": isZh ? "儿童游乐" : "Children",
          "func.eco": isZh ? "生态保育" : "Ecology",
          "func.cycling": isZh ? "骑行绿道" : "Cycling",
          "func.education": isZh ? "自然教育" : "Education",
          "func.birdwatch": isZh ? "观鸟" : "Birdwatching",
        };
        return map[tag] || tag;
      };
      const lines = [isZh ? "【热门议题 TOP 5】\n" : "【Hot Topics TOP 5】\n"];
      topics.forEach((t, i) => {
        lines.push(`${i + 1}. ${topicLabel(t.tag)} — ${t.count} ${isZh ? "条意见" : "opinions"}`);
      });
      if (!topics.length) lines.push(isZh ? "暂无足够数据" : "No data yet");
      lines.push(isZh ? "\n💡 这些议题集中在遮阴设施、鱼塘管理、生态保育、交通接驳等方面。" : "\n💡 Key themes: shade, fishpond management, ecology, access.");
      answer = lines.join("\n");
      tags = topics.slice(0, 3).map(t => ({ text: topicLabel(t.tag), type: "hot" }));
      break;
    }

    /* ---- COMPARE ---- */
    case "compare": {
      dataSources = ["zones", "surveys"];
      let cz = detectZones(message);
      if (cz.length < 2) cz = zones.slice(0, 4).map(z => z.id);
      cz = cz.slice(0, 5);
      const rows = cz.map(zid => {
        const z = zones.find(x => x.id === zid);
        if (!z) return null;
        const s = getZoneStats(db, zid);
        return { z, s };
      }).filter(Boolean);

      const out = [isZh ? "【区域对比】\n" : "【Zone Comparison】\n"];
      rows.forEach(r => {
        const pri = r.s.priority === "high" ? "🔴" : r.s.priority === "mid" ? "🟡" : "🟢";
        const priLabel = PRIORITY_LABELS[lang]?.[r.s.priority] || r.s.priority;
        out.push(`• ${zoneName(r.z, lang)}（${zoneTypeLabel(r.z, lang)}）：${r.s.count} ${isZh ? "条意见" : "opinions"}, ${isZh ? "满意度" : "satisfaction"} ${avgText(r.s.avg, r.s.hasRating, isZh)}, ${isZh ? "优先级" : "priority"} ${pri}${priLabel}`);
      });
      /* Only rank by satisfaction when at least one zone has actually been
         rated; otherwise every zone would tie at zero. */
      const rated = rows.filter(r => r.s.hasRating).sort((a, b) => b.s.avg - a.s.avg);
      if (rated.length >= 2) {
        out.push(isZh ? `\n⭐ 满意度最高：${zoneName(rated[0].z, lang)}（${rated[0].s.avg}）` : `\n⭐ Best: ${zoneName(rated[0].z, lang)} (${rated[0].s.avg})`);
        out.push(isZh ? `⚠️ 需重点关注：${zoneName(rated[rated.length - 1].z, lang)}（${rated[rated.length - 1].s.avg}）` : `⚠️ Watch: ${zoneName(rated[rated.length - 1].z, lang)} (${rated[rated.length - 1].s.avg})`);
      } else if (!rated.length) {
        out.push(isZh ? "\n（暂无居民评分，提交问卷后即可对比各区域满意度。）" : "\n(No ratings yet — submit a survey to compare satisfaction across zones.)");
      }
      answer = out.join("\n");
      tags = rows.slice(0, 3).map(r => ({ text: zoneName(r.z, lang), type: r.s.priority === "high" ? "warn" : "info" }));
      break;
    }

    /* ---- ZONE SPECIFIC ---- */
    case "zone": {
      dataSources = ["zones", "surveys", "heatmap"];
      const zmatch = detectZones(message);
      const zid = zmatch[0];
      const z = zones.find(x => x.id === zid);
      if (!z) { answer = isZh ? "未找到相关区域。" : "Zone not found."; break; }
      const s = getZoneStats(db, zid);
      const pri = PRIORITY_LABELS[lang]?.[s.priority] || s.priority;
      const priIcon = s.priority === "high" ? "🔴" : s.priority === "mid" ? "🟡" : "🟢";
      const funcs = zoneFunctions(z, lang);

      const out = [
        `【${zoneName(z, lang)}】 ${priIcon} ${isZh ? pri + "优先级" : pri + " priority"}\n`,
        `📍 ${isZh ? "类型" : "Type"}：${zoneTypeLabel(z, lang)} ｜ ${isZh ? "面积" : "Area"}：${zoneArea(z, lang)} ｜ ${isZh ? "状态" : "Status"}：${zoneStatus(z, lang)}`,
        `\n📋 ${isZh ? "规划简介" : "Description"}：${zoneDesc(z, lang)}`,
      ];
      if (funcs.length) out.push(`\n🎯 ${isZh ? "规划功能" : "Functions"}：${funcs.join(isZh ? "、" : ", ")}`);
      out.push(`\n📊 ${isZh ? "意见数据" : "Opinion data"}：`);
      out.push(`• ${isZh ? "意见总数" : "Total opinions"}：${s.count}`);
      out.push(`• ${isZh ? "平均满意度" : "Avg satisfaction"}：${avgText(s.avg, s.hasRating, isZh)}`);
      out.push(`• ${isZh ? "热力点" : "Heat points"}：${s.heatCount}`);
      if (s.topTopics.length) {
        out.push(`• ${isZh ? "热门议题" : "Top topics"}：${s.topTopics.join("、")}`);
      }
      out.push(`\n💡 ${isZh ? "点击「居民问卷」提交您对该区域的意见。" : "Click \"Survey\" to submit your opinion on this zone."}`);
      answer = out.join("\n");
      tags = [
        { text: zoneTypeLabel(z, lang), type: "info" },
        { text: s.hasRating ? `${s.avg}/5.0` : (isZh ? "暂无评分" : "no ratings"), type: (s.hasRating && s.avg >= 4) ? "info" : "warn" },
      ];
      quickActions = [
        { text: isZh ? "📝 提交意见" : "📝 Submit Opinion", query: isZh ? "如何参与" : "how to participate" },
      ];
      break;
    }

    /* ---- SATISFACTION ---- */
    case "satisfaction": {
      dataSources = ["zones", "surveys"];
      const st = getPlatformStats(db);
      const allStats = zones.map(z => ({ z, s: getZoneStats(db, z.id) }));
      if (!st.hasRating) {
        answer = isZh
          ? `【满意度分析】\n\n目前尚无居民评分——已聚合 ${st.total} 条意见，但还没有人提交 1–5 分的满意度评分。\n\n💡 请点击「居民问卷」提交评分，之后即可查看各区域满意度对比。`
          : `【Satisfaction Analysis】\n\nNo resident ratings yet — ${st.total} opinions have been aggregated, but nobody has submitted a 1–5 satisfaction score.\n\n💡 Submit a survey to start seeing per-zone satisfaction comparisons.`;
        break;
      }
      allStats.sort((a, b) => b.s.avg - a.s.avg);
      const lines = [
        isZh ? `【满意度分析】\n\n整体平均满意度：${avgText(st.avg, st.hasRating, isZh)}\n\n各区域满意度（从高到低）：\n`
             : `【Satisfaction Analysis】\n\nOverall avg: ${avgText(st.avg, st.hasRating, isZh)}\n\nBy zone (high → low):\n`,
      ];
      allStats.forEach(r => {
        const stars = Math.max(0, Math.min(5, Math.round(r.s.avg)));
        const bar = "★".repeat(stars) + "☆".repeat(5 - stars);
        lines.push(`${zoneName(r.z, lang)}: ${avgText(r.s.avg, r.s.hasRating, isZh)} ${r.s.hasRating ? bar : ""}`.trimEnd());
      });
      lines.push(isZh ? "\n💡 满意度偏低的区域通常存在「担忧」类意见较多，建议优先关注。" : "\n💡 Low-satisfaction zones tend to have more concern-type opinions.");
      answer = lines.join("\n");
      break;
    }

    /* ---- AREA ---- */
    case "area": {
      dataSources = ["zones"];
      const lines = [isZh ? "【各区域面积】\n" : "【Zone Areas】\n"];
      zones.forEach(z => {
        lines.push(`• ${zoneName(z, lang)}（${zoneTypeLabel(z, lang)}）：${zoneArea(z, lang)}`);
      });
      answer = lines.join("\n");
      break;
    }

    /* ---- LOCATION ---- */
    case "location": {
      dataSources = ["zones"];
      answer = isZh
        ? "【绿化区域位置】\n\n北部都会区总面积约30,000公顷，沿深圳河与后海湾分布，涵盖香港最大的连片低地。规划中拟建立约2,000公顷的湿地及海岸保育系统，包括五个主动管理的湿地保育公园。\n\n7个规划绿化区域分布：\n• 后海湾沿岸：米埔拉姆萨尔湿地（1,540公顷，1995年列入）、后海湾鱼塘湿地（600+公顷）\n• 河谷平原：塱原及河上乡（37公顷，2024年11月启用）\n• 内陆山谷：凤园（SSSI，200+种蝴蝶）、沙罗洞（SSSI，56公顷，全港第二优先保育地点）\n• 沙头角海沿岸：鹿颈沼泽\n• 船湾郊野公园北缘：乌蛟腾\n\n数据来源：渔护署(AFCD)、世界自然基金会香港分会(WWF-HK)、北部都会区发展策略"
        : "【Locations】\n\nThe Northern Metropolis covers ~30,000 ha along the Shenzhen River and Deep Bay. A ~2,000-ha wetland and coastal conservation system is planned, including five proactively managed wetland conservation parks.\n\n7 green zones:\n• Deep Bay coast: Mai Po Ramsar Site (1,540 ha, listed 1995), Deep Bay fishponds (600+ ha)\n• River valley: Long Valley (37 ha, opened Nov 2024)\n• Inland valleys: Fung Yuen (SSSI, 200+ butterfly species), Sha Lo Tung (SSSI, 56 ha, #2 priority site)\n• Starling Inlet: Luk Keng Marsh\n• Plover Cove edge: Wu Kau Tang\n\nSources: AFCD, WWF-HK, Northern Metropolis Development Strategy";
      break;
    }

    /* ---- FALLBACK ---- */
    default:
      answer = isZh
        ? "抱歉，我暂时无法理解您的问题。您可以尝试：\n\n• 输入「概览」查看平台综合数据\n• 输入区域名称（如「米埔」「塱原」）查看区域详情\n• 输入「热门议题」查看最受关注的议题\n• 输入「满意度」查看各区域满意度排名\n• 输入「如何参与」了解参与方式\n• 输入「报告」生成建设建议报告"
        : "Sorry, I couldn't understand your question. Try:\n\n• \"overview\" for platform summary\n• A zone name (e.g. \"Mai Po\") for details\n• \"hot topics\" for trending issues\n• \"satisfaction\" for ratings\n• \"how to participate\" for guide\n• \"report\" for a construction report";
      break;
  }

  return { answer, intent, tags, quickActions, dataSources, lang };
}

/* ================================================================
   generateReport
   Returns a structured construction-suggestion report
   ================================================================ */
function generateReport(db, lang) {
  lang = lang || "zh-CN";
  const isZh = lang.indexOf("zh") === 0;
  const zones = getAllZones(db);
  const st = getPlatformStats(db);
  const zoneStats = zones.map(z => ({ z, s: getZoneStats(db, z.id) }));
  const topics = getHotTopics(db, 5);

  const highPri = zoneStats.filter(r => r.s.priority === "high");
  const midPri = zoneStats.filter(r => r.s.priority === "mid");

  const sections = [];

  /* ---- Executive Summary ---- */
  sections.push({
    title: isZh ? "执行摘要" : "Executive Summary",
    type: "exec",
    content: isZh
      ? `本报告基于北部都会区绿化空间平台的实时数据，涵盖 ${st.zoneCount} 个规划绿化区域、${st.total.toLocaleString()} 条意见和 ${st.heatCount} 个空间意见热力点。整体满意度 ${avgText(st.avg, st.hasRating, isZh)}，其中 ${highPri.length} 个区域被标记为高优先级。`
      : `This report is based on real-time data from the Northern Metropolis Green Space Platform, covering ${st.zoneCount} planned green zones, ${st.total.toLocaleString()} aggregated opinions, and ${st.heatCount} spatial heat points. Overall satisfaction is ${avgText(st.avg, st.hasRating, isZh)}, with ${highPri.length} zones flagged as high priority.`,
  });

  /* ---- Priority Zones Table ---- */
  const tableRows = zoneStats
    .sort((a, b) => {
      const order = { high: 0, mid: 1, low: 2 };
      return order[a.s.priority] - order[b.s.priority] || b.s.count - a.s.count;
    })
    .map(r => ({
      name: zoneName(r.z, lang),
      type: zoneTypeLabel(r.z, lang),
      opinions: r.s.count,
      avg: r.s.avg,
      avgText: avgText(r.s.avg, r.s.hasRating, isZh),
      priority: PRIORITY_LABELS[lang]?.[r.s.priority] || r.s.priority,
      priorityKey: r.s.priority,
    }));

  sections.push({
    title: isZh ? "区域优先级分析" : "Zone Priority Analysis",
    type: "table",
    columns: isZh
      ? ["区域名称", "类型", "意见数", "平均满意度", "优先级"]
      : ["Zone", "Type", "Opinions", "Avg Satisfaction", "Priority"],
    rows: tableRows,
  });

  /* ---- Hot Topics ---- */
  sections.push({
    title: isZh ? "热门议题" : "Hot Topics",
    type: "list",
    items: topics.length
      ? topics.map(t => `${t.tag} — ${t.count} ${isZh ? "条" : ""}`)
      : [isZh ? "暂无足够数据" : "Insufficient data"],
  });

  /* ---- Recommendations ---- */
  const recommendations = [];

  highPri.forEach(r => {
    recommendations.push({
      zone: zoneName(r.z, lang),
      priority: isZh ? "高" : "High",
      suggestion: isZh
        ? `针对「${zoneName(r.z, lang)}」（满意度 ${avgText(r.s.avg, r.s.hasRating, isZh)}），建议优先解决居民关注的${r.s.topTopics.length ? r.s.topTopics.slice(0, 2).join("、") : "相关"}问题。`
        : `For "${zoneName(r.z, lang)}" (satisfaction ${avgText(r.s.avg, r.s.hasRating, isZh)}), address resident concerns about ${r.s.topTopics.length ? r.s.topTopics.slice(0, 2).join(", ") : "key issues"}.`,
    });
  });

  if (st.typePercent.concern > 25) {
    recommendations.push({
      zone: isZh ? "全域" : "All zones",
      priority: isZh ? "中" : "Medium",
      suggestion: isZh
        ? `担忧类意见占比 ${st.typePercent.concern}%，超过预警线，建议开展公众说明会回应居民关切。`
        : `Concern-type opinions reach ${st.typePercent.concern}%, above the alert threshold. Recommend public briefing sessions.`,
    });
  }

  if (!recommendations.length) {
    recommendations.push({
      zone: isZh ? "全域" : "All zones",
      priority: isZh ? "低" : "Low",
      suggestion: isZh ? "当前各项指标正常，建议维持现有规划方向。" : "All metrics normal, maintain current planning direction.",
    });
  }

  sections.push({
    title: isZh ? "建设建议" : "Recommendations",
    type: "recommendations",
    items: recommendations,
  });

  /* ---- Opinion Distribution ---- */
  sections.push({
    title: isZh ? "意见类型分布" : "Opinion Type Distribution",
    type: "stats",
    stats: [
      { label: isZh ? "正面评价" : "Positive", value: st.typePercent.positive, count: st.types.positive },
      { label: isZh ? "改进建议" : "Improvement", value: st.typePercent.improve, count: st.types.improve },
      { label: isZh ? "担忧反馈" : "Concerns", value: st.typePercent.concern, count: st.types.concern },
      { label: isZh ? "功能需求" : "Function needs", value: st.typePercent.function, count: st.types.function },
    ],
  });

  /* ---- Build Markdown ---- */
  let md = `# ${isZh ? "北部都会区绿化空间 · 建设建议报告" : "Northern Metropolis Green Space · Construction Report"}\n\n`;
  md += `> ${isZh ? "生成时间" : "Generated"}: ${new Date().toISOString()}  \n`;
  md += `> ${isZh ? "数据源" : "Sources"}: zones, surveys, heat_points, dashboard\n`;
  md += `> ${isZh ? "参考资料" : "References"}: AFCD (渔护署), WWF-Hong Kong, HKUST IEnv, Northern Metropolis Development Strategy, BSAP\n\n`;

  sections.forEach(sec => {
    md += `## ${sec.title}\n\n`;
    if (sec.type === "exec") {
      md += sec.content + "\n\n";
    } else if (sec.type === "table") {
      md += `| ${sec.columns.join(" | ")} |\n`;
      md += `| ${sec.columns.map(() => "---").join(" | ")} |\n`;
      sec.rows.forEach(r => {
        const priIcon = r.priorityKey === "high" ? "🔴" : r.priorityKey === "mid" ? "🟡" : "🟢";
        md += `| ${r.name} | ${r.type} | ${r.opinions} | ${r.avgText} | ${priIcon} ${r.priority} |\n`;
      });
      md += "\n";
    } else if (sec.type === "list") {
      sec.items.forEach(item => { md += `- ${item}\n`; });
      md += "\n";
    } else if (sec.type === "recommendations") {
      sec.items.forEach(r => {
        md += `### ${r.zone}（${isZh ? "优先级" : "Priority"}: ${r.priority}）\n`;
        md += `${r.suggestion}\n\n`;
      });
    } else if (sec.type === "stats") {
      sec.stats.forEach(s => {
        md += `- **${s.label}**: ${s.value}% (${s.count} ${isZh ? "条" : ""})\n`;
      });
      md += "\n";
    }
  });

  return {
    title: isZh ? "北部都会区绿化空间 · 建设建议报告" : "Northern Metropolis Green Space · Construction Report",
    generatedAt: new Date().toISOString(),
    lang,
    sections,
    markdown: md,
    stats: {
      zoneCount: st.zoneCount,
      totalOpinions: st.total,
      avgSatisfaction: st.hasRating ? st.avg : null,
      hasRatings: st.hasRating,
      submissions: st.submissions,
      heatPoints: st.heatCount,
      highPriorityCount: highPri.length,
      midPriorityCount: midPri.length,
    },
  };
}

/* ================================================================
   getSuggestedQuestions
   ================================================================ */
function getSuggestedQuestions(lang) {
  lang = lang || "zh-CN";
  const isZh = lang.indexOf("zh") === 0;
  return isZh
    ? [
        { text: "📊 综合概览", query: "概览" },
        { text: "🔥 热门议题", query: "热门议题" },
        { text: "⚖️ 区域对比", query: "区域对比" },
        { text: "❓ 如何参与", query: "如何参与" },
      ]
    : [
        { text: "📊 Overview", query: "overview" },
        { text: "🔥 Hot Topics", query: "hot topics" },
        { text: "⚖️ Compare Zones", query: "compare zones" },
        { text: "❓ How to Participate", query: "how to participate" },
      ];
}

module.exports = {
  processChat,
  generateReport,
  getSuggestedQuestions,
  detectIntent,
  detectZones,
};
