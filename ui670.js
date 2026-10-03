/* COLAB 7.0 — consolidated operational product layer */
(function(){
  const validFormat=v=>['reel','carousel','story','static_post','video','ad_creative'].includes(String(v||''))?String(v):'static_post';
  const formatLabel=v=>{const x=String(v||'');return (!x||x==='undefined'||x==='null')?'Formato a definir':fmt(x)};
  const ownerName=id=>profile(id)?.display_name||'Sem responsável';
  const taskLabel=s=>({todo:'A fazer',doing:'Em andamento',approval:'Aguardando',done:'Concluída'})[s]||'A fazer';

  /* Banco de Ideias é flexível: revisar é opção, não pedágio. */
  window.sendIdeaToProductionV591=async function(id){
    const idea=(D.insights||[]).find(row=>row.id===id); if(!idea)return;
    if(!String(idea.title||'').trim())return toast('Dê um título para a ideia antes de enviar.');
    const b=ideaBriefV591(idea), now=new Date().toISOString(), owner=productionOwnerV591(), reviewer=reviewOwnerV591();
    try{
      const plan=await ensurePlan(idea.client_id,contentMonth);
      const format=validFormat(b.format);
      const payload={organization_id:M.organization_id,client_id:idea.client_id,title:idea.title,format,objective:b.objective||null,central_idea:b.narrative||null,editorial_pillar_id:b.editorial_pillar_id||null,cta:b.cta||null,reference_links:(b.reference_links||[]).filter(v=>/^https?:\/\//i.test(v)),publication_date:null,status:'editing',monthly_plan_id:plan?.id||null,created_by:S.user?.id,updated_at:now};
      const created=await api('/rest/v1/contents',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)}),content=created?.[0];
      if(!content?.id)throw Error('Não foi possível enviar para produção.');
      const slides=format==='carousel'?(b.slide_texts||[]):format==='reel'||format==='video'?[b.hook||'',b.scenes||'',b.narration||'']:format==='story'?[b.story_sequence||'']:[b.art_text||''];
      const brief={objective:b.objective||'',narrative:b.narrative||'',structure:b.structure||'',cta:b.cta||'',reference_links:b.reference_links||[],client_assets:b.materials||'',materials:b.materials||'',idea_notes:b.notes||''};
      await api('/rest/v1/content_team_workflow',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:idea.client_id,content_id:content.id,source_insight_id:idea.id,internal_status:'visual_production',assigned_to:owner,content_owner_id:idea.created_by||S.user?.id,design_owner_id:owner,reviewer_id:reviewer,next_action:workflowNextActionV591(content,'visual_production'),brief,slides,created_by:S.user?.id,stalled_since:now,updated_at:now})});
      await patch('client_insights',idea.id,{status:'converted',converted_content_id:content.id,updated_at:now});
      await workflowActivityV583(content,'created','Ideia enviada para produção',null,'visual_production',{source_idea_id:idea.id});
      contentClient=idea.client_id; clientHubTabsV563[idea.client_id]='workflow'; MD=null; await load(); render(); toast('Enviado para produção ✦');
    }catch(error){toast(error.message)}
  };

  window.ideaCardV591=function(idea){
    const b=ideaBriefV591(idea), converted=idea.status==='converted'||!!idea.converted_content_id;
    const meta=[pillar(b.editorial_pillar_id)?.name,formatLabel(b.format)].filter(Boolean);
    const summary=String(b.narrative||b.objective||idea.notes||'').trim();
    const assets=(D.insightAssets||[]).filter(a=>a.insight_id===idea.id);
    return '<article class="c7-idea">'+
      '<div class="c7-idea-main"><div class="c7-eyebrow">'+E(cl(idea.client_id)?.name||'Cliente')+(meta.length?' · '+E(meta.join(' · ')):'')+'</div>'+
      '<h3>'+E(idea.title||'Ideia sem título')+'</h3>'+
      (summary?'<p>'+E(summary.slice(0,180))+(summary.length>180?'…':'')+'</p>':'')+
      '<div class="c7-meta">'+(assets.length?'<span>▧ '+assets.length+' arquivo'+(assets.length===1?'':'s')+'</span>':'')+(idea.created_by?'<span>'+E(ownerName(idea.created_by))+'</span>':'')+'</div></div>'+
      '<div class="c7-idea-actions">'+
      '<button class="btn ghost small" data-v591-idea-edit="'+idea.id+'">Revisar / editar</button>'+
      (converted?'<button class="btn ghost small" data-v591-open-content="'+E(idea.converted_content_id||'')+'">Abrir produção →</button>':'<button class="btn pri small" data-v591-send-production="'+idea.id+'">Enviar para produção →</button>')+
      '<details class="c7-more"><summary>•••</summary><div><button type="button" data-v626-delete-idea="'+idea.id+'">Excluir ideia</button></div></details></div></article>';
  };

  window.ideasPage=function(){
    const all=(D.insights||[]), base=all.filter(i=>ideasClient==='all'||i.client_id===ideasClient), shown=base.filter(i=>(ideasStage==='all'||ideaStageOf(i)===ideasStage)&&(ideasType==='all'||i.insight_type===ideasType));
    return '<section class="c7-page"><header class="c7-pagehead"><div><small>BANCO DE IDEIAS</small><h2>Ideias</h2><p>Revise quando precisar. Se já estiver pronta para executar, mande direto para produção.</p></div><button class="btn pri" data-m="insightNewTeam">＋ Nova ideia</button></header>'+
      '<div class="c7-filterbar"><select id="ideasClient"><option value="all">Todos os clientes</option>'+D.clients.filter(c=>c.active).map(c=>'<option value="'+c.id+'" '+(ideasClient===c.id?'selected':'')+'>'+E(c.name)+'</option>').join('')+'</select><select id="ideasStage"><option value="all">Todas</option><option value="idea" '+(ideasStage==='idea'?'selected':'')+'>No banco</option><option value="creating" '+(ideasStage==='creating'?'selected':'')+'>Em produção</option><option value="used" '+(ideasStage==='used'?'selected':'')+'>Utilizadas</option></select></div>'+
      '<div class="c7-list">'+(shown.map(ideaCardV591).join('')||'<div class="c7-empty">Nenhuma ideia neste filtro.</div>')+'</div></section>';
  };

  window.homePage=function(){
    const tasks=(D.tasks||[]).filter(t=>t.status!=='done');
    const rows=methodActionRowsV647(), urgent=rows.filter(r=>r.urgent||r.due&&r.due<today()), mine=rows.filter(r=>r.owner===S.user?.id&&!r.waiting);
    const priorities=[...new Map([...urgent,...mine].map(r=>[r.kind+':'+r.id,r])).values()].slice(0,6);
    const pending=(D.approvals||[]).filter(a=>a.status==='pending').length, overdue=tasks.filter(t=>t.due_date&&t.due_date<today()).length;
    const first=(profile(S.user?.id)?.display_name||'Equipe').split(' ')[0];
    const row=r=>{const isTask=r.kind==='task',t=isTask?(D.tasks||[]).find(x=>x.id===r.id):null,client=cl(r.clientId)?.name||'Colab',owner=ownerName(r.owner),late=!!(r.due&&r.due<today()),attrs=isTask?'data-op="task-edit" data-id="'+E(r.id)+'"':'data-method-work="'+E(r.id)+'"';return '<button class="c7-workrow" '+attrs+'><span class="c7-mark '+(r.urgent?'hot':'')+'"></span><span class="c7-workcopy"><small>'+E(client)+' · '+E(isTask?taskLabel(t?.status):String(r.next||'Em andamento'))+'</small><b>'+E(r.title)+'</b></span><span class="c7-workmeta"><span>'+E(owner)+'</span><span class="'+(late?'late':'')+'">'+(r.due?(late?'Atrasada · ':'')+fmtDate(r.due):'')+'</span></span><span class="c7-arrow">→</span></button>'};
    const now=new Date(),days=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'],months=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'],dateLabel=days[now.getDay()]+', '+now.getDate()+' de '+months[now.getMonth()],hour=now.getHours(),greeting=hour<12?'Bom dia':hour<18?'Boa tarde':'Boa noite';const daily=[['“Tudo tem o seu tempo determinado.”','Eclesiastes 3:1'],['“Consagre ao Senhor tudo o que você faz.”','Provérbios 16:3'],['“A sabedoria é a coisa principal.”','Provérbios 4:7'],['“Seja forte e corajosa.”','Josué 1:9'],['“Que tudo seja feito com amor.”','1 Coríntios 16:14'],['“Os planos bem elaborados levam à fartura.”','Provérbios 21:5'],['“Há tempo para todo propósito.”','Eclesiastes 3:1']][now.getDay()];return '<section class="c7-page c7-home"><header class="c7-homehead c713-homehead"><div><small>'+E(dateLabel.toUpperCase())+'</small><h2>'+greeting+', '+E(first)+'.</h2><div class="c713-reflection"><i aria-hidden="true"></i><div class="c716-quote"><span>'+daily[0]+'</span><em>'+daily[1]+'</em></div></div></div><div class="c7-head-actions"><button class="btn ghost" data-m="taskQuickV5">＋ Demanda</button><button class="btn pri" data-m="ideaQuickV633">＋ Ideia</button></div></header>'+
      '<section class="c714-dashboard"><header><div><small>PAINEL DE HOJE</small><h3>Visão rápida</h3></div><span>O que pede atenção</span></header><div class="c7-kpis"><button data-method-focus="urgent"><b>'+urgent.length+'</b><span>Prioridades</span></button><button data-method-focus="overdue"><b>'+overdue+'</b><span>Atrasadas</span></button><button data-v="content"><b>'+pending+'</b><span>Aguardando cliente</span></button><button data-v="tasks"><b>'+tasks.length+'</b><span>Demandas abertas</span></button></div></section>'+
      '<section class="c7-section"><div class="c7-sectionhead"><div><small>AGORA</small><h3>Prioridades</h3></div><span>'+priorities.length+' itens</span></div><div class="c7-worklist">'+(priorities.map(row).join('')||'<div class="c7-empty">Tudo em dia por aqui.</div>')+'</div></section></section>';
  };

  window.tasksPage=function(){
    const rows=(D.tasks||[]).filter(t=>(taskClientFilter==='all'||t.client_id===taskClientFilter)&&(taskOwnerFilter==='all'||t.assigned_to===taskOwnerFilter)&&(taskServiceFilter==='all'||t.service===taskServiceFilter));
    const open=rows.filter(t=>t.status!=='done'), done=rows.filter(t=>t.status==='done');
    const card=t=>{const late=t.due_date&&t.due_date<today()&&t.status!=='done',client=cl(t.client_id)?.name||'Colab',owner=ownerName(t.assigned_to);return '<button class="c7-task c709-task" data-op="task-edit" data-id="'+E(t.id)+'"><span class="c7-mark '+(t.priority==='urgent'?'hot':'')+'"></span><span class="c7-workcopy"><small>'+E(client)+' <i>·</i> '+E(taskLabel(t.status))+'</small><b>'+E(t.title||'Demanda')+'</b><span class="c709-taskfoot"><em>'+E(owner)+'</em><em class="'+(late?'late':'')+'">'+(t.due_date?(late?'Atrasada · ':'')+fmtDate(t.due_date):'Prazo a definir')+'</em></span></span><span class="c7-arrow">→</span></button>'};
    return '<section class="c7-page"><header class="c7-pagehead"><div><small>OPERAÇÃO</small><h2>Demandas</h2><p>Tarefas da equipe. Conteúdo editorial fica no fluxo de Conteúdos.</p></div><button class="btn pri" data-m="taskQuickV5">＋ Nova demanda</button></header><div class="c7-filterbar"><select id="taskClientFilter"><option value="all">Todos os clientes</option>'+D.clients.filter(c=>c.active).map(c=>'<option value="'+c.id+'" '+(taskClientFilter===c.id?'selected':'')+'>'+E(c.name)+'</option>').join('')+'</select><select id="taskOwnerFilter"><option value="all">Toda a equipe</option>'+(D.profiles||[]).map(p=>'<option value="'+p.user_id+'" '+(taskOwnerFilter===p.user_id?'selected':'')+'>'+E(p.display_name)+'</option>').join('')+'</select></div><section class="c7-section"><div class="c7-sectionhead"><div><small>ABERTAS</small><h3>Em andamento</h3></div><span>'+open.length+'</span></div><div class="c7-worklist">'+(open.map(card).join('')||'<div class="c7-empty">Nenhuma demanda aberta.</div>')+'</div></section>'+(done.length?'<details class="c7-done"><summary>Concluídas · '+done.length+'</summary><div class="c7-worklist">'+done.slice(0,20).map(card).join('')+'</div></details>':'')+'</section>';
  };

  const oldCommercial=window.commercialPage;
  window.commercialPage=function(){const raw=D.opportunities||[],map=new Map();raw.forEach(x=>{const k=String(x.name||x.contact_name||x.email||x.phone||x.id).trim().toLowerCase().replace(/\s+/g,' '),p=map.get(k);if(!p||String(x.updated_at||x.created_at||'')>String(p.updated_at||p.created_at||''))map.set(k,x)});const original=D.opportunities;D.opportunities=[...map.values()];try{return oldCommercial()}finally{D.opportunities=original}};
  const productionInfo=idea=>{
    const b=ideaBriefV591(idea), f=String(b.format||'').toLowerCase();
    if(f==='reel'||f==='video')return {kind:'CAPTAÇÃO',format:f==='reel'?'REELS':'VÍDEO',icon:'▶',detail:''};
    if(f==='carousel')return {kind:'DESIGN',format:'CARROSSEL',icon:'▦',detail:(Number(b.slide_count||0)||'—')+' CARDS'};
    if(f==='static_post')return {kind:'DESIGN',format:'POST',icon:'◆',detail:'ARTE'};
    if(f==='story')return {kind:'STORIES',format:'STORY',icon:'▯',detail:''};
    return {kind:'A DEFINIR',format:'FORMATO',icon:'○',detail:''};
  };

  window.ideaCardV591=function(idea){
    const b=ideaBriefV591(idea), converted=idea.status==='converted'||!!idea.converted_content_id, p=productionInfo(idea);
    const summary=String(b.narrative||b.objective||idea.notes||'').trim(), assets=(D.insightAssets||[]).filter(a=>a.insight_id===idea.id);
    return '<article class="c701-idea">'+
      '<div class="c701-type '+(p.kind==='CAPTAÇÃO'?'capture':p.kind==='DESIGN'?'design':'')+'"><span>'+p.icon+'</span><small>'+E(p.kind)+'</small><b>'+E(p.format)+'</b>'+(p.detail?'<em>'+E(p.detail)+'</em>':'')+'</div>'+
      '<div class="c701-copy"><div class="c701-topline">'+E(pillar(b.editorial_pillar_id)?.name||'Sem linha editorial')+(assets.length?' · '+assets.length+' arquivo'+(assets.length===1?'':'s'):'')+'</div><h3>'+E(idea.title||'Ideia sem título')+'</h3>'+(summary?'<p>'+E(summary.slice(0,160))+(summary.length>160?'…':'')+'</p>':'')+'<small class="c701-author">'+E(ownerName(idea.created_by))+'</small></div>'+
      '<div class="c701-actions"><button class="btn ghost small" data-v591-idea-edit="'+idea.id+'">Revisar / editar</button>'+(converted?'<button class="btn ghost small" data-v591-open-content="'+E(idea.converted_content_id||'')+'">Abrir produção →</button>':'<button class="btn pri small" data-v591-send-production="'+idea.id+'">Enviar para produção →</button>')+'<button type="button" class="c709-delete" data-v626-delete-idea="'+idea.id+'" aria-label="Excluir ideia" title="Excluir ideia">×</button></div></article>';
  };

  // 7.11 — cards de ideias mobile-first, sem ações espremidas
  window.ideaCardV591=function(idea){
    const b=ideaBriefV591(idea),converted=idea.status==='converted'||!!idea.converted_content_id,p=productionInfo(idea),summary=String(b.narrative||b.objective||idea.notes||'').trim();
    return '<article class="c711-idea"><header><div class="c711-kind '+(p.kind==='CAPTAÇÃO'?'capture':'')+'"><span>'+p.icon+'</span><b>'+E(p.format)+'</b><small>'+E(p.kind)+(p.detail?' · '+p.detail:'')+'</small></div><button type="button" class="c711-x" data-v626-delete-idea="'+idea.id+'" aria-label="Excluir ideia">×</button></header>'+
      '<div class="c711-copy"><small>'+E(pillar(b.editorial_pillar_id)?.name||'SEM LINHA EDITORIAL')+'</small><h3>'+E(idea.title||'Ideia sem título')+'</h3>'+(summary?'<p>'+E(summary.slice(0,115))+(summary.length>115?'…':'')+'</p>':'')+'<em>'+E(ownerName(idea.created_by))+'</em></div>'+
      '<footer><button class="c711-edit" data-v591-idea-edit="'+idea.id+'">Editar</button>'+(converted?'<button class="c711-send done" data-v591-open-content="'+E(idea.converted_content_id||'')+'">Abrir produção →</button>':'<button class="c711-send" data-v591-send-production="'+idea.id+'">Enviar para produção →</button>')+'</footer></article>';
  };

  window.clientIdeasPaneV591=function(cid){
    const rows=ideaRowsV591(cid), active=rows.filter(r=>r.status!=='converted'&&!r.converted_content_id), sent=rows.filter(r=>r.status==='converted'||r.converted_content_id), selected=clientHubTabsV563[cid]==='ideas';
    const capture=active.filter(i=>['reel','video'].includes(String(ideaBriefV591(i).format||'').toLowerCase())).length;
    const design=active.filter(i=>['carousel','static_post'].includes(String(ideaBriefV591(i).format||'').toLowerCase())).length;
    return '<section class="panel v5-hub-wide c701-ideas-pane" id="ideas" '+(selected?'data-v563-active':'')+'><header class="c701-head"><div><small>BANCO DE IDEIAS</small><h2>Ideias para produzir</h2><p>O tipo de produção aparece antes de abrir cada conteúdo.</p></div><button class="btn pri" data-v591-new-idea="'+E(cid)+'">＋ Nova ideia</button></header><div class="c701-summary"><span><b>'+active.length+'</b> no banco</span><span><b>'+design+'</b> design</span><span><b>'+capture+'</b> captação</span></div><div class="c701-list">'+(active.map(ideaCardV591).join('')||'<div class="c7-empty">Nenhuma ideia aguardando produção.</div>')+'</div>'+(sent.length?'<details class="c701-history"><summary>Já enviadas para produção · '+sent.length+'</summary><div class="c701-list">'+sent.slice(0,12).map(ideaCardV591).join('')+'</div></details>':'')+'</section>';
  };
  window.clientWorkflowPaneV586=function(cid){
    const services=typeof clientActiveServicesV582==='function'?clientActiveServicesV582(cid):[];
    if(!services.includes('social_media')&&typeof clientWorkflowPaneBeforeV662==='function')return clientWorkflowPaneBeforeV662(cid);
    const client=cl(cid)||{}, items=clientWorkflowItemsV586(cid), active=clientHubTabsV563[cid]==='workflow';
    const tasks=(D.tasks||[]).filter(t=>t.client_id===cid&&t.status!=='done');
    const attentionItems=items.filter(x=>!['scheduled','published'].includes(workflowStageV583(workflowWorkV583(x.id))));
    const waiting=attentionItems.filter(x=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(x.id)))==='client');
    const urgentTasks=tasks.filter(t=>t.priority==='urgent'||(t.due_date&&t.due_date<today()));
    const actions=[];
    attentionItems.slice(0,5).forEach(x=>{const w=workflowWorkV583(x.id),s=workflowStageV583(w);actions.push('<button class="c703-action" data-contentopen="'+E(x.id)+'"><span class="c703-dot content"></span><div><small>CONTEÚDO · '+E(workflowStageLabelV583(s))+'</small><b>'+E(x.title||'Conteúdo')+'</b><em>'+E(w?.next_action||workflowStageLabelV583(s))+'</em></div><i>→</i></button>')});
    tasks.slice(0,4).forEach(t=>actions.push('<button class="c703-action" data-op="task-edit" data-id="'+E(t.id)+'"><span class="c703-dot '+((t.priority==='urgent'||(t.due_date&&t.due_date<today()))?'hot':'')+'"></span><div><small>DEMANDA'+(t.due_date?' · '+E(fmtDate(t.due_date)):'')+'</small><b>'+E(t.title||'Demanda')+'</b><em>'+E(taskLabel(t.status))+'</em></div><i>→</i></button>'));
    const ideas=(D.insights||[]).filter(i=>i.client_id===cid&&i.status!=='converted'&&!i.converted_content_id).length;
    return '<section class="c703-workspace" id="workflow" '+(active?'data-v563-active':'')+'><header class="c703-workhead"><div><small>VISÃO GERAL</small><h2>'+E(client.name||'Cliente')+'</h2><p>O que precisa acontecer agora.</p></div><div><button class="btn ghost" data-taskquick-client="'+E(cid)+'">＋ Demanda</button><button class="btn pri" data-v591-new-idea="'+E(cid)+'">＋ Conteúdo</button></div></header>'+
      ((attentionItems.length||tasks.length||ideas)?'<div class="c703-glance">'+
        (attentionItems.length?'<button data-client-tab="workflow"><b>'+attentionItems.length+'</b><span>em produção</span></button>':'')+
        (ideas?'<button data-client-tab="ideas"><b>'+ideas+'</b><span>ideias</span></button>':'')+
        (urgentTasks.length?'<button class="alert" data-client-tab="tasks"><b>'+urgentTasks.length+'</b><span>urgentes</span></button>':'')+
        (waiting.length?'<button data-client-tab="workflow"><b>'+waiting.length+'</b><span>com cliente</span></button>':'')+'</div>':'')+
      '<div class="c703-main"><div class="c703-title"><div><small>PRÓXIMOS PASSOS</small><h3>'+(actions.length?'Fila de trabalho':'Tudo em dia por aqui')+'</h3></div>'+(actions.length?'<span>'+actions.length+' itens</span>':'')+'</div>'+
      (actions.length?'<div class="c703-actions">'+actions.join('')+'</div>':'<div class="c703-clean-empty"><span>✓</span><div><b>Nenhuma pendência agora.</b><small>Novas demandas e conteúdos vão aparecer aqui quando precisarem de ação.</small></div></div>')+'</div></section>';
  };

  const c704Status=c=>{const s=String(c.status||'editing');return ({idea:'Ideia',script:'Roteiro',production:'Produção',editing:'Produção',approval:'Aguardando cliente',changes_requested:'Ajustes',approved:'Aprovado',scheduled:'Programado',published:'Publicado'})[s]||s};
  const c704Kind=c=>{const f=String(c.format||'static_post');return ['reel','video'].includes(f)?'VÍDEO':f==='carousel'?'CARROSSEL':f==='story'?'STORY':'POST'};
  const c704Thumb=c=>socialAssetV550(c,true);
  const c704Card=c=>'<article class="c704-piece" role="button" tabindex="0" data-contentopen="'+E(c.id)+'">'+c704Thumb(c)+'<span class="c704-piececopy"><small>'+E(c704Kind(c))+(c.publication_time?' · '+E(String(c.publication_time).slice(0,5)):'')+'</small><b>'+E(c.title||'Conteúdo')+'</b><em class="s-'+E(String(c.status||'editing'))+'">'+E(c704Status(c))+'</em></span><i class="c704-arrow">→</i></article>';

  function c704Calendar(items,month){
    const [y,m]=month.split('-').map(Number),days=new Date(y,m,0).getDate(),offset=(new Date(y,m-1,1).getDay()+6)%7,cells=[];
    for(let i=0;i<offset;i++)cells.push('<div class="c704-day blank"></div>');
    for(let d=1;d<=days;d++){const date=month+'-'+String(d).padStart(2,'0'),rows=items.filter(x=>x.publication_date===date);cells.push('<div class="c704-day '+(rows.length?'filled':'')+'"><strong>'+d+'</strong><div>'+rows.map(c704Card).join('')+'</div></div>')}
    return '<div class="c704-calwrap"><div class="c704-calendar"><div class="c704-week">'+['SEG','TER','QUA','QUI','SEX','SÁB','DOM'].map(x=>'<b>'+x+'</b>').join('')+'</div><div class="c704-days">'+cells.join('')+'</div></div></div>';
  }
  function c704Production(items){
    const groups=[['production','Em produção',['idea','script','production','editing']],['review','Revisão / cliente',['approval','changes_requested']],['ready','Prontos para programar',['approved']],['scheduled','Programados',['scheduled']],['done','Publicados',['published']]];
    return '<div class="c704-board">'+groups.map(g=>{const rows=items.filter(x=>g[2].includes(x.status));return '<section><header><b>'+g[1]+'</b><span>'+rows.length+'</span></header><div>'+rows.map(c704Card).join('')+(rows.length?'':'<p>Nenhum conteúdo</p>')+'</div></section>'}).join('')+'</div>';
  }
  function c704Approvals(items){
    const rows=(D.approvals||[]).filter(a=>items.some(c=>c.id===a.content_id)),active=items.filter(c=>['approval','changes_requested'].includes(c.status)),history=rows.filter(a=>a.status!=='pending').sort((a,b)=>String(b.decided_at||b.created_at||'').localeCompare(String(a.decided_at||a.created_at||''))).slice(0,8);
    return '<div class="c704-approvalgrid"><section><div class="c704-sectionhead"><div><small>AGORA</small><h3>Para revisar</h3></div><span>'+active.length+'</span></div><div class="c704-reviewlist">'+(active.map(c=>{const a=rows.find(x=>x.content_id===c.id&&x.status==='pending');return '<article>'+c704Thumb(c)+'<div><small>'+E(c704Kind(c))+'</small><h3>'+E(c.title||'Conteúdo')+'</h3><span class="c704-status">'+E(c704Status(c))+'</span></div><button class="btn pri small" '+(a?'data-ap="'+E(a.id)+'"':'data-contentopen="'+E(c.id)+'"')+'>Revisar →</button></article>'}).join('')||'<div class="c704-empty">Nenhum conteúdo aguardando revisão.</div>')+'</div></section><aside><div class="c704-sectionhead"><div><small>HISTÓRICO</small><h3>Decisões</h3></div></div>'+history.map(a=>{const c=items.find(x=>x.id===a.content_id)||a.contents||{};return '<button class="c704-history" data-contentopen="'+E(c.id||'')+'"><span class="'+(a.status==='approved'?'ok':'change')+'"></span><div><b>'+E(c.title||'Conteúdo')+'</b><small>'+(a.status==='approved'?'Aprovado':'Ajuste solicitado')+'</small></div></button>'}).join('')+'</aside></div>';
  }
  function c704Feed(items){const rows=items.filter(c=>!['story','stories'].includes(c.format)&&['approved','scheduled','published'].includes(c.status)).slice().sort((a,b)=>String(a.publication_date||'9999').localeCompare(String(b.publication_date||'9999')));return '<div class="c704-feedhead"><div><small>PRÉVIA</small><h3>Feed do mês</h3></div><span>'+rows.length+' peças</span></div><div class="c704-feed">'+rows.map(c=>'<article role="button" tabindex="0" data-contentopen="'+E(c.id)+'">'+c704Thumb(c)+'<span>'+E(c.title||'Conteúdo')+'</span></article>').join('')+'</div>'}

  const socialMonthItemsBefore707=socialMonthItemsV550;
  socialMonthItemsV550=function(cid,month){
    const base=socialMonthItemsBefore707(cid,month), ids=new Set(base.map(x=>x.id));
    const loose=(D.contents||[]).filter(x=>x.client_id===cid&&!x.publication_date&&!ids.has(x.id)&&!['published'].includes(x.status));
    return [...base,...loose].sort((a,b)=>String(a.publication_date||'9999').localeCompare(String(b.publication_date||'9999')));
  };

  window.contentPage=function(){
    const clients=(D.clients||[]).filter(c=>c.active&&hasClientService(c.id,'social_media'));if(!clients.some(c=>c.id===contentClient)&&clients[0])contentClient=clients[0].id;
    if(!['calendar','production','approvals','feed'].includes(contentMode))contentMode='calendar';
    const items=socialMonthItemsV550(contentClient,contentMonth),client=cl(contentClient)||{},dated=items.filter(c=>c.publication_date).length,review=items.filter(c=>['approval','changes_requested'].includes(c.status)).length,ready=items.filter(c=>['approved','scheduled'].includes(c.status)).length;
    let body=contentMode==='calendar'?c704Calendar(items,contentMonth):contentMode==='production'?c704Production(items):contentMode==='approvals'?c704Approvals(items):c704Feed(items);
    const undated=items.filter(c=>!c.publication_date);
    if(contentMode==='calendar'&&undated.length)body+='<details class="c704-undated"><summary>Sem data definida <span>'+undated.length+'</span></summary><div>'+undated.map(c704Card).join('')+'</div></details>';
    return '<section class="c704-shell"><header class="c704-head"><div><small>SOCIAL MEDIA · '+E(client.name||'CLIENTE')+'</small><h2>Conteúdos</h2><p>Planeje, produza, revise e publique olhando para as peças.</p></div><button class="btn pri" data-m="contentNew">＋ Novo conteúdo</button></header><div class="c704-controls"><div><select id="contentClient">'+clients.map(c=>'<option value="'+c.id+'" '+(c.id===contentClient?'selected':'')+'>'+E(c.name)+'</option>').join('')+'</select><input id="contentMonth" type="month" value="'+E(contentMonth)+'"></div><nav><button data-cmode="calendar" class="'+(contentMode==='calendar'?'on':'')+'">Calendário <span>'+dated+'</span></button><button data-cmode="production" class="'+(contentMode==='production'?'on':'')+'">Produção <span>'+items.length+'</span></button><button data-cmode="approvals" class="'+(contentMode==='approvals'?'on':'')+'">Aprovações <span>'+review+'</span></button><button data-cmode="feed" class="'+(contentMode==='feed'?'on':'')+'">Feed <span>'+ready+'</span></button></nav></div><main class="c704-main">'+body+'</main></section>';
  };

  // 7.08 — programação editorial: aprovado só entra no calendário após data + horário
  const c704StatusBefore708=c704Status;
  function c708ReadyPanel(items){
    const rows=items.filter(c=>c.status==='approved');
    return rows.length?'<section class="c708-ready"><header><div><small>PRONTOS PARA PROGRAMAR</small><h3>Aprovados pela cliente</h3><p>Defina data e horário para levar a publicação ao calendário.</p></div><b>'+rows.length+'</b></header><div>'+rows.map(c704Card).join('')+'</div></section>':'';
  }
  const bindBefore704=bind;
  bind=function(){
    bindBefore704();
    document.querySelectorAll('.c704-shell [data-contentopen],.c704-client [data-contentopen]').forEach(node=>{
      node.onclick=e=>{if(e.target.closest('select,a'))return;e.preventDefault();e.stopPropagation();MD={type:'contentDetail',id:node.dataset.contentopen};render()};
      node.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();MD={type:'contentDetail',id:node.dataset.contentopen};render()}};
    });
  };


  // 7.10 — central de conteúdo dentro da cliente: uma única arquitetura operacional
  const c710Mode={};
  function c710Approvals(items){
    const rows=items.filter(c=>c.status==='approval');
    return '<section class="c710-stage"><div class="c704-sectionhead"><div><small>COM A CLIENTE</small><h3>Aguardando aprovação</h3></div><span>'+rows.length+'</span></div><div class="c710-grid">'+(rows.map(c704Card).join('')||'<div class="c704-empty">Nenhum conteúdo aguardando aprovação.</div>')+'</div></section>';
  }
  function c710Adjustments(items){
    const rows=items.filter(c=>c.status==='changes_requested');
    return '<section class="c710-stage"><div class="c704-sectionhead"><div><small>AJUSTES</small><h3>Alterações solicitadas</h3></div><span>'+rows.length+'</span></div><div class="c710-grid">'+(rows.map(c704Card).join('')||'<div class="c704-empty">Nenhum ajuste pendente.</div>')+'</div></section>';
  }
  window.clientWorkflowPaneV586=function(cid){
    const services=typeof clientActiveServicesV582==='function'?clientActiveServicesV582(cid):[];
    if(!services.includes('social_media'))return oldClientWorkflow704(cid);
    const active=clientHubTabsV563[cid]==='workflow',client=cl(cid)||{},mode=c710Mode[cid]||'calendar';
    const items=(D.contents||[]).filter(x=>x.client_id===cid),monthItems=items.filter(x=>!x.publication_date||String(x.publication_date).slice(0,7)===contentMonth);
    const scheduled=monthItems.filter(x=>['scheduled','published'].includes(x.status)&&x.publication_date).length;
    const production=monthItems.filter(x=>['editing','production','script'].includes(x.status)).length;
    const approvals=monthItems.filter(x=>x.status==='approval').length;
    const adjustments=monthItems.filter(x=>x.status==='changes_requested').length;
    const approved=monthItems.filter(x=>x.status==='approved').length;
    let body=mode==='calendar'?c704Calendar(monthItems,contentMonth):mode==='production'?c704Production(monthItems):mode==='approvals'?c710Approvals(monthItems):mode==='adjustments'?c710Adjustments(monthItems):c704Feed(monthItems);
    if(mode==='calendar'){const ready=monthItems.filter(x=>x.status==='approved');if(ready.length)body=c708ReadyPanel(monthItems)+body}
    return '<section class="c710-client-content" id="workflow" '+(active?'data-v563-active':'')+'><header class="c710-head"><div><small>SOCIAL MEDIA · '+E(client.name||'CLIENTE')+'</small><h2>Conteúdos</h2><p>Da produção à publicação, cada peça no seu lugar.</p></div><button class="btn pri" data-m="contentNew">＋ Novo conteúdo</button></header>'+
      '<div class="c710-toolbar"><input class="c710-month" data-c710-month="'+E(cid)+'" type="month" value="'+E(contentMonth)+'"><nav>'+
      '<button data-c710-mode="calendar" data-cid="'+E(cid)+'" class="'+(mode==='calendar'?'on':'')+'">Calendário <span>'+scheduled+'</span></button>'+
      '<button data-c710-mode="production" data-cid="'+E(cid)+'" class="'+(mode==='production'?'on':'')+'">Produção <span>'+production+'</span></button>'+
      '<button data-c710-mode="approvals" data-cid="'+E(cid)+'" class="'+(mode==='approvals'?'on':'')+'">Aprovações <span>'+approvals+'</span></button>'+
      '<button data-c710-mode="adjustments" data-cid="'+E(cid)+'" class="'+(mode==='adjustments'?'on':'')+'">Ajustes <span>'+adjustments+'</span></button>'+
      '<button data-c710-mode="feed" data-cid="'+E(cid)+'" class="'+(mode==='feed'?'on':'')+'">Feed <span>'+approved+'</span></button></nav></div>'+
      '<main class="c710-body">'+body+'</main></section>';
  };
  const bindBefore710=bind;
  bind=function(){
    bindBefore710();
    document.querySelectorAll('[data-c710-mode]').forEach(b=>b.onclick=()=>{c710Mode[b.dataset.cid]=b.dataset.c710Mode;render()});
    document.querySelectorAll('[data-c710-month]').forEach(input=>input.onchange=()=>{contentMonth=input.value;render()});
    document.querySelectorAll('.c710-client-content [data-contentopen]').forEach(node=>node.onclick=e=>{if(e.target.closest('select,a'))return;e.preventDefault();MD={type:'contentDetail',id:node.dataset.contentopen};render()});
  };

  const oldClientWorkflow704=window.clientWorkflowPaneV586;
  window.clientWorkflowPaneLegacy704=function(cid){
    const services=typeof clientActiveServicesV582==='function'?clientActiveServicesV582(cid):[];if(!services.includes('social_media'))return oldClientWorkflow704(cid);
    const active=clientHubTabsV563[cid]==='workflow',items=clientWorkflowItemsV586(cid),client=cl(cid)||{},monthItems=items.filter(c=>String(c.publication_date||c.created_at||'').slice(0,7)===contentMonth||!c.publication_date);
    const focus=monthItems.filter(c=>!['published'].includes(c.status)).slice(0,6);
    return '<section class="c704-client" id="workflow" '+(active?'data-v563-active':'')+'><header><div><small>SOCIAL MEDIA</small><h2>'+E(client.name||'Cliente')+'</h2><p>Conteúdo e calendário no centro da operação.</p></div><button class="btn pri" data-clientmodule="social_media" data-client="'+E(cid)+'">Abrir Conteúdos →</button></header><div class="c704-clientpieces">'+focus.map(c704Card).join('')+(focus.length?'':'<div class="c704-empty">Nenhum conteúdo em andamento agora.</div>')+'</div></section>';
  };
})();
  // 7.06 — topbar enxuta: sino + menu; remove vitrine/refresh da rotina
  const shellBefore706=shell;
  shell=function(body,client=false){
    const result=shellBefore706(body,client);
    if(client||showcaseV5)return result;
    document.getElementById('showcaseV5')?.remove();
    document.getElementById('ref')?.remove();
    const central=document.getElementById('centralV5');
    if(central){
      central.classList.add('c706-menu');
      central.setAttribute('title','Menu / Central');
      central.setAttribute('aria-label','Abrir menu e Central');
      central.innerHTML='<span></span><span></span><span></span>';
    }
    const actions=document.querySelector('.topactions');
    if(actions&&central&&document.getElementById('bell')){
      actions.append(document.getElementById('bell'));
      actions.append(central);
    }
    return result;
  };

  // 7.17 — painel operacional da Visão geral
  function c717Overview(cid){
    const client=cl(cid)||{};
    const all=(D.contents||[]).filter(x=>x.client_id===cid);
    const live=all.filter(x=>x.status!=='published').sort((a,b)=>String(b.updated_at||b.created_at||'').localeCompare(String(a.updated_at||a.created_at||''))).slice(0,4);
    const ideas=(D.insights||[]).filter(i=>i.client_id===cid&&i.status!=='converted'&&!i.converted_content_id).slice(0,3);
    const waiting=all.filter(x=>x.status==='approval').length;
    const adjust=all.filter(x=>x.status==='changes_requested').length;
    return '<section class="c717-overview" id="overview" data-v563-active><header class="c717-overhead"><div><small>VISÃO GERAL · '+E(client.name||'CLIENTE')+'</small><h2>Operação agora</h2></div><button class="btn pri" data-m="contentNew">＋ Conteúdo</button></header><div class="c717-radar"><button data-client-tab="workflow"><b>'+live.length+'</b><span>em andamento</span></button><button data-client-tab="workflow"><b>'+waiting+'</b><span>com cliente</span></button><button data-client-tab="workflow"><b>'+adjust+'</b><span>ajustes</span></button><button data-client-tab="ideas"><b>'+ideas.length+'</b><span>ideias</span></button></div><section class="c717-block"><div class="c717-title"><div><small>CONTEÚDOS</small><h3>Em andamento</h3></div><button data-client-tab="workflow">Ver todos →</button></div><div class="c717-content-grid">'+(live.map(c704Card).join('')||'<div class="c704-empty">Nenhum conteúdo em andamento.</div>')+'</div></section><section class="c717-block ideas"><div class="c717-title"><div><small>BANCO DE IDEIAS</small><h3>Ideias para produzir</h3></div><button data-client-tab="ideas">Ver banco →</button></div><div class="c717-idea-grid">'+(ideas.map(ideaCardV591).join('')||'<div class="c704-empty">Nenhuma ideia aguardando produção.</div>')+'</div></section></section>';
  }
  const clientHubBefore717=clientHubPageV5;
  clientHubPageV5=function(cid){
    let html=clientHubBefore717(cid);
    if(clientHubTabsV563[cid]!=='overview')return html;
    html=html.split(' data-v563-active').join('');
    const overview=c717Overview(cid).replace(' data-v563-active','');
    const nav=/(<nav class="v591-client-nav"[\\s\\S]*?<\\/nav>)/;
    if(nav.test(html)){
      html=html.replace(nav,'$1'+overview);
    }else{
      const marker='<div class="v5-hub-grid v563-client-panes">';
      if(html.includes(marker))html=html.replace(marker,overview+marker);
    }
    return html;
  };

// 7.18 — auditoria: navegação consolidada + Demandas visual final
const bindBefore718=bind;
bind=function(){
  bindBefore718();
  document.querySelectorAll('.v591-client-nav [data-client-tab],.c717-overview [data-client-tab]').forEach(button=>{
    button.onclick=function(e){
      e.preventDefault();e.stopPropagation();
      if(!clientHubIdV5)return;
      clientHubTabsV563[clientHubIdV5]=button.dataset.clientTab;
      MD=null;render();
    };
  });
};

window.tasksPage=function(){
  const rows=(D.tasks||[]).filter(t=>(taskClientFilter==='all'||t.client_id===taskClientFilter)&&(taskOwnerFilter==='all'||t.assigned_to===taskOwnerFilter)&&(taskServiceFilter==='all'||t.service===taskServiceFilter));
  const open=rows.filter(t=>t.status!=='done'),done=rows.filter(t=>t.status==='done');
  const urgent=open.filter(t=>t.priority==='urgent'||(t.due_date&&t.due_date<today()));
  const mine=open.filter(t=>t.assigned_to===S.user?.id);
  const card=t=>{const late=t.due_date&&t.due_date<today()&&t.status!=='done',urgent=t.priority==='urgent',client=cl(t.client_id)?.name||'Colab',owner=ownerName(t.assigned_to);return '<button class="c718-task '+(urgent?'urgent ':'')+(late?'overdue':'')+'" data-op="task-edit" data-id="'+E(t.id)+'"><span class="c718-tasktop"><small>'+E(client)+'</small><em>'+E(taskLabel(t.status))+'</em></span><b>'+E(t.title||'Demanda')+'</b><span class="c718-taskmeta"><i class="person">'+E(owner)+'</i><i class="'+(late?'late':'')+'">'+(t.due_date?(late?'Atrasada · ':'')+fmtDate(t.due_date):'Prazo a definir')+'</i></span><span class="c718-go">→</span></button>'};
  return '<section class="c7-page c718-tasks"><header class="c718-head"><div><small>OPERAÇÃO</small><h2>Demandas</h2><p>O que a equipe precisa resolver fora do fluxo editorial.</p></div><button class="btn pri" data-m="taskQuickV5">＋ Nova demanda</button></header>'+
  '<div class="c718-stats"><span><b>'+open.length+'</b> abertas</span><span><b>'+mine.length+'</b> comigo</span><span class="'+(urgent.length?'hot':'')+'"><b>'+urgent.length+'</b> prioridade'+(urgent.length===1?'':'s')+'</span></div>'+
  '<div class="c718-filters"><select id="taskClientFilter"><option value="all">Todos os clientes</option>'+D.clients.filter(c=>c.active).map(c=>'<option value="'+c.id+'" '+(taskClientFilter===c.id?'selected':'')+'>'+E(c.name)+'</option>').join('')+'</select><select id="taskOwnerFilter"><option value="all">Toda a equipe</option>'+(D.profiles||[]).map(p=>'<option value="'+p.user_id+'" '+(taskOwnerFilter===p.user_id?'selected':'')+'>'+E(p.display_name)+'</option>').join('')+'</select></div>'+
  '<section class="c718-open"><div class="c718-sectionhead"><div><small>AGORA</small><h3>Em andamento</h3></div><span>'+open.length+'</span></div><div class="c718-list">'+(open.map(card).join('')||'<div class="c718-empty"><b>✓</b><span>Nenhuma demanda aberta.</span></div>')+'</div></section>'+
  (done.length?'<details class="c718-done"><summary><span>Concluídas</span><b>'+done.length+'</b></summary><div class="c718-list">'+done.slice(0,20).map(card).join('')+'</div></details>':'')+'</section>';
};

// 7.19 — hotfix estrutural: Visão geral é uma aba real do hub
if(!clientHubTabDefsV563.some(item=>item[0]==='overview')){
  clientHubTabDefsV563.unshift(['overview','Visão geral']);
}

// 7.20 — navegação do hub por delegação: não depende do ciclo de bind/render
if(!window.__colabClientTabDelegation720){
  window.__colabClientTabDelegation720=true;
  document.addEventListener('click',function(e){
    const button=e.target.closest('.v591-client-nav [data-client-tab],.c717-overview [data-client-tab]');
    if(!button||!clientHubIdV5)return;
    e.preventDefault();e.stopImmediatePropagation();
    clientHubTabsV563[clientHubIdV5]=button.dataset.clientTab;
    MD=null;
    render();
  },true);
}

// 7.22 — camada final do hub: overview só é inserido depois de TODOS os wrappers legados
const clientHubFinalBefore722=clientHubPageV5;
clientHubPageV5=function(cid){
  let html=clientHubFinalBefore722(cid);
  if(clientHubTabsV563[cid]!=='overview')return html;
  // esconde qualquer painel legado ativo; a visão geral fica fora do grid legado
  html=html.replace(/ data-v563-active/g,'');
  const overview=c717Overview(cid).replace(' data-v563-active','');
  if(html.includes('class="c717-overview"'))return html;
  const navEnd=/<nav class="v591-client-nav"[\s\S]*?<\/nav>/;
  if(navEnd.test(html))return html.replace(navEnd,m=>m+overview);
  // fallback seguro caso outro wrapper troque a tag nav
  const grid='<div class="v5-hub-grid v563-client-panes">';
  return html.includes(grid)?html.replace(grid,overview+grid):html+overview;
};

// 7.23 — Visão geral usa exatamente as coleções oficiais de Ideias/Workflow
c717Overview=function(cid){
  const client=cl(cid)||{};
  const all=(D.contents||[]).filter(x=>x.client_id===cid);
  const live=all.filter(x=>x.status!=='published').sort((a,b)=>String(b.updated_at||b.created_at||'').localeCompare(String(a.updated_at||a.created_at||'')));
  const ideaAll=typeof ideaRowsV591==='function'?ideaRowsV591(cid):(D.insights||[]).filter(i=>i.client_id===cid&&i.insight_type==='idea');
  const ideas=ideaAll.filter(i=>i.status!=='converted'&&!i.converted_content_id);
  const waiting=all.filter(x=>x.status==='approval').length;
  const adjust=all.filter(x=>x.status==='changes_requested').length;
  return '<section class="c717-overview" id="overview"><header class="c717-overhead"><div><small>VISÃO GERAL · '+E(client.name||'CLIENTE')+'</small><h2>Operação agora</h2></div><button class="btn pri" data-m="contentNew">＋ Conteúdo</button></header>'+
  '<div class="c717-radar"><button data-client-tab="workflow"><b>'+live.length+'</b><span>em andamento</span></button><button data-client-tab="workflow"><b>'+waiting+'</b><span>com cliente</span></button><button data-client-tab="workflow"><b>'+adjust+'</b><span>ajustes</span></button><button data-client-tab="ideas"><b>'+ideas.length+'</b><span>ideias</span></button></div>'+
  '<section class="c717-block"><div class="c717-title"><div><small>CONTEÚDOS</small><h3>Em andamento</h3></div><button data-client-tab="workflow">Ver todos →</button></div><div class="c717-content-grid">'+(live.slice(0,4).map(c704Card).join('')||'<div class="c704-empty">Nenhum conteúdo em andamento.</div>')+'</div></section>'+
  '<section class="c717-block ideas"><div class="c717-title"><div><small>BANCO DE IDEIAS</small><h3>Ideias para produzir</h3></div><button data-client-tab="ideas">Ver banco →</button></div><div class="c717-idea-grid">'+(ideas.slice(0,3).map(ideaCardV591).join('')||'<div class="c704-empty">Nenhuma ideia aguardando produção.</div>')+'</div></section></section>';
};
