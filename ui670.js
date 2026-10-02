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
    return '<section class="c7-page c7-home"><header class="c7-homehead"><div><small>COLAB OPERACIONAL</small><h2>Olá, '+E(first)+'.</h2><p>O que precisa de atenção agora.</p></div><div class="c7-head-actions"><button class="btn ghost" data-m="taskQuickV5">＋ Demanda</button><button class="btn pri" data-m="ideaQuickV633">＋ Ideia</button></div></header>'+
      '<div class="c7-kpis"><button data-method-focus="urgent"><b>'+urgent.length+'</b><span>Prioridades</span></button><button data-method-focus="overdue"><b>'+overdue+'</b><span>Atrasadas</span></button><button data-v="content"><b>'+pending+'</b><span>Aguardando cliente</span></button><button data-v="tasks"><b>'+tasks.length+'</b><span>Demandas abertas</span></button></div>'+
      '<section class="c7-section"><div class="c7-sectionhead"><div><small>AGORA</small><h3>Prioridades</h3></div><span>'+priorities.length+' itens</span></div><div class="c7-worklist">'+(priorities.map(row).join('')||'<div class="c7-empty">Tudo em dia por aqui.</div>')+'</div></section></section>';
  };

  window.tasksPage=function(){
    const rows=(D.tasks||[]).filter(t=>(taskClientFilter==='all'||t.client_id===taskClientFilter)&&(taskOwnerFilter==='all'||t.assigned_to===taskOwnerFilter)&&(taskServiceFilter==='all'||t.service===taskServiceFilter));
    const open=rows.filter(t=>t.status!=='done'), done=rows.filter(t=>t.status==='done');
    const card=t=>{const late=t.due_date&&t.due_date<today()&&t.status!=='done';return '<button class="c7-task" data-op="task-edit" data-id="'+E(t.id)+'"><span class="c7-mark '+(t.priority==='urgent'?'hot':'')+'"></span><span class="c7-workcopy"><small>'+E(cl(t.client_id)?.name||'Colab')+' · '+E(taskLabel(t.status))+'</small><b>'+E(t.title||'Demanda')+'</b></span><span class="c7-workmeta"><span>'+E(ownerName(t.assigned_to))+'</span><span class="'+(late?'late':'')+'">'+(t.due_date?(late?'Atrasada · ':'')+fmtDate(t.due_date):'Sem prazo')+'</span></span><span class="c7-arrow">→</span></button>'};
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
      '<div class="c701-actions"><button class="btn ghost small" data-v591-idea-edit="'+idea.id+'">Revisar / editar</button>'+(converted?'<button class="btn ghost small" data-v591-open-content="'+E(idea.converted_content_id||'')+'">Abrir produção →</button>':'<button class="btn pri small" data-v591-send-production="'+idea.id+'">Enviar para produção →</button>')+'<details class="c7-more"><summary>•••</summary><div><button type="button" data-v626-delete-idea="'+idea.id+'">Excluir ideia</button></div></details></div></article>';
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
})();