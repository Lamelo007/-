/**
 * AI Text Engine
 *
 * 1. extractKeywords(text)  — match survey text against known keyword patterns
 * 2. classifyOpinion(rating, suggestion, functions) — determine opinion type
 * 3. generateHeatPoint(survey, zone) — create a heat point from survey data
 * 4. aggregateStats() — compute zone-level opinion statistics
 */

const KEYWORD_MAP = [
  { keys: ["shade","shaded","canopy","sun shelter","\u906e\u9633","\u906e\u9634","\u906e\u853d","\u906e\u9634"], tag: "tag.shade" },
  { keys: ["walk","walkable","entrance","access","\u6b65\u884c","\u53ef\u8fbe","\u5165\u53e3","\u6b65\u884c\u53ef\u8fbe","\u6b65\u884c\u53ef\u9054"], tag: "tag.walkable" },
  { keys: ["light","lighting","night","\u7167\u660e","\u591c\u95f4","\u591c\u9593","\u706f\u5149","\u71c8\u5149"], tag: "tag.lighting" },
  { keys: ["accessible","wheelchair","disabled","\u65e0\u969c\u788d","\u7121\u969c\u7919","\u6b8b\u75be"], tag: "tag.accessible" },
  { keys: ["sport","exercise","fitness","\u8fd0\u52a8","\u5065\u8eab","\u9ad4\u80b2","\u904b\u52d5"], tag: "func.sports" },
  { keys: ["children","playground","kids","\u513f\u7ae5","\u6e38\u4e50","\u904a\u6a02","\u5152\u7ae5"], tag: "func.children" },
  { keys: ["ecology","eco","conservation","habitat","\u751f\u6001","\u4fdd\u80b2","\u614b\u4fdd\u80b2","\u751f\u614b"], tag: "func.eco" },
  { keys: ["cycling","bike","greenway","\u9a91\u884c","\u7eff\u9053","\u9a0e\u884c","\u7da0\u9053"], tag: "func.cycling" },
  { keys: ["education","nature center","learning","\u6559\u80b2","\u6559\u80b2","\u81ea\u7136\u6559\u80b2"], tag: "func.education" },
  { keys: ["bird","birdwatch","\u89c2\u9e1f","\u89c0\u9ce5"], tag: "func.birdwatch" },
  { keys: ["concern","worried","destroy","affect","\u62c5\u5fc3","\u5f71\u54cd","\u62c5\u5fc3","\u64d4\u5fc3","\u5f71\u97ff"], tag: "opinion.concern" },
  { keys: ["great","support","good","love","\u5f88\u597d","\u652f\u6301","\u8d5e\u6210","\u5f88\u597d"], tag: "opinion.positive" },
];

const POSITIVE_PATTERNS = ["great","good","love","support","excellent","amazing","nice","\u5f88\u597d","\u652f\u6301","\u8d5e\u6210","\u559c\u6b22","\u5f88\u68d2"];
const CONCERN_PATTERNS = ["concern","worried","worry","destroy","affect","danger","threat","\u62c5\u5fc3","\u62c5\u5fe7","\u5f71\u54cd","\u5a01\u80c1","\u5371\u9669","\u64d4\u5fc3","\u5f71\u97ff","\u5c01\u9589","\u9650\u5236","\u9650\u5236"];
const IMPROVE_PATTERNS = ["need","should","suggest","add","improve","more","better","\u5e0c\u671b","\u5efa\u8bae","\u9700\u8981","\u5e94\u8be5","\u6539\u8fdb","\u589e\u52a0","\u5efa\u8b70","\u9700\u8981","\u61c9\u8a72","\u6539\u9032","\u589e\u52a0"];

function extractKeywords(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const matched = [];
  KEYWORD_MAP.forEach(k => {
    for (const key of k.keys) {
      if (lower.includes(key.toLowerCase())) {
        if (!matched.includes(k.tag)) matched.push(k.tag);
        break;
      }
    }
  });
  return matched;
}

function classifyOpinion(rating, suggestion, functions) {
  const text = (suggestion || "").toLowerCase();
  if (rating >= 4) {
    for (const p of POSITIVE_PATTERNS) {
      if (text.includes(p)) return "positive";
    }
    if (text.includes("need") || text.includes("suggest") || text.includes("\u5e0c\u671b") || text.includes("\u5efa\u8bae") || text.includes("\u5efa\u8b70")) return "improve";
    return "positive";
  }
  if (rating <= 2) {
    for (const p of CONCERN_PATTERNS) {
      if (text.includes(p)) return "concern";
    }
    return "concern";
  }
  for (const p of CONCERN_PATTERNS) {
    if (text.includes(p)) return "concern";
  }
  if (functions && functions.length > 0) {
    for (const p of IMPROVE_PATTERNS) {
      if (text.includes(p)) return "improve";
    }
    return "function";
  }
  return "improve";
}

function generateHeatPoint(survey, zone) {
  const jitter = () => (Math.random() - 0.5) * 40;
  const intensity = 0.5 + Math.random() * 0.4;
  const radius = 25 + Math.random() * 20;
  return {
    zone_id: zone.id,
    x: (zone.coord_x || 400) + jitter(),
    y: (zone.coord_y || 240) + jitter(),
    radius: parseFloat(radius.toFixed(1)),
    intensity: parseFloat(intensity.toFixed(2)),
    type: survey.opinion_type,
    text_en: survey.suggestion || "User opinion",
    text_zh_cn: survey.suggestion || "\u7528\u6237\u610f\u89c1",
    text_zh_tw: survey.suggestion || "\u7528\u6236\u610f\u898b",
    tag: (survey.keywords && survey.keywords[0]) || "heat.generalOpinion",
    source: "survey",
  };
}

function aggregateStats(db) {
  const total = db.prepare("SELECT COUNT(*) as c FROM surveys").get().c;
  const byType = db.prepare(`
    SELECT opinion_type, COUNT(*) as c
    FROM surveys GROUP BY opinion_type
  `).all();
  const byZone = db.prepare(`
    SELECT z.id, z.name_en, z.name_zh_cn, z.name_zh_tw, z.type,
           z.type_label_en, z.type_label_zh_cn, z.type_label_zh_tw,
           COUNT(s.id) as survey_count,
           ROUND(AVG(s.rating),1) as avg_rating,
           z.attention
    FROM zones z
    LEFT JOIN surveys s ON s.zone_id = z.id
    GROUP BY z.id
    ORDER BY survey_count DESC
  `).all();

  const totalRating = db.prepare("SELECT AVG(rating) as avg FROM surveys").get().avg;
  const activeZones = db.prepare("SELECT COUNT(DISTINCT zone_id) as c FROM surveys").get().c;

  const typeStats = { positive: 0, improve: 0, concern: 0, function: 0 };
  byType.forEach(t => { typeStats[t.opinion_type] = t.c; });

  const totalCount = total || 1;
  return {
    total,
    avg_rating: totalRating ? parseFloat(totalRating.toFixed(1)) : 0,
    active_zones: activeZones,
    type_percent: {
      positive: Math.round((typeStats.positive / totalCount) * 100),
      improve: Math.round((typeStats.improve / totalCount) * 100),
      concern: Math.round((typeStats.concern / totalCount) * 100),
      function: Math.round((typeStats.function / totalCount) * 100),
    },
    zone_stats: byZone.map(z => ({
      ...z,
      functions_en: z.functions_en ? z.functions_en.split("|") : [],
      functions_zh_cn: z.functions_zh_cn ? z.functions_zh_cn.split("|") : [],
      functions_zh_tw: z.functions_zh_tw ? z.functions_zh_tw.split("|") : [],
    })),
  };
}

module.exports = {
  extractKeywords,
  classifyOpinion,
  generateHeatPoint,
  aggregateStats,
};
