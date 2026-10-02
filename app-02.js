// ===== PORTAL PREMIUM DO CLIENTE V4.28 =====
const clientPortalPremiumV428Style=document.createElement('style');clientPortalPremiumV428Style.textContent=`
.portal-v428{display:grid;gap:16px}.portal-tabs-v428{display:flex;gap:8px;overflow-x:auto;padding:2px 1px 7px;scrollbar-width:none}.portal-tabs-v428::-webkit-scrollbar{display:none}.portal-tabs-v428 button{flex:0 0 auto;min-height:42px;padding:0 16px;border:1px solid #303030;border-radius:999px;background:#111;color:#8f8f8f;font:800 11px/1 inherit;letter-spacing:.02em;white-space:nowrap}.portal-tabs-v428 button.on{border-color:#ff6a00;background:#ff6a00;color:#fff;box-shadow:0 8px 24px rgba(255,106,0,.18)}
.portal-welcome-v428{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:end;padding:30px;border:1px solid #3a261a;border-radius:28px;background:radial-gradient(circle at 92% 0,rgba(255,106,0,.24),transparent 38%),linear-gradient(145deg,#17100c,#0d0d0d 64%)}.portal-welcome-v428:after{content:'✦';position:absolute;right:28px;top:20px;color:#ff6a00;font-size:18px}.portal-welcome-v428 h2{max-width:720px;margin:8px 0 10px;font-size:clamp(31px,5vw,54px);line-height:.98;letter-spacing:-.045em}.portal-welcome-v428 p{max-width:670px;margin:0;color:#b3b3b3;font-size:15px;line-height:1.55}.portal-welcome-v428 .portal-welcome-tag{align-self:end;padding:11px 14px;border:1px solid rgba(255,106,0,.45);border-radius:999px;background:rgba(255,106,0,.1);color:#ff7b1f;font-size:10px;font-weight:900;letter-spacing:.12em;white-space:nowrap}
.portal-stats-v428{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.portal-stat-v428{min-height:112px;padding:18px;border:1px solid #2d2d2d;border-radius:20px;background:#141414}.portal-stat-v428 span{display:block;color:#858585;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.portal-stat-v428 b{display:block;margin-top:12px;color:#fff;font-size:29px;line-height:1}.portal-stat-v428 small{display:block;margin-top:8px;color:#707070;font-size:10px}
.portal-section-head-v428{display:flex;align-items:end;justify-content:space-between;gap:12px;margin:4px 0 0}.portal-section-head-v428 h3{margin:4px 0 0;font-size:24px}.portal-section-head-v428 p{max-width:560px;margin:0;color:#797979;font-size:12px;line-height:1.5}.portal-map-v428{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.portal-map-card-v428{position:relative;display:flex;min-height:150px;padding:20px;border:1px solid #2d2d2d;border-radius:22px;background:#141414;color:#fff;text-align:left;cursor:pointer}.portal-map-card-v428:hover{border-color:#ff6a00;transform:translateY(-1px)}.portal-map-card-v428 .portal-map-icon{display:grid;place-items:center;width:38px;height:38px;margin-right:13px;border-radius:12px;background:#20150f;color:#ff6a00;font-size:17px}.portal-map-card-v428 div{min-width:0}.portal-map-card-v428 b{display:block;font-size:16px}.portal-map-card-v428 p{margin:7px 0 0;color:#7f7f7f;font-size:11px;line-height:1.5}.portal-map-card-v428 em{position:absolute;right:17px;bottom:15px;color:#ff6a00;font-style:normal;font-size:17px;font-weight:900}.portal-map-card-v428 .portal-card-count{display:inline-flex;margin-top:12px;padding:5px 8px;border-radius:999px;background:#242424;color:#b8b8b8;font-size:9px;font-weight:900}.portal-map-card-v428 .portal-card-count.hot{background:#ff6a00;color:#fff}
.portal-split-v428{display:grid;grid-template-columns:1.2fr .8fr;gap:12px}.portal-panel-v428{padding:22px;border:1px solid #2d2d2d;border-radius:22px;background:#141414}.portal-panel-v428 h3{margin:5px 0 12px}.portal-next-v428{display:flex;align-items:center;gap:12px;padding:13px 0;border-top:1px solid #262626}.portal-next-v428:first-of-type{border-top:0}.portal-next-v428 .portal-next-date{display:grid;place-items:center;flex:0 0 48px;height:48px;border-radius:14px;background:#21150f;color:#ff6a00;font-size:10px;font-weight:950;text-align:center}.portal-next-v428 .grow small{display:block;margin-top:4px;color:#777}.portal-empty-v428{padding:23px;border:1px dashed #353535;border-radius:17px;color:#737373;font-size:12px;line-height:1.55;text-align:center}
.portal-page-hero-v428{padding:24px 4px 5px}.portal-page-hero-v428 h2{margin:6px 0 8px;font-size:clamp(29px,4vw,44px);letter-spacing:-.035em}.portal-page-hero-v428 p{max-width:700px;margin:0;color:#868686;line-height:1.55}.portal-strategy-v428{display:grid;grid-template-columns:1.05fr .95fr;gap:12px}.portal-direction-v428{padding:25px;border:1px solid #593018;border-radius:24px;background:linear-gradient(145deg,#21140d,#121212)}.portal-direction-v428 h3{margin:8px 0 12px;font-size:24px}.portal-direction-v428 p{margin:0;color:#b8b8b8;line-height:1.6}.portal-month-v428{padding:25px;border:1px solid #2d2d2d;border-radius:24px;background:#141414}.portal-month-v428 h3{margin:8px 0 10px;font-size:24px}.portal-month-v428 p{margin:0;color:#858585;line-height:1.55}.portal-pillar-grid-v428{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.portal-pillar-v428{padding:17px;border:1px solid #2c2c2c;border-radius:18px;background:#111}.portal-pillar-v428 b{display:block;margin:5px 0 8px}.portal-pillar-v428 p{min-height:34px;margin:0;color:#777;font-size:10px;line-height:1.5}.portal-pillar-v428 .progress{margin-top:13px}.portal-pillar-v428 small{display:flex;justify-content:space-between;color:#767676;font-size:9px;font-weight:900}
.portal-content-list-v428{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.portal-content-v428{display:grid;grid-template-columns:88px minmax(0,1fr);gap:14px;min-height:110px;padding:12px;border:1px solid #2d2d2d;border-radius:20px;background:#141414;text-align:left;color:#fff}.portal-content-v428.clickable{cursor:pointer}.portal-content-v428.clickable:hover{border-color:#ff6a00}.portal-content-thumb-v428{display:grid;place-items:center;overflow:hidden;min-height:84px;border-radius:14px;background:#0a0a0a;color:#555;font-weight:900}.portal-content-v428 h4{margin:5px 0 8px;font-size:15px}.portal-content-v428 p{margin:0;color:#777;font-size:10px;line-height:1.45}.portal-approval-v428{display:grid;grid-template-columns:118px minmax(0,1fr) auto;gap:18px;align-items:center;padding:15px;border:1px solid #313131;border-radius:22px;background:#141414}.portal-approval-v428+.portal-approval-v428{margin-top:10px}.portal-approval-v428 .portal-content-thumb-v428{height:104px}.portal-approval-v428 h3{margin:5px 0 8px}.portal-approval-v428 p{max-width:660px;margin:0;color:#7c7c7c;font-size:11px;line-height:1.5}.portal-history-v428{margin-top:14px}
.portal-feed-head-v428{display:flex;align-items:end;justify-content:space-between;gap:12px}.portal-feed-frame-v428{max-width:760px;margin:0 auto;padding:14px;border:1px solid #2e2e2e;border-radius:26px;background:#101010}.portal-feed-frame-v428 .feed-grid{border-radius:15px;overflow:hidden}.portal-feed-note-v428{padding:13px 15px;color:#777;font-size:10px;line-height:1.5;text-align:center}
.portal-idea-tools-v428{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.portal-idea-tool-v428{padding:14px 10px;border:1px solid #2d2d2d;border-radius:16px;background:#141414;text-align:center}.portal-idea-tool-v428 b{display:block;color:#ff6a00;font-size:20px}.portal-idea-tool-v428 span{display:block;margin-top:6px;color:#8b8b8b;font-size:9px;font-weight:900;text-transform:uppercase}.portal-ideas-layout-v428{display:grid;grid-template-columns:.9fr 1.1fr;gap:12px}.portal-ideas-v428{display:grid;gap:9px}.portal-idea-card-v428{padding:17px;border:1px solid #2d2d2d;border-radius:18px;background:#111}.portal-idea-card-v428 h4{margin:6px 0 8px}.portal-idea-card-v428 p{margin:0;color:#828282;font-size:11px;line-height:1.5}.portal-idea-card-v428 .chips{margin-top:11px}
.portal-event-grid-v428{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.portal-event-v428{padding:20px;border:1px solid #2d2d2d;border-radius:21px;background:#141414}.portal-event-v428 .head{align-items:flex-start}.portal-event-v428 h3{margin:6px 0 8px}.portal-event-v428 p{margin:0;color:#7c7c7c;font-size:11px;line-height:1.55}.portal-event-v428 .chips{margin-top:14px}
.portal-drive-v428{position:relative;overflow:hidden;display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:16px;align-items:center;padding:24px;border:1px solid #5a3017;border-radius:24px;background:radial-gradient(circle at 90% 0,rgba(255,106,0,.2),transparent 38%),#15100d}.portal-drive-icon-v428{display:grid;place-items:center;width:52px;height:52px;border-radius:17px;background:#ff6a00;color:#fff;font-size:23px}.portal-drive-v428 h3{margin:4px 0 7px}.portal-drive-v428 p{max-width:630px;margin:0;color:#898989;font-size:11px;line-height:1.5}.portal-upload-v428{margin-top:12px}.portal-upload-v428 .toolbar{margin-bottom:8px}.client-portal-config-v428{border-color:#573019!important;background:linear-gradient(145deg,#1a120e,#131313)!important}.client-portal-config-v428 .portal-config-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
@media(max-width:900px){.portal-map-v428{grid-template-columns:repeat(2,minmax(0,1fr))}.portal-stats-v428{grid-template-columns:repeat(2,minmax(0,1fr))}.portal-strategy-v428,.portal-split-v428,.portal-ideas-layout-v428{grid-template-columns:1fr}.portal-pillar-grid-v428{grid-template-columns:repeat(2,minmax(0,1fr))}.portal-idea-tools-v428{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:620px){.portal-v428{gap:13px}.portal-tabs-v428{margin:0 -2px}.portal-tabs-v428 button{min-height:44px;padding:0 14px}.portal-welcome-v428{display:block;padding:24px 21px;border-radius:23px}.portal-welcome-v428:after{right:20px;top:17px}.portal-welcome-v428 h2{padding-right:20px;font-size:34px}.portal-welcome-v428 p{font-size:13px}.portal-welcome-v428 .portal-welcome-tag{display:inline-flex;margin-top:18px}.portal-stat-v428{min-height:96px;padding:15px}.portal-stat-v428 b{font-size:25px}.portal-map-v428,.portal-content-list-v428,.portal-event-grid-v428,.portal-pillar-grid-v428{grid-template-columns:1fr}.portal-map-card-v428{min-height:126px}.portal-section-head-v428{display:block}.portal-section-head-v428 p{margin-top:8px}.portal-approval-v428{grid-template-columns:82px minmax(0,1fr);gap:12px}.portal-approval-v428 .portal-content-thumb-v428{height:82px}.portal-approval-v428>.btn{grid-column:1/-1;width:100%}.portal-idea-tools-v428{grid-template-columns:repeat(2,minmax(0,1fr))}.portal-drive-v428{grid-template-columns:44px minmax(0,1fr);padding:19px}.portal-drive-icon-v428{width:44px;height:44px}.portal-drive-v428>.btn{grid-column:1/-1;width:100%}.client-portal-config-v428 .portal-config-actions>*{width:100%}}
`;document.head.appendChild(clientPortalPremiumV428Style);

function portalClientV428(cid){return M?.role==='team'?cl(cid):D.client}
function portalContentsV428(cid){return(D.contents||[]).filter(x=>!cid||x.client_id===cid)}
function portalEventsV428Rows(cid){return(D.events||[]).filter(x=>!cid||x.client_id===cid)}
function portalApprovalsV428Rows(cid){return(D.approvals||[]).filter(x=>(!cid||x.client_id===cid||x.contents?.client_id===cid))}
function portalInsightsV428Rows(cid){return(D.insights||[]).filter(x=>!cid||x.client_id===cid)}
function portalPlanV428(cid,month){return(D.plans||[]).find(x=>(!cid||x.client_id===cid)&&dateMonth(x.month)===month)}
function portalMonthItemsV428(cid,month){let plan=portalPlanV428(cid,month);return portalContentsV428(cid).filter(x=>dateMonth(x.publication_date)===month||(plan&&x.monthly_plan_id===plan.id)).sort((a,b)=>String(a.publication_date||'9999').localeCompare(String(b.publication_date||'9999')))}
function portalMonthNameV428(value){let parts=String(value||'').split('-'),months=['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO'],index=Math.max(0,Math.min(11,Number(parts[1]||1)-1));return`${months[index]} ${parts[0]||''}`}
function portalSafeUrlV428(value){let raw=String(value||'').trim();if(!raw)return'';try{let u=new URL(raw,location.origin);return u.protocol==='https:'||u.protocol==='http:'?u.href:''}catch{return''}}
function portalTabAttrsV428(route,preview){return preview?`data-previewtab="${route}"`:`data-v="${route}"`}
function portalTabsV428(active,preview){let tabs=[['home','Visão geral'],['calendar','Estratégia'],['approvals','Aprovações'],['feed','Feed'],['briefing','Ideias'],['events','Eventos'],['files','Materiais']];return`<nav class="portal-tabs-v428" aria-label="Áreas do portal">${tabs.map(([route,label])=>`<button type="button" ${portalTabAttrsV428(route,preview)} class="${active===route?'on':''}">${label}</button>`).join('')}</nav>`}
function portalAssetV428(content){let asset=currentAsset(content);return`<div class="portal-content-thumb-v428" ${asset?`data-asset-path="${E(asset.storage_path)}" data-mime="${E(asset.mime_type||'')}" data-filename="${E(asset.file_name||'Arquivo')}" data-thumb="1"`:''}>${asset?(asset.mime_type||'').startsWith('video/')?'▶':'▧':'Sem arte'}</div>`}
function portalStatusV428(content){let st=approvalInfo(content);return`<span class="tag ${st.cls}">${E(st.label)}</span>`}
function portalMapCardV428(route,preview,icon,title,copy,count,hot=false){return`<button type="button" class="portal-map-card-v428" ${portalTabAttrsV428(route,preview)}><span class="portal-map-icon">${icon}</span><div><b>${title}</b><p>${copy}</p>${count!==null&&count!==undefined?`<span class="portal-card-count ${hot?'hot':''}">${E(String(count))}</span>`:''}</div><em>→</em></button>`}
function portalEmptyV428(text){return`<div class="portal-empty-v428">${E(text)}</div>`}

function portalOverviewV428(cid,preview=false){let c=portalClientV428(cid)||{},items=portalMonthItemsV428(cid,clientMonth),pending=portalApprovalsV428Rows(cid).filter(x=>x.status==='pending'),insights=portalInsightsV428Rows(cid),events=portalEventsV428Rows(cid).slice().sort((a,b)=>String(a.starts_at||'9999').localeCompare(String(b.starts_at||'9999'))),next=events.filter(x=>x.starts_at&&String(x.starts_at).slice(0,10)>=today()).slice(0,3),drive=portalSafeUrlV428(c.materials_drive_url),first=String(c.name||'').trim().split(' ')[0]||'você',objective=String(c.objective||'').trim();return`<div class="portal-v428">${portalTabsV428('home',preview)}<section class="portal-welcome-v428"><div><small class="ey">SEU ESPAÇO NA COLAB</small><h2>Oi, ${E(first)}. Tudo da sua marca vive aqui.</h2><p>Estratégia, conteúdos, aprovações, referências, eventos e materiais organizados para você acompanhar cada etapa com clareza.</p></div><span class="portal-welcome-tag">CONSTRUÍDO COM VOCÊ</span></section><div class="portal-stats-v428"><article class="portal-stat-v428"><span>Conteúdos do mês</span><b>${items.length}</b><small>${portalMonthNameV428(clientMonth)}</small></article><article class="portal-stat-v428"><span>Para aprovar</span><b>${pending.length}</b><small>${pending.length?'Esperando sua revisão':'Tudo em dia'}</small></article><article class="portal-stat-v428"><span>Ideias compartilhadas</span><b>${insights.length}</b><small>Referências e acontecimentos</small></article><article class="portal-stat-v428"><span>Próximos eventos</span><b>${next.length}</b><small>Captações e compromissos</small></article></div>${objective?`<section class="portal-direction-v428"><small class="ey">DIREÇÃO DA SUA MARCA</small><h3>O que estamos construindo</h3><p>${E(objective)}</p></section>`:''}<div class="portal-section-head-v428"><div><small class="ey">SEU PORTAL</small><h3>Cada coisa no lugar certo</h3></div><p>Entre direto na etapa que você quer acompanhar ou complementar.</p></div><div class="portal-map-v428">${portalMapCardV428('calendar',preview,'◎','Estratégia','Veja o direcionamento da marca, o foco do mês e o planejamento editorial.',items.length?`${items.length} conteúdos no mês`:'Planejamento em construção')}${portalMapCardV428('approvals',preview,'✓','Aprovações','Revise peças, legendas e vídeos antes da publicação.',pending.length?`${pending.length} aguardando você`:'Tudo aprovado',pending.length>0)}${portalMapCardV428('feed',preview,'▦','Simulação do feed','Visualize como os conteúdos aprovados vão conviver no perfil.',null)}${portalMapCardV428('briefing',preview,'✦','Ideias e referências','Envie inspirações, links, insights, novidades e acontecimentos.',insights.length?`${insights.length} compartilhadas`:'Espaço aberto')}${portalMapCardV428('events',preview,'◉','Seus eventos','Acompanhe captações, reuniões, lançamentos e datas combinadas.',next.length?`${next.length} próximos`:'Agenda livre')}${portalMapCardV428('files',preview,'▧','Materiais','Acesse a pasta do Drive e envie arquivos para a equipe.',drive?'Drive conectado':'Aguardando link')}</div><div class="portal-split-v428"><section class="portal-panel-v428"><small class="ey">AGUARDANDO VOCÊ</small><h3>Conteúdos para revisar</h3>${pending.slice(0,3).map(a=>`<div class="portal-next-v428"><span class="portal-next-date">✓</span><div class="grow"><b>${E(a.contents?.title||'Conteúdo')}</b><small>${E(fmt(a.contents?.format))} · pronto para revisar</small></div><button class="btn pri small" ${preview?'disabled':`data-ap="${a.id}"`}>Revisar</button></div>`).join('')||portalEmptyV428('Nenhum conteúdo esperando aprovação. Quando uma peça estiver pronta, ela aparece aqui.')}</section><section class="portal-panel-v428"><small class="ey">PRÓXIMOS PASSOS</small><h3>Sua agenda</h3>${next.map(ev=>`<div class="portal-next-v428"><span class="portal-next-date">${E(String(ev.starts_at||'').slice(8,10)||'—')}<br>${E(String(ev.starts_at||'').slice(5,7)||'')}</span><div class="grow"><b>${E(ev.title||'Evento')}</b><small>${ev.starts_at?fmtDate(String(ev.starts_at).slice(0,10))+' · '+fmtTime(ev.starts_at):'Data a definir'}</small></div></div>`).join('')||portalEmptyV428('Os próximos eventos e captações aparecem aqui assim que forem combinados.')}</section></div></div>`}

function portalStrategyPageV428(cid,preview=false){let c=portalClientV428(cid)||{},plan=portalPlanV428(cid,clientMonth),items=portalMonthItemsV428(cid,clientMonth),pillars=(D.pillars||[]).filter(x=>(!cid||x.client_id===cid)&&x.active),targets=(D.targets||[]).filter(x=>plan&&x.plan_id===plan.id),objective=String(c.objective||'').trim(),cal=items.filter(x=>x.publication_date).map(x=>({date:x.publication_date,type:'content',client:cid,title:x.title,meta:`${fmt(x.format)} · ${(pillars.find(p=>p.id===x.editorial_pillar_id)||{}).name||cs(x.status)}`,id:x.id})),contentCards=items.map(content=>{let info=approvalInfo(content),attrs=!preview&&info.approvalId?`data-ap="${info.approvalId}"`:'';return`<article class="portal-content-v428 ${attrs?'clickable':''}" ${attrs}>${portalAssetV428(content)}<div><small class="ey">${content.publication_date?fmtDate(content.publication_date):'DATA A DEFINIR'} · ${E(fmt(content.format))}</small><h4>${E(content.title||'Conteúdo')}</h4><div class="chips">${content.editorial_pillar_id?`<span class="tag">${E((pillars.find(p=>p.id===content.editorial_pillar_id)||{}).name||'Linha editorial')}</span>`:''}${portalStatusV428(content)}</div></div></article>`}).join('');return`<div class="portal-v428">${portalTabsV428('calendar',preview)}<div class="portal-page-hero-v428"><small class="ey">ESTRATÉGIA</small><h2>A direção por trás do conteúdo</h2><p>Aqui você acompanha o que estamos construindo para a sua marca e como cada conteúdo participa desse movimento.</p></div><div class="filters"><input id="clientMonth" type="month" value="${E(clientMonth)}" ${preview?'disabled':''}></div><div class="portal-strategy-v428"><section class="portal-direction-v428"><small class="ey">POSICIONAMENTO</small><h3>O que queremos construir</h3><p>${objective?E(objective):'A direção estratégica da sua marca aparecerá aqui assim que for definida pela equipe.'}</p></section><section class="portal-month-v428"><small class="ey">FOCO DE ${portalMonthNameV428(clientMonth)}</small><h3>${E(plan?.theme||'Planejamento do mês')}</h3><p>${E(plan?.main_goal||'O foco e o objetivo principal deste mês estão sendo organizados.')}</p></section></div><section class="portal-panel-v428"><div class="portal-section-head-v428"><div><small class="ey">DISTRIBUIÇÃO ESTRATÉGICA</small><h3>Linhas que sustentam o mês</h3></div><p>Não é apenas sobre publicar. É sobre construir os conteúdos certos para cada objetivo.</p></div>${pillars.length?`<div class="portal-pillar-grid-v428">${pillars.map(p=>{let target=Number((targets.find(t=>t.pillar_id===p.id)||{}).target_count||0),done=items.filter(x=>x.editorial_pillar_id===p.id).length,pct=target?Math.min(100,done/target*100):0;return`<article class="portal-pillar-v428"><small><span>LINHA EDITORIAL</span><span>${done}/${target||'—'}</span></small><b>${E(p.name)}</b><p>${E(p.objective||'Direção editorial da marca.')}</p><div class="progress"><i style="width:${pct}%"></i></div></article>`}).join('')}</div>`:portalEmptyV428('As linhas editoriais aparecerão aqui quando a estratégia for cadastrada.')}</section><section class="portal-panel-v428"><div class="portal-section-head-v428"><div><small class="ey">CONTEÚDOS DO MÊS</small><h3>O plano tomando forma</h3></div><p>${items.length} conteúdo${items.length===1?'':'s'} neste planejamento.</p></div><div class="portal-content-list-v428" style="margin-top:14px">${contentCards||portalEmptyV428('O planejamento deste mês ainda está sendo construído.')}</div></section>${cal.length?`<section class="portal-panel-v428"><small class="ey">CALENDÁRIO EDITORIAL</small><h3>Datas de publicação</h3>${calendarGrid(clientMonth,cal)}</section>`:''}</div>`}

function portalApprovalsPageV428(cid,preview=false){let rows=portalApprovalsV428Rows(cid),pending=rows.filter(x=>x.status==='pending'),history=rows.filter(x=>x.status!=='pending').slice(0,6);return`<div class="portal-v428">${portalTabsV428('approvals',preview)}<div class="portal-page-hero-v428"><small class="ey">APROVAÇÕES</small><h2>Você vê antes de ir ao ar</h2><p>Revise a peça, o vídeo e o texto. Quando você aprovar, a equipe segue para a programação.</p></div><section><div class="portal-section-head-v428"><div><small class="ey">PARA SUA REVISÃO</small><h3>${pending.length?`${pending.length} conteúdo${pending.length===1?'':'s'} aguardando você`:'Tudo aprovado por aqui ✨'}</h3></div></div><div style="margin-top:13px">${pending.map(a=>{let content=a.contents||portalContentsV428(cid).find(x=>x.id===a.content_id)||{};return`<article class="portal-approval-v428">${portalAssetV428(content)}<div><small class="ey">${E(fmt(content.format))}</small><h3>${E(content.title||'Conteúdo')}</h3><p>${E(String(content.caption||content.notes||'Abra para revisar todos os detalhes desta entrega.').slice(0,180))}</p></div><button class="btn pri" ${preview?'disabled':`data-ap="${a.id}"`}>Revisar conteúdo</button></article>`}).join('')||portalEmptyV428('Quando um conteúdo estiver pronto para você revisar, ele vai aparecer nesta área.')}</div></section>${history.length?`<section class="portal-panel-v428 portal-history-v428"><small class="ey">HISTÓRICO RECENTE</small><h3>Decisões anteriores</h3>${history.map(a=>`<div class="row"><span class="dot ${a.status==='approved'?'g':'r'}"></span><div class="grow"><b>${E(a.contents?.title||'Conteúdo')}</b><small>${a.status==='approved'?'Aprovado':'Alteração solicitada'}</small></div><span class="tag ${a.status==='approved'?'g':'r'}">${a.status==='approved'?'Aprovado':'Ajustes'}</span></div>`).join('')}</section>`:''}</div>`}

function portalFeedPageV428(cid,preview=false){let items=portalMonthItemsV428(cid,clientMonth),pendingIds=new Set(portalApprovalsV428Rows(cid).filter(x=>x.status==='pending').map(x=>x.content_id)),visible=items.filter(x=>['scheduled','published'].includes(x.status)||pendingIds.has(x.id)).sort((a,b)=>String(b.publication_date||'0000').localeCompare(String(a.publication_date||'0000')));return`<div class="portal-v428">${portalTabsV428('feed',preview)}<div class="portal-page-hero-v428"><small class="ey">SIMULAÇÃO DO FEED</small><h2>O conjunto antes da publicação</h2><p>Veja como as peças aprovadas e os conteúdos enviados para sua revisão conversam visualmente no perfil.</p></div><div class="filters"><input id="clientMonth" type="month" value="${E(clientMonth)}" ${preview?'disabled':''}></div><section class="portal-feed-frame-v428"><div class="portal-feed-head-v428"><div><small class="ey">INSTAGRAM · ${portalMonthNameV428(clientMonth)}</small><h3>Prévia visual</h3></div><span class="tag">${visible.length} peças</span></div><div class="feed-grid">${visible.map(content=>{let asset=currentAsset(content);return`<article class="feed-cell" ${!preview?`data-contentopen="${content.id}"`:''}><div class="feed-media" ${asset?`data-asset-path="${E(asset.storage_path)}" data-mime="${E(asset.mime_type||'')}" data-filename="${E(asset.file_name||'Arquivo')}" data-thumb="1"`:''}>${asset?(asset.mime_type||'').startsWith('video/')?'▶':'▧':'Sem arte'}<span>${E(fmt(content.format))}</span></div></article>`}).join('')||'<div class="empty feed-empty">A simulação aparece assim que as primeiras peças forem aprovadas ou enviadas para sua revisão.</div>'}</div><div class="portal-feed-note-v428">A ordem pode mudar durante o planejamento. Esta visualização acompanha as peças disponíveis no mês selecionado.</div></section></div>`}

function portalIdeaTypeLabelV428(type){return({idea:'Ideia',reference:'Referência',reel_reference:'Vídeo de referência',insight:'Insight',trend:'Trend'})[type]||'Inspiração'}
function portalIdeasPageV428(cid,preview=false){let b=(D.briefings||[]).find(x=>(!cid||x.client_id===cid)&&dateMonth(x.month)===briefMonth),insights=portalInsightsV428Rows(cid),types=['idea','reference','reel_reference','insight','trend'];return`<div class="portal-v428">${portalTabsV428('briefing',preview)}<div class="portal-page-hero-v428"><small class="ey">IDEIAS, REFERÊNCIAS & ACONTECIMENTOS</small><h2>O que você vive também pode virar conteúdo</h2><p>Compartilhe uma ideia, uma referência, algo que aconteceu ou qualquer informação que ajude a equipe a criar com mais contexto.</p></div><div class="portal-idea-tools-v428">${types.map(type=>`<div class="portal-idea-tool-v428"><b>${insights.filter(x=>x.insight_type===type).length}</b><span>${portalIdeaTypeLabelV428(type)}</span></div>`).join('')}</div><div class="portal-ideas-layout-v428"><section class="portal-panel-v428"><div class="head"><div><small class="ey">CONTEXTO DO MÊS</small><h3>O que está acontecendo?</h3></div><input id="briefMonth" type="month" value="${E(briefMonth)}" ${preview?'disabled':''}></div><form ${preview?'':'id="briefForm"'}><div class="field"><label>Datas importantes</label><textarea name="important_dates" rows="3" placeholder="Eventos, lançamentos, viagens, datas especiais..." ${preview?'disabled':''}>${E(b?.important_dates||'')}</textarea></div><div class="field"><label>Novidades e acontecimentos</label><textarea name="events_and_news" rows="3" placeholder="O que mudou, aconteceu ou merece virar conteúdo?" ${preview?'disabled':''}>${E(b?.events_and_news||'')}</textarea></div><div class="field"><label>Prioridades do mês</label><textarea name="priorities" rows="3" placeholder="O que você quer destacar agora?" ${preview?'disabled':''}>${E(b?.priorities||'')}</textarea></div><div class="field"><label>Ideias de conteúdo</label><textarea name="content_wishes" rows="3" placeholder="Assuntos, vídeos, dúvidas do público, bastidores..." ${preview?'disabled':''}>${E(b?.content_wishes||'')}</textarea></div><div class="field"><label>Algo mais que a equipe precisa saber</label><textarea name="notes" rows="2" ${preview?'disabled':''}>${E(b?.notes||'')}</textarea></div><button class="btn pri full" ${preview?'type="button" disabled':''}>Salvar contexto do mês</button></form></section><section class="portal-panel-v428"><div class="head"><div><small class="ey">SUA CAIXA DE IDEIAS</small><h3>Inspirações compartilhadas</h3></div><button class="btn pri small" ${preview?'disabled':'data-m="insightNewClient"'}>＋ Enviar</button></div><div class="portal-ideas-v428">${insights.map(i=>{let assets=(D.insightAssets||[]).filter(x=>x.insight_id===i.id);return`<article class="portal-idea-card-v428"><small class="ey">${E(portalIdeaTypeLabelV428(i.insight_type))}</small><h4>${E(i.title||'Ideia')}</h4><p>${E(i.notes||'')}</p><div class="chips">${i.source_url?`<a class="btn ghost small" href="${E(i.source_url)}" target="_blank" rel="noopener">Abrir link ↗</a>`:''}${assets.map(x=>`<button class="btn ghost small" ${preview?'disabled':`data-file="${E(x.storage_path)}"`}>${E(x.file_name||'Arquivo')}</button>`).join('')}</div></article>`}).join('')||portalEmptyV428('Envie referências, links, inspirações, insights e acontecimentos sempre que quiser.')}</div></section></div></div>`}

function portalEventsPageV428(cid,preview=false){let rows=portalEventsV428Rows(cid).slice().sort((a,b)=>String(a.starts_at||'9999').localeCompare(String(b.starts_at||'9999'))),upcoming=rows.filter(x=>!x.starts_at||String(x.starts_at).slice(0,10)>=today()),past=rows.filter(x=>x.starts_at&&String(x.starts_at).slice(0,10)<today());let cards=list=>list.map(ev=>`<article class="portal-event-v428"><div class="head"><div><small class="ey">${E(lab(ev.event_type||'event'))}</small><h3>${E(ev.title||'Evento')}</h3></div><span class="tag ${ev.status==='completed'?'g':ev.status==='confirmed'?'o':ev.status==='cancelled'?'r':''}">${E(eventStatus(ev.status))}</span></div><p>${ev.starts_at?fmtDate(String(ev.starts_at).slice(0,10))+' · '+fmtTime(ev.starts_at):'Data e horário a definir'}${ev.location?' · '+E(ev.location):''}</p>${ev.notes?`<p style="margin-top:9px">${E(ev.notes)}</p>`:''}<div class="chips">${ev.contracted_hours?`<span class="tag">${E(String(ev.contracted_hours))}h</span>`:''}${ev.delivery_status==='delivered'?'<span class="tag g">Materiais entregues</span>':''}</div></article>`).join('');return`<div class="portal-v428">${portalTabsV428('events',preview)}<div class="portal-page-hero-v428"><small class="ey">EVENTOS</small><h2>Sua agenda com a equipe</h2><p>Captações, reuniões, lançamentos e outros acontecimentos combinados ficam reunidos aqui.</p></div><section><div class="portal-section-head-v428"><div><small class="ey">PRÓXIMOS</small><h3>O que vem pela frente</h3></div></div><div class="portal-event-grid-v428" style="margin-top:13px">${cards(upcoming)||portalEmptyV428('Nenhum próximo evento cadastrado.')}</div></section>${past.length?`<section class="portal-panel-v428"><small class="ey">HISTÓRICO</small><h3>Eventos anteriores</h3><div class="portal-event-grid-v428">${cards(past)}</div></section>`:''}</div>`}

const _filesPageV428Base=filesPage;
function portalMaterialsPageV428(cid,preview=false){let c=portalClientV428(cid)||{},drive=portalSafeUrlV428(c.materials_drive_url),upload=preview?`<section class="portal-panel-v428 portal-upload-v428"><small class="ey">ENVIO RÁPIDO</small><h3>Arquivos pelo portal</h3><p class="muted">Na conta da cliente, ela também pode selecionar imagens, vídeos e documentos diretamente por aqui.</p><button class="btn ghost" disabled>＋ Enviar arquivo</button></section>`:`<div class="portal-upload-v428">${_filesPageV428Base(true)}</div>`;return`<div class="portal-v428">${portalTabsV428('files',preview)}<div class="portal-page-hero-v428"><small class="ey">MATERIAIS</small><h2>Arquivos sem se perder na conversa</h2><p>Use a pasta compartilhada para subir fotos, vídeos, referências e tudo que a equipe precisa receber.</p></div><section class="portal-drive-v428"><span class="portal-drive-icon-v428">▧</span><div><small class="ey">PASTA COMPARTILHADA</small><h3>Google Drive</h3><p>${drive?'Seu link está conectado. Abra a pasta para enviar ou consultar os materiais compartilhados.':'Assim que a equipe conectar sua pasta, o botão de acesso aparece aqui.'}</p></div>${drive?`<a class="btn pri" href="${E(drive)}" target="_blank" rel="noopener">Abrir pasta ↗</a>`:'<button class="btn ghost" disabled>Link em preparação</button>'}</section>${upload}</div>`}

function portalCentralPageV428(cid,preview=false){let c=portalClientV428(cid)||{},drive=portalSafeUrlV428(c.materials_drive_url),insights=portalInsightsV428Rows(cid).length,events=portalEventsV428Rows(cid).length;return`<div class="portal-v428">${portalTabsV428('more',preview)}<div class="portal-page-hero-v428"><small class="ey">CENTRAL</small><h2>Atalhos do seu espaço</h2><p>Acesse ideias, eventos, materiais e os outros módulos ativos da sua conta.</p></div><div class="portal-map-v428">${portalMapCardV428('briefing',preview,'✦','Ideias e referências','Insights, inspirações, links e acontecimentos.',insights?`${insights} compartilhadas`:'Espaço aberto')}${portalMapCardV428('events',preview,'◉','Eventos','Captações, reuniões e datas combinadas.',events?`${events} cadastrados`:'Sem eventos')}${portalMapCardV428('files',preview,'▧','Materiais','Pasta compartilhada e envio de arquivos.',drive?'Drive conectado':'Aguardando link')}${hasService('storymaker')||M?.role==='team'&&hasClientService(cid,'storymaker')?portalMapCardV428('storymaker',preview,'◉','StoryMaker','Coberturas e entregas de eventos.',null):''}${hasService('trafego')||M?.role==='team'&&hasClientService(cid,'trafego')?portalMapCardV428('clientTraffic',preview,'↗','Tráfego pago','Campanhas, investimento e resultados.',null):''}${hasService('identidade_visual')||M?.role==='team'&&hasClientService(cid,'identidade_visual')?portalMapCardV428('identity',preview,'✦','Identidade visual','Brand Book, logos e materiais finais.',null):''}</div></div>`}

function portalPageV428(route,cid,preview=false){if(route==='calendar')return portalStrategyPageV428(cid,preview);if(route==='approvals')return portalApprovalsPageV428(cid,preview);if(route==='feed')return portalFeedPageV428(cid,preview);if(route==='briefing')return portalIdeasPageV428(cid,preview);if(route==='events')return portalEventsPageV428(cid,preview);if(route==='files')return portalMaterialsPageV428(cid,preview);if(route==='more')return portalCentralPageV428(cid,preview);if(route==='storymaker')return`${portalTabsV428('',preview)}${clientStorymakerPage()}`;if(route==='clientTraffic')return`${portalTabsV428('',preview)}${clientTrafficPage()}`;if(route==='identity')return`${portalTabsV428('',preview)}${clientIdentityPage()}`;return portalOverviewV428(cid,preview)}

const _clientNavV428Base=clientNav;
clientNav=function(){if(hasService('social_media'))return[['home','⌂','Início'],['calendar','◎','Estratégia'],['approvals','✓','Aprovações'],['events','◉','Eventos'],['more','•••','CENTRAL']];return _clientNavV428Base()};

const _clientPortalV428Base=clientPortal;
clientPortal=function(){if(!hasService('social_media'))return _clientPortalV428Base();let allowed=['home','social','calendar','approvals','feed','briefing','events','files','more'];if(hasService('storymaker'))allowed.push('storymaker');if(hasService('trafego'))allowed.push('clientTraffic');if(hasService('identidade_visual'))allowed.push('identity');if(!allowed.includes(V))V='home';if(V==='social')V='home';shell(portalPageV428(V,M.client_id,false),true)};

const _clientPreviewModalV428Base=clientPreviewModal;
clientPreviewModal=function(){let cid=MD.clientId;if(!hasClientService(cid,'social_media'))return _clientPreviewModalV428Base();let c=cl(cid),tab=MD.previewTab||'home',allowed=['home','calendar','approvals','feed','briefing','events','files','more','storymaker','clientTraffic','identity'];if(!allowed.includes(tab))tab='home';return`<div class="modalbg"><div class="modal wide portalpreview clientmode"><div class="head"><div><small class="ey">MODO CLIENTE · ${E(c?.name||'Cliente')}</small><h2>Portal completo da cliente</h2></div><button class="btn ghost small" data-close>Sair do Modo Cliente</button></div><div class="note">Prévia segura: envios e aprovações ficam desativados. A navegação abaixo mostra a experiência real da cliente.</div>${portalPageV428(tab,cid,true)}</div></div>`};

const _clientDetailModalV428Base=clientDetailModal;
clientDetailModal=function(){let c=cl(MD.id),html=_clientDetailModalV428Base(),anchor='<section class="panel" style="margin-top:10px"><h3>Próximos compromissos</h3>';if(!c||!html.includes(anchor))return html;let drive=portalSafeUrlV428(c.materials_drive_url),panel=`<section class="panel client-portal-config-v428" style="margin-top:10px"><div class="head"><div><small class="ey">PORTAL DA CLIENTE</small><h3>Acesso, experiência e materiais</h3><p class="muted">Configure a pasta compartilhada e veja exatamente o que ${E(c.name)} acessa.</p></div><button class="btn pri small" data-clientpreview="${c.id}">Ver como a cliente vê</button></div><form id="clientPortalDriveForm" data-client="${c.id}"><div class="field"><label>Link da pasta de materiais no Google Drive</label><input name="materials_drive_url" type="url" value="${E(c.materials_drive_url||'')}" placeholder="https://drive.google.com/..."></div><div class="portal-config-actions">${drive?`<a class="btn ghost small" href="${E(drive)}" target="_blank" rel="noopener">Abrir Drive ↗</a>`:''}<button class="btn ghost small">Salvar link do Drive</button></div></form></section>`;return html.replace(anchor,panel+anchor)};

async function saveClientPortalDriveV428(ev){ev.preventDefault();let form=ev.currentTarget,id=form.dataset.client,raw=String(new FormData(form).get('materials_drive_url')||'').trim();try{if(raw&&!portalSafeUrlV428(raw))throw Error('Cole um link válido do Google Drive');await patch('clients',id,{materials_drive_url:raw||null,updated_at:new Date().toISOString()});await load();render();toast('Link do portal salvo')}catch(err){toast(err.message)}}

const _bindClientPortalV428Base=bind;
bind=function(){_bindClientPortalV428Base();document.getElementById('clientPortalDriveForm')?.addEventListener('submit',saveClientPortalDriveV428)};



// ===== LINK COMPARTILHAVEL DO MODO CLIENTE V4.29 =====
const clientPortalShareV429Style=document.createElement('style');clientPortalShareV429Style.textContent=`
.client-share-v429{min-height:100vh;background:#090909;color:#fff}.client-share-top-v429{display:flex;align-items:center;justify-content:space-between;gap:16px;width:min(1180px,calc(100% - 34px));margin:0 auto;padding:24px 0 18px;border-bottom:1px solid #242424}.client-share-brand-v429{display:flex;align-items:center;gap:12px}.client-share-symbol-v429{display:grid;place-items:center;width:42px;height:42px;border:1px solid #4a2b18;border-radius:14px;background:#17100c;color:#ff6a00;font-size:18px;font-weight:950}.client-share-brand-v429 b{display:block;font-size:15px;letter-spacing:.03em}.client-share-brand-v429 small{display:block;margin-top:3px;color:#777;font-size:9px;font-weight:900;letter-spacing:.13em}.client-share-badge-v429{padding:8px 11px;border:1px solid #3d2a1d;border-radius:999px;background:#17110d;color:#ff7b1f;font-size:9px;font-weight:950;letter-spacing:.12em}.client-share-main-v429{width:min(1180px,calc(100% - 34px));margin:0 auto;padding:22px 0 48px}.client-share-note-v429{display:flex;align-items:center;gap:12px;margin-bottom:15px;padding:13px 15px;border:1px solid #2d2d2d;border-radius:16px;background:#121212;color:#858585;font-size:10px;line-height:1.5}.client-share-note-v429 b{color:#fff}.client-share-note-v429 span:first-child{display:grid;place-items:center;flex:0 0 30px;height:30px;border-radius:10px;background:#21150f;color:#ff6a00}.client-share-foot-v429{width:min(1180px,calc(100% - 34px));margin:0 auto;padding:20px 0 34px;border-top:1px solid #242424;color:#656565;font-size:10px;text-align:center}.client-share-error-v429{display:grid;place-items:center;min-height:100vh;padding:24px;background:radial-gradient(circle at 50% 20%,rgba(255,106,0,.16),transparent 36%),#090909}.client-share-error-v429 section{width:min(470px,100%);padding:30px;border:1px solid #3c281b;border-radius:25px;background:#12100f;text-align:center}.client-share-error-v429 h1{margin:8px 0 10px}.client-share-error-v429 p{color:#858585;line-height:1.55}
.client-share-v429 .portal-content-thumb-v428:not([data-asset-path]),.client-share-v429 .feed-media:not([data-asset-path]){position:relative;overflow:hidden;background:linear-gradient(145deg,#21140d,#0b0b0b)!important;color:transparent!important}.client-share-v429 .portal-content-thumb-v428:not([data-asset-path]):before,.client-share-v429 .feed-media:not([data-asset-path]):before{content:'✦';position:absolute;inset:0;display:grid;place-items:center;color:#ff6a00;font-size:24px;font-weight:950;background:radial-gradient(circle at 70% 20%,rgba(255,106,0,.28),transparent 38%)}.client-share-v429 .feed-cell:nth-child(3n+2) .feed-media:not([data-asset-path]){background:linear-gradient(145deg,#f1ece5,#bfb2a5)!important}.client-share-v429 .feed-cell:nth-child(3n+2) .feed-media:not([data-asset-path]):before{content:'CONTEÚDO';color:#151515;font-size:11px;letter-spacing:.12em;background:none}.client-share-v429 .feed-cell:nth-child(3n) .feed-media:not([data-asset-path]){background:linear-gradient(145deg,#ff6a00,#8e3600)!important}.client-share-v429 .feed-cell:nth-child(3n) .feed-media:not([data-asset-path]):before{content:'IDEIA EM MOVIMENTO';padding:16px;color:#fff;font-size:10px;line-height:1.35;letter-spacing:.08em;text-align:center;background:none}.client-share-v429 .feed-media span{z-index:2;font-size:9px!important;color:#fff!important}.client-share-v429 .portal-drive-v428 a{cursor:default}
.portal-share-control-v429{margin:14px 0;padding:15px;border:1px solid #3a2a20;border-radius:17px;background:#100d0b}.portal-share-control-v429 .portal-share-label-v429{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.portal-share-control-v429 .portal-share-label-v429 b{font-size:12px}.portal-share-control-v429 .portal-share-label-v429 span{color:#ff6a00;font-size:9px;font-weight:900;letter-spacing:.08em}.portal-share-row-v429{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px}.portal-share-row-v429 input{min-width:0;background:#0b0b0b!important;color:#878787!important;font-size:10px!important}.portal-share-row-v429 .btn{white-space:nowrap}.portal-preview-actions-v429{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
@media(max-width:620px){.client-share-top-v429,.client-share-main-v429,.client-share-foot-v429{width:min(100% - 24px,1180px)}.client-share-top-v429{padding-top:17px}.client-share-brand-v429 small{font-size:8px}.client-share-badge-v429{max-width:122px;text-align:center;line-height:1.35}.client-share-main-v429{padding-top:14px}.client-share-note-v429{align-items:flex-start}.portal-share-row-v429{grid-template-columns:1fr}.portal-share-row-v429 .btn{width:100%}.portal-preview-actions-v429{justify-content:flex-end}.portal-preview-actions-v429 .btn{font-size:9px;padding:8px 10px}}
`;document.head.appendChild(clientPortalShareV429Style);

function clientShareUuidV429(){if(globalThis.crypto?.randomUUID)return crypto.randomUUID();return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,ch=>{let n=Math.random()*16|0,v=ch==='x'?n:n&3|8;return v.toString(16)})}
function clientShareLinkV429(client){let token=String(client?.portal_preview_token||'').trim();if(!token)return'';let url=new URL(location.origin+location.pathname);url.searchParams.set('portal',token);url.searchParams.set('v','4.29');return url.href}
async function clientShareCopyTextV429(value){try{await navigator.clipboard.writeText(value)}catch{let area=document.createElement('textarea');area.value=value;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove()}}
async function copyClientShareLinkV429(cid){let client=cl(cid),link=clientShareLinkV429(client);try{if(!link)throw Error('Gere o link de apresentação primeiro');await clientShareCopyTextV429(link);toast('Link de apresentação copiado')}catch(error){toast(error.message)}}
async function renewClientShareLinkV429(cid){let client=cl(cid);if(client?.portal_preview_token&&!confirm('Gerar um novo link? O link anterior deixará de funcionar.'))return;try{await patch('clients',cid,{portal_preview_token:clientShareUuidV429(),portal_preview_enabled:true,updated_at:new Date().toISOString()});await load();render();toast('Novo link de apresentação gerado')}catch(error){toast(error.message)}}

function clientShareControlsV429(client){let link=clientShareLinkV429(client);return`<div class="portal-share-control-v429"><div class="portal-share-label-v429"><b>Link de apresentação do Modo Cliente</b><span>SEM LOGIN · SOMENTE VISUALIZAÇÃO</span></div><div class="portal-share-row-v429"><input value="${E(link||'Gere um link para apresentar o portal')}" readonly aria-label="Link de apresentação">${link?`<button type="button" class="btn pri small" data-copyportal="${client.id}">Copiar link</button>`:`<button type="button" class="btn pri small" data-renewportal="${client.id}">Gerar link</button>`}${link?`<button type="button" class="btn ghost small" data-renewportal="${client.id}">Gerar novo</button>`:''}</div></div>`}

const _clientDetailModalShareV429Base=clientDetailModal;
clientDetailModal=function(){let html=_clientDetailModalShareV429Base(),client=cl(MD.id),anchor='<form id="clientPortalDriveForm"';if(!client||!html.includes(anchor))return html;return html.replace(anchor,clientShareControlsV429(client)+anchor)};

const _clientPreviewModalShareV429Base=clientPreviewModal;
clientPreviewModal=function(){let html=_clientPreviewModalShareV429Base(),client=cl(MD.clientId),close='<button class="btn ghost small" data-close>Sair do Modo Cliente</button>';if(!client||!html.includes(close))return html;let actions=`<div class="portal-preview-actions-v429"><button type="button" class="btn pri small" data-copyportal="${client.id}">Copiar link de apresentação</button>${close}</div>`;return html.replace(close,actions)};

const _bindClientShareV429Base=bind;
bind=function(){_bindClientShareV429Base();document.querySelectorAll('[data-copyportal]').forEach(button=>button.onclick=event=>{event.stopPropagation();copyClientShareLinkV429(button.dataset.copyportal)});document.querySelectorAll('[data-renewportal]').forEach(button=>button.onclick=event=>{event.stopPropagation();renewClientShareLinkV429(button.dataset.renewportal)})};

let clientShareTabV429='home';
function clientShareDateV429(offset=0){let date=new Date();date.setHours(12,0,0,0);date.setDate(date.getDate()+offset);let pad=value=>String(value).padStart(2,'0');return`${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`}
function clientShareDemoDataV429(payload){let cid='preview-client-v429',month=monthNow(),planId='preview-plan-v429',pillars=[
  {id:'preview-pillar-connection',client_id:cid,name:'Conexão e identificação',objective:'Conteúdos que aproximam e fazem o público se reconhecer.',active:true,sort_order:1},
  {id:'preview-pillar-authority',client_id:cid,name:'Autoridade e percepção de valor',objective:'Conteúdos que mostram método, experiência e domínio.',active:true,sort_order:2},
  {id:'preview-pillar-decision',client_id:cid,name:'Desejo e decisão',objective:'Conteúdos que ajudam o público a avançar e contratar.',active:true,sort_order:3}
],titles=[
  ['Bastidores que mostram o valor do seu trabalho','reel','preview-pillar-connection','scheduled','04'],
  ['O que o cliente precisa saber antes de contratar','carousel','preview-pillar-authority','approval','08'],
  ['Uma história que aproxima','reel','preview-pillar-connection','scheduled','12'],
  ['Detalhes que transformam a experiência','static_post','preview-pillar-authority','published','16'],
  ['A pergunta que o público sempre faz','carousel','preview-pillar-authority','scheduled','21'],
  ['Um acontecimento que merece virar conteúdo','reel','preview-pillar-decision','scheduled','26']
],contents=titles.map((row,index)=>({id:`preview-content-${index+1}`,client_id:cid,title:row[0],format:row[1],editorial_pillar_id:row[2],status:row[3],publication_date:`${month}-${row[4]}`,monthly_plan_id:planId,current_version:1,caption:'Exemplo de conteúdo organizado dentro do fluxo de planejamento e aprovação.'})),approval={id:'preview-approval-1',client_id:cid,content_id:contents[1].id,status:'pending',contents:contents[1],created_at:new Date().toISOString()},services=Array.isArray(payload.services)?payload.services:[];if(!services.includes('social_media'))services=['social_media',...services];let client={id:cid,name:payload.client?.name||'Sua marca',segment:payload.client?.segment||'Cliente Colab',initials:payload.client?.initials||'',objective:'Construir uma presença digital com mais clareza, conexão e percepção de valor.',materials_drive_url:'https://drive.google.com/'};return{client,clients:[client],services:services.map((service,index)=>({id:`preview-service-${index}`,client_id:cid,service,active:true})),contents,approvals:[approval],events:[{id:'preview-event-1',client_id:cid,title:'Reunião de planejamento',event_type:'meeting',status:'confirmed',starts_at:`${clientShareDateV429(5)}T10:00:00-03:00`,location:'Online'},{id:'preview-event-2',client_id:cid,title:'Captação de conteúdo',event_type:'recording',status:'planned',starts_at:`${clientShareDateV429(12)}T14:00:00-03:00`,location:'Local a definir',contracted_hours:3}],pillars,plans:[{id:planId,client_id:cid,month:`${month}-01`,theme:'Presença que gera reconhecimento',main_goal:'Transformar conteúdo em percepção de valor e novas oportunidades.',status:'active',feed_target_count:8}],targets:[{plan_id:planId,pillar_id:pillars[0].id,target_count:3},{plan_id:planId,pillar_id:pillars[1].id,target_count:3},{plan_id:planId,pillar_id:pillars[2].id,target_count:2}],assets:[],briefings:[{id:'preview-brief-1',client_id:cid,month:`${month}-01`,important_dates:'Lançamento, evento ou data importante do mês',events_and_news:'Novidade que pode virar conteúdo',priorities:'Tema ou serviço que merece mais destaque',content_wishes:'Ideias que você gostaria de desenvolver',notes:''}],insights:[{id:'preview-insight-1',client_id:cid,title:'Referência de Reels',insight_type:'reference',source_url:'https://www.instagram.com/',notes:'O ritmo e a narrativa deste vídeo chamaram atenção.',status:'new'},{id:'preview-insight-2',client_id:cid,title:'Ideia para bastidores',insight_type:'idea',notes:'Mostrar uma etapa do trabalho que o público normalmente não vê.',status:'new'},{id:'preview-insight-3',client_id:cid,title:'Acontecimento do mês',insight_type:'insight',notes:'Uma novidade que pode render pauta e aproximação.',status:'new'}],insightAssets:[],identityResources:[],trafficReports:[]}}

function clientShareRenderV429(){let client=D.client||{},body=portalPageV428(clientShareTabV429,client.id,true);document.title=`Portal de ${client.name} · COLAB`;R.innerHTML=`<div class="client-share-v429"><header class="client-share-top-v429"><div class="client-share-brand-v429"><span class="client-share-symbol-v429">✦</span><div><b>COLAB</b><small>PORTAL DO CLIENTE</small></div></div><span class="client-share-badge-v429">MODO APRESENTAÇÃO</span></header><main class="client-share-main-v429"><div class="client-share-note-v429"><span>◎</span><div><b>Explore o portal.</b> Esta é uma demonstração segura para apresentar as funções. Nenhuma ação altera informações reais.</div></div>${body}</main><footer class="client-share-foot-v429">Uma experiência organizada para acompanhar estratégia, criação, aprovações e materiais em um só lugar. 🧡</footer></div>`;document.querySelectorAll('[data-previewtab]').forEach(button=>button.onclick=()=>{clientShareTabV429=button.dataset.previewtab;clientShareRenderV429();scrollTo({top:0,behavior:'smooth'})});document.querySelectorAll('.client-share-v429 .portal-drive-v428 a').forEach(link=>link.onclick=event=>{event.preventDefault();toast('Na conta da cliente, este botão abre a pasta compartilhada do Drive')});setTimeout(hydratePreviews,30)}
function clientShareErrorV429(message){R.innerHTML=`<div class="client-share-error-v429"><section><small class="ey">MODO CLIENTE</small><h1>Este link não está disponível.</h1><p>${E(message||'Peça um novo link de apresentação para a equipe Colab.')}</p><a class="btn pri" href="${E(location.origin+location.pathname)}">Ir para a Central</a></section></div>`}
async function clientPortalShareBootV429(token){let meta=document.createElement('meta');meta.name='robots';meta.content='noindex,nofollow,noarchive';document.head.appendChild(meta);R.innerHTML='<div class="load"><div><div class="logo">C<span>O</span>LAB</div><p>Preparando a apresentação do portal...</p></div></div>';try{if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token))throw Error('O endereço recebido não é válido.');let response=await tf(B+'/rest/v1/rpc/client_portal_preview_get',{method:'POST',headers:{apikey:K,'Content-Type':'application/json'},body:JSON.stringify({p_token:token})},12000);if(!response.ok)throw Error('Não foi possível abrir esta apresentação agora.');let payload=await response.json();if(Array.isArray(payload))payload=payload[0];if(!payload?.client)throw Error('Este link expirou ou foi substituído.');D=clientShareDemoDataV429(payload);M={role:'client',client_id:D.client.id,organization_id:'preview'};S={user:{email:''}};clientMonth=monthNow();briefMonth=monthNow();clientShareTabV429='home';clientShareRenderV429()}catch(error){clientShareErrorV429(error.message)}}

const _clientShareBootV429Base=boot;
boot=async function(){let token=new URLSearchParams(location.search).get('portal');if(token)return clientPortalShareBootV429(token);return _clientShareBootV429Base()};


// ===== ONBOARDING ESTRATEGICO NO CADASTRO V4.30 =====
let onboardingViewV430=null;
const onboardingLabelsV430={percepcao:'Percepção desejada',nao_parecer:'O que não quer transmitir',lembranca:'O que deve ficar na memória',historia_invisivel:'História do trabalho invisível',transformacao:'Transformação para os noivos',gosta_mostrar:'O que gosta de mostrar',nao_mostrar:'O que prefere não mostrar',desconforto:'Conteúdos que geram desconforto',agenda:'Próximos momentos importantes',prioridade_90:'Prioridade dos próximos 90 dias'};
function onboardingPanelV430(client){return `<section class="panel onboarding-panel-v430" style="margin-top:10px"><div class="head"><div><small class="ey">ONBOARDING ESTRATÉGICO</small><h3>Leitura, respostas e direcionamento</h3><p class="muted">As respostas preenchidas no onboarding ficam salvas aqui no cadastro da cliente.</p></div><button type="button" class="btn pri small" data-onboardingopen="${client.id}">Ver onboarding</button></div></section>`}
const _clientDetailModalOnboardingV430Base=clientDetailModal;
clientDetailModal=function(){let html=_clientDetailModalOnboardingV430Base(),client=cl(MD.id),anchor='<section class="panel" style="margin-top:10px"><h3>Próximos compromissos</h3>';if(!client||!html.includes(anchor))return html;return html.replace(anchor,onboardingPanelV430(client)+anchor)};
async function openClientOnboardingV430(cid){let client=cl(cid);try{if(!client?.portal_preview_token)throw Error('Gere o link de apresentação primeiro');let url=`https://pskerhmvejorsdvinind.supabase.co/functions/v1/client-onboarding?token=${encodeURIComponent(client.portal_preview_token)}`;let response=await fetch(url,{cache:'no-store'});let payload=await response.json();if(!response.ok)throw Error(payload?.error||'Não foi possível abrir o onboarding');onboardingViewV430=payload.onboarding||{answers:{},status:'draft'};MD={type:'onboardingViewV430',id:cid};render()}catch(error){toast(error.message)}}
function onboardingModalV430(){let client=cl(MD.id),data=onboardingViewV430||{},answers=data.answers||{},rows=Object.entries(onboardingLabelsV430).map(([key,label])=>`<div class="onboarding-answer-v430"><small>${E(label)}</small><p>${E(answers[key]||'Ainda não respondido')}</p></div>`).join('');return `<div class="modalbg"><div class="modal wide"><div class="head"><div><small class="ey">ONBOARDING ESTRATÉGICO · ${E(client?.name||'Cliente')}</small><h2>O que ouvimos no onboarding</h2><p class="muted">${data.status==='completed'?'Finalizado e salvo na Colab':'Em preenchimento'}${data.updated_at?` · atualizado em ${fmtDate(String(data.updated_at).slice(0,10))}`:''}</p></div><button class="btn ghost small" data-close>Fechar</button></div><div class="onboarding-grid-v430">${rows}</div></div></div>`}
const _modalOnboardingV430Base=modal;
modal=function(){if(MD?.type==='onboardingViewV430')return onboardingModalV430();return _modalOnboardingV430Base()};
const onboardingStyleV430=document.createElement('style');onboardingStyleV430.textContent=`.onboarding-panel-v430{border-color:#5a3320!important;background:linear-gradient(145deg,#19120e,#131313)!important}.onboarding-grid-v430{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:15px}.onboarding-answer-v430{padding:15px;border:1px solid #2f2f2f;border-radius:15px;background:#111}.onboarding-answer-v430 small{display:block;color:#ff6a00;font-size:9px;font-weight:900;letter-spacing:.09em;text-transform:uppercase;margin-bottom:7px}.onboarding-answer-v430 p{margin:0;color:#ddd;font-size:12px;line-height:1.5;white-space:pre-wrap}@media(max-width:620px){.onboarding-grid-v430{grid-template-columns:1fr}.onboarding-panel-v430 .head{display:block}.onboarding-panel-v430 .btn{width:100%;margin-top:10px}}`;document.head.appendChild(onboardingStyleV430);
const _bindOnboardingV430Base=bind;
bind=function(){_bindOnboardingV430Base();document.querySelectorAll('[data-onboardingopen]').forEach(button=>button.onclick=()=>openClientOnboardingV430(button.dataset.onboardingopen))};

// ===== ACESSO REAL DA CLIENTE V4.31 =====
let clientAccessMetaV431=null,clientAccessModeV431='signup';

function clientAccessLinkV431(client){
  let token=String(client?.portal_access_token||'').trim();
  if(!token)return'';
  let url=new URL(location.origin+location.pathname);
  url.searchParams.set('acesso',token);
  url.searchParams.set('v','4.31');
  return url.href
}
function clientAccessInviteV431(cid){
  return (D.invites||[]).filter(invite=>invite.client_id===cid).sort((a,b)=>String(b.created_at||'').localeCompare(String(a.created_at||'')))[0]||null
}
function clientAccessPanelV431(client){
  let invite=clientAccessInviteV431(client.id),link=clientAccessLinkV431(client),active=invite?.status==='accepted';
  return `<div class="portal-access-control-v431"><div class="portal-access-label-v431"><div><b>Acesso da cliente</b><span>CADASTRO E LOGIN · DADOS REAIS</span></div><span class="portal-access-status-v431 ${active?'active':''}">${active?'ACESSO ATIVO':invite?'CONVITE PRONTO':'CONFIGURAR'}</span></div><p>A cliente cria o próprio acesso com o e-mail autorizado e depois entra sempre por este mesmo link.</p><label>E-mail autorizado</label><input id="clientAccessEmailV431" type="email" value="${E(invite?.email||'')}" placeholder="E-mail que a cliente vai usar"><div class="portal-access-row-v431"><input value="${E(link||'Link indisponível')}" readonly aria-label="Link de cadastro e acesso da cliente"><button type="button" class="btn pri small" data-prepareclientaccess="${client.id}">${invite?'Salvar e copiar link':'Preparar e copiar link'}</button></div>${invite?`<small>${active?'A cliente já criou o acesso. Este link abre a tela de login.':'Convite vinculado a '+E(invite.email)+'. No primeiro acesso, ela cria a senha.'}</small>`:''}</div>`
}
async function copyTextV431(value){
  if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(value);return}catch(error){}
  let area=document.createElement('textarea');area.value=value;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove()
}
async function prepareClientAccessV431(cid){
  let client=cl(cid),input=document.getElementById('clientAccessEmailV431'),email=String(input?.value||'').trim().toLowerCase();
  if(!client)return;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return toast('Informe o e-mail que a cliente vai usar');
  try{
    let same=(D.invites||[]).find(invite=>invite.client_id===cid&&String(invite.email||'').toLowerCase()===email&&['pending','accepted'].includes(invite.status));
    if(!same)await api('/rest/v1/user_invites',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,email,role:'client',client_id:cid,invited_by:S.user?.id})});
    await load();
    let link=clientAccessLinkV431(cl(cid));
    if(!link)throw Error('Não foi possível gerar o link de acesso');
    await copyTextV431(link);render();toast('Link de cadastro e acesso copiado')
  }catch(error){toast(error.message)}
}

const _clientDetailModalAccessV431Base=clientDetailModal;
clientDetailModal=function(){
  let html=_clientDetailModalAccessV431Base(),client=cl(MD.id),anchor='<form id="clientPortalDriveForm"';
  if(!client||!html.includes(anchor))return html;
  return html.replace(anchor,clientAccessPanelV431(client)+anchor)
};

const clientAccessStyleV431=document.createElement('style');
clientAccessStyleV431.textContent=`.portal-access-control-v431{margin:12px 0;padding:16px;border:1px solid #ff6a0066;border-radius:16px;background:linear-gradient(145deg,#21130d,#111)}.portal-access-label-v431{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px}.portal-access-label-v431 b{display:block;font-size:14px}.portal-access-label-v431>div span{display:block;color:#ff6a00;font-size:8px;font-weight:900;letter-spacing:.14em;margin-top:4px}.portal-access-status-v431{border:1px solid #663319;border-radius:99px;color:#ff9b63;padding:5px 8px;font-size:8px;font-weight:900;white-space:nowrap}.portal-access-status-v431.active{border-color:#285c36;color:#76d38d;background:#102217}.portal-access-control-v431 p{margin:0 0 12px;color:#929292;font-size:11px;line-height:1.45}.portal-access-control-v431 label{display:block;margin-bottom:6px;font-size:10px;font-weight:850}.portal-access-control-v431>input,.portal-access-row-v431 input{width:100%;min-width:0;border:1px solid #3a3a3a;border-radius:10px;background:#0d0d0d;color:#eee;padding:11px}.portal-access-row-v431{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;margin-top:9px}.portal-access-control-v431>small{display:block;color:#777;margin-top:9px;line-height:1.4}.client-access-v431{min-height:100vh;background:radial-gradient(circle at 12% 8%,#35170a 0,transparent 30%),#090909;color:#fff;padding:24px;display:grid;place-items:center}.client-access-card-v431{width:min(470px,100%);border:1px solid #2e2e2e;border-radius:24px;background:#141414;padding:28px;box-shadow:0 30px 80px #0009}.client-access-brand-v431{display:flex;align-items:center;gap:11px;margin-bottom:28px}.client-access-brand-v431 i{width:42px;height:42px;border-radius:14px;background:#ff6a00;display:grid;place-items:center;font-style:normal;font-size:20px}.client-access-brand-v431 b{display:block;font-size:18px;letter-spacing:.05em}.client-access-brand-v431 small{color:#858585;font-size:9px;font-weight:850;letter-spacing:.13em}.client-access-card-v431 h1{font-size:34px;line-height:1.05;margin:8px 0}.client-access-card-v431 .client-access-intro-v431{color:#999;line-height:1.5;margin:0 0 22px}.client-access-switch-v431{display:grid;grid-template-columns:1fr 1fr;gap:5px;background:#0d0d0d;border:1px solid #2b2b2b;padding:5px;border-radius:13px;margin-bottom:18px}.client-access-switch-v431 button{border:0;border-radius:9px;background:transparent;color:#777;padding:10px;font-weight:850}.client-access-switch-v431 button.on{background:#ff6a00;color:#fff}.client-access-card-v431 .field input{background:#0b0b0b;color:#fff;border-color:#373737}.client-access-help-v431{margin-top:14px;color:#777;font-size:10px;line-height:1.45;text-align:center}.client-access-error-v431{min-height:100vh;background:#090909;color:#fff;display:grid;place-items:center;padding:24px}.client-access-error-v431 section{width:min(520px,100%);border:1px solid #333;border-radius:22px;padding:28px;background:#151515}@media(max-width:620px){.portal-access-row-v431{grid-template-columns:1fr}.portal-access-row-v431 .btn{width:100%}.portal-access-label-v431{display:block}.portal-access-status-v431{display:inline-block;margin-top:8px}.client-access-v431{padding:14px}.client-access-card-v431{padding:22px}.client-access-card-v431 h1{font-size:29px}}`;
document.head.appendChild(clientAccessStyleV431);

function clientAccessAuthV431(message=''){
  let client=clientAccessMetaV431?.client||{},signup=clientAccessModeV431==='signup';
  document.title=`Acesso de ${client.name||'Cliente'} · COLAB`;
  R.innerHTML=`<div class="client-access-v431"><section class="client-access-card-v431"><div class="client-access-brand-v431"><i>✦</i><div><b>COLAB</b><small>PORTAL DA CLIENTE</small></div></div><small class="ey">${E(client.name||'ACESSO')}</small><h1>${signup?'Crie seu acesso':'Que bom ter você aqui.'}</h1><p class="client-access-intro-v431">${signup?'Use o e-mail autorizado pela equipe Colab e escolha uma senha. Depois disso, este será o seu espaço.':'Entre para acompanhar sua estratégia, conteúdos, aprovações, eventos e materiais.'}</p><div class="client-access-switch-v431"><button type="button" data-clientaccessmode="signup" class="${signup?'on':''}">Primeiro acesso</button><button type="button" data-clientaccessmode="login" class="${!signup?'on':''}">Já tenho acesso</button></div>${message?`<div class="msg">${E(message)}</div>`:''}<form id="clientAccessFormV431"><div class="field"><label>E-mail</label><input name="email" type="email" required autocomplete="email"></div><div class="field"><label>${signup?'Crie uma senha':'Senha'}</label><input name="password" type="password" required minlength="6" autocomplete="${signup?'new-password':'current-password'}"></div><button class="btn pri full">${signup?'Criar meu acesso':'Entrar no portal'}</button></form><p class="client-access-help-v431">O acesso só é liberado para o e-mail cadastrado pela Colab.</p></section></div>`;
  document.querySelectorAll('[data-clientaccessmode]').forEach(button=>button.onclick=()=>{clientAccessModeV431=button.dataset.clientaccessmode;clientAccessAuthV431()});
  document.getElementById('clientAccessFormV431').onsubmit=doClientAccessAuthV431
}
async function doClientAccessAuthV431(event){
  event.preventDefault();let form=new FormData(event.currentTarget),email=String(form.get('email')||'').trim().toLowerCase(),password=String(form.get('password')||'');
  try{
    let signup=clientAccessModeV431==='signup',redirect=new URL(location.origin+location.pathname);redirect.searchParams.set('acesso',new URLSearchParams(location.search).get('acesso'));redirect.searchParams.set('v','4.31');
    let url=signup?B+'/auth/v1/signup?redirect_to='+encodeURIComponent(redirect.href):B+'/auth/v1/token?grant_type=password';
    let response=await tf(url,{method:'POST',headers:{apikey:K,'Content-Type':'application/json'},body:JSON.stringify({email,password})}),payload=await response.json();
    if(!response.ok)throw Error(payload.error_description||payload.msg||payload.message||'Não foi possível acessar');
    if(signup&&!payload.access_token){clientAccessModeV431='login';return clientAccessAuthV431('Cadastro criado. Confirme o e-mail recebido e depois entre por aqui.')}
    save(payload);S=payload;await hydrate()
  }catch(error){clientAccessAuthV431(error.message)}
}
function clientAccessErrorV431(message){
  R.innerHTML=`<div class="client-access-error-v431"><section><small class="ey">PORTAL DA CLIENTE</small><h1>Este acesso não está disponível.</h1><p class="muted">${E(message||'Peça um novo link para a equipe Colab.')}</p><a class="btn pri" href="${E(location.origin+location.pathname)}">Ir para a Central</a></section></div>`
}
async function clientAccessBootV431(token){
  let meta=document.createElement('meta');meta.name='robots';meta.content='noindex,nofollow,noarchive';document.head.appendChild(meta);
  R.innerHTML='<div class="load"><div><div class="logo">C<span>O</span>LAB</div><p>Preparando seu acesso...</p></div></div>';
  try{
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token))throw Error('O endereço recebido não é válido.');
    let response=await tf(B+'/rest/v1/rpc/client_portal_access_get',{method:'POST',headers:{apikey:K,'Content-Type':'application/json'},body:JSON.stringify({p_token:token})},12000),payload=await response.json();
    if(!response.ok||!payload?.client)throw Error('O link expirou ou foi substituído.');
    clientAccessMetaV431=payload;clientAccessModeV431=payload.access_state==='active'?'login':'signup';S=read();
    if(S?.user?.id){
      if(S.expires_at&&S.expires_at*1000<Date.now()+30000&&!await refresh())S=null;
      if(S?.user?.id){let memberships=await api('/rest/v1/user_memberships?select=*&user_id=eq.'+S.user.id),membership=memberships?.[0];if(membership?.role==='client'&&membership.client_id===payload.client.id){M=membership;await load();return render()}clear()}
    }
    clientAccessAuthV431()
  }catch(error){clientAccessErrorV431(error.message)}
}

const _bindClientAccessV431Base=bind;
bind=function(){_bindClientAccessV431Base();document.querySelectorAll('[data-prepareclientaccess]').forEach(button=>button.onclick=event=>{event.stopPropagation();prepareClientAccessV431(button.dataset.prepareclientaccess)})};

const _clientAccessBootV431Base=boot;
boot=async function(){let token=new URLSearchParams(location.search).get('acesso');if(token)return clientAccessBootV431(token);return _clientAccessBootV431Base()};


// ===== PRIMEIRO ACESSO PELO LINK V4.32 =====
clientAccessPanelV431=function(client){
  let link=clientAccessLinkV431(client),active=!!client.portal_access_claimed_by;
  return `<div class="portal-access-control-v431"><div class="portal-access-label-v431"><div><b>Acesso da cliente</b><span>CADASTRO E LOGIN · DADOS REAIS</span></div><span class="portal-access-status-v431 ${active?'active':''}">${active?'ACESSO CRIADO':'PRONTO PARA ENVIAR'}</span></div><p>${active?'A cliente já criou o acesso. Este mesmo link abre a tela de login dela.':'Envie este link para a cliente. No primeiro acesso, ela cadastra o próprio e-mail e cria a senha.'}</p><div class="portal-access-row-v431"><input value="${E(link||'Link indisponível')}" readonly aria-label="Link de cadastro e acesso da cliente"><button type="button" class="btn pri small" data-prepareclientaccess="${client.id}">Copiar link de acesso</button></div><small>Este link pertence somente ao portal de ${E(client.name)}. Ele não dá acesso a nenhuma outra cliente.</small></div>`
};

prepareClientAccessV431=async function(cid){
  let client=cl(cid),link=clientAccessLinkV431(client);
  if(!link)return toast('Não foi possível gerar o link de acesso');
  try{await copyTextV431(link);toast('Link de cadastro e acesso copiado')}catch(error){toast(error.message)}
};

clientAccessAuthV431=function(message=''){
  let client=clientAccessMetaV431?.client||{},signup=clientAccessModeV431==='signup';
  document.title=`Acesso de ${client.name||'Cliente'} · COLAB`;
  R.innerHTML=`<div class="client-access-v431"><section class="client-access-card-v431"><div class="client-access-brand-v431"><i>✦</i><div><b>COLAB</b><small>PORTAL DA CLIENTE</small></div></div><small class="ey">${E(client.name||'ACESSO')}</small><h1>${signup?'Crie seu acesso':'Que bom ter você aqui.'}</h1><p class="client-access-intro-v431">${signup?'Cadastre seu e-mail e escolha uma senha. Este acesso ficará ligado ao seu portal da Colab.':'Entre para acompanhar sua estratégia, conteúdos, aprovações, eventos e materiais.'}</p><div class="client-access-switch-v431"><button type="button" data-clientaccessmode="signup" class="${signup?'on':''}">Primeiro acesso</button><button type="button" data-clientaccessmode="login" class="${!signup?'on':''}">Já tenho acesso</button></div>${message?`<div class="msg">${E(message)}</div>`:''}<form id="clientAccessFormV431"><div class="field"><label>E-mail</label><input name="email" type="email" required autocomplete="email"></div><div class="field"><label>${signup?'Crie uma senha':'Senha'}</label><input name="password" type="password" required minlength="6" autocomplete="${signup?'new-password':'current-password'}"></div><button class="btn pri full">${signup?'Criar meu acesso':'Entrar no portal'}</button></form><p class="client-access-help-v431">Seu cadastro fica vinculado apenas a este portal.</p></section></div>`;
  document.querySelectorAll('[data-clientaccessmode]').forEach(button=>button.onclick=()=>{clientAccessModeV431=button.dataset.clientaccessmode;clientAccessAuthV431()});
  document.getElementById('clientAccessFormV431').onsubmit=doClientAccessAuthV431
};

async function claimClientPortalV432(token){
  return api('/rest/v1/rpc/claim_client_portal_access',{method:'POST',body:JSON.stringify({p_token:token})})
}

doClientAccessAuthV431=async function(event){
  event.preventDefault();let form=new FormData(event.currentTarget),email=String(form.get('email')||'').trim().toLowerCase(),password=String(form.get('password')||''),token=new URLSearchParams(location.search).get('acesso');
  try{
    let signup=clientAccessModeV431==='signup',redirect=new URL(location.origin+location.pathname);redirect.searchParams.set('acesso',token);redirect.searchParams.set('v','4.32');
    let url=signup?B+'/auth/v1/signup?redirect_to='+encodeURIComponent(redirect.href):B+'/auth/v1/token?grant_type=password';
    let response=await tf(url,{method:'POST',headers:{apikey:K,'Content-Type':'application/json'},body:JSON.stringify({email,password})}),payload=await response.json();
    if(!response.ok)throw Error(payload.error_description||payload.msg||payload.message||'Não foi possível acessar');
    if(signup&&!payload.access_token){clientAccessModeV431='login';return clientAccessAuthV431('Cadastro criado. Confirme o e-mail recebido e depois entre por este mesmo link.')}
    save(payload);S=payload;await claimClientPortalV432(token);await hydrate()
  }catch(error){clientAccessAuthV431(error.message)}
};

clientAccessBootV431=async function(token){
  let meta=document.createElement('meta');meta.name='robots';meta.content='noindex,nofollow,noarchive';document.head.appendChild(meta);
  R.innerHTML='<div class="load"><div><div class="logo">C<span>O</span>LAB</div><p>Preparando seu acesso...</p></div></div>';
  try{
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token))throw Error('O endereço recebido não é válido.');
    let response=await tf(B+'/rest/v1/rpc/client_portal_access_get',{method:'POST',headers:{apikey:K,'Content-Type':'application/json'},body:JSON.stringify({p_token:token})},12000),payload=await response.json();
    if(!response.ok||!payload?.client)throw Error('O link expirou ou foi substituído.');
    clientAccessMetaV431=payload;clientAccessModeV431=payload.access_state==='active'?'login':'signup';S=read();
    if(S?.user?.id){
      if(S.expires_at&&S.expires_at*1000<Date.now()+30000&&!await refresh())S=null;
      if(S?.user?.id){
        try{await claimClientPortalV432(token);return hydrate()}catch(error){clear();return clientAccessAuthV431(error.message)}
      }
    }
    clientAccessAuthV431()
  }catch(error){clientAccessErrorV431(error.message)}
};


// Inicialização movida para o fim do patch V5, depois que todas as telas novas forem registradas.

// ===== LINKS POR SERVICO + PRIORIDADES OPERACIONAIS V4.33 =====
function clientHasSocialV433(cid){return hasClientService(cid,'social_media')}
function clientHasStoryV433(cid){return hasClientService(cid,'storymaker')}
function storyEventsForClientV433(cid){return (D.events||[]).filter(event=>event.client_id===cid&&event.event_type==='storymaker').sort((a,b)=>String(b.starts_at||'').localeCompare(String(a.starts_at||'')))}
function storyBriefingForEventV433(eventId){return (D.storyBriefings||[]).find(briefing=>briefing.event_id===eventId)}
function storyHasDeliveryV433(event){return !!(event?.delivery_raw_url||event?.delivery_edited_url||event?.delivery_photos_url||event?.delivery_folder_url||(D.storyDeliverables||[]).some(item=>item.event_id===event?.id&&item.delivery_url))}
function storyLinkStateV433(event,briefing){if(storyHasDeliveryV433(event))return['MATERIAIS DISPONÍVEIS','delivery'];if(briefing?.submitted_at)return['BRIEFING RECEBIDO','received'];return['AGUARDANDO BRIEFING','briefing']}

clientAccessLinkV431=function(client){let token=String(client?.portal_access_token||'').trim();if(!token)return'';let url=new URL(location.origin+location.pathname);url.searchParams.set('acesso',token);url.searchParams.set('v','4.33');return url.href};
clientShareLinkV429=function(client){let token=String(client?.portal_preview_token||'').trim();if(!token)return'';let url=new URL(location.origin+location.pathname);url.searchParams.set('portal',token);url.searchParams.set('v','4.33');return url.href};
storyPublicUrl=function(token){let url=new URL(location.origin+location.pathname);url.searchParams.set('story',token);url.searchParams.set('v','4.33');return url.href};

function storyLinkCardsV433(cid,compact=false){let events=storyEventsForClientV433(cid);if(!events.length)return`<div class="empty">Nenhum evento StoryMaker vinculado a esta cliente.</div>`;return`<div class="client-story-links-v433 ${compact?'compact':''}">${events.map(event=>{let briefing=storyBriefingForEventV433(event.id),state=storyLinkStateV433(event,briefing),link=briefing?.public_token?storyPublicUrl(briefing.public_token):'';return`<article class="client-story-link-v433"><div class="client-story-link-main-v433"><small>${E(state[0])}</small><b>${E(event.title||'Evento StoryMaker')}</b><span>${event.starts_at?fmtDate(String(event.starts_at).slice(0,10)):''}${event.location?' · '+E(event.location):''}</span></div><div class="client-story-link-actions-v433">${link?`<button type="button" class="btn pri small" data-copystorylink-v433="${event.id}">Copiar link do evento</button><a class="btn ghost small" href="${E(link)}" target="_blank" rel="noopener">Abrir ↗</a>`:`<button type="button" class="btn pri small" data-copystorylink-v433="${event.id}">Gerar link do evento</button>`}</div></article>`}).join('')}</div>`}

function clientLinksModalV433(cid){let client=cl(cid);if(!client)return'';let social=clientHasSocialV433(cid),story=clientHasStoryV433(cid),access=clientAccessLinkV431(client),preview=clientShareLinkV429(client),drive=portalSafeUrlV428(client.materials_drive_url);return`<div class="modalbg"><div class="modal wide client-links-modal-v433"><div class="head"><div><small class="ey">LINKS DA CLIENTE</small><h2>${E(client.name)}</h2><p class="muted">Tudo que pode ser copiado ou aberto, organizado pelo serviço.</p></div><button class="btn ghost small" data-close>✕</button></div>${social?`<section class="panel client-link-service-v433"><small class="ey">SOCIAL MEDIA</small><h3>Portal da cliente</h3><p class="muted">O acesso real é para uso da cliente. A apresentação é somente para mostrar a experiência no onboarding.</p><div class="client-link-list-v433"><div><b>Acesso real</b><span>Cadastro, login, conteúdos e aprovações</span><div class="actions"><button class="btn pri small" data-prepareclientaccess="${cid}">Copiar link de acesso</button>${access?`<a class="btn ghost small" href="${E(access)}" target="_blank" rel="noopener">Abrir ↗</a>`:''}</div></div><div><b>Apresentação do portal</b><span>Sem login e somente visualização</span><div class="actions">${preview?`<button class="btn ghost small" data-copyportal="${cid}">Copiar apresentação</button><a class="btn ghost small" href="${E(preview)}" target="_blank" rel="noopener">Abrir ↗</a>`:`<button class="btn ghost small" data-renewportal="${cid}">Gerar apresentação</button>`}</div></div>${drive?`<div><b>Pasta de materiais</b><span>Google Drive compartilhado</span><div class="actions"><a class="btn ghost small" href="${E(drive)}" target="_blank" rel="noopener">Abrir Drive ↗</a></div></div>`:''}</div></section>`:''}${story?`<section class="panel client-link-service-v433"><small class="ey">STORYMAKER</small><h3>Link único de cada evento</h3><p class="muted">O mesmo endereço começa com o briefing e passa a mostrar as entregas quando os materiais forem liberados.</p>${storyLinkCardsV433(cid)}</section>`:''}${!social&&!story?'<div class="empty">Esta cliente ainda não tem um serviço ativo com link próprio.</div>':''}</div></div>`}

async function copyStoryLinkV433(eventId){try{let briefing=await ensureStoryBriefing(eventId),link=storyPublicUrl(briefing.public_token);await copyTextV431(link);await load();render();toast('Link do evento copiado')}catch(error){toast(error.message)}}

const _modalLinksV433Base=modal;
modal=function(){if(MD?.type==='clientLinksV433')return clientLinksModalV433(MD.clientId);return _modalLinksV433Base()};

const _contentPageLinksV433Base=contentPage;
contentPage=function(){let html=_contentPageLinksV433Base();if(!contentClient)return html;let match=html.match(/<div class="content-toolbar-actions">[\s\S]*?<\/div>/);if(!match)return html;return html.replace(match[0],match[0].replace('</div>',`<button type="button" class="btn ghost" data-clientlinks-v433="${contentClient}">Links da cliente</button></div>`))};

const _clientDetailLinksV433Base=clientDetailModal;
clientDetailModal=function(){let html=_clientDetailLinksV433Base(),client=cl(MD.id);if(!client)return html;let social=clientHasSocialV433(client.id),story=clientHasStoryV433(client.id),portalPanel=/<section class="panel client-portal-config-v428"[\s\S]*?<\/section>/;if(story&&!social){let replacement=`<section class="panel client-story-panel-v433" style="margin-top:10px"><div class="head"><div><small class="ey">STORYMAKER</small><h3>Briefing e entrega do evento</h3><p class="muted">Sem portal separado: cada evento usa um único link do início à entrega.</p></div><button type="button" class="btn ghost small" data-clientlinks-v433="${client.id}">Ver todos os links</button></div>${storyLinkCardsV433(client.id,true)}</section>`;return html.replace(portalPanel,replacement)}if(social){let previewButton=`<button class="btn pri small" data-clientpreview="${client.id}">Ver como a cliente vê</button>`;let actions=`<div class="actions"><button type="button" class="btn ghost small" data-clientlinks-v433="${client.id}">Links da cliente</button>${previewButton}</div>`;return html.replace(previewButton,actions)}return html};

const _clientPreviewLinksV433Base=clientPreviewModal;
clientPreviewModal=function(){let cid=MD.clientId;if(clientHasStoryV433(cid)&&!clientHasSocialV433(cid))return clientLinksModalV433(cid);return _clientPreviewLinksV433Base()};

function taskDaysV433(task){if(!task?.due_date)return null;let start=new Date(today()+'T12:00:00'),due=new Date(task.due_date+'T12:00:00');return Math.round((due-start)/86400000)}
function taskScoreV433(task){if(task.status==='done')return-10000;let priority={urgent:400,high:250,normal:100,low:0}[task.priority]||0,days=taskDaysV433(task),deadline=days===null?0:days<0?500:days===0?350:days<=2?180:days<=7?70:0;return priority+deadline}
function taskBadgeV433(task){let days=taskDaysV433(task),badges=[];if(task.status!=='done'){if(days!==null&&days<0)badges.push(['ATRASADA','late']);else if(days===0)badges.push(['VENCE HOJE','today']);else if(days===1)badges.push(['VENCE AMANHÃ','soon']);if(task.priority==='urgent')badges.push(['URGENTE','urgent']);else if(task.priority==='high')badges.push(['ALTA PRIORIDADE','high'])}return badges.map(item=>`<span class="task-op-badge-v433 ${item[1]}">${item[0]}</span>`).join('')}

const _tasksPagePriorityV433Base=tasksPage;
tasksPage=function(){let original=D.tasks,sorted=[...original].sort((a,b)=>{let score=taskScoreV433(b)-taskScoreV433(a);if(score)return score;let due=String(a.due_date||'9999').localeCompare(String(b.due_date||'9999'));return due||String(a.created_at||'').localeCompare(String(b.created_at||''))});D.tasks=sorted;let html;try{html=_tasksPagePriorityV433Base()}finally{D.tasks=original}let filtered=sorted.filter(task=>(taskClientFilter==='all'||task.client_id===taskClientFilter)&&(taskOwnerFilter==='all'||(taskOwnerFilter==='none'?!task.assigned_to:task.assigned_to===taskOwnerFilter))&&(taskServiceFilter==='all'||task.service===taskServiceFilter)),open=filtered.filter(task=>task.status!=='done'),urgent=open.filter(task=>task.priority==='urgent').length,high=open.filter(task=>task.priority==='high').length,late=open.filter(task=>{let days=taskDaysV433(task);return days!==null&&days<0}).length,todayCount=open.filter(task=>taskDaysV433(task)===0).length,radar=`<div class="task-radar-v433"><div><small>AGORA</small><b>${late}</b><span>atrasada${late===1?'':'s'}</span></div><div><small>PRIORIDADE</small><b>${urgent}</b><span>urgente${urgent===1?'':'s'}</span></div><div><small>ATENÇÃO</small><b>${high}</b><span>alta${high===1?'':'s'}</span></div><div><small>HOJE</small><b>${todayCount}</b><span>vence${todayCount===1?'':'m'} hoje</span></div></div>`;html=html.replace('<div class="kan">',radar+'<div class="kan">');for(let task of sorted){let marker=`data-taskopen="${task.id}"`,position=html.indexOf(marker);if(position<0)continue;html=html.replace(marker,`${marker} data-taskpriority-v433="${E(task.priority||'normal')}" data-taskstatus-v433="${E(task.status||'todo')}"`);let updated=html.indexOf(marker),end=html.indexOf('>',updated),badges=taskBadgeV433(task);if(badges)html=html.slice(0,end+1)+`<div class="task-op-badges-v433">${badges}</div>`+html.slice(end+1)}return html};

const clientOpsStyleV433=document.createElement('style');clientOpsStyleV433.textContent=`
.client-story-links-v433{display:grid;gap:10px;margin-top:14px}.client-story-link-v433{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px;border:1px solid #303030;border-radius:15px;background:#101010}.client-story-link-main-v433{min-width:0}.client-story-link-main-v433 small{display:block;color:var(--o);font-size:8px;font-weight:950;letter-spacing:.12em}.client-story-link-main-v433 b{display:block;margin-top:5px}.client-story-link-main-v433 span{display:block;margin-top:4px;color:#777;font-size:10px}.client-story-link-actions-v433{display:flex;gap:7px;flex-wrap:wrap}.client-link-service-v433{margin-top:12px}.client-link-list-v433{display:grid;gap:9px;margin-top:14px}.client-link-list-v433>div{padding:14px;border:1px solid #2d2d2d;border-radius:14px;background:#101010}.client-link-list-v433 b,.client-link-list-v433 span{display:block}.client-link-list-v433 span{margin:4px 0 10px;color:#777;font-size:10px}.task-radar-v433{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin:12px 0 16px}.task-radar-v433>div{padding:13px;border:1px solid #292929;border-radius:14px;background:#121212}.task-radar-v433 small{display:block;color:#777;font-size:8px;font-weight:900;letter-spacing:.12em}.task-radar-v433 b{display:block;margin:4px 0;color:#fff;font-size:23px}.task-radar-v433 span{color:#888;font-size:9px}.task-op-badges-v433{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:9px}.task-op-badge-v433{padding:5px 7px;border-radius:99px;font-size:7px;font-weight:950;letter-spacing:.1em}.task-op-badge-v433.urgent,.task-op-badge-v433.late{background:#451414;color:#ff8c8c;border:1px solid #852d2d}.task-op-badge-v433.high,.task-op-badge-v433.today,.task-op-badge-v433.soon{background:#38200e;color:#ff9b58;border:1px solid #6e3917}.task[data-taskpriority-v433="urgent"]:not([data-taskstatus-v433="done"]){border-color:#8b2f2f!important;background:linear-gradient(145deg,#281010,#151515)!important;box-shadow:0 0 0 1px #4d1717 inset}.task[data-taskpriority-v433="high"]:not([data-taskstatus-v433="done"]){border-color:#7b431f!important;background:linear-gradient(145deg,#24170f,#151515)!important}.task[data-taskstatus-v433="done"] .task-op-badges-v433{display:none}@media(max-width:680px){.client-story-link-v433{align-items:flex-start;flex-direction:column}.client-story-link-actions-v433,.client-story-link-actions-v433 .btn,.client-story-link-actions-v433 a{width:100%}.task-radar-v433{grid-template-columns:1fr 1fr}.content-toolbar-actions{width:100%;display:grid!important;grid-template-columns:1fr 1fr}.content-toolbar-actions .btn:last-child{grid-column:1/-1}.client-links-modal-v433{padding:18px}}
`;document.head.appendChild(clientOpsStyleV433);

const _bindLinksPriorityV433Base=bind;
bind=function(){_bindLinksPriorityV433Base();document.querySelectorAll('[data-clientlinks-v433]').forEach(button=>button.onclick=event=>{event.stopPropagation();MD={type:'clientLinksV433',clientId:button.dataset.clientlinksV433};render()});document.querySelectorAll('[data-copystorylink-v433]').forEach(button=>button.onclick=event=>{event.stopPropagation();copyStoryLinkV433(button.dataset.copystorylinkV433)})};
// ===== FIM V4.33 =====

// ===== AJUSTES PONTUAIS DO BRIEFING V4.34 =====
const storyBriefingPolishV434Style=document.createElement('style');storyBriefingPolishV434Style.textContent=`
.story-public .hero{display:block!important}
.story-public .event-facts{grid-template-columns:minmax(130px,.75fr) minmax(0,1.25fr)!important;align-items:stretch}
.story-public .event-fact{min-width:0;overflow:hidden}
.story-public .event-fact strong{max-width:100%;overflow-wrap:anywhere;word-break:normal}
.story-public .event-fact.place{grid-column:1/-1}
.story-public .intro{position:relative;z-index:1;clear:both}
.guest-count-v434{margin:14px 0 18px;padding:16px;border:1px solid #3a302a;border-radius:16px;background:#101010}
.guest-count-v434 h3{margin:5px 0 4px;font-size:18px}.guest-count-v434 p{margin:0 0 10px;color:#929292;font-size:12px;line-height:1.45}
.guest-count-v434 input{max-width:240px}
@media(max-width:620px){.story-public .event-facts{grid-template-columns:1fr 1fr!important}.story-public .event-fact.place{grid-column:1/-1}.guest-count-v434{padding:13px}.guest-count-v434 input{max-width:none}}
`;document.head.appendChild(storyBriefingPolishV434Style);

function sbSetChoiceTextV434(input,text){let label=input?.closest('label');if(!label)return;for(let node of label.childNodes)if(node.nodeType===3)node.textContent=' '+text}

function sbRemoveDuplicateSupplierQuestionV434(form){let mark=form?.querySelector('[name="mark_suppliers_choice"]');if(!mark)return;let grid=mark.closest('.choice-grid'),label=grid?.previousElementSibling;if(label?.tagName==='LABEL')label.remove();grid?.remove();let hidden=document.createElement('input');hidden.type='radio';hidden.name='mark_suppliers_choice';hidden.value='yes';hidden.checked=true;hidden.hidden=true;hidden.style.display='none';hidden.dataset.supplierChoiceV434='';form.appendChild(hidden);let box=form.querySelector('[data-supplier-marking-box]');if(box)box.hidden=false;form.addEventListener('submit',()=>{let rows=[...form.querySelectorAll('[data-sbrow="supplier"]')].filter(row=>String(row.querySelector('[data-k="kind"]')?.value||'supplier')!=='partnership');hidden.checked=rows.some(row=>[...row.querySelectorAll('[data-k]')].some(input=>input.dataset.k!=='kind'&&String(input.value||'').trim()))},{capture:true})}

function sbAddGuestCountV434(x){let form=document.getElementById('storyPublicForm'),first=form?.querySelector('.brief-step');if(!form||!first||form.querySelector('[data-guest-count-v434]'))return;let schedule=sbObj(x?.briefing?.schedule_details),section=document.createElement('section');section.className='guest-count-v434';section.dataset.guestCountV434='';section.innerHTML=`<small class="ey">TAMANHO DO CASAMENTO</small><h3>Quantas pessoas estão previstas?</h3><p>Uma estimativa já ajuda a gente a entender melhor a dinâmica do evento.</p><label>Número aproximado de convidados</label><input name="guest_count" type="number" inputmode="numeric" min="1" max="5000" step="1" value="${E(schedule.guest_count||'')}" placeholder="Ex.: 120">`;let stories=first.querySelector('[data-stories-account-v415]');if(stories)stories.after(section);else{let anchor=first.querySelector('.brief-choice-title');if(anchor)anchor.before(section);else first.querySelector('h2+p')?.after(section)}}

function sbPolishChoicesV434(){let form=document.getElementById('storyPublicForm');if(!form)return;form.querySelector('[name="vibe_styles"][value="Festeira"]')?.closest('label')?.remove();sbSetChoiceTextV434(form.querySelector('[name="music_vibe"][value="mixed"]'),'Eclética');sbRemoveDuplicateSupplierQuestionV434(form)}

const _tfStoryGuestV434Base=tf;
tf=async function(url,options={},timeout){if(String(url||'').includes('/rpc/storymaker_public_submit')&&typeof options?.body==='string'){try{let payload=JSON.parse(options.body),data=payload?.p_data;if(data&&Object.prototype.hasOwnProperty.call(data,'guest_count')){let count=String(data.guest_count||'').trim(),schedule=data.schedule_details&&typeof data.schedule_details==='object'?data.schedule_details:{};if(count)schedule.guest_count=Number(count);else delete schedule.guest_count;data.schedule_details=schedule;options={...options,body:JSON.stringify(payload)}}}catch(error){console.warn('guest count',error)}}return _tfStoryGuestV434Base(url,options,timeout)};

sbSyncSupplierStep=function(){let form=document.getElementById('storyPublicForm'),box=form?.querySelector('[data-supplier-marking-box]');if(box)box.hidden=false};

const _storyRenderPolishV434Base=renderStoryPublic;
renderStoryPublic=function(x,token){_storyRenderPolishV434Base(x,token);sbAddGuestCountV434(x);sbPolishChoicesV434()};

const _storyDetailGuestV434Base=storymakerDetailModal;
storymakerDetailModal=function(id){let html=_storyDetailGuestV434Base(id),briefing=(D.storyBriefings||[]).find(item=>item.event_id===id),schedule=sbObj(briefing?.schedule_details),count=Number(schedule.guest_count||0);if(!html||!count)return html;let anchor='<div class="story-op-block wide"><h4>CRONOGRAMA</h4>';return html.replace(anchor,anchor+`<div class="op-line"><b>Número aproximado de convidados</b><small>${count} pessoa${count===1?'':'s'}</small></div>`)};
const _storyDetailMusicV434Base=storymakerDetailModal;
storymakerDetailModal=function(id){let html=_storyDetailMusicV434Base(id);return html?html.split('Uma mistura').join('Eclética'):html};
// ===== FIM V4.34 =====


// ===== EQUIPE DE MIDIA E MARCACOES V4.35 =====
const storyBriefingMediaV435Style=document.createElement('style');storyBriefingMediaV435Style.textContent=`
.brief-extra-v435{margin:16px 0;padding:16px;border:1px solid #353535;border-radius:16px;background:#101010}
.brief-extra-v435 h3{margin:5px 0 5px;font-size:18px}.brief-extra-v435>p{margin:0 0 12px;color:#929292;font-size:12px;line-height:1.45}
.brief-extra-v435 .choice-grid{margin-bottom:10px}.brief-extra-v435 [data-media-details-v435]{padding-top:4px}
.brief-extra-v435 .media-types-v435{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0 12px}
.brief-extra-v435 .media-types-v435 label{margin:0}
@media(max-width:620px){.brief-extra-v435{padding:13px}.brief-extra-v435 .media-types-v435{grid-template-columns:1fr}}
`;document.head.appendChild(storyBriefingMediaV435Style);

function sbRadioV435(name,value,label,checked){return `<label><input type="radio" name="${name}" value="${value}"${checked?' checked':''}> ${label}</label>`}
function sbCheckV435(name,value,label,checked){return `<label><input type="checkbox" name="${name}" value="${value}"${checked?' checked':''}> ${label}</label>`}

function sbAddMediaTeamV435(x){let form=document.getElementById('storyPublicForm'),first=form?.querySelector('.brief-step');if(!form||!first||form.querySelector('[data-media-team-v435]'))return;let schedule=sbObj(x?.briefing?.schedule_details),media=sbObj(schedule.media_professionals),types=Array.isArray(media.types)?media.types:[],has=media.present===true?'yes':media.present===false?'no':'';let section=document.createElement('section');section.className='brief-extra-v435';section.dataset.mediaTeamV435='';section.innerHTML=`<small class="ey">EQUIPE NO EVENTO</small><h3>Vai ter outros profissionais de mídia no casamento?</h3><p>Essa informação ajuda a gente a se organizar com quem também estará fazendo registros no dia.</p><div class="choice-grid">${sbRadioV435('other_media_choice','yes','Sim',has==='yes')}${sbRadioV435('other_media_choice','no','Não',has==='no')}</div><div data-media-details-v435${has==='yes'?'':' hidden'}><label>Quais profissionais estarão presentes?</label><div class="media-types-v435">${sbCheckV435('media_professional_types','photographer','Fotógrafo',types.includes('photographer'))}${sbCheckV435('media_professional_types','videomaker','Videomaker',types.includes('videomaker'))}${sbCheckV435('media_professional_types','storymaker','Outro StoryMaker',types.includes('storymaker'))}${sbCheckV435('media_professional_types','other','Outro',types.includes('other'))}</div><label>Nome ou @, se souberem <small>(opcional)</small></label><input name="media_professional_notes" value="${E(media.notes||'')}" placeholder="Ex.: @fotografo · @videomaker"></div>`;let guest=first.querySelector('[data-guest-count-v434]');if(guest)guest.after(section);else first.querySelector('h2+p')?.after(section);let sync=()=>{let yes=form.querySelector('[name="other_media_choice"]:checked')?.value==='yes';let details=section.querySelector('[data-media-details-v435]');if(details)details.hidden=!yes};section.addEventListener('change',sync);sync()}

function sbAddMentionVisibilityV435(x){let form=document.getElementById('storyPublicForm'),steps=form?.querySelectorAll('.brief-step'),step=steps?.[5];if(!form||!step||form.querySelector('[data-mention-visibility-v435]'))return;let schedule=sbObj(x?.briefing?.schedule_details),choice=String(schedule.visible_mentions_choice||'');let section=document.createElement('section');section.className='brief-extra-v435';section.dataset.mentionVisibilityV435='';section.innerHTML=`<small class="ey">MARCAÇÕES</small><h3>Vocês querem que os @ marcados apareçam visíveis nos Stories?</h3><p>Mesmo quando a marcação não aparece na tela, o perfil continua sendo marcado.</p><div class="choice-grid">${sbRadioV435('visible_mentions_choice','yes','Sim',choice==='yes')}${sbRadioV435('visible_mentions_choice','no','Não',choice==='no')}</div>`;let actions=step.querySelector('.brief-actions');if(actions)actions.before(section);else step.appendChild(section)}

const _tfStoryMediaV435Base=tf;
tf=async function(url,options={},timeout){if(String(url||'').includes('/rpc/storymaker_public_submit')&&typeof options?.body==='string'){try{let payload=JSON.parse(options.body),data=payload?.p_data;if(data){let schedule=data.schedule_details&&typeof data.schedule_details==='object'?data.schedule_details:{};if(Object.prototype.hasOwnProperty.call(data,'other_media_choice')){let raw=data.media_professional_types,types=Array.isArray(raw)?raw:raw?[raw]:[];schedule.media_professionals={present:data.other_media_choice==='yes',types,notes:String(data.media_professional_notes||'').trim()}}if(Object.prototype.hasOwnProperty.call(data,'visible_mentions_choice'))schedule.visible_mentions_choice=String(data.visible_mentions_choice||'');data.schedule_details=schedule;options={...options,body:JSON.stringify(payload)}}}catch(error){console.warn('story media fields',error)}}return _tfStoryMediaV435Base(url,options,timeout)};

const _storyRenderMediaV435Base=renderStoryPublic;
renderStoryPublic=function(x,token){_storyRenderMediaV435Base(x,token);sbAddMediaTeamV435(x);sbAddMentionVisibilityV435(x)};

const _storyDetailMediaV435Base=storymakerDetailModal;
storymakerDetailModal=function(id){let html=_storyDetailMediaV435Base(id),briefing=(D.storyBriefings||[]).find(item=>item.event_id===id),schedule=sbObj(briefing?.schedule_details),media=sbObj(schedule.media_professionals);if(!html)return html;if(media.present===true){let labels={photographer:'Fotógrafo',videomaker:'Videomaker',storymaker:'Outro StoryMaker',other:'Outro'},types=(Array.isArray(media.types)?media.types:[]).map(v=>labels[v]||v),details=[types.join(' · '),media.notes].filter(Boolean).join(' · ');html=html.replace('<div class="story-op-block wide"><h4>CRONOGRAMA</h4>','<div class="story-op-block wide"><h4>CRONOGRAMA</h4>'+`<div class="op-line"><b>Outros profissionais de mídia</b><small>${E(details||'Sim')}</small></div>`)}else if(media.present===false){html=html.replace('<div class="story-op-block wide"><h4>CRONOGRAMA</h4>','<div class="story-op-block wide"><h4>CRONOGRAMA</h4><div class="op-line"><b>Outros profissionais de mídia</b><small>Não</small></div>')}let mentions=String(schedule.visible_mentions_choice||'');if(mentions)html=html.replace('<div class="story-op-block"><h4>STORIES / DESTAQUES</h4>','<div class="story-op-block"><h4>STORIES / DESTAQUES</h4>'+`<p><b>Marcações nos Stories</b><br><small>${mentions==='yes'?'@ visíveis':'Marcação discreta, sem o @ visível'}</small></p>`);return html};
// ===== FIM V4.35 =====

// ===== COLAB OPERACIONAL V5.0 · NAVEGAÇÃO, HOME, VITRINE E AGENDA =====
const colabV5Style=document.createElement('style');
colabV5Style.textContent=`
.v5-top-btn{width:42px;height:42px;padding:0;display:grid;place-items:center;border-radius:13px;font-size:17px}
.v5-top-btn.on{border-color:#8a3b12;background:#28150c;color:#ff8d4a}
.v5-eye-btn svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.v5-nav-client{background:#1b120e!important;color:#fff!important;box-shadow:inset 3px 0 var(--o)}
.v5-home-hero{align-items:stretch;background:radial-gradient(circle at 88% 20%,rgba(255,106,0,.17),transparent 28%),linear-gradient(135deg,#17110e,#141414 60%)}
.v5-home-hero h2{font-size:38px;max-width:720px}.v5-home-hero .daily-word{max-width:580px}
.v5-quick-grid{display:grid;grid-template-columns:repeat(3,minmax(110px,1fr));gap:9px;align-self:end;min-width:390px}
.v5-quick-grid .btn{min-height:78px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:14px}
.v5-section-title{display:flex;align-items:end;justify-content:space-between;gap:12px;margin:20px 2px 10px}
.v5-section-title h3{margin:4px 0 0;font-size:23px}
.v5-alert-list{display:grid;gap:8px}
.v5-alert{display:grid;grid-template-columns:auto 1fr auto;gap:11px;align-items:center;padding:13px;border:1px solid #303030;border-radius:14px;background:#111;color:#fff;text-align:left}
.v5-alert.urgent{border-color:#7b2828;background:linear-gradient(110deg,#281010,#121212)}
.v5-alert .v5-alert-icon{width:37px;height:37px;border-radius:11px;display:grid;place-items:center;background:#21130d;color:#ff8c50;font-weight:950}
.v5-alert.urgent .v5-alert-icon{background:#431616;color:#ff9191}
.v5-alert b,.v5-alert small{display:block}.v5-alert small{margin-top:4px;color:#858585}
.v5-finance-snapshot{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.v5-finance-snapshot article{padding:17px;border:1px solid #2d2d2d;border-radius:16px;background:#151515;cursor:pointer}
.v5-finance-snapshot span{display:block;color:#8c8c8c;font-size:11px}.v5-finance-snapshot b{display:block;margin-top:8px;font-size:26px}
.v5-finance-snapshot article:nth-child(2) b{color:#7cdb90}.v5-finance-snapshot article:nth-child(3) b{color:#ff9292}
.v5-today-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:12px}
.v5-empty-soft{padding:16px;border:1px dashed #333;border-radius:14px;color:#777}
.v5-calendar .calitem.appointment{background:#2a160b;border-left-color:#ff6a00}.v5-calendar .calitem.event{background:#101f31;border-left-color:#72a7ff}
.v5-agenda-list{display:grid;gap:8px;margin-top:14px}.v5-agenda-row{display:grid;grid-template-columns:auto 1fr auto;gap:11px;align-items:center;padding:12px;border:1px solid #292929;border-radius:13px;background:#111;cursor:pointer}
.v5-agenda-time{width:52px;text-align:center;color:#ff9559;font-weight:900}.v5-agenda-row small{display:block;color:#777;margin-top:3px}
.v5-showcase{min-height:100vh;padding:28px;background:radial-gradient(circle at 85% 12%,rgba(255,106,0,.18),transparent 28%),#090909;color:#fff}
.v5-showcase-top{display:flex;align-items:center;justify-content:space-between;gap:20px}.v5-showcase-brand{display:flex;align-items:center;gap:13px}
.v5-showcase-brand .logo{font-size:27px}.v5-showcase-badge{padding:8px 11px;border:1px solid #5f2d15;border-radius:999px;color:#ff9a61;font-size:10px;font-weight:900;letter-spacing:.12em}
.v5-showcase-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;margin:24px 0 16px}.v5-showcase-hero>section{padding:28px;border:1px solid #292929;border-radius:22px;background:rgba(20,20,20,.88)}
.v5-showcase-hero h1{font-size:46px;line-height:1.02;margin:9px 0 17px;max-width:760px}.v5-showcase-quote{color:#ff8d4a;font-size:17px;font-weight:850;line-height:1.45}
.v5-showcase .daily-word{margin-top:15px}.v5-showcase-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.v5-showcase-metric{padding:17px;border:1px solid #2d2d2d;border-radius:17px;background:#141414}.v5-showcase-metric span{display:block;color:#858585;font-size:10px;text-transform:uppercase;letter-spacing:.08em}.v5-showcase-metric b{display:block;margin:8px 0 3px;font-size:31px}.v5-showcase-metric small{color:#777}
.v5-showcase-bottom{display:grid;grid-template-columns:1.05fr .95fr;gap:12px;margin-top:12px}.v5-showcase-panel{padding:19px;border:1px solid #292929;border-radius:19px;background:#121212}
.v5-pipeline{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin-top:15px}.v5-pipeline div{padding:13px 10px;border-radius:13px;background:#191919;border-top:3px solid #4a4a4a}.v5-pipeline div.active{border-top-color:#ff6a00;background:#20140e}.v5-pipeline b,.v5-pipeline span{display:block}.v5-pipeline b{font-size:23px}.v5-pipeline span{font-size:9px;color:#8b8b8b;margin-top:4px}
.v5-anon-feed{display:grid;gap:8px;margin-top:13px}.v5-anon-feed div{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid #292929;border-radius:12px;color:#bdbdbd}.v5-anon-feed i{width:8px;height:8px;border-radius:50%;background:#ff6a00}
.v5-progress-large{height:10px;background:#262626;border-radius:99px;overflow:hidden;margin:12px 0}.v5-progress-large i{display:block;height:100%;background:linear-gradient(90deg,#ff6a00,#ff9a5c)}
@media(max-width:980px){.v5-quick-grid{min-width:0;width:100%}.v5-home-hero{display:block}.v5-home-hero .v5-quick-grid{margin-top:17px}.v5-showcase-metrics{grid-template-columns:1fr 1fr}.v5-showcase-hero,.v5-showcase-bottom,.v5-today-grid{grid-template-columns:1fr}}
@media(max-width:760px){.topactions{gap:5px}.v5-top-btn{width:39px;height:39px}.v5-home-hero h2{font-size:30px}.v5-quick-grid{grid-template-columns:1fr 1fr}.v5-quick-grid .btn:last-child{grid-column:1/-1}.v5-finance-snapshot{grid-template-columns:1fr}.v5-showcase{padding:16px}.v5-showcase-hero h1{font-size:34px}.v5-showcase-metrics{grid-template-columns:1fr 1fr}.v5-pipeline{grid-template-columns:1fr 1fr}.v5-pipeline div:last-child{grid-column:1/-1}.v5-showcase-badge{display:none}}
@media(max-width:430px){.v5-showcase-metrics{grid-template-columns:1fr}.v5-showcase-top .btn{padding:8px}.v5-alert{grid-template-columns:auto 1fr}.v5-alert>span:last-child{grid-column:2}}
`;
document.head.appendChild(colabV5Style);

let clientHubIdV5='',clientSearchV5='',clientServiceV5='all',financeTabV5='overview',taskRadarV5='open',showcaseV5=false;

const _loadColabV5Base=load;
load=async function(){
  await _loadColabV5Base();
  if(M?.role!=='team')return;
  try{
    let a=await Promise.all([
      api('/rest/v1/appointments?select=*&order=starts_at.asc'),
      api('/rest/v1/form_templates?select=*&active=eq.true&order=name'),
      api('/rest/v1/internal_library_items?select=*&order=created_at.desc'),
      api('/rest/v1/client_onboardings?select=*&order=updated_at.desc')
    ]);
    D.appointments=a[0]||[];
    D.formTemplates=a[1]||[];
    D.internalLibrary=a[2]||[];
    D.onboardings=a[3]||[];
    D.events=(D.events||[]).filter(event=>event.event_type!=='meeting');
    if(clientHubIdV5&&!D.clients.some(client=>client.id===clientHubIdV5))clientHubIdV5='';
  }catch(error){
    console.warn('Colab V5',error);
    D.appointments=D.appointments||[];
    D.formTemplates=D.formTemplates||[];
    D.internalLibrary=D.internalLibrary||[];
    D.onboardings=D.onboardings||[];
  }
};

function cashNowV5(){
  return Number(D.finance?.opening_cash||0)
    +sum((D.receivables||[]).filter(item=>item.status==='paid'),'amount')
    -sum((D.expenses||[]).filter(item=>item.status==='paid'),'amount')
    -sum(D.withdrawals||[],'amount');
}
function receivableOpenV5(){return sum((D.receivables||[]).filter(item=>item.status==='pending'),'amount')}
function payableOpenV5(){
  let expenses=sum((D.expenses||[]).filter(item=>item.status!=='paid'&&item.status!=='cancelled'),'amount');
  let recurring=sum((D.recurringCosts||[]).filter(item=>item.status==='active'),'amount');
  return expenses+recurring;
}
function taskDayDiffV5(task){return task?.due_date?daysBetween(today(),task.due_date):null}
function taskGroupV5(task){
  if(task.status==='done')return 7;
  let days=taskDayDiffV5(task);
  if(task.priority==='urgent'&&days!==null&&days<0)return 0;
  if(task.priority==='urgent')return 1;
  if(days!==null&&days<0)return 2;
  if(days===0)return 3;
  if(days!==null&&days>0)return 4;
  return 5;
}
function sortedTasksV5(list=D.tasks||[]){
  return [...list].sort((a,b)=>{
    let group=taskGroupV5(a)-taskGroupV5(b);
    if(group)return group;
    let due=String(a.due_date||'9999-12-31').localeCompare(String(b.due_date||'9999-12-31'));
    if(due)return due;
    let priority={urgent:0,high:1,normal:2,low:3};
    return (priority[a.priority]??9)-(priority[b.priority]??9)||String(a.created_at||'').localeCompare(String(b.created_at||''));
  });
}
function appointmentKindLabelV5(kind){return({briefing:'Briefing',meeting:'Reunião',alignment:'Alinhamento',content_capture:'Captação',other:'Outro'})[kind]||'Reunião'}
function appointmentStatusLabelV5(status){return({scheduled:'Agendada',completed:'Concluída',cancelled:'Cancelada'})[status]||status}
function v5TeamNav(){return[['home','⌂','Início'],['agenda','▣','Agenda'],['tasks','✓','Demandas'],['clients','◎','Clientes'],['finance','R$','Financeiro']]}
function v5NavActive(view){
  if(['clientHub','content','production','traffic','identityTeam','ideas'].includes(V))return view==='clients';
  return V===view;
}
function v5NavHtml(){
  return v5TeamNav().map(([view,icon,label])=>`<button data-v="${view}" class="${v5NavActive(view)?'on':''}"><b>${icon}</b><span>${label}</span></button>`).join('');
}

const _titleColabV5Base=title;
title=function(){
  if(M?.role!=='team')return _titleColabV5Base();
  return({
    home:'PAINEL DE COMANDO',agenda:'AGENDA',tasks:'DEMANDAS',clients:'CLIENTES',
    clientHub:cl(clientHubIdV5)?.name||'CLIENTE',finance:'FINANCEIRO',more:'CENTRAL',
    templatesV5:'MODELOS PADRÃO',libraryV5:'BIBLIOTECA COLAB',settingsV5:'CONFIGURAÇÕES',
    content:'CONTEÚDO DO CLIENTE',production:'STORYMAKER',traffic:'TRÁFEGO DO CLIENTE',
    identityTeam:'IDENTIDADE DO CLIENTE',mural:'MURAL COLAB',goals:'PLANEJAMENTO & METAS',
    access:'EQUIPE & ACESSOS'
  })[V]||_titleColabV5Base();
};

const _shellColabV5Base=shell;
function v5EyeIcon(){return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></svg>`}
shell=function(body,client=false){
  if(client)return _shellColabV5Base(body,true);
  if(showcaseV5){
    R.innerHTML=vitrinePageV5()+modal();
    let showcaseExit=document.querySelector('[data-showcase-exit]');
    if(showcaseExit){showcaseExit.className='btn ghost v5-top-btn v5-eye-btn';showcaseExit.innerHTML=v5EyeIcon();showcaseExit.removeAttribute('title');showcaseExit.setAttribute('aria-label','Voltar ao painel interno')}
    document.querySelector('[data-showcase-exit]')?.addEventListener('click',()=>{showcaseV5=false;render()});
    document.querySelector('[data-showcase-refresh]')?.addEventListener('click',async()=>{await load();render();toast('Painel atualizado')});
    return;
  }
  let unread=notificationUnread().length;
  R.innerHTML=`<div class="shell"><aside class="side"><div class="logo">C<span>O</span>LAB</div><nav class="nav">${v5NavHtml()}</nav><div class="foot">${E(S.user?.email||'')}<br><button id="out" class="btn ghost small" style="margin-top:9px">Sair</button></div></aside><main class="main"><header class="top"><div><small class="ey">COLAB OPERACIONAL</small><h1>${E(title())}</h1></div><div class="topactions">${V==='home'?'<button id="showcaseV5" class="btn ghost v5-top-btn" title="Modo Vitrine" aria-label="Abrir Modo Vitrine">◉</button>':''}<button id="centralV5" class="btn ghost v5-top-btn ${['more','templatesV5','libraryV5','settingsV5','goals','access'].includes(V)?'on':''}" title="Central administrativa" aria-label="Abrir Central">▦</button><button id="bell" class="bell ${unread?'has-unread':''}" aria-label="Notificações"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>${unread?`<span id="bellBadge" class="bellbadge">${unread>99?'99+':unread}</span>`:''}</button><button id="ref" class="btn ghost v5-top-btn" aria-label="Atualizar">↻</button></div></header>${body}</main></div>${chatDock()}${modal()}`;
  let showcaseEntry=document.getElementById('showcaseV5');
  if(showcaseEntry){showcaseEntry.classList.add('v5-eye-btn');showcaseEntry.innerHTML=v5EyeIcon();showcaseEntry.removeAttribute('title');showcaseEntry.setAttribute('aria-label','Abrir painel de apresentação')}
  document.querySelectorAll('[data-v]').forEach(button=>button.onclick=()=>{V=button.dataset.v;MD=null;render()});
  document.getElementById('out').onclick=()=>{clear();auth()};
  document.getElementById('ref').onclick=async()=>{await load();render();toast('Atualizado')};
  document.getElementById('centralV5').onclick=()=>{V='more';MD=null;render()};
  document.getElementById('showcaseV5')?.addEventListener('click',()=>{showcaseV5=true;render()});
  document.getElementById('bell')?.addEventListener('click',openNotifications);
  bind();
  setTimeout(hydratePreviews,50);
};

const _teamColabV5Base=team;
team=function(){
  let body=
    V==='agenda'?agendaPage():
    V==='clients'?clientsPage():
    V==='clientHub'?clientHubPageV5(clientHubIdV5):
    V==='tasks'?tasksPage():
    V==='content'?contentPage():
    V==='production'?productionPage():
    V==='traffic'?trafficPage():
    V==='identityTeam'?identityTeamPage():
    V==='finance'?financePage():
    V==='more'?morePage():
    V==='templatesV5'?templatesPageV5():
    V==='libraryV5'?libraryPageV5():
    V==='settingsV5'?settingsPageV5():
    V==='goals'?goalsPage():
    V==='access'?accessPage():
    V==='mural'?muralPage():
    V==='commercial'?commercialPage():
    V==='dna'?dnaPage():
    V==='ideas'?ideasPage():
    V==='files'?filesPage(false):
    homePage();
  shell(body);
};

function taskCompactRowV5(task){
  let days=taskDayDiffV5(task),urgent=task.priority==='urgent',late=days!==null&&days<0,owner=profile(task.assigned_to)?.display_name||'Equipe';
  return `<button class="v5-alert ${urgent||late?'urgent':''}" data-taskopen="${task.id}"><span class="v5-alert-icon">${urgent?'!':late?'↗':'✓'}</span><span><b>${E(task.title)}</b><small>${E(cl(task.client_id)?.name||'Colab · Interno')} · ${E(owner)}${task.due_date?' · '+(late?'atrasada desde ':'prazo ')+fmtDate(task.due_date):' · sem prazo'}</small></span><span class="tag ${urgent||late?'r':''}">${urgent?'Urgente':late?'Atrasada':E(ts(task.status))}</span></button>`;
}
function appointmentCompactRowV5(item){
  let client=cl(item.client_id);
  return `<div class="v5-agenda-row" data-appointmentopen="${item.id}"><div class="v5-agenda-time">${fmtTime(item.starts_at)||'—'}</div><div><b>${E(item.title)}</b><small>${E(client?.name||'Colab')} · ${E(appointmentKindLabelV5(item.kind))}</small></div><span class="tag o">${E(appointmentStatusLabelV5(item.status))}</span></div>`;
}
function homePage(){
  let now=today(),next7=new Date(now+'T12:00:00');next7.setDate(next7.getDate()+7);let end=next7.toISOString().slice(0,10);
  let open=sortedTasksV5((D.tasks||[]).filter(task=>task.status!=='done'));
  let urgent=open.filter(task=>task.priority==='urgent'||(task.due_date&&task.due_date<now)).slice(0,5);
  let todayTasks=open.filter(task=>task.due_date===now);
  let todayAppointments=(D.appointments||[]).filter(item=>String(item.starts_at).slice(0,10)===now&&item.status==='scheduled');
  let todayEvents=(D.events||[]).filter(item=>String(item.starts_at||'').slice(0,10)===now);
  let upcomingAppointments=(D.appointments||[]).filter(item=>{let date=String(item.starts_at).slice(0,10);return item.status==='scheduled'&&date>now&&date<=end});
  let upcomingEvents=(D.events||[]).filter(item=>{let date=String(item.starts_at||'').slice(0,10);return date>now&&date<=end});
  let upcomingTasks=open.filter(item=>item.due_date>now&&item.due_date<=end);
  let attentions=(D.clients||[]).filter(client=>client.active).map(client=>{
    let pending=(D.approvals||[]).filter(item=>item.status==='pending'&&item.contents?.client_id===client.id).length;
    let late=(D.receivables||[]).filter(item=>item.client_id===client.id&&item.status==='pending'&&item.due_date<now).length;
    let nextStory=(D.events||[]).find(item=>item.client_id===client.id&&item.event_type==='storymaker'&&String(item.starts_at||'').slice(0,10)>=now);
    let missingBrief=nextStory&&!(D.storyBriefings||[]).some(item=>item.event_id===nextStory.id&&item.submitted_at);
    let reasons=[];if(late)reasons.push(late+' pagamento'+(late>1?'s':'')+' vencido'+(late>1?'s':''));if(pending)reasons.push(pending+' aprovação'+(pending>1?'ões':''));
    if(missingBrief)reasons.push('briefing pendente');
    return{client,reasons,score:late*3+pending*2+(missingBrief?1:0)};
  }).filter(item=>item.score).sort((a,b)=>b.score-a.score).slice(0,4);
  let mural=(D.muralNotes||[]).filter(item=>!item.resolved).slice(0,3);
  let first=(profile(S.user?.id)?.display_name||'Thalia').split(' ')[0];
  let todayItems=[
    ...todayAppointments.map(item=>({kind:'appointment',date:item.starts_at,title:item.title,meta:appointmentKindLabelV5(item.kind),id:item.id})),
    ...todayEvents.map(item=>({kind:'event',date:item.starts_at,title:item.title,meta:lab(item.event_type),id:item.id})),
    ...todayTasks.map(item=>({kind:'task',date:item.due_date,title:item.title,meta:profile(item.assigned_to)?.display_name||'Equipe',id:item.id}))
  ].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  let future=[
    ...upcomingAppointments.map(item=>({kind:'appointment',date:item.starts_at,title:item.title,meta:appointmentKindLabelV5(item.kind),id:item.id})),
    ...upcomingEvents.map(item=>({kind:'event',date:item.starts_at,title:item.title,meta:lab(item.event_type),id:item.id})),
    ...upcomingTasks.map(item=>({kind:'task',date:item.due_date,title:item.title,meta:'Demanda',id:item.id}))
  ].sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(0,7);
  let genericRow=item=>`<div class="v5-agenda-row" ${item.kind==='appointment'?`data-appointmentopen="${item.id}"`:item.kind==='event'?`data-eventopen="${item.id}"`:`data-taskopen="${item.id}"`}><div class="v5-agenda-time">${item.kind==='task'?fmtDate(item.date).slice(0,5):fmtTime(item.date)||fmtDate(item.date).slice(0,5)}</div><div><b>${E(item.title)}</b><small>${E(item.meta)}</small></div><span class="tag">${item.kind==='appointment'?'Agenda':item.kind==='event'?'Evento':'Demanda'}</span></div>`;
  return `<section class="hero v5-home-hero"><div><small class="ey">${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'}).toUpperCase()}</small><h2>Olá, ${E(first)}. Este é o movimento da Colab hoje.</h2>${dailyWord()}</div><div class="v5-quick-grid"><button class="btn pri" data-m="taskQuickV5"><span class="quickplus">＋</span>Nova demanda</button><button class="btn ghost" data-m="appointmentNewV5"><span class="quickplus">＋</span>Agendar reunião</button><button class="btn ghost" data-m="ideaQuickV5"><span class="quickplus">＋</span>Anotar ideia</button></div></section>
  ${urgent.length?`<div class="v5-section-title"><div><small class="ey">DEMANDAS PRIORITÁRIAS</small><h3>Urgentes e atrasadas</h3></div><button class="btn ghost small" data-v="tasks">Ver todas</button></div><div class="v5-alert-list">${urgent.map(taskCompactRowV5).join('')}</div>`:''}
  <div class="v5-section-title"><div><small class="ey">FINANCEIRO</small><h3>Resumo financeiro</h3></div><button class="btn ghost small" data-v="finance">Abrir financeiro</button></div><div class="v5-finance-snapshot"><article data-v="finance"><span>CAIXA ATUAL</span><b>${money(cashNowV5())}</b></article><article data-v="finance"><span>A RECEBER</span><b>${money(receivableOpenV5())}</b></article><article data-v="finance"><span>A PAGAR</span><b>${money(payableOpenV5())}</b></article></div>
  <div class="v5-today-grid"><section class="panel" style="margin-top:14px"><div class="head"><div><small class="ey">HOJE</small><h3>Agenda e entregas</h3></div><button class="btn ghost small" data-v="agenda">Agenda</button></div>${todayItems.map(genericRow).join('')||'<div class="v5-empty-soft">Nenhum compromisso ou prazo para hoje.</div>'}</section><section class="panel" style="margin-top:14px"><div class="head"><div><small class="ey">PRÓXIMOS 7 DIAS</small><h3>O que vem aí</h3></div></div>${future.map(genericRow).join('')||'<div class="v5-empty-soft">A próxima semana está livre.</div>'}</section></div>
  ${attentions.length?`<section class="panel" style="margin-top:14px"><div class="head"><div><small class="ey">CLIENTES</small><h3>Acompanhamento por cliente</h3></div><button class="btn ghost small" data-v="clients">Ver clientes</button></div>${attentions.map(item=>`<button class="v5-alert" data-clienthub="${item.client.id}"><span class="v5-alert-icon">◎</span><span><b>${E(item.client.name)}</b><small>${E(item.reasons.join(' · '))}</small></span><span>→</span></button>`).join('')}</section>`:''}
  ${mural.length?`<section class="panel" style="margin-top:14px"><div class="head"><div><small class="ey">MURAL COLAB</small><h3>Recados entre a equipe</h3></div><button class="btn ghost small" data-v="mural">Abrir mural</button></div>${mural.map(note=>`<div class="row"><span class="v5-alert-icon">${E(note.emoji||'✦')}</span><div class="grow"><b>${E(note.body)}</b><small>${E(profile(note.author_id)?.display_name||'Equipe')}</small></div>${note.pinned?'<span class="tag o">Fixado</span>':''}</div>`).join('')}</section>`:''}
  ${regularGoals().length?goalsMini():''}`;
}

function vitrinePageV5(){
  let now=today(),weekEnd=new Date(now+'T12:00:00');weekEnd.setDate(weekEnd.getDate()+7);let end=weekEnd.toISOString().slice(0,10);
  let activeClients=(D.clients||[]).filter(item=>item.active).length;
  let doing=(D.tasks||[]).filter(item=>item.status==='doing').length+(D.contents||[]).filter(item=>['production','editing'].includes(item.status)).length;
  let approvals=(D.approvals||[]).filter(item=>item.status==='pending').length;
  let meetings=(D.appointments||[]).filter(item=>{let date=String(item.starts_at).slice(0,10);return item.status==='scheduled'&&date>=now&&date<=end}).length;
  let events=(D.events||[]).filter(item=>String(item.starts_at||'').slice(0,10)>=now).length;
  let deliveries=(D.storyDeliverables||[]).filter(item=>item.status==='delivered').length+(D.events||[]).filter(item=>item.delivery_status==='delivered').length;
  let checks=D.storyChecklist||[],checkDone=checks.filter(item=>item.completed).length,checkPct=checks.length?Math.round(checkDone/checks.length*100):0;
  let pipeline=[
    ['Briefings',(D.storyBriefings||[]).filter(item=>item.submitted_at).length],
    ['Planejamento',(D.contents||[]).filter(item=>['idea','script'].includes(item.status)).length],
    ['Produção',doing],
    ['Aprovação',approvals],
    ['Programados',(D.contents||[]).filter(item=>item.status==='scheduled').length]
  ];
  let activity=[
    events?events+' evento'+(events===1?'':'s')+' programado'+(events===1?'':'s'):'Agenda de eventos organizada',
    meetings?meetings+' encontro'+(meetings===1?'':'s')+' na próxima semana':'Rotina de alinhamentos organizada',
    approvals?approvals+' entrega'+(approvals===1?'':'s')+' em aprovação':'Fluxo de aprovações em dia',
    deliveries?deliveries+' entrega'+(deliveries===1?' concluída':'s concluídas'):'Entregas acompanhadas pelo sistema'
  ];
  return `<main class="v5-showcase"><header class="v5-showcase-top"><div class="v5-showcase-brand"><div class="logo">C<span>O</span>LAB</div><span class="v5-showcase-badge">PAINEL DE OPERAÇÃO</span></div><div class="actions"><button class="btn ghost" data-showcase-refresh>↻ Atualizar</button><button class="btn pri" data-showcase-exit>Fechar vitrine</button></div></header><div class="v5-showcase-hero"><section><small class="ey">DADOS REAIS DA OPERAÇÃO</small><h1>Visão geral<br>da operação</h1><p class="v5-showcase-quote">Demandas, clientes, agenda e financeiro atualizados em um só lugar.</p></section><section><small class="ey">PARA HOJE</small>${dailyWord()}<div style="margin-top:18px"><small class="ey">CHECKLISTS EM ANDAMENTO</small><div class="v5-progress-large"><i style="width:${checkPct}%"></i></div><b style="font-size:28px">${checkPct}%</b><span class="muted"> · ${checkDone} de ${checks.length} etapas concluídas</span></div></section></div><section class="v5-showcase-metrics"><article class="v5-showcase-metric"><span>Projetos ativos</span><b>${activeClients}</b><small>operações acompanhadas</small></article><article class="v5-showcase-metric"><span>Em produção</span><b>${doing}</b><small>demandas e conteúdos</small></article><article class="v5-showcase-metric"><span>Aprovações</span><b>${approvals}</b><small>etapas com cliente</small></article><article class="v5-showcase-metric"><span>Reuniões da semana</span><b>${meetings}</b><small>briefings e alinhamentos</small></article><article class="v5-showcase-metric"><span>Eventos programados</span><b>${events}</b><small>próximas coberturas</small></article><article class="v5-showcase-metric"><span>Entregas concluídas</span><b>${deliveries}</b><small>materiais organizados</small></article><article class="v5-showcase-metric"><span>Demandas abertas</span><b>${(D.tasks||[]).filter(item=>item.status!=='done').length}</b><small>fluxo operacional</small></article><article class="v5-showcase-metric"><span>Conteúdos planejados</span><b>${(D.contents||[]).filter(item=>item.status!=='published').length}</b><small>criação em movimento</small></article></section><div class="v5-showcase-bottom"><section class="v5-showcase-panel"><small class="ey">FLUXO OPERACIONAL</small><h3>Etapas dos projetos</h3><div class="v5-pipeline">${pipeline.map(([label,count])=>`<div class="${count?'active':''}"><b>${count}</b><span>${E(label)}</span></div>`).join('')}</div></section><section class="v5-showcase-panel"><small class="ey">MOVIMENTO DA OPERAÇÃO</small><h3>Operação em andamento</h3><div class="v5-anon-feed">${activity.map(text=>`<div><i></i><span>${E(text)}</span></div>`).join('')}</div></section></div></main>`;
}

function agendaItemsV5(){
  let items=[];
  (D.appointments||[]).filter(item=>item.status!=='cancelled').forEach(item=>items.push({date:String(item.starts_at).slice(0,10),type:'appointment',client:item.client_id,title:item.title,meta:fmtTime(item.starts_at)+' · '+appointmentKindLabelV5(item.kind),id:item.id,raw:item}));
  (D.tasks||[]).filter(item=>item.status!=='done'&&item.due_date).forEach(item=>items.push({date:item.due_date,type:'task',client:item.client_id,title:item.title,meta:profile(item.assigned_to)?.display_name||'Equipe',id:item.id,raw:item}));
  (D.contents||[]).filter(item=>item.publication_date).forEach(item=>items.push({date:item.publication_date,type:'content',client:item.client_id,title:item.title,meta:fmt(item.format),id:item.id,raw:item}));
  (D.events||[]).filter(item=>item.starts_at).forEach(item=>items.push({date:String(item.starts_at).slice(0,10),type:'event',client:item.client_id,title:item.title,meta:lab(item.event_type),id:item.id,raw:item}));
  return items;
}
function calendarGridV5(month,items){
  let [year,monthNo]=month.split('-').map(Number),first=new Date(year,monthNo-1,1),days=new Date(year,monthNo,0).getDate(),offset=(first.getDay()+6)%7,cells=[];
  for(let index=0;index<offset;index++)cells.push('<div class="day dim"></div>');
  for(let day=1;day<=days;day++){
    let date=`${month}-${String(day).padStart(2,'0')}`,dayItems=items.filter(item=>item.date===date);
    cells.push(`<div class="day"><b>${day}</b>${dayItems.map(item=>`<span class="calitem ${item.type}" ${item.type==='appointment'?`data-appointmentopen="${item.id}"`:item.type==='content'?`data-contentopen="${item.id}"`:item.type==='task'?`data-taskopen="${item.id}"`:`data-eventopen="${item.id}"`}><strong>${E(item.title)}</strong><br>${item.client?E(cl(item.client)?.name||'')+' · ':''}${E(item.meta||'')}</span>`).join('')}</div>`);
  }
  return `<div class="calendar v5-calendar">${['SEG','TER','QUA','QUI','SEX','SÁB','DOM'].map(label=>`<div class="weekday">${label}</div>`).join('')}${cells.join('')}</div>`;
}
function agendaPage(){
  let items=agendaItemsV5().filter(item=>dateMonth(item.date)===agendaMonth).filter(item=>agendaClient==='all'||item.client===agendaClient).filter(item=>agendaType==='all'||item.type===agendaType);
  let upcoming=items.filter(item=>item.date>=today()).sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(0,8);
  return `<div class="toolbar"><div><p class="muted">Reuniões e operação em uma agenda limpa. Financeiro continua no lugar certo.</p></div><button class="btn pri" data-m="appointmentNewV5">＋ Agendar</button></div><div class="filters"><input id="agendaMonth" type="month" value="${agendaMonth}"><select id="agendaClient"><option value="all">Todos os clientes</option>${(D.clients||[]).filter(client=>client.active).map(client=>`<option value="${client.id}" ${agendaClient===client.id?'selected':''}>${E(client.name)}</option>`).join('')}</select><select id="agendaType"><option value="all">Tudo</option><option value="appointment" ${agendaType==='appointment'?'selected':''}>Reuniões / alinhamentos</option><option value="task" ${agendaType==='task'?'selected':''}>Demandas</option><option value="content" ${agendaType==='content'?'selected':''}>Conteúdos</option><option value="event" ${agendaType==='event'?'selected':''}>Eventos / captações</option></select></div><div class="calendar-legend"><strong>CORES DA AGENDA</strong><span><i style="background:#ff6a00"></i>Reunião</span><span><i class="legend-task"></i>Demanda</span><span><i class="content"></i>Conteúdo</span><span><i class="event"></i>Evento</span></div><section class="panel">${calendarGridV5(agendaMonth,items)}</section>${upcoming.length?`<section class="panel" style="margin-top:14px"><div class="head"><div><small class="ey">PRÓXIMOS</small><h3>Compromissos do período</h3></div></div><div class="v5-agenda-list">${upcoming.map(item=>`<div class="v5-agenda-row" ${item.type==='appointment'?`data-appointmentopen="${item.id}"`:item.type==='content'?`data-contentopen="${item.id}"`:item.type==='task'?`data-taskopen="${item.id}"`:`data-eventopen="${item.id}"`}><div class="v5-agenda-time">${fmtDate(item.date).slice(0,5)}</div><div><b>${E(item.title)}</b><small>${E(cl(item.client)?.name||'Colab')} · ${E(item.meta)}</small></div><span class="tag">${item.type==='appointment'?'Reunião':item.type==='event'?'Evento':item.type==='content'?'Conteúdo':'Demanda'}</span></div>`).join('')}</div></section>`:''}`;
}

// ===== FIM COLAB V5.0 · PARTE 1 =====

// ===== COLAB OPERACIONAL V5.0 · CLIENTES, DEMANDAS, FINANCEIRO E CENTRAL =====
const colabV5CoreStyle=document.createElement('style');
colabV5CoreStyle.textContent=`
.v5-filterbar{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:12px 0 16px}.v5-filterbar input,.v5-filterbar select{min-height:42px;padding:10px 12px;border:1px solid #303030;border-radius:11px;background:#121212;color:#fff}
.v5-filterbar input[type="search"]{min-width:min(360px,100%);flex:1}.v5-client-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.v5-client-card{padding:17px;border:1px solid #2d2d2d;border-radius:18px;background:#151515;color:#fff;text-align:left;min-width:0}.v5-client-card:hover{border-color:#5a3b2a;transform:translateY(-1px)}
.v5-client-card .head{margin-bottom:14px}.v5-client-card h3{margin:0 0 5px;font-size:21px}.v5-client-card p{margin:0}.v5-client-meta{display:grid;gap:8px;margin-top:14px;padding-top:13px;border-top:1px solid #292929}.v5-client-meta div{display:flex;justify-content:space-between;gap:10px;color:#888;font-size:10px}.v5-client-meta b{color:#d8d8d8;text-align:right}
.v5-client-hero{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;padding:22px;border:1px solid #332a25;border-radius:20px;background:radial-gradient(circle at 90% 10%,rgba(255,106,0,.16),transparent 30%),#151515}.v5-client-hero h2{margin:5px 0;font-size:34px}.v5-client-actions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}
.v5-client-tabs{display:flex;gap:7px;overflow:auto;margin:12px 0}.v5-client-tabs button{white-space:nowrap;padding:9px 12px;border:1px solid #303030;border-radius:10px;background:#121212;color:#aaa;font-weight:800}.v5-client-tabs button:hover{color:#fff;border-color:#555}
.v5-hub-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0}.v5-hub-grid .panel{margin:0}.v5-hub-wide{grid-column:1/-1}
.v5-service-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v5-service-card{min-height:125px;padding:16px;border:1px solid #303030;border-radius:16px;background:#111;color:#fff;text-align:left;display:flex;flex-direction:column;justify-content:space-between}.v5-service-card:hover{border-color:#79401d;background:#1b120d}.v5-service-card span{color:#ff8b4a;font-size:22px}.v5-service-card b{display:block;font-size:17px}.v5-service-card small{display:block;color:#7f7f7f;margin-top:5px;line-height:1.35}
.v5-template-card{padding:14px;border:1px solid #51301e;border-radius:15px;background:linear-gradient(135deg,#1d120c,#111)}.v5-template-card h4{margin:5px 0}.v5-template-card p{color:#8a8a8a;font-size:11px}.v5-template-card .actions{justify-content:flex-start}
.v5-idea-capture{display:flex;gap:8px;margin:10px 0 14px}.v5-idea-capture input{flex:1;min-width:0;padding:12px;border:1px solid #3a3a3a;border-radius:12px;background:#0f0f0f;color:#fff}.v5-idea-list{display:grid;gap:8px}.v5-idea-item{padding:13px;border:1px solid #292929;border-radius:14px;background:#111}.v5-idea-item.pinned{border-color:#6a381b;background:#1b120d}.v5-idea-item b{display:block}.v5-idea-item small{display:block;color:#777;margin-top:5px}.v5-idea-item .actions{justify-content:flex-start;margin-top:9px}
.v5-contact-list{display:grid;gap:8px}.v5-contact-list div{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid #292929}.v5-contact-list div:first-child{border-top:0}.v5-contact-list span{color:#777}.v5-contact-list b{text-align:right}
.v5-task-radar{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:12px 0}.v5-task-radar button{padding:14px;border:1px solid #2d2d2d;border-radius:14px;background:#141414;color:#fff;text-align:left}.v5-task-radar button.on{border-color:#7b3b18;background:#23140c}.v5-task-radar small,.v5-task-radar b,.v5-task-radar span{display:block}.v5-task-radar small{color:#777;font-size:8px;letter-spacing:.1em}.v5-task-radar b{font-size:25px;margin:5px 0}.v5-task-radar span{color:#8b8b8b;font-size:9px}
.v5-task-list{display:grid;gap:9px}.v5-task-card{position:relative;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:15px;border:1px solid #2d2d2d;border-left:4px solid #555;border-radius:15px;background:#141414;cursor:pointer}.v5-task-card.urgent{border-color:#7d2929;border-left-color:#ef6a6a;background:linear-gradient(110deg,#281010,#141414)}.v5-task-card.late:not(.urgent){border-left-color:#e1b94d}.v5-task-card .v5-task-mark{width:39px;height:39px;border-radius:12px;display:grid;place-items:center;background:#242424;font-weight:950}.v5-task-card.urgent .v5-task-mark{background:#481818;color:#ff9191}.v5-task-card h4{margin:4px 0}.v5-task-card small{display:block;color:#7b7b7b}.v5-task-side{display:flex;align-items:flex-end;gap:7px;flex-direction:column}.v5-task-side select{padding:7px;background:#0e0e0e;color:#aaa;border:1px solid #353535;border-radius:8px}.v5-claim{border-color:#76401f!important;color:#ff955a!important}
.v5-finance-main{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin:14px 0}.v5-finance-main article{padding:20px;border:1px solid #2d2d2d;border-radius:18px;background:#151515}.v5-finance-main span{display:block;color:#888;font-size:11px}.v5-finance-main b{display:block;margin-top:9px;font-size:31px}.v5-finance-main article:nth-child(2) b{color:#7bdc91}.v5-finance-main article:nth-child(3) b{color:#ff9292}
.v5-finance-tabs{display:flex;gap:7px;overflow:auto;margin:12px 0}.v5-finance-tabs button{padding:10px 13px;border:1px solid #303030;border-radius:11px;background:#121212;color:#999;font-weight:850;white-space:nowrap}.v5-finance-tabs button.on{border-color:#743a18;background:#24140b;color:#ff9a62}
.v5-flow-row{display:grid;grid-template-columns:auto 1fr auto;gap:11px;align-items:center;padding:12px 0;border-top:1px solid #292929}.v5-flow-row:first-child{border-top:0}.v5-flow-sign{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:#102217;color:#79d990;font-weight:950}.v5-flow-row.out .v5-flow-sign{background:#2b1010;color:#ff9292}.v5-flow-row b,.v5-flow-row small{display:block}.v5-flow-row small{color:#777;margin-top:3px}.v5-flow-value{text-align:right}.v5-flow-row.out .v5-flow-value{color:#ff9292}.v5-flow-row:not(.out) .v5-flow-value{color:#79d990}
.v5-central-hero{padding:25px;border:1px solid #33281f;border-radius:20px;background:radial-gradient(circle at 90% 20%,rgba(255,106,0,.16),transparent 32%),#151515}.v5-central-hero h2{font-size:35px;margin:7px 0}.v5-central-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:11px;margin-top:14px}.v5-central-card{min-height:160px;padding:19px;border:1px solid #303030;border-radius:18px;background:#141414;color:#fff;text-align:left;display:flex;flex-direction:column;justify-content:space-between}.v5-central-card:hover{border-color:#713919;background:#1b120d}.v5-central-card>span{font-size:25px;color:#ff7c2b}.v5-central-card h3{margin:7px 0}.v5-central-card p{margin:0;color:#808080;line-height:1.45}.v5-central-card em{font-style:normal;color:#ff955c;font-weight:850}
.v5-template-list,.v5-library-list{display:grid;gap:10px}.v5-template-master{padding:17px;border:1px solid #4e3020;border-radius:17px;background:linear-gradient(135deg,#1d120d,#141414)}.v5-template-master h3{margin:7px 0}.v5-template-master p{color:#888}.v5-template-sections{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}
.v5-library-row{display:grid;grid-template-columns:auto 1fr auto;gap:11px;align-items:center;padding:14px;border:1px solid #2e2e2e;border-radius:15px;background:#131313}.v5-library-icon{width:42px;height:42px;border-radius:12px;background:#27150c;color:#ff8137;display:grid;place-items:center;font-weight:950}.v5-library-row b,.v5-library-row small{display:block}.v5-library-row small{color:#777;margin-top:4px}
@media(max-width:1050px){.v5-client-grid{grid-template-columns:1fr 1fr}.v5-task-radar{grid-template-columns:repeat(3,1fr)}}
@media(max-width:760px){.v5-client-grid,.v5-hub-grid,.v5-service-grid,.v5-central-grid{grid-template-columns:1fr}.v5-hub-wide{grid-column:auto}.v5-client-hero{display:block}.v5-client-actions{justify-content:flex-start;margin-top:14px}.v5-task-radar{grid-template-columns:1fr 1fr}.v5-task-radar button:last-child{grid-column:1/-1}.v5-task-card{grid-template-columns:auto 1fr}.v5-task-side{grid-column:2;align-items:flex-start}.v5-finance-main{grid-template-columns:1fr}.v5-library-row{grid-template-columns:auto 1fr}.v5-library-row>a,.v5-library-row>.actions{grid-column:2;justify-content:flex-start}}
`;
document.head.appendChild(colabV5CoreStyle);

function clientPaymentMetaV5(clientId){
  let open=(D.receivables||[]).filter(item=>item.client_id===clientId&&item.status==='pending');
  let late=open.filter(item=>item.due_date<today());
  if(late.length)return{label:'Pagamento atrasado',cls:'r',detail:money(sum(late,'amount'))};
  if(open.length)return{label:'A receber',cls:'y',detail:money(sum(open,'amount'))};
  return{label:'Em dia',cls:'g',detail:'Sem pendências'};
}
function nextClientCommitmentV5(clientId){
  let all=[
    ...(D.appointments||[]).filter(item=>item.client_id===clientId&&item.status==='scheduled').map(item=>({date:item.starts_at,label:appointmentKindLabelV5(item.kind)})),
    ...(D.events||[]).filter(item=>item.client_id===clientId&&item.starts_at).map(item=>({date:item.starts_at,label:lab(item.event_type)}))
  ].filter(item=>String(item.date).slice(0,10)>=today()).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  return all[0];
}
function clientsPage(){
  let filtered=(D.clients||[]).filter(client=>{
    let text=(client.name+' '+(client.segment||'')).toLowerCase();
    let search=!clientSearchV5||text.includes(clientSearchV5.toLowerCase());
    let service=clientServiceV5==='all'||(D.services||[]).some(item=>item.client_id===client.id&&item.active&&item.service===clientServiceV5);
    return search&&service;
  });
  return `<div class="toolbar"><div><p class="muted">Escolha uma cliente para abrir toda a operação dela em um só lugar.</p></div><button class="btn pri" data-m="clientNew">＋ Nova cliente</button></div><div class="v5-filterbar"><input id="clientSearchV5" type="search" value="${E(clientSearchV5)}" placeholder="Buscar cliente ou segmento"><select id="clientServiceV5"><option value="all">Todos os serviços</option>${['social_media','storymaker','trafego','identidade_visual'].map(service=>`<option value="${service}" ${clientServiceV5===service?'selected':''}>${E(lab(service))}</option>`).join('')}</select><span class="tag">${filtered.length} cliente${filtered.length===1?'':'s'}</span></div><div class="v5-client-grid">${filtered.map(client=>{
    let services=(D.services||[]).filter(item=>item.client_id===client.id&&item.active),openTasks=(D.tasks||[]).filter(item=>item.client_id===client.id&&item.status!=='done'),next=nextClientCommitmentV5(client.id),pay=clientPaymentMetaV5(client.id);
    return `<button class="v5-client-card ${client.active?'':'archived'}" data-clienthub="${client.id}"><div class="head"><div class="avatar">${E(client.initials||ini(client.name))}</div><span class="tag ${client.active?'g':''}">${client.active?'Ativa':'Arquivada'}</span></div><h3>${E(client.name)}</h3><p class="muted">${E(client.segment||'Cliente Colab')}</p><div class="services" style="margin-top:11px">${services.map(item=>`<span class="tag o">${E(lab(item.service))}</span>`).join('')||'<span class="tag">Sem serviço ativo</span>'}</div><div class="v5-client-meta"><div><span>Próximo</span><b>${next?E(next.label)+' · '+fmtDate(String(next.date).slice(0,10)):'Nada agendado'}</b></div><div><span>Demandas</span><b>${openTasks.length} pendente${openTasks.length===1?'':'s'}</b></div><div><span>Financeiro</span><b class="tag ${pay.cls}">${E(pay.label)} · ${E(pay.detail)}</b></div></div></button>`;
  }).join('')||'<div class="v5-empty-soft">Nenhuma cliente encontrada com estes filtros.</div>'}</div>`;
}

function clientServiceDescriptionV5(service){
  return({
    social_media:'Estratégia, calendário editorial, criação, feed, aprovações e ideias.',
    storymaker:'Evento, briefing, checklist, cronograma, publicação e entregas.',
    trafego:'Campanhas, criativos, investimento, métricas e resultados.',
    identidade_visual:'Briefing, referências, etapas, Brand Book e arquivos finais.'
  })[service]||'Operação deste serviço.';
}
function clientServiceIconV5(service){return({social_media:'▦',storymaker:'◉',trafego:'↗',identidade_visual:'✦'})[service]||'•'}
function ideaItemV5(idea){
  let linked=idea.source_url&&/^https?:/i.test(idea.source_url);
  return `<article class="v5-idea-item ${idea.pinned?'pinned':''}"><b>${idea.pinned?'✦ ':''}${E(idea.title)}</b>${idea.notes?`<small>${E(idea.notes)}</small>`:''}<div class="actions">${linked?`<a class="btn ghost small" href="${E(idea.source_url)}" target="_blank" rel="noopener">Abrir referência ↗</a>`:''}<button class="btn ghost small" data-ideapin="${idea.id}">${idea.pinned?'Desafixar':'Fixar'}</button><button class="btn ghost small" data-ideaedit="${idea.id}">Editar</button><button class="btn ghost small" data-ideatransform="${idea.id}">Transformar em conteúdo</button><button class="btn danger small" data-ideaarchive="${idea.id}">Arquivar</button></div></article>`;
}
function libraryCategoryLabelV5(category){return({drive_root:'Drive principal',brand:'Marca e logos',materials:'Materiais',briefing:'Briefings',onboarding:'Onboardings',contract:'Contratos',payment_receipt:'Comprovantes',admin:'Administrativo',other:'Outros'})[category]||'Arquivo'}
function templateMatchesClientV5(template,client,services){
  let service=services.some(item=>item.service===template.service&&item.active);
  let segment=!template.segment||String(client.segment||'').toLowerCase()===String(template.segment).toLowerCase();
  return service&&segment;
}
function clientHubPageV5(clientId){
  let client=cl(clientId);if(!client){V='clients';return clientsPage()}
  let services=(D.services||[]).filter(item=>item.client_id===client.id&&item.active);
  let tasks=sortedTasksV5((D.tasks||[]).filter(item=>item.client_id===client.id&&item.status!=='done')).slice(0,6);
  let ideas=(D.refs||[]).filter(item=>item.client_id===client.id&&item.status!=='archived').sort((a,b)=>Number(b.pinned)-Number(a.pinned)||String(b.created_at).localeCompare(String(a.created_at))).slice(0,8);
  let appointments=(D.appointments||[]).filter(item=>item.client_id===client.id&&item.status==='scheduled'&&String(item.starts_at).slice(0,10)>=today());
  let events=(D.events||[]).filter(item=>item.client_id===client.id&&item.starts_at&&String(item.starts_at).slice(0,10)>=today());
  let commitments=[
    ...appointments.map(item=>({date:item.starts_at,title:item.title,type:'appointment',id:item.id,meta:appointmentKindLabelV5(item.kind)})),
    ...events.map(item=>({date:item.starts_at,title:item.title,type:'event',id:item.id,meta:lab(item.event_type)}))
  ].sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(0,6);
  let contracts=(D.contracts||[]).filter(item=>item.client_id===client.id);
  let receivables=(D.receivables||[]).filter(item=>item.client_id===client.id).sort((a,b)=>String(b.due_date).localeCompare(String(a.due_date))).slice(0,6);
  let files=(D.internalLibrary||[]).filter(item=>item.client_id===client.id);
  let matching=(D.formTemplates||[]).filter(template=>templateMatchesClientV5(template,client,services));
  let onboarding=(D.onboardings||[]).find(item=>item.client_id===client.id);
  let history=[
    ...tasks.map(item=>({date:item.updated_at||item.created_at,label:'Demanda · '+item.title})),
    ...ideas.map(item=>({date:item.updated_at||item.created_at,label:'Ideia · '+item.title})),
    ...commitments.map(item=>({date:item.date,label:item.meta+' · '+item.title}))
  ].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,6);
  return `<section class="v5-client-hero"><div><button class="btn ghost small" data-v="clients">← Clientes</button><small class="ey" style="display:block;margin-top:13px">${E(client.segment||'CLIENTE COLAB')}</small><h2>${E(client.name)}</h2><div class="services">${services.map(item=>`<span class="tag o">${E(lab(item.service))}</span>`).join('')||'<span class="tag">Sem serviço ativo</span>'}</div></div><div class="v5-client-actions"><button class="btn pri" data-appointment-kind="briefing" data-client="${client.id}">＋ Agendar briefing</button><button class="btn ghost" data-appointment-kind="alignment" data-client="${client.id}">＋ Alinhamento</button><button class="btn ghost" data-taskquick-client="${client.id}">＋ Demanda</button><button class="btn ghost" data-ideaquick-client="${client.id}">＋ Ideia</button></div></section>
  <div class="v5-client-tabs"><button data-client-scroll="services">Serviços</button><button data-client-scroll="ideas">Ideias</button><button data-client-scroll="agenda">Agenda</button><button data-client-scroll="forms">Briefings & onboarding</button><button data-client-scroll="finance">Contrato & pagamentos</button><button data-client-scroll="files">Drive & arquivos</button></div>
  <div class="v5-hub-grid"><section class="panel" id="services"><div class="head"><div><small class="ey">SERVIÇOS ATIVOS</small><h3>Operação por cliente</h3></div><button class="btn ghost small" data-m="planEdit" data-client="${client.id}">Gerenciar</button></div><div class="v5-service-grid">${services.map(item=>`<button class="v5-service-card" data-clientroute="${item.service}" data-client="${client.id}"><span>${clientServiceIconV5(item.service)}</span><div><b>${item.service==='trafego'?'Tráfego Pago':E(lab(item.service))}</b><small>${E(clientServiceDescriptionV5(item.service))}</small></div></button>`).join('')||'<div class="v5-empty-soft">Ative os serviços desta cliente.</div>'}</div></section>
  <section class="panel"><div class="head"><div><small class="ey">CONTATOS</small><h3>Informações principais</h3></div><button class="btn ghost small" data-clientinfo="${client.id}">Editar</button></div><div class="v5-contact-list"><div><span>Contato</span><b>${E(client.contact_name||'Não informado')}</b></div><div><span>WhatsApp</span><b>${E(client.contact_phone||'Não informado')}</b></div><div><span>E-mail</span><b>${E(client.contact_email||'Não informado')}</b></div><div><span>Instagram</span><b>${E(client.instagram_handle||'Não informado')}</b></div></div></section>
  <section class="panel v5-hub-wide" id="ideas"><div class="head"><div><small class="ey">BANCO DE IDEIAS</small><h3>Ideias e referências</h3></div><span class="tag">${ideas.length}</span></div><form class="v5-idea-capture" id="ideaInlineV5" data-client="${client.id}"><input name="title" required placeholder="Escreva uma ideia, título ou gancho…"><button class="btn pri">Salvar ideia</button></form><div class="v5-idea-list">${ideas.map(ideaItemV5).join('')||'<div class="v5-empty-soft">Ainda não há ideias. Uma frase já basta para começar.</div>'}</div></section>
  <section class="panel" id="agenda"><div class="head"><div><small class="ey">AGENDA</small><h3>Próximos encontros e eventos</h3></div><button class="btn ghost small" data-appointment-kind="meeting" data-client="${client.id}">＋ Reunião</button></div>${commitments.map(item=>`<div class="v5-agenda-row" ${item.type==='appointment'?`data-appointmentopen="${item.id}"`:`data-eventopen="${item.id}"`}><div class="v5-agenda-time">${fmtDate(String(item.date).slice(0,10)).slice(0,5)}</div><div><b>${E(item.title)}</b><small>${fmtTime(item.date)} · ${E(item.meta)}</small></div><span>→</span></div>`).join('')||'<div class="v5-empty-soft">Nenhum compromisso futuro.</div>'}</section>
  <section class="panel"><div class="head"><div><small class="ey">DEMANDAS</small><h3>O que está em andamento</h3></div><button class="btn ghost small" data-taskquick-client="${client.id}">＋ Nova</button></div>${tasks.map(taskCompactRowV5).join('')||'<div class="v5-empty-soft">Nenhuma demanda pendente.</div>'}</section>
  <section class="panel v5-hub-wide" id="forms"><div class="head"><div><small class="ey">BRIEFINGS & ONBOARDING</small><h3>Modelos prontos para reutilizar</h3></div><button class="btn ghost small" data-v="templatesV5">Ver modelos padrão</button></div><div class="grid2">${matching.map(template=>`<article class="v5-template-card"><small class="ey">${E(lab(template.service))} · ${E(template.segment||'GERAL')}</small><h4>${E(template.name)}</h4><p>${E(template.description||'Modelo padrão Colab.')}</p><div class="actions"><button class="btn pri small" data-usetemplate="${template.id}" data-client="${client.id}">Usar neste cliente</button>${template.template_key==='social_ceremonialist'&&onboarding?'<button class="btn ghost small" data-onboardingopen="'+client.id+'">Ver respostas</button>':''}</div></article>`).join('')||'<div class="v5-empty-soft">Nenhum modelo corresponde aos serviços e ao segmento desta cliente.</div>'}</div></section>
  <section class="panel v5-hub-wide" id="finance"><div class="head"><div><small class="ey">CONTRATOS & PAGAMENTOS</small><h3>Financeiro desta cliente</h3></div><button class="btn pri small" data-m="contractNew" data-client="${client.id}">＋ Contrato</button></div><div class="grid2"><div><h4>Contratos</h4>${contracts.map(contractCard).join('')||'<div class="v5-empty-soft">Nenhum contrato cadastrado.</div>'}</div><div><h4>Parcelas e recebimentos</h4>${receivables.map(item=>`<div class="row"><span class="dot ${item.status==='paid'?'g':item.due_date<today()?'r':'y'}"></span><div class="grow"><b>${money(item.amount)}</b><small>${E(item.description)} · ${fmtDate(item.due_date)}</small></div>${item.status==='paid'?'<span class="tag g">Pago</span>':`<button class="btn pri small" data-payrec="${item.id}">Marcar pago</button>`}</div>`).join('')||'<div class="v5-empty-soft">Nenhum recebimento.</div>'}</div></div></section>
  <section class="panel" id="files"><div class="head"><div><small class="ey">DRIVE & ARQUIVOS</small><h3>Materiais organizados</h3></div><button class="btn ghost small" data-librarynew-client="${client.id}">＋ Link</button></div>${client.materials_drive_url?`<a class="v5-library-row" href="${E(client.materials_drive_url)}" target="_blank" rel="noopener"><span class="v5-library-icon">D</span><span><b>Pasta de materiais da cliente</b><small>Google Drive compartilhado</small></span><span>↗</span></a>`:''}${files.map(item=>`<div class="v5-library-row"><span class="v5-library-icon">▧</span><span><b>${E(item.title)}</b><small>${E(libraryCategoryLabelV5(item.category))}</small></span><a class="btn ghost small" href="${E(item.url)}" target="_blank" rel="noopener">Abrir ↗</a></div>`).join('')||(!client.materials_drive_url?'<div class="v5-empty-soft">Nenhum material vinculado.</div>':'')}</section>
  <section class="panel"><div class="head"><div><small class="ey">HISTÓRICO</small><h3>Movimentos recentes</h3></div><button class="btn ghost small" data-clientlinks-v433="${client.id}">Links da cliente</button></div>${history.map(item=>`<div class="row"><span class="dot"></span><div class="grow"><b>${E(item.label)}</b><small>${item.date?notificationWhen(item.date):''}</small></div></div>`).join('')||'<div class="v5-empty-soft">O histórico aparecerá conforme a operação avançar.</div>'}</section></div>`;
}

function taskRadarCountV5(kind,tasks){
  let now=today();
  if(kind==='urgent')return tasks.filter(item=>item.status!=='done'&&(item.priority==='urgent'||(item.due_date&&item.due_date<now))).length;
  if(kind==='today')return tasks.filter(item=>item.status!=='done'&&item.due_date===now).length;
  if(kind==='doing')return tasks.filter(item=>item.status==='doing').length;
  if(kind==='waiting')return tasks.filter(item=>item.status==='approval').length;
  if(kind==='done')return tasks.filter(item=>item.status==='done').length;
  return tasks.filter(item=>item.status!=='done').length;
}
function taskMatchesRadarV5(task){
  let now=today();
  if(taskRadarV5==='urgent')return task.status!=='done'&&(task.priority==='urgent'||(task.due_date&&task.due_date<now));
  if(taskRadarV5==='today')return task.status!=='done'&&task.due_date===now;
  if(taskRadarV5==='doing')return task.status==='doing';
  if(taskRadarV5==='waiting')return task.status==='approval';
  if(taskRadarV5==='done')return task.status==='done';
  return task.status!=='done';
}
function taskCardV5(task){
  let days=taskDayDiffV5(task),urgent=task.priority==='urgent',late=days!==null&&days<0,owner=profile(task.assigned_to)?.display_name||'Equipe';
  return `<article class="v5-task-card ${urgent?'urgent':''} ${late?'late':''}" data-taskopen="${task.id}"><div class="v5-task-mark">${urgent?'!':late?'↗':'✓'}</div><div><div class="chips">${urgent?'<span class="tag r">URGENTE</span>':''}${late?'<span class="tag r">ATRASADA</span>':days===0?'<span class="tag y">VENCE HOJE</span>':''}<span class="tag">${E(lab(task.service))}</span></div><h4>${E(task.title)}</h4><small>${E(cl(task.client_id)?.name||'Colab · Interno')} · ${E(owner)}${task.due_date?' · prazo '+fmtDate(task.due_date):' · sem data'}</small></div><div class="v5-task-side">${!task.assigned_to&&task.status!=='done'?`<button class="btn ghost small v5-claim" data-taskclaim="${task.id}">Assumir demanda</button>`:''}<select data-status="${task.id}" aria-label="Status da demanda">${[['todo','A fazer'],['doing','Em andamento'],['approval','Aguardando'],['done','Concluída']].map(([value,label])=>`<option value="${value}" ${task.status===value?'selected':''}>${label}</option>`).join('')}</select></div></article>`;
}
function tasksPage(){
  let base=(D.tasks||[]).filter(task=>(taskClientFilter==='all'||task.client_id===taskClientFilter)&&(taskOwnerFilter==='all'||(taskOwnerFilter==='none'?!task.assigned_to:task.assigned_to===taskOwnerFilter))&&(taskServiceFilter==='all'||task.service===taskServiceFilter));
  let filtered=sortedTasksV5(base.filter(taskMatchesRadarV5));
  let radar=[['urgent','URGENTE','Urgentes e atrasadas'],['today','HOJE','Prazo de hoje'],['doing','EM ANDAMENTO','Sendo executadas'],['waiting','AGUARDANDO','Cliente ou aprovação'],['done','CONCLUÍDAS','Histórico finalizado']];
  return `<div class="toolbar"><div><p class="muted">Fila operacional ordenada por urgência e prazo, independentemente da data de criação.</p></div><button class="btn pri" data-m="taskQuickV5">＋ Nova demanda</button></div><div class="v5-task-radar">${radar.map(([kind,label,description])=>`<button class="${taskRadarV5===kind?'on':''}" data-taskradar="${kind}"><small>${label}</small><b>${taskRadarCountV5(kind,base)}</b><span>${description}</span></button>`).join('')}</div><div class="v5-filterbar"><select id="taskClient"><option value="all">Todos os clientes</option>${(D.clients||[]).map(client=>`<option value="${client.id}" ${taskClientFilter===client.id?'selected':''}>${E(client.name)}</option>`).join('')}</select><select id="taskService"><option value="all">Todos os serviços</option>${['social_media','storymaker','trafego','identidade_visual','administrativo'].map(service=>`<option value="${service}" ${taskServiceFilter===service?'selected':''}>${E(lab(service))}</option>`).join('')}</select><select id="taskOwner"><option value="all">Thalia, Carol e Equipe</option>${(D.profiles||[]).map(person=>`<option value="${person.user_id}" ${taskOwnerFilter===person.user_id?'selected':''}>${E(person.display_name)}</option>`).join('')}<option value="none" ${taskOwnerFilter==='none'?'selected':''}>Equipe · compartilhadas</option></select><button class="btn ghost small" data-taskclear>Limpar filtros</button><span class="tag">${filtered.length} demanda${filtered.length===1?'':'s'}</span></div><div class="v5-task-list">${filtered.map(taskCardV5).join('')||'<div class="v5-empty-soft">Nenhuma demanda neste radar.</div>'}</div>`;
}

function financeOverviewV5(){
  let now=today(),end=new Date(now+'T12:00:00');end.setDate(end.getDate()+7);let endDate=end.toISOString().slice(0,10);
  let incoming=(D.receivables||[]).filter(item=>item.status==='pending').sort((a,b)=>String(a.due_date).localeCompare(String(b.due_date)));
  let outgoing=(D.expenses||[]).filter(item=>item.status!=='paid'&&item.status!=='cancelled').sort((a,b)=>String(a.due_date||a.expense_date).localeCompare(String(b.due_date||b.expense_date)));
  let recurring=(D.recurringCosts||[]).filter(item=>item.status==='active').sort((a,b)=>String(a.next_due_date).localeCompare(String(b.next_due_date)));
  let overdue=[...incoming.filter(item=>item.due_date<now).map(item=>({type:'in',title:(cl(item.client_id)?.name||'Recebimento')+' · '+item.description,date:item.due_date,amount:item.amount,id:item.id})),...outgoing.filter(item=>(item.due_date||item.expense_date)<now).map(item=>({type:'out',title:item.description,date:item.due_date||item.expense_date,amount:item.amount,id:item.id}))].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  let next=[...incoming.filter(item=>item.due_date>=now&&item.due_date<=endDate).map(item=>({type:'in',title:(cl(item.client_id)?.name||'Recebimento')+' · '+item.description,date:item.due_date,amount:item.amount,id:item.id})),...outgoing.filter(item=>{let date=item.due_date||item.expense_date;return date>=now&&date<=endDate}).map(item=>({type:'out',title:item.description,date:item.due_date||item.expense_date,amount:item.amount,id:item.id})),...recurring.filter(item=>item.next_due_date>=now&&item.next_due_date<=endDate).map(item=>({type:'out',title:item.name,date:item.next_due_date,amount:item.amount,recurring:true,id:item.id}))].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  let row=item=>`<div class="v5-flow-row ${item.type==='out'?'out':''}"><span class="v5-flow-sign">${item.type==='out'?'−':'+'}</span><span><b>${E(item.title)}</b><small>${fmtDate(item.date)}${item.recurring?' · recorrente':''}</small></span><b class="v5-flow-value">${money(item.amount)}</b></div>`;
  return `<div class="grid2"><section class="panel"><div class="head"><div><small class="ey">VENCIDOS</small><h3>Precisa de ação</h3></div><span class="tag ${overdue.length?'r':'g'}">${overdue.length}</span></div>${overdue.map(row).join('')||'<div class="v5-empty-soft">Nenhum valor vencido.</div>'}</section><section class="panel"><div class="head"><div><small class="ey">PRÓXIMOS 7 DIAS</small><h3>Entradas e pagamentos</h3></div></div>${next.map(row).join('')||'<div class="v5-empty-soft">Nada previsto para os próximos sete dias.</div>'}</section></div>`;
}
function financePlanningV5(){
  let incoming=(D.receivables||[]).filter(item=>item.status==='pending'&&dateMonth(item.due_date)===financeMonth);
  let expenses=(D.expenses||[]).filter(item=>item.status!=='paid'&&dateMonth(item.due_date||item.expense_date)===financeMonth);
  let recurring=(D.recurringCosts||[]).filter(item=>item.status==='active'&&dateMonth(item.next_due_date)===financeMonth);
  let projectedIn=sum(incoming,'amount'),projectedOut=sum(expenses,'amount')+sum(recurring,'amount'),balance=projectedIn-projectedOut;
  return `<div class="stats"><article class="stat"><span>Entradas previstas</span><b class="moneypos">${money(projectedIn)}</b><small>${incoming.length} lançamento${incoming.length===1?'':'s'}</small></article><article class="stat"><span>Saídas previstas</span><b class="moneyneg">${money(projectedOut)}</b><small>despesas e recorrências</small></article><article class="stat"><span>Saldo projetado</span><b class="${balance>=0?'moneypos':'moneyneg'}">${money(balance)}</b><small>para o período</small></article><article class="stat"><span>Reserva desejada</span><b>${money(D.finance?.reserve_target||0)}</b><small>meta de proteção</small></article></div><div class="grid2"><section class="panel"><div class="head"><div><small class="ey">A RECEBER</small><h3>Previsão de entradas</h3></div><button class="btn ghost small" data-m="receivableNew">＋</button></div>${incoming.map(item=>`<div class="row"><span class="dot g"></span><div class="grow"><b>${E(cl(item.client_id)?.name||'Avulso')} · ${money(item.amount)}</b><small>${E(item.description)} · ${fmtDate(item.due_date)}</small></div><button class="btn pri small" data-payrec="${item.id}">Receber</button></div>`).join('')||'<div class="v5-empty-soft">Nenhuma entrada prevista.</div>'}</section><section class="panel"><div class="head"><div><small class="ey">A PAGAR</small><h3>Custos e despesas</h3></div><button class="btn ghost small" data-m="recurringCostNew">＋ Recorrente</button></div>${[...expenses.map(item=>({id:item.id,title:item.description,date:item.due_date||item.expense_date,amount:item.amount,expense:true})),...recurring.map(item=>({id:item.id,title:item.name,date:item.next_due_date,amount:item.amount,recurring:true}))].map(item=>`<div class="row"><span class="dot r"></span><div class="grow"><b>${E(item.title)} · ${money(item.amount)}</b><small>${fmtDate(item.date)}${item.recurring?' · recorrente':''}</small></div>${item.expense?`<button class="btn pri small" data-payexp="${item.id}">Pagar</button>`:`<button class="btn pri small" data-paycost="${item.id}">Pagar</button>`}</div>`).join('')||'<div class="v5-empty-soft">Nenhuma saída prevista.</div>'}</section></div><section class="panel" style="margin-top:14px"><div class="head"><div><small class="ey">CONTRATOS ATIVOS</small><h3>Receita contratada</h3></div><button class="btn ghost small" data-v="clients">Abrir nos clientes</button></div><div class="grid3">${(D.contracts||[]).filter(item=>item.status==='active').map(contractCard).join('')||'<div class="v5-empty-soft">Nenhum contrato ativo.</div>'}</div></section>`;
}
function financeFlowV5(){
  let flows=[
    ...(D.receivables||[]).filter(item=>item.status==='paid'&&dateMonth(item.paid_at||item.due_date)===financeMonth).map(item=>({type:'in',date:String(item.paid_at||item.due_date).slice(0,10),title:(cl(item.client_id)?.name||item.external_contact_name||'Recebimento')+' · '+item.description,amount:item.amount})),
    ...(D.expenses||[]).filter(item=>item.status==='paid'&&dateMonth(item.paid_at||item.expense_date)===financeMonth).map(item=>({type:'out',date:String(item.paid_at||item.expense_date).slice(0,10),title:item.description,amount:item.amount})),
    ...(D.withdrawals||[]).filter(item=>dateMonth(item.withdrawal_date)===financeMonth).map(item=>({type:'out',date:item.withdrawal_date,title:'Retirada · '+item.partner_name,amount:item.amount}))
  ].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  let incoming=flows.filter(item=>item.type==='in').reduce((sum,item)=>sum+Number(item.amount||0),0),outgoing=flows.filter(item=>item.type==='out').reduce((sum,item)=>sum+Number(item.amount||0),0),balance=incoming-outgoing;
  return `<section class="panel"><div class="head"><div><small class="ey">FLUXO REALIZADO</small><h3>O que efetivamente entrou e saiu</h3></div><div class="chips"><span class="tag g">Entrou ${money(incoming)}</span><span class="tag r">Saiu ${money(outgoing)}</span><span class="tag ${balance>=0?'g':'r'}">Saldo do período ${money(balance)}</span></div></div>${flows.map(item=>`<div class="v5-flow-row ${item.type==='out'?'out':''}"><span class="v5-flow-sign">${item.type==='out'?'−':'+'}</span><span><b>${E(item.title)}</b><small>${fmtDate(item.date)}</small></span><b class="v5-flow-value">${money(item.amount)}</b></div>`).join('')||'<div class="v5-empty-soft">Nenhum movimento realizado neste período.</div>'}</section>`;
}
function financePage(){
  let tabs=[['overview','Visão geral'],['planning','Planejamento'],['flow','Fluxo de caixa']];
  return `<div class="toolbar"><div><p class="muted">Primeiro o que importa: saldo disponível, valores a entrar e obrigações a pagar.</p></div><button class="btn pri" data-m="financeLaunchV5">＋ Lançar</button></div><div class="v5-finance-main"><article><span>CAIXA ATUAL</span><b>${money(cashNowV5())}</b><small class="muted">saldo realizado</small></article><article><span>A RECEBER</span><b>${money(receivableOpenV5())}</b><small class="muted">valores pendentes</small></article><article><span>A PAGAR</span><b>${money(payableOpenV5())}</b><small class="muted">despesas e recorrências</small></article></div><div class="toolbar"><div class="v5-finance-tabs">${tabs.map(([key,label])=>`<button class="${financeTabV5===key?'on':''}" data-financetab="${key}">${label}</button>`).join('')}</div><input id="financeMonth" type="month" value="${financeMonth}"></div>${financeTabV5==='planning'?financePlanningV5():financeTabV5==='flow'?financeFlowV5():financeOverviewV5()}`;
}

function morePage(){
  return `<section class="v5-central-hero"><small class="ey">CENTRAL ADMINISTRATIVA</small><h2>Base interna da Colab</h2><p class="muted">Configurações e acervo ficam aqui. A operação diária continua nas cinco áreas principais.</p></section><div class="v5-central-grid"><button class="v5-central-card" data-v="templatesV5"><span>▤</span><div><small class="ey">PADRÕES DA OPERAÇÃO</small><h3>Modelos de briefing & onboarding</h3><p>Formulários reutilizáveis por serviço e segmento, sem começar do zero.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="libraryV5"><span>▧</span><div><small class="ey">ACERVO INTERNO</small><h3>Biblioteca Colab</h3><p>Drive, logos, materiais, contratos, comprovantes e links importantes.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="goals"><span>◎</span><div><small class="ey">DIREÇÃO</small><h3>Planejamento & metas</h3><p>Objetivos da agência, marcos e acompanhamento de crescimento.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="access"><span>♙</span><div><small class="ey">PESSOAS</small><h3>Equipe & acessos</h3><p>Thalia, Carol, clientes convidados e permissões do sistema.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="settingsV5"><span>⚙</span><div><small class="ey">SISTEMA</small><h3>Configurações</h3><p>Caixa inicial, reserva, atalhos administrativos e preferências.</p></div><em>Abrir →</em></button></div>`;
}
function templatesPageV5(){
  return `<div class="toolbar"><div><p class="muted">Os modelos mestres permanecem intactos. Ao usar, o app vincula uma cópia à cliente ou ao evento.</p></div><button class="btn ghost" data-v="clients">Selecionar cliente</button></div><div class="v5-template-list">${(D.formTemplates||[]).map(template=>{let config=template.config||{},sections=Array.isArray(config.sections)?config.sections:[];return `<article class="v5-template-master"><div class="head"><div><small class="ey">${E(lab(template.service))} · ${E(template.segment||'GERAL')}</small><h3>${E(template.name)}</h3></div><span class="tag g">Modelo padrão</span></div><p>${E(template.description||'Modelo reutilizável Colab.')}</p><div class="v5-template-sections">${sections.map(section=>`<span class="tag">${E(section)}</span>`).join('')}</div><div class="note" style="margin-top:13px">Campos variáveis: nome da cliente, data, local e informações específicas. A estrutura do modelo não é alterada.</div></article>`}).join('')||'<div class="v5-empty-soft">Nenhum modelo salvo.</div>'}</div>`;
}
function libraryPageV5(){
  let rows=(D.internalLibrary||[]).filter(item=>(libraryClient==='all'||item.client_id===libraryClient)&&(libraryType==='all'||item.category===libraryType));
  let categories=['drive_root','brand','materials','briefing','onboarding','contract','payment_receipt','admin','other'];
  return `<div class="toolbar"><div><p class="muted">Os arquivos continuam no Drive; a Central guarda os links certos no lugar certo.</p></div><button class="btn pri" data-m="libraryNewV5">＋ Adicionar link</button></div><div class="v5-filterbar"><select id="libraryClient"><option value="all">Colab inteira e clientes</option>${(D.clients||[]).map(client=>`<option value="${client.id}" ${libraryClient===client.id?'selected':''}>${E(client.name)}</option>`).join('')}</select><select id="libraryType"><option value="all">Todas as categorias</option>${categories.map(category=>`<option value="${category}" ${libraryType===category?'selected':''}>${E(libraryCategoryLabelV5(category))}</option>`).join('')}</select><span class="tag">${rows.length} item${rows.length===1?'':'s'}</span></div><div class="v5-library-list">${rows.map(item=>`<article class="v5-library-row"><span class="v5-library-icon">${item.category==='drive_root'?'D':item.category==='brand'?'C':'▧'}</span><span><b>${E(item.title)}</b><small>${E(libraryCategoryLabelV5(item.category))}${item.client_id?' · '+E(cl(item.client_id)?.name||'Cliente'):''}${item.notes?' · '+E(item.notes):''}</small></span><div class="actions"><a class="btn pri small" href="${E(item.url)}" target="_blank" rel="noopener">Abrir ↗</a><button class="btn danger small" data-librarydelete="${item.id}">Excluir</button></div></article>`).join('')||'<div class="v5-empty-soft">Nenhum link nesta categoria. Adicione a pasta principal do Drive para começar.</div>'}</div>`;
}
function settingsPageV5(){
  return `<div class="toolbar"><p class="muted">Atalhos administrativos da operação.</p><button class="btn ghost" data-v="more">← Central</button></div><div class="v5-central-grid"><button class="v5-central-card" data-m="financeSettings"><span>R$</span><div><h3>Caixa & reserva</h3><p>Defina o saldo inicial e a meta de reserva da Colab.</p></div><em>Configurar →</em></button><button class="v5-central-card" data-v="access"><span>♙</span><div><h3>Equipe & permissões</h3><p>Gerencie pessoas e acessos ao sistema.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="libraryV5"><span>▧</span><div><h3>Pasta interna</h3><p>Centralize o Drive e os documentos administrativos.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="goals"><span>◎</span><div><h3>Planejamento</h3><p>Revise metas e direção da agência.</p></div><em>Abrir →</em></button></div>`;
}

// ===== FIM COLAB V5.0 · PARTE 2 =====




// ===== ACESSO CLIENTE ROBUSTO V6.66 =====
let clientAccessBusyV666=false;
function clientAccessFriendlyErrorV666(payload,status,signup){
  const code=String(payload?.error_code||payload?.code||'').toLowerCase();
  const raw=String(payload?.error_description||payload?.msg||payload?.message||'').toLowerCase();
  if(code==='email_not_confirmed'||raw.includes('email not confirmed')) return {mode:'login',kind:'confirm',text:'Seu cadastro já foi criado. Falta apenas confirmar o e-mail que enviamos. Abra sua caixa de entrada (e o spam), confirme e depois volte aqui para entrar. Não faça um novo cadastro.'};
  if(code==='over_email_send_rate_limit'||status===429||raw.includes('security purposes')) return {mode:'login',kind:'wait',text:'Seu cadastro já foi solicitado e o e-mail de confirmação já foi enviado. Aguarde alguns instantes e confira sua caixa de entrada. Não é necessário cadastrar novamente.'};
  if(signup&&(raw.includes('already registered')||raw.includes('already been registered')||raw.includes('user already'))) return {mode:'login',kind:'exists',text:'Este e-mail já tem cadastro. Use “Já tenho acesso” para entrar. Se ainda não confirmou o e-mail, confirme a mensagem recebida primeiro.'};
  if(raw.includes('invalid login credentials')) return {mode:'login',kind:'credentials',text:'E-mail ou senha não conferem. Se este foi seu primeiro acesso, confirme primeiro o e-mail recebido e tente novamente.'};
  return {mode:null,kind:'error',text:payload?.error_description||payload?.msg||payload?.message||'Não foi possível acessar agora.'};
}
function clientAccessAuthV666(message='',kind=''){
  let client=clientAccessMetaV431?.client||{},signup=clientAccessModeV431==='signup';
  document.title=`Acesso de ${client.name||'Cliente'} · COLAB`;
  const notice=message?`<div class="client-access-notice-v666 ${E(kind||'info')}">${E(message)}</div>`:'';
  R.innerHTML=`<div class="client-access-v431"><section class="client-access-card-v431"><div class="client-access-brand-v431"><i>✦</i><div><b>COLAB</b><small>PORTAL DA CLIENTE</small></div></div><small class="ey">${E(client.name||'ACESSO')}</small><h1>${signup?'Crie seu acesso':'Que bom ter você aqui.'}</h1><p class="client-access-intro-v431">${signup?'Cadastre seu e-mail e escolha uma senha. Você fará isso apenas uma vez.':'Entre com o e-mail e a senha que você cadastrou.'}</p><div class="client-access-switch-v431"><button type="button" data-clientaccessmode="signup" class="${signup?'on':''}">Primeiro acesso</button><button type="button" data-clientaccessmode="login" class="${!signup?'on':''}">Já tenho acesso</button></div>${notice}<form id="clientAccessFormV431"><div class="field"><label>E-mail</label><input name="email" type="email" required autocomplete="email"></div><div class="field"><label>${signup?'Crie uma senha':'Senha'}</label><input name="password" type="password" required minlength="6" autocomplete="${signup?'new-password':'current-password'}"></div><button class="btn pri full" data-client-auth-submit>${signup?'Criar meu acesso':'Entrar no portal'}</button></form><p class="client-access-help-v431">${signup?'Depois de criar o acesso, confirme o e-mail recebido antes de entrar.':'Se acabou de se cadastrar, confirme o e-mail recebido antes de entrar.'}</p></section></div>`;
  document.querySelectorAll('[data-clientaccessmode]').forEach(button=>button.onclick=()=>{clientAccessModeV431=button.dataset.clientaccessmode;clientAccessAuthV666()});
  document.getElementById('clientAccessFormV431').onsubmit=doClientAccessAuthV666;
}
async function doClientAccessAuthV666(event){
  event.preventDefault(); if(clientAccessBusyV666)return;
  const el=event.currentTarget, form=new FormData(el),email=String(form.get('email')||'').trim().toLowerCase(),password=String(form.get('password')||''),token=new URLSearchParams(location.search).get('acesso'),signup=clientAccessModeV431==='signup',button=el.querySelector('[data-client-auth-submit]');
  clientAccessBusyV666=true; if(button){button.disabled=true;button.textContent=signup?'Criando acesso…':'Entrando…'}
  try{
    let redirect=new URL(location.origin+location.pathname);redirect.searchParams.set('acesso',token);redirect.searchParams.set('v','6.66');
    let url=signup?B+'/auth/v1/signup?redirect_to='+encodeURIComponent(redirect.href):B+'/auth/v1/token?grant_type=password';
    let response=await tf(url,{method:'POST',headers:{apikey:K,'Content-Type':'application/json'},body:JSON.stringify({email,password})}),payload=await response.json();
    if(!response.ok){const friendly=clientAccessFriendlyErrorV666(payload,response.status,signup);if(friendly.mode)clientAccessModeV431=friendly.mode;return clientAccessAuthV666(friendly.text,friendly.kind)}
    if(signup&&!payload.access_token){clientAccessModeV431='login';return clientAccessAuthV666('Cadastro criado. Enviamos um e-mail de confirmação. Confirme esse e-mail e depois volte aqui em “Já tenho acesso”. Não é necessário cadastrar novamente.','confirm')}
    save(payload);S=payload;await claimClientPortalV432(token);await hydrate();
  }catch(error){clientAccessAuthV666('Não foi possível concluir agora. Tente novamente em alguns instantes.','error')}
  finally{clientAccessBusyV666=false}
}
clientAccessAuthV431=clientAccessAuthV666;
doClientAccessAuthV431=doClientAccessAuthV666;
const clientAccessV666Style=document.createElement('style');clientAccessV666Style.textContent=`.client-access-notice-v666{margin:0 0 16px;padding:12px 13px;border:1px solid #3a3a3a;border-radius:12px;background:#101010;color:#d7d7d7;font-size:11px;line-height:1.55}.client-access-notice-v666.confirm,.client-access-notice-v666.wait,.client-access-notice-v666.exists{border-color:#744018;background:#21150d;color:#ffd0ad}.client-access-notice-v666.error,.client-access-notice-v666.credentials{border-color:#673232;background:#211111;color:#ffb8b8}.client-access-card-v431 button:disabled{opacity:.58;cursor:not-allowed}`;document.head.appendChild(clientAccessV666Style);
// ===== FIM V6.66 =====
