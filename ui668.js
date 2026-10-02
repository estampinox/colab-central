/* COLAB 6.68 — final UI layer, loaded last */
(function(){
  function metric(key,label,count){return `<button class="u668-metric ${key==='urgent'&&count?'is-alert':''}" data-method-focus="${key}"><b>${count}</b><span>${E(label)}</span></button>`}
  function priority(r){
    const isTask=r.kind==='task', t=isTask?(D.tasks||[]).find(x=>x.id===r.id):null;
    const client=cl(r.clientId)?.name||'Colab', owner=profile(r.owner)?.display_name||'Sem responsável';
    const late=!!(r.due&&r.due<today()), stage=isTask?taskStageLabelV662(t?.status):String(r.next||'Em andamento');
    const attrs=isTask?`data-op="task-edit" data-id="${E(r.id)}"`:`data-method-work="${E(r.id)}"`;
    return `<article class="u668-priority ${r.urgent?'is-urgent':''}"><button ${attrs}><div class="u668-p-main"><div class="u668-p-kicker"><span>${E(client)}</span><i>${E(stage)}</i></div><h3>${E(r.title)}</h3></div><div class="u668-p-meta"><span class="u668-person"><i>${E(owner.slice(0,1).toUpperCase())}</i>${E(owner)}</span><span class="${late?'late':''}">${r.due?(late?'Atrasada · ':'')+fmtDate(r.due):'Sem prazo'}</span></div></button></article>`;
  }
  window.homePage=function(){
    const rows=methodActionRowsV647(), mine=rows.filter(r=>r.owner===S.user?.id&&!r.waiting), attention=rows.filter(r=>r.urgent||(r.due&&r.due<today())||r.changes);
    const next=[...new Map([...attention,...mine].map(r=>[r.kind+':'+r.id,r])).values()].slice(0,7);
    const metrics=[['urgent','Urgentes'],['overdue','Atrasadas'],['changes','Ajustes'],['unassigned','Sem responsável']].map(([key,label])=>({key,label,count:focusRowsV647(key).length}));
    const actions=[['ready','Programar publicação','Aprovados'],['waiting','Acompanhar retorno','Aguardando'],['unassigned','Definir responsável','Sem responsável']].map(([key,label,noun])=>({key,label,noun,count:focusRowsV647(key).length})).filter(x=>x.count>0);
    const events=(D.events||[]).filter(e=>e.status!=='cancelled'&&String(e.starts_at||'').slice(0,10)>=today()).sort((a,b)=>String(a.starts_at).localeCompare(String(b.starts_at))).slice(0,2);
    const name=E((profile(S.user?.id)?.display_name||'Equipe').split(' ')[0]);
    const date=E(new Date().toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo',weekday:'long',day:'numeric',month:'long'}));
    return `<div class="u668-home"><header class="u668-head"><div><small>${date}</small><h2>Olá, ${name}.</h2>${dailyVerseV649()}</div><div class="u668-create"><button class="btn pri" data-m="taskQuickV5">＋ Demanda</button><button class="btn ghost" data-method-create>＋ Conteúdo</button></div></header><section class="u668-metrics">${metrics.map(x=>metric(x.key,x.label,x.count)).join('')}</section><div class="u668-grid"><main><div class="u668-title"><div><small>TRABALHO AGORA</small><h3>Prioridades</h3></div><button class="btn ghost small" data-method-focus="mine">Minha fila</button></div><div class="u668-priorities">${next.map(priority).join('')||'<div class="u668-empty">Tudo em dia por aqui.</div>'}</div></main><aside><section class="u668-actions"><div class="u668-side-title"><small>AGORA</small><h3>Próximas ações</h3></div>${actions.length?actions.map(x=>`<button data-method-focus="${x.key}"><b>${x.count}</b><span>${E(x.noun)}</span><em>${E(x.label)} →</em></button>`).join(''):'<p>Tudo em dia.</p>'}</section><section class="u668-agenda"><div class="u668-agenda-head"><h3>Agenda</h3><button class="btn ghost small" data-v="agenda">Abrir</button></div>${events.length?events.map(e=>`<button class="u668-event" data-eventopen="${E(e.id)}"><small>${fmtDate(String(e.starts_at).slice(0,10))}</small><b>${E(e.title)}</b></button>`).join(''):'<p>Nenhum compromisso agendado.</p>'}</section></aside></div></div>`;
  };
})();
