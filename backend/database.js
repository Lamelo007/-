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
    area_en:"1,540 ha (Ramsar Site)", area_zh_cn:"约 1,540 公顷（拉姆萨尔湿地）", area_zh_tw:"約 1,540 公頃（拉姆薩爾濕地）",
    status_key:"designated",
    desc_en:"Mai Po Inner Deep Bay was listed as a Wetland of International Importance under the Ramsar Convention on 4 September 1995. The 1,540-ha site hosts over 20,000 migratory waterbirds each winter, including the endangered Black-faced Spoonbill (Platalea minor). The 380-ha Mai Po Nature Reserve within it has been managed by WWF-Hong Kong since 1983. The site's biodiversity includes 17 mammal species, 21 reptiles, 7 amphibians, 37 fish, over 400 invertebrates and 140 plant species.",
    desc_zh_cn:"米埔内后海湾于1995年9月4日根据《拉姆萨尔公约》列为国际重要湿地，面积1,540公顷，每年冬季接待超过20,000只迁徙水鸟，包括濒危物种黑脸琵鹭。其中380公顷的米埔自然保护区自1983年起由世界自然基金会香港分会管理。该地生物多样性包括17种哺乳动物、21种爬行动物、7种两栖动物、37种鱼类、400多种无脊椎动物及140种植物。",
    desc_zh_tw:"米埔內后海灣於1995年9月4日根據《拉姆薩爾公約》列為國際重要濕地，面積1,540公頃，每年冬季接待超過20,000隻遷徙水鳥，包括瀕危物種黑臉琵鷺。其中380公頃的米埔自然保護區自1983年起由世界自然基金會香港分會管理。該地生物多樣性包括17種哺乳動物、21種爬行動物、7種兩棲動物、37種魚類、400多種無脊椎動物及140種植物。",
    functions_en:"Ecological Conservation|Birdwatching|Environmental Education",
    functions_zh_cn:"生态保育|观鸟|环境教育",
    functions_zh_tw:"生態保育|觀鳥|環境教育",
    coord_x:122, coord_y:219 },

  { id:"z2", name_en:"Deep Bay Wetland (outside Ramsar Site)", name_zh_cn:"拉姆萨尔湿地以外的后海湾湿地", name_zh_tw:"拉姆薩爾濕地以外的后海灣濕地", type:"wetland",
    type_label_en:"Wetland", type_label_zh_cn:"湿地", type_label_zh_tw:"濕地",
    area_en:"600+ ha fishponds", area_zh_cn:"约 600+ 公顷鱼塘", area_zh_tw:"約 600+ 公頃魚塘",
    status_key:"designated",
    desc_en:"The Deep Bay wetland outside the Ramsar site contains over 600 ha of commercial fishponds producing 2,900 tonnes of fish (HK$73 million) in 2021. Since 2012, AFCD has implemented Management Agreement projects with fishpond operators to enhance ecological functions. 200-300 ha of inactive fishponds offer mangrove restoration potential. The 1,000+ ha of fishponds and gei wais also provide critical storm surge buffering, as demonstrated during Super Typhoon Hato in 2017 (4.56m tidal surge).",
    desc_zh_cn:"拉姆萨尔湿地以外的后海湾湿地拥有逾600公顷商业鱼塘，2021年生产2,900吨淡水鱼（产值7,300万港元）。自2012年起，渔护署与鱼塘经营者实施管理协议项目以提升生态功能。200-300公顷闲置鱼塘具备红树林修复潜力。逾1,000公顷鱼塘及基围在2017年超强台风「天鸽」（风暴潮4.56米）中发挥了关键的缓冲作用。",
    desc_zh_tw:"拉姆薩爾濕地以外的后海灣濕地擁有逾600公頃商業魚塘，2021年生產2,900噸淡水魚（產值7,300萬港元）。自2012年起，漁護署與魚塘經營者實施管理協議項目以提升生態功能。200-300公頃閒置魚塘具備紅樹林修復潛力。逾1,000公頃魚塘及基圍在2017年超強颱風「天鴿」（風暴潮4.56米）中發揮了關鍵的緩衝作用。",
    functions_en:"Wetland Restoration|Fishpond Management|Waterbird Habitat",
    functions_zh_cn:"湿地修复|鱼塘管理|候鸟栖地",
    functions_zh_tw:"濕地修復|魚塘管理|候鳥棲地",
    coord_x:254, coord_y:136 },

  { id:"z3", name_en:"Long Valley & Ho Sheung Heung", name_zh_cn:"塱原及河上乡", name_zh_tw:"塱原及河上鄉", type:"park",
    type_label_en:"Eco Park", type_label_zh_cn:"生态公园", type_label_zh_tw:"生態公園",
    area_en:"37 ha", area_zh_cn:"约 37 公顷", area_zh_tw:"約 37 公頃",
    status_key:"designated",
    desc_en:"Long Valley Nature Park (37 ha) opened in November 2024 after five years of construction (started 2019). Managed by AFCD with AECOM design, it integrates wetland conservation, eco-friendly farming, and nature education. Wetland area increased by 8 ha; bird counts rose 20-40% across seasons. Critically endangered Yellow-breasted Bunting (Emberiza aureola) found here. The nature centre received BEAM Plus Platinum rating. The project won the 2024 NEC Martin Barnes Award for carbon reduction.",
    desc_zh_cn:"塱原自然生态公园（37公顷）于2024年11月启用，历时五年建造（2019年动工）。由渔护署管理、AECOM设计，集湿地保育、生态友善耕作及自然教育于一体。湿地面积增加8公顷，各季节鸟类数量增幅达20-40%。园区发现极度濒危的黄胸鹀。自然生态中心获绿建环评铂金级认证。项目荣获2024年NEC Martin Barnes大奖。",
    desc_zh_tw:"塱原自然生態公園（37公頃）於2024年11月啟用，歷時五年建造（2019年動工）。由漁護署管理、AECOM設計，集濕地保育、生態友善耕作及自然教育於一體。濕地面積增加8公頃，各季節鳥類數量增幅達20-40%。園區發現極度瀕危的黃胸鵐。自然生態中心獲綠建環評鉑金級認證。項目榮獲2024年NEC Martin Barnes大獎。",
    functions_en:"Farmland Conservation|Nature Education|Eco-tourism",
    functions_zh_cn:"农业保育|自然教育|生态旅游",
    functions_zh_tw:"農業保育|自然教育|生態旅遊",
    coord_x:356, coord_y:154 },

  { id:"z4", name_en:"Fung Yuen", name_zh_cn:"凤园", name_zh_tw:"鳳園", type:"reserve",
    type_label_en:"Conservation Reserve", type_label_zh_cn:"自然保育地", type_label_zh_tw:"自然保育地",
    area_en:"42 ha", area_zh_cn:"约 42 公顷", area_zh_tw:"約 42 公頃",
    status_key:"designated",
    desc_en:"Fung Yuen is a designated Site of Special Scientific Interest (SSSI) and one of Hong Kong's most important butterfly sites, with over 200 species recorded out of Hong Kong's total of approximately 250 species. Located about 2 km from Tai Po town centre, the Fung Yuen Butterfly Reserve is managed by the Environmental Association as a butterfly conservation and education centre. It is recognised as a key site for butterfly ecological conservation under the New Nature Conservation Policy.",
    desc_zh_cn:"凤园是获指定的具特殊科学价值地点（SSSI），也是香港最重要的蝴蝶栖息地之一，记录超过200种蝴蝶（全港约250种）。位于大埔市中心约2公里处，凤园蝴蝶保育区由环保协进会管理，作为蝴蝶保育与教育中心。在新自然保育政策下被列为蝴蝶生态保育的重点区域。",
    desc_zh_tw:"鳳園是獲指定的具特殊科學價值地點（SSSI），也是香港最重要的蝴蝶棲息地之一，記錄超過200種蝴蝶（全港約250種）。位於大埔市中心約2公里處，鳳園蝴蝶保育區由環保協進會管理，作為蝴蝶保育與教育中心。在新自然保育政策下被列為蝴蝶生態保育的重點區域。",
    functions_en:"Butterfly Conservation|Nature Guiding|Community Engagement",
    functions_zh_cn:"蝴蝶保育|生态导赏|社区参与",
    functions_zh_tw:"蝴蝶保育|生態導賞|社區參與",
    coord_x:544, coord_y:274 },

  { id:"z5", name_en:"Sha Lo Tung", name_zh_cn:"沙罗洞", name_zh_tw:"沙羅洞", type:"reserve",
    type_label_en:"Conservation Reserve", type_label_zh_cn:"自然保育地", type_label_zh_tw:"自然保育地",
    area_en:"56 ha", area_zh_cn:"约 56 公顷", area_zh_tw:"約 56 公頃",
    status_key:"restoring",
    desc_en:"Sha Lo Tung (56 ha) is a rare freshwater valley wetland designated as a SSSI in 1997. It ranks second in ecological priority among Hong Kong's 12 key sites under the New Nature Conservation Policy, behind only Mai Po. Over 80 dragonfly species (60%+ of Hong Kong's total) are found here, including the Hong Kong endemic Macromidia ellenae first discovered in the early 1990s. The site also hosts nearly 600 vascular plant species, 100+ bird species, and rare freshwater fish including the endemic Hong Kong Paradise Fish (Macropodus hongkongensis). In 2020, the government completed a non-in-situ land exchange with the developer; in 2024 AFCD launched a new proactive conservation project.",
    desc_zh_cn:"沙罗洞（56公顷）是罕见的山谷淡水湿地，1997年被列为具特殊科学价值地点。在新自然保育政策的12个重点保育地点中，其生态重要性仅次于米埔，位列第二。记录逾80种蜻蜓（占全港六成以上），包括1990年代初全球首次发现的香港特有种伊中伪蜻。此外，该地有近600种维管束植物、逾100种鸟类及珍稀淡水鱼，包括香港特有种香港斗鱼。2020年政府与非原址换地完成，2024年渔护署启动主动保育项目。",
    desc_zh_tw:"沙羅洞（56公頃）是罕見的山谷淡水濕地，1997年被列為具特殊科學價值地點。在新自然保育政策的12個重點保育地點中，其生態重要性僅次於米埔，位列第二。記錄逾80種蜻蜓（佔全港六成以上），包括1990年代初全球首次發現的香港特有種伊中偽蜻。此外，該地有近600種維管束植物、逾100種鳥類及珍稀淡水魚，包括香港特有種香港鬥魚。2020年政府與非原址換地完成，2024年漁護署啟動主動保育項目。",
    functions_en:"Dragonfly Conservation|Wetland Restoration|Restricted Access",
    functions_zh_cn:"蜻蜓保育|湿地修复|限制进入",
    functions_zh_tw:"蜻蜓保育|濕地修復|限制進入",
    coord_x:555, coord_y:248 },

  { id:"z6", name_en:"Luk Keng Marsh", name_zh_cn:"鹿颈沼泽", name_zh_tw:"鹿頸沼澤", type:"wetland",
    type_label_en:"Wetland", type_label_zh_cn:"湿地", type_label_zh_tw:"濕地",
    area_en:"37 ha", area_zh_cn:"约 37 公顷", area_zh_tw:"約 37 公頃",
    status_key:"planning",
    desc_en:"Luk Keng Marsh lies on the western shore of Starling Inlet (Sha Tau Kok Hoi), within the North District (136.51 sq km, population ~309,600). It is an important heronry and waterbird habitat outside Deep Bay, accessible via the Luk Keng Country Trail. The area is part of the Frontier Closed Area; visitors may need a permit. Under the Northern Metropolis Strategy, Luk Keng is planned for integration into the ecological corridor network linking Robin's Nest Country Park with coastal habitats.",
    desc_zh_cn:"鹿颈沼泽位于沙头角海（Starling Inlet）西岸，属北区（面积136.51平方公里，人口约309,600），是后海湾以外重要的鹭鸟林与水鸟栖息地，可经鹿颈郊游步道抵达。该区域属边境禁区，访客可能需要许可证。在北部都会区发展策略下，鹿颈将纳入生态走廊网络，连结红花岭郊野公园与海岸生境。",
    desc_zh_tw:"鹿頸沼澤位於沙頭角海（Starling Inlet）西岸，屬北區（面積136.51平方公里，人口約309,600），是后海灣以外重要的鷺鳥林與水鳥棲息地，可經鹿頸郊遊步道抵達。該區域屬邊境禁區，訪客可能需要許可證。在北部都會區發展策略下，鹿頸將納入生態走廊網絡，連結紅花嶺郊野公園與海岸生境。",
    functions_en:"Heronry Habitat|Ecological Corridor|Coastal Conservation",
    functions_zh_cn:"鹭鸟栖地|生态走廊|海岸保育",
    functions_zh_tw:"鷺鳥棲地|生態走廊|海岸保育",
    coord_x:655, coord_y:118 },

  { id:"z7", name_en:"Wu Kau Tang", name_zh_cn:"乌蛟腾", name_zh_tw:"烏蛟騰", type:"park",
    type_label_en:"Eco Park", type_label_zh_cn:"生态公园", type_label_zh_tw:"生態公園",
    area_en:"103 ha", area_zh_cn:"约 103 公顷", area_zh_tw:"約 103 公頃",
    status_key:"planning",
    desc_en:"Wu Kau Tang is enclosed by Plover Cove Country Park in the northeastern New Territories, retaining old Hakka village heritage and feng shui woodland. The area is rich in butterfly fauna — the rare Bi-spot Royal (Ancema ctesia) and the first Hong Kong record of Yellow Coster (Acraea issoria) were found here in Plover Cove Country Park. The Double Haven Country Trail runs from Wu Kau Tang to Lai Chi Wo, connecting to the Hong Kong UNESCO Global Geopark. The plan promotes rural eco-tourism with trail upgrades and interpretation while protecting the feng shui woods.",
    desc_zh_cn:"乌蛟腾位于新界东北部，四面被船湾郊野公园环绕，保留客家村落遗产与风水林。该区蝴蝶资源丰富——在船湾郊野公园发现过珍稀的双点黛眼蝶，以及香港首次记录的黄锯蛱蝶。乌蛟腾至荔枝窝的双春海岸步道连接至香港联合国教科文组织世界地质公园。规划以乡郊生态旅游为方向，改善步道与解说设施，同时保护风水林。",
    desc_zh_tw:"烏蛟騰位於新界東北部，四面被船灣郊野公園環繞，保留客家村落遺產與風水林。該區蝴蝶資源豐富——在船灣郊野公園發現過珍稀的雙點黛眼蝶，以及香港首次記錄的黃鋸蛺蝶。烏蛟騰至荔枝窩的雙春海岸步道連接至香港聯合國教科文組織世界地質公園。規劃以鄉郊生態旅遊為方向，改善步道與解說設施，同時保護風水林。",
    functions_en:"Feng Shui Woodland|Country Trails|Rural Tourism",
    functions_zh_cn:"风水林保育|郊野步道|乡郊旅游",
    functions_zh_tw:"風水林保育|郊野步道|鄉郊旅遊",
    coord_x:736, coord_y:163 },
];

const HEAT_SEED = [
  { zone_id:"z1", x:104, y:243, radius:45, intensity:0.9, type:"positive",
    text_en:"WWF-HK manages Mai Po Nature Reserve since 1983 — hope to add more birdwatching hides and guided tours for the 20,000+ winter waterbirds",
    text_zh_cn:"世界自然基金会自1983年管理米埔，希望增加观鸟屋和导赏团，服务每年逾20,000只越冬水鸟",
    text_zh_tw:"世界自然基金會自1983年管理米埔，希望增加觀鳥屋和導賞團，服務每年逾20,000隻越冬水鳥",
    tag:"func.birdwatch" },

  { zone_id:"z2", x:280, y:116, radius:38, intensity:0.7, type:"improve",
    text_en:"Fishpond Management Agreement projects since 2012 should continue to protect the Black-faced Spoonbill's foraging habitat",
    text_zh_cn:"自2012年起实施的管理协议项目应持续，以保护黑脸琵鹭的觅食生境",
    text_zh_tw:"自2012年起實施的管理協議項目應持續，以保護黑臉琵鷺的覓食生境",
    tag:"heat.wetlandManage" },

  { zone_id:"z3", x:332, y:136, radius:34, intensity:0.8, type:"function",
    text_en:"Long Valley Nature Park opened Nov 2024 — suggest expanding farm market and nature education at the new BEAM Plus Platinum centre",
    text_zh_cn:"塱原自然生态公园2024年11月启用，建议在获绿建环评铂金级认证的中心扩展农墟及自然教育",
    text_zh_tw:"塱原自然生態公園2024年11月啟用，建議在獲綠建環評鉑金級認證的中心擴展農墟及自然教育",
    tag:"func.education" },

  { zone_id:"z4", x:564, y:292, radius:30, intensity:0.6, type:"concern",
    text_en:"Concerned about nearby development affecting Fung Yuen SSSI butterfly habitat — 200+ species need protection",
    text_zh_cn:"担心周边发展影响凤园SSSI蝴蝶栖息地——逾200种蝴蝶需保护",
    text_zh_tw:"擔心周邊發展影響鳳園SSSI蝴蝶棲息地——逾200種蝴蝶需保護",
    tag:"func.eco" },

  { zone_id:"z5", x:535, y:268, radius:42, intensity:0.85, type:"concern",
    text_en:"Sha Lo Tung SSSI (#2 priority site) should limit access to protect 80+ dragonfly species incl. endemic Macromidia ellenae",
    text_zh_cn:"沙罗洞SSSI（第二优先保育地点）应限制进入，保护逾80种蜻蜓含特有种伊中伪蜻",
    text_zh_tw:"沙羅洞SSSI（第二優先保育地點）應限制進入，保護逾80種蜻蜓含特有種伊中偽蜻",
    tag:"func.eco" },

  { zone_id:"z6", x:679, y:102, radius:36, intensity:0.75, type:"improve",
    text_en:"Poor walkability at Luk Keng — need more shuttle access to Starling Inlet heronry area",
    text_zh_cn:"鹿颈步行可达性差——需要更多接驳前往沙头角海鹭鸟林区",
    text_zh_tw:"鹿頸步行可達性差——需要更多接駁前往沙頭角海鷺鳥林區",
    tag:"heat.access" },

  { zone_id:"z7", x:754, y:185, radius:36, intensity:0.7, type:"function",
    text_en:"Hope Wu Kau Tang adds children's nature education along the Double Haven trail to Lai Chi Wo",
    text_zh_cn:"希望乌蛟腾沿双春步道往荔枝窝增设儿童自然教育设施",
    text_zh_tw:"希望烏蛟騰沿雙春步道往荔枝窩增設兒童自然教育設施",
    tag:"func.education" },

  { zone_id:"z1", x:152, y:193, radius:20, intensity:0.4, type:"positive",
    text_en:"Excellent birdwatching — spotted Black-faced Spoonbill among 20,000+ winter waterbirds",
    text_zh_cn:"观鸟体验极佳——在20,000多只越冬水鸟中观察到黑脸琵鹭",
    text_zh_tw:"觀鳥體驗極佳——在20,000多隻越冬水鳥中觀察到黑臉琵鷺",
    tag:"func.birdwatch" },

  { zone_id:"z2", x:222, y:112, radius:18, intensity:0.35, type:"improve",
    text_en:"Storm surge buffering by 1,000+ ha fishponds proved during Typhoon Hato — maintain and restore degraded ponds",
    text_zh_cn:"逾1,000公顷鱼塘在天鸽台风中的缓冲作用已证实——应维护并修复退化鱼塘",
    text_zh_tw:"逾1,000公頃魚塘在天鴿颱風中的緩衝作用已證實——應維護並修復退化魚塘",
    tag:"heat.wetlandManage" },

  { zone_id:"z3", x:382, y:180, radius:22, intensity:0.45, type:"function",
    text_en:"Bird counts up 20-40% since construction — hope to add accessible ramps to wetland observation hides",
    text_zh_cn:"建园后鸟类数量增加20-40%——希望增加无障碍通道至湿地观鸟屋",
    text_zh_tw:"建園後鳥類數量增加20-40%——希望增加無障礙通道至濕地觀鳥屋",
    tag:"heat.accessible" },

  { zone_id:"z7", x:708, y:141, radius:28, intensity:0.5, type:"positive",
    text_en:"Plover Cove trails well maintained — Bi-spot Royal and Yellow Coster butterflies recorded here",
    text_zh_cn:"船湾郊野步道维护良好——此处记录过双点黛眼蝶和黄锯蛱蝶",
    text_zh_tw:"船灣郊野步道維護良好——此處記錄過雙點黛眼蝶和黃鋸蛺蝶",
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
