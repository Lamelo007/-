/* ================================================================
   I18N TRANSLATIONS — English / 简体中文 / 繁體中文
   ================================================================ */
const I18N = {
'en':{
'nav.overview':'Overview','nav.problem':'Problem','nav.map':'Green Map','nav.survey':'Survey','nav.opinion':'AI Opinion','nav.dashboard':'Dashboard','nav.roadmap':'Roadmap','nav.cta':'Participate',
'hero.badge':'Hackathon Demo · Northern Metropolis Green Space Planning',
'hero.title1':'Make Green Planning ','hero.title2':'Visible','hero.title3':'Put Resident Voices ','hero.title4':'On the Map',
'hero.desc':'Transforming official text-based green space plans into interactive maps. Residents can view planning info and submit feedback. AI aggregates public input into spatial opinion, helping the government intuitively understand resident needs.',
'hero.btn1':'Explore Green Map','hero.btn2':'View Dashboard',
'hero.stat1':'Planned Green Zones','hero.stat2':'Resident Submissions','hero.stat3':'Function Types','hero.stat4':'Demo Areas',
'problem.title':'Current Pain Points','problem.subtitle':'Lack of intuitive communication channels between residents and the government on green space planning',
'problem.c1.title':'Text Reports Hard to Understand','problem.c1.desc':'Official green space plans are mostly released as text reports. The public struggles to understand where green areas are and what they are used for.',
'problem.c2.title':'Feedback Cannot Be Spatialized','problem.c2.desc':'Existing consultation channels collect text-based feedback. Resident suggestions cannot be displayed on a map, and the government cannot see their spatial distribution.',
'problem.c3.title':'Insufficient Transparency','problem.c3.desc':'Residents cannot easily access planning info, and the government cannot see the geographic spread of public suggestions, reducing participation efficiency.',
'problem.c4.title':'Low Feedback Processing Efficiency','problem.c4.desc':'Public feedback is collected as plain text, requiring manual sorting. There is no automated spatial opinion aggregation and visualization tool.',
'problem.before.title':'\u274c Status Quo: Text-Driven','problem.before.1':'Planning reports are text-heavy PDFs, lacking map visualization','problem.before.2':'Public feedback collected in text tables, impossible to geo-locate','problem.before.3':'Government must manually sort opinions — slow and narrow coverage','problem.before.4':'Residents face high barriers to participation',
'problem.after.title':'\u2705 Solution: Map-Driven','problem.after.1':'Official plans converted to interactive visual maps with one click','problem.after.2':'Residents view plans on the map and submit spatial feedback','problem.after.3':'AI automatically aggregates feedback into opinion heatmaps','problem.after.4':'Government sees opinion distribution intuitively for decision support',
'type.park':'Park','type.wetland':'Wetland','type.corridor':'Eco-Corridor','type.reserve':'Nature Reserve',
'map.title':'Interactive Green Space Map','map.subtitle':'Click green zones on the map to view planning details, function types, and area info',
'map.filter.all':'All','map.zoomIn':'Zoom In','map.zoomOut':'Zoom Out','map.reset':'Reset','map.builtArea':'Built-up Area','map.demoArea':'Northern Metropolis · Demo Area',
'map.panelTitle':'\ud83d\udccb Zone Details','map.emptyHint':'\ud83d\udc46 Click a green zone on the map<br>to view detailed planning info',
'map.planningArea':'Planning Area','map.opinionCount':'Opinion Count','map.avgSatisfaction':'Avg. Satisfaction','map.attentionLevel':'Attention Level','map.planningData':'\ud83d\udcca Planning Data','map.planningFunctions':'\ud83c\udfaf Planned Functions','map.submitOpinion':'\ud83d\udcac Submit Opinion for This Zone',
'map.level.high':'High','map.level.mid':'Medium','map.level.low':'Low',
'survey.title':'Resident Opinion Survey','survey.subtitle':'Your feedback will be automatically aggregated by AI and shown on the opinion heatmap',
'survey.step0':'Zone','survey.step1':'Rating','survey.step2':'Functions','survey.step3':'Suggestions',
'survey.prev':'Previous','survey.next':'Next','survey.submit':'Submit Survey','survey.selectRating':'Please select a rating',
'survey.q0.title':'Which green zone do you care about most?','survey.q0.hint':'Select a planning zone you are most concerned about',
'survey.q1.title':'How satisfied are you with the planning of this zone?','survey.q1.hint':'1 star = Very dissatisfied, 5 stars = Very satisfied',
'survey.q2.title':'What functions do you want this zone to have?','survey.q2.hint':'Multi-select',
'survey.q3.title':'Any other suggestions for this zone?','survey.q3.hint':'Your suggestions will be analyzed by AI and aggregated to the opinion heatmap',
'survey.q3.placeholder':'e.g., Add more shaded rest facilities, improve walkability, add night lighting...',
'survey.quickTags':'Quick tags:',
'survey.resultHeader':'\ud83d\udcca Real-time Aggregation Stats','survey.totalSurvey':'Total Surveys','survey.todayNew':'New Today','survey.avgRating':'Avg. Rating','survey.activeZones':'Active Zones',
'survey.toast.selectZone':'Please select a zone first','survey.toast.selectRating':'Please select a rating first','survey.toast.success':'Survey submitted! AI has aggregated your opinion.',
'survey.fb.success':'\u2705 <strong>Submitted!</strong> Your opinion on <strong>{zone}</strong> (satisfaction {rating}\u2b50) has been aggregated to the opinion heatmap via AI.<br>\ud83c\udfaf AI identified keywords: {keywords}',
'survey.fb.general':'General feedback','survey.fb.unknownZone':'this zone',
'func.sports':'Sports & Recreation','func.children':'Children Playground','func.eco':'Ecological Conservation','func.cycling':'Greenway Cycling','func.education':'Nature Education','func.birdwatch':'Birdwatching/Wetland Experience',
'tag.shade':'Shade facilities','tag.walkable':'Walkability','tag.lighting':'Night lighting','tag.accessible':'Accessibility',
'rating.1':'Very dissatisfied','rating.2':'Somewhat dissatisfied','rating.3':'Neutral','rating.4':'Fairly satisfied','rating.5':'Very satisfied',
'opinion.title':'AI Opinion Aggregation Heatmap','opinion.subtitle':'AI automatically analyzes survey text, mapping public opinions to geographic space. Stronger heat indicates higher attention and opinion density in that area',
'opinion.typeLabel':'Opinion Type:','opinion.all':'All Opinions','opinion.positive':'\ud83d\udc4d Positive','opinion.improve':'\ud83d\udd27 Improvement','opinion.concern':'\u26a0\ufe0f Concerns','opinion.function':'\ud83c\udfaf Function Needs',
'opinion.stat1':'Aggregated Opinions','opinion.stat2':'Positive','opinion.stat3':'Improvements','opinion.stat4':'Concerns',
'opinion.low':'Low','opinion.high':'High',
'opinion.filterToast':'Filtered: {type} opinions ({count} entries)',
'opinion.typeLabelAll':'All','opinion.typeLabelPositive':'Positive','opinion.typeLabelImprove':'Improvement','opinion.typeLabelConcern':'Concerns','opinion.typeLabelFunction':'Function Needs',
'dash.title':'Government Decision Dashboard','dash.subtitle':'Planning officers can intuitively view public opinion distribution, satisfaction trends, and hot topics',
'dash.kpi1':'Total Opinions','dash.kpi2':'Avg. Satisfaction','dash.kpi3':'Covered Zones','dash.kpi4':'Hot Topic',
'dash.trend1':'\u2191 12% this week','dash.trend2':'\u2191 0.3 vs last week','dash.trend3':'\u2191 2 new','dash.trend4':'\u2193 Needs attention',
'dash.hotTopic':'Shade facilities',
'dash.chart1':'Satisfaction by Zone','dash.chart2':'Opinion Type Distribution','dash.tableTitle':'\ud83d\udccb Zone Opinion Summary Table',
'dash.col1':'Zone Name','dash.col2':'Type','dash.col3':'Opinions','dash.col4':'Avg. Satisfaction','dash.col5':'Hot Topic','dash.col6':'Priority',
'dash.priority.high':'High','dash.priority.mid':'Medium','dash.priority.low':'Low',
'roadmap.title':'Project Roadmap','roadmap.subtitle':'Complete milestones from planning to deployment',
'footer.brand':'Northern Metropolis Green Space Interactive Platform','footer.info':'Hackathon Demo | Client: Hong Kong Government Urban Planning & Land Development Dept. | 2026',
'zone.z1.name':'Mai Po Wetland','zone.z2.name':'San Tin Park','zone.z3.name':'Eco-Corridor A','zone.z4.name':'Wetland Restoration','zone.z5.name':'Kwu Tung Park','zone.z6.name':'Nature Reserve','zone.z7.name':'Eco-Corridor B','zone.z8.name':'Fanling Park',
'zone.z1.typeLabel':'Wetland','zone.z2.typeLabel':'Park','zone.z3.typeLabel':'Eco-Corridor','zone.z4.typeLabel':'Wetland','zone.z5.typeLabel':'Park','zone.z6.typeLabel':'Nature Reserve','zone.z7.typeLabel':'Eco-Corridor','zone.z8.typeLabel':'Park',
'zone.z1.area':'~240 ha','zone.z2.area':'~85 ha','zone.z3.area':'~60 ha','zone.z4.area':'~120 ha','zone.z5.area':'~45 ha','zone.z6.area':'~180 ha','zone.z7.area':'~50 ha','zone.z8.area':'~70 ha',
'zone.status.planned':'Planned','zone.status.planning':'In Planning','zone.status.restoring':'Restoring','zone.status.designated':'Designated',
'zone.z1.desc':'Mai Po Wetland is an internationally important wetland. The plan preserves its ecological value while adding public birdwatching trails and education facilities.',
'zone.z2.desc':'San Tin Park is planned as a comprehensive community park with sports fields, children playground areas, and a greenway system.',
'zone.z3.desc':'Eco-Corridor A connects Mai Po Wetland and San Tin Park, planned as an ecological connection channel to ensure wildlife migration.',
'zone.z4.desc':'The Wetland Restoration Area is undergoing ecological restoration to recover degraded wetlands and enhance stormwater management capacity.',
'zone.z5.desc':'Kwu Tung Park serves the surrounding community, with sports fields, fitness facilities, and community activity spaces.',
'zone.z6.desc':'The Nature Reserve focuses on ecological conservation with restricted public access, primarily for research monitoring and ecological protection.',
'zone.z7.desc':'Eco-Corridor B connects Kwu Tung Park and the Nature Reserve, providing greenway cycling and ecological connection functions.',
'zone.z8.desc':'Fanling Park integrates nature education and community leisure, featuring a nature education center and outdoor activity areas.',
'zone.z1.functions':['Ecological Conservation','Birdwatching','Environmental Education'],
'zone.z2.functions':['Sports & Recreation','Children Playground','Greenway'],
'zone.z3.functions':['Ecological Connection','Walking Greenway','Wildlife Habitat'],
'zone.z4.functions':['Ecological Restoration','Stormwater Management','Nature Education'],
'zone.z5.functions':['Community Leisure','Sports & Fitness','Community Activities'],
'zone.z6.functions':['Ecological Conservation','Research Monitoring','Restricted Access'],
'zone.z7.functions':['Ecological Connection','Greenway Cycling'],
'zone.z8.functions':['Sports & Recreation','Nature Education','Community Activities'],
'zone.z1.statusKey':'planned','zone.z2.statusKey':'planning','zone.z3.statusKey':'planning','zone.z4.statusKey':'restoring','zone.z5.statusKey':'planning','zone.z6.statusKey':'designated','zone.z7.statusKey':'planning','zone.z8.statusKey':'planning',
'roadmap.items':[
{'phase':'Phase 1','title':'Project Direction & Team Setup','desc':'Confirmed the Northern Metropolis green space interactive map direction, completed team role allocation, and established a GitHub collaboration repository.','status':'done','statusLabel':'\u2705 Completed'},
{'phase':'Phase 2','title':'Framework & Initial Page','desc':'Set up the overall project framework, created the demo website page, and studied relevant policy documents and academic materials.','status':'done','statusLabel':'\u2705 Completed'},
{'phase':'Phase 3 · In Progress','title':'Geo Data Import & Map Visualization','desc':'Searching for suitable geospatial data sources, importing green zone data, generating visual maps, and refining map display styles.','status':'current','statusLabel':'\ud83d\udd04 In Progress'},
{'phase':'Phase 4','title':'Survey Design & Integration','desc':'Design survey content, integrate the survey module into the website, and write code to collect and organize answer data.','status':'pending','statusLabel':'\u23f3 Not Started'},
{'phase':'Phase 5','title':'AI Opinion Aggregation & Opinion Map','desc':'Develop AI module to analyze survey text, build opinion map based on collected feedback, and adjust display rules for readability.','status':'pending','statusLabel':'\u23f3 Not Started'},
{'phase':'Phase 6','title':'Full Testing & Demo Deployment','desc':'Test all functional modules, verify data flow, AI aggregation, and map generation, and prepare for the final Hackathon demo.','status':'pending','statusLabel':'\u23f3 Not Started'},
],
'chart.funcDist':'Function Demand Distribution','chart.satisfaction':'Avg. Satisfaction',
'chart.labels.func':['Sports & Rec','Eco Conservation','Children Play','Greenway Cycling','Nature Ed','Wetland Exp'],
'chart.labels.opinion':['Positive','Improvement','Concerns','Function Needs'],
'chart.labels.zones':['Mai Po','San Tin','Corridor A','Wetland Rest.','Kwu Tung','Nature Res.','Corridor B','Fanling'],
'heat.unknownZone':'Unknown Zone','heat.generalOpinion':'General opinion',
},

'zh-CN':{
'nav.overview':'概览','nav.problem':'问题','nav.map':'绿化地图','nav.survey':'居民问卷','nav.opinion':'AI意见热图','nav.dashboard':'政府看板','nav.roadmap':'项目路线','nav.cta':'立即参与',
'hero.badge':'Hackathon Demo · 北部都会区绿化空间规划',
'hero.title1':'让绿化规划','hero.title2':'看得见','hero.title3':'让居民声音','hero.title4':'落得上图',
'hero.desc':'将官方文字版绿化空间规划转化为可视化互动地图，居民可查看规划信息并提交意见，AI 自动聚合公众反馈生成空间意见热图，帮助政府直观理解居民诉求。',
'hero.btn1':'探索绿化地图','hero.btn2':'查看政府看板',
'hero.stat1':'规划绿化区域','hero.stat2':'居民意见提交','hero.stat3':'功能类型','hero.stat4':'示范区覆盖',
'problem.title':'当前痛点','problem.subtitle':'居民与政府之间缺乏关于绿化空间规划的直观沟通渠道',
'problem.c1.title':'文字报告难理解','problem.c1.desc':'官方绿化规划主要以文字报告形式发布，公众难以理解绿化区域在哪里、用途是什么，信息获取门槛高。',
'problem.c2.title':'意见无法空间化','problem.c2.desc':'现有公众咨询渠道以文字形式收集意见，居民建议无法在地图上展示，政府也难以了解意见的空间分布。',
'problem.c3.title':'信息透明度不足','problem.c3.desc':'居民无法方便地查看规划信息，政府也看不到公众建议的地理分布，降低了公众参与效率。',
'problem.c4.title':'反馈整理效率低','problem.c4.desc':'公众反馈以纯文本收集，需要人工整理分类，缺乏自动化的空间意见聚合和可视化工具。',
'problem.before.title':'❌ 现状：文字驱动','problem.before.1':'规划报告以 PDF 文字为主，缺乏地图可视化','problem.before.2':'公众意见以文字表格收集，无法定位到地理空间','problem.before.3':'政府需手动整理意见，效率低、覆盖面窄','problem.before.4':'居民难以参与，沟通障碍大',
'problem.after.title':'✅ 方案：地图驱动','problem.after.1':'官方规划一键转化为互动可视化地图','problem.after.2':'居民在地图上查看规划并提交空间意见','problem.after.3':'AI 自动聚合反馈生成意见热图','problem.after.4':'政府直观查看意见分布，辅助决策',
'type.park':'公园','type.wetland':'湿地','type.corridor':'生态走廊','type.reserve':'自然保护区',
'map.title':'互动绿化空间地图','map.subtitle':'点击地图上的绿化区域，查看规划详情、功能类型和面积信息',
'map.filter.all':'全部','map.zoomIn':'放大','map.zoomOut':'缩小','map.reset':'重置','map.builtArea':'已建设区域','map.demoArea':'北部都会区 · 示范区域',
'map.panelTitle':'📋 区域详情','map.emptyHint':'👆 点击地图上的绿化区域<br>查看详细规划信息',
'map.planningArea':'规划面积','map.opinionCount':'意见数','map.avgSatisfaction':'平均满意度','map.attentionLevel':'关注度等级','map.planningData':'📊 规划数据','map.planningFunctions':'🎯 规划功能','map.submitOpinion':'💬 对此区域发表意见',
'map.level.high':'高','map.level.mid':'中','map.level.low':'低',
'survey.title':'居民意见问卷','survey.subtitle':'您的反馈将通过 AI 自动聚合，呈现在意见热图上',
'survey.step0':'区域','survey.step1':'评分','survey.step2':'功能','survey.step3':'建议',
'survey.prev':'上一步','survey.next':'下一步','survey.submit':'提交问卷','survey.selectRating':'请选择评分',
'survey.q0.title':'您最关注的绿化区域是？','survey.q0.hint':'选择一个您最关心的规划区域',
'survey.q1.title':'您对该区域规划方案的满意度？','survey.q1.hint':'1 星 = 非常不满意，5 星 = 非常满意',
'survey.q2.title':'您希望该区域具备哪些功能？','survey.q2.hint':'可多选',
'survey.q3.title':'您对该区域还有哪些建议？','survey.q3.hint':'您的建议将通过 AI 分析并聚合到意见热图',
'survey.q3.placeholder':'例如：希望增加更多遮阴休憩设施、改善步行可达性、增加夜间照明...',
'survey.quickTags':'快速标签：',
'survey.resultHeader':'📊 实时聚合统计','survey.totalSurvey':'总问卷数','survey.todayNew':'今日新增','survey.avgRating':'平均满意度','survey.activeZones':'活跃区域',
'survey.toast.selectZone':'请先选择一个区域','survey.toast.selectRating':'请先选择评分','survey.toast.success':'问卷提交成功！AI 已聚合您的意见',
'survey.fb.success':'✅ <strong>提交成功！</strong> 您对 <strong>{zone}</strong> 的意见（满意度 {rating}★）已通过 AI 聚合至意见热图。<br>🎯 AI 已识别关键词：{keywords}',
'survey.fb.general':'一般建议','survey.fb.unknownZone':'该区域',
'func.sports':'休闲运动场地','func.children':'儿童游乐设施','func.eco':'生态保育区','func.cycling':'绿道骑行','func.education':'自然教育','func.birdwatch':'观鸟/湿地体验',
'tag.shade':'遮阴设施','tag.walkable':'步行可达','tag.lighting':'夜间照明','tag.accessible':'无障碍',
'rating.1':'非常不满意','rating.2':'不太满意','rating.3':'一般','rating.4':'比较满意','rating.5':'非常满意',
'opinion.title':'AI 意见聚合热图','opinion.subtitle':'AI 自动分析问卷文本，将公众意见映射到地理空间，热力越强表示该区域关注度和意见密度越高',
'opinion.typeLabel':'意见类型：','opinion.all':'全部意见','opinion.positive':'👍 正面','opinion.improve':'🔧 改进建议','opinion.concern':'⚠️ 担忧','opinion.function':'🎯 功能需求',
'opinion.stat1':'已聚合意见','opinion.stat2':'正面评价','opinion.stat3':'改进建议','opinion.stat4':'担忧反馈',
'opinion.low':'低','opinion.high':'高',
'opinion.filterToast':'已筛选：{type} 意见 ({count} 条)',
'opinion.typeLabelAll':'全部','opinion.typeLabelPositive':'正面','opinion.typeLabelImprove':'改进建议','opinion.typeLabelConcern':'担忧','opinion.typeLabelFunction':'功能需求',
'dash.title':'政府决策看板','dash.subtitle':'规划官员可直观查看公众意见分布、满意度趋势和热门议题',
'dash.kpi1':'意见总数','dash.kpi2':'平均满意度','dash.kpi3':'覆盖区域','dash.kpi4':'热门议题',
'dash.trend1':'↑ 12% 本周','dash.trend2':'↑ 0.3 较上周','dash.trend3':'↑ 2 新增','dash.trend4':'↓ 需关注',
'dash.hotTopic':'遮阴设施',
'dash.chart1':'各区域满意度对比','dash.chart2':'意见类型分布','dash.tableTitle':'📋 区域意见汇总表',
'dash.col1':'区域名称','dash.col2':'类型','dash.col3':'意见数','dash.col4':'平均满意度','dash.col5':'热门议题','dash.col6':'优先级',
'dash.priority.high':'高优先','dash.priority.mid':'中优先','dash.priority.low':'低优先',
'roadmap.title':'项目路线图','roadmap.subtitle':'从规划到部署的完整里程碑',
'footer.brand':'北部都会区绿化空间互动平台','footer.info':'Hackathon Demo | 客户：香港政府城市规划及土地发展部门 | 2026',
'zone.z1.name':'米埔湿地','zone.z2.name':'新田公园','zone.z3.name':'生态走廊A','zone.z4.name':'湿地修复区','zone.z5.name':'古洞公园','zone.z6.name':'自然保护区','zone.z7.name':'生态走廊B','zone.z8.name':'粉岭公园',
'zone.z1.typeLabel':'湿地','zone.z2.typeLabel':'公园用地','zone.z3.typeLabel':'生态走廊','zone.z4.typeLabel':'湿地','zone.z5.typeLabel':'公园用地','zone.z6.typeLabel':'自然保护区','zone.z7.typeLabel':'生态走廊','zone.z8.typeLabel':'公园用地',
'zone.z1.area':'约 240 公顷','zone.z2.area':'约 85 公顷','zone.z3.area':'约 60 公顷','zone.z4.area':'约 120 公顷','zone.z5.area':'约 45 公顷','zone.z6.area':'约 180 公顷','zone.z7.area':'约 50 公顷','zone.z8.area':'约 70 公顷',
'zone.status.planned':'已规划','zone.status.planning':'规划中','zone.status.restoring':'修复中','zone.status.designated':'已划定',
'zone.z1.desc':'米埔湿地是国际重要湿地，规划保留其生态价值，同时增设公众观鸟步道和教育设施。',
'zone.z2.desc':'新田公园规划为综合性社区公园，包含运动场地、儿童游乐区和绿道系统。',
'zone.z3.desc':'生态走廊A连接米埔湿地与新田公园，规划为生态连接通道，保障野生动物迁徙。',
'zone.z4.desc':'湿地修复区正在进行生态修复工程，目标是恢复退化湿地，提升雨洪管理能力。',
'zone.z5.desc':'古洞公园服务于周边社区，规划运动场地、健身设施和社区活动空间。',
'zone.z6.desc':'自然保护区以生态保育为核心，限制公众进入，主要供科研监测和生态保护使用。',
'zone.z7.desc':'生态走廊B连接古洞公园与自然保护区，提供绿道骑行和生态连接功能。',
'zone.z8.desc':'粉岭公园规划融合自然教育与社区休闲，包含自然教育中心和户外活动区。',
'zone.z1.functions':['生态保育','观鸟','环境教育'],
'zone.z2.functions':['休闲运动','儿童游乐','绿道'],
'zone.z3.functions':['生态连接','步行绿道','生物栖息'],
'zone.z4.functions':['生态修复','雨洪管理','自然教育'],
'zone.z5.functions':['社区休闲','运动健身','社区活动'],
'zone.z6.functions':['生态保育','科研监测','限制进入'],
'zone.z7.functions':['生态连接','绿道骑行'],
'zone.z8.functions':['休闲运动','自然教育','社区活动'],
'zone.z1.statusKey':'planned','zone.z2.statusKey':'planning','zone.z3.statusKey':'planning','zone.z4.statusKey':'restoring','zone.z5.statusKey':'planning','zone.z6.statusKey':'designated','zone.z7.statusKey':'planning','zone.z8.statusKey':'planning',
'roadmap.items':[
{'phase':'Phase 1','title':'项目方向确认与团队组建','desc':'确认北部都会区绿化空间互动地图方向，完成团队角色分配，建立 GitHub 协作仓库。','status':'done','statusLabel':'✅ 已完成'},
{'phase':'Phase 2','title':'基础框架与初始页面','desc':'搭建项目整体框架，创建 Demo 网站页面，研究相关政策文件和学术资料。','status':'done','statusLabel':'✅ 已完成'},
{'phase':'Phase 3 · 进行中','title':'地理数据导入与地图可视化','desc':'搜索合适的地理空间数据源，导入绿化区域数据，生成可视化地图，优化地图展示样式。','status':'current','statusLabel':'🔄 进行中'},
{'phase':'Phase 4','title':'居民问卷设计与集成','desc':'设计问卷内容，将问卷模块集成到网站，编写代码收集和组织答案数据。','status':'pending','statusLabel':'⏳ 待开始'},
{'phase':'Phase 5','title':'AI 意见聚合与意见地图','desc':'开发 AI 模块分析问卷文本，基于收集的反馈构建意见地图，调整展示规则确保可读性。','status':'pending','statusLabel':'⏳ 待开始'},
{'phase':'Phase 6','title':'全功能测试与 Demo 部署','desc':'测试所有功能模块，验证数据流转、AI 聚合和地图生成，准备 Hackathon 最终演示。','status':'pending','statusLabel':'⏳ 待开始'},
],
'chart.funcDist':'功能需求分布','chart.satisfaction':'平均满意度',
'chart.labels.func':['休闲运动','生态保育','儿童游乐','绿道骑行','自然教育','湿地体验'],
'chart.labels.opinion':['正面评价','改进建议','担忧反馈','功能需求'],
'chart.labels.zones':['米埔湿地','新田公园','生态走廊A','湿地修复区','古洞公园','自然保护区','生态走廊B','粉岭公园'],
'heat.unknownZone':'未知区域','heat.generalOpinion':'综合意见',
},

'zh-TW':{
'nav.overview':'概覽','nav.problem':'問題','nav.map':'綠化地圖','nav.survey':'居民問卷','nav.opinion':'AI意見熱圖','nav.dashboard':'政府看板','nav.roadmap':'項目路線','nav.cta':'立即參與',
'hero.badge':'Hackathon Demo · 北部都會區綠化空間規劃',
'hero.title1':'讓綠化規劃','hero.title2':'看得見','hero.title3':'讓居民聲音','hero.title4':'落得上圖',
'hero.desc':'將官方文字版綠化空間規劃轉化為可視化互動地圖，居民可查看規劃資訊並提交意見，AI 自動聚合公眾反饋生成空間意見熱圖，幫助政府直觀理解居民訴求。',
'hero.btn1':'探索綠化地圖','hero.btn2':'查看政府看板',
'hero.stat1':'規劃綠化區域','hero.stat2':'居民意見提交','hero.stat3':'功能類型','hero.stat4':'示範區覆蓋',
'problem.title':'當前痛點','problem.subtitle':'居民與政府之間缺乏關於綠化空間規劃的直觀溝通渠道',
'problem.c1.title':'文字報告難理解','problem.c1.desc':'官方綠化規劃主要以文字報告形式發佈，公眾難以理解綠化區域在哪裡、用途是什麼，資訊獲取門檻高。',
'problem.c2.title':'意見無法空間化','problem.c2.desc':'現有公眾諮詢渠道以文字形式收集意見，居民建議無法在地圖上展示，政府也難以了解意見的空間分佈。',
'problem.c3.title':'資訊透明度不足','problem.c3.desc':'居民無法方便地查看規劃資訊，政府也看不到公眾建議的地理分佈，降低了公眾參與效率。',
'problem.c4.title':'反饋整理效率低','problem.c4.desc':'公眾反饋以純文字收集，需要人工整理分類，缺乏自動化的空間意見聚合和可視化工具。',
'problem.before.title':'❌ 現狀：文字驅動','problem.before.1':'規劃報告以 PDF 文字為主，缺乏地圖可視化','problem.before.2':'公眾意見以文字表格收集，無法定位到地理空間','problem.before.3':'政府需手動整理意見，效率低、覆蓋面窄','problem.before.4':'居民難以參與，溝通障礙大',
'problem.after.title':'✅ 方案：地圖驅動','problem.after.1':'官方規劃一鍵轉化為互動可視化地圖','problem.after.2':'居民在地圖上查看規劃並提交空間意見','problem.after.3':'AI 自動聚合反饋生成意見熱圖','problem.after.4':'政府直觀查看意見分佈，輔助決策',
'type.park':'公園','type.wetland':'濕地','type.corridor':'生態走廊','type.reserve':'自然保護區',
'map.title':'互動綠化空間地圖','map.subtitle':'點擊地圖上的綠化區域，查看規劃詳情、功能類型和面積資訊',
'map.filter.all':'全部','map.zoomIn':'放大','map.zoomOut':'縮小','map.reset':'重置','map.builtArea':'已建設區域','map.demoArea':'北部都會區 · 示範區域',
'map.panelTitle':'📋 區域詳情','map.emptyHint':'👆 點擊地圖上的綠化區域<br>查看詳細規劃資訊',
'map.planningArea':'規劃面積','map.opinionCount':'意見數','map.avgSatisfaction':'平均滿意度','map.attentionLevel':'關注度等級','map.planningData':'📊 規劃數據','map.planningFunctions':'🎯 規劃功能','map.submitOpinion':'💬 對此區域發表意見',
'map.level.high':'高','map.level.mid':'中','map.level.low':'低',
'survey.title':'居民意見問卷','survey.subtitle':'您的反饋將通過 AI 自動聚合，呈現在意見熱圖上',
'survey.step0':'區域','survey.step1':'評分','survey.step2':'功能','survey.step3':'建議',
'survey.prev':'上一步','survey.next':'下一步','survey.submit':'提交問卷','survey.selectRating':'請選擇評分',
'survey.q0.title':'您最關注的綠化區域是？','survey.q0.hint':'選擇一個您最關心的規劃區域',
'survey.q1.title':'您對該區域規劃方案的滿意度？','survey.q1.hint':'1 星 = 非常不滿意，5 星 = 非常滿意',
'survey.q2.title':'您希望該區域具備哪些功能？','survey.q2.hint':'可多選',
'survey.q3.title':'您對該區域還有哪些建議？','survey.q3.hint':'您的建議將通過 AI 分析並聚合到意見熱圖',
'survey.q3.placeholder':'例如：希望增加更多遮陰休憩設施、改善步行可達性、增加夜間照明...',
'survey.quickTags':'快速標籤：',
'survey.resultHeader':'📊 實時聚合統計','survey.totalSurvey':'總問卷數','survey.todayNew':'今日新增','survey.avgRating':'平均滿意度','survey.activeZones':'活躍區域',
'survey.toast.selectZone':'請先選擇一個區域','survey.toast.selectRating':'請先選擇評分','survey.toast.success':'問卷提交成功！AI 已聚合您的意見',
'survey.fb.success':'✅ <strong>提交成功！</strong> 您對 <strong>{zone}</strong> 的意見（滿意度 {rating}★）已通過 AI 聚合至意見熱圖。<br>🎯 AI 已識別關鍵詞：{keywords}',
'survey.fb.general':'一般建議','survey.fb.unknownZone':'該區域',
'func.sports':'休閒運動場地','func.children':'兒童遊樂設施','func.eco':'生態保育區','func.cycling':'綠道騎行','func.education':'自然教育','func.birdwatch':'觀鳥/濕地體驗',
'tag.shade':'遮陰設施','tag.walkable':'步行可達','tag.lighting':'夜間照明','tag.accessible':'無障礙',
'rating.1':'非常不滿意','rating.2':'不太滿意','rating.3':'一般','rating.4':'比較滿意','rating.5':'非常滿意',
'opinion.title':'AI 意見聚合熱圖','opinion.subtitle':'AI 自動分析問卷文字，將公眾意見映射到地理空間，熱力越強表示該區域關注度和意見密度越高',
'opinion.typeLabel':'意見類型：','opinion.all':'全部意見','opinion.positive':'👍 正面','opinion.improve':'🔧 改進建議','opinion.concern':'⚠️ 擔憂','opinion.function':'🎯 功能需求',
'opinion.stat1':'已聚合意見','opinion.stat2':'正面評價','opinion.stat3':'改進建議','opinion.stat4':'擔憂反饋',
'opinion.low':'低','opinion.high':'高',
'opinion.filterToast':'已篩選：{type} 意見 ({count} 條)',
'opinion.typeLabelAll':'全部','opinion.typeLabelPositive':'正面','opinion.typeLabelImprove':'改進建議','opinion.typeLabelConcern':'擔憂','opinion.typeLabelFunction':'功能需求',
'dash.title':'政府決策看板','dash.subtitle':'規劃官員可直觀查看公眾意見分佈、滿意度趨勢和熱門議題',
'dash.kpi1':'意見總數','dash.kpi2':'平均滿意度','dash.kpi3':'覆蓋區域','dash.kpi4':'熱門議題',
'dash.trend1':'↑ 12% 本週','dash.trend2':'↑ 0.3 較上週','dash.trend3':'↑ 2 新增','dash.trend4':'↓ 需關注',
'dash.hotTopic':'遮陰設施',
'dash.chart1':'各區域滿意度對比','dash.chart2':'意見類型分佈','dash.tableTitle':'📋 區域意見匯總表',
'dash.col1':'區域名稱','dash.col2':'類型','dash.col3':'意見數','dash.col4':'平均滿意度','dash.col5':'熱門議題','dash.col6':'優先級',
'dash.priority.high':'高優先','dash.priority.mid':'中優先','dash.priority.low':'低優先',
'roadmap.title':'項目路線圖','roadmap.subtitle':'從規劃到部署的完整里程碑',
'footer.brand':'北部都會區綠化空間互動平台','footer.info':'Hackathon Demo | 客戶：香港政府城市規劃及土地發展部門 | 2026',
'zone.z1.name':'米埔濕地','zone.z2.name':'新田公園','zone.z3.name':'生態走廊A','zone.z4.name':'濕地修復區','zone.z5.name':'古洞公園','zone.z6.name':'自然保護區','zone.z7.name':'生態走廊B','zone.z8.name':'粉嶺公園',
'zone.z1.typeLabel':'濕地','zone.z2.typeLabel':'公園用地','zone.z3.typeLabel':'生態走廊','zone.z4.typeLabel':'濕地','zone.z5.typeLabel':'公園用地','zone.z6.typeLabel':'自然保護區','zone.z7.typeLabel':'生態走廊','zone.z8.typeLabel':'公園用地',
'zone.z1.area':'約 240 公頃','zone.z2.area':'約 85 公頃','zone.z3.area':'約 60 公頃','zone.z4.area':'約 120 公頃','zone.z5.area':'約 45 公頃','zone.z6.area':'約 180 公頃','zone.z7.area':'約 50 公頃','zone.z8.area':'約 70 公頃',
'zone.status.planned':'已規劃','zone.status.planning':'規劃中','zone.status.restoring':'修復中','zone.status.designated':'已劃定',
'zone.z1.desc':'米埔濕地是國際重要濕地，規劃保留其生態價值，同時增設公眾觀鳥步道和教育設施。',
'zone.z2.desc':'新田公園規劃為綜合性社區公園，包含運動場地、兒童遊樂區和綠道系統。',
'zone.z3.desc':'生態走廊A連接米埔濕地與新田公園，規劃為生態連接通道，保障野生動物遷徙。',
'zone.z4.desc':'濕地修復區正在進行生態修復工程，目標是恢復退化濕地，提升雨洪管理能力。',
'zone.z5.desc':'古洞公園服務於周邊社區，規劃運動場地、健身設施和社區活動空間。',
'zone.z6.desc':'自然保護區以生態保育為核心，限制公眾進入，主要供科研監測和生態保護使用。',
'zone.z7.desc':'生態走廊B連接古洞公園與自然保護區，提供綠道騎行和生態連接功能。',
'zone.z8.desc':'粉嶺公園規劃融合自然教育與社區休閒，包含自然教育中心和戶外活動區。',
'zone.z1.functions':['生態保育','觀鳥','環境教育'],
'zone.z2.functions':['休閒運動','兒童遊樂','綠道'],
'zone.z3.functions':['生態連接','步行綠道','生物棲息'],
'zone.z4.functions':['生態修復','雨洪管理','自然教育'],
'zone.z5.functions':['社區休閒','運動健身','社區活動'],
'zone.z6.functions':['生態保育','科研監測','限制進入'],
'zone.z7.functions':['生態連接','綠道騎行'],
'zone.z8.functions':['休閒運動','自然教育','社區活動'],
'zone.z1.statusKey':'planned','zone.z2.statusKey':'planning','zone.z3.statusKey':'planning','zone.z4.statusKey':'restoring','zone.z5.statusKey':'planning','zone.z6.statusKey':'designated','zone.z7.statusKey':'planning','zone.z8.statusKey':'planning',
'roadmap.items':[
{'phase':'Phase 1','title':'項目方向確認與團隊組建','desc':'確認北部都會區綠化空間互動地圖方向，完成團隊角色分配，建立 GitHub 協作倉庫。','status':'done','statusLabel':'✅ 已完成'},
{'phase':'Phase 2','title':'基礎框架與初始頁面','desc':'搭建項目整體框架，創建 Demo 網站頁面，研究相關政策文件和學術資料。','status':'done','statusLabel':'✅ 已完成'},
{'phase':'Phase 3 · 進行中','title':'地理數據導入與地圖可視化','desc':'搜索合適的地理空間數據源，導入綠化區域數據，生成可視化地圖，優化地圖展示樣式。','status':'current','statusLabel':'🔄 進行中'},
{'phase':'Phase 4','title':'居民問卷設計與集成','desc':'設計問卷內容，將問卷模組集成到網站，編寫代碼收集和組織答案數據。','status':'pending','statusLabel':'⏳ 待開始'},
{'phase':'Phase 5','title':'AI 意見聚合與意見地圖','desc':'開發 AI 模組分析問卷文字，基於收集的反饋構建意見地圖，調整展示規則確保可讀性。','status':'pending','statusLabel':'⏳ 待開始'},
{'phase':'Phase 6','title':'全功能測試與 Demo 部署','desc':'測試所有功能模組，驗證數據流轉、AI 聚合和地圖生成，準備 Hackathon 最終演示。','status':'pending','statusLabel':'⏳ 待開始'},
],
'chart.funcDist':'功能需求分佈','chart.satisfaction':'平均滿意度',
'chart.labels.func':['休閒運動','生態保育','兒童遊樂','綠道騎行','自然教育','濕地體驗'],
'chart.labels.opinion':['正面評價','改進建議','擔憂反饋','功能需求'],
'chart.labels.zones':['米埔濕地','新田公園','生態走廊A','濕地修復區','古洞公園','自然保護區','生態走廊B','粉嶺公園'],
'heat.unknownZone':'未知區域','heat.generalOpinion':'綜合意見',
}
};

/* Helper: get translated string */
function t(key){
  const lang = window.currentLang || 'zh-CN';
  const dict = I18N[lang] || I18N['zh-CN'];
  return dict[key] !== undefined ? dict[key] : (I18N['zh-CN'][key] !== undefined ? I18N['zh-CN'][key] : key);
}

/* Switch language: update all static elements + re-render dynamic content */
function switchLang(lang){
  window.currentLang = lang;
  document.documentElement.lang = lang;
  try{ localStorage.setItem('gs-lang', lang); }catch(e){}
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  // Update all [data-i18n] text elements
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if(el.tagName === 'text' || el.tagName === 'TEXT'){
      el.textContent = val;
    } else {
      el.innerHTML = val;
    }
  });
  // Update [data-i18n-title]
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{
    el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
  });
  // Update [data-i18n-ph]
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
  // Re-render dynamic content
  renderSurveyOptions();
  renderRoadmap();
  renderDashTable();
  updateCharts();
  // If a zone is selected, re-render its detail
  if(window.selectedZoneId){
    selectZone(window.selectedZoneId);
  }
  // Re-render heatmap
  renderHeatPoints(window.currentHeatFilter || 'all');
}

/* Init language on load */
function initLang(){
  let saved = 'zh-CN';
  try{ saved = localStorage.getItem('gs-lang') || 'zh-CN'; }catch(e){}
  window.currentLang = saved;
  window.currentHeatFilter = 'all';
  switchLang(saved);
}
