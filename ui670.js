/* COLAB 6.70 — consolidation layer: single source of truth for critical UI */
(function(){
  const safeFormat=v=>{v=String(v||'').trim();return (!v||v==='undefined'||v==='null')?'Formato a definir':fmt(v)};
  window.ideaCardV591=function(idea){
    const b=ideaBriefV591(idea), missing=ideaMissingV591(idea), ready=!missing.length, converted=idea.status==='converted'||!!idea.converted_content_id;
    const pillarName=pillar(b.editorial_pillar_id)?.name||'Linha editorial a definir';
    const status=converted?'EM PRODUÇÃO':ready?'PRONTA':'INCOMPLETA';
    return `<article class="u670-idea ${ready?'is-ready':''} ${converted?'is-converted':''}">
      <header><div><small>${E(pillarName)} · ${E(safeFormat(b.format))}</small><h3>${E(idea.title||'Ideia sem título')}</h3></div><span>${status}</span></header>
      ${String(b.narrative||'').trim()?`<p>${E(String(b.narrative).slice(0,190))}${String(b.narrative).length>190?'…':''}</p>`:''}
      ${b.format==='carousel'?`<div class="u670-idea-meta"><span>${Number(b.slide_count||0)} slides</span><span>${(b.slide_texts||[]).filter(Boolean).length} textos prontos</span></div>`:''}
      ${!ready&&!converted?`<div class="u670-missing"><b>Para avançar</b><span>${E(missing.join(' · '))}</span></div>`:''}
      <footer><button class="btn ghost small" data-v591-idea-edit="${idea.id}">Revisar / editar</button>
      ${converted?`<button class="btn ghost small" data-v591-open-content="${E(idea.converted_content_id||'')}">Abrir no workflow →</button>`:`<button class="btn pri small" data-v591-send-production="${idea.id}" ${ready?'':'disabled aria-disabled="true"'}>Enviar para produção →</button>`}
      <details class="u670-kebab"><summary aria-label="Mais ações">•••</summary><div><button type="button" data-v626-delete-idea="${idea.id}">${converted?'Excluir do banco':'Excluir ideia'}</button></div></details></footer>
    </article>`;
  };

  window.clientsPage=function(){
    const rows=(D.clients||[]).filter(c=>(clientStatusV649==='all'||(clientStatusV649==='active'?c.active:!c.active))&&(!clientSearchV5||(c.name+' '+(c.segment||'')).toLowerCase().includes(clientSearchV5.toLowerCase()))&&(clientServiceV5==='all'||D.services.some(s=>s.client_id===c.id&&s.active&&s.service===clientServiceV5)));
    return `<section class="u670-clients"><div class="u670-pagehead"><div><small>CARTEIRA</small><h2>Clientes</h2><p>Operação, acessos e pendências em um só lugar.</p></div><button class="btn pri" data-m="clientNew">＋ Novo cliente</button></div>
      <div class="u670-filters"><select id="clientStatusV649"><option value="active" ${clientStatusV649==='active'?'selected':''}>Ativos</option><option value="closed" ${clientStatusV649==='closed'?'selected':''}>Encerrados</option><option value="all" ${clientStatusV649==='all'?'selected':''}>Todos</option></select><input id="clientSearchV5" type="search" value="${E(clientSearchV5)}" placeholder="Buscar cliente ou segmento"><select id="clientServiceV5"><option value="all">Todos os serviços</option>${['social_media','storymaker','trafego','identidade_visual'].map(s=>`<option value="${s}" ${clientServiceV5===s?'selected':''}>${E(lab(s))}</option>`).join('')}</select></div>
      <div class="u670-client-grid">${rows.map(c=>{const pending=(D.approvals||[]).filter(a=>a.client_id===c.id&&a.status==='pending').length,open=(D.tasks||[]).filter(t=>t.client_id===c.id&&t.status!=='done').length,story=storyOnlyClientV571(c.id),sv=(D.services||[]).filter(s=>s.client_id===c.id&&s.active);const portal=story?'Briefing do evento':c.portal_access_claimed_by?'Portal ativo':c.portal_access_token?'Portal · aguardando cadastro':'Portal · acesso não criado';return `<article class="u670-client-card"><header><span class="avatar">${E(c.initials||ini(c.name))}</span><span class="u670-live">${c.active?'Ativo':story?'Entregue':'Encerrado'}</span></header><div class="u670-client-copy"><h3>${E(c.name)}</h3><p>${E(c.segment||'Cliente Colab')}</p></div><div class="u670-services">${sv.map(s=>`<span>${E(lab(s.service))}</span>`).join('')||'<span>Sem serviço ativo</span>'}</div><div class="u670-client-numbers"><span><b>${open}</b> demandas</span><span><b>${pending}</b> aprovações</span></div><div class="u670-portal-status">${E(portal)}</div><footer><button class="u670-open" data-clienthub="${c.id}">Abrir cliente <span>→</span></button><details class="u670-kebab"><summary aria-label="Mais ações">•••</summary><div>${!story?`<button type="button" data-client-view="${c.id}">Ver portal do cliente</button>`:''}<button type="button" data-method-access="${c.id}">${story?'Link do briefing':'Gerenciar acesso'}</button><button type="button" data-client-state="${E(c.id)}">${c.active?(story?'Marcar como entregue':'Encerrar atendimento'):'Reativar cliente'}</button></div></details></footer></article>`}).join('')||'<div class="u670-empty">Nenhum cliente encontrado.</div>'}</div></section>`;
  };

  const oldCommercial=window.commercialPage;
  window.commercialPage=function(){
    const raw=D.opportunities||[], map=new Map();
    raw.forEach(x=>{const k=String(x.name||x.contact_name||x.email||x.phone||x.id).trim().toLowerCase().replace(/\s+/g,' ');const prev=map.get(k);if(!prev||String(x.updated_at||x.created_at||'')>String(prev.updated_at||prev.created_at||''))map.set(k,x)});
    const original=D.opportunities;D.opportunities=[...map.values()];try{return oldCommercial()}finally{D.opportunities=original}
  };
})();
