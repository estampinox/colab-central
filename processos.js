// Colab 6.45: ações operacionais sobre a versão publicada.
'use strict';
const processTablesV645={tasks:'tasks',receivables:'receivables',expenses:'expenses',recurring_costs:'recurringCosts',partner_withdrawals:'withdrawals',contents:'contents',client_insights:'insights'};
const processBusyV645=new Set();
const taskStatesV645=[['todo','A fazer'],['doing','Em andamento'],['approval','Aguardando'],['done','Concluída']];
const prioritiesV645=[['low','Baixa'],['normal','Normal'],['high','Alta'],['urgent','Urgente']];
function optionsV645(items,value){return items.map(([key,label])=>`<option value="${E(key)}" ${key===value?'selected':''}>${E(label)}</option>`).join('')}
function processRowV645(table,id){return (D[processTablesV645[table]]||[]).find(row=>row.id===id)}
function processAccessV645(table,id){
  if(M?.role!=='team'||!processTablesV645[table])throw Error('Esta ação é exclusiva da equipe.');
  const row=id?processRowV645(table,id):null;
  if(id&&(!row||row.organization_id&&row.organization_id!==M.organization_id))throw Error('Registro não encontrado. Atualize a lista.');
  return row;
}
function processErrorV645(error){
  let message=error?.message||'Não foi possível salvar. Tente novamente.';
  try{message=JSON.parse(message).message||message}catch{}
  return message;
}
async function mutateProcessV645(table,id,payload,method='PATCH'){
  processAccessV645(table,id);
  const query=id?'?id=eq.'+encodeURIComponent(id):'';
  const rows=await api('/rest/v1/'+table+query,{method,headers:{Prefer:'return=representation'},...(payload?{body:JSON.stringify(payload)}:{})});
  if(!Array.isArray(rows)||rows.length!==1||id&&rows[0].id!==id)throw Error('Nenhum registro foi alterado. Confira seu acesso e atualize a lista.');
  const key=processTablesV645[table],list=D[key]||[];
  D[key]=method==='DELETE'?list.filter(row=>row.id!==id):id?list.map(row=>row.id===id?rows[0]:row):[rows[0],...list];
  return rows[0];
}
async function runProcessV645(key,action,element){
  if(processBusyV645.has(key))return;
  processBusyV645.add(key);
  const controls=element?.tagName==='FORM'?Array.from(element.querySelectorAll('button')):element?[element]:[];
  controls.forEach(control=>control.disabled=true);
  try{return await action()}catch(error){
    const message=processErrorV645(error),box=element?.querySelector?.('[data-process-error]');
    if(box){box.textContent=message;box.hidden=false}toast(message);
  }finally{processBusyV645.delete(key);controls.forEach(control=>control.disabled=false)}
}
async function finishProcessV645(message){
  MD=null;
  try{await load()}catch{render();toast(message+' Atualize a tela para carregar os outros dados.');return}
  render();toast(message);
}
function processModalV645(title,body,eyebrow='COLAB'){
  return `<div class="modalbg"><div class="modal process-modal" role="dialog" aria-modal="true" aria-label="${E(title)}"><div class="head"><div><small class="ey">${E(eyebrow)}</small><h2>${E(title)}</h2></div><button type="button" class="btn ghost" data-close aria-label="Fechar">✕</button></div>${body}</div></div>`;
}
function fieldV645(label,control){return `<label class="process-field"><span>${label}</span>${control}</label>`}
function footerV645(label){return `<p class="process-error" data-process-error role="alert" hidden></p><div class="process-form-actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button type="submit" class="btn pri">${E(label)}</button></div>`}
function clientOptionsV645(value){return optionsV645([['','Interno Colab / sem cliente'],...(D.clients||[]).map(row=>[row.id,row.name])],value||'')}

// Demandas: a ação escolhida não dispara a abertura do card por propagação.
taskCardV604=function(task){
  const done=task.status==='done',urgent=!done&&task.priority==='urgent',late=!done&&task.due_date&&task.due_date<today();
  return `<article class="process-task ${urgent?'is-urgent':''} ${done?'is-done':''} ${late?'is-late':''}" data-process-task="${E(task.id)}">
    <div class="process-task-tags"><span>${E(cl(task.client_id)?.name||'Colab')}</span>${late?`<em>${E(taskDueV604(task))}</em>`:''}</div>
    <button type="button" class="process-task-title" data-op="task-edit" data-id="${E(task.id)}">${E(task.title)}</button>
    <div class="process-task-meta"><span><b>${E(profile(task.assigned_to)?.display_name||'Equipe · sem responsável')}</b><small>${done?'Concluída':late?'Prazo vencido':E(taskDueV604(task))}</small></span><label><span class="sr-only">Status da demanda ${E(task.title)}</span><select data-process-status="${E(task.id)}">${optionsV645(taskStatesV645,task.status)}</select></label></div>
    <div class="process-card-actions"><button type="button" class="btn process-primary" data-op="task-toggle" data-id="${E(task.id)}">${done?'Reabrir':'Concluir'}</button></div>
  </article>`;
};
taskCardV5=taskCardV604;
function taskModalV645(id){
  const task=id?processRowV645('tasks',id):{};if(!task)return'';
  const clientId=task.client_id||MD?.clientId||'';
  return processModalV645(id?'Editar demanda':'Nova demanda',`<form id="process-task-form" data-id="${E(id||'')}">
    ${fieldV645('O que precisa ser feito?',`<input name="title" required maxlength="500" value="${E(task.title||'')}" autofocus>`)}
    <div class="process-fields">${fieldV645('Cliente',`<select name="client_id">${clientOptionsV645(clientId)}</select>`)}${fieldV645('Responsável',`<select name="assigned_to">${profileOptionsV5(task.assigned_to||'','Equipe · sem responsável')}</select>`)}</div>
    <div class="process-fields">${fieldV645('Prazo',`<input name="due_date" type="date" value="${E(task.due_date||'')}">`)}${fieldV645('Prioridade',`<select name="priority">${optionsV645(prioritiesV645,task.priority||'normal')}</select>`)}</div>
    <div class="process-fields">${fieldV645('Status',`<select name="status">${optionsV645(taskStatesV645,task.status||'todo')}</select>`)}${fieldV645('Serviço',`<select name="service">${optionsV645(['social_media','storymaker','trafego','identidade_visual','administrativo'].map(key=>[key,lab(key)]),task.service||'administrativo')}</select>`)}</div>
    ${fieldV645('Detalhes',`<textarea name="description" rows="4">${E(task.description||'')}</textarea>`)}
    ${id?`<button type="button" class="btn ghost process-delete" data-op="delete" data-table="tasks" data-id="${E(id)}">Excluir demanda</button>`:''}${footerV645(id?'Salvar alterações':'Criar demanda')}</form>`,'DEMANDAS');
}
async function saveTaskV645(event){
  event.preventDefault();const form=event.currentTarget,id=form.dataset.id,data=new FormData(form);
  await runProcessV645('task:'+id,async()=>{
    const title=String(data.get('title')||'').trim();if(!title)throw Error('Informe o título da demanda.');
    const payload={title,description:String(data.get('description')||'').trim()||null,client_id:data.get('client_id')||null,assigned_to:data.get('assigned_to')||null,due_date:data.get('due_date')||null,service:data.get('service'),priority:data.get('priority'),status:data.get('status'),updated_at:new Date().toISOString()};
    if(!id)Object.assign(payload,{organization_id:M.organization_id,created_by:S.user.id});
    await mutateProcessV645('tasks',id,payload,id?'PATCH':'POST');await finishProcessV645(id?'Demanda atualizada.':'Demanda criada.');
  },form);
}
async function taskStatusV645(id,status,element){
  const old=processRowV645('tasks',id)?.status;
  await runProcessV645('task:'+id,async()=>{if(!taskStatesV645.some(row=>row[0]===status))throw Error('Status inválido.');await mutateProcessV645('tasks',id,{status,updated_at:new Date().toISOString()});await finishProcessV645(status==='done'?'Demanda concluída. Disponível em Concluídas.':'Demanda atualizada.');},element);
  if(element?.tagName==='SELECT'&&processRowV645('tasks',id)?.status===old)element.value=old;
}

// Valores monetários aceitam os formatos usados no Brasil sem dividir reais por mil.
function parseAmountV645(raw){
  let text=String(raw??'').trim().replace(/^R\$\s*/i,'').replace(/\s/g,'');
  if(!text||!/^[\d.,]+$/.test(text))throw Error('Informe um valor válido, como 2.200,00.');
  if(text.includes(',')){
    if(!/^(?:\d+|\d{1,3}(?:\.\d{3})+),\d{1,2}$/.test(text))throw Error('Use o formato 2.200,00.');
    text=text.replace(/\./g,'').replace(',','.');
  }else if(/^\d{1,3}(?:\.\d{3})+$/.test(text))text=text.replace(/\./g,'');
  else if(!/^\d+(?:\.\d{1,2})?$/.test(text))throw Error('Use no máximo duas casas decimais.');
  const amount=Number(text);if(!Number.isFinite(amount)||amount<=0||amount>999999999)throw Error('Informe um valor maior que zero.');
  return Math.round(amount*100)/100;
}
function amountInputV645(value){return value==null?'':Number(value).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function paidDateV645(value){return value?new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value)):today()}
function financeItemV645(table,row){
  const incoming=table==='receivables',recurring=table==='recurring_costs',withdrawal=table==='partner_withdrawals';
  return {table,id:row.id,row,incoming,recurring,paid:withdrawal||row.status==='paid',title:recurring?row.name:withdrawal?'Retirada · '+row.partner_name:row.description,date:recurring?row.next_due_date:withdrawal?row.withdrawal_date:row.status==='paid'?paidDateV645(row.paid_at||row.due_date||row.expense_date):row.due_date||row.expense_date,client:cl(row.client_id)?.name||row.external_contact_name||''};
}
function financeRowV645(item){
  const {row,table,id,paid,recurring,incoming}=item,active=recurring?row.status==='active':row.status!=='cancelled';
  const status=recurring?row.status==='inactive'?'Recorrência pausada':row.recurrence==='annual'?'Anual':row.recurrence==='one_time'?'Conta única':'Mensal':paid?incoming?'Recebido':'Pago':row.status==='cancelled'?'Cancelado':incoming?'A receber':'A pagar';
  return `<article class="process-money ${incoming?'incoming':'outgoing'}"><div class="process-money-head"><div>${item.client?`<small>${E(item.client)}</small>`:''}<h4>${E(item.title||'Lançamento')}</h4></div><strong>${money(row.amount)}</strong></div><p><time>${fmtDate(item.date)}</time><span>${E(status)}</span>${!paid&&active&&item.date<today()?'<b>Vencido</b>':''}</p><div class="process-card-actions">
    ${table==='partner_withdrawals'?'':recurring?active?`<button type="button" class="btn process-primary" data-op="finance-settle" data-table="${table}" data-id="${E(id)}">Dar baixa</button>`:'':`<button type="button" class="btn process-primary" data-op="${paid?'finance-reopen':'finance-settle'}" data-table="${table}" data-id="${E(id)}">${paid?'Reabrir':'Dar baixa'}</button>`}
    <button type="button" class="btn ghost" data-op="finance-edit" data-table="${table}" data-id="${E(id)}">Editar</button><button type="button" class="btn ghost process-delete" data-op="delete" data-table="${table}" data-id="${E(id)}">Excluir</button></div></article>`;
}
function financePendingV645(){return [
  ...(D.receivables||[]).filter(row=>row.status==='pending').map(row=>financeItemV645('receivables',row)),
  ...(D.expenses||[]).filter(row=>!['paid','cancelled'].includes(row.status)).map(row=>financeItemV645('expenses',row)),
  ...(D.recurringCosts||[]).filter(row=>row.status==='active').map(row=>financeItemV645('recurring_costs',row))
].sort((a,b)=>String(a.date).localeCompare(String(b.date)))}
function financePanelV645(title,eyebrow,items){return `<section class="panel process-finance-panel"><div class="head"><div><small class="ey">${E(eyebrow)}</small><h3>${E(title)}</h3></div><span class="tag">${items.length}</span></div>${items.map(financeRowV645).join('')||'<p class="process-empty">Nenhum lançamento neste período.</p>'}</section>`}
financeOverviewV5=function(){
  const now=today(),end=new Date(now+'T12:00:00');end.setDate(end.getDate()+7);const last=end.toISOString().slice(0,10),rows=financePendingV645();
  return `<div class="grid2 process-finance-grid">${financePanelV645('Precisa de ação','VENCIDOS',rows.filter(row=>row.date<now))}${financePanelV645('Entradas e pagamentos','PRÓXIMOS 7 DIAS',rows.filter(row=>row.date>=now&&row.date<=last))}</div>`+(typeof contractCyclePanelV553==='function'?contractCyclePanelV553():'');
};
financePlanningV5=function(){
  const rows=financePendingV645().filter(item=>String(item.date).slice(0,7)===financeMonth),incoming=rows.filter(item=>item.incoming),outgoing=rows.filter(item=>!item.incoming);
  const recurring=(D.recurringCosts||[]).map(row=>financeItemV645('recurring_costs',row));
  return `<div class="grid2 process-finance-grid">${financePanelV645('Previsão de entradas','A RECEBER · '+financeMonthLabelV553(financeMonth),incoming)}${financePanelV645('Custos e despesas','A PAGAR · '+financeMonthLabelV553(financeMonth),outgoing)}</div>${financePanelV645('Contas recorrentes','ASSINATURAS E CONTAS FIXAS',recurring)}<section class="panel"><div class="head"><h3>Contratos ativos</h3><button class="btn ghost" data-v="clients">Abrir clientes</button></div><div class="grid3">${(D.contracts||[]).filter(row=>row.status==='active').map(contractCard).join('')||'<p class="process-empty">Nenhum contrato ativo.</p>'}</div></section>`;
};
financeFlowV5=function(){
  const rows=[...(D.receivables||[]).filter(row=>row.status==='paid').map(row=>financeItemV645('receivables',row)),...(D.expenses||[]).filter(row=>row.status==='paid').map(row=>financeItemV645('expenses',row)),...(D.withdrawals||[]).map(row=>financeItemV645('partner_withdrawals',row))].filter(item=>String(item.date).slice(0,7)===financeMonth).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  return financePanelV645('Recebimentos e pagamentos realizados','FLUXO DE CAIXA · '+financeMonthLabelV553(financeMonth),rows);
};
function financeModalV645(table,id){
  const row=id?processRowV645(table,id):{};if(!row)return'';
  const recurring=table==='recurring_costs',withdrawal=table==='partner_withdrawals',incoming=table==='receivables',title=recurring?'conta recorrente':withdrawal?'retirada':incoming?'recebimento':'despesa';
  return processModalV645((id?'Editar ':'Novo ')+title,`<form id="process-finance-form" data-id="${E(id||'')}" data-table="${E(table)}">
    ${withdrawal?fieldV645('Sócia',`<select name="partner_user_id" required>${profileOptionsV5(row.partner_user_id||'','Selecione')}</select>`):fieldV645('Descrição',`<input name="description" required maxlength="500" value="${E(row.name||row.description||'')}" autofocus>`)}
    ${!recurring&&!withdrawal?fieldV645('Cliente',`<select name="client_id">${clientOptionsV645(row.client_id||MD?.clientId||'')}</select>`):''}
    <div class="process-fields">${fieldV645('Valor (R$)',`<input name="amount" type="text" inputmode="decimal" required value="${amountInputV645(row.amount)}" placeholder="2.200,00"><small data-amount-preview>Informe o valor em reais.</small>`)}${fieldV645(recurring?'Próximo vencimento':withdrawal?'Data da retirada':'Vencimento',`<input name="due_date" type="date" required value="${E(row.next_due_date||row.withdrawal_date||row.due_date||row.expense_date||today())}">`)}</div>
    ${recurring?`<div class="process-fields">${fieldV645('Repetição',`<select name="recurrence">${optionsV645([['monthly','Mensal'],['annual','Anual'],['one_time','Uma vez']],row.recurrence||'monthly')}</select>`)}${fieldV645('Status',`<select name="status">${optionsV645([['active','Ativa'],['inactive','Pausada']],row.status||'active')}</select>`)}</div>`:withdrawal?'':`<div class="process-fields">${fieldV645('Status',`<select name="status" data-finance-state>${optionsV645([['pending',incoming?'A receber':'A pagar'],['paid',incoming?'Recebido':'Pago']],row.status==='paid'?'paid':'pending')}</select>`)}${fieldV645(incoming?'Data do recebimento':'Data do pagamento',`<input name="paid_date" type="date" value="${E(paidDateV645(row.paid_at))}" data-payment-date ${row.status==='paid'?'':'disabled'}>`)}</div>`}
    ${(recurring||incoming)?fieldV645('Forma de pagamento',`<select name="payment_method">${optionsV645([['','Não informada'],['pix','Pix'],['dinheiro','Dinheiro'],['cartao','Cartão'],['boleto','Boleto'],['transferencia','Transferência'],['outro','Outro']],row.payment_method||'')}</select>`):''}
    ${fieldV645('Observações',`<textarea name="notes" rows="3">${E(row.notes||'')}</textarea>`)}
    ${row.contract_id?'<p class="process-help">A alteração vale para este lançamento. O valor do contrato permanece o mesmo.</p>':''}
    ${row.recurring_cost_id?'<p class="process-help">Este é um pagamento de uma conta recorrente. Alterá-lo não muda os próximos vencimentos.</p>':''}
    ${footerV645(id?'Salvar alterações':'Salvar lançamento')}</form>`,'FINANCEIRO');
}
async function saveFinanceV645(event){
  event.preventDefault();const form=event.currentTarget,id=form.dataset.id,table=form.dataset.table,data=new FormData(form);
  await runProcessV645(table+':'+id,async()=>{
    const row=processAccessV645(table,id),amount=parseAmountV645(data.get('amount')),due=String(data.get('due_date')||''),now=new Date().toISOString();
    if(!due)throw Error('Informe a data.');
    let payload={amount,notes:String(data.get('notes')||'').trim()||null};
    if(table==='partner_withdrawals'){
      const owner=String(data.get('partner_user_id')||'');if(!owner)throw Error('Selecione a sócia.');
      Object.assign(payload,{partner_user_id:owner,partner_name:profile(owner)?.display_name||'Sócia',withdrawal_date:due,...(!id?{withdrawal_type:'withdrawal'}:{})});
    }else{
      const description=String(data.get('description')||'').trim();if(!description)throw Error('Informe a descrição.');
      payload.updated_at=now;
      if(table==='recurring_costs')Object.assign(payload,{name:description,next_due_date:due,recurrence:data.get('recurrence'),status:data.get('status'),payment_method:data.get('payment_method')||null,...(!id?{category:'tool'}:{})});
      else{
        const paid=data.get('status')==='paid',paidDate=String(data.get('paid_date')||'');if(paid&&!paidDate)throw Error('Informe a data da baixa.');
        Object.assign(payload,{description,client_id:data.get('client_id')||null,due_date:due,status:paid?'paid':'pending',paid_at:paid?row?.status==='paid'&&paidDateV645(row.paid_at)===paidDate?row.paid_at:paidDate+'T12:00:00-03:00':null});
        if(table==='receivables')Object.assign(payload,{competence_month:row?.competence_month||due.slice(0,7)+'-01',payment_method:data.get('payment_method')||null,...(!id?{category:'other'}:{})});
        else if(!id)Object.assign(payload,{expense_date:due,category:'operational'});
      }
    }
    if(!id)Object.assign(payload,{organization_id:M.organization_id,created_by:S.user.id});
    await mutateProcessV645(table,id,payload,id?'PATCH':'POST');await finishProcessV645('Lançamento salvo.');
  },form);
}
function settleModalV645(table,id){
  const row=processRowV645(table,id);if(!row)return'';const recurring=table==='recurring_costs',incoming=table==='receivables';
  return processModalV645('Dar baixa',`<p class="process-help"><b>${E(row.name||row.description)}</b><br>${incoming?'Confirmar recebimento':'Confirmar pagamento'} de <strong>${money(row.amount)}</strong>.</p><form id="process-settle-form" data-table="${E(table)}" data-id="${E(id)}" data-due="${E(row.next_due_date||'')}">${fieldV645(incoming?'Recebido em':'Pago em',`<input name="paid_date" type="date" required value="${today()}">`)}${recurring?'<p class="process-help">O pagamento entra no fluxo de caixa e o próximo vencimento é atualizado.</p>':''}${footerV645(incoming?'Confirmar recebimento':'Confirmar pagamento')}</form>`,'FINANCEIRO');
}
async function settleFinanceV645(event){
  event.preventDefault();const form=event.currentTarget,table=form.dataset.table,id=form.dataset.id;
  await runProcessV645(table+':'+id,async()=>{
    const row=processAccessV645(table,id),date=String(new FormData(form).get('paid_date')||'');if(!date)throw Error('Informe a data.');
    if(table==='recurring_costs'){
      await api('/rest/v1/rpc/settle_recurring_cost_v645',{method:'POST',body:JSON.stringify({p_cost_id:id,p_due_date:form.dataset.due,p_paid_date:date})});
    }else{
      if(row.status==='paid')throw Error('Este lançamento já está quitado.');
      await mutateProcessV645(table,id,{status:'paid',paid_at:date+'T12:00:00-03:00',updated_at:new Date().toISOString()});
    }
    await finishProcessV645(table==='receivables'?'Recebimento confirmado.':'Pagamento confirmado.');
  },form);
}
async function reopenFinanceV645(table,id,button){
  const row=processRowV645(table,id);if(!row)return;
  if(!confirm(`Reabrir “${row.description}” e retirar ${money(row.amount)} do fluxo realizado?`))return;
  return runProcessV645(table+':'+id,async()=>{await mutateProcessV645(table,id,{status:'pending',paid_at:null,updated_at:new Date().toISOString()});await finishProcessV645('Lançamento reaberto como pendente.');},button);
}

// Exclusão explícita em qualquer etapa, mantendo a autorização existente no banco.
function deleteModalV645(table,id){
  const row=processRowV645(table,id);if(!row)return'';
  const title=row.title||row.name||row.description||'Retirada de '+row.partner_name;
  let detail='Este registro será removido definitivamente.';
  if(table==='contents')detail='O conteúdo sai do workflow, calendário e portal. As aprovações e os vínculos dos arquivos deste conteúdo também serão removidos. Arquivos externos, como os do Drive, não serão apagados.';
  if(table==='client_insights')detail='Esta ideia será removida. Um conteúdo já criado a partir dela continuará no workflow.';
  if(table==='recurring_costs')detail='A conta recorrente será removida. Os pagamentos anteriores continuam no histórico financeiro.';
  if(['receivables','expenses','partner_withdrawals'].includes(table))detail='Este lançamento será removido e os totais financeiros serão recalculados. Outros lançamentos e contratos não serão alterados.';
  return processModalV645('Excluir '+(table==='contents'?'conteúdo':table==='tasks'?'demanda':table==='client_insights'?'ideia':'lançamento'),`<div class="process-delete-summary"><b>${E(title)}</b>${row.amount!=null?`<strong>${money(row.amount)}</strong>`:''}<p>${E(detail)}</p></div><form id="process-delete-form" data-table="${E(table)}" data-id="${E(id)}"><p class="process-error" data-process-error role="alert" hidden></p><div class="process-form-actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button type="submit" class="btn danger">Confirmar exclusão</button></div></form>`,'CONFIRMAÇÃO');
}
async function deleteProcessV645(event){
  event.preventDefault();const form=event.currentTarget,table=form.dataset.table,id=form.dataset.id;
  return runProcessV645(table+':'+id,async()=>{await mutateProcessV645(table,id,null,'DELETE');await finishProcessV645('Registro excluído.');},form);
}
deleteContent=async function(id){processAccessV645('contents',id);MD={type:'processDelete',table:'contents',id};render()};
deleteTask=async function(id){processAccessV645('tasks',id);MD={type:'processDelete',table:'tasks',id};render()};
deleteReceivable=async function(id){processAccessV645('receivables',id);MD={type:'processDelete',table:'receivables',id};render()};
const workflowCardBeforeV645=workflowPremiumCardV594;
workflowPremiumCardV594=function(content){
  const html=workflowCardBeforeV645(content);if(M?.role!=='team')return html;
  return html.replace(/<\/article>\s*$/,`<div class="process-workflow-actions"><button type="button" class="btn ghost" data-contentopen="${E(content.id)}">Abrir / editar</button><button type="button" class="btn ghost process-delete" data-op="delete" data-table="contents" data-id="${E(content.id)}">Excluir</button></div></article>`);
};
const ideaCardBeforeV645=ideaCardV591;
ideaCardV591=function(idea){
  const html=ideaCardBeforeV645(idea);if(M?.role!=='team')return html;
  return html.replace(/<\/article>\s*$/,`<div class="process-workflow-actions"><button type="button" class="btn ghost process-delete" data-op="delete" data-table="client_insights" data-id="${E(idea.id)}">Excluir ideia</button></div></article>`);
};
const modalBeforeV645=modal;
modal=function(){
  if(M?.role==='team'&&MD){
    if(['taskEdit','taskQuickV5','taskNew'].includes(MD.type))return taskModalV645(MD.type==='taskEdit'?MD.id:null);
    const financial={receivableNew:'receivables',expenseNew:'expenses',recurringCostNew:'recurring_costs',withdrawalNew:'partner_withdrawals',receivableAgenda:'receivables'};
    if(financial[MD.type])return financeModalV645(financial[MD.type],MD.type==='receivableAgenda'?MD.id:null);
    if(MD.type==='processFinance')return financeModalV645(MD.table,MD.id);
    if(MD.type==='processSettle')return settleModalV645(MD.table,MD.id);
    if(MD.type==='processDelete')return deleteModalV645(MD.table,MD.id);
  }
  return modalBeforeV645();
};
// Existing payment shortcuts route to the same date-aware confirmation.
markPaid=async function(table,id){processAccessV645(table,id);MD={type:'processSettle',table,id};render()};
markRecurringCostPaid=async function(id){processAccessV645('recurring_costs',id);MD={type:'processSettle',table:'recurring_costs',id};render()};
const bindBeforeV645=bind;
bind=function(){
  bindBeforeV645();if(M?.role!=='team')return;
  document.getElementById('process-task-form')?.addEventListener('submit',saveTaskV645);
  document.getElementById('process-finance-form')?.addEventListener('submit',saveFinanceV645);
  document.getElementById('process-settle-form')?.addEventListener('submit',settleFinanceV645);
  document.getElementById('process-delete-form')?.addEventListener('submit',deleteProcessV645);
  document.querySelectorAll('[data-process-status]').forEach(select=>select.onchange=()=>taskStatusV645(select.dataset.processStatus,select.value,select));
  document.querySelector('[data-finance-state]')?.addEventListener('change',event=>{const input=document.querySelector('[data-payment-date]');if(input)input.disabled=event.target.value!=='paid'});
  document.querySelectorAll('.process-modal [name="amount"]').forEach(input=>{input.oninput=()=>{const hint=input.parentElement.querySelector('[data-amount-preview]');try{hint.textContent=money(parseAmountV645(input.value))}catch{hint.textContent='Exemplo: 2.200,00'};};input.onblur=()=>{try{input.value=amountInputV645(parseAmountV645(input.value))}catch{}}});
  // Keep exclusion accessible inside production and approval editors too.
  if(MD?.type==='contentDetail'&&processRowV645('contents',MD.id)){
    const head=document.querySelector('.modalbg .modal .head');
    if(head&&!document.querySelector('.modalbg [data-op="delete"][data-table="contents"]'))head.insertAdjacentHTML('afterend',`<div class="process-editor-actions"><button type="button" class="btn ghost process-delete" data-op="delete" data-table="contents" data-id="${E(MD.id)}">Excluir conteúdo</button></div>`);
  }
};
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-op]');if(!button)return;
  event.preventDefault();event.stopPropagation();if(button.disabled||M?.role!=='team')return;
  const {op,id,table}=button.dataset;
  if(op==='task-toggle'){const row=processRowV645('tasks',id);return taskStatusV645(id,row?.status==='done'?'todo':'done',button)}
  if(op==='finance-reopen')return reopenFinanceV645(table,id,button);
  if(op==='task-edit')MD={type:'taskEdit',id};
  else if(op==='finance-edit')MD={type:'processFinance',table,id};
  else if(op==='finance-settle')MD={type:'processSettle',table,id};
  else if(op==='delete')MD={type:'processDelete',table,id};
  else return;
  render();
},true);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.querySelector('.process-modal')&&!processBusyV645.size){MD=null;render()}});

