/* ========== App Logic (uses i18n.js for translations) ========== */
/* App Logic */
const zoneKeys = ['z1','z2','z3','z4','z5','z6','z7'];
const surveyZoneKeys = [
  {key:'z1', icon:'\u{1F986}'},
  {key:'z2', icon:'\u{1F41F}'},
  {key:'z3', icon:'\u{1F33E}'},
  {key:'z4', icon:'\u{1F98B}'},
  {key:'z5', icon:'\u{1FAB7}'},
  {key:'z6', icon:'\u{1FAB6}'},
  {key:'z7', icon:'\u{1F333}'},
];
const funcKeys = [
  {key:'func.sports', icon:'\u{1F3C3}'},
  {key:'func.children', icon:'\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}'},
  {key:'func.eco', icon:'\u{1F98B}'},
  {key:'func.cycling', icon:'\u{1F6B4}'},
  {key:'func.education', icon:'\u{1F393}'},
  {key:'func.birdwatch', icon:'\u{1F41F}'},
];
/* The opinion corpus that drives every figure on this page lives
   further down, next to the zone coordinates it samples around.
   See "demo opinion corpus" below. */
const heatTexts = {
  'en':{
    'heat.p1':'Hope Mai Po adds more birdwatching hides and guided tours',
    'heat.p2':'Fishpond management should stay eco-friendly for wintering birds',
    'heat.p3':'Suggest adding a farm market and nature education facilities at Long Valley',
    'heat.p4':'Worried nearby development will damage the Fung Yuen butterfly habitat',
    'heat.p5':'Poor walkability at Luk Keng, need more shuttle access',
    'heat.p6':'Sha Lo Tung should limit visitor access to protect the dragonfly habitat',
    'heat.p7':'Country trails are well maintained, support it',
    'heat.p8':'Hope Wu Kau Tang adds a children\'s nature education centre',
    'heat.p9':'Great birdwatching experience',
    'heat.p10':'Insufficient night lighting',
    'heat.p11':'Hope to add accessible ramps',
    'heat.wetlandManage':'Fishpond Management',
    'heat.access':'Accessibility',
    'heat.restricted':'Restricted Access',
    'heat.lighting':'Night Lighting',
    'heat.accessible':'Accessible Design',
    'heat.ecoConn':'Ecological Connection',
    'heat.p12':'Suggest more shaded rest spots along the birdwatching trail',
    'heat.p13':'Worried too many visitors will disturb the wintering waterbirds',
    'heat.p14':'Worried the fishponds will be filled in for development',
    'heat.p15':'Hope to add a birdwatching platform',
    'heat.p16':'The farmland landscape is worth keeping, support it',
    'heat.p17':'Worried the farmland will be rezoned for housing',
    'heat.p18':'The butterfly conservation work here is excellent',
    'heat.p19':'Suggest eco-fencing and interpretive signs',
    'heat.p20':'Hope guided tours can be booked in advance',
    'heat.p21':'Suggest improving the trail surface',
    'heat.p22':'The landscape here is still pristine, I like it',
    'heat.p23':'Worried about overcrowding on public holidays',
    'heat.shade':'Shade & Rest',
    'heat.pondLoss':'Fishpond Loss',
    'heat.farmland':'Farmland',
    'heat.ecofence':'Eco-fencing',
    'heat.pavement':'Trail Surface',
    'heat.crowding':'Crowding',
    'heat.generalOpinion':'General opinion',
    'heat.birdwatch':'Birdwatching'
  },
  'zh-CN':{
    'heat.p1':'希望拉姆萨尔湿地增加观鸟屋和导赏团服务',
    'heat.p2':'鱼塘管理应维持生态友善，保障越冬水鸟',
    'heat.p3':'建议塱原增设农墟及自然教育设施',
    'heat.p4':'担心周边发展影响凤园蝴蝶栖息地',
    'heat.p5':'鹿颈步行可达性差，需要更多接驳',
    'heat.p6':'沙罗洞应限制游客进入，保护蜻蜓栖息地',
    'heat.p7':'郊野步道维护良好，支持',
    'heat.p8':'希望乌蛟腾增设儿童自然教育中心',
    'heat.p9':'观鸟体验很好',
    'heat.p10':'夜间照明不足',
    'heat.p11':'希望增加无障碍通道',
    'heat.wetlandManage':'鱼塘管理',
    'heat.access':'交通接驳',
    'heat.restricted':'限制进入',
    'heat.lighting':'夜间照明',
    'heat.accessible':'无障碍设计',
    'heat.ecoConn':'生态连接',
    'heat.p12':'建议观鸟径沿途增设遮阴休息点',
    'heat.p13':'担心游客过多会惊扰越冬水鸟',
    'heat.p14':'担心鱼塘被填平作发展用途',
    'heat.p15':'希望增设观鸟平台',
    'heat.p16':'农地景观值得保留，支持',
    'heat.p17':'担心农地被改建为住宅',
    'heat.p18':'蝴蝶保育工作做得好',
    'heat.p19':'建议增设生态围栏与解说牌',
    'heat.p20':'希望提供预约制导赏',
    'heat.p21':'建议改善步道铺装',
    'heat.p22':'自然景观原始，很喜欢',
    'heat.p23':'担心假日人流过多',
    'heat.shade':'遮阴设施',
    'heat.pondLoss':'鱼塘流失',
    'heat.farmland':'农地保育',
    'heat.ecofence':'生态围栏',
    'heat.pavement':'步道铺装',
    'heat.crowding':'人流压力',
    'heat.generalOpinion':'综合意见',
    'heat.birdwatch':'观鸟'
  },
  'zh-TW':{
    'heat.p1':'希望拉姆薩爾濕地增加觀鳥屋和導賞團服務',
    'heat.p2':'魚塘管理應維持生態友善，保障越冬水鳥',
    'heat.p3':'建議塱原增設農墟及自然教育設施',
    'heat.p4':'擔心周邊發展影響鳳園蝴蝶棲息地',
    'heat.p5':'鹿頸步行可達性差，需要更多接駁',
    'heat.p6':'沙羅洞應限制遊客進入，保護蜻蜓棲息地',
    'heat.p7':'郊野步道維護良好，支持',
    'heat.p8':'希望烏蛟騰增設兒童自然教育中心',
    'heat.p9':'觀鳥體驗很好',
    'heat.p10':'夜間照明不足',
    'heat.p11':'希望增加無障礙通道',
    'heat.wetlandManage':'魚塘管理',
    'heat.access':'交通接駁',
    'heat.restricted':'限制進入',
    'heat.lighting':'夜間照明',
    'heat.accessible':'無障礙設計',
    'heat.ecoConn':'生態連接',
    'heat.p12':'建議觀鳥徑沿途增設遮陰休息點',
    'heat.p13':'擔心遊客過多會驚擾越冬水鳥',
    'heat.p14':'擔心魚塘被填平作發展用途',
    'heat.p15':'希望增設觀鳥平台',
    'heat.p16':'農地景觀值得保留，支持',
    'heat.p17':'擔心農地被改建為住宅',
    'heat.p18':'蝴蝶保育工作做得好',
    'heat.p19':'建議增設生態圍欄與解說牌',
    'heat.p20':'希望提供預約制導賞',
    'heat.p21':'建議改善步道鋪裝',
    'heat.p22':'自然景觀原始，很喜歡',
    'heat.p23':'擔心假日人流過多',
    'heat.shade':'遮陰設施',
    'heat.pondLoss':'魚塘流失',
    'heat.farmland':'農地保育',
    'heat.ecofence':'生態圍欄',
    'heat.pavement':'步道鋪裝',
    'heat.crowding':'人流壓力',
    'heat.generalOpinion':'綜合意見',
    'heat.birdwatch':'觀鳥'
  }
};
function heatT(key){
  const lang = window.currentLang || 'zh-CN';
  if(heatTexts[lang] && heatTexts[lang][key] !== undefined) return heatTexts[lang][key];
  if(heatTexts['zh-CN'][key] !== undefined) return heatTexts['zh-CN'][key];
  return t(key);
}
const zoneCoords = {
  'z1':{x:122,y:219},
  'z2':{x:254,y:136},
  'z3':{x:356,y:154},
  'z4':{x:544,y:274},
  'z5':{x:555,y:248},
  'z6':{x:655,y:118},
  'z7':{x:736,y:163}
};

/* ==================== demo opinion corpus + aggregation ====================
   The MAP on this page is real: coastlines, conservation-site boundaries and
   the watercourse network come from the Hong Kong CSDI platform. The OPINIONS
   are not — no public consultation has actually been run for this demo.

   Rather than hand-drawing a handful of blobs and calling them "AI aggregated",
   we synthesise a corpus of 1,284 submissions and then aggregate it for real.
   Every figure on this page — the totals, the type shares, the per-district
   table, the satisfaction scores, and every heat blob — is computed from this
   one corpus, so they cannot drift apart.

   To run on real submissions, replace buildOpinionCorpus() with a fetch that
   returns the same shape; nothing downstream needs to change.
   ========================================================================= */

const OPINION_TOTAL = 1284;      // submissions this demo claims
const HEAT_CELL = 20;            // density grid cell size, in viewBox units

/* deterministic PRNG, so the demo renders identically on every load */
function mulberry32(seed){
  return function(){
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* ---- the synthetic input ------------------------------------------------
   SITE_VOLUME: how many submissions each site drew (sums to OPINION_TOTAL).
   TOPIC_MIX:   how that volume splits across the topics raised there.
                dx/dy offsets a topic away from the site centre so the field
                spreads instead of stacking on a single point; sigma is its
                spread in viewBox units.
   Everything below this block is derived. */
const SITE_VOLUME = {z1:200, z2:251, z3:167, z4:105, z5:216, z6:155, z7:190};
const TOPIC_MIX = [
  {zoneKey:'z1', textKey:'heat.p1',  tagKey:'func.birdwatch', type:'positive', share:0.45, dx:-18, dy: 24, sigma:17},
  {zoneKey:'z1', textKey:'heat.p9',  tagKey:'heat.birdwatch', type:'positive', share:0.25, dx: 30, dy:-26, sigma:20},
  {zoneKey:'z1', textKey:'heat.p12', tagKey:'heat.shade',     type:'improve',  share:0.18, dx:  6, dy: 40, sigma:15},
  {zoneKey:'z1', textKey:'heat.p13', tagKey:'func.eco',       type:'concern',  share:0.12, dx:-30, dy: -8, sigma:14},

  {zoneKey:'z2', textKey:'heat.p2',  tagKey:'heat.wetlandManage', type:'improve',  share:0.40, dx: 26, dy:-20, sigma:20},
  {zoneKey:'z2', textKey:'heat.p10', tagKey:'heat.lighting',      type:'improve',  share:0.20, dx:-32, dy:-24, sigma:17},
  {zoneKey:'z2', textKey:'heat.p14', tagKey:'heat.pondLoss',      type:'concern',  share:0.22, dx:-10, dy:-34, sigma:18},
  {zoneKey:'z2', textKey:'heat.p15', tagKey:'func.birdwatch',     type:'function', share:0.18, dx: 20, dy:  6, sigma:16},

  {zoneKey:'z3', textKey:'heat.p3',  tagKey:'func.education', type:'function', share:0.40, dx:-24, dy:-18, sigma:17},
  {zoneKey:'z3', textKey:'heat.p11', tagKey:'heat.accessible',type:'function', share:0.22, dx: 26, dy: 26, sigma:15},
  {zoneKey:'z3', textKey:'heat.p16', tagKey:'heat.farmland',  type:'positive', share:0.22, dx: -6, dy:-30, sigma:16},
  {zoneKey:'z3', textKey:'heat.p17', tagKey:'heat.farmland',  type:'concern',  share:0.16, dx: 10, dy: 34, sigma:15},

  {zoneKey:'z4', textKey:'heat.p4',  tagKey:'func.eco', type:'concern',  share:0.55, dx: 20, dy: 18, sigma:16},
  {zoneKey:'z4', textKey:'heat.p18', tagKey:'func.eco', type:'positive', share:0.45, dx:-16, dy:-14, sigma:14},

  {zoneKey:'z5', textKey:'heat.p6',  tagKey:'heat.restricted', type:'concern',  share:0.50, dx:-20, dy: 20, sigma:19},
  {zoneKey:'z5', textKey:'heat.p19', tagKey:'heat.ecofence',   type:'improve',  share:0.28, dx: 24, dy:-16, sigma:16},
  {zoneKey:'z5', textKey:'heat.p20', tagKey:'func.education',  type:'function', share:0.22, dx: -4, dy:-30, sigma:15},

  {zoneKey:'z6', textKey:'heat.p5',  tagKey:'heat.access',   type:'improve',  share:0.48, dx: 24, dy:-16, sigma:17},
  {zoneKey:'z6', textKey:'heat.p21', tagKey:'heat.pavement', type:'improve',  share:0.28, dx:-22, dy:  8, sigma:15},
  {zoneKey:'z6', textKey:'heat.p22', tagKey:'func.eco',      type:'positive', share:0.24, dx: 10, dy: 24, sigma:16},

  {zoneKey:'z7', textKey:'heat.p8',  tagKey:'func.education', type:'function', share:0.40, dx: 18, dy: 22, sigma:18},
  {zoneKey:'z7', textKey:'heat.p7',  tagKey:'heat.ecoConn',   type:'positive', share:0.32, dx:-28, dy:-22, sigma:17},
  {zoneKey:'z7', textKey:'heat.p23', tagKey:'heat.crowding',  type:'concern',  share:0.28, dx: -6, dy:-34, sigma:15},
];

const OPINION_TYPES = ['positive','improve','concern','function'];
const ZONE_TYPE_KEY = {z1:'type.wetland', z2:'type.wetland', z3:'type.park',
                       z4:'type.reserve', z5:'type.reserve', z6:'type.wetland',
                       z7:'type.park'};

/* a rating follows from what the comment is about: praise scores high, worry
   scores low, and there is spread around each */
function ratingFor(type, r){
  const base = {positive:4.6, improve:3.6, concern:2.5, function:3.7}[type] || 3.5;
  return Math.max(1, Math.min(5, Math.round(base + (r - 0.5) * 1.8)));
}

/* Split `total` across `shares` in whole numbers with largest-remainder, so the
   parts always add back up to the total instead of drifting on rounding. */
function splitExact(total, shares){
  const raw = shares.map(s => s * total);
  const out = raw.map(v => Math.floor(v));
  let left = total - out.reduce((a, b) => a + b, 0);
  const order = raw.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0]);
  for(let i = 0; left > 0; i++, left--) out[order[i % order.length][1]]++;
  return out;
}

function buildOpinionCorpus(){
  const rnd = mulberry32(20261015);
  const out = [];
  Object.keys(SITE_VOLUME).forEach(zoneKey => {
    const c = zoneCoords[zoneKey];
    const topics = TOPIC_MIX.filter(t => t.zoneKey === zoneKey);
    const counts = splitExact(SITE_VOLUME[zoneKey], topics.map(t => t.share));
    topics.forEach((tp, ti) => {
      for(let k = 0; k < counts[ti]; k++){
        /* sum of three uniforms ≈ a bell shape, cheap and deterministic */
        const g1 = rnd() + rnd() + rnd() - 1.5;
        const g2 = rnd() + rnd() + rnd() - 1.5;
        out.push({
          x: c.x + tp.dx + g1 * tp.sigma * 1.4,
          y: c.y + tp.dy + g2 * tp.sigma * 1.4,
          zoneKey: tp.zoneKey, type: tp.type,
          topicKey: tp.textKey, tagKey: tp.tagKey,
          rating: ratingFor(tp.type, rnd()),
        });
      }
    });
  });
  return out;
}

const OPINIONS = buildOpinionCorpus();

/* ---- aggregation ------------------------------------------------------- */
function topKey(counts){
  let best = null, bv = -1;
  for(const k in counts){ if(counts[k] > bv){ bv = counts[k]; best = k; } }
  return best;
}
function countBy(points, key){
  const m = {};
  points.forEach(p => { m[p[key]] = (m[p[key]] || 0) + 1; });
  return m;
}
/* percentages that always add to exactly 100 */
function percentShares(counts, total){
  const keys = Object.keys(counts);
  const raw = keys.map(k => counts[k] / total * 100);
  const out = {};
  raw.forEach((v, i) => { out[keys[i]] = Math.floor(v); });
  let left = 100 - Object.keys(out).reduce((a, k) => a + out[k], 0);
  const order = raw.map((v, i) => [v - Math.floor(v), keys[i]]).sort((a, b) => b[0] - a[0]);
  for(let i = 0; left > 0; i++, left--) out[order[i % order.length][1]]++;
  return out;
}

function buildTableData(){
  return Object.keys(zoneCoords).map(zoneKey => {
    const rows = OPINIONS.filter(o => o.zoneKey === zoneKey);
    const types = countBy(rows, 'type');
    const topics = countBy(rows, 'topicKey');
    const avg = rows.reduce((s, o) => s + o.rating, 0) / rows.length;
    const concernShare = (types.concern || 0) / rows.length;
    /* a site needs attention when people are unhappy AND worried */
    const score = (5 - avg) + concernShare * 2;
    return {
      zoneKey: zoneKey,
      typeKey: ZONE_TYPE_KEY[zoneKey],
      opinions: rows.length,
      avg: Math.round(avg * 10) / 10,
      topicKey: topKey(topics),
      priority: score >= 2.4 ? 'high' : score >= 1.7 ? 'mid' : 'low',
      score: Math.round(score * 100) / 100,
    };
  });
}

/* Density field: bucket the corpus onto a grid and emit one node per occupied
   cell. This is what the heat map draws — the blobs are computed from the
   opinions, not positioned by hand. */
function densityNodes(points){
  const cells = new Map();
  points.forEach(p => {
    const k = Math.floor(p.x / HEAT_CELL) + ',' + Math.floor(p.y / HEAT_CELL);
    let c = cells.get(k);
    if(!c){ c = {n:0, sx:0, sy:0, types:{}, topics:{}, zoneKey:p.zoneKey}; cells.set(k, c); }
    c.n++; c.sx += p.x; c.sy += p.y;
    c.types[p.type] = (c.types[p.type] || 0) + 1;
    c.topics[p.topicKey] = (c.topics[p.topicKey] || 0) + 1;
  });
  const out = [];
  cells.forEach(c => {
    const type = topKey(c.types);
    const topicKey = topKey(c.topics);
    out.push({x: c.sx / c.n, y: c.sy / c.n, n: c.n, type: type,
              topicKey: topicKey, zoneKey: c.zoneKey,
              tagKey: (TOPIC_MIX.find(t => t.textKey === topicKey) || {}).tagKey});
  });
  return out;
}

const tableData = buildTableData();

/* ---- every figure on the page, derived from the corpus ------------------ */
function setNum(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}
function applyDerivedNumbers(){
  const total = OPINIONS.length;
  const types = countBy(OPINIONS, 'type');
  const shares = percentShares(types, total);
  const avg = OPINIONS.reduce((s, o) => s + o.rating, 0) / total;
  const zones = Object.keys(zoneCoords).length;
  const hot = topKey(countBy(OPINIONS, 'topicKey'));

  setNum('heatTotal', total.toLocaleString('en-US'));
  setNum('heatPositive', shares.positive + '%');
  setNum('heatImprove', shares.improve + '%');
  setNum('heatConcern', shares.concern + '%');
  setNum('heatFunction', shares.function + '%');

  setNum('stat1', zones);
  setNum('stat2', total.toLocaleString('en-US'));

  setNum('dashTotal', total.toLocaleString('en-US'));
  setNum('dashAvg', avg.toFixed(1));
  setNum('dashZones', zones);
  setNum('dashHot', heatT(hot));

  setNum('totalSurveys', total.toLocaleString('en-US'));
  setNum('avgRating', avg.toFixed(1));
  setNum('activeZones', zones);

  window.derivedStats = {total: total, types: types, shares: shares, avg: avg,
                         zones: zones, hotTopic: hot};
}

const surveyData = {zoneKey:null,rating:0,functions:[],suggestion:''};
let currentStep = 0;
let surveyCount = 1284;
let surveyChartInst=null, dashBarInst=null, dashPieInst=null;

function scrollToSection(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}); }

window.addEventListener('scroll',()=>{
  const scrollY = window.scrollY;
  const nav = document.getElementById('topnav');
  if(scrollY>50){nav.classList.add('scrolled');}else{nav.classList.remove('scrolled');}
  document.querySelectorAll('.section').forEach(sec=>{
    const top=sec.offsetTop-80, bottom=top+sec.offsetHeight;
    if(scrollY>=top && scrollY<bottom){
      document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
      const link=document.querySelector('.nav-link[data-target="'+sec.id+'"]');
      if(link) link.classList.add('active');
    }
  });
});

document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click',()=>scrollToSection(link.dataset.target));
});

document.getElementById('hamburger').addEventListener('click',()=>{
  const links=document.getElementById('navLinks');
  if(links.style.display==='flex'){links.style.display='';}
  else{links.style.display='flex';links.style.position='absolute';links.style.top='64px';links.style.left='0';links.style.right='0';links.style.flexDirection='column';links.style.background='rgba(27,94,58,0.98)';links.style.padding='16px';}
});

function renderSurveyOptions(){
  const zc = document.getElementById('zoneOptions');
  if(!zc) return;
  zc.innerHTML = surveyZoneKeys.map(z=>
    '<div class="option-item" data-value="'+z.key+'" onclick="selectSurveyOption(this)">'+
    '<div class="radio"></div><span class="label">'+z.icon+' '+t('zone.'+z.key+'.name')+'</span></div>'
  ).join('');
  if(surveyData.zoneKey){
    zc.querySelectorAll('.option-item').forEach(o=>{
      if(o.dataset.value===surveyData.zoneKey) o.classList.add('selected');
    });
  }
  const fc = document.getElementById('funcOptions');
  if(!fc) return;
  fc.innerHTML = funcKeys.map(f=>
    '<div class="option-item" onclick="toggleMulti(this)" data-fkey="'+f.key+'">'+
    '<div class="radio" style="border-radius:4px;"></div><span class="label">'+f.icon+' '+t(f.key)+'</span></div>'
  ).join('');
  if(surveyData.functions.length){
    fc.querySelectorAll('.option-item').forEach(o=>{
      if(surveyData.functions.includes(o.dataset.fkey)) o.classList.add('selected');
    });
  }
}

function renderRoadmap(){
  const tl = document.getElementById('timeline');
  if(!tl) return;
  const items = t('roadmap.items');
  tl.innerHTML = items.map(it=>
    '<div class="timeline-item '+it.status+'">'+
    '<div class="timeline-content">'+
    '<div class="phase">'+it.phase+'</div>'+
    '<h4>'+it.title+'</h4>'+
    '<p>'+it.desc+'</p>'+
    '<span class="timeline-status status-'+it.status+'">'+it.statusLabel+'</span>'+
    '</div></div>'
  ).join('');
}

function renderDashTable(){
  const tb = document.getElementById('dashTableBody');
  if(!tb) return;
  tb.innerHTML = tableData.map(r=>{
    const bc = r.priority==='high'?'badge-high':r.priority==='mid'?'badge-mid':'badge-low';
    const bt = t('dash.priority.'+r.priority);
    return '<tr><td>'+t('zone.'+r.zoneKey+'.name')+'</td>'+
    '<td>'+t(r.typeKey)+'</td>'+
    '<td>'+r.opinions+'</td>'+
    '<td>'+r.avg+' \u2b50</td>'+
    '<td>'+heatT(r.topicKey)+'</td>'+
    '<td><span class="badge '+bc+'">'+bt+'</span></td></tr>';
  }).join('');
}

window.selectedZoneId = null;
function selectZone(id){
  const zk = id;
  window.selectedZoneId = zk;
  document.querySelectorAll('.zone').forEach(z=>z.classList.toggle('selected', z.dataset.id===zk));
  document.getElementById('zoneEmpty').style.display='none';
  const detail = document.getElementById('zoneDetail');
  detail.style.display='block';
  const attentionLevels = ['high','mid','high','mid'];
  const al = attentionLevels[Math.floor(Math.random()*4)];
  detail.innerHTML =
    '<div class="zone-info-card">'+
    '<h4>\ud83d\udccd '+t('zone.'+zk+'.name')+'</h4>'+
    '<div class="meta">'+
    '<span class="zone-tag tag-'+getZoneType(zk)+'">'+t('zone.'+zk+'.typeLabel')+'</span>'+
    '<span class="zone-tag" style="background:#f5f5f5;color:#666;">'+t('zone.status.'+t('zone.'+zk+'.statusKey'))+'</span>'+
    '</div>'+
    '<p>'+t('zone.'+zk+'.desc')+'</p></div>'+
    '<div class="zone-info-card">'+
    '<h4>'+t('map.planningData')+'</h4>'+
    '<div class="zone-stat"><span>'+t('map.planningArea')+'</span><span class="val">'+t('zone.'+zk+'.area')+'</span></div>'+
    '<div class="zone-stat"><span>'+t('map.opinionCount')+'</span><span class="val">'+Math.floor(Math.random()*200+50)+'</span></div>'+
    '<div class="zone-stat"><span>'+t('map.avgSatisfaction')+'</span><span class="val">'+(Math.random()*2+3).toFixed(1)+' / 5.0</span></div>'+
    '<div class="zone-stat"><span>'+t('map.attentionLevel')+'</span><span class="val">'+t('map.level.'+al)+'</span></div></div>'+
    '<div class="zone-info-card">'+
    '<h4>'+t('map.planningFunctions')+'</h4>'+
    '<div class="meta" style="margin-top:8px;">'+
    t('zone.'+zk+'.functions').map(f=>'<span class="zone-tag tag-'+getZoneType(zk)+'">'+f+'</span>').join('')+
    '</div></div>'+
    '<button class="btn-survey btn-next" style="width:100%;margin-top:8px;padding:12px;" onclick="scrollToSection(\'survey-section\')">'+t('map.submitOpinion')+'</button>';
}
function getZoneType(zk){
  const map = {z1:'wetland',z2:'wetland',z3:'park',z4:'reserve',z5:'reserve',z6:'wetland',z7:'park'};
  return map[zk]||'park';
}

document.querySelectorAll('.filter-chip[data-filter]').forEach(chip=>{
  chip.addEventListener('click',()=>{
    document.querySelectorAll('.filter-chip[data-filter]').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const filter=chip.dataset.filter;
    document.querySelectorAll('.zone').forEach(zone=>{
      if(filter==='all'||zone.dataset.type===filter){zone.style.opacity='0.7';zone.style.pointerEvents='auto';}
      else{zone.style.opacity='0.15';zone.style.pointerEvents='none';}
    });
  });
});

/* ---------------- map camera: viewBox zoom + drag pan ----------------
   Zooming an SVG with a CSS transform only ever cropped the centre of the
   canvas and left no way to reach the edges. We drive the viewBox instead,
   which keeps the projection exact and lets us pan.
   The viewBox always keeps the source ratio so the map never stretches, and it
   is clamped to the full extent so you can't pan off-map.
   One camera per SVG: the green map and the heat map each own one. */
function createMapCamera(cfg){
  const svg = cfg.svg;
  const full = {x:cfg.full.x, y:cfg.full.y, w:cfg.full.w, h:cfg.full.h};
  const minW = full.w / (cfg.maxZoom || 8);
  const aspect = full.h / full.w;
  const cam = {full:full, minW:minW};

  let view   = {x:full.x, y:full.y, w:full.w, h:full.h};
  let target = {x:full.x, y:full.y, w:full.w, h:full.h};  // where an animation is heading
  let anim = null, pan = null, pinch = null, suppressClick = false;
  const pointers = new Map();

  function clamp(v){
    v.w = Math.min(Math.max(v.w, minW), full.w);
    v.h = v.w * aspect;
    v.x = Math.min(Math.max(v.x, full.x), full.x + full.w - v.w);
    v.y = Math.min(Math.max(v.y, full.y), full.y + full.h - v.h);
    return v;
  }
  cam.clamp = clamp;
  cam.view = function(){ return view; };
  cam.target = function(){ return target; };
  cam.isZoomed = function(){ return target.w < full.w - 0.5; };

  /* CSS px per viewBox unit, honouring preserveAspectRatio="xMidYMid meet" */
  cam.pxPerUnit = function(){
    const r = svg.getBoundingClientRect();
    if(!r.width || !r.height) return 1;
    return Math.min(r.width / view.w, r.height / view.h);
  };
  cam.canvasWidth = function(){ return svg.getBoundingClientRect().width || 0; };
  cam.clientToView = function(clientX, clientY){
    const r = svg.getBoundingClientRect();
    const s = cam.pxPerUnit();
    const offX = r.left + (r.width - view.w*s)/2;
    const offY = r.top + (r.height - view.h*s)/2;
    return {x: view.x + (clientX-offX)/s, y: view.y + (clientY-offY)/s};
  };
  /* viewBox point -> CSS px offset inside the svg element */
  cam.viewToLocal = function(x, y){
    const r = svg.getBoundingClientRect();
    const s = cam.pxPerUnit();
    return {x: (r.width - view.w*s)/2 + (x-view.x)*s,
            y: (r.height - view.h*s)/2 + (y-view.y)*s};
  };

  cam.render = function(v){
    view = clamp(v);
    svg.setAttribute('viewBox',
      view.x.toFixed(2)+' '+view.y.toFixed(2)+' '+view.w.toFixed(2)+' '+view.h.toFixed(2));
    /* annotation is authored in user units, so without this it would blow up
       along with the geometry. --mk cancels the zoom for annotation only: the
       map grows, the labels stay put. */
    svg.style.setProperty('--mk', (view.w / full.w).toFixed(4));
    svg.style.cursor = cam.isZoomed() ? 'grab' : '';
    if(cfg.onRender) cfg.onRender(cam);
  };
  cam.setView = function(v){
    cam.render(v);
    target = {x:view.x, y:view.y, w:view.w, h:view.h};
  };
  cam.animateTo = function(to){
    if(anim) cancelAnimationFrame(anim);
    const from = {x:view.x, y:view.y, w:view.w, h:view.h};
    const t = clamp({x:to.x, y:to.y, w:to.w, h:to.h});
    target = {x:t.x, y:t.y, w:t.w, h:t.h};
    const t0 = performance.now(), dur = 260;
    function step(now){
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      cam.render({x:from.x+(t.x-from.x)*e, y:from.y+(t.y-from.y)*e,
                  w:from.w+(t.w-from.w)*e, h:from.h+(t.h-from.h)*e});
      anim = p < 1 ? requestAnimationFrame(step) : null;
    }
    anim = requestAnimationFrame(step);
  };
  /* zoom by `factor`, keeping the viewBox point (cx,cy) pinned under the cursor.
     Always computed from the target, so rapid clicks compound predictably
     instead of reading a half-finished animation. */
  cam.zoom = function(factor, cx, cy, animate){
    const base = target;
    if(cx === undefined){ cx = base.x + base.w/2; cy = base.y + base.h/2; }
    const w = Math.min(Math.max(base.w / factor, minW), full.w);
    const k = w / base.w;
    const t = {x:cx-(cx-base.x)*k, y:cy-(cy-base.y)*k, w:w, h:base.h*k};
    if(animate === false) cam.setView(t); else cam.animateTo(t);
  };
  cam.reset = function(animate){
    const t = {x:full.x, y:full.y, w:full.w, h:full.h};
    if(animate === false) cam.setView(t); else cam.animateTo(t);
  };

  /* ---- input ---- */
  svg.addEventListener('wheel', e=>{
    e.preventDefault();
    const p = cam.clientToView(e.clientX, e.clientY);
    cam.zoom(e.deltaY < 0 ? 1.25 : 1/1.25, p.x, p.y, false);
  }, {passive:false});

  svg.addEventListener('dblclick', e=>{
    const p = cam.clientToView(e.clientX, e.clientY);
    cam.zoom(2, p.x, p.y);
  });

  /* drag to pan, two-finger pinch to zoom (pointer events cover both) */
  svg.addEventListener('pointerdown', e=>{
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
    suppressClick = false;
    if(pointers.size === 1){
      pan = {id:e.pointerId, x:e.clientX, y:e.clientY, moved:0,
             view:{x:target.x, y:target.y, w:target.w, h:target.h}};
      if(cam.isZoomed()) svg.style.cursor = 'grabbing';
    } else if(pointers.size === 2){
      pan = null;
      const [a, b] = [...pointers.values()];
      pinch = {dist:Math.hypot(a.x-b.x, a.y-b.y),
               mid:cam.clientToView((a.x+b.x)/2, (a.y+b.y)/2),
               view:{x:target.x, y:target.y, w:target.w, h:target.h}};
    }
    if(cam.isZoomed()) svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener('pointermove', e=>{
    if(!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});

    if(pointers.size >= 2 && pinch){
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x-b.x, a.y-b.y);
      if(pinch.dist > 0 && dist > 0){
        const w = Math.min(Math.max(pinch.view.w * (pinch.dist/dist), minW), full.w);
        const k = w / pinch.view.w;
        cam.setView({x:pinch.mid.x-(pinch.mid.x-pinch.view.x)*k,
                     y:pinch.mid.y-(pinch.mid.y-pinch.view.y)*k,
                     w:w, h:pinch.view.h*k});
      }
      return;
    }
    if(!pan || e.pointerId !== pan.id) return;
    const s = cam.pxPerUnit();
    pan.moved = Math.max(pan.moved, Math.hypot(e.clientX-pan.x, e.clientY-pan.y));
    cam.setView({x:pan.view.x - (e.clientX-pan.x)/s,
                 y:pan.view.y - (e.clientY-pan.y)/s,
                 w:pan.view.w, h:pan.view.h});
  });
  function endPointer(e){
    if(!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    if(pan && e.pointerId === pan.id){
      if(pan.moved > 4) suppressClick = true;
      pan = null;
    }
    if(pointers.size < 2) pinch = null;
    svg.style.cursor = cam.isZoomed() ? 'grab' : '';
  }
  svg.addEventListener('pointerup', endPointer);
  svg.addEventListener('pointercancel', endPointer);
  /* a drag must not also fire the child's onclick */
  svg.addEventListener('click', e=>{
    if(suppressClick){ suppressClick = false; e.stopPropagation(); e.preventDefault(); }
  }, true);

  cam.render(view);   // publish --mk and the viewBox once up front
  return cam;
}

/* ---- scale bar: recomputed from the live viewBox, so it stays truthful ---- */
function createScalebar(trackId, labelsId, kmPerUnit){
  const track = document.getElementById(trackId);
  const labels = document.getElementById(labelsId);
  const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
  const fmt = x => (x >= 1 ? String(Number(x.toFixed(2))) : x.toFixed(1));
  return {
    update: function(cam){
      if(!track || !labels) return;
      const kmPerPx = kmPerUnit / cam.pxPerUnit();
      /* cap the bar against the canvas, not a fixed 150px — on a phone the map
         is only ~340px wide and a 150px bar would swallow it */
      const cap = Math.max(56, Math.min(150, cam.canvasWidth() * 0.30));
      let d = steps[0];
      for(const v of steps){ if(v / kmPerPx <= cap) d = v; else break; }
      const px = Math.max(40, Math.round(d / kmPerPx));
      track.style.width = px + 'px';
      labels.style.width = px + 'px';
      labels.innerHTML = '<span>0</span><span>'+fmt(d/2)+'</span><span>'+fmt(d)+' km</span>';
    }
  };
}

const MAP_KM_PER_UNIT = 0.03664;           // 0.285 deg lon at 22.5N / 800 units
const MAP_FULL = {x:0, y:0, w:800, h:560};

const mapScalebar = createScalebar('scalebarTrack', 'scalebarLabels', MAP_KM_PER_UNIT);
const mapCam = createMapCamera({
  svg: document.getElementById('mapSvg'),
  full: MAP_FULL, maxZoom: 8,
  onRender: cam => mapScalebar.update(cam)
});

const heatScalebar = createScalebar('heatScalebarTrack', 'heatScalebarLabels', MAP_KM_PER_UNIT);
const heatCam = createMapCamera({
  svg: document.getElementById('heatSvg'),
  full: MAP_FULL, maxZoom: 6,
  onRender: cam => { heatScalebar.update(cam); hideHeatPopup(); }
});

window.addEventListener('resize', ()=>{ mapScalebar.update(mapCam); heatScalebar.update(heatCam); });

/* ---- controls ---- */
document.getElementById('zoomIn').addEventListener('click', ()=> mapCam.zoom(1.6));
document.getElementById('zoomOut').addEventListener('click', ()=> mapCam.zoom(1/1.6));
document.getElementById('resetMap').addEventListener('click', ()=>{
  mapCam.reset();
  document.querySelectorAll('.filter-chip[data-filter]').forEach(c=>c.classList.remove('active'));
  document.querySelector('.filter-chip[data-filter="all"]').classList.add('active');
  document.querySelectorAll('.zone').forEach(z=>{z.style.opacity='0.7';z.style.pointerEvents='auto';});
});

document.getElementById('heatZoomIn').addEventListener('click', ()=> heatCam.zoom(1.6));
document.getElementById('heatZoomOut').addEventListener('click', ()=> heatCam.zoom(1/1.6));
document.getElementById('heatReset').addEventListener('click', ()=> heatCam.reset());
function selectSurveyOption(el){
  el.parentElement.querySelectorAll('.option-item').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  surveyData.zoneKey = el.dataset.value;
}
function selectRating(val){
  surveyData.rating=val;
  document.querySelectorAll('.rating-star').forEach((s,i)=>{
    if(i<val){s.classList.add('active');}else{s.classList.remove('active');}
  });
  document.getElementById('ratingLabel').textContent=t('rating.'+val);
}
function toggleMulti(el){
  el.classList.toggle('selected');
}
function nextStep(step){
  if(step===0 && !surveyData.zoneKey){showToast(t('survey.toast.selectZone'));return;}
  if(step===1 && surveyData.rating===0){showToast(t('survey.toast.selectRating'));return;}
  document.querySelector('.survey-q[data-step="'+step+'"]').classList.remove('active');
  document.querySelector('.step-dot[data-step="'+step+'"]').classList.remove('active');
  document.querySelector('.step-dot[data-step="'+step+'"]').classList.add('done');
  const next=step+1;
  document.querySelector('.survey-q[data-step="'+next+'"]').classList.add('active');
  document.querySelector('.step-dot[data-step="'+next+'"]').classList.add('active');
  document.getElementById('progressFill').style.width=((next+1)*25)+'%';
  currentStep=next;
}
function prevStep(step){
  document.querySelector('.survey-q[data-step="'+step+'"]').classList.remove('active');
  document.querySelector('.step-dot[data-step="'+step+'"]').classList.remove('active');
  const prev=step-1;
  document.querySelector('.survey-q[data-step="'+prev+'"]').classList.add('active');
  document.querySelector('.step-dot[data-step="'+prev+'"]').classList.remove('done');
  document.querySelector('.step-dot[data-step="'+prev+'"]').classList.add('active');
  document.getElementById('progressFill').style.width=((prev+1)*25)+'%';
  currentStep=prev;
}
function addQuickTag(el){
  const ta=document.getElementById('suggestionText');
  const txt=el.textContent.trim();
  if(ta.value && !ta.value.endsWith(' ') && !ta.value.endsWith('\n')) ta.value+=', ';
  ta.value+=txt;
}
function submitSurvey(){
  surveyData.functions=[];
  document.querySelectorAll('#funcOptions .option-item.selected').forEach(o=>{
    surveyData.functions.push(o.dataset.fkey);
  });
  surveyData.suggestion=document.getElementById('suggestionText').value;
  surveyCount++;
  document.getElementById('totalSurveys').textContent=surveyCount.toLocaleString();
  document.getElementById('todaySurveys').textContent=parseInt(document.getElementById('todaySurveys').textContent)+1;
  const zoneName = surveyData.zoneKey ? t('zone.'+surveyData.zoneKey+'.name') : t('survey.fb.unknownZone');
  const kw = surveyData.functions.length ? surveyData.functions.map(f=>t(f)).join(', ') : t('survey.fb.general');
  const fb=document.getElementById('surveyFeedback');
  fb.innerHTML = t('survey.fb.success')
    .replace('{zone}', zoneName)
    .replace('{rating}', surveyData.rating)
    .replace('{keywords}', kw + (surveyData.suggestion ? ', '+surveyData.suggestion.substring(0,20)+'...' : ''));
  fb.classList.add('show');
  addHeatPoint(surveyData);
  showToast(t('survey.toast.success'));
  setTimeout(()=>{
    document.querySelectorAll('.option-item').forEach(o=>o.classList.remove('selected'));
    document.querySelectorAll('.rating-star').forEach(s=>s.classList.remove('active'));
    document.getElementById('suggestionText').value='';
    document.getElementById('ratingLabel').textContent=t('survey.selectRating');
    Object.assign(surveyData,{zoneKey:null,rating:0,functions:[],suggestion:''});
    document.querySelector('.survey-q.active').classList.remove('active');
    document.querySelector('.survey-q[data-step="0"]').classList.add('active');
    document.querySelectorAll('.step-dot').forEach((d,i)=>{d.classList.remove('done','active');if(i===0)d.classList.add('active');});
    document.getElementById('progressFill').style.width='25%';
    currentStep=0;
  },2000);
}

function showToast(msg){
  const tEl=document.getElementById('toast');
  tEl.textContent=msg;
  tEl.classList.add('show');
  setTimeout(()=>tEl.classList.remove('show'),3000);
}

const SVGNS='http://www.w3.org/2000/svg';
const HEAT_COLORS={positive:'#4CAF6F',improve:'#FF9800',concern:'#EF5350',function:'#42A5F5'};
const HEAT_GRADS ={positive:'heatGradPositive',improve:'heatGradImprove',concern:'heatGradConcern',function:'heatGradFunction'};

/* Draw the density field: one soft halo per occupied grid cell, sized and
   faded by how many opinions landed in it. Nothing here is positioned by hand
   — the blobs come out of densityNodes(). Halos blend with
   `mix-blend-mode:multiply`, so where opinions pile up the colour deepens
   instead of merely stacking flat discs. */
function renderHeatPoints(filter){
  filter = filter || 'all';
  window.currentHeatFilter = filter;
  const container=document.getElementById('heatCircles');
  if(!container) return;
  container.innerHTML='';
  const pts = filter==='all' ? OPINIONS : OPINIONS.filter(p=>p.type===filter);
  const nodes = densityNodes(pts);
  if(!nodes.length) return;
  const maxN = nodes.reduce((m,n)=>Math.max(m,n.n),1);

  // biggest first, so the small ones stay reachable on top
  nodes.slice().sort((a,b)=>b.n-a.n).forEach(nd=>{
    const w = Math.sqrt(nd.n/maxN);        // 0..1; sqrt keeps sparse cells visible
    const r = 18 + w*34;                   // user units
    const opacity = 0.14 + w*0.62;
    const grad = 'url(#'+(HEAT_GRADS[nd.type]||'heatGradImprove')+')';

    const g=document.createElementNS(SVGNS,'g');
    g.setAttribute('class','heat-blob');
    g.setAttribute('tabindex','0');
    g.setAttribute('role','button');
    g.setAttribute('aria-label', heatNodeLabel(nd));

    const halo=document.createElementNS(SVGNS,'circle');
    halo.setAttribute('class','halo');
    halo.setAttribute('cx',nd.x.toFixed(1)); halo.setAttribute('cy',nd.y.toFixed(1));
    halo.setAttribute('r',r.toFixed(1));
    halo.style.setProperty('--hr',r.toFixed(1)+'px');
    halo.setAttribute('fill',grad);
    halo.setAttribute('opacity',opacity.toFixed(3));

    g.appendChild(halo);

    const show=()=>showHeatPopup(nd);
    const hide=()=>hideHeatPopup();
    g.addEventListener('mouseenter',show);
    g.addEventListener('mouseleave',hide);
    g.addEventListener('focus',show);
    g.addEventListener('blur',hide);
    g.addEventListener('click',e=>{ e.stopPropagation(); show(); });
    container.appendChild(g);
  });
}
function heatNodeLabel(nd){
  return t('zone.'+nd.zoneKey+'.name')+', '+nd.n+' '+t('opinion.unitOpinions');
}
/* viewBox -> canvas pixels via the live camera, so the popup stays on the blob
   it belongs to after any amount of zooming and panning */
function showHeatPopup(nd){
  const popup=document.getElementById('heatPopup');
  const typeLabels={positive:t('opinion.typeLabelPositive'),improve:t('opinion.typeLabelImprove'),concern:t('opinion.typeLabelConcern'),function:t('opinion.typeLabelFunction')};
  popup.innerHTML='<h5>'+t('zone.'+nd.zoneKey+'.name')+'</h5>'+
    '<div class="tag">'+nd.n+' '+t('opinion.unitOpinions')+' \u00b7 '+typeLabels[nd.type]+'</div>'+
    '<div class="text">"'+heatT(nd.topicKey)+'"</div>';
  popup.classList.add('show');
  const canvas=document.getElementById('heatCanvas');
  const cr=canvas.getBoundingClientRect();
  const pt=heatCam.viewToLocal(nd.x,nd.y);
  const pw=popup.offsetWidth, ph=popup.offsetHeight;
  let left=pt.x+18;
  if(left+pw>cr.width-8) left=pt.x-pw-18;
  let top=pt.y-24;
  top=Math.max(8,Math.min(top,cr.height-ph-8));
  popup.style.left=Math.max(8,left)+'px';
  popup.style.top=top+'px';
}
function hideHeatPopup(){ document.getElementById('heatPopup').classList.remove('show'); }

function filterOpinions(filter){
  document.querySelectorAll('.opinion-filter').forEach(f=>f.classList.remove('active'));
  document.querySelector('.opinion-filter[data-filter="'+filter+'"]').classList.add('active');
  renderHeatPoints(filter);
  const typeMap={all:t('opinion.typeLabelAll'),positive:t('opinion.typeLabelPositive'),improve:t('opinion.typeLabelImprove'),concern:t('opinion.typeLabelConcern'),function:t('opinion.typeLabelFunction')};
  const counts={all:OPINIONS.length};
  OPINION_TYPES.forEach(k=>{ counts[k]=OPINIONS.filter(p=>p.type===k).length; });
  showToast(t('opinion.filterToast').replace('{type}',typeMap[filter]).replace('{count}',counts[filter]));
}

/* A submission from the survey form joins the same corpus, so every figure on
   the page moves with it. */
function addHeatPoint(data){
  const zoneKey = data.zoneKey || 'z1';
  const coord = zoneCoords[zoneKey] || {x:400,y:240};
  const type = data.rating>=4?'positive':data.rating<=2?'concern':data.suggestion?'improve':'function';
  const lang = window.currentLang || 'zh-CN';
  const custom = data.suggestion || '';
  if(custom){
    heatTexts['en']['heat.custom']=custom;
    heatTexts['zh-CN']['heat.custom']=custom;
    heatTexts['zh-TW']['heat.custom']=custom;
  } else if(!heatTexts[lang]['heat.custom']){
    heatTexts['en']['heat.custom']='User opinion';
    heatTexts['zh-CN']['heat.custom']='用户意见';
    heatTexts['zh-TW']['heat.custom']='用戶意見';
  }
  const rnd = mulberry32(Date.now() & 0xffff);
  OPINIONS.push({
    x: coord.x + (rnd()-0.5)*36,
    y: coord.y + (rnd()-0.5)*36,
    zoneKey: zoneKey, type: type,
    topicKey: custom ? 'heat.custom' : (data.functions && data.functions[0]) || 'heat.generalOpinion',
    tagKey: (data.functions && data.functions[0]) || 'heat.generalOpinion',
    rating: data.rating || 3
  });
  refreshDerived();
}

/* re-derive every figure and redraw whatever depends on the corpus */
function refreshDerived(){
  const fresh = buildTableData();
  tableData.length = 0;
  fresh.forEach(r=>tableData.push(r));
  applyDerivedNumbers();
  renderHeatPoints(window.currentHeatFilter || 'all');
  renderDashTable();
  safeUpdateCharts();
}

function updateCharts(){
  if(surveyChartInst) surveyChartInst.destroy();
  if(dashBarInst) dashBarInst.destroy();
  if(dashPieInst) dashPieInst.destroy();
  const sCtx=document.getElementById('surveyChart').getContext('2d');
  surveyChartInst=new Chart(sCtx,{
    type:'doughnut',
    data:{labels:t('chart.labels.func'),datasets:[{data:[28,22,18,15,10,7],backgroundColor:['#4DB6AC','#66BB6A','#FFB74D','#BA68C8','#42A5F5','#26C6DA'],borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{size:11},color:'#333'}},title:{display:true,text:t('chart.funcDist'),font:{size:13}}}}
  });
  const bCtx=document.getElementById('dashBarChart').getContext('2d');
  const bRows=tableData.map(r=>({n:t('zone.'+r.zoneKey+'.short'),v:r.avg,p:r.priority}));
  dashBarInst=new Chart(bCtx,{
    type:'bar',
    data:{labels:bRows.map(r=>r.n),datasets:[{label:t('chart.satisfaction'),data:bRows.map(r=>r.v),backgroundColor:bRows.map(r=>r.p==='high'?'#FF9800':'#4CAF6F'),borderRadius:6}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,max:5,ticks:{color:'rgba(255,255,255,0.5)'},grid:{color:'rgba(255,255,255,0.08)'}},x:{ticks:{color:'rgba(255,255,255,0.5)',font:{size:10},maxRotation:45,minRotation:45,autoSkip:false},grid:{display:false}}}}
  });
  const pCtx=document.getElementById('dashPieChart').getContext('2d');
  dashPieInst=new Chart(pCtx,{
    type:'pie',
    data:{labels:t('chart.labels.opinion'),datasets:[{data:[42,38,12,8],backgroundColor:['#4CAF6F','#FF9800','#ef5350','#42A5F5'],borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:'rgba(255,255,255,0.7)',font:{size:11}}}}}
  });
}

function animateNumber(el,target,duration){
  duration=duration||1500;
  const startTime=performance.now();
  function update(now){
    const elapsed=now-startTime;
    const progress=Math.min(elapsed/duration,1);
    const eased=1-Math.pow(1-progress,3);
    const val=Math.floor(target*eased);
    el.textContent=target>100?val.toLocaleString():val;
    if(progress<1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* Chart.js comes from a CDN. If it is blocked or slow the maps and every
   derived figure must still render, so nothing may call it directly. */
function safeUpdateCharts(){
  if(typeof Chart === 'undefined') return;
  try{ updateCharts(); }catch(e){ console.warn('charts unavailable:', e.message); }
}

window.addEventListener('load',()=>{
  /* figures first: they must not sit behind anything that can fail */
  applyDerivedNumbers();
  initLang();
  renderSurveyOptions();
  renderRoadmap();
  renderDashTable();
  safeUpdateCharts();
  renderHeatPoints('all');
  /* re-publish once layout has settled, so both scale bars are truthful */
  mapCam.render(mapCam.view());
  heatCam.render(heatCam.view());
  const d = window.derivedStats || {zones:7, total:1284};
  animateNumber(document.getElementById('stat1'), d.zones);
  animateNumber(document.getElementById('stat2'), d.total);
  animateNumber(document.getElementById('stat3'), funcKeys.length);
  animateNumber(document.getElementById('stat4'), 6);
});
