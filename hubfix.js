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