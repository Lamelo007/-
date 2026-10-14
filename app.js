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
const heatPoints = [
  {x:104,y:243,r:45,intensity:0.9,type:'positive',zoneKey:'z1',textKey:'heat.p1',tagKey:'func.birdwatch'},
  {x:280,y:116,r:38,intensity:0.7,type:'improve',zoneKey:'z2',textKey:'heat.p2',tagKey:'heat.wetlandManage'},
  {x:332,y:136,r:34,intensity:0.8,type:'function',zoneKey:'z3',textKey:'heat.p3',tagKey:'func.education'},
  {x:564,y:292,r:30,intensity:0.6,type:'concern',zoneKey:'z4',textKey:'heat.p4',tagKey:'func.eco'},
  {x:535,y:268,r:42,intensity:0.85,type:'concern',zoneKey:'z5',textKey:'heat.p6',tagKey:'func.eco'},
  {x:679,y:102,r:36,intensity:0.75,type:'improve',zoneKey:'z6',textKey:'heat.p5',tagKey:'heat.access'},
  {x:754,y:185,r:36,intensity:0.7,type:'function',zoneKey:'z7',textKey:'heat.p8',tagKey:'func.education'},
  {x:152,y:193,r:20,intensity:0.4,type:'positive',zoneKey:'z1',textKey:'heat.p9',tagKey:'func.birdwatch'},
  {x:222,y:112,r:18,intensity:0.35,type:'improve',zoneKey:'z2',textKey:'heat.p10',tagKey:'heat.lighting'},
  {x:382,y:180,r:22,intensity:0.45,type:'function',zoneKey:'z3',textKey:'heat.p11',tagKey:'heat.accessible'},
  {x:708,y:141,r:28,intensity:0.5,type:'positive',zoneKey:'z7',textKey:'heat.p7',tagKey:'heat.ecoConn'},
];
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
const tableData = [
  {zoneKey:'z1',typeKey:'type.wetland',opinions:186,avg:4.2,topicKey:'func.birdwatch',priority:'low'},
  {zoneKey:'z2',typeKey:'type.wetland',opinions:234,avg:3.1,topicKey:'heat.wetlandManage',priority:'high'},
  {zoneKey:'z3',typeKey:'type.park',opinions:156,avg:3.8,topicKey:'func.education',priority:'mid'},
  {zoneKey:'z4',typeKey:'type.reserve',opinions:98,avg:3.5,topicKey:'func.eco',priority:'mid'},
  {zoneKey:'z5',typeKey:'type.reserve',opinions:201,avg:3.2,topicKey:'heat.restricted',priority:'high'},
  {zoneKey:'z6',typeKey:'type.wetland',opinions:145,avg:4.5,topicKey:'heat.access',priority:'low'},
  {zoneKey:'z7',typeKey:'type.park',opinions:177,avg:3.6,topicKey:'func.education',priority:'mid'},
];
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

/* Each opinion is a soft radial halo (density) plus a small solid core (type).
   The halos blend with `mix-blend-mode:multiply`, so where opinions pile up the
   colour deepens instead of just stacking flat discs. */
function renderHeatPoints(filter){
  filter = filter || 'all';
  window.currentHeatFilter = filter;
  const container=document.getElementById('heatCircles');
  if(!container) return;
  container.innerHTML='';
  const filtered = filter==='all' ? heatPoints : heatPoints.filter(p=>p.type===filter);
  // biggest halo first, so the small ones stay clickable on top
  filtered.slice().sort((a,b)=>b.r-a.r).forEach(p=>{
    const color=HEAT_COLORS[p.type]||'#FF9800';
    const grad='url(#'+(HEAT_GRADS[p.type]||'heatGradImprove')+')';
    const opacity=0.5+p.intensity*0.5;

    const g=document.createElementNS(SVGNS,'g');
    g.setAttribute('class','heat-blob');
    g.setAttribute('tabindex','0');
    g.setAttribute('role','button');
    g.setAttribute('aria-label',t('zone.'+p.zoneKey+'.name')+', '+heatT(p.textKey));

    const halo=document.createElementNS(SVGNS,'circle');
    halo.setAttribute('class','halo');
    halo.setAttribute('cx',p.x); halo.setAttribute('cy',p.y);
    halo.setAttribute('r',(p.r*2.2).toFixed(1));
    halo.style.setProperty('--hr',(p.r*2.2).toFixed(1)+'px');
    halo.setAttribute('fill',grad);
    halo.setAttribute('opacity',opacity);

    const core=document.createElementNS(SVGNS,'circle');
    core.setAttribute('class','core');
    core.setAttribute('cx',p.x); core.setAttribute('cy',p.y);
    core.setAttribute('r',(3+p.r*0.10).toFixed(1));
    core.style.setProperty('--cr',(3+p.r*0.10).toFixed(1)+'px');
    core.setAttribute('fill',color);
    core.setAttribute('opacity',0.9);

    g.appendChild(halo); g.appendChild(core);

    const show=()=>showHeatPopup(p);
    const hide=()=>hideHeatPopup();
    g.addEventListener('mouseenter',show);
    g.addEventListener('mouseleave',hide);
    g.addEventListener('focus',show);
    g.addEventListener('blur',hide);
    g.addEventListener('click',e=>{ e.stopPropagation(); show(); });
    container.appendChild(g);
  });
}
/* viewBox -> canvas pixels via the live camera, so the popup stays on the blob
   it belongs to after any amount of zooming and panning */
function showHeatPopup(p){
  const popup=document.getElementById('heatPopup');
  const typeLabels={positive:t('opinion.typeLabelPositive'),improve:t('opinion.typeLabelImprove'),concern:t('opinion.typeLabelConcern'),function:t('opinion.typeLabelFunction')};
  popup.innerHTML='<h5>'+t('zone.'+p.zoneKey+'.name')+'</h5>'+
    '<div class="tag">'+typeLabels[p.type]+' \u00b7 '+heatT(p.tagKey)+'</div>'+
    '<div class="text">"'+heatT(p.textKey)+'"</div>';
  popup.classList.add('show');
  const canvas=document.getElementById('heatCanvas');
  const cr=canvas.getBoundingClientRect();
  const pt=heatCam.viewToLocal(p.x,p.y);
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
  const counts={all:heatPoints.length,positive:heatPoints.filter(p=>p.type==='positive').length,improve:heatPoints.filter(p=>p.type==='improve').length,concern:heatPoints.filter(p=>p.type==='concern').length,function:heatPoints.filter(p=>p.type==='function').length};
  showToast(t('opinion.filterToast').replace('{type}',typeMap[filter]).replace('{count}',counts[filter]));
}

function addHeatPoint(data){
  const coord = zoneCoords[data.zoneKey]||{x:400,y:240};
  const type = data.rating>=4?'positive':data.rating<=2?'concern':data.suggestion?'improve':'function';
  heatPoints.push({
    x:coord.x+(Math.random()-0.5)*40, y:coord.y+(Math.random()-0.5)*40,
    r:25+Math.random()*20, intensity:0.5+Math.random()*0.4, type:type,
    zoneKey:data.zoneKey||'z1',
    textKey:'heat.custom', tagKey:data.functions[0]||'heat.generalOpinion',
  });
  const lang=window.currentLang||'zh-CN';
  if(!heatTexts[lang]['heat.custom']){
    heatTexts['en']['heat.custom']=data.suggestion||'User opinion';
    heatTexts['zh-CN']['heat.custom']=data.suggestion||'用户意见';
    heatTexts['zh-TW']['heat.custom']=data.suggestion||'用戶意見';
  } else {
    heatTexts[lang]['heat.custom']=data.suggestion||heatTexts[lang]['heat.custom'];
  }
  renderHeatPoints();
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

window.addEventListener('load',()=>{
  initLang();
  renderSurveyOptions();
  renderRoadmap();
  renderDashTable();
  updateCharts();
  renderHeatPoints('all');
  /* re-publish once layout has settled, so both scale bars are truthful */
  mapCam.render(mapCam.view());
  heatCam.render(heatCam.view());
  animateNumber(document.getElementById('stat1'),7);
  animateNumber(document.getElementById('stat2'),1284);
  animateNumber(document.getElementById('stat3'),6);
  animateNumber(document.getElementById('stat4'),6);
});
