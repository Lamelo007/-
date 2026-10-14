/* ========== App Logic (uses i18n.js for translations) ========== */

/* Zone metadata keys (names resolved via i18n) */
const zoneKeys = ['z1','z2','z3','z4','z5','z6','z7','z8'];

/* Survey options data (keys reference i18n) */
const surveyZoneKeys = [
  {key:'z1', icon:'\u{1F9AB}'}, // flamingo
  {key:'z2', icon:'\u{1F333}'}, // tree
  {key:'z3', icon:'\u{1F33F}'}, // herb
  {key:'z4', icon:'\u{1F4A7}'}, // water drop
  {key:'z5', icon:'\u{1F3DE}\uFE0F'}, // park
  {key:'z6', icon:'\u{1F98C}'}, // deer
];
const funcKeys = [
  {key:'func.sports', icon:'\u{1F3C3}'},
  {key:'func.children', icon:'\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}'},
  {key:'func.eco', icon:'\u{1F98B}'},
  {key:'func.cycling', icon:'\u{1F6B4}'},
  {key:'func.education', icon:'\u{1F393}'},
  {key:'func.birdwatch', icon:'\u{1F41F}'},
];

/* Heatmap data (text references i18n zone names) */
const heatPoints = [
  {x:180,y:140,r:45,intensity:0.9,type:'positive',zoneKey:'z1',textKey:'heat.p1',tagKey:'func.eco'},
  {x:370,y:130,r:35,intensity:0.7,type:'improve',zoneKey:'z2',textKey:'heat.p2',tagKey:'tag.shade'},
  {x:535,y:200,r:40,intensity:0.8,type:'function',zoneKey:'z3',textKey:'heat.p3',tagKey:'func.cycling'},
  {x:680,y:120,r:30,intensity:0.6,type:'concern',zoneKey:'z4',textKey:'heat.p4',tagKey:'func.eco'},
  {x:310,y:340,r:38,intensity:0.75,type:'improve',zoneKey:'z5',textKey:'heat.p5',tagKey:'tag.walkable'},
  {x:480,y:340,r:42,intensity:0.85,type:'concern',zoneKey:'z6',textKey:'heat.p6',tagKey:'func.eco'},
  {x:155,y:350,r:28,intensity:0.5,type:'positive',zoneKey:'z7',textKey:'heat.p7',tagKey:'heat.ecoConn'},
  {x:630,y:335,r:36,intensity:0.7,type:'function',zoneKey:'z8',textKey:'heat.p8',tagKey:'func.education'},
  {x:200,y:100,r:20,intensity:0.4,type:'positive',zoneKey:'z1',textKey:'heat.p9',tagKey:'heat.birdwatch'},
  {x:340,y:180,r:18,intensity:0.35,type:'improve',zoneKey:'z2',textKey:'heat.p10',tagKey:'tag.lighting'},
  {x:500,y:230,r:22,intensity:0.45,type:'function',zoneKey:'z3',textKey:'heat.p11',tagKey:'tag.accessible'},
];
/* Heat text translations (inline for brevity) */
const heatTexts = {
  'en':{
    'heat.p1':'Hope to add birdwatching hides and guided tour services',
    'heat.p2':'Insufficient shade facilities, too hot in summer',
    'heat.p3':'Suggest adding greenway cycling routes and rest stops',
    'heat.p4':'Concerned that development will affect ecological restoration',
    'heat.p5':'Poor walkability, need more entrances',
    'heat.p6':'Should restrict visitor access to protect ecology',
    'heat.p7':'Eco-corridor design is great, support it',
    'heat.p8':'Hope to add a children nature education center',
    'heat.p9':'Great birdwatching experience',
    'heat.p10':'Insufficient night lighting',
    'heat.p11':'Hope to add accessible ramps',
    'heat.ecoConn':'Ecological Connection','heat.birdwatch':'Birdwatching',
  },
  'zh-CN':{
    'heat.p1':'希望增加观鸟隐蔽设施和导赏服务',
    'heat.p2':'遮阴设施不足，夏季太热无法使用',
    'heat.p3':'建议增加绿道骑行路线和休息站',
    'heat.p4':'担心开发影响生态修复进度',
    'heat.p5':'步行可达性差，需要更多入口',
    'heat.p6':'应限制游客进入，保护生态',
    'heat.p7':'生态走廊设计很好，支持',
    'heat.p8':'希望增设儿童自然教育中心',
    'heat.p9':'观鸟体验很好',
    'heat.p10':'夜间照明不足',
    'heat.p11':'希望增加无障碍通道',
    'heat.ecoConn':'生态连接','heat.birdwatch':'观鸟',
  },
  'zh-TW':{
    'heat.p1':'希望增加觀鳥隱蔽設施和導賞服務',
    'heat.p2':'遮陰設施不足，夏季太熱無法使用',
    'heat.p3':'建議增加綠道騎行路線和休息站',
    'heat.p4':'擔心開發影響生態修復進度',
    'heat.p5':'步行可達性差，需要更多入口',
    'heat.p6':'應限制遊客進入，保護生態',
    'heat.p7':'生態走廊設計很好，支持',
    'heat.p8':'希望增設兒童自然教育中心',
    'heat.p9':'觀鳥體驗很好',
    'heat.p10':'夜間照明不足',
    'heat.p11':'希望增加無障礙通道',
    'heat.ecoConn':'生態連接','heat.birdwatch':'觀鳥',
  },
};
function heatT(key){
  const lang = window.currentLang || 'zh-CN';
  return (heatTexts[lang] && heatTexts[lang][key]) || heatTexts['zh-CN'][key] || key;
}

/* Zone coords for new heat points */
const zoneCoords = {
  'z1':{x:180,y:140},'z2':{x:370,y:130},'z3':{x:535,y:200},'z4':{x:680,y:120},
  'z5':{x:310,y:340},'z6':{x:480,y:340},'z7':{x:155,y:350},'z8':{x:630,y:335},
};

/* Dashboard table data */
const tableData = [
  {zoneKey:'z1',typeKey:'type.wetland',opinions:186,avg:4.2,topicKey:'heat.birdwatch',priority:'low'},
  {zoneKey:'z2',typeKey:'type.park',opinions:234,avg:3.1,topicKey:'tag.shade',priority:'high'},
  {zoneKey:'z3',typeKey:'type.corridor',opinions:156,avg:3.8,topicKey:'func.cycling',priority:'mid'},
  {zoneKey:'z4',typeKey:'type.wetland',opinions:98,avg:3.5,topicKey:'heat.ecoConn',priority:'mid'},
  {zoneKey:'z5',typeKey:'type.park',opinions:201,avg:3.2,topicKey:'tag.walkable',priority:'high'},
  {zoneKey:'z6',typeKey:'type.reserve',opinions:145,avg:4.5,topicKey:'func.eco',priority:'low'},
  {zoneKey:'z7',typeKey:'type.corridor',opinions:87,avg:4.0,topicKey:'heat.ecoConn',priority:'low'},
  {zoneKey:'z8',typeKey:'type.park',opinions:177,avg:3.6,topicKey:'func.education',priority:'mid'},
];

/* State */
const surveyData = {zoneKey:null,rating:0,functions:[],suggestion:''};
let currentStep = 0;
let surveyCount = 1284;
let mapScale = 1;
let surveyChartInst=null, dashBarInst=null, dashPieInst=null;

/* ========== Navigation ========== */
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

/* ========== Render Survey Options ========== */
function renderSurveyOptions(){
  const zc = document.getElementById('zoneOptions');
  if(!zc) return;
  zc.innerHTML = surveyZoneKeys.map(z=>
    '<div class="option-item" data-value="'+z.key+'" onclick="selectSurveyOption(this)">'+
    '<div class="radio"></div><span class="label">'+z.icon+' '+t('zone.'+z.key+'.name')+'</span></div>'
  ).join('');
  // Restore selected state
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
  // Restore selected state
  if(surveyData.functions.length){
    fc.querySelectorAll('.option-item').forEach(o=>{
      if(surveyData.functions.includes(o.dataset.fkey)) o.classList.add('selected');
    });
  }
}

/* ========== Render Roadmap ========== */
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

/* ========== Render Dashboard Table ========== */
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

/* ========== Map: Zone Selection ========== */
window.selectedZoneId = null;
function selectZone(id){
  const zk = id;
  window.selectedZoneId = zk;
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
  const map = {z1:'wetland',z2:'park',z3:'corridor',z4:'wetland',z5:'park',z6:'reserve',z7:'corridor',z8:'park'};
  return map[zk]||'park';
}

/* ========== Map Filters ========== */
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

/* ========== Map Zoom ========== */
document.getElementById('zoomIn').addEventListener('click',()=>{
  mapScale=Math.min(mapScale*1.2,2);
  document.getElementById('mapSvg').style.transform='scale('+mapScale+')';
});
document.getElementById('zoomOut').addEventListener('click',()=>{
  mapScale=Math.max(mapScale/1.2,0.5);
  document.getElementById('mapSvg').style.transform='scale('+mapScale+')';
});
document.getElementById('resetMap').addEventListener('click',()=>{
  mapScale=1;
  document.getElementById('mapSvg').style.transform='scale(1)';
  document.querySelectorAll('.filter-chip[data-filter]').forEach(c=>c.classList.remove('active'));
  document.querySelector('.filter-chip[data-filter="all"]').classList.add('active');
  document.querySelectorAll('.zone').forEach(z=>{z.style.opacity='0.7';z.style.pointerEvents='auto';});
});

/* ========== Survey Logic ========== */
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
  // Feedback
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

/* ========== Toast ========== */
function showToast(msg){
  const tEl=document.getElementById('toast');
  tEl.textContent=msg;
  tEl.classList.add('show');
  setTimeout(()=>tEl.classList.remove('show'),3000);
}

/* ========== Heatmap ========== */
function renderHeatPoints(filter){
  filter = filter || 'all';
  window.currentHeatFilter = filter;
  const container=document.getElementById('heatCircles');
  if(!container) return;
  container.innerHTML='';
  const filtered = filter==='all' ? heatPoints : heatPoints.filter(p=>p.type===filter);
  const colors = {positive:'#4CAF6F',improve:'#FF9800',concern:'#ef5350',function:'#42A5F5'};
  filtered.forEach(p=>{
    const opacity=0.2+p.intensity*0.5;
    const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx',p.x); circle.setAttribute('cy',p.y); circle.setAttribute('r',p.r);
    circle.setAttribute('fill',colors[p.type]||'#FF9800');
    circle.setAttribute('opacity',opacity);
    circle.style.cursor='pointer'; circle.style.transition='all 0.3s';
    circle.addEventListener('mouseenter',()=>{
      circle.setAttribute('r',p.r*1.2); circle.setAttribute('opacity',0.85);
      showHeatPopup(p);
    });
    circle.addEventListener('mouseleave',()=>{
      circle.setAttribute('r',p.r); circle.setAttribute('opacity',opacity);
      hideHeatPopup();
    });
    container.appendChild(circle);
  });
}
function showHeatPopup(p){
  const popup=document.getElementById('heatPopup');
  const typeLabels={positive:t('opinion.typeLabelPositive'),improve:t('opinion.typeLabelImprove'),concern:t('opinion.typeLabelConcern'),function:t('opinion.typeLabelFunction')};
  popup.innerHTML='<h5>'+t('zone.'+p.zoneKey+'.name')+'</h5>'+
    '<div class="tag">'+typeLabels[p.type]+' \u00b7 '+heatT(p.tagKey)+'</div>'+
    '<div class="text">"'+heatT(p.textKey)+'"</div>';
  const rect=document.getElementById('heatCanvas').getBoundingClientRect();
  const scaleX=rect.width/800, scaleY=rect.height/480;
  popup.style.left=(p.x*scaleX+15)+'px';
  popup.style.top=(p.y*scaleY-30)+'px';
  popup.classList.add('show');
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
  // Add custom text
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

/* ========== Charts ========== */
function updateCharts(){
  // Destroy existing charts
  if(surveyChartInst) surveyChartInst.destroy();
  if(dashBarInst) dashBarInst.destroy();
  if(dashPieInst) dashPieInst.destroy();

  // Survey doughnut chart
  const sCtx=document.getElementById('surveyChart').getContext('2d');
  surveyChartInst=new Chart(sCtx,{
    type:'doughnut',
    data:{labels:t('chart.labels.func'),datasets:[{data:[28,22,18,15,10,7],backgroundColor:['#4DB6AC','#66BB6A','#FFB74D','#BA68C8','#42A5F5','#26C6DA'],borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{size:11},color:'#333'}},title:{display:true,text:t('chart.funcDist'),font:{size:13}}}}
  });

  // Dashboard bar chart
  const bCtx=document.getElementById('dashBarChart').getContext('2d');
  dashBarInst=new Chart(bCtx,{
    type:'bar',
    data:{labels:t('chart.labels.zones'),datasets:[{label:t('chart.satisfaction'),data:[4.2,3.1,3.8,3.5,3.2,4.5,4.0,3.6],backgroundColor:['#4CAF6F','#FF9800','#4CAF6F','#FF9800','#FF9800','#4CAF6F','#4CAF6F','#FF9800'],borderRadius:6}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,max:5,ticks:{color:'rgba(255,255,255,0.5)'},grid:{color:'rgba(255,255,255,0.08)'}},x:{ticks:{color:'rgba(255,255,255,0.5)',font:{size:10}},grid:{display:false}}}}
  });

  // Dashboard pie chart
  const pCtx=document.getElementById('dashPieChart').getContext('2d');
  dashPieInst=new Chart(pCtx,{
    type:'pie',
    data:{labels:t('chart.labels.opinion'),datasets:[{data:[42,38,12,8],backgroundColor:['#4CAF6F','#FF9800','#ef5350','#42A5F5'],borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:'rgba(255,255,255,0.7)',font:{size:11}}}}}
  });
}

/* ========== Animate Hero Stats ========== */
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

/* ========== Init ========== */
window.addEventListener('load',()=>{
  initLang();
  renderSurveyOptions();
  renderRoadmap();
  renderDashTable();
  updateCharts();
  renderHeatPoints('all');
  animateNumber(document.getElementById('stat1'),15);
  animateNumber(document.getElementById('stat2'),1284);
  animateNumber(document.getElementById('stat3'),8);
  animateNumber(document.getElementById('stat4'),3);
});
