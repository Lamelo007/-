const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "greenspace.db");
const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

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
  { id:"z1", name_en:"Mai Po Ramsar Site", name_zh_cn:"拉姆萨尔湿地", name_zh_tw:"拉姆薩爾濕地", type:"wetland",
    type_label_en:"Wetland", type_label_zh_cn:"湿地", type_label_zh_tw:"濕地",
    area_en:"1,551 ha", area_zh_cn:"约 1,551 公顷", area_zh_tw:"約 1,551 公頃",
    status_key:"designated",
    desc_en:"Mai Po is Hong Kong's most important wetland, listed under the Ramsar Convention in 1995. The plan puts conservation first, adding birdwatching hides, guided trails and environmental education facilities while strictly capping visitor numbers.",
    desc_zh_cn:"拉姆萨尔湿地是香港最重要的国际重要湿地，1995 年列入《拉姆萨尔公约》。规划以保育为先，增设观鸟屋、导赏步道及环境教育设施，并严格控制访客容量。",
    desc_zh_tw:"拉姆薩爾濕地是香港最重要的國際重要濕地，1995 年列入《拉姆薩爾公約》。規劃以保育為先，增設觀鳥屋、導賞步道及環境教育設施，並嚴格控制訪客容量。",
    functions_en:"Ecological Conservation|Birdwatching|Environmental Education",
    functions_zh_cn:"生态保育|观鸟|环境教育",
    functions_zh_tw:"生態保育|觀鳥|環境教育",
    coord_x:122, coord_y:219 },

  { id:"z2", name_en:"Deep Bay Wetland (outside Ramsar Site)", name_zh_cn:"拉姆萨尔湿地以外的后海湾湿地", name_zh_tw:"拉姆薩爾濕地以外的后海灣濕地", type:"wetland",
    type_label_en:"Wetland", type_label_zh_cn:"湿地", type_label_zh_tw:"濕地",
    area_en:"1,012 ha", area_zh_cn:"约 1,012 公顷", area_zh_tw:"約 1,012 公頃",
    status_key:"designated",
    desc_en:"The Deep Bay wetland outside the Ramsar site is a mosaic of gei wai and fishponds that feeds tens of thousands of wintering waterbirds. The plan keeps fishponds ecologically friendly and restores degraded ponds to sustain the wintering capacity.",
    desc_zh_cn:"拉姆萨尔湿地以外的后海湾湿地由大片基围与鱼塘组成，是数以万计越冬水鸟的觅食地。规划推动生态友善鱼塘管理及退化鱼塘修复，维持冬季水鸟承载力。",
    desc_zh_tw:"拉姆薩爾濕地以外的后海灣濕地由大片基圍與魚塘組成，是數以萬計越冬水鳥的覓食地。規劃推動生態友善魚塘管理及退化魚塘修復，維持冬季水鳥承載力。",
    functions_en:"Wetland Restoration|Fishpond Management|Waterbird Habitat",
    functions_zh_cn:"湿地修复|鱼塘管理|候鸟栖地",
    functions_zh_tw:"濕地修復|魚塘管理|候鳥棲地",
    coord_x:254, coord_y:136 },

  { id:"z3", name_en:"Long Valley & Ho Sheung Heung", name_zh_cn:"塱原及河上乡", name_zh_tw:"塱原及河上鄉", type:"park",
    type_label_en:"Eco Park", type_label_zh_cn:"生态公园", type_label_zh_tw:"生態公園",
    area_en:"151 ha", area_zh_cn:"约 151 公顷", area_zh_tw:"約 151 公頃",
    status_key:"designated",
    desc_en:"Long Valley and Ho Sheung Heung form the largest contiguous patch of freshwater wetland farmland in Hong Kong; the Long Valley Nature Park opened here in 2024. The plan balances farming with conservation and adds a nature education centre and farm market.",
    desc_zh_cn:"塱原及河上乡是香港最大的连片淡水湿农地，塱原自然生态公园已于 2024 年启用。规划兼顾农业生产与生态保育，并设自然教育中心及农墟。",
    desc_zh_tw:"塱原及河上鄉是香港最大的連片淡水濕農地，塱原自然生態公園已於 2024 年啟用。規劃兼顧農業生產與生態保育，並設自然教育中心及農墟。",
    functions_en:"Farmland Conservation|Nature Education|Eco-tourism",
    functions_zh_cn:"农业保育|自然教育|生态旅游",
    functions_zh_tw:"農業保育|自然教育|生態旅遊",
    coord_x:356, coord_y:154 },

  { id:"z4", name_en:"Fung Yuen", name_zh_cn:"凤园", name_zh_tw:"鳳園", type:"reserve",
    type_label_en:"Conservation Reserve", type_label_zh_cn:"自然保育地", type_label_zh_tw:"自然保育地",
    area_en:"42 ha", area_zh_cn:"约 42 公顷", area_zh_tw:"約 42 公頃",
    status_key:"designated",
    desc_en:"Fung Yuen is one of Hong Kong's most important butterfly sites, with over 200 species recorded. The plan centres on butterfly conservation, with a butterfly garden, nature guiding trails and community participation programmes.",
    desc_zh_cn:"凤园是香港最重要的蝴蝶栖息地之一，记录超过 200 种蝴蝶。规划以蝴蝶保育为核心，设蝴蝶园、生态导赏径及社区参与计划。",
    desc_zh_tw:"鳳園是香港最重要的蝴蝶棲息地之一，記錄超過 200 種蝴蝶。規劃以蝴蝶保育為核心，設蝴蝶園、生態導賞徑及社區參與計劃。",
    functions_en:"Butterfly Conservation|Nature Guiding|Community Engagement",
    functions_zh_cn:"蝴蝶保育|生态导赏|社区参与",
    functions_zh_tw:"蝴蝶保育|生態導賞|社區參與",
    coord_x:544, coord_y:274 },

  { id:"z5", name_en:"Sha Lo Tung", name_zh_cn:"沙罗洞", name_zh_tw:"沙羅洞", type:"reserve",
    type_label_en:"Conservation Reserve", type_label_zh_cn:"自然保育地", type_label_zh_tw:"自然保育地",
    area_en:"55 ha", area_zh_cn:"约 55 公顷", area_zh_tw:"約 55 公頃",
    status_key:"restoring",
    desc_en:"Sha Lo Tung is one of the territory's most valuable freshwater wetlands, with more than 80 dragonfly species recorded. The plan uses conservation management agreements to restore abandoned farmland and marsh, keeping sensitive areas closed to the public.",
    desc_zh_cn:"沙罗洞是全港最具价值的淡水湿地之一，记录逾 80 种蜻蜓。规划以保育管理协议修复荒废农地与沼泽，敏感区域限制公众进入。",
    desc_zh_tw:"沙羅洞是全港最具價值的淡水濕地之一，記錄逾 80 種蜻蜓。規劃以保育管理協議修復荒廢農地與沼澤，敏感區域限制公眾進入。",
    functions_en:"Dragonfly Conservation|Wetland Restoration|Restricted Access",
    functions_zh_cn:"蜻蜓保育|湿地修复|限制进入",
    functions_zh_tw:"蜻蜓保育|濕地修復|限制進入",
    coord_x:555, coord_y:248 },

  { id:"z6", name_en:"Luk Keng Marsh", name_zh_cn:"鹿颈沼泽", name_zh_tw:"鹿頸沼澤", type:"wetland",
    type_label_en:"Wetland", type_label_zh_cn:"湿地", type_label_zh_tw:"濕地",
    area_en:"37 ha", area_zh_cn:"约 37 公顷", area_zh_tw:"約 37 公頃",
    status_key:"planning",
    desc_en:"Luk Keng Marsh lies on the western shore of Starling Inlet and is a key heronry and waterbird habitat outside Deep Bay. The plan folds it into the ecological corridor network linking Robin's Nest Country Park with coastal habitats.",
    desc_zh_cn:"鹿颈沼泽位于沙头角海西岸，是后海湾以外重要的鹭鸟与水鸟栖地。规划将其纳入生态走廊网络，连结红花岭郊野公园与海岸生境。",
    desc_zh_tw:"鹿頸沼澤位於沙頭角海西岸，是后海灣以外重要的鷺鳥與水鳥棲地。規劃將其納入生態走廊網絡，連結紅花嶺郊野公園與海岸生境。",
    functions_en:"Heronry Habitat|Ecological Corridor|Coastal Conservation",
    functions_zh_cn:"鹭鸟栖地|生态走廊|海岸保育",
    functions_zh_tw:"鷺鳥棲地|生態走廊|海岸保育",
    coord_x:655, coord_y:118 },

  { id:"z7", name_en:"Wu Kau Tang", name_zh_cn:"乌蛟腾", name_zh_tw:"烏蛟騰", type:"park",
    type_label_en:"Eco Park", type_label_zh_cn:"生态公园", type_label_zh_tw:"生態公園",
    area_en:"103 ha", area_zh_cn:"约 103 公顷", area_zh_tw:"約 103 公頃",
    status_key:"planning",
    desc_en:"Wu Kau Tang sits on the northern edge of Plover Cove Country Park and retains feng shui woodland and old villages. The plan promotes rural eco-tourism, upgrading trails and interpretation while protecting the feng shui woods.",
    desc_zh_cn:"乌蛟腾位于船湾郊野公园北缘，保留风水林及古老村落。规划以乡郊生态旅游为方向，改善步道与解说设施，同时保护风水林。",
    desc_zh_tw:"烏蛟騰位於船灣郊野公園北緣，保留風水林及古老村落。規劃以鄉郊生態旅遊為方向，改善步道與解說設施，同時保護風水林。",
    functions_en:"Feng Shui Woodland|Country Trails|Rural Tourism",
    functions_zh_cn:"风水林保育|郊野步道|乡郊旅游",
    functions_zh_tw:"風水林保育|郊野步道|鄉郊旅遊",
    coord_x:736, coord_y:163 },
];

const HEAT_SEED = [
  { zone_id:"z1", x:104, y:243, radius:45, intensity:0.9, type:"positive",
    text_en:"Hope Mai Po adds more birdwatching hides and guided tours",
    text_zh_cn:"希望拉姆萨尔湿地增加观鸟屋和导赏团服务",
    text_zh_tw:"希望拉姆薩爾濕地增加觀鳥屋和導賞團服務",
    tag:"func.birdwatch" },

  { zone_id:"z2", x:280, y:116, radius:38, intensity:0.7, type:"improve",
    text_en:"Fishpond management should stay eco-friendly for wintering birds",
    text_zh_cn:"鱼塘管理应维持生态友善，保障越冬水鸟",
    text_zh_tw:"魚塘管理應維持生態友善，保障越冬水鳥",
    tag:"heat.wetlandManage" },

  { zone_id:"z3", x:332, y:136, radius:34, intensity:0.8, type:"function",
    text_en:"Suggest adding a farm market and nature education facilities at Long Valley",
    text_zh_cn:"建议塱原增设农墟及自然教育设施",
    text_zh_tw:"建議塱原增設農墟及自然教育設施",
    tag:"func.education" },

  { zone_id:"z4", x:564, y:292, radius:30, intensity:0.6, type:"concern",
    text_en:"Worried nearby development will damage the Fung Yuen butterfly habitat",
    text_zh_cn:"担心周边发展影响凤园蝴蝶栖息地",
    text_zh_tw:"擔心周邊發展影響鳳園蝴蝶棲息地",
    tag:"func.eco" },

  { zone_id:"z5", x:535, y:268, radius:42, intensity:0.85, type:"concern",
    text_en:"Sha Lo Tung should limit visitor access to protect the dragonfly habitat",
    text_zh_cn:"沙罗洞应限制游客进入，保护蜻蜓栖息地",
    text_zh_tw:"沙羅洞應限制遊客進入，保護蜻蜓棲息地",
    tag:"func.eco" },

  { zone_id:"z6", x:679, y:102, radius:36, intensity:0.75, type:"improve",
    text_en:"Poor walkability at Luk Keng, need more shuttle access",
    text_zh_cn:"鹿颈步行可达性差，需要更多接驳",
    text_zh_tw:"鹿頸步行可達性差，需要更多接駁",
    tag:"heat.access" },

  { zone_id:"z7", x:754, y:185, radius:36, intensity:0.7, type:"function",
    text_en:"Hope Wu Kau Tang adds a children's nature education centre",
    text_zh_cn:"希望乌蛟腾增设儿童自然教育中心",
    text_zh_tw:"希望烏蛟騰增設兒童自然教育中心",
    tag:"func.education" },

  { zone_id:"z1", x:152, y:193, radius:20, intensity:0.4, type:"positive",
    text_en:"Great birdwatching experience",
    text_zh_cn:"观鸟体验很好",
    text_zh_tw:"觀鳥體驗很好",
    tag:"func.birdwatch" },

  { zone_id:"z2", x:222, y:112, radius:18, intensity:0.35, type:"improve",
    text_en:"Insufficient night lighting",
    text_zh_cn:"夜间照明不足",
    text_zh_tw:"夜間照明不足",
    tag:"heat.lighting" },

  { zone_id:"z3", x:382, y:180, radius:22, intensity:0.45, type:"function",
    text_en:"Hope to add accessible ramps",
    text_zh_cn:"希望增加无障碍通道",
    text_zh_tw:"希望增加無障礙通道",
    tag:"heat.accessible" },

  { zone_id:"z7", x:708, y:141, radius:28, intensity:0.5, type:"positive",
    text_en:"Country trails are well maintained, support it",
    text_zh_cn:"郊野步道维护良好，支持",
    text_zh_tw:"郊野步道維護良好，支持",
    tag:"heat.ecoConn" },
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
