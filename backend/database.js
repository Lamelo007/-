const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "greenspace.db");
const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS zones (
    id          TEXT PRIMARY KEY,
    name_en     TEXT,
    name_zh_cn  TEXT,
    name_zh_tw  TEXT,
    type        TEXT,
    type_label_en    TEXT,
    type_label_zh_cn TEXT,
    type_label_zh_tw TEXT,
    area_en     TEXT,
    area_zh_cn  TEXT,
    area_zh_tw  TEXT,
    status_key  TEXT,
    desc_en     TEXT,
    desc_zh_cn  TEXT,
    desc_zh_tw  TEXT,
    functions_en    TEXT,
    functions_zh_cn TEXT,
    functions_zh_tw TEXT,
    coord_x     REAL,
    coord_y     REAL,
    attention   TEXT DEFAULT 'mid'
  );

  CREATE TABLE IF NOT EXISTS surveys (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    zone_id     TEXT NOT NULL,
    rating      INTEGER NOT NULL,
    functions   TEXT,
    suggestion  TEXT,
    opinion_type TEXT,
    keywords    TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  );

  CREATE TABLE IF NOT EXISTS heat_points (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    zone_id     TEXT NOT NULL,
    x           REAL,
    y           REAL,
    radius      REAL,
    intensity   REAL,
    type        TEXT,
    text_en     TEXT,
    text_zh_cn  TEXT,
    text_zh_tw  TEXT,
    tag         TEXT,
    source      TEXT DEFAULT 'seed',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  );

  CREATE INDEX IF NOT EXISTS idx_surveys_zone ON surveys(zone_id);
  CREATE INDEX IF NOT EXISTS idx_heat_zone ON heat_points(zone_id);
`);

const ZONE_SEED = [
  { id:"z1", name_en:"Mai Po Wetland", name_zh_cn:"\u7c73\u6d66\u6e7f\u5730", name_zh_tw:"\u7c73\u57d4\u6feb\u5730", type:"wetland",
    type_label_en:"Wetland", type_label_zh_cn:"\u6e7f\u5730", type_label_zh_tw:"\u6feb\u5730",
    area_en:"~240 ha", area_zh_cn:"\u7ea6 240 \u516c\u9877", area_zh_tw:"\u7d04 240 \u516c\u9803",
    status_key:"planned",
    desc_en:"Mai Po Wetland is an internationally important wetland. The plan preserves its ecological value while adding public birdwatching trails and education facilities.",
    desc_zh_cn:"\u7c73\u6d66\u6e7f\u5730\u662f\u56fd\u9645\u91cd\u8981\u6e7f\u5730\uff0c\u89c4\u5212\u4fdd\u7559\u5176\u751f\u6001\u4ef7\u503c\uff0c\u540c\u65f6\u589e\u8bbe\u516c\u4f17\u89c2\u9e1f\u6b65\u9053\u548c\u6559\u80b2\u8bbe\u65bd\u3002",
    desc_zh_tw:"\u7c73\u57d4\u6feb\u5730\u662f\u570b\u969b\u91cd\u8981\u6feb\u5730\uff0c\u898f\u5283\u4fdd\u7559\u5176\u751f\u614b\u50f9\u503c\uff0c\u540c\u6642\u589e\u8a2d\u516c\u773e\u89c0\u9ce5\u6b65\u9053\u548c\u6559\u80b2\u8a2d\u65bd\u3002",
    functions_en:"Ecological Conservation|Birdwatching|Environmental Education",
    functions_zh_cn:"\u751f\u6001\u4fdd\u80b2|\u89c2\u9e1f|\u73af\u5883\u6559\u80b2",
    functions_zh_tw:"\u751f\u614b\u4fdd\u80b2|\u89c0\u9ce5|\u74b0\u5883\u6559\u80b2",
    coord_x:180, coord_y:140 },

  { id:"z2", name_en:"San Tin Park", name_zh_cn:"\u65b0\u7530\u516c\u56ed", name_zh_tw:"\u65b0\u7530\u516c\u5712", type:"park",
    type_label_en:"Park", type_label_zh_cn:"\u516c\u56ed\u7528\u5730", type_label_zh_tw:"\u516c\u5712\u7528\u5730",
    area_en:"~85 ha", area_zh_cn:"\u7ea6 85 \u516c\u9877", area_zh_tw:"\u7d04 85 \u516c\u9803",
    status_key:"planning",
    desc_en:"San Tin Park is planned as a comprehensive community park with sports fields, children playground areas, and a greenway system.",
    desc_zh_cn:"\u65b0\u7530\u516c\u56ed\u89c4\u5212\u4e3a\u7efc\u5408\u6027\u793e\u533a\u516c\u56ed\uff0c\u5305\u542b\u8fd0\u52a8\u573a\u5730\u3001\u513f\u7ae5\u6e38\u4e50\u533a\u548c\u7eff\u9053\u7cfb\u7edf\u3002",
    desc_zh_tw:"\u65b0\u7530\u516c\u5712\u898f\u5283\u70ba\u7d9c\u5408\u6027\u793e\u5340\u516c\u5712\uff0c\u5305\u542b\u904b\u52d5\u5834\u5730\u3001\u5152\u7ae5\u904a\u6a02\u5340\u548c\u7da0\u9053\u7cfb\u7d71\u3002",
    functions_en:"Sports & Recreation|Children Playground|Greenway",
    functions_zh_cn:"\u4f11\u95f2\u8fd0\u52a8|\u513f\u7ae5\u6e38\u4e50|\u7eff\u9053",
    functions_zh_tw:"\u4f11\u958c\u904b\u52d5|\u5152\u7ae5\u904a\u6a02|\u7da0\u9053",
    coord_x:370, coord_y:130 },

  { id:"z3", name_en:"Eco-Corridor A", name_zh_cn:"\u751f\u6001\u8d70\u5ecaA", name_zh_tw:"\u751f\u614b\u8d70\u5ecaA", type:"corridor",
    type_label_en:"Eco-Corridor", type_label_zh_cn:"\u751f\u6001\u8d70\u5eca", type_label_zh_tw:"\u751f\u614b\u8d70\u5eca",
    area_en:"~60 ha", area_zh_cn:"\u7ea6 60 \u516c\u9877", area_zh_tw:"\u7d04 60 \u516c\u9803",
    status_key:"planning",
    desc_en:"Eco-Corridor A connects Mai Po Wetland and San Tin Park, planned as an ecological connection channel to ensure wildlife migration.",
    desc_zh_cn:"\u751f\u6001\u8d70\u5ecaA\u8fde\u63a5\u7c73\u6d66\u6e7f\u5730\u4e0e\u65b0\u7530\u516c\u56ed\uff0c\u89c4\u5212\u4e3a\u751f\u6001\u8fde\u63a5\u901a\u9053\uff0c\u4fdd\u969c\u91ce\u751f\u52a8\u7269\u8fc1\u5f99\u3002",
    desc_zh_tw:"\u751f\u614b\u8d70\u5ecaA\u9023\u63a5\u7c73\u57d4\u6feb\u5730\u8207\u65b0\u7530\u516c\u5712\uff0c\u898f\u5283\u70ba\u751f\u614b\u9023\u63a5\u901a\u9053\uff0c\u4fdd\u969c\u91ce\u751f\u52d5\u7269\u9077\u5f99\u3002",
    functions_en:"Ecological Connection|Walking Greenway|Wildlife Habitat",
    functions_zh_cn:"\u751f\u6001\u8fde\u63a5|\u6b65\u884c\u7eff\u9053|\u751f\u7269\u6808\u606f",
    functions_zh_tw:"\u751f\u614b\u9023\u63a5|\u6b65\u884c\u7da0\u9053|\u751f\u7269\u68f2\u606f",
    coord_x:535, coord_y:200 },

  { id:"z4", name_en:"Wetland Restoration", name_zh_cn:"\u6e7f\u5730\u4fee\u590d\u533a", name_zh_tw:"\u6feb\u5730\u4fee\u5fa9\u5340", type:"wetland",
    type_label_en:"Wetland", type_label_zh_cn:"\u6e7f\u5730", type_label_zh_tw:"\u6feb\u5730",
    area_en:"~120 ha", area_zh_cn:"\u7ea6 120 \u516c\u9877", area_zh_tw:"\u7d04 120 \u516c\u9803",
    status_key:"restoring",
    desc_en:"The Wetland Restoration Area is undergoing ecological restoration to recover degraded wetlands and enhance stormwater management capacity.",
    desc_zh_cn:"\u6e7f\u5730\u4fee\u590d\u533a\u6b63\u5728\u8fdb\u884c\u751f\u6001\u4fee\u590d\u5de5\u7a0b\uff0c\u76ee\u6807\u662f\u6062\u590d\u9000\u5316\u6e7f\u5730\uff0c\u63d0\u5347\u96e8\u6d2a\u7ba1\u7406\u80fd\u529b\u3002",
    desc_zh_tw:"\u6feb\u5730\u4fee\u5fa9\u5340\u6b63\u5728\u9032\u884c\u751f\u614b\u4fee\u5fa9\u5de5\u7a0b\uff0c\u76ee\u6a19\u662f\u6062\u5fa9\u9000\u5316\u6feb\u5730\uff0c\u63d0\u5347\u96e8\u6d2a\u7ba1\u7406\u80fd\u529b\u3002",
    functions_en:"Ecological Restoration|Stormwater Management|Nature Education",
    functions_zh_cn:"\u751f\u6001\u4fee\u590d|\u96e8\u6d2a\u7ba1\u7406|\u81ea\u7136\u6559\u80b2",
    functions_zh_tw:"\u751f\u614b\u4fee\u5fa9|\u96e8\u6d2a\u7ba1\u7406|\u81ea\u7136\u6559\u80b2",
    coord_x:680, coord_y:120 },

  { id:"z5", name_en:"Kwu Tung Park", name_zh_cn:"\u53e4\u6d1e\u516c\u56ed", name_zh_tw:"\u53e4\u6d1e\u516c\u5712", type:"park",
    type_label_en:"Park", type_label_zh_cn:"\u516c\u56ed\u7528\u5730", type_label_zh_tw:"\u516c\u5712\u7528\u5730",
    area_en:"~45 ha", area_zh_cn:"\u7ea6 45 \u516c\u9877", area_zh_tw:"\u7d04 45 \u516c\u9803",
    status_key:"planning",
    desc_en:"Kwu Tung Park serves the surrounding community, with sports fields, fitness facilities, and community activity spaces.",
    desc_zh_cn:"\u53e4\u6d1e\u516c\u56ed\u670d\u52a1\u4e8e\u5468\u8fb9\u793e\u533a\uff0c\u89c4\u5212\u8fd0\u52a8\u573a\u5730\u3001\u5065\u8eab\u8bbe\u65bd\u548c\u793e\u533a\u6d3b\u52a8\u7a7a\u95f4\u3002",
    desc_zh_tw:"\u53e4\u6d1e\u516c\u5712\u670d\u52a1\u65bc\u5468\u908a\u793e\u5340\uff0c\u898f\u5283\u904b\u52d5\u5834\u5730\u3001\u5065\u8eab\u8a2d\u65bd\u548c\u793e\u5340\u6d3b\u52d5\u7a7a\u9593\u3002",
    functions_en:"Community Leisure|Sports & Fitness|Community Activities",
    functions_zh_cn:"\u793e\u533a\u4f11\u95f2|\u8fd0\u52a8\u5065\u8eab|\u793e\u533a\u6d3b\u52a8",
    functions_zh_tw:"\u793e\u5340\u4f11\u958c|\u904b\u52d5\u5065\u8eab|\u793e\u5340\u6d3b\u52d5",
    coord_x:310, coord_y:340 },

  { id:"z6", name_en:"Nature Reserve", name_zh_cn:"\u81ea\u7136\u4fdd\u62a4\u533a", name_zh_tw:"\u81ea\u7136\u4fdd\u8b77\u5340", type:"reserve",
    type_label_en:"Nature Reserve", type_label_zh_cn:"\u81ea\u7136\u4fdd\u62a4\u533a", type_label_zh_tw:"\u81ea\u7136\u4fdd\u8b77\u5340",
    area_en:"~180 ha", area_zh_cn:"\u7ea6 180 \u516c\u9877", area_zh_tw:"\u7d04 180 \u516c\u9803",
    status_key:"designated",
    desc_en:"The Nature Reserve focuses on ecological conservation with restricted public access, primarily for research monitoring and ecological protection.",
    desc_zh_cn:"\u81ea\u7136\u4fdd\u62a4\u533a\u4ee5\u751f\u6001\u4fdd\u80b2\u4e3a\u6838\u5fc3\uff0c\u9650\u5236\u516c\u4f17\u8fdb\u5165\uff0c\u4e3b\u8981\u4f9b\u79d1\u7814\u76d1\u6d4b\u548c\u751f\u6001\u4fdd\u62a4\u4f7f\u7528\u3002",
    desc_zh_tw:"\u81ea\u7136\u4fdd\u8b77\u5340\u4ee5\u751f\u614b\u4fdd\u80b2\u70ba\u6838\u5fc3\uff0c\u9650\u5236\u516c\u773e\u9032\u5165\uff0c\u4e3b\u8981\u4f9b\u79d1\u7814\u76e3\u6e2c\u548c\u751f\u614b\u4fdd\u8b77\u4f7f\u7528\u3002",
    functions_en:"Ecological Conservation|Research Monitoring|Restricted Access",
    functions_zh_cn:"\u751f\u6001\u4fdd\u80b2|\u79d1\u7814\u76d1\u6d4b|\u9650\u5236\u8fdb\u5165",
    functions_zh_tw:"\u751f\u614b\u4fdd\u80b2|\u79d1\u7814\u76e3\u6e2c|\u9650\u5236\u9032\u5165",
    coord_x:480, coord_y:340 },

  { id:"z7", name_en:"Eco-Corridor B", name_zh_cn:"\u751f\u6001\u8d70\u5ecaB", name_zh_tw:"\u751f\u614b\u8d70\u5ecaB", type:"corridor",
    type_label_en:"Eco-Corridor", type_label_zh_cn:"\u751f\u6001\u8d70\u5eca", type_label_zh_tw:"\u751f\u614b\u8d70\u5eca",
    area_en:"~50 ha", area_zh_cn:"\u7ea6 50 \u516c\u9877", area_zh_tw:"\u7d04 50 \u516c\u9803",
    status_key:"planning",
    desc_en:"Eco-Corridor B connects Kwu Tung Park and the Nature Reserve, providing greenway cycling and ecological connection functions.",
    desc_zh_cn:"\u751f\u6001\u8d70\u5ecaB\u8fde\u63a5\u53e4\u6d1e\u516c\u56ed\u4e0e\u81ea\u7136\u4fdd\u62a4\u533a\uff0c\u63d0\u4f9b\u7eff\u9053\u9a91\u884c\u548c\u751f\u6001\u8fde\u63a5\u529f\u80fd\u3002",
    desc_zh_tw:"\u751f\u614b\u8d70\u5ecaB\u9023\u63a5\u53e4\u6d1e\u516c\u5712\u8207\u81ea\u7136\u4fdd\u8b77\u5340\uff0c\u63d0\u4f9b\u7da0\u9053\u9a0e\u884c\u548c\u751f\u614b\u9023\u63a5\u529f\u80fd\u3002",
    functions_en:"Ecological Connection|Greenway Cycling",
    functions_zh_cn:"\u751f\u6001\u8fde\u63a5|\u7eff\u9053\u9a91\u884c",
    functions_zh_tw:"\u751f\u614b\u9023\u63a5|\u7da0\u9053\u9a0e\u884c",
    coord_x:155, coord_y:350 },

  { id:"z8", name_en:"Fanling Park", name_zh_cn:"\u7c89\u5cad\u516c\u56ed", name_zh_tw:"\u7c89\u5dba\u516c\u5712", type:"park",
    type_label_en:"Park", type_label_zh_cn:"\u516c\u56ed\u7528\u5730", type_label_zh_tw:"\u516c\u5712\u7528\u5730",
    area_en:"~70 ha", area_zh_cn:"\u7ea6 70 \u516c\u9877", area_zh_tw:"\u7d04 70 \u516c\u9803",
    status_key:"planning",
    desc_en:"Fanling Park integrates nature education and community leisure, featuring a nature education center and outdoor activity areas.",
    desc_zh_cn:"\u7c89\u5cad\u516c\u56ed\u89c4\u5212\u878d\u5408\u81ea\u7136\u6559\u80b2\u4e0e\u793e\u533a\u4f11\u95f2\uff0c\u5305\u542b\u81ea\u7136\u6559\u80b2\u4e2d\u5fc3\u548c\u6237\u5916\u6d3b\u52a8\u533a\u3002",
    desc_zh_tw:"\u7c89\u5dba\u516c\u5712\u898f\u5283\u878d\u5408\u81ea\u7136\u6559\u80b2\u8207\u793e\u5340\u4f11\u958c\uff0c\u5305\u542b\u81ea\u7136\u6559\u80b2\u4e2d\u5fc3\u548c\u6236\u5916\u6d3b\u52d5\u5340\u3002",
    functions_en:"Sports & Recreation|Nature Education|Community Activities",
    functions_zh_cn:"\u4f11\u95f2\u8fd0\u52a8|\u81ea\u7136\u6559\u80b2|\u793e\u533a\u6d3b\u52a8",
    functions_zh_tw:"\u4f11\u958c\u904b\u52d5|\u81ea\u7136\u6559\u80b2|\u793e\u5340\u6d3b\u52d5",
    coord_x:630, coord_y:335 },
];

const HEAT_SEED = [
  { zone_id:"z1", x:180, y:140, radius:45, intensity:0.9, type:"positive",
    text_en:"Hope to add birdwatching hides and guided tour services",
    text_zh_cn:"\u5e0c\u671b\u589e\u52a0\u89c2\u9e1f\u9690\u853d\u8bbe\u65bd\u548c\u5bfc\u8d4f\u670d\u52a1",
    text_zh_tw:"\u5e0c\u671b\u589e\u52a0\u89c0\u9ce5\u96b1\u853d\u8a2d\u65bd\u548c\u5c0e\u8cde\u670d\u52a1",
    tag:"func.eco" },
  { zone_id:"z2", x:370, y:130, radius:35, intensity:0.7, type:"improve",
    text_en:"Insufficient shade facilities, too hot in summer",
    text_zh_cn:"\u906e\u9634\u8bbe\u65bd\u4e0d\u8db3\uff0c\u590f\u5b63\u592a\u70ed\u65e0\u6cd5\u4f7f\u7528",
    text_zh_tw:"\u906e\u9634\u8a2d\u65bd\u4e0d\u8db3\uff0c\u590f\u5b63\u592a\u71b1\u7121\u6cd5\u4f7f\u7528",
    tag:"tag.shade" },
  { zone_id:"z3", x:535, y:200, radius:40, intensity:0.8, type:"function",
    text_en:"Suggest adding greenway cycling routes and rest stops",
    text_zh_cn:"\u5efa\u8bae\u589e\u52a0\u7eff\u9053\u9a91\u884c\u8def\u7ebf\u548c\u4f11\u606f\u7ad9",
    text_zh_tw:"\u5efa\u8b70\u589e\u52a0\u7da0\u9053\u9a0e\u884c\u8def\u7dda\u548c\u4f11\u606f\u7ad9",
    tag:"func.cycling" },
  { zone_id:"z4", x:680, y:120, radius:30, intensity:0.6, type:"concern",
    text_en:"Concerned that development will affect ecological restoration",
    text_zh_cn:"\u62c5\u5fc3\u5f00\u53d1\u5f71\u54cd\u751f\u6001\u4fee\u590d\u8fdb\u5ea6",
    text_zh_tw:"\u64d4\u5fc3\u958b\u767c\u5f71\u97ff\u751f\u614b\u4fee\u5fa9\u9032\u5ea6",
    tag:"func.eco" },
  { zone_id:"z5", x:310, y:340, radius:38, intensity:0.75, type:"improve",
    text_en:"Poor walkability, need more entrances",
    text_zh_cn:"\u6b65\u884c\u53ef\u8fbe\u6027\u5dee\uff0c\u9700\u8981\u66f4\u591a\u5165\u53e3",
    text_zh_tw:"\u6b65\u884c\u53ef\u9054\u6027\u5dee\uff0c\u9700\u8981\u66f4\u591a\u5165\u53e3",
    tag:"tag.walkable" },
  { zone_id:"z6", x:480, y:340, radius:42, intensity:0.85, type:"concern",
    text_en:"Should restrict visitor access to protect ecology",
    text_zh_cn:"\u5e94\u9650\u5236\u6e38\u5ba2\u8fdb\u5165\uff0c\u4fdd\u62a4\u751f\u6001",
    text_zh_tw:"\u61c9\u9650\u5236\u904a\u5ba2\u9032\u5165\uff0c\u4fdd\u8b77\u751f\u614b",
    tag:"func.eco" },
  { zone_id:"z7", x:155, y:350, radius:28, intensity:0.5, type:"positive",
    text_en:"Eco-corridor design is great, support it",
    text_zh_cn:"\u751f\u6001\u8d70\u5eca\u8bbe\u8ba1\u5f88\u597d\uff0c\u652f\u6301",
    text_zh_tw:"\u751f\u614b\u8d70\u5eca\u8a2d\u8a08\u5f88\u597d\uff0c\u652f\u6301",
    tag:"func.eco" },
  { zone_id:"z8", x:630, y:335, radius:36, intensity:0.7, type:"function",
    text_en:"Hope to add a children nature education center",
    text_zh_cn:"\u5e0c\u671b\u589e\u8bbe\u513f\u7ae5\u81ea\u7136\u6559\u80b2\u4e2d\u5fc3",
    text_zh_tw:"\u5e0c\u671b\u589e\u8a2d\u5152\u7ae5\u81ea\u7136\u6559\u80b2\u4e2d\u5fc3",
    tag:"func.education" },
];

function seedIfEmpty() {
  const zoneCount = db.prepare("SELECT COUNT(*) as c FROM zones").get();
  if (zoneCount.c === 0) {
    const insertZone = db.prepare(`INSERT INTO zones
      (id,name_en,name_zh_cn,name_zh_tw,type,type_label_en,type_label_zh_cn,type_label_zh_tw,
       area_en,area_zh_cn,area_zh_tw,status_key,desc_en,desc_zh_cn,desc_zh_tw,
       functions_en,functions_zh_cn,functions_zh_tw,coord_x,coord_y)
      VALUES (@id,@name_en,@name_zh_cn,@name_zh_tw,@type,@type_label_en,@type_label_zh_cn,@type_label_zh_tw,
       @area_en,@area_zh_cn,@area_zh_tw,@status_key,@desc_en,@desc_zh_cn,@desc_zh_tw,
       @functions_en,@functions_zh_cn,@functions_zh_tw,@coord_x,@coord_y)`);
    ZONE_SEED.forEach(z => insertZone.run(z));
  }

  const heatCount = db.prepare("SELECT COUNT(*) as c FROM heat_points").get();
  if (heatCount.c === 0) {
    const insertHeat = db.prepare(`INSERT INTO heat_points
      (zone_id,x,y,radius,intensity,type,text_en,text_zh_cn,text_zh_tw,tag,source)
      VALUES (@zone_id,@x,@y,@radius,@intensity,@type,@text_en,@text_zh_cn,@text_zh_tw,@tag,'seed')`);
    HEAT_SEED.forEach(h => insertHeat.run(h));
  }
}

seedIfEmpty();

module.exports = { db };
