/* COLAB hubfix 7.32 — isolated client workspace layer */
(function(){
  const tabs=[['overview','Visão geral'],['ideas','Ideias'],['workflow','Conteúdos'],['tasks','Demandas'],['agenda','Agenda'],['files','Arquivos'],['more','Mais']];
  function activeTab(cid){return (clientHubTabsV563&&clientHubTabsV563[cid])||'overview'}
  function navHtml(cid){
    const active=activeTab(cid);
    return '<nav class="v591-client-nav c732-nav">'+tabs.map(([key,label])=>{
      const on=key==='more'?['services','contact','forms','finance','history','more','strategy','recording'].includes(active):active===key;
      return '<button type="button" class="'+(on?'on':'')+'" data-client-tab="'+key+'">'+label+'</button>'
    }).join('')+'</nav>'
  }
  if(typeof clientNavV591==='function'){
    clientNavV591=function(cid){return navHtml(cid)}
  }
  const pageBefore=typeof clientHubPageV5==='function'?clientHubPageV5:null;
  if(pageBefore){
    clientHubPageV5=function(cid){
      let html=pageBefore(cid);
      html=html.replace(/<nav class="v591-client-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/,navHtml(cid));
      return html
    }
  }
  function repair(){
    if(typeof V==='undefined'||V!=='clientHub'||!clientHubIdV5)return;
    const root=document.querySelector('.main')||document;
    const nav=root.querySelector('.v591-client-nav');
    if(nav&&nav.outerHTML!==navHtml(clientHubIdV5))nav.outerHTML=navHtml(clientHubIdV5);
    const active=activeTab(clientHubIdV5);
    if(active==='overview'){
      root.querySelectorAll('.v582-services-overview,.v604-client-overview,.v662-client-overview').forEach(el=>el.remove());
      root.querySelectorAll('.v5-hub-grid.v563-client-panes').forEach(grid=>{
        const visible=[...grid.children].some(el=>el.matches?.('[data-v563-active]'));
        if(!visible)grid.style.display='none'
      });
      [...root.querySelectorAll('section,article')].forEach(el=>{
        const txt=(el.textContent||'').replace(/\s+/g,' ').trim();
        if(txt.includes('SERVIÇOS ATIVOS')&&txt.includes('Operação por cliente'))el.remove();
        if(txt.includes('com você')&&txt.includes('urgentes')&&txt.includes('atrasadas')&&txt.includes('com a cliente')&&txt.includes('+ Demanda'))el.remove();
      });
    }
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest('.c732-nav [data-client-tab]');
    if(!b||!clientHubIdV5)return;
    e.preventDefault();e.stopImmediatePropagation();
    clientHubTabsV563[clientHubIdV5]=b.dataset.clientTab;
    MD=null;render();
  },true);
  const oldBind=typeof bind==='function'?bind:null;
  if(oldBind)bind=function(){oldBind();repair();requestAnimationFrame(repair)};
  document.addEventListener('DOMContentLoaded',repair);
  setTimeout(repair,0);
})();
/* COLAB 7.33 — Idea cards: one compact action footer, no duplicate destructive actions */
(function(){
  const formatName=v=>({reel:'Reels',carousel:'Carrossel',story:'Stories',static_post:'Post',video:'Vídeo',ad_creative:'Criativo'})[String(v||'')]||'Formato a definir';
  window.ideaCardV591=function(idea){
    const b=ideaBriefV591(idea), missing=ideaMissingV591(idea)||[], ready=!missing.length;
    const converted=idea.status==='converted'||!!idea.converted_content_id;
    const p=typeof pillar==='function'?pillar(b.editorial_pillar_id):null;
    const summary=String(b.narrative||b.objective||idea.notes||'').trim();
    const status=converted?'Em produção':ready?'Pronta':'Revisar';
    const statusClass=converted||ready?'ready':'draft';
    const meta=(p?.name?p.name+' · ':'')+formatName(b.format);
    const missingText=missing.length?'Falta preencher: '+missing.join(' · '):'';
    return '<article class="v591-idea-card c733-idea '+(ready?'ready ':'')+(converted?'converted':'')+'">'+
      '<div class="v591-idea-card-head c733-head"><div><small>'+E(meta)+'</small><h3>'+E(idea.title||'Ideia sem título')+'</h3></div><span class="'+statusClass+'">'+status+'</span></div>'+
      (summary?'<p class="c733-summary">'+E(summary.slice(0,180))+(summary.length>180?'…':'')+'</p>':'')+
      (!ready&&!converted?'<div class="c733-missing">'+E(missingText)+'</div>':'')+
      '<div class="v591-idea-actions c733-actions">'+
        '<button type="button" class="btn ghost small" data-v591-idea-edit="'+idea.id+'">Revisar / editar</button>'+
        (converted?
          '<button type="button" class="btn ghost small" data-v591-open-content="'+E(idea.converted_content_id||'')+'">Abrir produção →</button>':
          '<button type="button" class="btn pri small" data-v591-send-production="'+idea.id+'" '+(ready?'':'disabled aria-disabled="true"')+'>Enviar para produção →</button>')+
        '<details class="c733-more"><summary aria-label="Mais opções">•••</summary><div><button type="button" data-v626-delete-idea="'+idea.id+'">'+(converted?'Excluir do Banco de Ideias':'Excluir ideia')+'</button></div></details>'+
      '</div></article>';
  };
  const css=document.createElement('style');
  css.id='c733-idea-style';
  css.textContent=`
    .c733-idea{padding:18px!important;border:1px solid #292929!important;border-radius:18px!important;background:#111!important;min-height:0!important;display:grid!important;gap:13px!important}
    .c733-head{align-items:flex-start!important;gap:12px!important}.c733-head>div{min-width:0!important}.c733-head small{display:block!important;color:#ff6a00!important;font-size:9px!important;line-height:1.2!important;letter-spacing:.08em!important;text-transform:uppercase!important}.c733-head h3{margin:7px 0 0!important;font-size:20px!important;line-height:1.18!important}
    .c733-head>span{flex:0 0 auto!important;padding:6px 9px!important;border-radius:999px!important;background:#201c14!important;color:#caa65c!important;font-size:8px!important;letter-spacing:.06em!important;text-transform:uppercase!important}
    .c733-head>span.ready{background:#16241a!important;color:#7fbd8d!important}
    .c733-summary{margin:0!important;color:#929292!important;font-size:13px!important;line-height:1.45!important}
    .c733-missing{margin:0!important;padding:8px 10px!important;border-left:2px solid #8d633b!important;background:#17130f!important;color:#b99778!important;font-size:9px!important;line-height:1.35!important}
    .c733-actions{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1.45fr) 38px!important;gap:8px!important;align-items:stretch!important;margin:0!important}
    .c733-actions>.btn{width:100%!important;min-height:44px!important;margin:0!important;padding:9px 11px!important;border-radius:11px!important;font-size:11px!important;line-height:1.15!important}
    .c733-actions>.btn[disabled]{background:#1a1a1a!important;border-color:#292929!important;color:#666!important;box-shadow:none!important;cursor:not-allowed!important;opacity:1!important}
    .c733-more{position:relative!important;margin:0!important}.c733-more>summary{display:grid!important;place-items:center!important;width:38px!important;height:44px!important;border:1px solid #2e2e2e!important;border-radius:11px!important;background:#121212!important;color:#999!important;cursor:pointer!important;list-style:none!important}.c733-more>summary::-webkit-details-marker{display:none!important}
    .c733-more>div{position:absolute!important;right:0!important;bottom:50px!important;z-index:30!important;width:150px!important;padding:6px!important;border:1px solid #333!important;border-radius:10px!important;background:#171717!important;box-shadow:0 12px 30px #0009!important}.c733-more button{width:100%!important;padding:10px!important;border:0!important;border-radius:7px!important;background:transparent!important;color:#d88984!important;text-align:left!important;font-size:10px!important}
    .c733-idea>.v626-delete-idea,.c733-idea>.v591-missing{display:none!important}
    @media(max-width:760px){.c733-idea{padding:15px!important;border-radius:16px!important;gap:11px!important}.c733-head h3{font-size:18px!important}.c733-summary{font-size:12px!important}.c733-actions{grid-template-columns:minmax(0,1fr) minmax(0,1.35fr) 36px!important}.c733-actions>.btn{min-height:42px!important;padding:8px!important;font-size:10px!important}.c733-more>summary{width:36px!important;height:42px!important}}
  `;
  document.head.appendChild(css);
})();

/* COLAB 7.34 — content cards always open from client overview */
(function(){
  function openContent734(id){
    if(!id)return;
    const content=(D.contents||[]).find(row=>String(row.id)===String(id));
    if(!content){if(typeof toast==='function')toast('Conteúdo não encontrado.');return}
    MD={type:'contentDetail',id:content.id};
    render();
  }
  document.addEventListener('click',function(e){
    if(typeof V!=='undefined'&&V!=='clientHub')return;
    const card=e.target.closest('[data-contentopen]');
    if(card){
      if(e.target.closest('a,select,input,textarea,label,[data-ap],.c736-content-more,[data-contentdelete],[data-c736-delete],[data-c736-delete-content]'))return;
      e.preventDefault();e.stopImmediatePropagation();
      openContent734(card.dataset.contentopen);
      return;
    }
    const workflow=e.target.closest('[data-v604-workflow]');
    if(workflow){
      e.preventDefault();e.stopImmediatePropagation();
      openContent734(workflow.dataset.v604Workflow);
    }
  },true);
  document.addEventListener('keydown',function(e){
    if(typeof V!=='undefined'&&V!=='clientHub')return;
    if(e.key!=='Enter'&&e.key!==' ')return;
    const card=e.target.closest('[data-contentopen]');
    if(!card)return;
    e.preventDefault();openContent734(card.dataset.contentopen);
  },true);
})();

/* COLAB 7.35 — remove visual noise from Home + Demandas */
(function(){
  const esc=v=>typeof E==='function'?E(v==null?'':String(v)):String(v==null?'':v);
  const who=id=>{try{return (typeof profile==='function'&&profile(id)?.display_name)||'Sem responsável'}catch(_){return 'Sem responsável'}};
  const clientName=id=>{try{return (typeof cl==='function'&&cl(id)?.name)||'Colab'}catch(_){return 'Colab'}};
  const dateShort=v=>{try{return v&&typeof fmtDate==='function'?fmtDate(v):''}catch(_){return ''}};
  const tdy=()=>{try{return typeof today==='function'?today():new Date().toISOString().slice(0,10)}catch(_){return new Date().toISOString().slice(0,10)}};
  const taskState=s=>({todo:'A fazer',doing:'Em andamento',approval:'Aguardando',done:'Concluída'})[s]||'A fazer';

  window.homePage=function(){
    const tasks=(D.tasks||[]).filter(t=>t.status!=='done');
    const overdue=tasks.filter(t=>t.due_date&&t.due_date<tdy()).length;
    const urgent=tasks.filter(t=>t.priority==='urgent').length;
    const waiting=(D.contents||[]).filter(c=>c.status==='approval').length;
    let rows=[];
    try{rows=(typeof methodActionRowsV647==='function'?methodActionRowsV647():[]).filter(r=>r&&!r.done)}catch(_){rows=[]}
    if(!rows.length) rows=tasks.map(t=>({kind:'task',id:t.id,title:t.title,clientId:t.client_id,owner:t.assigned_to,due:t.due_date,urgent:t.priority==='urgent',next:taskState(t.status)}));
    rows=rows.slice().sort((a,b)=>(b.urgent?1:0)-(a.urgent?1:0)||String(a.due||'9999').localeCompare(String(b.due||'9999'))).slice(0,5);
    const first=((typeof profile==='function'&&profile(S.user?.id)?.display_name)||'Equipe').split(' ')[0];
    const now=new Date(),dias=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'],meses=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    const dateLabel=dias[now.getDay()]+', '+now.getDate()+' de '+meses[now.getMonth()];
    const verse=[['Tudo tem o seu tempo determinado.','Eclesiastes 3:1'],['Consagre ao Senhor tudo o que você faz.','Provérbios 16:3'],['A sabedoria é a coisa principal.','Provérbios 4:7'],['Seja forte e corajosa.','Josué 1:9'],['Que tudo seja feito com amor.','1 Coríntios 16:14'],['Os planos bem elaborados levam à fartura.','Provérbios 21:5'],['Há tempo para todo propósito.','Eclesiastes 3:1']][now.getDay()];
    const card=r=>{
      const isTask=r.kind==='task';
      const attrs=isTask?'data-op="task-edit" data-id="'+esc(r.id)+'"':'data-method-work="'+esc(r.id)+'"';
      const late=!!(r.due&&r.due<tdy());
      return '<button class="c735-priority '+(r.urgent?'urgent':'')+'" '+attrs+'>'+
        '<div class="c735-priority-top"><span>'+esc(clientName(r.clientId))+'</span><em>'+esc(String(r.next||'Em andamento'))+'</em></div>'+
        '<h3>'+esc(r.title||'Item')+'</h3>'+
        '<div class="c735-priority-foot"><span>'+esc(who(r.owner))+'</span><b class="'+(late?'late':'')+'">'+(r.due?(late?'Atrasada · ':'')+esc(dateShort(r.due)):'')+'</b></div>'+
      '</button>'
    };
    return '<section class="c735-home">'+
      '<header class="c735-homehead"><div><small>'+esc(dateLabel.toUpperCase())+'</small><h1>Olá, '+esc(first)+'.</h1><p>'+esc(verse[0])+' <span>'+esc(verse[1])+'</span></p></div><div class="c735-quick"><button class="btn pri" data-m="taskQuickV5">＋ Demanda</button><button class="btn ghost" data-m="ideaQuickV633">＋ Conteúdo</button></div></header>'+
      '<div class="c735-signals">'+
        (urgent?'<button data-v="tasks"><b>'+urgent+'</b><span>Urgentes</span></button>':'')+
        (overdue?'<button data-v="tasks"><b>'+overdue+'</b><span>Atrasadas</span></button>':'')+
        (waiting?'<button data-v="content"><b>'+waiting+'</b><span>Com cliente</span></button>':'')+
      '</div>'+
      '<section class="c735-section"><header><div><small>TRABALHO AGORA</small><h2>Prioridades</h2></div><span>'+rows.length+'</span></header><div class="c735-priority-grid">'+(rows.map(card).join('')||'<div class="c735-empty">Tudo em dia por aqui.</div>')+'</div></section>'+
    '</section>'
  };

  window.tasksPage=function(){
    const mode=typeof taskViewV604!=='undefined'?taskViewV604:'mine';
    const all=(D.tasks||[]);
    const open=all.filter(t=>t.status!=='done');
    const mine=open.filter(t=>t.assigned_to===S.user?.id);
    const team=open;
    const done=all.filter(t=>t.status==='done');
    const rows=mode==='done'?done:mode==='team'?team:mine;
    const card=t=>{
      const late=t.due_date&&t.due_date<tdy()&&t.status!=='done';
      return '<button class="c735-task '+(t.priority==='urgent'?'urgent':'')+'" data-op="task-edit" data-id="'+esc(t.id)+'">'+
        '<div class="c735-task-top"><span>'+esc(clientName(t.client_id))+'</span><em>'+esc(taskState(t.status))+'</em></div>'+
        '<h3>'+esc(t.title||'Demanda')+'</h3>'+
        '<div class="c735-task-foot"><span>'+esc(who(t.assigned_to))+'</span><b class="'+(late?'late':'')+'">'+(t.due_date?(late?'Atrasada · ':'')+esc(dateShort(t.due_date)):'Prazo a definir')+'</b></div>'+
      '</button>'
    };
    return '<section class="c735-tasks"><header class="c735-taskhead"><div><small>OPERAÇÃO</small><h1>Demandas</h1><p>Tarefas da equipe fora do fluxo editorial.</p></div><button class="btn pri" data-m="taskQuickV5">＋ Nova demanda</button></header>'+
      '<nav class="c735-tasktabs">'+
        '<button class="'+(mode==='mine'?'on':'')+'" data-v604-taskview="mine">Minhas <span>'+mine.length+'</span></button>'+
        '<button class="'+(mode==='team'?'on':'')+'" data-v604-taskview="team">Equipe <span>'+team.length+'</span></button>'+
        '<button class="'+(mode==='done'?'on':'')+'" data-v604-taskview="done">Concluídas <span>'+done.length+'</span></button>'+
      '</nav>'+
      '<div class="c735-tasklist">'+(rows.map(card).join('')||'<div class="c735-empty">Nenhuma demanda nesta fila.</div>')+'</div>'+
    '</section>'
  };

  const style=document.createElement('style');
  style.id='c735-clean-ui';
  style.textContent=`
  .c735-home,.c735-tasks{max-width:1180px;margin:0 auto;padding:4px 0 34px;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;color:#f3f2ef}
  .c735-homehead,.c735-taskhead{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:18px}
  .c735-homehead small,.c735-taskhead small,.c735-section>header small{color:#ff6a00;font-size:9px;font-weight:800;letter-spacing:.13em}
  .c735-homehead h1,.c735-taskhead h1{margin:5px 0 5px;font-size:31px;line-height:1.05;letter-spacing:-.035em}
  .c735-homehead p,.c735-taskhead p{margin:0;color:#898985;font-size:11px}.c735-homehead p span{display:block;margin-top:3px;color:#666}
  .c735-quick{display:flex;gap:7px}.c735-quick .btn,.c735-taskhead .btn{min-height:38px!important;border-radius:8px!important;font-size:10px!important}
  .c735-signals{display:flex;gap:7px;margin:0 0 20px}.c735-signals:empty{display:none}.c735-signals button{display:flex;align-items:baseline;gap:7px;padding:8px 11px;border:1px solid #2a2a2a;border-radius:8px;background:#111;color:#aaa}.c735-signals b{color:#ff6a00;font-size:16px}.c735-signals span{font-size:9px}
  .c735-section>header{display:flex;align-items:end;justify-content:space-between;margin-bottom:9px}.c735-section>header h2{margin:3px 0 0;font-size:19px}.c735-section>header>span{color:#666;font-size:9px}
  .c735-priority-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
  .c735-priority,.c735-task{display:grid;gap:9px;min-height:112px;padding:15px;border:1px solid #292929;border-radius:13px;background:#121212;color:#f3f2ef;text-align:left;box-shadow:none}
  .c735-priority:hover,.c735-task:hover{border-color:#393939;background:#151515}.c735-priority.urgent,.c735-task.urgent{border-color:#5a2e18;box-shadow:inset 3px 0 #ff6a00}
  .c735-priority-top,.c735-task-top,.c735-priority-foot,.c735-task-foot{display:flex;align-items:center;justify-content:space-between;gap:10px}.c735-priority-top span,.c735-task-top span{color:#ff7b2a;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.05em}.c735-priority-top em,.c735-task-top em{padding:4px 6px;border-radius:999px;background:#1c1c1c;color:#8b8b87;font-size:8px;font-style:normal}
  .c735-priority h3,.c735-task h3{margin:0;font-size:14px;line-height:1.28;font-weight:680;letter-spacing:-.01em}.c735-priority-foot span,.c735-task-foot span{color:#777;font-size:9px}.c735-priority-foot b,.c735-task-foot b{color:#777;font-size:9px;font-weight:600}.c735-priority-foot b.late,.c735-task-foot b.late{color:#ff7b2a}
  .c735-taskhead{margin-bottom:12px}.c735-tasktabs{display:flex;gap:5px;margin-bottom:12px;padding:4px;border:1px solid #282828;border-radius:10px;background:#0e0e0e}.c735-tasktabs button{flex:0 0 auto;padding:9px 12px;border:0;border-radius:7px;background:transparent;color:#777;font-size:10px;font-weight:650}.c735-tasktabs button span{margin-left:5px;color:#666}.c735-tasktabs button.on{background:#1a130f;color:#fff;box-shadow:inset 0 -2px #ff6a00}.c735-tasktabs button.on span{color:#ff7b2a}
  .c735-tasklist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.c735-empty{padding:24px;border:1px dashed #292929;border-radius:10px;color:#777;font-size:10px;text-align:center;grid-column:1/-1}
  @media(max-width:760px){
    .c735-home,.c735-tasks{padding:0 0 90px}.c735-homehead,.c735-taskhead{display:grid;gap:12px;align-items:start;margin-bottom:14px}.c735-homehead h1,.c735-taskhead h1{font-size:28px}.c735-homehead p{font-size:12px}
    .c735-quick{display:grid;grid-template-columns:1fr 1fr}.c735-quick .btn{min-height:42px!important}
    .c735-signals{overflow-x:auto;scrollbar-width:none;margin-bottom:16px}.c735-signals::-webkit-scrollbar{display:none}.c735-signals button{flex:0 0 auto}
    .c735-priority-grid,.c735-tasklist{grid-template-columns:1fr;gap:8px}.c735-priority,.c735-task{min-height:0;padding:14px;border-radius:12px}.c735-priority h3,.c735-task h3{font-size:15px}
    .c735-taskhead .btn{width:100%;min-height:42px!important}.c735-tasktabs{overflow-x:auto;scrollbar-width:none}.c735-tasktabs::-webkit-scrollbar{display:none}.c735-tasktabs button{white-space:nowrap}
  }`;
  document.head.appendChild(style);
})();

/* COLAB 7.36 — delete menu on client content cards */
(function(){
  function injectDeleteMenus(){
    if(typeof V==='undefined'||V!=='clientHub')return;
    const root=document.querySelector('.c717-overview')||document.querySelector('.main');
    if(!root)return;
    root.querySelectorAll('[data-contentopen]').forEach(card=>{
      const id=card.dataset.contentopen;
      if(!id||card.querySelector('.c736-content-more'))return;
      card.classList.add('c736-has-menu');
      const wrap=document.createElement('div');
      wrap.className='c736-content-more';
      wrap.innerHTML='<button type="button" aria-label="Mais opções" class="c736-more-btn">•••</button><div class="c736-menu"><button type="button" class="c736-delete" data-c736-delete="'+String(id).replace(/"/g,'&quot;')+'">Excluir conteúdo</button></div>';
      card.appendChild(wrap);
    });
  }
  document.addEventListener('click',function(e){
    const more=e.target.closest('.c736-more-btn');
    if(more){
      e.preventDefault();e.stopImmediatePropagation();
      const wrap=more.closest('.c736-content-more');
      document.querySelectorAll('.c736-content-more.open').forEach(x=>{if(x!==wrap)x.classList.remove('open')});
      wrap.classList.toggle('open');return;
    }
    const del=e.target.closest('[data-c736-delete]');
    if(del){
      e.preventDefault();e.stopImmediatePropagation();
      const id=del.dataset.c736Delete;
      del.closest('.c736-content-more')?.classList.remove('open');
      if(typeof deleteContent==='function')deleteContent(id);
      return;
    }
    document.querySelectorAll('.c736-content-more.open').forEach(x=>x.classList.remove('open'));
  },true);
  const prior=typeof bind==='function'?bind:null;
  if(prior)bind=function(){prior();injectDeleteMenus();requestAnimationFrame(injectDeleteMenus)};
  document.addEventListener('DOMContentLoaded',injectDeleteMenus);
  const style=document.createElement('style');
  style.id='c736-delete-style';
  style.textContent=`
    .c736-has-menu{position:relative!important;padding-right:50px!important}
    .c736-content-more{position:absolute!important;right:12px!important;top:12px!important;z-index:25!important}
    .c736-more-btn{width:32px!important;height:32px!important;display:grid!important;place-items:center!important;border:1px solid #303030!important;border-radius:9px!important;background:#171717!important;color:#888!important;font-size:13px!important;letter-spacing:1px!important}
    .c736-menu{display:none!important;position:absolute!important;right:0!important;top:38px!important;width:145px!important;padding:5px!important;border:1px solid #333!important;border-radius:10px!important;background:#171717!important;box-shadow:0 12px 30px #000b!important}
    .c736-content-more.open .c736-menu{display:block!important}
    .c736-delete{width:100%!important;padding:10px!important;border:0!important;border-radius:7px!important;background:transparent!important;color:#d88984!important;font-size:10px!important;text-align:left!important}
    .c736-delete:hover{background:#241616!important}
    @media(max-width:760px){.c736-has-menu{padding-right:48px!important}.c736-content-more{right:11px!important;top:11px!important}.c736-more-btn{width:30px!important;height:30px!important}}
  `;
  document.head.appendChild(style);
})();
/* COLAB 7.36 — cliente abre em Visão geral + excluir conteúdo */
(function(){
  function forceOverviewOpen(){
    document.querySelectorAll('[data-clienthub]').forEach(function(btn){
      btn.addEventListener('click',function(e){
        const cid=btn.dataset.clienthub;if(!cid)return;
        e.preventDefault();e.stopImmediatePropagation();
        clientHubIdV5=cid;clientHubTabsV563[cid]='overview';contentClient=cid;V='clientHub';MD=null;render();
      },true);
    });
  }
  const b736=typeof bind==='function'?bind:null;
  if(b736)bind=function(){b736();forceOverviewOpen()};

  const oldC704=typeof c704Card==='function'?c704Card:null;
  if(oldC704){
    window.c704Card=function(c){
      let html=oldC704(c);
      return html.replace('</article>','<details class="c736-content-more"><summary aria-label="Mais opções">•••</summary><div><button type="button" data-c736-delete-content="'+E(c.id)+'">Excluir conteúdo</button></div></details></article>');
    };
  }

  document.addEventListener('click',async function(e){
    const del=e.target.closest('[data-c736-delete-content]');
    if(!del)return;
    e.preventDefault();e.stopImmediatePropagation();
    const id=del.dataset.c736DeleteContent;
    const content=(D.contents||[]).find(x=>String(x.id)===String(id));
    if(!content)return;
    if(!confirm('Excluir o conteúdo “'+(content.title||'sem título')+'”? Esta ação não pode ser desfeita.'))return;
    try{
      del.disabled=true;
      await api('/rest/v1/contents?id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:{Prefer:'return=minimal'}});
      await load();MD=null;render();toast('Conteúdo excluído');
    }catch(err){del.disabled=false;toast(err.message||'Não foi possível excluir o conteúdo')}
  },true);

  const css=document.createElement('style');css.id='c736-content-actions';css.textContent=`
    .c704-piece{position:relative!important;padding-right:46px!important}
    .c736-content-more{position:absolute!important;right:9px!important;top:9px!important;z-index:6!important}
    .c736-content-more>summary{display:grid!important;place-items:center!important;width:30px!important;height:30px!important;border:1px solid #303030!important;border-radius:8px!important;background:#151515!important;color:#888!important;list-style:none!important;cursor:pointer!important;font-style:normal!important}
    .c736-content-more>summary::-webkit-details-marker{display:none!important}
    .c736-content-more>div{position:absolute!important;right:0!important;top:35px!important;width:145px!important;padding:5px!important;border:1px solid #333!important;border-radius:9px!important;background:#171717!important;box-shadow:0 12px 28px #000a!important}
    .c736-content-more button{width:100%!important;padding:9px!important;border:0!important;border-radius:6px!important;background:transparent!important;color:#df8b87!important;text-align:left!important;font-size:10px!important}
  `;document.head.appendChild(css);
})();
/* COLAB 7.36 — auth resilience: never discard a valid login because Data API clock is late */
(function(){
  window.doAuth=async function(e){
    e.preventDefault();
    const form=e.currentTarget, button=form.querySelector('button[type="submit"],button:not([type])');
    const fd=new FormData(form), email=String(fd.get('email')||'').trim().toLowerCase(), password=String(fd.get('password')||'');
    if(button){button.disabled=true;button.textContent=MODE==='login'?'Entrando…':'Criando…'}
    try{
      const url=MODE==='login'?B+'/auth/v1/token?grant_type=password':B+'/auth/v1/signup?redirect_to='+encodeURIComponent(location.origin+'/');
      const r=await tf(url,{method:'POST',headers:{apikey:K,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
      const x=await r.json().catch(()=>({}));
      if(!r.ok){
        const raw=String(x.error_description||x.msg||x.message||'');
        if(/invalid login credentials|invalid_credentials/i.test(raw)){
          MODE='login';
          auth('E-mail ou senha não conferem. Você pode redefinir a senha em “Esqueci minha senha”.');
          const input=document.querySelector('#af input[name="email"]'); if(input)input.value=email;
          return;
        }
        throw Error(raw||'Não foi possível entrar.');
      }
      if(MODE==='signup'){MODE='login';return auth('Conta criada. Agora entre com seu e-mail e senha.')}
      save(x);
      try{
        await wait(3500);
        await hydrate();
      }catch(err){
        const m=String(err?.message||'');
        if(/PGRST303|issued at future|sincronizar sua sessão|Failed to fetch|NetworkError|abort/i.test(m)){
          /* Critical: keep S + refresh_token. The Auth login succeeded. */
          R.innerHTML='<div class="load"><div><div class="logo">C<span>O</span>LAB</div><h2>Conectando sua sessão…</h2><p>Seu acesso foi confirmado. Estamos sincronizando os dados.</p><button id="retryAuth736" class="btn pri">Continuar</button></div></div>';
          document.getElementById('retryAuth736')?.addEventListener('click',async()=>{try{await hydrate()}catch(_){boot()}});
          setTimeout(async()=>{try{await hydrate()}catch(_){}},5000);
          return;
        }
        throw err;
      }
    }catch(err){
      console.error(err);
      const m=String(err?.message||'');
      if(/PGRST303|issued at future/i.test(m)){
        return auth('O acesso foi confirmado, mas a sincronização demorou. Tente entrar novamente; sua senha não foi alterada.');
      }
      auth('Não foi possível entrar agora. Se a senha não for aceita, use “Esqueci minha senha”.');
      const input=document.querySelector('#af input[name="email"]'); if(input)input.value=email;
    }finally{
      if(button&&document.body.contains(button)){button.disabled=false;button.textContent=MODE==='login'?'Entrar':'Criar conta'}
    }
  };
  const oldAuth=window.auth;
  if(typeof oldAuth==='function'){
    window.auth=function(msg=''){
      oldAuth(msg);
      const form=document.getElementById('af');
      if(form)form.onsubmit=window.doAuth;
    };
  }
})();

/* 7.39 — bounded automatic session recovery; one hydration at a time. */
(function(){
 const originalHydrate=hydrate;
 let flight=null;
 hydrate=function(){
  if(flight)return flight;
  if(!R.querySelector('.auth,.shell,.app-shell,.clientmode'))R.innerHTML='<div class="c739-session" role="status"><h2>Carregando seu escritório…</h2><p>Verificando a conexão com seus dados.</p></div>';
  flight=(async()=>{
   for(let attempt=0;attempt<3;attempt++){
    try{return await originalHydrate()}catch(error){
     const message=String(error?.message||'');
     const recoverable=/PGRST303|issued at future|sincronizar sua sessão|Failed to fetch|NetworkError|abort/i.test(message);
     if(!recoverable||!S?.access_token||attempt===2)throw error;
     R.innerHTML='<div class="c739-session" role="status"><h2>Carregando seu escritório…</h2><p>Seu login foi confirmado. Recuperando a conexão com os dados.</p></div>';
     await wait(3000);
    }
   }
  })();
  flight.finally(()=>{flight=null}).catch(()=>{});
  return flight;
 };
 const css=document.createElement('style');css.textContent='.c739-session{min-height:100dvh;display:flex;flex-direction:column;justify-content:center;padding:32px;max-width:540px;margin:auto}.c739-session h2{font-size:25px;line-height:1.2}.c739-session p{font-size:16px;line-height:1.5;color:#999}.load .logo{max-width:150px;max-height:110px;overflow:hidden;margin:0 auto 20px}.load .logo img,.load .logo svg{max-width:150px!important;max-height:110px!important;width:100%!important;height:auto!important}.load h2{font-size:25px}.load p{font-size:16px;padding:0 20px;max-width:500px;margin:16px auto}';document.head.appendChild(css);
})();
