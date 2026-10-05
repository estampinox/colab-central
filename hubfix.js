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
      if(e.target.closest('a,select,input,textarea,label,[data-ap]'))return;
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
