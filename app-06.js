// ===== COLAB V5.83 — FLUXO EDITORIAL UNIFICADO =====
let workflowFocusV583='all',workflowDragV583=null,workflowSourceInsightV583=null;
const workflowStagesV583=[
  ['idea','Ideia'],['building','Em construção'],['editorial_review','Revisão editorial'],
  ['visual_production','Produção visual'],['internal_review','Conferência interna'],
  ['client_approval','Aprovação da cliente'],['scheduled','Agendado'],['published','Publicado']
];
function workflowStageV583(work){let value=work?.internal_status||'idea';return({draft:'building',design:'visual_production',internal_approved:'client_approval'})[value]||value}
function workflowStageLabelV583(value){return workflowStagesV583.find(row=>row[0]===value)?.[1]||value}
function workflowPublicStatusV583(value){return({idea:'idea',building:'production',editorial_review:'production',visual_production:'editing',internal_review:'editing',client_approval:'approval',scheduled:'scheduled',published:'published',changes_requested:'changes_requested'})[value]||'production'}
function workflowProfileOptionsV583(selected,label='Equipe'){return`<option value="">${E(label)}</option>${(D.profiles||[]).map(person=>`<option value="${person.user_id}" ${selected===person.user_id?'selected':''}>${E(person.display_name)}</option>`).join('')}`}
function workflowWorkV583(contentId){return(D.teamWorkflow||[]).find(row=>row.content_id===contentId)||null}
function workflowBriefV583(work){return work?.brief&&typeof work.brief==='object'?work.brief:{}}
function workflowAgeV583(work){let date=work?.stalled_since||work?.updated_at;if(!date)return'';let days=Math.max(0,Math.floor((Date.now()-new Date(date).getTime())/86400000));return days===0?'movido hoje':days===1?'há 1 dia':`há ${days} dias`}
function workflowWaitingV583(work){if(!work?.assigned_to)return'Equipe';if(work.assigned_to===S.user?.id)return'Minha vez';return`Aguardando ${profile(work.assigned_to)?.display_name||'equipe'}`}
function workflowFilteredV583(content){let work=workflowWorkV583(content.id),stage=workflowStageV583(work),late=work?.internal_due_date&&work.internal_due_date<today()&&!['published','scheduled'].includes(stage);if(workflowFocusV583==='mine')return work?.assigned_to===S.user?.id;if(workflowFocusV583==='client')return stage==='client_approval';if(workflowFocusV583==='late')return late;if(workflowFocusV583==='unassigned')return!work?.assigned_to;return true}
function workflowCardV583(content){let work=workflowWorkV583(content.id),brief=workflowBriefV583(work),stage=workflowStageV583(work),owner=profile(work?.assigned_to)?.display_name||'Equipe',late=work?.internal_due_date&&work.internal_due_date<today()&&!['published','scheduled'].includes(stage);return`<article class="v583-card ${late?'is-late':''}" draggable="true" data-v583-drag="${content.id}" data-contentopen="${content.id}">${socialAssetV550(content)}<div class="v583-card-copy"><div class="v583-card-top"><small>${E(pillar(content.editorial_pillar_id)?.name||'Linha editorial')}</small><b>#${Number(work?.editorial_order||0)||'—'}</b></div><h4>${E(content.title||'Conteúdo')}</h4><div class="v583-card-tags"><span>${E(fmt(content.format||'undefined'))}</span>${brief.objective_type?`<span>${E(brief.objective_type)}</span>`:''}</div><div class="v583-next"><small>PRÓXIMA AÇÃO</small><strong>${E(work?.next_action||'Definir o próximo passo')}</strong><span>${E(owner)}${work?.internal_due_date?' · '+fmtDate(work.internal_due_date):''}</span></div><footer><em class="${work?.assigned_to===S.user?.id?'mine':''}">${E(workflowWaitingV583(work))}</em><span>${E(workflowAgeV583(work))}</span></footer></div></article>`}
socialWorkflowStagesV550=function(){return[
  {key:'idea',label:'Ideias',statuses:['idea']},{key:'production',label:'Em produção',statuses:['script','production','editing']},
  {key:'approval',label:'Aprovação',statuses:['approval','changes_requested']},{key:'approved',label:'Aprovados',statuses:['approved']},
  {key:'scheduled',label:'Agendados',statuses:['scheduled']},{key:'published',label:'Publicados',statuses:['published']}
]};
function workflowStageFromPublicV583(status){return({idea:'idea',script:'building',production:'building',editing:'visual_production',approval:'client_approval',changes_requested:'internal_review',approved:'client_approval',scheduled:'scheduled',published:'published'})[status]||'building'}
function workflowPortalCardV583(content){return`<article class="v583-card portal" data-contentopen="${content.id}">${socialAssetV550(content)}<div class="v583-card-copy"><small class="ey">${E(fmt(content.format||'undefined'))}</small><h4>${E(content.title||'Conteúdo')}</h4><span class="tag">${E(workflowStageLabelV583(workflowStageFromPublicV583(content.status)))}</span></div></article>`}
socialWorkflowV550=function(items,preview=false){
  if(preview){let mapped=items.map(content=>({...content,_v583stage:workflowWorkV583(content.id)?workflowStageV583(workflowWorkV583(content.id)):workflowStageFromPublicV583(content.status)}));return`<div class="v550-workflow-wrap"><div class="v583-board preview">${workflowStagesV583.map(([key,label])=>{let rows=mapped.filter(c=>c._v583stage===key);return`<section class="v583-lane"><header><i></i><b>${E(label)}</b><span>${rows.length}</span></header>${rows.map(workflowPortalCardV583).join('')||'<div class="v583-empty">Nenhum conteúdo</div>'}</section>`}).join('')}</div></div>`}
  let visible=items.filter(workflowFilteredV583);return`<section class="v583-radar"><button data-v583-focus="all" class="${workflowFocusV583==='all'?'on':''}"><b>${items.length}</b><span>Todos</span></button><button data-v583-focus="mine" class="${workflowFocusV583==='mine'?'on':''}"><b>${items.filter(c=>workflowWorkV583(c.id)?.assigned_to===S.user?.id).length}</b><span>Minha vez</span></button><button data-v583-focus="client" class="${workflowFocusV583==='client'?'on':''}"><b>${items.filter(c=>workflowStageV583(workflowWorkV583(c.id))==='client_approval').length}</b><span>Aguardando cliente</span></button><button data-v583-focus="late" class="${workflowFocusV583==='late'?'on':''}"><b>${items.filter(c=>{let w=workflowWorkV583(c.id);return w?.internal_due_date&&w.internal_due_date<today()&&!['scheduled','published'].includes(workflowStageV583(w))}).length}</b><span>Atrasados</span></button><button data-v583-focus="unassigned" class="${workflowFocusV583==='unassigned'?'on':''}"><b>${items.filter(c=>!workflowWorkV583(c.id)?.assigned_to).length}</b><span>Sem responsável</span></button></section><div class="v550-workflow-wrap"><div class="v583-board">${workflowStagesV583.map(([key,label])=>{let rows=visible.filter(c=>workflowStageV583(workflowWorkV583(c.id))===key).sort((a,b)=>Number(workflowWorkV583(a.id)?.editorial_order||999)-Number(workflowWorkV583(b.id)?.editorial_order||999));return`<section class="v583-lane" data-v583-drop="${key}"><header><i></i><b>${E(label)}</b><span>${rows.length}</span></header>${rows.map(workflowCardV583).join('')||'<div class="v583-empty">Arraste um conteúdo para cá</div>'}</section>`}).join('')}</div></div>`
};

const _loadV583Base=load;
load=async function(){await _loadV583Base();if(M?.role!=='team'){D.workflowActivity=[];return}try{D.workflowActivity=await api('/rest/v1/content_workflow_activity?select=*&order=created_at.desc&limit=300')}catch(error){console.warn('Histórico do workflow',error);D.workflowActivity=[]}};
async function workflowActivityV583(content,action,comment='',fromStatus=null,toStatus=null,metadata={}){try{await api('/rest/v1/content_workflow_activity',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:content.client_id,content_id:content.id,actor_id:S.user?.id,action,comment:comment||null,from_status:fromStatus,to_status:toStatus,metadata})})}catch(error){console.warn('Histórico',error)}}
async function workflowSetStageV583(contentId,stage){let content=D.contents.find(row=>row.id===contentId);if(!content)return;let work=workflowWorkV583(contentId),before=workflowStageV583(work),now=new Date().toISOString(),payload={organization_id:M.organization_id,client_id:content.client_id,content_id:content.id,internal_status:stage,stalled_since:now,updated_at:now};try{if(work)await patch('content_team_workflow',work.id,payload);else await api('/rest/v1/content_team_workflow',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({...payload,created_by:S.user?.id})});await patch('contents',content.id,{status:workflowPublicStatusV583(stage),updated_at:now});if(stage==='client_approval'&&!D.approvals.some(a=>a.content_id===content.id&&a.status==='pending'))await createApproval(content.id,content.client_id);await workflowActivityV583(content,'stage_changed','',before,stage);await load();render();toast(`Movido para ${workflowStageLabelV583(stage)}`)}catch(error){toast(error.message)}}

function workflowFormatFieldsV583(format,slides=[]){
  if(format==='carousel'){let count=Math.max(2,Math.min(20,Number(slides.length||5)));return`<div class="field"><label>Quantidade de slides</label><input name="slide_count" data-v583-slide-count type="number" min="2" max="20" value="${count}"></div><div class="v583-slide-grid" data-v583-slides>${Array.from({length:count},(_,index)=>`<label><small>${index===0?'CAPA':`SLIDE ${index+1}`}</small><textarea data-v583-slide="${index}" rows="3" placeholder="${index===0?'Gancho e título da capa':'Conteúdo deste slide'}">${E(slides[index]||'')}</textarea></label>`).join('')}</div>`}
  if(format==='reel'||format==='video')return`<div class="formgrid"><div class="field"><label>Gancho</label><textarea name="hook" rows="3">${E(slides[0]||'')}</textarea></div><div class="field"><label>Cenas / takes</label><textarea name="scenes" rows="3">${E(slides[1]||'')}</textarea></div></div><div class="formgrid"><div class="field"><label>Fala, narração ou texto</label><textarea name="narration" rows="4">${E(slides[2]||'')}</textarea></div><div class="field"><label>Direção de gravação e edição</label><textarea name="recording_direction" rows="4">${E(slides[3]||'')}</textarea></div></div>`;
  if(format==='story')return`<div class="field"><label>Sequência de stories</label><textarea name="story_sequence" rows="5">${E(slides[0]||'')}</textarea></div>`;
  return`<div class="field"><label>Texto que vai na arte</label><textarea name="art_text" rows="4">${E(slides[0]||'')}</textarea></div>`
}
function workflowApprovalChecksV583(state={}){return(D.profiles||[]).map(person=>`<label><input type="checkbox" name="internal_approval" value="${person.user_id}" ${state[person.user_id]?'checked':''}> <span>${E(person.display_name)} aprovou</span></label>`).join('')}
function workflowReferencesV583(brief){return Array.isArray(brief.reference_links)?brief.reference_links.join('\n'):''}
function workflowActivityListV583(contentId){let rows=(D.workflowActivity||[]).filter(row=>row.content_id===contentId).slice(0,20);return rows.map(row=>`<div class="v583-history-row"><span>${E(profile(row.actor_id)?.display_name||'Equipe')}</span><b>${E(({created:'criou a ficha',updated:'atualizou a ficha',stage_changed:'moveu a etapa',comment:'comentou'})[row.action]||row.action)}</b>${row.to_status?`<em>${E(workflowStageLabelV583(row.to_status))}</em>`:''}${row.comment?`<p>${E(row.comment)}</p>`:''}<small>${new Date(row.created_at).toLocaleString('pt-BR')}</small></div>`).join('')||'<div class="empty">O histórico começa quando a ficha for salva.</div>'}
function workflowBriefModalV583(content){let isNew=!content,work=isNew?null:workflowWorkV583(content.id),brief=workflowBriefV583(work),format=content?.format||'undefined',slides=Array.isArray(work?.slides)?work.slides:[],stage=workflowStageV583(work),clientId=content?.client_id||contentClient,approvalState=work?.approval_state||{};return`<div class="modalbg"><div class="modal wide v583-modal"><div class="head"><div><small class="ey">${isNew?'NOVA FICHA DE CONTEÚDO':`FICHA · ${E(workflowStageLabelV583(stage))}`}</small><h2>${isNew?'Transforme a ideia em produção':E(content.title)}</h2><p class="muted">Uma única ficha acompanha o conteúdo da estratégia até a publicação.</p></div><button class="btn ghost small" data-close>✕</button></div><form id="workflowBriefFormV583" data-content="${E(content?.id||'')}"><section class="v583-form-section"><small>01 · DIREÇÃO</small><div class="formgrid"><div class="field"><label>Cliente</label><select name="client_id" ${isNew?'':'disabled'}>${(D.clients||[]).filter(c=>c.active&&hasClientService(c.id,'social_media')).map(c=>`<option value="${c.id}" ${clientId===c.id?'selected':''}>${E(c.name)}</option>`).join('')}</select></div><div class="field"><label>Título do post</label><input name="title" required value="${E(content?.title||'')}"></div></div><div class="formgrid"><div class="field"><label>Linha editorial</label><select name="editorial_pillar_id"><option value="">Definir depois</option>${(D.pillars||[]).filter(p=>p.client_id===clientId&&p.active).map(p=>`<option value="${p.id}" ${content?.editorial_pillar_id===p.id?'selected':''}>${E(p.name)}</option>`).join('')}</select></div><div class="field"><label>Objetivo deste conteúdo</label><input name="objective" value="${E(content?.objective||brief.objective||'')}" placeholder="Ex.: posicionar, educar, conectar, vender"></div></div><div class="formgrid"><div class="field"><label>Público / momento da jornada</label><input name="audience_journey" value="${E(brief.audience_journey||'')}"></div><div class="field"><label>Mensagem central</label><input name="central_message" value="${E(content?.central_idea||brief.central_message||'')}"></div></div><div class="formgrid"><div class="field"><label>O que precisa transmitir?</label><textarea name="transmit" rows="3">${E(brief.transmit||'')}</textarea></div><div class="field"><label>Qual sensação ou percepção deve deixar?</label><textarea name="desired_feeling" rows="3">${E(brief.desired_feeling||'')}</textarea></div></div></section><section class="v583-form-section"><small>02 · FORMATO E TEXTO</small><div class="formgrid"><div class="field"><label>Formato</label><select name="format" data-v583-format>${[['undefined','Definir depois'],['static_post','Post estático'],['carousel','Carrossel'],['reel','Reels'],['story','Stories'],['video','Vídeo']].map(([v,l])=>`<option value="${v}" ${format===v?'selected':''}>${l}</option>`).join('')}</select></div><div class="field"><label>Canal</label><input name="channel" value="${E(brief.channel||'Instagram')}" placeholder="Instagram, TikTok..."></div></div><div data-v583-format-fields>${workflowFormatFieldsV583(format,slides)}</div><div class="field"><label>Legenda</label><textarea name="caption" rows="5">${E(content?.caption||'')}</textarea></div><div class="field"><label>CTA</label><input name="cta" value="${E(content?.cta||'')}"></div></section><section class="v583-form-section"><small>03 · DIREÇÃO VISUAL E REFERÊNCIAS</small><div class="formgrid"><div class="field"><label>Imagens, cenas, elementos e estilo</label><textarea name="visual_direction" rows="4">${E(brief.visual_direction||'')}</textarea></div><div class="field"><label>O que evitar</label><textarea name="avoid" rows="4">${E(brief.avoid||'')}</textarea></div></div><div class="field"><label>Links de referência ou inspiração <span class="muted">(um por linha)</span></label><textarea name="reference_links" rows="4" placeholder="Cole links do Instagram, Pinterest, Canva, Drive...">${E(workflowReferencesV583(brief))}</textarea><small class="muted">Anote na linha seguinte o que aproveitar e o que não copiar, se necessário.</small></div><div class="field"><label>Materiais da cliente</label><textarea name="client_assets" rows="3" placeholder="Fotos disponíveis, vídeos, depoimentos, pasta do Drive...">${E(brief.client_assets||'')}</textarea></div></section><section class="v583-form-section"><small>04 · PRODUÇÃO E RESPONSÁVEIS</small><div class="formgrid"><div class="field"><label>Etapa atual</label><select name="internal_status">${workflowStagesV583.map(([v,l])=>`<option value="${v}" ${stage===v?'selected':''}>${l}</option>`).join('')}</select></div><div class="field"><label>Próxima ação</label><input name="next_action" value="${E(work?.next_action||'')}" placeholder="Ex.: Thalia criar as artes"></div></div><div class="formgrid"><div class="field"><label>Quem está com a próxima ação?</label><select name="assigned_to">${workflowProfileOptionsV583(work?.assigned_to,'Definir responsável')}</select></div><div class="field"><label>Prazo interno</label><input name="internal_due_date" type="date" value="${E(work?.internal_due_date||'')}"></div></div><div class="formgrid"><div class="field"><label>Responsável pelo conteúdo</label><select name="content_owner_id">${workflowProfileOptionsV583(work?.content_owner_id)}</select></div><div class="field"><label>Responsável por design / edição</label><select name="design_owner_id">${workflowProfileOptionsV583(work?.design_owner_id)}</select></div></div><div class="formgrid"><div class="field"><label>Revisão final</label><select name="reviewer_id">${workflowProfileOptionsV583(work?.reviewer_id)}</select></div><div class="field"><label>Ordem editorial do mês</label><input name="editorial_order" type="number" min="1" value="${E(work?.editorial_order||'')}"></div></div><div class="formgrid"><div class="field"><label>Data de publicação</label><input name="publication_date" type="date" value="${E(content?.publication_date||'')}"></div><div class="field"><label>Link editável do Canva / material</label><input name="canva_edit_url" type="url" value="${E(work?.canva_edit_url||'')}"></div></div><div class="v583-approvals"><small>CONFERÊNCIA DA EQUIPE</small>${workflowApprovalChecksV583(approvalState)}</div><div class="field"><label>Observações internas</label><textarea name="internal_notes" rows="3">${E(work?.internal_notes||'')}</textarea></div></section><div class="actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button class="btn pri">${isNew?'Criar ficha':'Salvar ficha'}</button></div></form>${isNew?'':`<section class="v583-history"><div class="head"><div><small class="ey">HISTÓRICO</small><h3>Decisões e comentários</h3></div></div><form id="workflowCommentFormV583" data-content="${content.id}"><input name="comment" required placeholder="Deixe uma observação para a outra pessoa..."><button class="btn ghost small">Comentar</button></form>${workflowActivityListV583(content.id)}</section>`}</div></div>`}

const _modalV583Base=modal;
modal=function(){if(MD?.type==='contentNew')return workflowBriefModalV583(null);if(MD?.type==='contentDetail'&&M?.role==='team')return workflowBriefModalV583(D.contents.find(row=>row.id===MD.id));return _modalV583Base()};
function workflowReadSlidesV583(form,format){if(format==='carousel')return Array.from(form.querySelectorAll('[data-v583-slide]')).map(el=>String(el.value||'').trim());if(format==='reel'||format==='video')return['hook','scenes','narration','recording_direction'].map(name=>String(form.elements[name]?.value||'').trim());if(format==='story')return[String(form.elements.story_sequence?.value||'').trim()];return[String(form.elements.art_text?.value||'').trim()]}
async function workflowSaveBriefV583(event){event.preventDefault();let form=event.currentTarget,data=new FormData(form),id=form.dataset.content,existing=id?D.contents.find(row=>row.id===id):null,clientId=existing?.client_id||String(data.get('client_id')||''),format=String(data.get('format')||'undefined'),stage=String(data.get('internal_status')||'idea'),now=new Date().toISOString(),approvalState={};data.getAll('internal_approval').forEach(id=>approvalState[id]=true);let brief={audience_journey:String(data.get('audience_journey')||'').trim(),channel:String(data.get('channel')||'').trim(),central_message:String(data.get('central_message')||'').trim(),transmit:String(data.get('transmit')||'').trim(),desired_feeling:String(data.get('desired_feeling')||'').trim(),visual_direction:String(data.get('visual_direction')||'').trim(),avoid:String(data.get('avoid')||'').trim(),client_assets:String(data.get('client_assets')||'').trim(),reference_links:String(data.get('reference_links')||'').split('\n').map(v=>v.trim()).filter(Boolean)};let contentPayload={organization_id:M.organization_id,client_id:clientId,title:String(data.get('title')||'').trim(),format,objective:String(data.get('objective')||'').trim()||null,central_idea:brief.central_message||null,editorial_pillar_id:String(data.get('editorial_pillar_id')||'')||null,caption:String(data.get('caption')||'').trim()||null,cta:String(data.get('cta')||'').trim()||null,publication_date:String(data.get('publication_date')||'')||null,reference_links:brief.reference_links.filter(v=>/^https?:\/\//i.test(v)),status:workflowPublicStatusV583(stage),updated_at:now};try{let content;if(existing){await patch('contents',existing.id,contentPayload);content={...existing,...contentPayload}}else{let plan=await ensurePlan(clientId,contentMonth),rows=await api('/rest/v1/contents',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({...contentPayload,monthly_plan_id:plan?.id||null,created_by:S.user?.id})});content=rows?.[0];if(!content?.id)throw Error('Não foi possível criar a ficha.')}let old=workflowWorkV583(content.id),workPayload={organization_id:M.organization_id,client_id:clientId,content_id:content.id,source_insight_id:workflowSourceInsightV583||old?.source_insight_id||null,internal_status:stage,assigned_to:String(data.get('assigned_to')||'')||null,content_owner_id:String(data.get('content_owner_id')||'')||null,design_owner_id:String(data.get('design_owner_id')||'')||null,reviewer_id:String(data.get('reviewer_id')||'')||null,next_action:String(data.get('next_action')||'').trim()||null,internal_due_date:String(data.get('internal_due_date')||'')||null,editorial_order:Number(data.get('editorial_order')||0)||null,brief,slides:workflowReadSlidesV583(form,format),approval_state:approvalState,canva_edit_url:String(data.get('canva_edit_url')||'').trim()||null,internal_notes:String(data.get('internal_notes')||'').trim()||null,updated_at:now};if(!old||workflowStageV583(old)!==stage)workPayload.stalled_since=now;if(old)await patch('content_team_workflow',old.id,workPayload);else await api('/rest/v1/content_team_workflow',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({...workPayload,created_by:S.user?.id})});if(workflowSourceInsightV583)await patch('client_insights',workflowSourceInsightV583,{status:'converted',converted_content_id:content.id,updated_at:now});workflowSourceInsightV583=null;if(stage==='client_approval'&&!D.approvals.some(a=>a.content_id===content.id&&a.status==='pending'))await createApproval(content.id,clientId);await workflowActivityV583(content,existing?'updated':'created','',old?workflowStageV583(old):null,stage,{title:content.title});contentClient=clientId;contentMode='workflow';MD=null;await load();render();toast(existing?'Ficha atualizada ✦':'Ficha criada e enviada ao fluxo ✦')}catch(error){toast(error.message)}}
async function workflowCommentV583(event){event.preventDefault();let form=event.currentTarget,content=D.contents.find(row=>row.id===form.dataset.content),comment=String(new FormData(form).get('comment')||'').trim();if(!content||!comment)return;await workflowActivityV583(content,'comment',comment);await load();render();toast('Comentário registrado')}
function workflowAutoAdvanceV583(){let form=document.getElementById('workflowBriefFormV583'),stage=form?.elements.internal_status,approvers=(D.profiles||[]).map(person=>person.user_id),checked=new Set(Array.from(form?.querySelectorAll('input[name="internal_approval"]:checked')||[]).map(input=>input.value));if(stage?.value==='internal_review'&&approvers.length>1&&approvers.every(id=>checked.has(id)))stage.value='client_approval'}
function workflowBindFormatV583(){let form=document.getElementById('workflowBriefFormV583'),select=form?.querySelector('[data-v583-format]'),slot=form?.querySelector('[data-v583-format-fields]');form?.addEventListener('submit',workflowAutoAdvanceV583,true);if(!select||!slot)return;select.onchange=()=>{slot.innerHTML=workflowFormatFieldsV583(select.value,[]);workflowBindSlideCountV583()};workflowBindSlideCountV583()}
function workflowBindSlideCountV583(){let count=document.querySelector('[data-v583-slide-count]'),slot=document.querySelector('[data-v583-slides]');if(!count||!slot)return;count.onchange=()=>{let values=Array.from(slot.querySelectorAll('[data-v583-slide]')).map(el=>el.value),number=Math.max(2,Math.min(20,Number(count.value||5)));slot.innerHTML=Array.from({length:number},(_,index)=>`<label><small>${index===0?'CAPA':`SLIDE ${index+1}`}</small><textarea data-v583-slide="${index}" rows="3">${E(values[index]||'')}</textarea></label>`).join('')}}
function workflowBindDragV583(){document.querySelectorAll('[data-v583-drag]').forEach(card=>{card.ondragstart=()=>{workflowDragV583=card.dataset.v583Drag;card.classList.add('dragging')};card.ondragend=()=>{workflowDragV583=null;card.classList.remove('dragging')}});document.querySelectorAll('[data-v583-drop]').forEach(lane=>{lane.ondragover=e=>{e.preventDefault();lane.classList.add('drop-ready')};lane.ondragleave=()=>lane.classList.remove('drop-ready');lane.ondrop=e=>{e.preventDefault();lane.classList.remove('drop-ready');if(workflowDragV583)workflowSetStageV583(workflowDragV583,lane.dataset.v583Drop)}})}
const _bindV583Base=bind;
bind=function(){_bindV583Base();document.querySelectorAll('[data-v583-focus]').forEach(button=>button.onclick=()=>{workflowFocusV583=button.dataset.v583Focus;render()});document.getElementById('workflowBriefFormV583')?.addEventListener('submit',workflowSaveBriefV583);document.getElementById('workflowCommentFormV583')?.addEventListener('submit',workflowCommentV583);workflowBindFormatV583();workflowBindDragV583()};
convertInsight=async function(id){let idea=(D.insights||[]).find(row=>row.id===id);if(!idea)return;workflowSourceInsightV583=id;contentClient=idea.client_id;MD={type:'contentNew'};render();setTimeout(()=>{let form=document.getElementById('workflowBriefFormV583');if(!form)return;form.elements.title.value=idea.title||'';form.elements.objective.value=idea.notes||'';form.elements.reference_links.value=idea.source_url||''},0)};
const _contentPageV583Base=contentPage;
contentPage=function(){if(contentMode==='lab')contentMode='workflow';let html=_contentPageV583Base();html=html.replace(/<button[^>]*data-cmode="lab"[^>]*>[\s\S]*?<\/button>/g,'');return html.replace('Estratégia, criação e resultado<br>no mesmo fluxo.','Ideia, criação, aprovação e publicação<br>no mesmo fluxo.')};

const v583Style=document.createElement('style');v583Style.textContent=`
.v583-radar{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:12px}.v583-radar button{display:flex;align-items:center;gap:10px;padding:13px;border:1px solid #2d2d2d;border-radius:14px;background:#131313;color:#777;text-align:left}.v583-radar button.on{border-color:#8b431c;background:#23140c;color:#fff}.v583-radar b{color:#fff;font-size:20px}.v583-radar span{font-size:8px;font-weight:900;text-transform:uppercase}.v583-board{display:grid;grid-template-columns:repeat(8,minmax(235px,1fr));gap:9px;min-width:1950px}.v583-board.preview{min-width:1950px}.v583-lane{min-height:500px;padding:9px;border:1px solid #282828;border-radius:18px;background:#101010;transition:.15s}.v583-lane.drop-ready{border-color:#ff6a00;background:#18110d}.v583-lane>header{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;padding:8px 6px 13px}.v583-lane>header i{width:7px;height:7px;border-radius:50%;background:#555}.v583-lane:nth-child(2)>header i,.v583-lane:nth-child(4)>header i{background:#ff6a00}.v583-lane:nth-child(6)>header i{background:#e1b94d}.v583-lane:nth-child(7)>header i{background:#72a7ff}.v583-lane:nth-child(8)>header i{background:#62c878}.v583-lane>header b{font-size:10px}.v583-lane>header span{display:grid;place-items:center;min-width:23px;height:23px;border-radius:99px;background:#222;color:#888;font-size:8px}.v583-empty{display:grid;place-items:center;min-height:130px;padding:15px;border:1px dashed #292929;border-radius:13px;color:#555;font-size:8px;text-align:center}.v583-card{overflow:hidden;margin-bottom:9px;border:1px solid #303030;border-radius:15px;background:#171717;cursor:pointer}.v583-card.dragging{opacity:.4}.v583-card.is-late{border-color:#6a2929}.v583-card>.v550-media{aspect-ratio:16/9}.v583-card-copy{padding:11px}.v583-card-top{display:flex;justify-content:space-between;gap:7px;color:#777;font-size:7px;text-transform:uppercase}.v583-card-top b{color:#ff7b32}.v583-card h4{margin:7px 0;font-size:12px;line-height:1.3}.v583-card-tags{display:flex;gap:5px;flex-wrap:wrap}.v583-card-tags span{padding:4px 6px;border-radius:99px;background:#222;color:#888;font-size:6px;text-transform:uppercase}.v583-next{margin-top:10px;padding:9px;border-left:2px solid #ff6a00;background:#111}.v583-next small,.v583-next strong,.v583-next span{display:block}.v583-next small{color:#ff7b32;font-size:6px;font-weight:950}.v583-next strong{margin:4px 0;color:#ddd;font-size:8px}.v583-next span{color:#666;font-size:7px}.v583-card footer{display:flex;justify-content:space-between;gap:5px;margin-top:9px;color:#666;font-size:7px}.v583-card footer em{font-style:normal}.v583-card footer em.mine{color:#ff7b32;font-weight:900}.v583-modal{max-width:1050px}.v583-modal>.head{align-items:flex-start}.v583-modal>.head h2{margin:6px 0}.v583-form-section{margin:12px 0;padding:17px;border:1px solid #2d2d2d;border-radius:17px;background:#111}.v583-form-section>small{display:block;margin-bottom:13px;color:#ff7625;font-size:8px;font-weight:950;letter-spacing:.12em}.v583-slide-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:9px 0}.v583-slide-grid label{display:block;padding:10px;border:1px solid #303030;border-radius:12px;background:#0c0c0c}.v583-slide-grid small{display:block;margin-bottom:6px;color:#ff7625;font-size:7px;font-weight:950}.v583-slide-grid textarea{width:100%;border:0;background:transparent;color:#fff;resize:vertical}.v583-slide-grid textarea:focus{outline:0}.v583-approvals{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0;padding:12px;border:1px solid #3b2a20;border-radius:12px;background:#18110d}.v583-approvals>small{width:100%;color:#ff7625;font-size:7px;font-weight:950}.v583-approvals label{padding:8px 10px;border:1px solid #3a3a3a;border-radius:9px;background:#111;color:#aaa;font-size:8px}.v583-approvals input{accent-color:#ff6a00}.v583-history{margin-top:16px;padding:17px;border-top:1px solid #303030}.v583-history form{display:flex;gap:7px;margin:10px 0}.v583-history form input{flex:1}.v583-history-row{display:grid;grid-template-columns:auto 1fr auto auto;gap:7px;align-items:center;padding:10px 0;border-top:1px solid #292929;font-size:8px}.v583-history-row>span{color:#ff7b32;font-weight:900}.v583-history-row>em{padding:4px 6px;border-radius:99px;background:#222;color:#aaa;font-style:normal}.v583-history-row>p{grid-column:1/-1;margin:2px 0;color:#bbb;line-height:1.45}.v583-history-row>small{color:#666}
@media(max-width:760px){.v583-radar{display:flex;overflow-x:auto}.v583-radar button{flex:0 0 145px}.v583-board{min-width:1840px}.v583-modal{padding:14px}.v583-form-section{padding:13px}.v583-form-section .formgrid,.v583-slide-grid{grid-template-columns:1fr}.v583-history form{flex-direction:column}.v583-history-row{grid-template-columns:auto 1fr}.v583-history-row>em,.v583-history-row>small{grid-column:auto}.v583-modal .actions{display:grid;grid-template-columns:1fr}.v583-modal .actions .btn{width:100%}}
`;document.head.appendChild(v583Style);
// ===== FIM COLAB V5.83 =====

// ===== COLAB V5.84 — SUGESTÕES PARA A CLIENTE GRAVAR =====
const recordingStatusV584={suggested:'Nova sugestão',seen:'Vista pela cliente',planned:'Vai gravar',recorded:'Gravado',used:'Virou conteúdo',dismissed:'Arquivada'};
const recordingTypeV584={trend:'Trend',reel:'Reels',story:'Stories',behind_scenes:'Bastidores',idea:'Ideia autoral',other:'Outro'};
if(!clientHubTabDefsV563.some(item=>item[0]==='recording')){
  let ideasIndex=clientHubTabDefsV563.findIndex(item=>item[0]==='ideas');
  clientHubTabDefsV563.splice(ideasIndex>=0?ideasIndex+1:2,0,['recording','Para gravar'])
}
let oldLabIndexV584=clientHubTabDefsV563.findIndex(item=>item[0]==='lab');
if(oldLabIndexV584>=0)clientHubTabDefsV563.splice(oldLabIndexV584,1);

const _loadV584Base=load;
load=async function(){
  await _loadV584Base();
  try{D.recordingSuggestions=await api('/rest/v1/client_recording_suggestions?select=*&order=created_at.desc')}
  catch(error){console.warn('Sugestões para gravar',error);D.recordingSuggestions=[]}
};
function recordingRowsV584(cid){return(D.recordingSuggestions||[]).filter(row=>row.client_id===cid)}
function recordingStatusClassV584(status){return status==='recorded'||status==='used'?'done':status==='planned'?'planned':status==='dismissed'?'muted':'open'}
function recordingCardV584(row,portal=false,preview=false){
  let status=row.status||'suggested',link=String(row.source_url||'').trim();
  return`<article class="v584-card status-${recordingStatusClassV584(status)}"><div class="v584-card-head"><div><small>${E(recordingTypeV584[row.suggestion_type]||'Sugestão')}</small><h3>${E(row.title)}</h3></div><span>${E(recordingStatusV584[status]||status)}</span></div>${row.instructions?`<div class="v584-direction"><small>IDEIA PARA GRAVAR</small><p>${E(row.instructions).replace(/\n/g,'<br>')}</p></div>`:''}${row.recording_notes?`<div class="v584-notes"><b>Como gravar</b><p>${E(row.recording_notes).replace(/\n/g,'<br>')}</p></div>`:''}<div class="v584-card-meta">${row.due_date?`<span>Ideal até ${fmtDate(row.due_date)}</span>`:''}${row.client_note?`<span>Resposta: ${E(row.client_note)}</span>`:''}</div><div class="v584-card-actions">${link?`<a class="btn pri small" href="${E(link)}" target="_blank" rel="noopener">Ver referência ↗</a>`:''}${portal?`${preview?'':[['seen','Vi a sugestão'],['planned','Vou gravar'],['recorded','Já gravei']].filter(([value])=>value!==status).map(([value,label])=>`<button class="btn ghost small" data-recording-client-status="${row.id}" data-status="${value}">${label}</button>`).join('')}`:`<select data-recording-team-status="${row.id}">${Object.entries(recordingStatusV584).map(([value,label])=>`<option value="${value}" ${status===value?'selected':''}>${E(label)}</option>`).join('')}</select><button class="btn danger small" data-recording-delete="${row.id}">Excluir</button>`}</div>${portal&&!preview?`<form class="v584-client-note" data-recording-note="${row.id}"><input name="client_note" value="${E(row.client_note||'')}" maxlength="300" placeholder="Quer deixar uma dúvida ou observação?"><button class="btn ghost small">Enviar</button></form>`:''}</article>`
}
function clientRecordingPaneV584(cid){
  let rows=recordingRowsV584(cid),active=rows.filter(row=>!['used','dismissed'].includes(row.status)),done=rows.filter(row=>['used','dismissed'].includes(row.status));
  return`<section class="panel v5-hub-wide v584-client-pane" id="recording" ${clientHubTabsV563[cid]==='recording'?'data-v563-active':''}><div class="v584-pane-hero"><div><small class="ey">SUGESTÕES PARA A CLIENTE GRAVAR</small><h2>Referência, direção e retorno no mesmo lugar.</h2><p>Publique trends, cenas e ideias para a cliente produzir. Ela visualiza tudo no próprio portal e avisa quando pretende gravar ou quando já gravou.</p></div><span>${active.length} ativa${active.length===1?'':'s'}</span></div><details class="v584-compose" ${rows.length?'':'open'}><summary>＋ Nova sugestão para gravar</summary><form id="recordingSuggestionFormV584" data-client="${cid}"><div class="formgrid"><div class="field"><label>Tipo</label><select name="suggestion_type">${Object.entries(recordingTypeV584).map(([value,label])=>`<option value="${value}">${E(label)}</option>`).join('')}</select></div><div class="field"><label>Título da sugestão</label><input name="title" required placeholder="Ex.: Trend para fazer com a equipe"></div></div><div class="field"><label>Link da referência</label><input name="source_url" type="url" placeholder="https://www.instagram.com/reel/..."></div><div class="field"><label>Qual é a ideia?</label><textarea name="instructions" rows="3" placeholder="Explique o conceito e por que combina com a cliente."></textarea></div><div class="field"><label>Como ela deve gravar?</label><textarea name="recording_notes" rows="4" placeholder="Quem participa, posição do celular, cenas, falas, duração e cuidados."></textarea></div><div class="field"><label>Prazo sugerido <span class="muted">(opcional)</span></label><input name="due_date" type="date"></div><button class="btn pri full">Publicar no portal da cliente</button></form></details><div class="v584-list">${active.map(row=>recordingCardV584(row,false)).join('')||'<div class="empty">Nenhuma sugestão ativa. Publique a primeira acima.</div>'}</div>${done.length?`<details class="v584-archive"><summary>Histórico · ${done.length}</summary><div class="v584-list">${done.map(row=>recordingCardV584(row,false)).join('')}</div></details>`:''}</section>`
}
const _clientHubPageV584Base=clientHubPageV5;
clientHubPageV5=function(clientId){
  if(clientHubTabsV563[clientId]==='lab')clientHubTabsV563[clientId]='recording';
  let html=_clientHubPageV584Base(clientId),hasSocial=clientActiveServicesV582(clientId).includes('social_media');
  html=html.replace(/<section class="v564-lab-spotlight">[\s\S]*?<\/section>/,'').replace(/<button[^>]*data-client-tab="lab"[^>]*>[\s\S]*?<\/button>/,'');
  if(!hasSocial)return html.replace(/<button[^>]*data-client-tab="recording"[^>]*>[\s\S]*?<\/button>/,'');
  return html.replace(/<\/div>$/,clientRecordingPaneV584(clientId)+'</div>')
};

function portalRecordingPageV584(cid,preview=false){
  let client=portalClientV428(cid)||cl(cid)||{},rows=recordingRowsV584(cid),active=rows.filter(row=>!['used','dismissed'].includes(row.status)),recorded=rows.filter(row=>row.status==='recorded').length;
  return`<div class="portal-v428 v584-portal">${portalTabsV428('recording',preview)}<section class="v584-portal-hero"><div><small class="ey">PARA VOCÊ GRAVAR</small><h2>Ideias que combinam com a sua marca.</h2><p>Aqui estão as trends, cenas e sugestões que preparamos para ${E(client.name||'você')}. Abra a referência, veja a orientação e conte para a gente quando gravar.</p></div><span>${recorded} gravada${recorded===1?'':'s'}</span></section><div class="v584-portal-list">${active.map(row=>recordingCardV584(row,true,preview)).join('')||`<div class="v584-portal-empty"><span>✦</span><h3>Nenhuma gravação pendente</h3><p>Quando a equipe Colab publicar uma nova sugestão, ela aparecerá aqui.</p></div>`}</div></div>`
}
const _portalTabsV584Base=portalTabsV428;
portalTabsV428=function(active,preview){let html=_portalTabsV584Base(active,preview);if(html.includes('data-v="recording"')||html.includes('data-previewtab="recording"'))return html;return html.replace('</nav>',`<button type="button" ${portalTabAttrsV428('recording',preview)} class="${active==='recording'?'on':''}">Para gravar</button></nav>`)};
const _portalPageV584Base=portalPageV428;
portalPageV428=function(route,cid,preview=false){if(route==='recording')return portalRecordingPageV584(cid,preview);return _portalPageV584Base(route,cid,preview)};
const _portalOverviewV584Base=portalOverviewV550;
portalOverviewV550=function(cid,preview=false){let html=_portalOverviewV584Base(cid,preview),rows=recordingRowsV584(cid).filter(row=>!['used','dismissed'].includes(row.status)),next=rows[0];if(!next)return html;let block=`<section class="portal-panel-v428 v584-home-callout"><div><small class="ey">NOVA SUGESTÃO PARA GRAVAR</small><h3>${E(next.title)}</h3><p>${E(next.instructions||'Abra a sugestão para ver a referência e a orientação da equipe Colab.')}</p></div><button class="btn pri" ${portalTabAttrsV428('recording',preview)}>Ver sugestões →</button></section>`;return html.replace(/<\/div>$/,block+'</div>')};

async function saveRecordingSuggestionV584(event){event.preventDefault();let form=event.currentTarget,data=new FormData(form),cid=form.dataset.client,payload={organization_id:M.organization_id,client_id:cid,suggestion_type:String(data.get('suggestion_type')||'trend'),title:String(data.get('title')||'').trim(),source_url:String(data.get('source_url')||'').trim()||null,instructions:String(data.get('instructions')||'').trim()||null,recording_notes:String(data.get('recording_notes')||'').trim()||null,due_date:String(data.get('due_date')||'')||null,status:'suggested',created_by:S.user?.id};try{await api('/rest/v1/client_recording_suggestions',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(payload)});await load();render();toast('Sugestão publicada no portal ✦')}catch(error){toast(error.message)}}
async function updateRecordingSuggestionV584(id,values,message){try{await patch('client_recording_suggestions',id,{...values,updated_at:new Date().toISOString()});await load();render();toast(message)}catch(error){toast(error.message)}}
async function deleteRecordingSuggestionV584(id){if(!confirm('Excluir esta sugestão do portal da cliente?'))return;try{await api('/rest/v1/client_recording_suggestions?id=eq.'+id,{method:'DELETE',headers:{Prefer:'return=minimal'}});await load();render();toast('Sugestão excluída')}catch(error){toast(error.message)}}
async function saveRecordingClientNoteV584(event){event.preventDefault();let form=event.currentTarget,note=String(new FormData(form).get('client_note')||'').trim();await updateRecordingSuggestionV584(form.dataset.recordingNote,{client_note:note},'Resposta enviada para a Colab')}
const _bindV584Base=bind;
bind=function(){_bindV584Base();document.getElementById('recordingSuggestionFormV584')?.addEventListener('submit',saveRecordingSuggestionV584);document.querySelectorAll('[data-recording-team-status]').forEach(select=>select.onchange=()=>updateRecordingSuggestionV584(select.dataset.recordingTeamStatus,{status:select.value,recorded_at:select.value==='recorded'?new Date().toISOString():null},'Andamento atualizado'));document.querySelectorAll('[data-recording-delete]').forEach(button=>button.onclick=()=>deleteRecordingSuggestionV584(button.dataset.recordingDelete));document.querySelectorAll('[data-recording-client-status]').forEach(button=>button.onclick=()=>updateRecordingSuggestionV584(button.dataset.recordingClientStatus,{status:button.dataset.status,seen_at:new Date().toISOString(),recorded_at:button.dataset.status==='recorded'?new Date().toISOString():null},button.dataset.status==='recorded'?'Gravação avisada para a Colab ✦':'Andamento enviado para a Colab'));document.querySelectorAll('[data-recording-note]').forEach(form=>form.addEventListener('submit',saveRecordingClientNoteV584))};

const v584Style=document.createElement('style');v584Style.textContent=`
.v584-client-pane{padding:23px!important}.v584-pane-hero,.v584-portal-hero{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:25px;border:1px solid #5b321b;border-radius:21px;background:radial-gradient(circle at 88% 0,rgba(255,106,0,.24),transparent 36%),linear-gradient(145deg,#21140d,#111 68%)}.v584-pane-hero h2,.v584-portal-hero h2{margin:7px 0 9px;font-size:30px;line-height:1.03}.v584-pane-hero p,.v584-portal-hero p{max-width:720px;margin:0;color:#8f8f8f;line-height:1.5}.v584-pane-hero>span,.v584-portal-hero>span{padding:9px 11px;border:1px solid #6d391c;border-radius:999px;color:#ff8740;font-size:8px;font-weight:950;text-transform:uppercase;white-space:nowrap}.v584-compose{margin:12px 0;padding:15px 17px;border:1px solid #303030;border-radius:16px;background:#121212}.v584-compose summary{color:#ff7a2d;font-size:10px;font-weight:950;cursor:pointer}.v584-compose form{margin-top:14px}.v584-list,.v584-portal-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v584-card{display:flex;min-width:0;flex-direction:column;padding:17px;border:1px solid #303030;border-radius:17px;background:#141414}.v584-card.status-planned{border-color:#6b4e1f}.v584-card.status-done{border-color:#27533a}.v584-card.status-muted{opacity:.65}.v584-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.v584-card-head small{color:#ff7b32;font-size:7px;font-weight:950;letter-spacing:.11em}.v584-card-head h3{margin:5px 0 0;font-size:17px;line-height:1.22}.v584-card-head>span{padding:6px 8px;border-radius:99px;background:#222;color:#aaa;font-size:6px;font-weight:950;text-transform:uppercase;white-space:nowrap}.v584-direction{margin-top:14px;padding:12px;border-left:2px solid #ff6a00;background:#19120e}.v584-direction small{color:#ff7b32;font-size:6px;font-weight:950}.v584-direction p,.v584-notes p{margin:6px 0 0;color:#bbb;font-size:9px;line-height:1.5}.v584-notes{margin-top:9px;padding:11px;border:1px solid #292929;border-radius:11px;background:#101010}.v584-notes b{font-size:8px}.v584-card-meta{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.v584-card-meta span{padding:5px 7px;border-radius:7px;background:#202020;color:#888;font-size:7px}.v584-card-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-top:auto;padding-top:13px}.v584-card-actions select{flex:1;min-width:125px;padding:8px}.v584-client-note{display:flex;gap:7px;margin-top:9px}.v584-client-note input{min-width:0;flex:1}.v584-archive{margin-top:14px;padding-top:10px;border-top:1px solid #292929}.v584-archive>summary{margin-bottom:10px;color:#777;font-size:9px;font-weight:900;cursor:pointer}.v584-portal{gap:13px}.v584-portal-list{grid-template-columns:repeat(2,minmax(0,1fr))}.v584-portal-empty{grid-column:1/-1;padding:40px;border:1px dashed #333;border-radius:20px;text-align:center}.v584-portal-empty span{color:#ff6a00;font-size:27px}.v584-portal-empty h3{margin:10px 0 5px}.v584-portal-empty p{margin:0;color:#777}.v584-home-callout{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:21px;border-color:#5b321b;background:linear-gradient(135deg,#21140d,#121212)}.v584-home-callout h3{margin:7px 0 6px}.v584-home-callout p{max-width:760px;margin:0;color:#888;line-height:1.45}
.clientmode .v584-portal-hero,.clientmode .v584-home-callout{color:#fff}.clientmode .v584-card{border-color:#ddd;background:#fff;color:#111}.clientmode .v584-direction{background:#fff5ee}.clientmode .v584-direction p,.clientmode .v584-notes p{color:#444}.clientmode .v584-notes{border-color:#e5e5e5;background:#fafafa}.clientmode .v584-card-head>span,.clientmode .v584-card-meta span{background:#eee;color:#555}.clientmode .v584-client-note input{background:#fff;color:#111}
@media(max-width:760px){.v584-client-pane{padding:15px!important}.v584-pane-hero,.v584-portal-hero{align-items:flex-start;flex-direction:column;padding:20px 17px}.v584-pane-hero h2,.v584-portal-hero h2{font-size:26px}.v584-pane-hero p,.v584-portal-hero p{font-size:12px}.v584-list,.v584-portal-list{grid-template-columns:1fr}.v584-card{padding:15px}.v584-card-head{flex-direction:column}.v584-card-head h3{font-size:19px}.v584-direction p,.v584-notes p{font-size:12px}.v584-card-actions{display:grid;grid-template-columns:1fr 1fr}.v584-card-actions .btn,.v584-card-actions select{width:100%}.v584-card-actions .btn:first-child:nth-last-child(3){grid-column:1/-1}.v584-client-note{flex-direction:column}.v584-home-callout{align-items:flex-start;flex-direction:column}.v584-home-callout .btn{width:100%}}
`;document.head.appendChild(v584Style);
// ===== FIM COLAB V5.84 =====

// ===== COLAB V5.85 — LABORATÓRIO CONTEXTUAL POR CLIENTE =====
let clientLabContextV585=false;

if(!clientHubTabDefsV563.some(item=>item[0]==='lab')){
  let strategyIndex=clientHubTabDefsV563.findIndex(item=>item[0]==='strategy');
  clientHubTabDefsV563.splice(strategyIndex>=0?strategyIndex+1:1,0,['lab','Laboratório'])
}

// Mantém o Laboratório e a Estratégia somente nas clientes de Social Media.
// A área "Para gravar" continua ao lado deles, sem substituir o núcleo criativo.
clientHubPageV5=function(clientId){
  let hasSocial=clientActiveServicesV582(clientId).includes('social_media');
  if(!hasSocial&&['strategy','lab','recording'].includes(clientHubTabsV563[clientId]))clientHubTabsV563[clientId]='services';
  let html=_clientHubPageV584Base(clientId);
  if(!hasSocial)return html.replace(/<button[^>]*data-client-tab="recording"[^>]*>[\s\S]*?<\/button>/,'');
  return html.replace(/<\/div>$/,clientRecordingPaneV584(clientId)+'</div>')
};

const _openClientAreaV585Base=openClientAreaV564;
openClientAreaV564=function(cid,mode){
  clientLabContextV585=mode==='lab';
  return _openClientAreaV585Base(cid,mode)
};

function contentLabPageV585(){
  let socialClients=(D.clients||[]).filter(row=>row.active&&hasClientService(row.id,'social_media'));
  if(!socialClients.some(row=>row.id===contentClient)&&socialClients[0])contentClient=socialClients[0].id;
  let client=cl(contentClient)||{},html=contentLabPageV560(socialClients);
  html=html.replace(/<select id="contentClient">[\s\S]*?<\/select>/,`<div class="v585-client-lock"><small>CLIENTE</small><b>${E(client.name||'Cliente')}</b></div>`);
  return html.replace(/<nav class="v550-content-tabs">[\s\S]*?<\/nav>/,'')
}

const _contentPageV585Base=contentPage;
contentPage=function(){
  if(contentMode==='lab'&&clientLabContextV585)return contentLabPageV585();
  if(contentMode==='lab')contentMode='workflow';
  clientLabContextV585=false;
  return _contentPageV585Base()
};

const _returnToClientHubV585Base=returnToClientHubV573;
returnToClientHubV573=function(){
  let result=_returnToClientHubV585Base();
  clientLabContextV585=false;
  return result
};

const _bindV585Base=bind;
bind=function(){
  _bindV585Base();
  document.querySelectorAll('[data-client-lab-version-v564]').forEach(button=>{
    button.onclick=function(){
      clientLabContextV585=true;
      contentClient=button.dataset.client;
      contentMode='lab';
      V='content';
      MD=null;
      labOpenVersionV562(button.dataset.clientLabVersionV564)
    }
  });
  document.querySelectorAll('[data-v="content"]').forEach(button=>{
    let original=button.onclick;
    button.onclick=function(event){
      clientLabContextV585=false;
      if(contentMode==='lab')contentMode='workflow';
      return original?.call(this,event)
    }
  })
};

const v585Style=document.createElement('style');v585Style.textContent=`
.v585-client-lock{display:flex;min-width:210px;flex-direction:column;justify-content:center;padding:8px 12px;border:1px solid #3b2c23;border-radius:11px;background:#15110f}.v585-client-lock small{color:#777;font-size:7px;font-weight:950;letter-spacing:.12em}.v585-client-lock b{margin-top:3px;color:#fff;font-size:11px}
@media(max-width:760px){.v585-client-lock{width:100%;min-height:48px}.v585-client-lock small{font-size:9px}.v585-client-lock b{font-size:14px}}
`;document.head.appendChild(v585Style);
// ===== FIM COLAB V5.85 =====

// ===== COLAB V5.86 — WORKFLOW COMO NÚCLEO VISÍVEL DA CLIENTE =====
// O Laboratório deixa de ser uma área do produto. O Workflow assume o destaque,
// a abertura padrão e a ficha única que acompanha o conteúdo até a publicação.
clientLabContextV585=false;
for(let index=clientHubTabDefsV563.length-1;index>=0;index--){
  if(clientHubTabDefsV563[index][0]==='lab'||clientHubTabDefsV563[index][0]==='workflow')clientHubTabDefsV563.splice(index,1)
}
clientHubTabDefsV563.unshift(['workflow','Workflow']);

function clientWorkflowItemsV586(cid){
  return socialMonthItemsV550(cid,contentMonth)
}
function clientWorkflowNumbersV586(cid){
  let items=clientWorkflowItemsV586(cid),works=items.map(item=>workflowWorkV583(item.id)).filter(Boolean);
  return{
    total:items.length,
    mine:works.filter(work=>work.assigned_to===S.user?.id).length,
    client:works.filter(work=>workflowStageV583(work)==='client_approval').length,
    late:works.filter(work=>work.internal_due_date&&work.internal_due_date<today()&&!['scheduled','published'].includes(workflowStageV583(work))).length
  }
}
function clientWorkflowNextV586(cid){
  let open=clientWorkflowItemsV586(cid).filter(item=>!['scheduled','published'].includes(workflowStageV583(workflowWorkV583(item.id))));
  return open.sort(function(a,b){
    let aw=workflowWorkV583(a.id)||{},bw=workflowWorkV583(b.id)||{},amine=aw.assigned_to===S.user?.id?0:1,bmine=bw.assigned_to===S.user?.id?0:1;
    return amine-bmine||String(aw.internal_due_date||'9999').localeCompare(String(bw.internal_due_date||'9999'))||Number(aw.editorial_order||999)-Number(bw.editorial_order||999)
  })[0]||null
}
function clientWorkflowSpotlightV586(cid){
  let client=cl(cid)||{},numbers=clientWorkflowNumbersV586(cid),next=clientWorkflowNextV586(cid),work=next?workflowWorkV583(next.id):null;
  return `<section class="v586-workflow-spotlight"><div class="v586-workflow-intro"><span>→</span><div><small>FLUXO PRINCIPAL DA CLIENTE</small><h3>Workflow de Conteúdo</h3><p>Ideia, construção, revisão, produção, aprovação e publicação em um único lugar.</p></div></div><div class="v586-workflow-numbers"><span><b>${numbers.total}</b> no mês</span><span><b>${numbers.mine}</b> minha vez</span><span><b>${numbers.client}</b> com a cliente</span>${numbers.late?`<span class="late"><b>${numbers.late}</b> atrasado${numbers.late===1?'':'s'}</span>`:''}</div><div class="v586-workflow-next"><small>PRÓXIMA AÇÃO</small>${next?`<b>${E(work?.next_action||'Definir o próximo passo')}</b><span>${E(next.title||'Conteúdo')} · ${E(workflowStageLabelV583(workflowStageV583(work)))}</span>`:`<b>Crie a primeira ficha do mês</b><span>O conteúdo já entra no Workflow da cliente.</span>`}</div><div class="v586-workflow-actions"><button class="btn ghost" data-client-workflow-open-v586="${E(cid)}">Ver Workflow</button><button class="btn pri" data-client-workflow-new-v586="${E(cid)}">＋ Nova ficha</button></div></section>`
}
function clientWorkflowPaneV586(cid){
  let client=cl(cid)||{},items=clientWorkflowItemsV586(cid),active=clientHubTabsV563[cid]==='workflow';
  return `<section class="panel v5-hub-wide v586-workflow-pane" id="workflow" ${active?'data-v563-active':''}><div class="v586-workflow-head"><div><small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small><h2>O conteúdo já abre no lugar certo.</h2><p>Acompanhe quem está com a próxima ação e mova cada ficha até a publicação.</p></div><div class="v586-workflow-tools"><label><small>MÊS</small><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label><button class="btn pri" data-client-workflow-new-v586="${E(cid)}">＋ Nova ficha de conteúdo</button></div></div><div class="v586-workflow-route">${workflowStagesV583.map(([key,label],index)=>`<span><i>${index+1}</i>${E(label)}</span>`).join('')}</div>${socialWorkflowV550(items,false)}</section>`
}

const _clientStrategyPaneV586Base=clientStrategyPaneV564;
clientStrategyPaneV564=function(cid){
  return _clientStrategyPaneV586Base(cid)
    .replace(/O Laboratório pode usar/g,'O Workflow usa')
    .replace(/O Laboratório usa/g,'O Workflow usa')
};
const _contentDnaModalV586Base=contentDnaModalV561;
contentDnaModalV561=function(){
  return _contentDnaModalV586Base().replace(/Laboratório/g,'Workflow')
};

const _clientHubPageV586Base=clientHubPageV5;
clientHubPageV5=function(clientId){
  let hasSocial=clientActiveServicesV582(clientId).includes('social_media'),active=clientHubTabsV563[clientId];
  if(hasSocial&&(!active||active==='lab'))clientHubTabsV563[clientId]='workflow';
  if(!hasSocial&&(!active||active==='lab'||active==='workflow'))clientHubTabsV563[clientId]='services';
  let html=_clientHubPageV586Base(clientId);
  html=html
    .replace(/<section class="v564-lab-spotlight[^>]*>[\s\S]*?<\/section>/,'')
    .replace(/<button[^>]*data-client-tab="lab"[^>]*>[\s\S]*?<\/button>/g,'')
    .replace(/Laboratório de Conteúdo/g,'Workflow de Conteúdo')
    .replace(/Entrar no Laboratório/g,'Abrir Workflow')
    .replace(/Abrir Laboratório/g,'Abrir Workflow');
  if(!hasSocial)return html.replace(/<button[^>]*data-client-tab="workflow"[^>]*>[\s\S]*?<\/button>/,'');
  html=html.replace('<div class="v5-client-tabs v563-client-tabs"',clientWorkflowSpotlightV586(clientId)+'<div class="v5-client-tabs v563-client-tabs"');
  return html.replace(/<\/div>$/,clientWorkflowPaneV586(clientId)+'</div>')
};

const _contentPageV586Base=contentPage;
contentPage=function(){
  clientLabContextV585=false;
  if(contentMode==='lab')contentMode='workflow';
  return _contentPageV586Base()
};
const _openClientAreaV586Base=openClientAreaV564;
openClientAreaV564=function(cid,mode){
  if(mode==='lab'){
    clientHubIdV5=cid;clientHubTabsV563[cid]='workflow';contentClient=cid;V='clientHub';MD=null;render();return
  }
  return _openClientAreaV586Base(cid,mode)
};
returnToClientHubV573=function(){
  let cid=contentClient;if(!cid){V='clients';MD=null;render();return}
  let tab=contentMode==='workflow'?'workflow':'strategy';clientHubIdV5=cid;clientHubTabsV563[cid]=tab;MD=null;V='clientHub';render();
  requestAnimationFrame(function(){document.getElementById(tab)?.scrollIntoView({behavior:'smooth',block:'start'})})
};
const _renderContextBackV586Base=renderContextBackV573;
renderContextBackV573=function(){
  _renderContextBackV586Base();
  if(contentMode==='workflow'){
    let label=document.querySelector('.v573-context-back em');
    if(label)label.textContent='Clientes › '+(cl(contentClient)?.name||'Cliente')+' › Workflow'
  }
};

const _bindV586Base=bind;
bind=function(){
  _bindV586Base();
  document.querySelectorAll('[data-clienthub]').forEach(function(button){
    button.onclick=function(){let cid=button.dataset.clienthub;if(clientActiveServicesV582(cid).includes('social_media'))clientHubTabsV563[cid]='workflow';clientHubIdV5=cid;V='clientHub';MD=null;render()}
  });
  document.querySelectorAll('[data-client-workflow-open-v586]').forEach(function(button){button.onclick=function(){let cid=button.dataset.clientWorkflowOpenV586;clientHubTabsV563[cid]='workflow';contentClient=cid;render();requestAnimationFrame(function(){document.getElementById('workflow')?.scrollIntoView({behavior:'smooth',block:'start'})})}});
  document.querySelectorAll('[data-client-workflow-new-v586]').forEach(function(button){button.onclick=function(){contentClient=button.dataset.clientWorkflowNewV586;workflowSourceInsightV583=null;MD={type:'contentNew'};render()}});
  document.getElementById('clientWorkflowMonthV586')?.addEventListener('change',function(event){contentMonth=event.target.value;render()})
};

const v586Style=document.createElement('style');v586Style.textContent=`
.v564-lab-pane,.v560-lab-layout,.v564-lab-progress{display:none!important}.v586-workflow-spotlight{display:grid;grid-template-columns:minmax(260px,1.25fr) auto minmax(210px,.65fr) auto;gap:16px;align-items:center;margin:14px 0;padding:20px 21px;border:1px solid #713715;border-radius:21px;background:radial-gradient(circle at 76% 0,rgba(255,106,0,.27),transparent 34%),linear-gradient(145deg,#24140b,#101010 68%)}.v586-workflow-intro{display:flex;align-items:center;gap:14px}.v586-workflow-intro>span{display:grid;place-items:center;width:50px;height:50px;flex:0 0 50px;border:1px solid #733917;border-radius:15px;background:#2d170a;color:#ff7b32;font-size:25px;font-weight:950}.v586-workflow-intro small{color:#ff7b32;font-size:7px;font-weight:950;letter-spacing:.14em}.v586-workflow-intro h3{margin:5px 0 4px;font-size:22px}.v586-workflow-intro p{max-width:520px;margin:0;color:#8c8c8c;font-size:9px;line-height:1.45}.v586-workflow-numbers{display:flex}.v586-workflow-numbers span{min-width:75px;padding:9px 11px;border-left:1px solid #57321e;color:#777;font-size:7px;text-transform:uppercase}.v586-workflow-numbers b{display:block;margin-bottom:4px;color:#fff;font-size:18px}.v586-workflow-numbers .late b{color:#ff8585}.v586-workflow-next{padding:12px 14px;border-left:2px solid #ff6a00;background:#17110e}.v586-workflow-next small,.v586-workflow-next b,.v586-workflow-next span{display:block}.v586-workflow-next small{color:#ff7b32;font-size:6px;font-weight:950;letter-spacing:.12em}.v586-workflow-next b{margin:5px 0;color:#fff;font-size:10px;line-height:1.35}.v586-workflow-next span{color:#777;font-size:7px;line-height:1.4}.v586-workflow-actions{display:flex;gap:7px}.v586-workflow-pane{padding:22px!important}.v586-workflow-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:13px;padding:23px;border:1px solid #5d3018;border-radius:20px;background:radial-gradient(circle at 88% 0,rgba(255,106,0,.2),transparent 35%),linear-gradient(145deg,#21140d,#111)}.v586-workflow-head h2{margin:7px 0 6px;font-size:30px;line-height:1.05}.v586-workflow-head p{margin:0;color:#888}.v586-workflow-tools{display:flex;align-items:flex-end;gap:8px}.v586-workflow-tools label{display:grid;gap:5px}.v586-workflow-tools label small{color:#777;font-size:7px;font-weight:950}.v586-workflow-tools input{min-height:42px}.v586-workflow-route{display:flex;gap:6px;margin:0 0 13px;padding:11px;overflow-x:auto;border:1px solid #2e2e2e;border-radius:15px;background:#101010}.v586-workflow-route span{display:flex;align-items:center;gap:7px;min-width:max-content;padding:7px 9px;border-radius:9px;background:#171717;color:#8b8b8b;font-size:7px;font-weight:850}.v586-workflow-route i{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#2b1a11;color:#ff7b32;font-size:7px;font-style:normal}.v586-workflow-pane>.v550-workflow-wrap{margin-top:10px}
@media(max-width:1150px){.v586-workflow-spotlight{grid-template-columns:1fr auto}.v586-workflow-next{grid-column:1}.v586-workflow-actions{grid-column:2;grid-row:2}.v586-workflow-numbers{justify-content:flex-end}}
@media(max-width:760px){.v586-workflow-spotlight{grid-template-columns:1fr;padding:17px}.v586-workflow-intro{align-items:flex-start}.v586-workflow-intro h3{font-size:22px}.v586-workflow-intro p{font-size:12px}.v586-workflow-numbers{justify-content:flex-start;overflow-x:auto}.v586-workflow-numbers span{min-width:82px}.v586-workflow-next,.v586-workflow-actions{grid-column:1;grid-row:auto}.v586-workflow-actions{display:grid;grid-template-columns:1fr 1fr}.v586-workflow-actions .btn{min-height:46px}.v586-workflow-pane{padding:14px!important}.v586-workflow-head{align-items:flex-start;flex-direction:column;padding:19px 16px}.v586-workflow-head h2{font-size:25px}.v586-workflow-head p{font-size:12px;line-height:1.45}.v586-workflow-tools{display:grid;width:100%;grid-template-columns:1fr}.v586-workflow-tools label,.v586-workflow-tools input,.v586-workflow-tools .btn{width:100%}.v586-workflow-route{margin-inline:-2px}.v586-workflow-pane .v583-radar{margin-inline:-1px}.v586-workflow-pane .v550-workflow-wrap{margin-inline:-1px}}
`;document.head.appendChild(v586Style);
// ===== FIM COLAB V5.86 =====

// ===== COLAB V5.87 — PRIVACIDADE DO WORKFLOW INTERNO =====
// O portal da cliente recebe somente conteúdos liberados para aprovação ou já
// aprovados. Ideias, construção, produção e conferência permanecem só na Colab.
function portalContentVisibleV587(content){
  let status=content?.status,wasSent=(D.approvals||[]).some(row=>row.content_id===content?.id);
  return ['scheduled','published'].includes(status)||(wasSent&&['approval','changes_requested','approved'].includes(status))
}
const _portalMonthItemsV587Base=portalMonthItemsV428;
portalMonthItemsV428=function(cid,month){
  return _portalMonthItemsV587Base(cid,month).filter(portalContentVisibleV587)
};
function portalWorkflowStageV587(content){
  if(content.status==='approval'||content.status==='changes_requested')return'review';
  if(content.status==='approved')return'approved';
  if(content.status==='scheduled')return'scheduled';
  return'published'
}
function portalWorkflowCardV587(content){
  let stage=portalWorkflowStageV587(content),label=content.status==='changes_requested'?'Ajustes solicitados':({review:'Para aprovar',approved:'Aprovado',scheduled:'Programado',published:'Publicado'})[stage];
  return `<article class="v583-card portal v587-portal-card" data-contentopen="${E(content.id)}">${socialAssetV550(content)}<div class="v583-card-copy"><small class="ey">${E(fmt(content.format||'undefined'))}</small><h4>${E(content.title||'Conteúdo')}</h4><span class="tag v587-${stage}">${E(label)}</span></div></article>`
}
function portalWorkflowBoardV587(items){
  let stages=[['review','Para aprovar'],['approved','Aprovado'],['scheduled','Programado'],['published','Publicado']];
  return `<div class="v550-workflow-wrap"><div class="v587-portal-board">${stages.map(([key,label])=>{let rows=items.filter(item=>portalWorkflowStageV587(item)===key);return`<section class="v583-lane"><header><i></i><b>${E(label)}</b><span>${rows.length}</span></header>${rows.map(portalWorkflowCardV587).join('')||'<div class="v583-empty">Nenhum conteúdo</div>'}</section>`}).join('')}</div></div>`
}
portalWorkflowPageV550=function(cid,preview=false){
  let rows=portalMonthItemsV428(cid,clientMonth);
  return `<div class="portal-v428 v550-portal-page v587-client-workflow">${portalTabsV428('workflow',preview)}<div class="portal-page-hero-v428"><small class="ey">CONTEÚDOS LIBERADOS</small><h2>Acompanhe somente o que já está pronto para você.</h2><p>Ideias e produção são organizadas internamente pela Colab. Aqui aparecem apenas peças enviadas para sua aprovação, aprovadas, programadas ou publicadas.</p></div><div class="filters"><input id="clientMonth" type="month" value="${E(clientMonth)}" ${preview?'disabled':''}></div>${portalWorkflowBoardV587(rows)}</div>`
};
const v587Style=document.createElement('style');v587Style.textContent=`
.v587-portal-board{display:grid;grid-template-columns:repeat(4,minmax(235px,1fr));gap:9px;min-width:980px}.v587-portal-board .v583-lane{min-height:360px}.v587-portal-board .v583-lane:nth-child(1)>header i{background:#e1b94d}.v587-portal-board .v583-lane:nth-child(2)>header i{background:#62c878}.v587-portal-board .v583-lane:nth-child(3)>header i{background:#72a7ff}.v587-portal-board .v583-lane:nth-child(4)>header i{background:#62c878}.v587-portal-card .tag{display:inline-flex;margin-top:8px}.v587-portal-card .v587-review{background:#fff1cd;color:#805a00}.v587-portal-card .v587-approved{background:#dff4e5;color:#27633c}.v587-portal-card .v587-scheduled{background:#e2efff;color:#245b99}.v587-portal-card .v587-published{background:#dff4e5;color:#27633c}
@media(max-width:760px){.v587-portal-board{min-width:920px}.v587-client-workflow .portal-page-hero-v428 p{font-size:12px;line-height:1.5}}
`;document.head.appendChild(v587Style);
// ===== FIM COLAB V5.87 =====

// ===== COLAB V5.88 — ENTRADA RÁPIDA E FICHA PROGRESSIVA =====
// Banco de ideias, sugestão para gravar e produção passam a ter entradas
// diferentes. A ficha nasce simples e os campos completos ficam para a edição.
if(workflowStagesV583[0])workflowStagesV583[0][1]='A iniciar';

const _clientWorkflowSpotlightV588Base=clientWorkflowSpotlightV586;
clientWorkflowSpotlightV586=function(cid){
  let html=_clientWorkflowSpotlightV588Base(cid),actions=`<div class="v586-workflow-actions v588-workflow-actions"><button class="btn ghost" data-client-idea-quick-v588="${E(cid)}">✦ Guardar ideia</button><button class="btn ghost" data-client-recording-quick-v588="${E(cid)}">◉ Ideia para gravar</button><button class="btn pri" data-client-workflow-new-v586="${E(cid)}">＋ Nova ficha</button></div>`;
  return html.replace(/<div class="v586-workflow-actions">[\s\S]*?<\/div><\/section>$/,actions+'</section>')
};

function workflowQuickStartModalV588(){
  let cid=contentClient||clientHubIdV5,client=cl(cid)||{};
  return `<div class="modalbg"><div class="modal v588-start-modal"><div class="head"><div><small class="ey">NOVA FICHA · A INICIAR</small><h2>O que vamos produzir?</h2><p class="muted">Comece com uma frase. O restante é preenchido quando o conteúdo avançar.</p></div><button class="btn ghost small" data-close>✕</button></div><form id="workflowBriefFormV583" data-content=""><input type="hidden" name="client_id" value="${E(cid)}"><input type="hidden" name="internal_status" value="idea"><div class="v588-client-lock"><small>CLIENTE</small><b>${E(client.name||'Cliente')}</b></div><div class="field v588-title-field"><label>Título, pauta ou gancho</label><input name="title" required autofocus placeholder="Uma frase já basta"></div><div class="field"><label>Resumo da ideia <span class="muted">(opcional)</span></label><textarea name="central_message" rows="3" placeholder="O que queremos dizer ou mostrar?"></textarea></div><div class="formgrid"><div class="field"><label>Linha editorial <span class="muted">(opcional)</span></label><select name="editorial_pillar_id"><option value="">Definir depois</option>${(D.pillars||[]).filter(p=>p.client_id===cid&&p.active).map(p=>`<option value="${p.id}">${E(p.name)}</option>`).join('')}</select></div><div class="field"><label>Formato <span class="muted">(opcional)</span></label><select name="format"><option value="undefined">Definir depois</option><option value="static_post">Post estático</option><option value="carousel">Carrossel</option><option value="reel">Reels</option><option value="story">Stories</option><option value="video">Vídeo</option></select></div></div><details class="v588-optional"><summary>Adicionar objetivo ou referência</summary><div class="field"><label>Objetivo</label><input name="objective" placeholder="Ex.: conectar, posicionar, educar ou vender"></div><div class="field"><label>Links de referência <span class="muted">(um por linha)</span></label><textarea name="reference_links" rows="3" placeholder="Instagram, Pinterest, Drive, Canva..."></textarea></div></details><div class="v588-start-note"><span>1</span><div><b>Entra em “A iniciar”</b><small>Etapa, responsáveis, roteiro, arte, aprovação e publicação serão definidos depois.</small></div></div><div class="actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button class="btn pri">Adicionar ao Workflow</button></div></form></div></div>`
}
const _workflowBriefModalV588Base=workflowBriefModalV583;
workflowBriefModalV583=function(content){
  if(!content)return workflowQuickStartModalV588();
  let html=_workflowBriefModalV588Base(content),stage=workflowStageV583(workflowWorkV583(content.id));
  html=html.replace('class="modal wide v583-modal"','class="modal wide v583-modal v588-progressive stage-'+E(stage)+'"');
  if(!['internal_review','client_approval','scheduled','published'].includes(stage))html=html.replace('<div class="v583-approvals">','<div class="v583-approvals v588-not-yet">');
  return html
};

const _ideaQuickModalV588Base=ideaQuickModalV5;
ideaQuickModalV5=function(edit=false){
  let html=_ideaQuickModalV588Base(edit),cid=!edit?MD?.clientId:null,client=cid?cl(cid):null;
  if(!cid||!client)return html;
  return html.replace(/<div class="field"><label>Cliente<\/label><select name="client_id" required>[\s\S]*?<\/select><\/div>/,`<input type="hidden" name="client_id" value="${E(cid)}"><div class="v588-client-lock"><small>CLIENTE</small><b>${E(client.name)}</b></div>`)
};

const _bindV588Base=bind;
bind=function(){
  _bindV588Base();
  document.querySelectorAll('[data-client-idea-quick-v588]').forEach(function(button){button.onclick=function(){MD={type:'ideaQuickV5',clientId:button.dataset.clientIdeaQuickV588};render()}});
  document.querySelectorAll('[data-client-recording-quick-v588]').forEach(function(button){button.onclick=function(){let cid=button.dataset.clientRecordingQuickV588;clientHubTabsV563[cid]='recording';clientHubIdV5=cid;render();requestAnimationFrame(function(){let compose=document.querySelector('.v584-compose');if(compose){compose.open=true;compose.scrollIntoView({behavior:'smooth',block:'start'});compose.querySelector('input[name="title"]')?.focus()}})}})
};

const v588Style=document.createElement('style');v588Style.textContent=`
.v588-workflow-actions{display:grid;grid-template-columns:1fr 1fr;min-width:305px}.v588-workflow-actions .btn{min-height:40px}.v588-workflow-actions .btn.pri{grid-column:1/-1}.v588-start-modal{max-width:720px}.v588-start-modal>.head{align-items:flex-start}.v588-start-modal>.head h2{margin:6px 0}.v588-client-lock{display:flex;min-height:52px;flex-direction:column;justify-content:center;margin:12px 0;padding:10px 13px;border:1px solid #3d2c22;border-radius:12px;background:#17110e}.v588-client-lock small{color:#777;font-size:7px;font-weight:950;letter-spacing:.12em}.v588-client-lock b{margin-top:4px;color:#fff;font-size:12px}.v588-title-field input{min-height:50px;font-size:15px}.v588-optional{margin:12px 0;padding:13px 15px;border:1px solid #303030;border-radius:13px;background:#111}.v588-optional summary{color:#ff7b32;font-size:9px;font-weight:900;cursor:pointer}.v588-optional[open] summary{margin-bottom:12px}.v588-start-note{display:flex;align-items:center;gap:11px;margin:13px 0;padding:12px;border:1px solid #3d2b20;border-radius:12px;background:#18110d}.v588-start-note>span{display:grid;place-items:center;width:28px;height:28px;flex:0 0 28px;border-radius:50%;background:#ff6a00;color:#fff;font-size:10px;font-weight:950}.v588-start-note b,.v588-start-note small{display:block}.v588-start-note b{font-size:9px}.v588-start-note small{margin-top:4px;color:#89776e;font-size:7px;line-height:1.4}.v588-not-yet{display:none!important}.v588-progressive:not(.stage-internal_review):not(.stage-client_approval):not(.stage-scheduled):not(.stage-published) .v583-approvals{display:none!important}
@media(max-width:1150px){.v588-workflow-actions{min-width:290px}}
@media(max-width:760px){.v588-workflow-actions{grid-template-columns:1fr;min-width:0}.v588-workflow-actions .btn.pri{grid-column:1}.v588-start-modal{padding:15px}.v588-start-modal .formgrid{grid-template-columns:1fr}.v588-title-field input{font-size:16px}.v588-client-lock small{font-size:9px}.v588-client-lock b{font-size:14px}.v588-start-note small{font-size:10px}}
`;document.head.appendChild(v588Style);
// ===== FIM COLAB V5.88 =====

// Todas as funções V5 estão registradas; agora a aplicação pode iniciar.
// Boot after operational overrides in processos.js.
// ===== FIM COLAB OPERACIONAL V5.0 =====



// ===== COLAB V5.90 — WORKFLOW COMPACTO, SEM REPETIÇÃO =====
clientWorkflowSpotlightV586=function(cid){
  let next=clientWorkflowNextV586(cid),work=next?workflowWorkV583(next.id):null;
  return `<section class="v586-workflow-spotlight v590-workflow-spotlight"><div class="v586-workflow-next v590-workflow-next"><small>PRÓXIMA AÇÃO</small>${next?`<b>${E(work?.next_action||'Definir o próximo passo')}</b><span>${E(next.title||'Conteúdo')} · ${E(workflowStageLabelV583(workflowStageV583(work)))}</span>`:`<b>Nenhum conteúdo em andamento</b><span>Quando você criar um conteúdo, a próxima ação aparece aqui.</span>`}</div><div class="v586-workflow-actions v588-workflow-actions v590-workflow-actions"><button class="btn ghost" data-client-idea-quick-v588="${E(cid)}">✦ Guardar ideia</button><button class="btn ghost" data-client-recording-quick-v588="${E(cid)}">◉ Ideia para gravar</button></div></section>`
};

clientWorkflowPaneV586=function(cid){
  let client=cl(cid)||{},items=clientWorkflowItemsV586(cid),active=clientHubTabsV563[cid]==='workflow';
  return `<section class="panel v5-hub-wide v586-workflow-pane v590-workflow-pane" id="workflow" ${active?'data-v563-active':''}><div class="v590-workflow-bar"><div><small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small><h2>Conteúdos do mês</h2></div><div class="v586-workflow-tools v590-workflow-tools"><label><small>MÊS</small><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label><button class="btn pri" data-client-workflow-new-v586="${E(cid)}">＋ Criar conteúdo</button></div></div><div class="v586-workflow-route">${workflowStagesV583.map(([key,label],index)=>`<span><i>${index+1}</i>${E(label)}</span>`).join('')}</div>${socialWorkflowV550(items,false)}</section>`
};

const _workflowQuickStartModalV590Base=workflowQuickStartModalV588;
workflowQuickStartModalV588=function(){
  return _workflowQuickStartModalV590Base()
    .replace('NOVA FICHA · A INICIAR','NOVO CONTEÚDO · A INICIAR')
    .replace('O que vamos produzir?','Criar conteúdo')
    .replace('Adicionar ao Workflow','Criar no Workflow');
};

const v590Style=document.createElement('style');v590Style.textContent=`
.v590-workflow-spotlight{padding:18px 20px;gap:14px}.v590-workflow-spotlight .v590-workflow-next{margin:0}.v590-workflow-actions{grid-template-columns:1fr 1fr!important;min-width:0}.v590-workflow-actions .btn{grid-column:auto!important}.v590-workflow-pane{padding-top:18px}.v590-workflow-bar{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:14px}.v590-workflow-bar h2{margin:5px 0 0;font-size:22px}.v590-workflow-tools{display:flex;align-items:end;gap:10px}.v590-workflow-tools label{min-width:170px}.v590-workflow-tools .btn{white-space:nowrap}
@media(max-width:760px){.v590-workflow-spotlight{padding:14px}.v590-workflow-actions{grid-template-columns:1fr!important}.v590-workflow-bar{display:block}.v590-workflow-bar h2{font-size:20px}.v590-workflow-tools{display:grid;grid-template-columns:1fr;margin-top:14px}.v590-workflow-tools label{min-width:0}.v590-workflow-tools .btn{width:100%;min-height:48px}.v590-workflow-pane .v586-workflow-route{margin-top:12px}}
`;document.head.appendChild(v590Style);
// ===== FIM COLAB V5.90 =====

// ===== COLAB V5.91 — ÁREA DA CLIENTE COESA + IDEIA PRONTA PARA PRODUÇÃO =====
let workflowStageFilterV591='all';
workflowStagesV583.splice(0,workflowStagesV583.length,['visual_production','Produção'],['internal_review','Revisão interna'],['client_approval','Aprovação cliente'],['scheduled','Programado'],['published','Publicado']);
workflowStageV583=function(work){let value=work?.internal_status||'visual_production';return({idea:'visual_production',building:'visual_production',editorial_review:'visual_production',draft:'visual_production',design:'visual_production',internal_approved:'client_approval'})[value]||value};
workflowPublicStatusV583=function(value){return({visual_production:'editing',internal_review:'editing',client_approval:'approval',scheduled:'scheduled',published:'published'})[value]||'editing'};
workflowStageFromPublicV583=function(status){return({idea:'visual_production',script:'visual_production',production:'visual_production',editing:'visual_production',approval:'client_approval',changes_requested:'internal_review',approved:'client_approval',scheduled:'scheduled',published:'published'})[status]||'visual_production'};
function productionOwnerV591(){return(D.profiles||[]).find(p=>/thalia/i.test(String(p.display_name||'')))?.user_id||null}
function reviewOwnerV591(){return(D.profiles||[]).find(p=>/carol/i.test(String(p.display_name||'')))?.user_id||null}
function workflowNextActionV591(content,stage){if(stage==='visual_production')return content?.format==='carousel'||content?.format==='static_post'?'Criar as artes':content?.format==='reel'||content?.format==='video'?'Editar o conteúdo':'Produzir o conteúdo';if(stage==='internal_review')return'Revisar conteúdo';if(stage==='client_approval')return content?.status==='approved'?'Preparar programação':content?.status==='changes_requested'?'Aplicar ajustes solicitados':'Aguardando cliente';if(stage==='scheduled')return'Aguardar publicação';return'Concluído'}
function workflowOwnerForStageV591(work,stage){if(stage==='visual_production')return work?.design_owner_id||work?.assigned_to||productionOwnerV591();if(stage==='internal_review')return work?.reviewer_id||reviewOwnerV591()||work?.assigned_to;return work?.assigned_to||null}
function ideaBriefV591(idea){return idea?.idea_brief&&typeof idea.idea_brief==='object'?idea.idea_brief:{}}
function ideaRowsV591(cid){return(D.insights||[]).filter(row=>row.client_id===cid&&row.insight_type==='idea'&&row.status!=='archived').slice().sort((a,b)=>String(b.updated_at||b.created_at||'').localeCompare(String(a.updated_at||a.created_at||'')))}
function ideaMissingV591(idea){let b=ideaBriefV591(idea),missing=[];if(!String(idea?.title||'').trim())missing.push('título');if(!b.editorial_pillar_id)missing.push('linha editorial');if(!String(b.objective||'').trim())missing.push('objetivo');if(!b.format||b.format==='undefined')missing.push('formato');if(!String(b.narrative||'').trim())missing.push('narrativa');if(!String(b.structure||'').trim())missing.push('estrutura');if(b.format==='carousel'){let count=Number(b.slide_count||0),slides=Array.isArray(b.slide_texts)?b.slide_texts:[];if(count<2)missing.push('quantidade de slides');if(count>=2&&(slides.length<count||slides.slice(0,count).some(v=>!String(v||'').trim())))missing.push('texto dos slides')}if((b.format==='reel'||b.format==='video')&&!String(b.hook||'').trim())missing.push('gancho do vídeo');if((b.format==='reel'||b.format==='video')&&!String(b.narration||'').trim())missing.push('roteiro/narração');if(b.format==='story'&&!String(b.story_sequence||'').trim())missing.push('sequência de stories');if(b.format==='static_post'&&!String(b.art_text||'').trim())missing.push('texto da arte');return missing}
function ideaReadyV591(idea){return ideaMissingV591(idea).length===0}
function ideaFormatOptionsV591(selected='undefined'){return[['undefined','Selecione'],['carousel','Carrossel'],['reel','Reels'],['static_post','Post estático'],['story','Stories'],['video','Vídeo']].map(([v,l])=>`<option value="${v}" ${selected===v?'selected':''}>${l}</option>`).join('')}
function ideaFormatFieldsV591(format,b={}){if(format==='carousel'){let count=Math.max(2,Math.min(20,Number(b.slide_count||5))),slides=Array.isArray(b.slide_texts)?b.slide_texts:[];return `<div class="field"><label>Quantidade de slides</label><input name="slide_count" data-v591-slide-count type="number" min="2" max="20" required value="${count}"></div><div class="v591-slide-list" data-v591-slides>${Array.from({length:count},(_,i)=>`<label><small>${i===0?'CAPA':`SLIDE ${i+1}`}</small><textarea data-v591-slide="${i}" rows="3" required placeholder="${i===0?'Gancho e texto da capa':'Texto pronto deste slide'}">${E(slides[i]||'')}</textarea></label>`).join('')}</div>`}if(format==='reel'||format==='video')return `<div class="field"><label>Gancho / abertura</label><textarea name="hook" rows="3" required>${E(b.hook||'')}</textarea></div><div class="field"><label>Roteiro / narração</label><textarea name="narration" rows="6" required>${E(b.narration||'')}</textarea></div><div class="field"><label>Cenas / takes <span class="muted">(se necessário)</span></label><textarea name="scenes" rows="4">${E(b.scenes||'')}</textarea></div>`;if(format==='story')return `<div class="field"><label>Sequência de stories</label><textarea name="story_sequence" rows="7" required placeholder="Story 1...\nStory 2...">${E(b.story_sequence||'')}</textarea></div>`;if(format==='static_post')return `<div class="field"><label>Texto que vai na arte</label><textarea name="art_text" rows="5" required>${E(b.art_text||'')}</textarea></div>`;return `<div class="v591-format-empty"><span>↳</span><p>Escolha o formato para abrir somente os campos necessários.</p></div>`}
function structuredIdeaModalV591(){let edit=MD?.id?(D.insights||[]).find(row=>row.id===MD.id):null,b=ideaBriefV591(edit),cid=edit?.client_id||MD?.clientId||clientHubIdV5||contentClient||'',client=cl(cid),format=b.format||'undefined';return `<div class="modalbg"><div class="modal wide v591-idea-modal"><div class="head"><div><small class="ey">${edit?'EDITAR IDEIA':'NOVA IDEIA'}</small><h2>Briefing pronto para produção</h2><p class="muted">Estruture agora tudo o que precisa estar claro antes de a ideia chegar à produção.</p></div><button class="btn ghost small" data-close>✕</button></div><form id="ideaStructuredFormV591" data-id="${E(edit?.id||'')}"><section class="v591-form-block"><small>01 · BASE EDITORIAL</small>${client?`<input type="hidden" name="client_id" value="${E(cid)}"><div class="v591-client-lock"><span>CLIENTE</span><b>${E(client.name)}</b></div>`:`<div class="field"><label>Cliente</label><select name="client_id" required><option value="">Selecione</option>${(D.clients||[]).filter(c=>c.active&&hasClientService(c.id,'social_media')).map(c=>`<option value="${c.id}">${E(c.name)}</option>`).join('')}</select></div>`}<div class="field"><label>Título / gancho final</label><input name="title" required autofocus value="${E(edit?.title||'')}" placeholder="Título que já pode seguir para criação"></div><div class="formgrid"><div class="field"><label>Linha editorial <span class="muted">(opcional)</span></label><select name="editorial_pillar_id"><option value="">Definir depois</option>${(D.pillars||[]).filter(p=>p.client_id===cid&&p.active).map(p=>`<option value="${p.id}" ${b.editorial_pillar_id===p.id?'selected':''}>${E(p.name)}</option>`).join('')}</select></div><div class="field"><label>Objetivo</label><input name="objective" required value="${E(b.objective||'')}" placeholder="Conectar, posicionar, educar, vender..."></div></div><div class="field"><label>Formato</label><select name="format" data-v591-idea-format required>${ideaFormatOptionsV591(format)}</select></div></section><section class="v591-form-block"><small>02 · NARRATIVA</small><div class="field"><label>Narrativa completa</label><textarea name="narrative" rows="6" required placeholder="Qual história/raciocínio esse conteúdo constrói e onde ele precisa chegar?">${E(b.narrative||'')}</textarea></div><div class="field"><label>Estrutura do conteúdo</label><textarea name="structure" rows="5" required placeholder="Abertura → desenvolvimento → fechamento">${E(b.structure||'')}</textarea></div></section><section class="v591-form-block"><small>03 · CONTEÚDO POR FORMATO</small><div data-v591-idea-format-fields>${ideaFormatFieldsV591(format,b)}</div></section><section class="v591-form-block"><small>04 · FECHAMENTO</small><div class="field"><label>CTA <span class="muted">(quando fizer sentido)</span></label><input name="cta" value="${E(b.cta||'')}" placeholder="Qual ação queremos provocar?"></div><div class="field"><label>Referências / links <span class="muted">(um por linha)</span></label><textarea name="reference_links" rows="4" placeholder="Instagram, Pinterest, Drive...">${E(Array.isArray(b.reference_links)?b.reference_links.join('\n'):'')}</textarea></div><div class="field"><label>Materiais necessários <span class="muted">(se houver)</span></label><textarea name="materials" rows="3" placeholder="Fotos, vídeos, depoimentos, arquivos...">${E(b.materials||'')}</textarea></div><div class="field"><label>Observações <span class="muted">(opcional)</span></label><textarea name="notes" rows="3">${E(b.notes||edit?.notes||'')}</textarea></div></section><div class="actions v591-sticky-actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button class="btn pri">${edit?'Salvar ideia':'Criar ideia'}</button></div></form></div></div>`}
function readIdeaFormatV591(form,format){if(format==='carousel')return{slide_count:Number(form.elements.slide_count?.value||0),slide_texts:Array.from(form.querySelectorAll('[data-v591-slide]')).map(el=>String(el.value||'').trim())};if(format==='reel'||format==='video')return{hook:String(form.elements.hook?.value||'').trim(),narration:String(form.elements.narration?.value||'').trim(),scenes:String(form.elements.scenes?.value||'').trim()};if(format==='story')return{story_sequence:String(form.elements.story_sequence?.value||'').trim()};if(format==='static_post')return{art_text:String(form.elements.art_text?.value||'').trim()};return{}}
async function saveStructuredIdeaV591(event){event.preventDefault();let form=event.currentTarget;if(form.dataset.saving==='1')return;form.dataset.saving='1';let data=new FormData(form),format=String(data.get('format')||'undefined'),now=new Date().toISOString(),id=form.dataset.id,brief={editorial_pillar_id:String(data.get('editorial_pillar_id')||'')||null,objective:String(data.get('objective')||'').trim(),format,narrative:String(data.get('narrative')||'').trim(),structure:String(data.get('structure')||'').trim(),cta:String(data.get('cta')||'').trim(),reference_links:String(data.get('reference_links')||'').split('\n').map(v=>v.trim()).filter(Boolean),materials:String(data.get('materials')||'').trim(),notes:String(data.get('notes')||'').trim(),...readIdeaFormatV591(form,format)},payload={client_id:String(data.get('client_id')||''),title:String(data.get('title')||'').trim(),notes:brief.notes||null,source_url:brief.reference_links.find(v=>/^https?:\/\//i.test(v))||null,insight_type:'idea',status:'new',idea_brief:brief,visible_to_client:false,updated_at:now};try{if(id)await patch('client_insights',id,payload);else await api('/rest/v1/client_insights',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({...payload,organization_id:M.organization_id,created_by:S.user?.id})});MD=null;await load();render();toast(id?'Ideia atualizada ✦':'Ideia criada ✦')}catch(error){form.dataset.saving='';toast(error.message)}}
function ideaCardV591(idea){let b=ideaBriefV591(idea),missing=ideaMissingV591(idea),ready=!missing.length,converted=idea.status==='converted'||!!idea.converted_content_id;return `<article class="v591-idea-card ${ready?'ready':''} ${converted?'converted':''}"><div class="v591-idea-card-head"><div><small>${E(pillar(b.editorial_pillar_id)?.name||'Linha editorial')} · ${E(fmt(b.format||'undefined'))}</small><h3>${E(idea.title||'Ideia')}</h3></div><span class="${ready?'ready':'draft'}">${converted?'EM PRODUÇÃO':ready?'PRONTA':'INCOMPLETA'}</span></div><p>${E(String(b.narrative||'Sem narrativa preenchida.').slice(0,230))}${String(b.narrative||'').length>230?'…':''}</p>${b.format==='carousel'?`<div class="v591-idea-meta"><span>${Number(b.slide_count||0)} slides</span><span>${(b.slide_texts||[]).filter(Boolean).length} textos prontos</span></div>`:''}<div class="v591-idea-actions"><button class="btn ghost small" data-v591-idea-edit="${idea.id}">Editar</button>${converted?`<button class="btn ghost small" data-v591-open-content="${E(idea.converted_content_id||'')}">Abrir no Workflow →</button>`:`<button class="btn pri small" data-v591-send-production="${idea.id}" ${ready?'':`title="Falta: ${E(missing.join(', '))}"`}>Enviar para produção →</button>`}</div>${!ready&&!converted?`<small class="v591-missing">Falta: ${E(missing.join(' · '))}</small>`:''}</article>`}
function clientIdeasPaneV591(cid){let rows=ideaRowsV591(cid),active=rows.filter(r=>r.status!=='converted'&&!r.converted_content_id),sent=rows.filter(r=>r.status==='converted'||r.converted_content_id),selected=clientHubTabsV563[cid]==='ideas';return `<section class="panel v5-hub-wide v591-ideas-pane" id="ideas" ${selected?'data-v563-active':''}><div class="v591-pane-head"><div><small class="ey">BANCO DE IDEIAS</small><h2>Ideias prontas para virar produção</h2><p>A estratégia nasce aqui. Quando estiver completa, a mesma ficha segue para produção sem repetir nenhum campo.</p></div><button class="btn pri" data-v591-new-idea="${E(cid)}">＋ Nova ideia</button></div><div class="v591-ideas-toolbar"><span><b>${active.length}</b> em preparação</span><span><b>${active.filter(ideaReadyV591).length}</b> prontas</span><label><small>WORKFLOW DO MÊS</small><input id="ideaProductionMonthV591" type="month" value="${E(contentMonth)}"></label></div><div class="v591-idea-grid">${active.map(ideaCardV591).join('')||'<div class="v591-empty"><span>✦</span><h3>Nenhuma ideia em preparação</h3><p>Crie a primeira pauta já com narrativa, formato e estrutura de produção.</p></div>'}</div>${sent.length?`<details class="v591-idea-history"><summary>Enviadas para produção · ${sent.length}</summary><div class="v591-idea-grid">${sent.slice(0,10).map(ideaCardV591).join('')}</div></details>`:''}</section>`}
async function sendIdeaToProductionV591(id){let idea=(D.insights||[]).find(row=>row.id===id);if(!idea)return;let missing=ideaMissingV591(idea);if(missing.length)return toast('Complete antes de enviar: '+missing.join(', '));let b=ideaBriefV591(idea),now=new Date().toISOString(),owner=productionOwnerV591(),reviewer=reviewOwnerV591();try{let plan=await ensurePlan(idea.client_id,contentMonth),contentPayload={organization_id:M.organization_id,client_id:idea.client_id,title:idea.title,format:b.format,objective:b.objective||null,central_idea:b.narrative||null,editorial_pillar_id:b.editorial_pillar_id||null,cta:b.cta||null,reference_links:(b.reference_links||[]).filter(v=>/^https?:\/\//i.test(v)),publication_date:null,status:'editing',monthly_plan_id:plan?.id||null,created_by:S.user?.id,updated_at:now},created=await api('/rest/v1/contents',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(contentPayload)}),content=created?.[0];if(!content?.id)throw Error('Não foi possível enviar para produção.');let slides=b.format==='carousel'?(b.slide_texts||[]):b.format==='reel'||b.format==='video'?[b.hook||'',b.scenes||'',b.narration||'']:b.format==='story'?[b.story_sequence||'']:[b.art_text||''],brief={objective:b.objective||'',narrative:b.narrative||'',structure:b.structure||'',cta:b.cta||'',reference_links:b.reference_links||[],client_assets:b.materials||'',materials:b.materials||'',idea_notes:b.notes||''},next=workflowNextActionV591(content,'visual_production');await api('/rest/v1/content_team_workflow',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:idea.client_id,content_id:content.id,source_insight_id:idea.id,internal_status:'visual_production',assigned_to:owner,content_owner_id:idea.created_by||S.user?.id,design_owner_id:owner,reviewer_id:reviewer,next_action:next,brief,slides,created_by:S.user?.id,stalled_since:now,updated_at:now})});await patch('client_insights',idea.id,{status:'converted',converted_content_id:content.id,updated_at:now});await workflowActivityV583(content,'created','Ideia aprovada e enviada para produção',null,'visual_production',{source_idea_id:idea.id});contentClient=idea.client_id;clientHubTabsV563[idea.client_id]='workflow';MD=null;await load();render();toast('Enviado para produção ✦')}catch(error){toast(error.message)}}
function workflowCardV591(content){let work=workflowWorkV583(content.id),stage=workflowStageV583(work),ownerId=workflowOwnerForStageV591(work,stage),owner=profile(ownerId)?.display_name||'Equipe',next=workflowNextActionV591(content,stage),late=work?.internal_due_date&&work.internal_due_date<today()&&!['scheduled','published'].includes(stage);return `<article class="v591-work-card ${late?'late':''}" data-contentopen="${content.id}">${socialAssetV550(content,true)}<div class="v591-work-copy"><div class="v591-work-meta"><span>${E(fmt(content.format||'undefined'))}</span><span>${E(pillar(content.editorial_pillar_id)?.name||'Sem linha')}</span></div><h4>${E(content.title||'Conteúdo')}</h4><div class="v591-work-next"><small>PRÓXIMA AÇÃO</small><b>${E(next)}</b><span>${E(owner)}</span></div></div><b class="v591-arrow">→</b></article>`}
function workflowBoardV591(items){let stages=workflowStagesV583,counts=Object.fromEntries(stages.map(([key])=>[key,items.filter(c=>workflowStageV583(workflowWorkV583(c.id))===key).length]));return `<div class="v591-stage-strip"><button class="${workflowStageFilterV591==='all'?'on':''}" data-v591-stage="all"><b>${items.length}</b><span>Todos</span></button>${stages.map(([key,label])=>`<button class="${workflowStageFilterV591===key?'on':''}" data-v591-stage="${key}"><b>${counts[key]}</b><span>${E(label)}</span></button>`).join('')}</div><div class="v591-workflow-board">${stages.filter(([key])=>workflowStageFilterV591==='all'||workflowStageFilterV591===key).map(([key,label])=>{let rows=items.filter(c=>workflowStageV583(workflowWorkV583(c.id))===key);return`<section class="v591-work-lane stage-${key}"><header><div><i></i><b>${E(label)}</b></div><span>${rows.length}</span></header><div class="v591-lane-list">${rows.map(workflowCardV591).join('')||'<div class="v591-lane-empty">Nenhum conteúdo</div>'}</div></section>`}).join('')}</div>`}
clientWorkflowSpotlightV586=function(){return''};
clientWorkflowPaneV586=function(cid){let client=cl(cid)||{},items=clientWorkflowItemsV586(cid),active=clientHubTabsV563[cid]==='workflow',next=clientWorkflowNextV586(cid),work=next?workflowWorkV583(next.id):null,stage=next?workflowStageV583(work):null,owner=next?profile(workflowOwnerForStageV591(work,stage))?.display_name||'Equipe':'';return `<section class="panel v5-hub-wide v591-workflow-pane" id="workflow" ${active?'data-v563-active':''}><div class="v591-pane-head v591-workflow-head"><div><small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small><h2>Produção do mês</h2><p>O conteúdo entra aqui somente depois que a ideia está estruturada e pronta para execução.</p></div><label class="v591-month"><small>MÊS</small><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label></div>${next?`<button class="v591-next-action" data-contentopen="${next.id}"><span><small>PRÓXIMA AÇÃO</small><b>${E(workflowNextActionV591(next,stage))}</b><em>${E(next.title||'Conteúdo')}</em></span><span class="v591-next-owner">${E(owner)} <b>→</b></span></button>`:`<div class="v591-next-empty"><span>✓</span><div><b>Nenhuma ação pendente</b><small>Quando uma ideia for enviada para produção, ela aparece aqui.</small></div></div>`}${workflowBoardV591(items)}</section>`};
function workflowBriefSummaryV591(content,work){let b=workflowBriefV583(work),slides=Array.isArray(work?.slides)?work.slides:[],format=content.format||'undefined',formatBlock='';if(format==='carousel')formatBlock=`<div class="v591-summary-slides">${slides.map((text,i)=>`<div><small>${i===0?'CAPA':`SLIDE ${i+1}`}</small><p>${E(text||'—')}</p></div>`).join('')}</div>`;else if(format==='reel'||format==='video')formatBlock=`<div class="v591-summary-grid"><div><small>GANCHO</small><p>${E(slides[0]||'—')}</p></div><div><small>ROTEIRO / NARRAÇÃO</small><p>${E(slides[2]||'—')}</p></div>${slides[1]?`<div><small>CENAS / TAKES</small><p>${E(slides[1])}</p></div>`:''}</div>`;else if(format==='story')formatBlock=`<div class="v591-summary-grid"><div><small>SEQUÊNCIA</small><p>${E(slides[0]||'—')}</p></div></div>`;else formatBlock=`<div class="v591-summary-grid"><div><small>TEXTO DA ARTE</small><p>${E(slides[0]||'—')}</p></div></div>`;return `<section class="v591-brief-summary"><div class="v591-summary-head"><div><small>BRIEFING DE PRODUÇÃO</small><h3>${E(content.title||'Conteúdo')}</h3></div><span>${E(fmt(format))}</span></div><div class="v591-summary-grid"><div><small>LINHA EDITORIAL</small><p>${E(pillar(content.editorial_pillar_id)?.name||'—')}</p></div><div><small>OBJETIVO</small><p>${E(content.objective||'—')}</p></div><div class="wide"><small>NARRATIVA</small><p>${E(b.narrative||content.central_idea||'—')}</p></div><div class="wide"><small>ESTRUTURA</small><p>${E(b.structure||'—')}</p></div></div>${formatBlock}${content.cta?`<div class="v591-summary-grid"><div class="wide"><small>CTA</small><p>${E(content.cta)}</p></div></div>`:''}${b.client_assets||b.materials?`<div class="v591-summary-grid"><div class="wide"><small>MATERIAIS NECESSÁRIOS</small><p>${E(b.client_assets||b.materials)}</p></div></div>`:''}${Array.isArray(b.reference_links)&&b.reference_links.length?`<div class="v591-reference-list"><small>REFERÊNCIAS</small>${b.reference_links.map(link=>/^https?:\/\//i.test(link)?`<a href="${E(link)}" target="_blank" rel="noopener">${E(link)} ↗</a>`:`<span>${E(link)}</span>`).join('')}</div>`:''}</section>`}
function workflowProgressV591(stage){return `<div class="v591-progress">${workflowStagesV583.map(([key,label],i)=>{let index=workflowStagesV583.findIndex(x=>x[0]===stage);return`<span class="${i<index?'done':i===index?'on':''}"><i>${i<index?'✓':i+1}</i><b>${E(label)}</b></span>`}).join('')}</div>`}
function workflowProgressModalV591(content){let work=workflowWorkV583(content.id),stage=workflowStageV583(work),approved=content.status==='approved'||approvalInfo(content).label==='Aprovado',approval=approvalInfo(content),owner=workflowOwnerForStageV591(work,stage),body='';if(stage==='visual_production')body=`<section class="v591-stage-form"><small>ETAPA ATUAL</small><h3>Produção</h3><p>Agora entram somente informações de execução. O briefing acima já está fechado.</p><form id="workflowProgressFormV591" data-content="${content.id}" data-stage="${stage}"><div class="formgrid"><div class="field"><label>Responsável pela produção</label><select name="assigned_to">${workflowProfileOptionsV583(owner,'Definir responsável')}</select></div><div class="field"><label>Link editável / material</label><input name="canva_edit_url" type="url" value="${E(work?.canva_edit_url||'')}" placeholder="Canva, Drive..."></div></div><div class="field"><label>Observações de produção <span class="muted">(se necessário)</span></label><textarea name="internal_notes" rows="4">${E(work?.internal_notes||'')}</textarea></div><div class="actions"><button type="button" class="btn ghost" data-close>Fechar</button><button type="submit" class="btn ghost">Salvar</button><button type="button" class="btn pri" data-v591-move="internal_review" data-content="${content.id}">Enviar para revisão →</button></div></form></section>`;if(stage==='internal_review')body=`<section class="v591-stage-form"><small>ETAPA ATUAL</small><h3>Revisão interna</h3><p>Confira a peça pronta. Se precisar, devolva para produção; se estiver certa, envie para a cliente.</p>${socialAssetV550(content)}<form id="workflowProgressFormV591" data-content="${content.id}" data-stage="${stage}"><div class="field"><label>Observações da revisão <span class="muted">(opcional)</span></label><textarea name="internal_notes" rows="4">${E(work?.internal_notes||'')}</textarea></div><div class="actions"><button type="button" class="btn ghost" data-v591-move="visual_production" data-content="${content.id}">← Voltar para produção</button><button type="submit" class="btn ghost">Salvar nota</button><button type="button" class="btn pri" data-v591-move="client_approval" data-content="${content.id}">Enviar para cliente →</button></div></form></section>`;if(stage==='client_approval')body=`<section class="v591-stage-form"><small>ETAPA ATUAL</small><h3>Aprovação da cliente</h3><div class="v591-approval-state ${content.status==='changes_requested'?'changes':approved?'approved':'pending'}"><b>${E(content.status==='changes_requested'?'Ajustes solicitados':approved?'Conteúdo aprovado':'Aguardando retorno da cliente')}</b><span>${E(approval.label)}</span></div>${content.status==='changes_requested'?`<div class="actions"><button type="button" class="btn pri" data-v591-move="visual_production" data-content="${content.id}">Levar ajustes para produção →</button></div>`:approved?`<form id="workflowProgressFormV591" data-content="${content.id}" data-stage="schedule"><div class="formgrid"><div class="field"><label>Data de publicação</label><input name="publication_date" type="date" required value="${E(content.publication_date||'')}"></div><div class="field"><label>Horário</label><input name="publication_time" type="time" value="${E(String(content.publication_time||'').slice(0,5))}"></div></div><div class="field"><label>Canal</label><input name="channel" value="${E(workflowBriefV583(work).channel||'Instagram')}"></div><div class="actions"><button type="submit" class="btn pri" data-v591-schedule="1">Programar conteúdo →</button></div></form>`:'<p class="v591-waiting-note">Nenhuma informação nova precisa ser preenchida enquanto a cliente não responder.</p>'}</section>`;if(stage==='scheduled')body=`<section class="v591-stage-form"><small>ETAPA ATUAL</small><h3>Programado</h3><div class="v591-schedule-card"><span><small>DATA</small><b>${content.publication_date?fmtDate(content.publication_date):'—'}</b></span><span><small>HORÁRIO</small><b>${E(String(content.publication_time||'—').slice(0,5))}</b></span><span><small>CANAL</small><b>${E(workflowBriefV583(work).channel||'Instagram')}</b></span></div><form id="workflowProgressFormV591" data-content="${content.id}" data-stage="published"><div class="field"><label>Link da publicação <span class="muted">(pode adicionar ao publicar)</span></label><input name="external_media_url" type="url" value="${E(content.external_media_url||'')}" placeholder="https://instagram.com/..."></div><div class="actions"><button type="submit" class="btn pri" data-v591-publish="1">Marcar como publicado ✓</button></div></form></section>`;if(stage==='published')body=`<section class="v591-stage-form"><small>CONCLUÍDO</small><h3>Conteúdo publicado ✓</h3>${content.external_media_url?`<a class="btn ghost" href="${E(content.external_media_url)}" target="_blank" rel="noopener">Abrir publicação ↗</a>`:''}</section>`;return `<div class="modalbg"><div class="modal wide v591-work-modal"><div class="head"><div><small class="ey">${E(workflowStageLabelV583(stage))}</small><h2>${E(content.title||'Conteúdo')}</h2></div><button class="btn ghost small" data-close>✕</button></div>${workflowProgressV591(stage)}${workflowBriefSummaryV591(content,work)}${body}</div></div>`}
async function saveWorkflowProgressV591(event){event.preventDefault();let form=event.currentTarget,data=new FormData(form),content=D.contents.find(row=>row.id===form.dataset.content),work=content?workflowWorkV583(content.id):null;if(!content||!work)return;let stage=form.dataset.stage,now=new Date().toISOString();try{if(stage==='visual_production'){await patch('content_team_workflow',work.id,{assigned_to:String(data.get('assigned_to')||'')||null,design_owner_id:String(data.get('assigned_to')||'')||work.design_owner_id||null,canva_edit_url:String(data.get('canva_edit_url')||'').trim()||null,internal_notes:String(data.get('internal_notes')||'').trim()||null,next_action:workflowNextActionV591(content,'visual_production'),updated_at:now})}else if(stage==='internal_review'){await patch('content_team_workflow',work.id,{internal_notes:String(data.get('internal_notes')||'').trim()||null,updated_at:now})}else if(stage==='schedule'){let date=String(data.get('publication_date')||''),time=String(data.get('publication_time')||'')||null,brief={...workflowBriefV583(work),channel:String(data.get('channel')||'Instagram').trim()};await patch('contents',content.id,{publication_date:date||null,publication_time:time,updated_at:now});await patch('content_team_workflow',work.id,{brief,updated_at:now});if(event.submitter?.dataset.v591Schedule)await moveWorkflowV591(content.id,'scheduled',false)}else if(stage==='published'){await patch('contents',content.id,{external_media_url:String(data.get('external_media_url')||'').trim()||null,updated_at:now});if(event.submitter?.dataset.v591Publish)await moveWorkflowV591(content.id,'published',false)}if(stage!=='schedule'&&stage!=='published'){await load();render();toast('Atualizado ✦')}}catch(error){toast(error.message)}}
async function moveWorkflowV591(contentId,target,reload=true){let content=D.contents.find(row=>row.id===contentId),work=workflowWorkV583(contentId);if(!content||!work)return;let before=workflowStageV583(work),now=new Date().toISOString(),assigned=work.assigned_to;if(target==='visual_production')assigned=work.design_owner_id||productionOwnerV591()||assigned;if(target==='internal_review')assigned=work.reviewer_id||reviewOwnerV591()||assigned;if(target==='client_approval')assigned=null;let payload={internal_status:target,assigned_to:assigned,next_action:workflowNextActionV591(content,target),stalled_since:now,updated_at:now};try{await patch('content_team_workflow',work.id,payload);await patch('contents',content.id,{status:workflowPublicStatusV583(target),updated_at:now});if(target==='client_approval'&&!D.approvals.some(a=>a.content_id===content.id&&a.status==='pending'))await createApproval(content.id,content.client_id);await workflowActivityV583(content,'stage_changed','',before,target);MD=null;if(reload!==false){await load();render();toast('Movido para '+workflowStageLabelV583(target))}else{await load();render();toast(target==='published'?'Publicado ✓':target==='scheduled'?'Programado ✦':'Atualizado ✦')}}catch(error){toast(error.message)}}
function clientMorePaneV591(cid){let active=clientHubTabsV563[cid]==='more';return `<section class="panel v5-hub-wide v591-more-pane" id="more" ${active?'data-v563-active':''}><div class="v591-pane-head"><div><small class="ey">GESTÃO DA CLIENTE</small><h2>Outras áreas</h2><p>Informações administrativas e operacionais ficam organizadas aqui, sem disputar espaço com o fluxo de conteúdo.</p></div></div><div class="v591-more-grid">${[['services','▦','Serviços','Planos e operação ativa'],['contact','◎','Dados','Contato e informações'],['agenda','◷','Agenda','Reuniões e compromissos'],['tasks','✓','Demandas','Pendências da cliente'],['forms','▤','Briefings & onboarding','Formulários e respostas'],['finance','R$','Contrato & pagamentos','Financeiro da cliente'],['files','D','Drive & arquivos','Materiais e links'],['history','↺','Histórico','Movimentos recentes']].map(([tab,icon,title,desc])=>`<button data-client-tab="${tab}"><span>${icon}</span><div><b>${title}</b><small>${desc}</small></div><i>→</i></button>`).join('')}</div></section>`}
function clientHeaderV591(cid){let client=cl(cid)||{},services=(D.services||[]).filter(s=>s.client_id===cid&&s.active);return `<section class="v591-client-header"><button class="v591-back" data-v="clients">← Clientes</button><div class="v591-client-identity"><div class="avatar">${E(client.initials||ini(client.name))}</div><div><small>${E(client.segment||'CLIENTE COLAB')}</small><h1>${E(client.name||'Cliente')}</h1><div>${services.map(s=>`<span>${E(lab(s.service))}</span>`).join('')}</div></div></div><span class="v591-active"><i></i> ATIVA</span></section>`}
function clientNavV591(cid){let active=clientHubTabsV563[cid]||'workflow',admin=['services','contact','agenda','tasks','forms','finance','files','history','more'],selected=admin.includes(active)?'more':active,tabs=[['workflow','Workflow'],['ideas','Ideias'],['strategy','Estratégia'],['recording','Para gravar'],['more','Mais']];return `<nav class="v591-client-nav">${tabs.map(([key,label])=>`<button class="${selected===key?'on':''}" data-client-tab="${key}">${label}</button>`).join('')}</nav>`}
if(!clientHubTabDefsV563.some(item=>item[0]==='more'))clientHubTabDefsV563.push(['more','Mais']);
const _clientHubPageV591Base=clientHubPageV5;
clientHubPageV5=function(clientId){let active=clientHubTabsV563[clientId];if(!active||active==='lab')clientHubTabsV563[clientId]=clientActiveServicesV582(clientId).includes('social_media')?'workflow':'services';let html=_clientHubPageV591Base(clientId),social=clientActiveServicesV582(clientId).includes('social_media');if(!social)return html;html=html.replace(/<section class="v5-client-hero">[\s\S]*?<\/section>/,clientHeaderV591(clientId));html=html.replace(/<div class="v5-client-tabs v563-client-tabs"[\s\S]*?<\/div>/,clientNavV591(clientId));html=html.replace(/<section class="panel v5-hub-wide" id="ideas"[^>]*>[\s\S]*?<\/section>/,clientIdeasPaneV591(clientId));html=html.replace(/<\/div>\s*$/,clientMorePaneV591(clientId)+'</div>');let current=clientHubTabsV563[clientId],admin=['services','contact','agenda','tasks','forms','finance','files','history'];if(admin.includes(current))html=html.replace(new RegExp('(<section class="[^"]*" id="'+current+'" data-v563-active[^>]*>)'),'$1<button class="v591-back-more" data-client-tab="more">← Mais áreas</button>');return `<div class="v591-client-page">${html}</div>`};
workflowBriefModalV583=function(content){return content?workflowProgressModalV591(content):structuredIdeaModalV591()};
const _modalV591Base=modal;
modal=function(){if(MD?.type==='ideaStructuredV591')return structuredIdeaModalV591();if(MD?.type==='ideaQuickV5')return structuredIdeaModalV591();return _modalV591Base()};
const _homePageV591Base=homePage;
homePage=function(){return _homePageV591Base().replace(/>Anotar ideia</g,'>Nova ideia<')};
function bindIdeaFormatV591(){let form=document.getElementById('ideaStructuredFormV591'),select=form?.querySelector('[data-v591-idea-format]'),slot=form?.querySelector('[data-v591-idea-format-fields]');if(!select||!slot)return;let renderFields=()=>{slot.innerHTML=ideaFormatFieldsV591(select.value,{});bindIdeaSlidesV591()};select.onchange=renderFields;bindIdeaSlidesV591()}
function bindIdeaSlidesV591(){let count=document.querySelector('[data-v591-slide-count]'),slot=document.querySelector('[data-v591-slides]');if(!count||!slot)return;count.onchange=()=>{let old=Array.from(slot.querySelectorAll('[data-v591-slide]')).map(el=>el.value),n=Math.max(2,Math.min(20,Number(count.value||5)));count.value=n;slot.innerHTML=Array.from({length:n},(_,i)=>`<label><small>${i===0?'CAPA':`SLIDE ${i+1}`}</small><textarea data-v591-slide="${i}" rows="3" required>${E(old[i]||'')}</textarea></label>`).join('')}}
const _bindV591Base=bind;
bind=function(){_bindV591Base();document.getElementById('ideaStructuredFormV591')?.addEventListener('submit',saveStructuredIdeaV591);bindIdeaFormatV591();document.querySelectorAll('[data-v591-new-idea]').forEach(button=>button.onclick=()=>{MD={type:'ideaStructuredV591',clientId:button.dataset.v591NewIdea};render()});document.querySelectorAll('[data-v591-idea-edit]').forEach(button=>button.onclick=()=>{MD={type:'ideaStructuredV591',id:button.dataset.v591IdeaEdit};render()});document.querySelectorAll('[data-v591-send-production]').forEach(button=>button.onclick=()=>sendIdeaToProductionV591(button.dataset.v591SendProduction));document.querySelectorAll('[data-v591-open-content]').forEach(button=>button.onclick=()=>{if(!button.dataset.v591OpenContent)return;MD={type:'contentDetail',id:button.dataset.v591OpenContent};render()});document.getElementById('ideaProductionMonthV591')?.addEventListener('change',event=>{contentMonth=event.target.value;render()});document.querySelectorAll('[data-v591-stage]').forEach(button=>button.onclick=()=>{workflowStageFilterV591=button.dataset.v591Stage;render()});document.getElementById('workflowProgressFormV591')?.addEventListener('submit',saveWorkflowProgressV591);document.querySelectorAll('[data-v591-move]').forEach(button=>button.onclick=async()=>{let form=document.getElementById('workflowProgressFormV591');if(form&&form.dataset.stage==='visual_production'){let data=new FormData(form),work=workflowWorkV583(button.dataset.content);if(work)await patch('content_team_workflow',work.id,{assigned_to:String(data.get('assigned_to')||'')||null,design_owner_id:String(data.get('assigned_to')||'')||work.design_owner_id||null,canva_edit_url:String(data.get('canva_edit_url')||'').trim()||null,internal_notes:String(data.get('internal_notes')||'').trim()||null,updated_at:new Date().toISOString()})}if(form&&form.dataset.stage==='internal_review'){let data=new FormData(form),work=workflowWorkV583(button.dataset.content);if(work)await patch('content_team_workflow',work.id,{internal_notes:String(data.get('internal_notes')||'').trim()||null,updated_at:new Date().toISOString()})}await moveWorkflowV591(button.dataset.content,button.dataset.v591Move)});};
const v591Style=document.createElement('style');v591Style.textContent=`
.v591-client-page{max-width:1500px;margin:0 auto}.v591-client-header{display:flex;align-items:center;gap:18px;padding:16px 0 18px;border-bottom:1px solid #252525}.v591-back{border:0;background:transparent;color:#8a8a8a;font-size:10px;font-weight:850;cursor:pointer}.v591-client-identity{display:flex;align-items:center;gap:12px;min-width:0;flex:1}.v591-client-identity .avatar{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:#ff6a00;color:#fff;font-size:13px;font-weight:950}.v591-client-identity small{display:block;color:#6f6f6f;font-size:7px;font-weight:900;letter-spacing:.12em}.v591-client-identity h1{margin:3px 0 5px;font-size:23px;line-height:1}.v591-client-identity>div:last-child>div{display:flex;gap:6px;flex-wrap:wrap}.v591-client-identity>div:last-child>div span{padding:4px 7px;border-radius:999px;background:#21150f;color:#ff8640;font-size:7px;font-weight:850}.v591-active{display:flex;align-items:center;gap:6px;color:#73d891;font-size:7px;font-weight:950;letter-spacing:.1em}.v591-active i{width:6px;height:6px;border-radius:50%;background:#63d786}.v591-client-nav{position:sticky;top:0;z-index:8;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;margin:0 0 14px;padding:10px 0;background:linear-gradient(#0c0c0cf7,#0c0c0cf7)}.v591-client-nav button{min-height:40px;border:0;border-bottom:2px solid transparent;background:transparent;color:#777;font-size:9px;font-weight:900}.v591-client-nav button.on{border-bottom-color:#ff6a00;color:#fff}.v591-client-page .v563-client-tabs{display:none!important}.v591-pane-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin-bottom:18px}.v591-pane-head h2{margin:6px 0 5px;font-size:25px}.v591-pane-head p{max-width:650px;margin:0;color:#7d7d7d;font-size:10px;line-height:1.5}.v591-workflow-pane,.v591-ideas-pane,.v591-more-pane{padding:20px!important}.v591-month{display:grid;gap:5px;min-width:165px}.v591-month small,.v591-ideas-toolbar label small{color:#666;font-size:7px;font-weight:950}.v591-next-action{display:flex;align-items:center;justify-content:space-between;width:100%;margin:0 0 12px;padding:14px 16px;border:1px solid #463022;border-radius:14px;background:linear-gradient(90deg,#1d130e,#121212);color:#fff;text-align:left}.v591-next-action small,.v591-next-action b,.v591-next-action em{display:block}.v591-next-action small{color:#ff7d33;font-size:7px;font-weight:950;letter-spacing:.1em}.v591-next-action b{margin:4px 0;font-size:11px}.v591-next-action em{color:#777;font-size:8px;font-style:normal}.v591-next-owner{color:#aaa;font-size:8px}.v591-next-owner b{display:inline;margin-left:8px;color:#ff6a00}.v591-next-empty{display:flex;align-items:center;gap:10px;margin-bottom:12px;padding:13px 15px;border:1px solid #292929;border-radius:14px;background:#111}.v591-next-empty>span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#152b1d;color:#75d694}.v591-next-empty b,.v591-next-empty small{display:block}.v591-next-empty b{font-size:9px}.v591-next-empty small{margin-top:3px;color:#666;font-size:7px}.v591-stage-strip{display:flex;gap:5px;margin:0 0 12px;overflow-x:auto;scrollbar-width:none}.v591-stage-strip button{display:flex;align-items:center;gap:7px;flex:0 0 auto;min-height:34px;padding:6px 10px;border:1px solid #2b2b2b;border-radius:999px;background:#111;color:#777}.v591-stage-strip button b{font-size:10px;color:#bbb}.v591-stage-strip button span{font-size:7px;font-weight:850}.v591-stage-strip button.on{border-color:#ff6a00;background:#21130c;color:#ff8b4b}.v591-stage-strip button.on b{color:#fff}.v591-workflow-board{display:grid;grid-template-columns:repeat(5,minmax(190px,1fr));gap:8px}.v591-work-lane{min-width:0;padding:9px;border:1px solid #292929;border-radius:14px;background:#101010}.v591-work-lane>header{display:flex;align-items:center;justify-content:space-between;padding:3px 3px 9px}.v591-work-lane>header>div{display:flex;align-items:center;gap:7px}.v591-work-lane>header i{width:7px;height:7px;border-radius:50%;background:#ff6a00}.v591-work-lane.stage-internal_review>header i{background:#e8b85b}.v591-work-lane.stage-client_approval>header i{background:#8b7cff}.v591-work-lane.stage-scheduled>header i{background:#6aa8ff}.v591-work-lane.stage-published>header i{background:#63ce83}.v591-work-lane>header b{font-size:8px}.v591-work-lane>header span{color:#666;font-size:8px}.v591-lane-list{display:grid;gap:7px}.v591-lane-empty{padding:15px 8px;color:#555;font-size:8px;text-align:center}.v591-work-card{display:grid;grid-template-columns:46px minmax(0,1fr) auto;gap:9px;align-items:center;padding:8px;border:1px solid #292929;border-radius:11px;background:#151515;cursor:pointer}.v591-work-card .v550-media{width:46px;height:46px;min-height:46px;border-radius:9px;aspect-ratio:1}.v591-work-meta{display:flex;gap:5px;flex-wrap:wrap}.v591-work-meta span{color:#6d6d6d;font-size:6px;text-transform:uppercase}.v591-work-copy h4{margin:4px 0 7px;font-size:9px;line-height:1.3}.v591-work-next small,.v591-work-next b,.v591-work-next span{display:block}.v591-work-next small{color:#ff7d33;font-size:5px;font-weight:950}.v591-work-next b{margin-top:2px;font-size:7px}.v591-work-next span{margin-top:2px;color:#666;font-size:6px}.v591-arrow{color:#555;font-size:11px}.v591-ideas-toolbar{display:flex;align-items:end;gap:8px;margin-bottom:12px;padding:10px 12px;border:1px solid #292929;border-radius:12px;background:#111}.v591-ideas-toolbar>span{padding:0 10px;border-right:1px solid #2c2c2c;color:#777;font-size:7px}.v591-ideas-toolbar>span b{display:block;margin-bottom:2px;color:#fff;font-size:13px}.v591-ideas-toolbar label{display:grid;gap:4px;margin-left:auto}.v591-idea-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v591-idea-card{padding:16px;border:1px solid #303030;border-radius:15px;background:#141414}.v591-idea-card.ready{border-color:#4d3525}.v591-idea-card.converted{opacity:.72}.v591-idea-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.v591-idea-card-head small{color:#ff7d33;font-size:6px;font-weight:900;text-transform:uppercase}.v591-idea-card-head h3{margin:5px 0 0;font-size:14px;line-height:1.3}.v591-idea-card-head>span{padding:5px 7px;border-radius:999px;font-size:6px;font-weight:950;white-space:nowrap}.v591-idea-card-head>span.ready{background:#173020;color:#76d894}.v591-idea-card-head>span.draft{background:#2c2517;color:#e5bd67}.v591-idea-card p{margin:11px 0;color:#999;font-size:8px;line-height:1.55}.v591-idea-meta{display:flex;gap:6px}.v591-idea-meta span{padding:5px 7px;border-radius:7px;background:#202020;color:#888;font-size:6px}.v591-idea-actions{display:flex;gap:6px;justify-content:flex-end;margin-top:13px}.v591-missing{display:block;margin-top:8px;color:#ad826a;font-size:6px}.v591-idea-history{margin-top:15px;padding-top:12px;border-top:1px solid #292929}.v591-idea-history summary{margin-bottom:10px;color:#777;font-size:8px;font-weight:900}.v591-empty{grid-column:1/-1;padding:34px;border:1px dashed #333;border-radius:15px;text-align:center}.v591-empty span{color:#ff6a00;font-size:22px}.v591-empty h3{margin:7px 0 4px}.v591-empty p{margin:0;color:#777}.v591-more-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.v591-more-grid button{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:13px;border:1px solid #2d2d2d;border-radius:13px;background:#121212;color:#fff;text-align:left}.v591-more-grid button>span{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:#21150f;color:#ff7a31;font-size:10px;font-weight:950}.v591-more-grid b,.v591-more-grid small{display:block}.v591-more-grid b{font-size:9px}.v591-more-grid small{margin-top:3px;color:#666;font-size:7px}.v591-more-grid i{color:#555;font-style:normal}.v591-back-more{margin-bottom:12px;border:0;background:transparent;color:#ff7b32;font-size:8px;font-weight:900}.v591-client-page .v584-pane-hero,.v591-client-page .v564-strategy-pane>.head{padding:0 0 16px;border:0;border-bottom:1px solid #292929;border-radius:0;background:none}.v591-client-page .v584-pane-hero h2{font-size:24px}.v591-client-page .v584-pane-hero p{font-size:10px}.v591-idea-modal{max-width:860px}.v591-form-block{margin:10px 0;padding:16px;border:1px solid #2d2d2d;border-radius:14px;background:#121212}.v591-form-block>small{display:block;margin-bottom:12px;color:#ff7c34;font-size:7px;font-weight:950;letter-spacing:.1em}.v591-client-lock{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding:10px 12px;border:1px solid #33271f;border-radius:10px;background:#17110e}.v591-client-lock span{color:#777;font-size:7px;font-weight:900}.v591-client-lock b{font-size:10px}.v591-slide-list{display:grid;gap:7px}.v591-slide-list label{display:grid;grid-template-columns:62px 1fr;gap:8px;align-items:start}.v591-slide-list label small{padding-top:10px;color:#ff7d33;font-size:6px;font-weight:950}.v591-slide-list textarea{min-height:62px}.v591-format-empty{display:flex;align-items:center;gap:9px;padding:15px;border:1px dashed #333;border-radius:11px;color:#777}.v591-format-empty span{color:#ff6a00}.v591-format-empty p{margin:0;font-size:8px}.v591-sticky-actions{position:sticky;bottom:-20px;margin:0 -20px -20px;padding:12px 20px;background:#171717ef;border-top:1px solid #292929;backdrop-filter:blur(8px)}.v591-work-modal{max-width:900px}.v591-progress{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin:4px 0 12px}.v591-progress span{display:flex;align-items:center;gap:6px;padding:7px;border-radius:9px;background:#111;color:#555}.v591-progress i{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#222;font-size:6px;font-style:normal}.v591-progress b{font-size:6px}.v591-progress span.on{background:#21140d;color:#fff}.v591-progress span.on i{background:#ff6a00;color:#fff}.v591-progress span.done{color:#6eaa80}.v591-progress span.done i{background:#173020;color:#7bd795}.v591-brief-summary{padding:16px;border:1px solid #2d2d2d;border-radius:14px;background:#111}.v591-summary-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px}.v591-summary-head small{color:#ff7d33;font-size:7px;font-weight:950}.v591-summary-head h3{margin:4px 0 0;font-size:17px}.v591-summary-head>span{padding:6px 8px;border-radius:999px;background:#21150f;color:#ff8541;font-size:7px;font-weight:900}.v591-summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:7px}.v591-summary-grid>div,.v591-summary-slides>div{padding:10px;border:1px solid #292929;border-radius:10px;background:#151515}.v591-summary-grid .wide{grid-column:1/-1}.v591-summary-grid small,.v591-summary-slides small,.v591-reference-list>small{color:#676767;font-size:6px;font-weight:950}.v591-summary-grid p,.v591-summary-slides p{margin:5px 0 0;color:#bbb;font-size:8px;line-height:1.5;white-space:pre-wrap}.v591-summary-slides{display:grid;gap:6px;margin-top:7px}.v591-reference-list{display:grid;gap:5px;margin-top:9px}.v591-reference-list a,.v591-reference-list span{color:#9c9c9c;font-size:7px;word-break:break-all}.v591-stage-form{margin-top:10px;padding:16px;border:1px solid #34281f;border-radius:14px;background:#15110e}.v591-stage-form>small{color:#ff7d33;font-size:7px;font-weight:950}.v591-stage-form h3{margin:5px 0 4px}.v591-stage-form>p{margin:0 0 12px;color:#777;font-size:8px}.v591-stage-form .v550-media{max-width:180px;margin:10px 0}.v591-approval-state{display:flex;align-items:center;justify-content:space-between;margin:10px 0;padding:12px;border-radius:11px;background:#222}.v591-approval-state b{font-size:9px}.v591-approval-state span{font-size:7px}.v591-approval-state.pending{background:#2b2516;color:#e8c46d}.v591-approval-state.approved{background:#173020;color:#75d793}.v591-approval-state.changes{background:#371c1c;color:#ff9494}.v591-waiting-note{padding:12px;border:1px dashed #3a3024;border-radius:10px}.v591-schedule-card{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:10px 0}.v591-schedule-card span{padding:10px;border:1px solid #2e2e2e;border-radius:10px;background:#111}.v591-schedule-card small,.v591-schedule-card b{display:block}.v591-schedule-card small{color:#666;font-size:6px}.v591-schedule-card b{margin-top:4px;font-size:9px}
@media(max-width:900px){.v591-workflow-board{grid-template-columns:1fr 1fr}.v591-work-lane:last-child{grid-column:1/-1}}
@media(max-width:760px){.v591-client-page{margin-inline:-1px}.v591-client-header{gap:10px;padding:10px 0 12px}.v591-back{font-size:9px}.v591-client-identity .avatar{width:38px;height:38px;border-radius:12px}.v591-client-identity h1{font-size:19px}.v591-active{display:none}.v591-client-nav{margin:0 -13px 11px;padding:8px 13px;overflow-x:auto;display:flex}.v591-client-nav button{flex:0 0 auto;min-width:74px;padding:0 10px}.v591-workflow-pane,.v591-ideas-pane,.v591-more-pane{padding:14px!important}.v591-pane-head{align-items:flex-start;flex-direction:column;gap:11px}.v591-pane-head h2{font-size:21px}.v591-pane-head p{font-size:11px}.v591-pane-head .btn{width:100%;min-height:44px}.v591-workflow-head{display:grid;grid-template-columns:1fr auto}.v591-workflow-head p{grid-column:1/-1}.v591-month{min-width:135px}.v591-next-action{padding:13px}.v591-next-owner{display:none}.v591-stage-strip{margin-inline:-2px}.v591-stage-strip button{min-height:36px}.v591-workflow-board{display:grid;grid-template-columns:1fr;gap:7px}.v591-work-lane:last-child{grid-column:auto}.v591-work-lane{padding:8px}.v591-work-card{grid-template-columns:52px minmax(0,1fr) auto;padding:9px}.v591-work-card .v550-media{width:52px;height:52px}.v591-work-copy h4{font-size:11px}.v591-work-next b{font-size:8px}.v591-work-next span{font-size:7px}.v591-ideas-toolbar{align-items:center;flex-wrap:wrap}.v591-ideas-toolbar>span{padding:0 7px}.v591-ideas-toolbar label{width:100%;margin-left:0;padding-top:8px;border-top:1px solid #292929}.v591-ideas-toolbar input{width:100%}.v591-idea-grid{grid-template-columns:1fr}.v591-idea-card{padding:14px}.v591-idea-card-head h3{font-size:15px}.v591-idea-card p{font-size:10px}.v591-idea-actions{display:grid;grid-template-columns:1fr 1.4fr}.v591-idea-actions .btn{width:100%;min-height:40px}.v591-more-grid{grid-template-columns:1fr}.v591-more-grid button{min-height:62px}.v591-idea-modal,.v591-work-modal{padding:14px}.v591-form-block{padding:13px}.v591-form-block .formgrid{grid-template-columns:1fr}.v591-slide-list label{grid-template-columns:1fr}.v591-slide-list label small{padding-top:0}.v591-sticky-actions{bottom:-14px;margin:0 -14px -14px;padding:11px 14px}.v591-progress{display:flex;overflow-x:auto}.v591-progress span{flex:0 0 115px}.v591-summary-grid{grid-template-columns:1fr}.v591-summary-grid .wide{grid-column:auto}.v591-stage-form .formgrid{grid-template-columns:1fr}.v591-stage-form .actions{display:grid;grid-template-columns:1fr}.v591-stage-form .actions .btn{width:100%;min-height:43px}.v591-schedule-card{grid-template-columns:1fr 1fr}.v591-schedule-card span:last-child{grid-column:1/-1}.v591-client-page .v584-pane-hero{align-items:flex-start;flex-direction:column}.v591-client-page .v584-pane-hero h2{font-size:21px}.v591-client-page .v584-pane-hero p{font-size:11px}}
`;document.head.appendChild(v591Style);
// ===== FIM COLAB V5.91 =====


// ===== COLAB V5.92 — RETORNO AO WORKFLOW VISUAL ANTERIOR =====
// Mantém a nova lógica Ideia -> Enviar para produção e a ficha progressiva,
// mas recupera a leitura visual do workflow anterior: radar + kanban horizontal.
function workflowLegacyLaneStageV592(stage){
  return ['idea','building','editorial_review'].includes(stage)?'preparation':stage
}
function workflowCardV592(content){
  let work=workflowWorkV583(content.id),stage=workflowStageV583(work),ownerId=workflowOwnerForStageV591(work,stage),owner=profile(ownerId)?.display_name||'Equipe',next=workflowNextActionV591(content,stage),late=work?.internal_due_date&&work.internal_due_date<today()&&!['scheduled','published'].includes(stage);
  return `<article class="v583-card v592-card ${late?'is-late':''}" data-contentopen="${content.id}">${socialAssetV550(content)}<div class="v583-card-copy"><div class="v583-card-top"><small>${E(pillar(content.editorial_pillar_id)?.name||'Linha editorial')}</small><b>${E(fmt(content.format||'undefined'))}</b></div><h4>${E(content.title||'Conteúdo')}</h4><div class="v583-next"><small>PRÓXIMA AÇÃO</small><strong>${E(next)}</strong><span>${E(owner)}${work?.internal_due_date?' · '+fmtDate(work.internal_due_date):''}</span></div><footer><em class="${ownerId===S.user?.id?'mine':''}">${E(ownerId===S.user?.id?'Minha vez':owner)}</em><span>${E(workflowAgeV583(work))}</span></footer></div></article>`
}
function workflowBoardV592(items){
  let groups=[
    ['preparation','Em preparação'],
    ['visual_production','Produção'],
    ['internal_review','Revisão interna'],
    ['client_approval','Aprovação cliente'],
    ['scheduled','Programado'],
    ['published','Publicado']
  ];
  let visible=items.filter(workflowFilteredV583),mine=items.filter(c=>workflowWorkV583(c.id)?.assigned_to===S.user?.id).length,client=items.filter(c=>workflowStageV583(workflowWorkV583(c.id))==='client_approval').length,late=items.filter(c=>{let w=workflowWorkV583(c.id),s=workflowStageV583(w);return w?.internal_due_date&&w.internal_due_date<today()&&!['scheduled','published'].includes(s)}).length;
  let radar=`<section class="v583-radar v592-radar"><button data-v583-focus="all" class="${workflowFocusV583==='all'?'on':''}"><b>${items.length}</b><span>Todos</span></button><button data-v583-focus="mine" class="${workflowFocusV583==='mine'?'on':''}"><b>${mine}</b><span>Minha vez</span></button><button data-v583-focus="client" class="${workflowFocusV583==='client'?'on':''}"><b>${client}</b><span>Cliente</span></button><button data-v583-focus="late" class="${workflowFocusV583==='late'?'on':''}"><b>${late}</b><span>Atrasados</span></button></section>`;
  return radar+`<div class="v550-workflow-wrap v592-board-wrap"><div class="v583-board v592-board">${groups.map(([key,label])=>{let rows=visible.filter(c=>workflowLegacyLaneStageV592(workflowStageV583(workflowWorkV583(c.id)))===key);let drop=key==='preparation'?'visual_production':key;return `<section class="v583-lane v592-lane stage-${key}" data-v583-drop="${drop}"><header><i></i><b>${E(label)}</b><span>${rows.length}</span></header>${rows.map(workflowCardV592).join('')||'<div class="v583-empty">Nenhum conteúdo</div>'}</section>`}).join('')}</div></div>`
}
clientWorkflowPaneV586=function(cid){
  let client=cl(cid)||{},items=clientWorkflowItemsV586(cid),active=clientHubTabsV563[cid]==='workflow',next=clientWorkflowNextV586(cid),work=next?workflowWorkV583(next.id):null,stage=next?workflowStageV583(work):null,owner=next?profile(workflowOwnerForStageV591(work,stage))?.display_name||'Equipe':'';
  return `<section class="panel v5-hub-wide v586-workflow-pane v592-workflow-pane" id="workflow" ${active?'data-v563-active':''}><div class="v592-workflow-head"><div><small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small><h2>Conteúdos do mês</h2></div><label><small>MÊS</small><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label></div>${next?`<button class="v592-next" data-contentopen="${next.id}"><div><small>PRÓXIMA AÇÃO</small><b>${E(workflowNextActionV591(next,stage))}</b><span>${E(next.title||'Conteúdo')} · ${E(owner)}</span></div><strong>→</strong></button>`:''}${workflowBoardV592(items)}</section>`
};
const v592Style=document.createElement('style');v592Style.textContent=`
.v592-workflow-pane{padding:18px!important}.v592-workflow-head{display:flex;align-items:end;justify-content:space-between;gap:14px;margin-bottom:12px}.v592-workflow-head h2{margin:5px 0 0;font-size:23px}.v592-workflow-head label{display:grid;gap:5px;min-width:165px}.v592-workflow-head label small{color:#6e6e6e;font-size:7px;font-weight:950}.v592-next{display:flex;align-items:center;justify-content:space-between;width:100%;margin:0 0 12px;padding:13px 15px;border:1px solid #493020;border-radius:13px;background:#17110e;color:#fff;text-align:left}.v592-next small,.v592-next b,.v592-next span{display:block}.v592-next small{color:#ff7c33;font-size:6px;font-weight:950;letter-spacing:.11em}.v592-next b{margin:4px 0;font-size:10px}.v592-next span{color:#777;font-size:7px}.v592-next strong{color:#ff6a00;font-size:18px}.v592-radar{margin-bottom:12px}.v592-board{grid-template-columns:repeat(6,minmax(235px,1fr));min-width:1510px}.v592-lane{min-height:350px}.v592-card{display:block!important}.v592-card .v550-media{width:100%!important;height:auto!important;min-height:105px!important;aspect-ratio:16/9!important;border-radius:10px 10px 0 0!important}.v592-card .v583-card-copy{padding:10px}.v592-card .v583-card-top b{color:#777;font-size:6px}.v592-card h4{font-size:10px!important;line-height:1.35}.v592-card .v583-next strong{font-size:8px}.v592-card footer{font-size:6px}.v592-card footer em.mine{color:#ff7c33}.v592-lane.stage-preparation>header i{background:#8b8b8b}.v592-lane.stage-visual_production>header i{background:#ff6a00}.v592-lane.stage-internal_review>header i{background:#e6b85b}.v592-lane.stage-client_approval>header i{background:#8e7cff}.v592-lane.stage-scheduled>header i{background:#6aa7ff}.v592-lane.stage-published>header i{background:#63cf83}
@media(max-width:760px){.v592-workflow-pane{padding:14px!important}.v592-workflow-head{align-items:flex-start;flex-direction:column}.v592-workflow-head h2{font-size:21px}.v592-workflow-head label{width:100%;min-width:0}.v592-workflow-head input{width:100%}.v592-radar{display:flex;overflow-x:auto;margin-inline:-1px}.v592-radar button{flex:0 0 120px}.v592-board{grid-template-columns:repeat(6,260px);min-width:1590px}.v592-lane{min-height:320px}.v592-card .v550-media{min-height:118px!important}.v592-next b{font-size:11px}.v592-next span{font-size:8px}}
`;document.head.appendChild(v592Style);
// ===== FIM COLAB V5.92 =====


// ===== COLAB V5.93 — WORKFLOW VISUAL / EDITORIAL =====
function workflowVisualStageV593(stage){return ['idea','building','editorial_review'].includes(stage)?'preparation':stage}
function workflowVisualGroupsV593(){return [
  ['preparation','Pré-produção','01'],
  ['visual_production','Produção','02'],
  ['internal_review','Revisão interna','03'],
  ['client_approval','Aprovação cliente','04'],
  ['scheduled','Programado','05'],
  ['published','Publicado','06']
]}
function workflowVisualCountV593(items,key){return items.filter(c=>workflowVisualStageV593(workflowStageV583(workflowWorkV583(c.id)))===key).length}
function workflowVisualCardV593(content){
  let work=workflowWorkV583(content.id),raw=workflowStageV583(work),stage=workflowVisualStageV593(raw),ownerId=workflowOwnerForStageV591(work,raw),owner=profile(ownerId)?.display_name||'Equipe',next=workflowNextActionV591(content,raw),late=work?.internal_due_date&&work.internal_due_date<today()&&!['scheduled','published'].includes(raw),line=pillar(content.editorial_pillar_id)?.name||'Sem linha editorial';
  return `<article class="v593-card stage-${stage} ${late?'is-late':''}" data-contentopen="${content.id}"><div class="v593-card-media">${socialAssetV550(content)}</div><div class="v593-card-body"><div class="v593-card-kicker"><span>${E(fmt(content.format||'undefined'))}</span><span>${E(line)}</span></div><h3>${E(content.title||'Conteúdo')}</h3><div class="v593-card-action"><small>PRÓXIMA AÇÃO</small><b>${E(next)}</b><span>${E(owner)}${work?.internal_due_date?' · '+fmtDate(work.internal_due_date):''}</span></div><footer><span>${late?'ATRASADO':E(workflowStageLabelV583(raw))}</span><b>→</b></footer></div></article>`
}
function workflowVisualBoardV593(items){
  let groups=workflowVisualGroupsV593();
  return `<div class="v593-board-wrap"><div class="v593-board">${groups.map(([key,label,num])=>{let rows=items.filter(c=>workflowVisualStageV593(workflowStageV583(workflowWorkV583(c.id)))===key);return `<section class="v593-lane stage-${key}"><header><div><i></i><span>${num}</span><b>${E(label)}</b></div><em>${rows.length}</em></header><div class="v593-lane-list">${rows.map(workflowVisualCardV593).join('')||'<div class="v593-lane-empty"><span>○</span><small>Nenhum conteúdo</small></div>'}</div></section>`}).join('')}</div></div>`
}
clientWorkflowPaneV586=function(cid){
  let client=cl(cid)||{},items=clientWorkflowItemsV586(cid),active=clientHubTabsV563[cid]==='workflow',groups=workflowVisualGroupsV593(),next=clientWorkflowNextV586(cid),nextWork=next?workflowWorkV583(next.id):null,nextStage=next?workflowStageV583(nextWork):null,nextOwner=next?profile(workflowOwnerForStageV591(nextWork,nextStage))?.display_name||'Equipe':'',published=workflowVisualCountV593(items,'published'),production=workflowVisualCountV593(items,'preparation')+workflowVisualCountV593(items,'visual_production'),approval=workflowVisualCountV593(items,'client_approval'),progress=items.length?Math.round(published/items.length*100):0,monthLabel=typeof portalMonthNameV428==='function'?portalMonthNameV428(contentMonth):contentMonth;
  return `<section class="panel v5-hub-wide v593-workflow-pane" id="workflow" ${active?'data-v563-active':''}>
    <div class="v593-hero">
      <div class="v593-hero-top"><div><small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small><h2>Conteúdo em movimento.</h2><p>Da ideia aprovada à publicação, com cada etapa visual e a próxima ação sempre clara.</p></div><div class="v593-hero-tools"><label><small>MÊS</small><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label><button class="btn ghost" data-client-tab="ideas">Banco de ideias →</button></div></div>
      <div class="v593-overview"><article><small>NO MÊS</small><b>${items.length}</b><span>${E(monthLabel)}</span></article><article><small>EM PRODUÇÃO</small><b>${production}</b><span>em execução</span></article><article><small>COM CLIENTE</small><b>${approval}</b><span>aguardando retorno</span></article><article class="v593-done"><small>PUBLICADOS</small><b>${published}</b><span>${progress}% concluído</span></article></div>
      <div class="v593-progress"><span><i style="width:${progress}%"></i></span><small>${progress}% do fluxo deste mês concluído</small></div>
    </div>
    ${next?`<button class="v593-next" data-contentopen="${next.id}"><div class="v593-next-thumb">${socialAssetV550(next,true)}</div><div class="v593-next-copy"><small>SUA PRÓXIMA AÇÃO</small><h3>${E(workflowNextActionV591(next,nextStage))}</h3><p>${E(next.title||'Conteúdo')}</p><span>${E(nextOwner)} · ${E(workflowStageLabelV583(nextStage))}</span></div><b>ABRIR →</b></button>`:''}
    <div class="v593-journey">${groups.map(([key,label,num])=>`<div class="stage-${key}"><span>${num}</span><i></i><b>${E(label)}</b><em>${workflowVisualCountV593(items,key)}</em></div>`).join('')}</div>
    ${workflowVisualBoardV593(items)}
  </section>`
};
const v593Style=document.createElement('style');v593Style.textContent=`
.v593-workflow-pane{padding:0!important;overflow:hidden;border-color:#272727!important;background:#0e0e0e!important}.v593-hero{padding:24px 24px 18px;border-bottom:1px solid #2a2a2a;background:radial-gradient(circle at 88% 5%,rgba(255,106,0,.20),transparent 32%),linear-gradient(145deg,#21130c 0,#111 48%,#0d0d0d 100%)}.v593-hero-top{display:flex;align-items:flex-end;justify-content:space-between;gap:22px}.v593-hero-top h2{margin:7px 0 6px;font-size:32px;line-height:1}.v593-hero-top p{max-width:620px;margin:0;color:#8a8a8a;font-size:10px;line-height:1.5}.v593-hero-tools{display:flex;align-items:flex-end;gap:8px}.v593-hero-tools label{display:grid;gap:5px}.v593-hero-tools label small{color:#777;font-size:7px;font-weight:950}.v593-hero-tools input{min-height:42px}.v593-overview{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:20px}.v593-overview article{position:relative;padding:14px 15px;border:1px solid #33271f;border-radius:14px;background:#121212aa;overflow:hidden}.v593-overview article:before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:#ff6a00}.v593-overview article.v593-done:before{background:#63cf83}.v593-overview small,.v593-overview b,.v593-overview span{display:block}.v593-overview small{color:#7a7a7a;font-size:6px;font-weight:950;letter-spacing:.11em}.v593-overview b{margin:5px 0 3px;color:#fff;font-size:22px}.v593-overview span{color:#696969;font-size:7px}.v593-progress{display:flex;align-items:center;gap:10px;margin-top:13px}.v593-progress>span{height:4px;flex:1;overflow:hidden;border-radius:99px;background:#2a2a2a}.v593-progress i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#ff6a00,#ff9b5d)}.v593-progress small{color:#777;font-size:7px}.v593-next{display:grid;grid-template-columns:74px minmax(0,1fr) auto;gap:13px;align-items:center;width:calc(100% - 48px);margin:16px 24px 14px;padding:10px;border:1px solid #4a2d1d;border-radius:16px;background:linear-gradient(90deg,#1d120d,#131313);color:#fff;text-align:left}.v593-next-thumb{width:74px;height:74px;overflow:hidden;border-radius:11px}.v593-next-thumb .v550-media{width:74px!important;height:74px!important;min-height:74px!important;aspect-ratio:1!important;border-radius:11px!important}.v593-next-copy small{color:#ff7b32;font-size:6px;font-weight:950;letter-spacing:.12em}.v593-next-copy h3{margin:5px 0 3px;font-size:13px}.v593-next-copy p{margin:0;color:#b7b7b7;font-size:9px}.v593-next-copy span{display:block;margin-top:6px;color:#6f6f6f;font-size:7px}.v593-next>b{padding-right:8px;color:#ff7b32;font-size:8px;letter-spacing:.06em}.v593-journey{display:grid;grid-template-columns:repeat(6,1fr);gap:0;margin:0 24px 14px;padding:0 4px}.v593-journey>div{position:relative;display:grid;grid-template-columns:auto 1fr auto;gap:7px;align-items:center;min-width:0;padding:8px 8px 8px 0}.v593-journey>div:after{content:"";position:absolute;left:18px;right:-3px;top:50%;height:1px;background:#303030;z-index:0}.v593-journey>div:last-child:after{display:none}.v593-journey span,.v593-journey i,.v593-journey b,.v593-journey em{position:relative;z-index:1}.v593-journey span{display:grid;place-items:center;width:28px;height:28px;border:1px solid #3a2a21;border-radius:50%;background:#17110e;color:#ff813c;font-size:6px;font-weight:950}.v593-journey i{display:none}.v593-journey b{padding:4px 5px;background:#0e0e0e;color:#898989;font-size:7px;white-space:nowrap}.v593-journey em{padding:4px 6px;border-radius:999px;background:#1e1e1e;color:#aaa;font-size:6px;font-style:normal}.v593-board-wrap{padding:0 24px 24px;overflow-x:auto;scrollbar-width:thin;scrollbar-color:#4a2c1d #111}.v593-board{display:grid;grid-template-columns:repeat(6,minmax(250px,1fr));gap:9px;min-width:1580px}.v593-lane{min-height:410px;padding:10px;border:1px solid #292929;border-radius:16px;background:#101010}.v593-lane>header{display:flex;align-items:center;justify-content:space-between;padding:3px 4px 10px}.v593-lane>header>div{display:flex;align-items:center;gap:7px}.v593-lane>header i{width:7px;height:7px;border-radius:50%;background:#777}.v593-lane.stage-visual_production>header i{background:#ff6a00}.v593-lane.stage-internal_review>header i{background:#e6b85b}.v593-lane.stage-client_approval>header i{background:#8e7cff}.v593-lane.stage-scheduled>header i{background:#6aa7ff}.v593-lane.stage-published>header i{background:#63cf83}.v593-lane>header span{color:#555;font-size:6px;font-weight:950}.v593-lane>header b{font-size:8px}.v593-lane>header em{display:grid;place-items:center;min-width:22px;height:22px;border-radius:999px;background:#1e1e1e;color:#888;font-size:7px;font-style:normal}.v593-lane-list{display:grid;gap:9px}.v593-card{overflow:hidden;border:1px solid #2c2c2c;border-radius:14px;background:#151515;cursor:pointer;transition:transform .15s ease,border-color .15s ease}.v593-card:hover{transform:translateY(-2px);border-color:#4a3427}.v593-card.is-late{border-color:#743434}.v593-card-media{height:138px;overflow:hidden;background:#0d0d0d}.v593-card-media .v550-media{width:100%!important;height:138px!important;min-height:138px!important;aspect-ratio:auto!important;border-radius:0!important}.v593-card-body{padding:11px}.v593-card-kicker{display:flex;gap:5px;flex-wrap:wrap}.v593-card-kicker span{padding:4px 6px;border-radius:999px;background:#202020;color:#777;font-size:5px;font-weight:850;text-transform:uppercase}.v593-card-body h3{margin:8px 0 10px;font-size:11px;line-height:1.35}.v593-card-action{padding:9px 10px;border-left:2px solid #ff6a00;background:#19120e}.v593-card-action small,.v593-card-action b,.v593-card-action span{display:block}.v593-card-action small{color:#ff7b32;font-size:5px;font-weight:950}.v593-card-action b{margin:3px 0;color:#ddd;font-size:7px;line-height:1.35}.v593-card-action span{color:#696969;font-size:6px}.v593-card footer{display:flex;align-items:center;justify-content:space-between;margin-top:10px;color:#606060;font-size:6px}.v593-card footer>b{color:#ff7b32;font-size:11px}.v593-card.is-late footer span{color:#ff8b8b}.v593-lane-empty{display:grid;place-items:center;min-height:94px;border:1px dashed #292929;border-radius:12px;color:#505050}.v593-lane-empty span{font-size:17px}.v593-lane-empty small{font-size:7px}
@media(max-width:900px){.v593-overview{grid-template-columns:repeat(2,1fr)}.v593-journey{overflow-x:auto;display:flex}.v593-journey>div{flex:0 0 150px}}
@media(max-width:760px){.v593-hero{padding:18px 16px 15px}.v593-hero-top{align-items:flex-start;flex-direction:column;gap:14px}.v593-hero-top h2{font-size:27px}.v593-hero-top p{font-size:11px}.v593-hero-tools{display:grid;width:100%;grid-template-columns:1fr auto}.v593-hero-tools label{min-width:0}.v593-hero-tools input{width:100%}.v593-overview{gap:7px;margin-top:15px}.v593-overview article{padding:12px}.v593-overview b{font-size:20px}.v593-overview span{font-size:8px}.v593-progress small{font-size:8px}.v593-next{grid-template-columns:64px minmax(0,1fr);width:calc(100% - 32px);margin:14px 16px;padding:9px}.v593-next-thumb,.v593-next-thumb .v550-media{width:64px!important;height:64px!important;min-height:64px!important}.v593-next-copy h3{font-size:12px}.v593-next-copy p{font-size:9px}.v593-next>b{display:none}.v593-journey{margin:0 16px 12px;padding-bottom:3px}.v593-journey>div{flex-basis:140px}.v593-journey b{font-size:7px}.v593-board-wrap{padding:0 16px 20px;scroll-snap-type:x mandatory}.v593-board{display:flex;min-width:0;gap:10px}.v593-lane{flex:0 0 82vw;min-height:370px;scroll-snap-align:start}.v593-card-media,.v593-card-media .v550-media{height:165px!important;min-height:165px!important}.v593-card-body h3{font-size:13px}.v593-card-action b{font-size:9px}.v593-card-action span{font-size:7px}}
`;document.head.appendChild(v593Style);
// ===== FIM COLAB V5.93 =====


// ===== COLAB V5.94 — CLIENTE PREMIUM + KANBAN OPERACIONAL =====
function workflowPremiumStageV594(stage){
  if(['idea','building','editorial_review','visual_production','changes_requested'].includes(stage))return'production';
  if(stage==='internal_review')return'review';
  if(stage==='client_approval')return'client';
  if(stage==='scheduled')return'scheduled';
  return'published'
}
function workflowPremiumGroupsV594(){return[
  ['production','Produção','01'],
  ['review','Revisão interna','02'],
  ['client','Aprovação cliente','03'],
  ['scheduled','Programado','04'],
  ['published','Publicado','05']
]}
function workflowPremiumOwnerV594(content){let work=workflowWorkV583(content.id),raw=workflowStageV583(work);return workflowOwnerForStageV591(work,raw)}
function workflowPremiumStageLabelV594(content){let key=workflowPremiumStageV594(workflowStageV583(workflowWorkV583(content.id)));return workflowPremiumGroupsV594().find(row=>row[0]===key)?.[1]||'Produção'}
function workflowPremiumCardV594(content){
  let work=workflowWorkV583(content.id),raw=workflowStageV583(work),stage=workflowPremiumStageV594(raw),ownerId=workflowPremiumOwnerV594(content),owner=profile(ownerId)?.display_name||'Equipe',mine=ownerId===S.user?.id,next=workflowNextActionV591(content,raw),late=work?.internal_due_date&&work.internal_due_date<today()&&!['scheduled','published'].includes(raw),line=pillar(content.editorial_pillar_id)?.name||'Linha editorial';
  return `<article class="v594-card ${mine?'is-mine':''} ${late?'is-late':''}" data-contentopen="${content.id}"><div class="v594-card-cover">${socialAssetV550(content)}</div><div class="v594-card-body"><div class="v594-card-tags"><span>${E(fmt(content.format||'undefined'))}</span><span>${E(line)}</span></div><h3>${E(content.title||'Conteúdo')}</h3><div class="v594-card-next"><small>PRÓXIMA AÇÃO</small><b>${E(next)}</b><span>${mine?'● COM VOCÊ':'● '+E(owner)}${work?.internal_due_date?' · '+fmtDate(work.internal_due_date):''}</span></div><footer><em>${E(workflowPremiumStageLabelV594(content))}</em><b>→</b></footer></div></article>`
}
function workflowMyCardV594(content){
  let work=workflowWorkV583(content.id),raw=workflowStageV583(work),next=workflowNextActionV591(content,raw);
  return `<button class="v594-my-card" data-contentopen="${content.id}"><div class="v594-my-thumb">${socialAssetV550(content,true)}</div><div><span>${E(workflowPremiumStageLabelV594(content))}</span><b>${E(next)}</b><small>${E(content.title||'Conteúdo')}</small></div><strong>→</strong></button>`
}
function workflowPremiumBoardV594(items){
  let groups=workflowPremiumGroupsV594();
  return `<div class="v594-kanban-scroll"><div class="v594-kanban">${groups.map(([key,label,num])=>{let rows=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))===key),mine=rows.filter(c=>workflowPremiumOwnerV594(c)===S.user?.id).length;return `<section class="v594-lane stage-${key} ${mine?'has-mine':''}"><header><div><i></i><span>${num}</span><b>${E(label)}</b></div><div>${mine?`<strong>${mine} COM VOCÊ</strong>`:''}<em>${rows.length}</em></div></header><div class="v594-lane-list">${rows.map(workflowPremiumCardV594).join('')||'<div class="v594-empty-lane"><span>○</span><small>Nenhum conteúdo nesta etapa</small></div>'}</div></section>`}).join('')}</div></div>`
}
clientHeaderV591=function(cid){let client=cl(cid)||{},services=(D.services||[]).filter(s=>s.client_id===cid&&s.active);return `<section class="v594-client-head"><button class="v594-back" data-v="clients" aria-label="Voltar aos clientes">←</button><div class="v594-client-avatar">${E(client.initials||ini(client.name))}</div><div class="v594-client-name"><small>${E(client.segment||'CLIENTE COLAB')}</small><h1>${E(client.name||'Cliente')}</h1><div>${services.map(s=>`<span>${E(lab(s.service))}</span>`).join('')}</div></div><span class="v594-client-live"><i></i> ATIVA</span></section>`};
clientWorkflowPaneV586=function(cid){
  let client=cl(cid)||{},items=clientWorkflowItemsV586(cid),active=clientHubTabsV563[cid]==='workflow',myItems=items.filter(c=>{let s=workflowStageV583(workflowWorkV583(c.id));return workflowPremiumOwnerV594(c)===S.user?.id&&!['scheduled','published'].includes(s)}),clientItems=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))==='client'),late=items.filter(c=>{let w=workflowWorkV583(c.id),s=workflowStageV583(w);return w?.internal_due_date&&w.internal_due_date<today()&&!['scheduled','published'].includes(s)}),published=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))==='published').length,monthLabel=typeof portalMonthNameV428==='function'?portalMonthNameV428(contentMonth):contentMonth;
  return `<section class="panel v5-hub-wide v594-workflow" id="workflow" ${active?'data-v563-active':''}>
    <div class="v594-work-head"><div><small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small><h2>${E(monthLabel)}</h2><p>Produção organizada por etapa, responsável e próxima ação.</p></div><div class="v594-head-actions"><label><span>MÊS</span><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label><button class="btn pri v594-create" data-v591-new-idea="${E(cid)}">＋ Criar conteúdo</button></div></div>
    <nav class="v594-quick"><button class="pri" data-v591-new-idea="${E(cid)}"><b>＋</b><span>Criar conteúdo</span></button><button data-client-tab="ideas"><b>✦</b><span>Ideias</span></button><button data-client-tab="recording"><b>●</b><span>Para gravar</span></button><button data-taskquick-client="${E(cid)}"><b>✓</b><span>Nova demanda</span></button></nav>
    <section class="v594-mine"><div class="v594-section-title"><div><small>MINHA VEZ</small><h3>${myItems.length?`${myItems.length} ${myItems.length===1?'conteúdo está':'conteúdos estão'} com você agora`:'Nada pendente com você agora'}</h3></div><span>${myItems.length}</span></div>${myItems.length?`<div class="v594-my-list">${myItems.map(workflowMyCardV594).join('')}</div>`:'<div class="v594-mine-clear"><b>✓</b><span>Quando a próxima ação for sua, ela aparece aqui em destaque.</span></div>'}</section>
    <div class="v594-radar"><span><b>${items.length}</b> no mês</span><span class="mine"><b>${myItems.length}</b> comigo</span><span><b>${clientItems.length}</b> com cliente</span><span class="late"><b>${late.length}</b> atrasado${late.length===1?'':'s'}</span><span class="done"><b>${published}</b> publicados</span></div>
    <div class="v594-kanban-title"><div><small>PROCESSO</small><h3>Kanban do mês</h3></div><span>Deslize para acompanhar as etapas →</span></div>
    ${workflowPremiumBoardV594(items)}
  </section>`
};

// Símbolo oficial sem o bloco/wordmark antigo no cabeçalho.
officialBrandV555=function(){return `<img src="${COLAB_SYMBOL_V558}" alt="Colab">`};
applyOfficialBrandV555=function(){
  document.querySelectorAll('.logo').forEach(node=>{node.classList.add('v594-symbol-brand');node.innerHTML=officialBrandV555()});
  document.querySelectorAll('.top .ey').forEach(node=>{if(!node.querySelector('.v555-header-mark'))node.insertAdjacentHTML('afterbegin',`<span class="v555-header-mark">${officialBrandV555()}</span>`);else node.querySelector('.v555-header-mark').innerHTML=officialBrandV555()})
};
const _bindV594Base=bind;
bind=function(){_bindV594Base();document.body.classList.toggle('v594-clienthub',V==='clientHub');applyOfficialBrandV555()};
applyOfficialBrandV555();

const v594Style=document.createElement('style');v594Style.textContent=`
.v594-symbol-brand{display:grid!important;place-items:center!important;background:transparent!important;overflow:visible!important}.v594-symbol-brand img{display:block!important;width:48px!important;height:48px!important;object-fit:contain!important}.side .v594-symbol-brand img{width:56px!important;height:56px!important}.top .v555-header-mark{width:28px!important;height:28px!important;flex:0 0 28px!important}.top .v555-header-mark img{width:28px!important;height:28px!important;object-fit:contain!important}.top .ey{display:flex!important;align-items:center!important;gap:9px!important}.v594-clienthub .top{min-height:54px!important;padding-bottom:8px!important}.v594-clienthub .top h1{display:none!important}.v594-clienthub .top .ey{font-size:8px!important;letter-spacing:.16em!important}.v594-clienthub .main{padding-top:0!important}
.v594-client-head{display:flex;align-items:center;gap:11px;padding:10px 0 12px;border-bottom:1px solid #242424}.v594-back{display:grid;place-items:center;width:34px;height:34px;border:1px solid #2c2c2c;border-radius:10px;background:#111;color:#aaa;font-size:14px}.v594-client-avatar{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:linear-gradient(145deg,#ff7b25,#e94f00);color:#fff;font-size:12px;font-weight:950;box-shadow:0 8px 24px #ff650025}.v594-client-name{min-width:0;flex:1}.v594-client-name small{display:block;color:#666;font-size:6px;font-weight:950;letter-spacing:.13em;text-transform:uppercase}.v594-client-name h1{margin:3px 0 5px;font-size:20px;line-height:1}.v594-client-name>div{display:flex;gap:5px}.v594-client-name>div span{padding:4px 7px;border-radius:999px;background:#21140d;color:#ff8745;font-size:6px;font-weight:900}.v594-client-live{display:flex;align-items:center;gap:5px;color:#72d790;font-size:6px;font-weight:950;letter-spacing:.1em}.v594-client-live i{width:6px;height:6px;border-radius:50%;background:#67d488}
.v594-workflow{padding:0!important;overflow:hidden!important;border:1px solid #292929!important;border-radius:20px!important;background:#0e0e0e!important}.v594-work-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;padding:20px 21px 16px;background:radial-gradient(circle at 92% 0,rgba(255,106,0,.13),transparent 36%),linear-gradient(145deg,#17110e,#0f0f0f 62%);border-bottom:1px solid #242424}.v594-work-head h2{margin:5px 0 4px;font-size:25px;line-height:1;text-transform:capitalize}.v594-work-head p{margin:0;color:#777;font-size:9px}.v594-head-actions{display:flex;align-items:flex-end;gap:8px}.v594-head-actions label{display:grid;gap:4px}.v594-head-actions label span{color:#666;font-size:6px;font-weight:950}.v594-head-actions input{min-height:40px}.v594-create{min-height:40px!important}.v594-quick{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:7px;padding:12px 20px;border-bottom:1px solid #242424}.v594-quick button{display:flex;align-items:center;gap:8px;min-height:45px;padding:9px 11px;border:1px solid #2b2b2b;border-radius:12px;background:#121212;color:#bbb;text-align:left}.v594-quick button.pri{border-color:#ff6a00;background:#ff6a00;color:#fff;box-shadow:0 10px 28px #ff650025}.v594-quick button b{display:grid;place-items:center;width:25px;height:25px;border-radius:8px;background:#1d1d1d;color:#ff7b31;font-size:10px}.v594-quick button.pri b{background:#ffffff1b;color:#fff}.v594-quick button span{font-size:8px;font-weight:900}
.v594-mine{margin:14px 20px;padding:15px;border:1px solid #56331f;border-radius:16px;background:linear-gradient(115deg,#1c120d,#111 58%);box-shadow:inset 0 1px #ffffff05}.v594-section-title{display:flex;align-items:center;justify-content:space-between;gap:12px}.v594-section-title small{color:#ff7a31;font-size:6px;font-weight:950;letter-spacing:.13em}.v594-section-title h3{margin:4px 0 0;font-size:15px}.v594-section-title>span{display:grid;place-items:center;min-width:28px;height:28px;border-radius:999px;background:#ff6a00;color:#fff;font-size:9px;font-weight:950}.v594-my-list{display:flex;gap:8px;margin-top:11px;overflow-x:auto;scrollbar-width:none}.v594-my-card{display:grid;grid-template-columns:46px minmax(150px,1fr) auto;gap:9px;align-items:center;flex:1 0 260px;max-width:390px;padding:8px;border:1px solid #3b2d25;border-radius:12px;background:#111;color:#fff;text-align:left}.v594-my-thumb,.v594-my-thumb .v550-media{width:46px!important;height:46px!important;min-height:46px!important;border-radius:9px!important}.v594-my-card span{color:#ff7d35;font-size:6px;font-weight:950;text-transform:uppercase}.v594-my-card b{display:block;margin:3px 0;font-size:9px}.v594-my-card small{display:block;overflow:hidden;color:#777;font-size:7px;text-overflow:ellipsis;white-space:nowrap}.v594-my-card strong{color:#ff6a00}.v594-mine-clear{display:flex;align-items:center;gap:8px;margin-top:10px;color:#777;font-size:8px}.v594-mine-clear b{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#16301f;color:#74d894}
.v594-radar{display:flex;gap:6px;padding:0 20px 13px;overflow-x:auto;scrollbar-width:none}.v594-radar span{display:flex;align-items:center;gap:5px;flex:0 0 auto;padding:7px 10px;border:1px solid #292929;border-radius:999px;background:#111;color:#777;font-size:7px;font-weight:850}.v594-radar b{color:#fff;font-size:10px}.v594-radar span.mine{border-color:#5a331d;background:#1c120d;color:#ff8a4a}.v594-radar span.mine b{color:#ff7a31}.v594-radar span.late b{color:#ff8a8a}.v594-radar span.done b{color:#72d68d}.v594-kanban-title{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding:0 20px 10px}.v594-kanban-title small{color:#666;font-size:6px;font-weight:950;letter-spacing:.12em}.v594-kanban-title h3{margin:4px 0 0;font-size:15px}.v594-kanban-title>span{color:#666;font-size:7px}.v594-kanban-scroll{overflow-x:auto;padding:0 20px 20px;scrollbar-width:thin;scrollbar-color:#4b2b1b #111}.v594-kanban{display:grid;grid-template-columns:repeat(5,minmax(260px,1fr));gap:9px;min-width:1360px}.v594-lane{align-self:start;min-height:220px;padding:10px;border:1px solid #292929;border-radius:15px;background:#101010}.v594-lane.has-mine{border-color:#54331f;box-shadow:inset 0 0 0 1px #ff6a000d}.v594-lane>header{display:flex;align-items:center;justify-content:space-between;padding:3px 3px 10px}.v594-lane>header>div{display:flex;align-items:center;gap:7px}.v594-lane>header i{width:7px;height:7px;border-radius:50%;background:#ff6a00}.v594-lane.stage-review>header i{background:#e6b85b}.v594-lane.stage-client>header i{background:#8e7cff}.v594-lane.stage-scheduled>header i{background:#6aa7ff}.v594-lane.stage-published>header i{background:#63cf83}.v594-lane>header span{color:#555;font-size:6px;font-weight:950}.v594-lane>header b{font-size:8px}.v594-lane>header>div:last-child strong{padding:4px 6px;border-radius:99px;background:#26150d;color:#ff7b32;font-size:5px;letter-spacing:.08em}.v594-lane>header em{display:grid;place-items:center;min-width:22px;height:22px;border-radius:999px;background:#1e1e1e;color:#888;font-size:7px;font-style:normal}.v594-lane-list{display:grid;gap:8px}.v594-empty-lane{display:grid;place-items:center;min-height:86px;border:1px dashed #292929;border-radius:11px;color:#505050}.v594-empty-lane span{font-size:16px}.v594-empty-lane small{font-size:7px}.v594-card{overflow:hidden;border:1px solid #2c2c2c;border-radius:13px;background:#151515;cursor:pointer}.v594-card.is-mine{border-color:#6a3b21;box-shadow:0 10px 24px #0004}.v594-card.is-late{border-color:#6e3434}.v594-card-cover{height:118px;overflow:hidden;background:#0d0d0d}.v594-card-cover .v550-media{width:100%!important;height:118px!important;min-height:118px!important;aspect-ratio:auto!important;border-radius:0!important}.v594-card-body{padding:10px}.v594-card-tags{display:flex;gap:5px;flex-wrap:wrap}.v594-card-tags span{padding:4px 6px;border-radius:99px;background:#202020;color:#777;font-size:5px;font-weight:850;text-transform:uppercase}.v594-card-body h3{margin:7px 0 9px;font-size:11px;line-height:1.35}.v594-card-next{padding:8px 9px;border-left:2px solid #ff6a00;background:#19120e}.v594-card-next small,.v594-card-next b,.v594-card-next span{display:block}.v594-card-next small{color:#ff7b32;font-size:5px;font-weight:950}.v594-card-next b{margin:3px 0;color:#ddd;font-size:8px;line-height:1.3}.v594-card-next span{color:#737373;font-size:6px}.v594-card.is-mine .v594-card-next span{color:#ff8b4e;font-weight:900}.v594-card footer{display:flex;align-items:center;justify-content:space-between;margin-top:9px}.v594-card footer em{color:#666;font-size:6px;font-style:normal}.v594-card footer b{color:#ff6a00;font-size:11px}
@media(max-width:760px){.v594-clienthub .top{padding:6px 13px!important}.v594-clienthub .top .ey{font-size:7px!important}.v594-client-head{padding:7px 0 10px}.v594-client-avatar{width:38px;height:38px}.v594-client-name h1{font-size:18px}.v594-client-live{display:none}.v594-workflow{border-radius:15px!important}.v594-work-head{align-items:flex-start;flex-direction:column;padding:16px 14px 12px}.v594-work-head h2{font-size:22px}.v594-work-head p{font-size:10px}.v594-head-actions{display:grid;width:100%;grid-template-columns:1fr 1.15fr}.v594-head-actions label,.v594-head-actions input,.v594-head-actions .btn{width:100%}.v594-quick{grid-template-columns:1.35fr 1fr;padding:10px 14px}.v594-quick button{min-height:43px}.v594-mine{margin:11px 14px;padding:13px}.v594-section-title h3{font-size:14px}.v594-my-card{flex-basis:250px}.v594-radar{padding:0 14px 11px}.v594-kanban-title{padding:0 14px 9px}.v594-kanban-title>span{display:none}.v594-kanban-scroll{padding:0 14px 16px;scroll-snap-type:x mandatory}.v594-kanban{display:flex;min-width:0;gap:9px}.v594-lane{flex:0 0 82vw;min-height:185px;scroll-snap-align:start}.v594-card-cover,.v594-card-cover .v550-media{height:140px!important;min-height:140px!important}.v594-empty-lane{min-height:72px}.v594-card-body h3{font-size:12px}.v594-card-next b{font-size:9px}}
`;
document.head.appendChild(v594Style);
// ===== FIM COLAB V5.94 =====


// ===== COLAB V5.95 — CORREÇÃO DE LOOP DA MARCA =====
officialBrandV555=function(){return `<img class="v595-brand-symbol" src="${COLAB_SYMBOL_V558}" alt="Colab">`};
applyOfficialBrandV555=function(){
  document.querySelectorAll(".logo").forEach(node=>{
    node.classList.add("v594-symbol-brand");
    if(!node.querySelector("img.v595-brand-symbol"))node.innerHTML=officialBrandV555();
  });
  document.querySelectorAll(".top .ey").forEach(node=>{
    let mark=node.querySelector(".v555-header-mark");
    if(!mark){
      node.insertAdjacentHTML("afterbegin",`<span class="v555-header-mark">${officialBrandV555()}</span>`);
    }else if(!mark.querySelector("img.v595-brand-symbol")){
      mark.innerHTML=officialBrandV555();
    }
  });
};
applyOfficialBrandV555();
// ===== FIM COLAB V5.95 =====

// ===== COLAB V5.96 — MAX PLUS / WORKFLOW PREMIUM REFINADO =====
clientHeaderV591=function(cid){
  let client=cl(cid)||{},services=(D.services||[]).filter(s=>s.client_id===cid&&s.active);
  return `<section class="v596-client-head">
    <button class="v596-back" data-v="clients" aria-label="Voltar aos clientes">←</button>
    <div class="v596-client-avatar">${E(client.initials||ini(client.name))}</div>
    <div class="v596-client-copy">
      <small>${E(client.segment||'CLIENTE COLAB')}</small>
      <div class="v596-client-line"><h1>${E(client.name||'Cliente')}</h1>${services.map(s=>`<span>${E(lab(s.service))}</span>`).join('')}</div>
    </div>
  </section>`
};

workflowMyCardV594=function(content){
  let work=workflowWorkV583(content.id),raw=workflowStageV583(work),
      next=workflowNextActionV591(content,raw),
      stage=workflowPremiumStageLabelV594(content),
      due=work?.internal_due_date?fmtDate(work.internal_due_date):'';
  return `<button class="v596-my-card" data-contentopen="${content.id}">
    <div class="v596-my-thumb">${socialAssetV550(content,true)}</div>
    <div class="v596-my-copy">
      <div class="v596-my-kicker"><span>${E(stage)}</span><em>COM VOCÊ</em></div>
      <h4>${E(content.title||'Conteúdo')}</h4>
      <div class="v596-my-action"><small>PRÓXIMA AÇÃO</small><b>${E(next)}</b></div>
      ${due?`<time>Prazo ${E(due)}</time>`:''}
    </div>
    <strong>→</strong>
  </button>`
};

workflowPremiumCardV594=function(content){
  let work=workflowWorkV583(content.id),raw=workflowStageV583(work),
      stage=workflowPremiumStageV594(raw),
      ownerId=workflowPremiumOwnerV594(content),
      owner=profile(ownerId)?.display_name||'Equipe',
      mine=ownerId===S.user?.id,
      next=workflowNextActionV591(content,raw),
      late=work?.internal_due_date&&work.internal_due_date<today()&&!['scheduled','published'].includes(raw),
      line=pillar(content.editorial_pillar_id)?.name||'Linha editorial';
  return `<article class="v596-card ${mine?'is-mine':''} ${late?'is-late':''}" data-contentopen="${content.id}">
    <div class="v596-card-cover">${socialAssetV550(content)}</div>
    <div class="v596-card-body">
      <div class="v596-card-tags"><span>${E(fmt(content.format||'undefined'))}</span><span>${E(line)}</span>${mine?'<em>COM VOCÊ</em>':''}</div>
      <h3>${E(content.title||'Conteúdo')}</h3>
      <div class="v596-card-next"><small>PRÓXIMA AÇÃO</small><b>${E(next)}</b><span>${E(owner)}${work?.internal_due_date?' · '+fmtDate(work.internal_due_date):''}</span></div>
      <footer><span>${late?'ATRASADO':E(workflowPremiumStageLabelV594(content))}</span><b>→</b></footer>
    </div>
  </article>`
};

workflowPremiumBoardV594=function(items){
  let groups=workflowPremiumGroupsV594();
  return `<div class="v596-kanban-scroll"><div class="v596-kanban">${groups.map(([key,label,num])=>{
    let rows=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))===key),
        mine=rows.filter(c=>workflowPremiumOwnerV594(c)===S.user?.id).length;
    return `<section class="v596-lane stage-${key} ${mine?'has-mine':''}">
      <header>
        <div><i></i><span>${num}</span><b>${E(label)}</b></div>
        <div>${mine?`<strong>${mine} COM VOCÊ</strong>`:''}<em>${rows.length}</em></div>
      </header>
      <div class="v596-lane-list">${rows.map(workflowPremiumCardV594).join('')||'<div class="v596-empty-lane"><span>○</span><small>Nenhum conteúdo</small></div>'}</div>
    </section>`
  }).join('')}</div></div>`
};

clientWorkflowPaneV586=function(cid){
  let client=cl(cid)||{},
      items=clientWorkflowItemsV586(cid),
      active=clientHubTabsV563[cid]==='workflow',
      myItems=items.filter(c=>{
        let s=workflowStageV583(workflowWorkV583(c.id));
        return workflowPremiumOwnerV594(c)===S.user?.id&&!['scheduled','published'].includes(s)
      }),
      clientItems=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))==='client'),
      late=items.filter(c=>{
        let w=workflowWorkV583(c.id),s=workflowStageV583(w);
        return w?.internal_due_date&&w.internal_due_date<today()&&!['scheduled','published'].includes(s)
      }),
      published=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))==='published').length,
      monthLabel=typeof portalMonthNameV428==='function'?portalMonthNameV428(contentMonth):contentMonth;
  return `<section class="panel v5-hub-wide v596-workflow" id="workflow" ${active?'data-v563-active':''}>
    <div class="v596-work-head">
      <div>
        <small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small>
        <div class="v596-month-line">
          <h2>${E(monthLabel)}</h2>
          <label><span>ALTERAR MÊS</span><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label>
        </div>
      </div>
      <p>Seu painel de produção: o que está com você, o que vem depois e onde cada conteúdo está.</p>
    </div>

    <nav class="v596-quick">
      <button class="primary" data-v591-new-idea="${E(cid)}"><b>＋</b><span><strong>Criar conteúdo</strong><small>Nova pauta estruturada</small></span></button>
      <button data-client-tab="ideas"><b>✦</b><span><strong>Ideias</strong><small>Banco editorial</small></span></button>
      <button data-client-tab="recording"><b>●</b><span><strong>Para gravar</strong><small>Sugestões da cliente</small></span></button>
      <button data-taskquick-client="${E(cid)}"><b>✓</b><span><strong>Nova demanda</strong><small>Tarefa rápida</small></span></button>
    </nav>

    <section class="v596-mine">
      <div class="v596-section-title">
        <div><small>MINHA VEZ</small><h3>${myItems.length?`${myItems.length} ${myItems.length===1?'conteúdo precisa':'conteúdos precisam'} de você`:'Nada pendente com você agora'}</h3></div>
        <span>${myItems.length}</span>
      </div>
      ${myItems.length?`<div class="v596-my-list">${myItems.map(workflowMyCardV594).join('')}</div>`:'<div class="v596-mine-clear"><b>✓</b><span>Quando uma próxima ação for sua, ela aparece aqui.</span></div>'}
    </section>

    <div class="v596-radar">
      <span><b>${items.length}</b> no mês</span>
      <span class="mine"><b>${myItems.length}</b> comigo</span>
      <span><b>${clientItems.length}</b> com cliente</span>
      <span class="late"><b>${late.length}</b> atrasado${late.length===1?'':'s'}</span>
      <span class="done"><b>${published}</b> publicados</span>
    </div>

    <div class="v596-kanban-title">
      <div><small>PROCESSO</small><h3>Kanban do mês</h3></div>
      <span>Produção → Revisão → Cliente → Programado → Publicado</span>
    </div>
    ${workflowPremiumBoardV594(items)}
  </section>`
};

const v596Style=document.createElement('style');
v596Style.textContent=`
.v594-clienthub .top{height:38px!important;min-height:38px!important;margin:0 0 8px!important;padding:0!important}
.v594-clienthub .top h1{display:none!important}
.v594-clienthub .top .ey{font-size:0!important;letter-spacing:0!important}
.v594-clienthub .top .ey .v555-header-mark{width:32px!important;height:32px!important;flex:0 0 32px!important}
.v594-clienthub .top .ey .v555-header-mark img{width:32px!important;height:32px!important}
.v594-clienthub .topactions{align-self:center!important}
.v594-clienthub .main{padding-top:14px!important}
.v596-client-head{display:flex;align-items:center;gap:10px;padding:6px 0 11px;border-bottom:1px solid #242424}
.v596-back{display:grid;place-items:center;width:34px;height:34px;border:1px solid #303030;border-radius:11px;background:#111;color:#b7b7b7;font-size:15px}
.v596-client-avatar{display:grid;place-items:center;width:40px;height:40px;border-radius:13px;background:linear-gradient(145deg,#ff7a22,#ed5200);color:#fff;font-size:12px;font-weight:950;box-shadow:0 10px 25px #ff650022}
.v596-client-copy{min-width:0;flex:1}.v596-client-copy>small{display:block;color:#696969;font-size:6px;font-weight:950;letter-spacing:.13em;text-transform:uppercase}
.v596-client-line{display:flex;align-items:center;gap:8px;min-width:0;margin-top:2px}.v596-client-line h1{margin:0;font-size:19px;line-height:1;white-space:nowrap}
.v596-client-line span{padding:4px 7px;border-radius:999px;background:#21140d;color:#ff8745;font-size:6px;font-weight:900;white-space:nowrap}

.v596-workflow{padding:0!important;overflow:hidden!important;border:1px solid #2b2b2b!important;border-radius:20px!important;background:#0e0e0e!important}
.v596-work-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:end;padding:17px 20px 14px;border-bottom:1px solid #242424;background:radial-gradient(circle at 96% 0,rgba(255,106,0,.12),transparent 33%),linear-gradient(145deg,#17110e,#0f0f0f 64%)}
.v596-work-head>div>small{color:#ff7830!important}.v596-month-line{display:flex;align-items:flex-end;gap:12px;margin-top:4px}.v596-month-line h2{margin:0;font-size:25px;line-height:1;text-transform:capitalize}
.v596-month-line label{display:grid;gap:3px}.v596-month-line label span{color:#636363;font-size:5px;font-weight:950}.v596-month-line input{min-height:32px;padding:5px 8px;font-size:8px}
.v596-work-head>p{max-width:390px;margin:0;color:#777;font-size:8px;line-height:1.45;text-align:right}

.v596-quick{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:7px;padding:11px 20px;border-bottom:1px solid #242424}
.v596-quick button{display:flex;align-items:center;gap:9px;min-height:50px;padding:9px 11px;border:1px solid #2c2c2c;border-radius:13px;background:#121212;color:#c0c0c0;text-align:left}
.v596-quick button.primary{border-color:#ff6a00;background:linear-gradient(135deg,#ff700e,#f35700);color:#fff;box-shadow:0 12px 30px #ff650020}
.v596-quick button>b{display:grid;place-items:center;width:28px;height:28px;flex:0 0 28px;border-radius:9px;background:#1d1d1d;color:#ff7b32;font-size:11px}
.v596-quick button.primary>b{background:#ffffff1b;color:#fff}.v596-quick button span{min-width:0}.v596-quick strong,.v596-quick small{display:block}
.v596-quick strong{font-size:8px}.v596-quick small{margin-top:2px;color:#656565;font-size:6px}.v596-quick button.primary small{color:#ffd4bc}

.v596-mine{margin:14px 20px 10px;padding:15px;border:1px solid #5a351f;border-radius:17px;background:radial-gradient(circle at 92% 0,#ff6a0016,transparent 35%),linear-gradient(115deg,#1d130e,#111 58%)}
.v596-section-title{display:flex;align-items:center;justify-content:space-between;gap:12px}.v596-section-title small{color:#ff7a31;font-size:6px;font-weight:950;letter-spacing:.13em}
.v596-section-title h3{margin:4px 0 0;font-size:15px}.v596-section-title>span{display:grid;place-items:center;min-width:28px;height:28px;border-radius:999px;background:#ff6a00;color:#fff;font-size:9px;font-weight:950}
.v596-my-list{display:flex;gap:9px;margin-top:11px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:1px}
.v596-my-card{display:grid;grid-template-columns:68px minmax(0,1fr) auto;gap:11px;align-items:center;flex:0 0 min(420px,88%);min-height:105px;padding:10px;border:1px solid #443126;border-radius:14px;background:#111;color:#fff;text-align:left;scroll-snap-align:start}
.v596-my-thumb,.v596-my-thumb .v550-media{width:68px!important;height:82px!important;min-height:82px!important;border-radius:10px!important}.v596-my-thumb{overflow:hidden;background:#161616}
.v596-my-copy{min-width:0}.v596-my-kicker{display:flex;align-items:center;gap:6px}.v596-my-kicker span,.v596-my-kicker em{font-size:5px;font-weight:950;text-transform:uppercase}
.v596-my-kicker span{color:#ff803a}.v596-my-kicker em{padding:3px 5px;border-radius:99px;background:#2b180e;color:#ff8a49;font-style:normal}
.v596-my-copy h4{margin:5px 0 7px;font-size:10px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.v596-my-action{padding-left:8px;border-left:2px solid #ff6a00}.v596-my-action small,.v596-my-action b{display:block}.v596-my-action small{color:#ff7a31;font-size:5px;font-weight:950}.v596-my-action b{margin-top:2px;font-size:8px;line-height:1.3}
.v596-my-copy time{display:block;margin-top:5px;color:#686868;font-size:6px}.v596-my-card>strong{color:#ff6a00;font-size:16px}.v596-mine-clear{display:flex;align-items:center;gap:8px;margin-top:10px;color:#777;font-size:8px}

.v596-radar{display:flex;gap:6px;padding:0 20px 12px;overflow-x:auto;scrollbar-width:none}.v596-radar span{display:flex;align-items:center;gap:5px;flex:0 0 auto;padding:6px 9px;border:1px solid #2b2b2b;border-radius:999px;background:#111;color:#747474;font-size:6px;font-weight:850}
.v596-radar b{color:#fff;font-size:9px}.v596-radar .mine{border-color:#5a351f;background:#1c120d;color:#ff8b4c}.v596-radar .mine b{color:#ff7a31}.v596-radar .late b{color:#ff8a8a}.v596-radar .done b{color:#72d68d}
.v596-kanban-title{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding:0 20px 9px}.v596-kanban-title small{color:#666;font-size:6px;font-weight:950;letter-spacing:.12em}.v596-kanban-title h3{margin:4px 0 0;font-size:15px}.v596-kanban-title>span{color:#666;font-size:6px}

.v596-kanban-scroll{overflow-x:auto;padding:0 20px 18px;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:#4b2b1b #111}
.v596-kanban{display:grid;grid-template-columns:repeat(5,minmax(260px,1fr));gap:9px;min-width:1360px}
.v596-lane{align-self:start;padding:10px;border:1px solid #292929;border-radius:15px;background:#101010;scroll-snap-align:start}
.v596-lane.has-mine{border-color:#57351f;box-shadow:inset 0 0 0 1px #ff6a000d}.v596-lane>header{display:flex;align-items:center;justify-content:space-between;padding:3px 3px 9px}
.v596-lane>header>div{display:flex;align-items:center;gap:7px}.v596-lane>header i{width:7px;height:7px;border-radius:50%;background:#ff6a00}.v596-lane.stage-review>header i{background:#e6b85b}.v596-lane.stage-client>header i{background:#8e7cff}.v596-lane.stage-scheduled>header i{background:#6aa7ff}.v596-lane.stage-published>header i{background:#63cf83}
.v596-lane>header span{color:#555;font-size:6px;font-weight:950}.v596-lane>header b{font-size:8px}.v596-lane>header strong{padding:4px 6px;border-radius:99px;background:#26150d;color:#ff7b32;font-size:5px}.v596-lane>header em{display:grid;place-items:center;min-width:22px;height:22px;border-radius:99px;background:#1e1e1e;color:#888;font-size:7px;font-style:normal}
.v596-lane-list{display:grid;gap:8px}.v596-empty-lane{display:flex;align-items:center;justify-content:center;gap:6px;min-height:54px;border:1px dashed #292929;border-radius:11px;color:#505050}.v596-empty-lane span{font-size:14px}.v596-empty-lane small{font-size:6px}

.v596-card{overflow:hidden;border:1px solid #2c2c2c;border-radius:13px;background:#151515;cursor:pointer}.v596-card.is-mine{border-color:#6a3b21;box-shadow:0 10px 24px #0004}.v596-card.is-late{border-color:#6e3434}
.v596-card-cover{height:126px;overflow:hidden;background:#0d0d0d}.v596-card-cover .v550-media{width:100%!important;height:126px!important;min-height:126px!important;aspect-ratio:auto!important;border-radius:0!important}
.v596-card-body{padding:10px}.v596-card-tags{display:flex;gap:5px;flex-wrap:wrap}.v596-card-tags span,.v596-card-tags em{padding:4px 6px;border-radius:99px;font-size:5px;font-weight:850;text-transform:uppercase}.v596-card-tags span{background:#202020;color:#777}.v596-card-tags em{background:#2a170d;color:#ff8847;font-style:normal}
.v596-card-body h3{margin:7px 0 9px;font-size:11px;line-height:1.35}.v596-card-next{padding:8px 9px;border-left:2px solid #ff6a00;background:#19120e}.v596-card-next small,.v596-card-next b,.v596-card-next span{display:block}.v596-card-next small{color:#ff7b32;font-size:5px;font-weight:950}.v596-card-next b{margin:3px 0;color:#ddd;font-size:8px;line-height:1.3}.v596-card-next span{color:#737373;font-size:6px}
.v596-card footer{display:flex;align-items:center;justify-content:space-between;margin-top:9px}.v596-card footer span{color:#666;font-size:6px}.v596-card footer b{color:#ff6a00;font-size:11px}

@media(max-width:760px){
  .v594-clienthub .main{padding-top:8px!important}.v594-clienthub .top{height:34px!important;min-height:34px!important;margin-bottom:4px!important}.v594-clienthub .top .ey .v555-header-mark{width:28px!important;height:28px!important;flex-basis:28px!important}.v594-clienthub .top .ey .v555-header-mark img{width:28px!important;height:28px!important}
  .v596-client-head{padding:5px 0 8px}.v596-client-avatar{width:36px;height:36px;border-radius:11px}.v596-client-line h1{font-size:17px}.v596-client-line span{font-size:5px}.v596-workflow{border-radius:15px!important}
  .v596-work-head{grid-template-columns:1fr;padding:14px 13px 11px}.v596-month-line{align-items:center;justify-content:space-between}.v596-month-line h2{font-size:22px}.v596-month-line label{min-width:126px}.v596-work-head>p{display:none}
  .v596-quick{grid-template-columns:1.35fr 1fr;padding:9px 13px}.v596-quick button{min-height:48px}.v596-quick button:nth-child(1){grid-row:span 1}.v596-quick strong{font-size:8px}.v596-quick small{font-size:5px}
  .v596-mine{margin:10px 13px 9px;padding:13px}.v596-section-title h3{font-size:13px}.v596-my-card{flex-basis:88%;grid-template-columns:64px minmax(0,1fr) auto;min-height:108px}.v596-my-thumb,.v596-my-thumb .v550-media{width:64px!important;height:86px!important;min-height:86px!important}.v596-my-copy h4{font-size:10px}.v596-my-action b{font-size:8px}
  .v596-radar{padding:0 13px 10px}.v596-kanban-title{padding:0 13px 8px}.v596-kanban-title>span{display:none}.v596-kanban-scroll{padding:0 13px 15px;scroll-snap-type:x mandatory}.v596-kanban{display:flex;min-width:0;gap:9px}.v596-lane{flex:0 0 86vw}.v596-card-cover,.v596-card-cover .v550-media{height:148px!important;min-height:148px!important}.v596-empty-lane{min-height:50px}.v596-card-body h3{font-size:12px}.v596-card-next b{font-size:9px}
}
`;
document.head.appendChild(v596Style);
// ===== FIM COLAB V5.96 =====


// ===== COLAB V5.97 — LEGIBILIDADE MOBILE + SÍMBOLO LIMPO =====
function colabPremiumSymbolV597(){return `<svg class="v597-symbol" viewBox="0 0 64 48" role="img" aria-label="Colab" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="24" r="15.5" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-dasharray="76 22" transform="rotate(34 22 24)"/><circle cx="42" cy="25" r="13" fill="none" stroke="#ff6a00" stroke-width="6" stroke-linecap="round" stroke-dasharray="62 20" transform="rotate(214 42 25)"/></svg>`}
officialBrandV555=function(){return colabPremiumSymbolV597()};
applyOfficialBrandV555=function(){
  document.querySelectorAll('.logo').forEach(node=>{
    node.classList.add('v597-brand');
    if(!node.querySelector('svg.v597-symbol')) node.innerHTML=colabPremiumSymbolV597();
  });
  document.querySelectorAll('.top .ey').forEach(node=>{
    let mark=node.querySelector('.v555-header-mark');
    if(!mark){node.insertAdjacentHTML('afterbegin',`<span class="v555-header-mark">${colabPremiumSymbolV597()}</span>`)}
    else if(!mark.querySelector('svg.v597-symbol')) mark.innerHTML=colabPremiumSymbolV597();
  });
};
applyOfficialBrandV555();
const v597Style=document.createElement('style');v597Style.textContent=`
.v597-brand{background:transparent!important;overflow:visible!important}.v597-symbol{display:block;width:100%;height:100%;overflow:visible}
.top .v555-header-mark{display:grid!important;place-items:center!important;background:transparent!important;overflow:visible!important}
.top .v555-header-mark .v597-symbol{width:42px!important;height:32px!important}
.side .v597-brand .v597-symbol{width:58px!important;height:44px!important}
@media(max-width:760px){
  /* logo limpo e sem repetição na barra inferior */
  .side .logo.v597-brand{display:none!important}
  .v594-clienthub .top .ey{font-size:0!important;gap:0!important}
  .v594-clienthub .top .ey .v555-header-mark{width:46px!important;height:36px!important;flex:0 0 46px!important}
  .v594-clienthub .top .ey .v555-header-mark .v597-symbol{width:46px!important;height:36px!important}

  /* abas da cliente */
  .v591-client-nav{padding:10px 13px!important;margin-bottom:14px!important;gap:6px!important}
  .v591-client-nav button{min-width:86px!important;min-height:46px!important;padding:0 12px!important;font-size:12px!important;letter-spacing:0!important}

  /* cabeçalho da cliente */
  .v596-client-head{padding:8px 0 12px!important;gap:10px!important}
  .v596-client-avatar{width:42px!important;height:42px!important;font-size:15px!important}
  .v596-client-line small{font-size:9px!important;letter-spacing:.14em!important}
  .v596-client-line h1{font-size:22px!important;line-height:1.05!important}
  .v596-client-line span{font-size:9px!important;padding:5px 9px!important}

  /* bloco principal */
  .v596-work-head{padding:18px 16px 15px!important}
  .v596-work-head .ey{font-size:10px!important;letter-spacing:.16em!important}
  .v596-month-line{gap:12px!important}
  .v596-month-line h2{font-size:30px!important;line-height:1!important}
  .v596-month-line label span{font-size:9px!important}
  .v596-month-line input{min-height:46px!important;font-size:14px!important}

  /* comandos rápidos */
  .v596-quick{padding:12px 14px!important;gap:9px!important}
  .v596-quick button{min-height:62px!important;padding:12px!important;border-radius:14px!important}
  .v596-quick button b{width:34px!important;height:34px!important;font-size:15px!important}
  .v596-quick strong{font-size:14px!important;line-height:1.1!important}
  .v596-quick small{margin-top:4px!important;font-size:9px!important;line-height:1.2!important}

  /* Minha vez */
  .v596-mine{margin:14px!important;padding:16px!important;border-radius:18px!important}
  .v596-section-title small{font-size:9px!important;letter-spacing:.14em!important}
  .v596-section-title h3{font-size:20px!important;line-height:1.15!important;margin-top:6px!important}
  .v596-section-title>span{min-width:36px!important;height:36px!important;font-size:14px!important}
  .v596-my-list{gap:10px!important;margin-top:14px!important}
  .v596-my-card{flex:0 0 92%!important;grid-template-columns:72px minmax(0,1fr) 26px!important;gap:12px!important;min-height:132px!important;padding:12px!important;border-radius:15px!important}
  .v596-my-thumb,.v596-my-thumb .v550-media{width:72px!important;height:100px!important;min-height:100px!important;border-radius:11px!important}
  .v596-my-copy>span,.v596-my-copy>em{font-size:9px!important;padding:4px 7px!important}
  .v596-my-copy h4{font-size:15px!important;line-height:1.3!important;margin:8px 0!important;white-space:normal!important}
  .v596-my-action small{font-size:8px!important}
  .v596-my-action b{font-size:13px!important;line-height:1.35!important;margin-top:4px!important}
  .v596-my-copy time{font-size:9px!important;margin-top:7px!important}
  .v596-my-card>strong{font-size:22px!important}
  .v596-mine-clear{font-size:11px!important}

  /* indicadores */
  .v596-radar{gap:7px!important;padding:0 14px 14px!important}
  .v596-radar span{padding:8px 11px!important;font-size:10px!important}
  .v596-radar b{font-size:14px!important}

  /* kanban */
  .v596-kanban-title{padding:2px 14px 11px!important}
  .v596-kanban-title small{font-size:9px!important}
  .v596-kanban-title h3{font-size:23px!important;margin-top:5px!important}
  .v596-kanban-scroll{padding:0 14px 20px!important}
  .v596-kanban{gap:11px!important}
  .v596-lane{flex:0 0 91vw!important;padding:12px!important;border-radius:16px!important}
  .v596-lane>header{padding:4px 4px 12px!important}
  .v596-lane>header i{width:9px!important;height:9px!important}
  .v596-lane>header span{font-size:9px!important}
  .v596-lane>header b{font-size:13px!important}
  .v596-lane>header strong{font-size:8px!important;padding:5px 7px!important}
  .v596-lane>header em{min-width:28px!important;height:28px!important;font-size:10px!important}
  .v596-empty-lane{min-height:64px!important}.v596-empty-lane small{font-size:10px!important}
  .v596-card-cover,.v596-card-cover .v550-media{height:118px!important;min-height:118px!important}
  .v596-card-body{padding:13px!important}
  .v596-card-tags span,.v596-card-tags em{font-size:9px!important;padding:5px 7px!important}
  .v596-card-body h3{font-size:16px!important;line-height:1.35!important;margin:10px 0 12px!important}
  .v596-card-next{padding:10px 11px!important}
  .v596-card-next small{font-size:8px!important}
  .v596-card-next b{font-size:13px!important;line-height:1.35!important;margin:4px 0!important}
  .v596-card-next span{font-size:9px!important}
  .v596-card footer span{font-size:9px!important}.v596-card footer b{font-size:16px!important}
}
`;
document.head.appendChild(v597Style);
// ===== FIM COLAB V5.97 =====
// ===== COLAB V5.98 — MARCA OFICIAL + CABEÇALHO LIMPO + COMANDOS COERENTES =====
function colabOfficialSymbolV598(){return `<img class="v598-official-symbol" src="${COLAB_SYMBOL_V558}" alt="Colab">`}
officialBrandV555=function(){return colabOfficialSymbolV598()};
applyOfficialBrandV555=function(){
  document.querySelectorAll('.logo').forEach(node=>{
    node.classList.add('v598-brand');
    if(!node.querySelector('img.v598-official-symbol')) node.innerHTML=colabOfficialSymbolV598();
  });
  document.querySelectorAll('.top .ey').forEach(node=>{
    let mark=node.querySelector('.v555-header-mark');
    if(!mark){
      node.insertAdjacentHTML('afterbegin',`<span class="v555-header-mark">${colabOfficialSymbolV598()}</span>`);
    }else if(!mark.querySelector('img.v598-official-symbol')){
      mark.innerHTML=colabOfficialSymbolV598();
    }
  });
};
applyOfficialBrandV555();

clientWorkflowPaneV586=function(cid){
  let client=cl(cid)||{},
      items=clientWorkflowItemsV586(cid),
      active=clientHubTabsV563[cid]==='workflow',
      myItems=items.filter(c=>{
        let s=workflowStageV583(workflowWorkV583(c.id));
        return workflowPremiumOwnerV594(c)===S.user?.id&&!['scheduled','published'].includes(s)
      }),
      clientItems=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))==='client'),
      late=items.filter(c=>{
        let w=workflowWorkV583(c.id),s=workflowStageV583(w);
        return w?.internal_due_date&&w.internal_due_date<today()&&!['scheduled','published'].includes(s)
      }),
      published=items.filter(c=>workflowPremiumStageV594(workflowStageV583(workflowWorkV583(c.id)))==='published').length;
  return `<section class="panel v5-hub-wide v596-workflow v598-workflow" id="workflow" ${active?'data-v563-active':''}>
    <div class="v598-work-head">
      <div>
        <small class="ey">WORKFLOW · ${E(client.name||'CLIENTE')}</small>
        <h2>Conteúdos do mês</h2>
      </div>
      <label class="v598-month-select"><span>MÊS</span><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label>
    </div>

    <nav class="v598-quick" aria-label="Comandos rápidos">
      <button class="primary" data-v591-new-idea="${E(cid)}"><span><strong>+ Criar conteúdo</strong><small>Nova pauta estruturada</small></span><i>→</i></button>
      <button data-client-tab="ideas"><span><strong>Ideias</strong><small>Banco editorial</small></span><i>→</i></button>
      <button data-client-tab="recording"><span><strong>Para gravar</strong><small>Sugestões da cliente</small></span><i>→</i></button>
      <button data-taskquick-client="${E(cid)}"><span><strong>Nova demanda</strong><small>Tarefa rápida</small></span><i>→</i></button>
    </nav>

    <section class="v596-mine">
      <div class="v596-section-title">
        <div><small>MINHA VEZ</small><h3>${myItems.length?`${myItems.length} ${myItems.length===1?'conteúdo precisa':'conteúdos precisam'} de você`:'Nada pendente com você agora'}</h3></div>
        <span>${myItems.length}</span>
      </div>
      ${myItems.length?`<div class="v596-my-list">${myItems.map(workflowMyCardV594).join('')}</div>`:'<div class="v596-mine-clear"><b>✓</b><span>Quando uma próxima ação for sua, ela aparece aqui.</span></div>'}
    </section>

    <div class="v596-radar">
      <span><b>${items.length}</b> no mês</span>
      <span class="mine"><b>${myItems.length}</b> comigo</span>
      <span><b>${clientItems.length}</b> com cliente</span>
      <span class="late"><b>${late.length}</b> atrasado${late.length===1?'':'s'}</span>
      <span class="done"><b>${published}</b> publicados</span>
    </div>

    <div class="v596-kanban-title">
      <div><small>PROCESSO</small><h3>Kanban do mês</h3></div>
      <span>Produção → Revisão → Cliente → Programado → Publicado</span>
    </div>
    ${workflowPremiumBoardV594(items)}
  </section>`
};

const v598Style=document.createElement('style');v598Style.textContent=`
/* marca oficial: usa exatamente o símbolo já aprovado no kit da COLAB */
.v598-brand{display:grid!important;place-items:center!important;background:transparent!important;overflow:visible!important}
.v598-official-symbol{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important}
.top .v555-header-mark{display:grid!important;place-items:center!important;width:38px!important;height:30px!important;flex:0 0 38px!important;background:transparent!important;overflow:visible!important}
.top .v555-header-mark .v598-official-symbol{width:38px!important;height:30px!important}
.top .ey{gap:9px!important;font-size:9px!important;letter-spacing:.15em!important}
.side .v598-brand{width:54px!important;height:44px!important}.side .v598-brand .v598-official-symbol{width:54px!important;height:44px!important}
.v594-clienthub .top .ey{font-size:0!important;letter-spacing:0!important}.v594-clienthub .top .v555-header-mark{width:40px!important;height:32px!important;flex-basis:40px!important}.v594-clienthub .top .v555-header-mark .v598-official-symbol{width:40px!important;height:32px!important}

/* mês aparece uma única vez: no seletor */
.v598-work-head{display:flex;align-items:end;justify-content:space-between;gap:18px;padding:19px 20px 16px;border-bottom:1px solid #242424;background:radial-gradient(circle at 96% 0,rgba(255,106,0,.12),transparent 34%),linear-gradient(145deg,#17110e,#0f0f0f 64%)}
.v598-work-head .ey{color:#ff7830!important}.v598-work-head h2{margin:7px 0 0;font-size:26px;line-height:1.05}
.v598-month-select{display:grid;gap:5px;min-width:180px}.v598-month-select span{color:#6f6f6f;font-size:7px;font-weight:950;letter-spacing:.12em}.v598-month-select input{min-height:40px;font-size:11px}

/* comandos rápidos: mesma linguagem visual, sem coleção de ícones aleatórios */
.v598-quick{display:grid;grid-template-columns:1.35fr repeat(3,1fr);gap:8px;padding:12px 20px;border-bottom:1px solid #242424}
.v598-quick button{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:58px;padding:12px 14px;border:1px solid #303030;border-radius:14px;background:#121212;color:#c7c7c7;text-align:left}
.v598-quick button.primary{border-color:#ff6a00;background:linear-gradient(135deg,#ff700e,#f35700);color:#fff;box-shadow:0 12px 30px #ff650020}
.v598-quick button span{min-width:0}.v598-quick strong,.v598-quick small{display:block}.v598-quick strong{font-size:11px;line-height:1.15}.v598-quick small{margin-top:4px;color:#6d6d6d;font-size:7px}.v598-quick button.primary small{color:#ffd8c1}
.v598-quick i{display:grid;place-items:center;width:28px;height:28px;flex:0 0 28px;border-radius:999px;background:#1d1d1d;color:#ff7b32;font-size:12px;font-style:normal}.v598-quick button.primary i{background:#ffffff1b;color:#fff}

@media(max-width:760px){
  .top .v555-header-mark{width:34px!important;height:27px!important;flex-basis:34px!important}.top .v555-header-mark .v598-official-symbol{width:34px!important;height:27px!important}
  .top .ey{font-size:8px!important;gap:7px!important}.v594-clienthub .top .ey{font-size:0!important}
  .side .logo.v598-brand{display:none!important}
  .v598-work-head{align-items:flex-start;flex-direction:column;padding:18px 16px 15px!important;gap:14px!important}.v598-work-head .ey{font-size:10px!important;letter-spacing:.15em!important}.v598-work-head h2{font-size:28px!important;margin-top:7px!important}
  .v598-month-select{width:100%;min-width:0}.v598-month-select span{font-size:9px!important}.v598-month-select input{width:100%;min-height:48px!important;font-size:15px!important}
  .v598-quick{grid-template-columns:1fr 1fr;padding:12px 14px!important;gap:9px!important}.v598-quick button{min-height:72px!important;padding:14px!important}.v598-quick strong{font-size:15px!important}.v598-quick small{font-size:10px!important;line-height:1.2!important}.v598-quick i{width:32px;height:32px;flex-basis:32px;font-size:15px!important}
}
`;
document.head.appendChild(v598Style);
// ===== FIM COLAB V5.98 =====


// ===== COLAB V5.98 — HIERARQUIA LIMPA + MARCA OFICIAL + FINANCEIRO MENSAL =====
// Recupera o símbolo oficial já existente no app, sem redesenhar a marca.
officialBrandV555=function(){return `<img class="v598-brand-symbol" src="${COLAB_SYMBOL_V558}" alt="Colab">`};
applyOfficialBrandV555=function(){
  document.querySelectorAll('.logo').forEach(node=>{
    node.classList.add('v598-brand');
    if(!node.querySelector('img.v598-brand-symbol')) node.innerHTML=officialBrandV555();
  });
  document.querySelectorAll('.top .ey').forEach(node=>{
    let mark=node.querySelector('.v555-header-mark');
    if(!mark){node.insertAdjacentHTML('afterbegin',`<span class="v555-header-mark">${officialBrandV555()}</span>`)}
    else if(!mark.querySelector('img.v598-brand-symbol')) mark.innerHTML=officialBrandV555();
  });
};
applyOfficialBrandV555();

// O mês aparece uma única vez e os atalhos usam a mesma linguagem visual.
const _clientWorkflowPaneV598Base=clientWorkflowPaneV586;
clientWorkflowPaneV586=function(cid){
  let html=_clientWorkflowPaneV598Base(cid);
  html=html.replace(/<div class="v596-month-line">[\s\S]*?<\/div>/,
    `<div class="v598-month-bar"><div><h2>Conteúdos do mês</h2><small>Produção editorial organizada por etapa</small></div><label><span>MÊS</span><input id="clientWorkflowMonthV586" type="month" value="${E(contentMonth)}"></label></div>`
  );
  html=html.replace(/<nav class="v596-quick">[\s\S]*?<\/nav>/,
    `<nav class="v596-quick v598-quick">
      <button class="primary" data-v591-new-idea="${E(cid)}"><span><strong>Criar conteúdo</strong><small>Nova pauta estruturada</small></span><i>→</i></button>
      <button data-client-tab="ideas"><span><strong>Ideias</strong><small>Banco editorial</small></span><i>→</i></button>
      <button data-client-tab="recording"><span><strong>Para gravar</strong><small>Sugestões da cliente</small></span><i>→</i></button>
      <button data-taskquick-client="${E(cid)}"><span><strong>Nova demanda</strong><small>Tarefa rápida</small></span><i>→</i></button>
    </nav>`
  );
  return html
};

// No painel inicial, "A receber" e "A pagar" respeitam somente o mês corrente.
const _homePageV598Base=homePage;
homePage=function(){
  let html=_homePageV598Base(),month=today().slice(0,7),receive=typeof monthlyReceivableV553==='function'?monthlyReceivableV553(month):receivableOpenV5(),pay=typeof monthlyPayableV553==='function'?monthlyPayableV553(month):payableOpenV5();
  html=html.replace(/<span>A RECEBER<\/span><b>[^<]*<\/b>/,`<span>A RECEBER NO MÊS</span><b>${money(receive)}</b>`);
  html=html.replace(/<span>A PAGAR<\/span><b>[^<]*<\/b>/,`<span>A PAGAR NO MÊS</span><b>${money(pay)}</b>`);
  return html
};

const v598Style2=document.createElement('style');v598Style2.textContent=`\n/* símbolo oficial, proporcional */
.v598-brand{background:transparent!important;overflow:visible!important}.v598-brand-symbol{display:block;width:100%;height:100%;object-fit:contain!important;object-position:center!important}
.top .v555-header-mark{display:grid!important;place-items:center!important;width:38px!important;height:30px!important;flex:0 0 38px!important;overflow:hidden!important;background:transparent!important}
.top .v555-header-mark .v598-brand-symbol{width:38px!important;height:30px!important}
.side .v598-brand .v598-brand-symbol{width:54px!important;height:42px!important}

/* mês sem repetição */
.v598-month-bar{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin-top:8px}.v598-month-bar h2{margin:0;font-size:24px;line-height:1}.v598-month-bar>div>small{display:block;margin-top:5px;color:#6f6f6f;font-size:8px}.v598-month-bar label{display:grid;gap:4px;min-width:170px}.v598-month-bar label span{color:#6f6f6f;font-size:6px;font-weight:950;letter-spacing:.1em}.v598-month-bar input{min-height:38px}

/* comandos rápidos: uma linguagem só */
.v598-quick button{justify-content:space-between!important}.v598-quick button>b{display:none!important}.v598-quick button>span{display:block;min-width:0}.v598-quick button>i{display:grid;place-items:center;width:28px;height:28px;flex:0 0 28px;border-radius:50%;background:#1d1d1d;color:#ff7430;font-size:13px;font-style:normal;font-weight:900}.v598-quick button.primary>i{background:#ffffff20;color:#fff}.v598-quick button.primary{grid-column:auto!important}

@media(max-width:760px){
  .side .logo.v598-brand{display:none!important}
  .top .v555-header-mark{width:36px!important;height:28px!important;flex-basis:36px!important}.top .v555-header-mark .v598-brand-symbol{width:36px!important;height:28px!important}
  .top .ey{gap:8px!important;font-size:9px!important;letter-spacing:.13em!important}
  .v594-clienthub .top .ey{font-size:0!important}
  .v594-clienthub .top .ey .v555-header-mark{width:40px!important;height:31px!important;flex-basis:40px!important}.v594-clienthub .top .ey .v555-header-mark .v598-brand-symbol{width:40px!important;height:31px!important}
  .v598-month-bar{align-items:flex-end;gap:10px;margin-top:7px}.v598-month-bar h2{font-size:25px!important}.v598-month-bar>div>small{font-size:10px!important;line-height:1.25}.v598-month-bar label{min-width:145px}.v598-month-bar label span{font-size:9px!important}.v598-month-bar input{min-height:44px!important;font-size:13px!important}
  .v598-quick{grid-template-columns:1fr 1fr!important}.v598-quick button{min-height:64px!important}.v598-quick button>i{width:30px;height:30px;flex-basis:30px}.v598-quick strong{font-size:14px!important}.v598-quick small{font-size:9px!important}
}
`;
document.head.appendChild(v598Style2);
// ===== FIM COLAB V5.98 =====


// ===== COLAB V6.01 — CABEÇALHO PREMIUM + LOGO OFICIAL + HOME FINANCEIRA =====
const COLAB_SYMBOL_PNG_V601='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAB4CAYAAAA6//q/AAAjPklEQVR42u19eZxcVZX/99x736uqrl6STugQEJIIIuBGnCiLMAHEUWB0/DDTjYgLIIafP0UWd2Xsbv05/HT8DSo/xYQARsUlPZ9xGyPyG0lYHLfEOBpAkB1JzNJbdXUt7y7n98e7r+pVpYNZujuRqfNJf7pT9arq1jvnnuV7zj0HaFGLWtSiFrWoRS1qUYta1KIWtahFLWpRi1rUoha1qEUtalGLWtSiFrWoRS1qUYta1KIWtahFLToIxMzEzIKZ5fr16xUzN/z4x6S/hlp37NmJ/gIYLgAI/19LRLyfr2cAbl9f/1wndYgz3RKRA+CS5zZv3jxnwYIFR+RyuYVEdJgQoouZ8565ZefcaBRF25n5maeffnorEZXSr2dm6f9sCcOhJgCeOZxm+tjY2PPDMDwDwKuI6CVEtATA/EwmI5/tvaJqNerq6vpTqVT5A7PdbIzZMD4+/jMiGkl9ntofrdIyATPAeCGEZY75sHPnzuNzudwFSqnzCLQ0zIRt6euNMQzAAsxAE/MYRAQCSEolqVEoou1EuK8aRd9+6KGHfrhs2bJSSvD+W2oEOsiMF37HMwCMj4+/PpvNriCic4IgyAKANRaOnfbXEDMLIkKDgxdz3PPfS0EsGPEPg0EslFQKFF8ZRdEj1tqv7tixY/XixYu3JYJARLYlALPgyQMQyc0uFAp/H4bh+zKZzKkAYLRhEDQzCwIRg6nOYIL/l7wZEqaC09+o4T9eBmJHEERQSgUAoLXeaYz54kMPPfT5pUuXjjULZYummdauXVuz3ePj46dWKpX/x54iHWkdRZHW2kRRZHWkrdba6iiKfzf/RFHjc1P93fCYtpGOrNaRNVprrXXVORt/dhQ9MjY2duEUzmJLA0zjzldEZDZu3Nh2wgknfDIMw6uUUtJooxlMRCRquxoE9js9vZf9M3Vt0PBFGPGLUoagyUGov6O/HGAiWKWCEAAqlcq3nnnmmauOPfbYHcl6WwIwjSp/165dp7S3t9+UyWROMsZYBhyBZaO6fpaF1VR+ndnM/noiLzyom4WpBIBjW0CN1zgwswqCQGv9WLFYvLS7u/ue57oQ0Cwxn4jITU5OXhEEwReCIAi11hEA1cAEz9xnFwDUmU7+j+ThxDkkNO59r1Ga33T3z2GAYVQQhMYYUyoW39k1d+5XnstCQLPAfBARF4vFG/P5/HuMMQ7MFkTSX1NfBFGjH582B3F8VweFmCUJEkJISoTIOQfnnItDxJq1EMButqBRANKOZLwmJ4QgKaWcnJj8aHtn+/XP1QhBzDTzN2wYkJOTk9/K5/PvMdpEHAf7ss5zb71rah3wmzgWhZjpRsSeu1JKhUqpUAWBdI4jrfVoFEU7oyjaaYyZACCUUoG/LpBKSi8QNZwhiQ6nYr5fk3DOwRoT5Tvy/1QoFD5KRDbtwLY0wF6o/b6+PlqzZs3aXC53gTGmyswBET2LbkfKiSMLZlJBoHy45uDc/ca5nxljNlYqld8z89bx8fFCpVIxANDV1ZXLZrM9YRguCcPwZUrJ04jEsiAI5gKANtqByYJY0lROYmKCmL1gMgNklVLh2NjYBXPnzv3Of0esYJ+Zn4RQk5OTX2Nm1lpXpgzlkjCu9lxkdaS1jiJdCw2j6MFSqXTdyMjIy/r7+/dZY+3Y8cTCiYmJiyuVyo+0jt/Wh5laa22jpnVFTaFlFEURM7tyefLuFHi1d/ciFuVDOuE2E7kASURmfHz8+ra2trfUdj5SHnqzl17fdUYFKvRI3b3VavXz991337+fd9551ab4nGp6vKY6GrRa8uOIaBuA2wHcvmvXrlPy+fzVgQouVIGC1lqTN0ceZmyIDLyjSbFGE4vWrVuXIaIqM1MCFDFA6AfVzOkDYJwIFoNwlFgxAK4fAg+AcCIouYYG60mq58rulwAwMjLyFr/TqtEewJqoQRtERvvtqbV+bGxi4qJm/MDvPNpfjZTeuSMjI8ujKNrkP0/rKDK7A04JkKQjZjblcum3/f39gpmpvx+CeyG5F8/qE/T3Q/T3P7ufxcuhuH/mfLFZ8wE8Ru+2bt264nz58n8upcxZa6nmoifOVrPTxeyIhJRKUrVa/eL27dv/cdGiRaMJdoBpTNIkQkREdt26dZnly5cPtrW1fcha45jhAIhEE8RrhSNBTkoZFouF97d/tusGnPz5gM67qqaRNq5A8HzCiZLwUmHpeEVYxA4LAMwlQpvXLSVmHiVHW63kR53DFgf8ds4teCRtLtALgaG65viLEYAUs1Aul3+ay+VONlprEEn2KA3Vg/X0S61SKjDGTlYq5Xd0dHR8O9EkM+lopbOPY2NjF7Xn87cRUWCdswAkxTlFq1Rsjqqlws2Zr3/g3XTFag04jL0LcwXLsyW78xXhVDCOCwMWEBQHqa4h2GjMT/jSFG2o7Aj3a8N3WovvzvkKflW7qheShmD/kgRAEpEdHx//QGdn52eMMREYCrUcDXvHntKawKogCIw228cL4383f/78X8xmfp6ZadOmTWrZsmV6bGzX3+TzXT9QSoXGGKeUEgBQrZR/V5mceP+c+QvuBAhj75GvDK29RDH+LpA4IjbugHawBNgmlDmRewLDsWMm8l4Qg0AUBBICxNAR2ILuMcyrNj6CtWfdDZOYhZn2E2ia1CqPjo4enc/nfyelbHPOAZRO0u4WZjmllNJaP10cKZ47b+G8+zdu3BgsW7ZMHwS/RRGRGdu16zVtnZ2fBXAcASPVUuFL7d0LPwWnMfHerlerqHCVJJwfBBAuYlimCACTgARYIF1+SE3ZCweO0WcCKL5QxGqGmdkRQ6gg3jA6ol9XHX+6YzXWzoY2oOna/RMTE7e1t7dfYoyJatHFFCCLt+mCnSsOj4yccfjhh//2YEOtKZNDO55+5NjJXU/vXLL0rLHCChyfyQSfUtZcIARgDAwIDoBEUo9AKYtNdai64dY6OB8OECUoV/ICqqOPRMSKEICAyOD7Bc0fPOxWPDSTQkDTsftHRkZe1NHR8WtBJNir1/R3TNl+JiLHzKpUKp3f1dX1o0MFZ2dmgQGqqdzilW0fydjKx5RyeRPBxClIEkmtCTuPYtIU0T/XbQERpTw6rgHZSd2Sd5HqEkNwYDgVIDQRF0oRru66DbdxPwQGwdPtINL07n4dAaTimN6/fUoLMLMNgiAolUr/lM/nP+aRQY1DgLgfigZhtl/ZecwcV1wZKn61jeAYbGJ/hprz0szMRKKesybv79S3dQqRSJ5ngB2YCCkBSAMQtftlYVmqAKIU0afzN/OH2UOX0ykE4gCYT0Rkn3jiiYVhGF5grWUwJLghp5NmvguCQFUqld/dfffdn/CYgTmUmL/rnfKcblf8aUj8alNFFQIMJhV780n5YZJuRsz81NfkeGezx//iukWKnb8krQUCSNQxaEonRPwjXigkA85oVNsy/KHJd9KaAYpBp+lEF+kABEARkZmYmLi2vb39/8SeP6vd3r22IchJKVWhUHjtnDlz7jxUMPWE+YUrxDtyilcKQFpGRJxCSV2qxmAqlU/EYG+jCUQEwQ4SjpN6RecAW7eNFJe9Jyqh7gjsfu9i0iqDTKlM38zfzG/mXsjpwgsOBIGy/f39Qkr5pjRGzkS1G8Woib5VSqlKufLjQ5H5EyvE+zpCXk0W7BwMNUPk0rOsGWwGHDMMHISSCFWAUCkE1kI4xgQTDTMwbBllMAeBolApCpWEotiZtFMLVSIXyb2kwERUbcvwRcXL8H9pCBb9kAdNAySo3/bt20/q7u7elKyYGwI/n45nhiByJIQqFApndXd3b3DOHXQBqDMfV7dn6AarETEhzjPsqZgoKSgCLAGsBEIIIIpQsMAvDdE9YLfFAI85i+FQoAIAxiBvJXqyjONAdHpG4exA4TgIwEReENgzlL1GqaURUmrUsVYBZYoRXdtxs7sh+Q4HQwAUEZliofihfEf+fyfOX2OFbj3mD4JAlcvljblc7pUeinWHAvNHLhVvm9vGa6xB1REr8p55Q6qp0ZQxAKckAjBQtfiFdfT1ce1+cMSteHJvP//hK5FZaHF6wHSZYPQFCsoYaBBEXAwxhUnwjxDgGCQnIj6r+1bcc6Ah4v5mAx0ACElnooZsTVFhE7utDgCstbfHibX4EMZBY34vJA3C7LwcZ3cEfLO1bJggqeZ9UYr5XFMILGAFEAgFWTW4r+r4M1034Qe1CqYYuRNJpm8AwMCAf3IAvjgG4sweMN2IKoCfAPyTsXficzmm/jDA+cawZcBSUsWU3qfxeigul2DKS3zl8bfj5ViMAjeiETOrAZJU6PotW9pPOeaY32ez2SO11pY89lfXmLEWE0KAmfXo6OhLenp6/pCYj4O08wUGwcOX48gORZuVwDzHsA1IXhrESYqUGDoIkdGORrTFR/I3uVW1BM5yyIEz4Qb3AbKtJX4AJLu3cAWuyBLdoICctqgKwQoilUhLR1WOtcogM1mmm9pX8/88EC2wz07g0NCQAIAXL1hwvFJqodHGocZ8bkRDASelFMaY/+rp6XnEC8/BYT5AeCBeZY7o1lBhvrHQBIiGglG/oVOybIIQmarGf4xG7pX5m9wqZhD3xkkjuhtmcB/xegKYhmBpCJZ9arlzJVYWqnyWITwVKmSYYWtrSDnWMdcosIZMJsQVwytwKg3B/rnU9LSZgN7eXgKAMAxfpJQSxphUyNRouxL1z8z/6W+tOmixfy8EDcGOvxPXtGXwGh2hImQMuzaANrG6ZRf7tKwCCssR39j2Zb4agON+KCIYYHqg2QR55BUIaBV+sf0d/Oq5Ie5UipZYhgHVNynHyURmDzUqQSLL9M8An4ET988E7HcYKIR4Yd0zaXJaktJu/7DW+jcH2ekTGILb9nYszgoacAaGiBVSJ0uTMI8I4DhCtyqgYLKK69q+zO/l/vh9DtTr3qMgrILmfqgFt+CRHRqvM8AuAQgwXOKYEsDMMc7EDtIa1m0BXjX8DnkuDcLtjxYQ+6dNASHEIqRwf97dYwUzpH/84QYFO9sUq37uCHBDGKDTEZgEibSnz6n4nhgmyFBmQuO69pXuU9wPhcGZL+GiQRjuh3reajxcqPDFLj4Y6eA8whyjSsT1c1CAANqE+ygDtD9aYL8FgIjmp1FMSuxUzWwRE0ForSPn3J8OlgAkDtLoZXh1W0BvtAYRAJleCKVhWYZRITKlCq/qvKnGfDtbVTo0CMMrEMy/FXdGmq+XAUJ2sA1OYD1UldawCRRetfMSdfr+aIEDEYDORAPsIVyAkJIImCyVShMHTQPEu4JCYJDiQJoaKnWoDvM7hpESYTWie384EnvXs8n8Gq2C4V7IHRE+GVX5YSk5ALOr4ytI2QQ4KYCctJfNig8ghGDP+GBqqKzxqJZjLo+OjlYOYszvhi/BudmQXmWYdQ1xS+v+2KY6wRCRwa5R597WNwSLE6c//bq3UQIALFmDSsniI0IkyfRUqrkuBNJq5pBw/lPvQDcNwe5LsuhAcgGuSSnsCVqgMSkPTm28t4k5hWuFbE7mNJ0sZnZSQZUjumrhSjzh0cKDBlglIeLcW/CdShWbpSIV33Nu2mtETKTDkA/rIJwNAFi+92ZgnwXAOZdkMKuJrY8XQ0hnqgkEdgxBlDs8CHKzfQPX+t2//VK8TClabh0sANlwaqCOr1oVUFiu4o45t7hv8PIDx9iniQQA1g5f8rued9e4iGuZBViBzgUAvHvvtZbYz0WBmSeQeP+Eeklc6rd1lhlo7+zsnHMguYf9CvtPjD+rI8BlQQaK4R2pZowfcaBlHHSF+IMAgB4cGt1BBmOsYWsJ361WMCziwpTaFkuBbwIOpAinru+Hoj7Yvb3X+yMAXmPy9rQGqAlnclw7dg5tGIYqCIIjZlMAGCAahHnwDeggpn9wGgxA+tp/rh3pYTA7GBVARRbf6F6F300Fqx6shpMEMPdDHP9N7HKgnwoFiusOUmELEQASlsECeP6Jj2Kxxz5mTACSm/LY7rFBPaZKTmwDgFLqJbOqATzO3tON0zIKRxgDDefTKbUaPGZnwQSWxiIaR/AZBmjIv4U/BaQajoHFJ4xm+4SwYICs4A0+u8pTuV4MmFAhE4R4YYJ9zIgAbNiwIQbIjXnISwLtwfdLRw6vmNUw0Kv/TEDnk0xqU1gQediCGOyIEdt+ZSzuOGJl9AD6QX1DsMwsBgcHHREZIuLe3l7ptZ0lIrsvB0SnAcRiAjhy+KUzta21uxAwOUhACrwgfQ/+HO1zLuDMM890AFAul+/P5XJWSiGdazxonaqMFsyAlPLMZ555po2ISukdNZO2c20vpCAsjw98QdSrVP2vmIXEIJQMrWRYwgO1NnTuj3/8w1Hz5j1vBeDOAFPPV9esqYDofl0uryaiu2crqzngI5lSBU/mBYpSIO8rhxtud8IACRw9K0DQ5s2bH7HWPiml2u1GECfBNQtjtMlkMkd1tXctZ2basGHDjKpQ7o/PXJzRhqME4Rhja4XYrukssZMCobZ4omDsXQQw1q4FEbnh4e2v7elZtCmbzV6XzbYtz+ZyJ2RzuaXZbPYtHXPnbigUCh/05e0zrgkGBuMVb89jBIJHlASlPTEkhciJcAssSDTHjGiApKiDiKqTk5O/ArDE23qRBoCSYkdf+wZSdDER/YinShpMIw152xcEOFwS5wHSFGsiTrcfIsAJBbaG1y1Zgwr394ZArxkZeebofH7Ot4Mg6DJaV+PQ0Rd8M5wUUrbn85/esWPHfxDRr2daEySB9bJVKJdXYAzgo5N+OZ4Z9UK8uA45P9MaoCZtxph18YZn4mbLXwddpLXWhWF4wdjY2LEAZnTn9HqVyQ6jlkkzx8XdaTVZWyoTlVh8BwBw8ulERC4Tdl0fhmHMfKIARCLuM0SCQMqxMyQE53K5N00DmLb3NzuOuLWvPa9ViJDwuSHv2wiJbBoEmykBsN4P+HFUjQpSCEWpnd3kqBIzG6VULgiCQW//Z+ym0SAcM2jLo3jUAQ8GCpIddK3kK5bNSGUQVgx+N6Lsvbx+vaLzrqqO7dp1Tiabvcgaq5kQxNCrjxfrJzuEd2yPmg3HNjmN0L8cCkx5MHkooLbrkwIGBhMY+6aN9osRiRk4/PDDtxtr1gkpCekq33RWMD5Co6y1JgzDNw0PD59GRGZGw6k+iLPuholYfMAAJgiQQ3wI08ExZICsZRqvOnH5C77AEXbu5LGnnurOtbffHH83Vy9oiMMG1PuB1JTdH2cztD33eWgTAp0uYTo36Yh6mDs5o2FgM1Wr1Zucc7FfzdxYGOpr2YjiFm5KKepob79l48aNbQB4f3r+7AuOPmeVvbNYFa/VDpsgiB2RYlApivC98ZJ81ZyV9pf3Dw0F1Ndnw/ndXwkzmcXWWou4qWUN2EpS8V4JCABUKpV+OCuhrQd0lkgcBsY8C39GMf3JLga4YmSLd8xoGJjSAtY7QPeWy+WfZ7PZU0yq505jgShABGG0NkEYHn/CCSesJqI3M7MaGBiYkcbMNAgXV/DYuwAs23VleCLYtVet+tORN1WeAgx4y7dDenFfVCwWbsjl8q83xkQEauxrUItqABCsVCqoVCqb1q9ff6///jN7vsHv5IzAsRmFjGFoEGS67S3X6tkBBj+1L29/oE2iCIArl8vXZ7PZ76VbrNVardV+AwxIo7Vua2u7aGJi4hEi+rhH2+zMCgHc/BujB+JHDbh/ucLr30z04r6oUCh8PJ/vuNoYo5lZNXYZpSm7j0dR9PG+vj47K6ig38lK4RQIgA078k02kzJ2Er4hpgM044kYsdsnB/MAnBQfBk1OTt7V1tZ2ltZak28NQ009gZJScYrbrwSTk5P97e3tn0iigpkKp1KdvIDXr5S07AoNAJPF4mfb8vn3WWsj55yiVK9hJvK9gupBj1IqLJfL/9bW1vb3s3W8LdlP5Svo3qzE6dqyJgHZ2JCiZgowbHjp4bfgt4ngz7QGqH18uVz+cBiGP/PnADhVK4b0gQv/sDDG6Hw+P1gsFnuI6L0+PFT+pk73GXjmAQbiFnZ6y5Yt3cccc8xN2Wy2L9n5NZtPVPeyamuHE0JIrfXo8PDwVT45NPNtbPohQOAdb8VxEniFZcS7v6npOQFOSqjI4emogD94NHRGw8BmX0DOnz//l+Vy+XNSyoDBtg5UpRNEtR1GzCy9ELy7Uqn8eNu2bUt8owj2o9+mrYGVZzATkRkZGVl+3HHH/adnfsRxU6i6s1ePrFKVorEAFIvF9x511FF/9E7ibBSLCAI4l8GlQcgZTpfUN7LXQYIt8y+PHkI5ObMwKwKQLICZ5fDw8McqlcqWQAWhbwhd02NpmwWunSWTxpgok8mcM2/evF9NTExctW7dusxZZ51lfKip1q5dK/dVGFK9AWXC+EcffXRBqVT6fEdHx11BELwwaWVDU9hDQnLKGSCC9qr/i93d3V9PaamZ3f0AYQD2t2/G3IBxmTNxSjtBf9P3NdZRoIrD9/clApg2AfAOHC9ZsqRSLpcv1lpPkhACSdlYg3pFqmccA4Ay2mgp5bz29vbPnXP22b8qFouXPvjggx1EZPr6+myCO0wxGFJMMURSeKZbP5/gyFKp9I9HHXXU5lwu914AbLQ2AFRDaqCxW7jHfNhIpTLlcvmur33ta9d4p292TjUvhyQCL8nhQ5kMehzD+O5iqE3SiIWUBUFFVYxVK7gjTiDs/RqnFcRIHKOxsbELu7q6vmWM0WAWDe1PkG4Jn/K4Y/jQqSAIvKf9uInMvxZLxe89/fTTm5MJX3tDDz/8cGdPT89pYRj2KSnfEIThPAAwWus6to/dmlc2tvRjo4IgrFar/7Vt27YzFy9ePD4wMECDg4MzrvqTopQ/XYKXdGdoIxGLVGsJSvegY8AohbBUxTfyq/jifT0nOO0oVqpzyDXt7e3/Yq2N2LFsOj+cYkDaplGM4oNYBfFQJ3YOxpgnrXObtdabyLmHImu3GmOK1lqdzWal1rpLKXVkEATHBUHwCinly4MgOBKozRCIvHDSlPNImgWB2fihFg9s27btNYsWLdo6W+nf5ODoqscg3vZXdG82xMnGQcNBsAOTBNXanMd9Ch0BcrjKf73gNty3rwIw7c2iPcyriOiGQqHQ2dHRMWBhNTtHIBJNFzd89QQwAjOMMcabEBmE4aIAWJTNZt+YCEWkdTwKFkRBqETzWxtjTNzFiQQDqv5ZDc0qG7KXXjR0EASZarXy6x1P/v4NR79w6baHP39lBkTRrDC/Pz6+PnE5vpQNcbKx8FoLIIkkRKl9TRUiLJVx14LbcJ8P/fbJRM3I5NCUEAwWi8VSPp//jAWYnTPJpJApXpQCX+JaAt9YNRaGOLRMenQIGR86IQZgrbOAdUkZSjJ6tsHlSGy7x/dr50Lq/okjgJVSmUqlvG7n5nveevRprxsBJHDVjdUkLJupUvE08wuX4br2ECuM5rjxBqHh3C0lXYuY4SyhyjywL/j/jJqAqXyCibGJ3kxbZnUQBJ2Ns4J4t1rCPdll9nqv1nuYGz0KSv+xW7uaeoaSiJrMDwEMI5UMiQiV8uTn3tbW/v4hwO64smtphyn0saDC1nF3y7Ffx47paMsylc1Pmj4VLkd/R0AD1iJi8k23ki9XbxfABBgVIDNZ4bXtN+PC/e0RMBtDo5SPv1+az+dvCcNwmTHG+s6Ycio7zFMwihszcimsfg8dlmrCw03nVlI9d+KTt6yUCozW2ysTY9d0zOv5JiBQeJf4Hzmy/6IUchBApPFYWfOFc1ZhY/dCTke///SuX9uL8G+76cZcgBUmQsQERYT0WtMRlBOCyDpMbJ/glzzv63gGA6D9Wc9sjY1TRGR8jP9JpdQ1SilljNH+K0qqMY3rUWJthbsfP99DG9qGJM6UjI8hBUcEJ5Nu4NXKt0pbH/tw9/Nf9OTvr/2r+Ysqv7khq9xbjGYLhgZASlJGM01GFte0r3Q313YugH1t2cZ+eESyY3dcgpd3ZvDFTECnmAhVCCj4M4zej2m0ZA46yCI7UaXLO1e6Ww6kQ8is1bunvehdu3ad3NHe/okwk/kbH57F8wOJhC8abRgQWZv1R6lhUg3NNXk3hzLdoMDbfka9TD0eG1ut/kZH0WC+s/O7ADB2Tefr2qLijYHgY03EVUgocM1YWTCkCkhEhn9UsPzxw1ZhY4MaT00DwYCXwiQH4aeFpM3HExdj4WHtdE1A/J5AIGcMfBVSg3li5tR4ZOZIhZQtlrGmYzVfcqAmabYnhzbPDH5jJgyvDsNweRx+OVhjtTcBvkJ3L5bZmLRJC0DCdAYQKBUDf1rrLVEUfWHdun9e09c3GJGQGF9B1+UD+0lYwFlUSSDg5pDRLzFQCLWFtsB3qo5Xb67g3rPWYK8PwI5ejpMyAm9ThIuDgHqMZuebUIuGQx8pC0Bx8KODANmqxqafVfj0MxcjOtD+wQdreHTDgObR0dEzs9nspUKIc8MwPCwVytkU8uZ77zM1TRxJfAb2fyfvS1KIgEQcHmqtq9ban2itb7vjjju+39fXF3E/BAaYRq8ITp0b2nutYe2IUJtk2qRU6neNLZiEUpAwQMXiDyxwj2H+mXZ40BC27xzFpFIwh2WQqwCH5RWODSReKYDlkumkIAPlDOAYEeLPo4YPosamRWCKlEQ2snh8osRnzP8qnpmOqORgj4+XSI2EefTRRxf09PSco5T6WyHEaUqpo4UQUyQeHNhxzQyQEJhqHF0URePMvMk596OxsbEfHnHEEQ82fPaqZYKu2KRHV4gPzMny9UbDECHg5kmjvIc7xzBsgUAiTAJqZwBjucxMFWZYAmchKJ8JfJt4RzAWhgV4t3Zw1OwiUtJN1iiJUBv8cTzic6azhbw6mAKQmIKksIKItsNP+Fq/fn370qVLTwyCYBkRnSCEOIaZFwohugDkmTn0t8wSIWLGBIDtzPwUgC3W2o3Dw8O/XrRo0dYmzZNME7PcGz9umTYDLMEwTHEPCefAJHw/30am190RgiIJNgwDU9uJUoAyQiJHBFhLDLA1hhw7MARLQSC45GgKNfYFTk7VJPPumYwKkYk0HitM8HmH3T698wMOqZl26dlDe8i4ifvuuy+/cOHCtlwulyUiUSqVrM3lyrueeKJ42mmnlfdgbpLhU24qj5wGwRMr6Kb2NlxhI5j4BABRukNXAkawA5NgD0I1RydIBl9yw+1lrtUZcaNaT7WpSoFgsfNnAbDKIqxWcN/2Mb5w0bewdbqHRxyyQw2ZmYaGhkTSlm5PDNyDACX3+s9OHEuqhWgQrvgu8aGM5E8pgjQ27iWUpN58WMleM1B6SH2tP4JoMhmpCSJ+UAj7/zajVKlph8RwMIqQgQTKDl/a8Bhfe94dqM7E5JBDeqrlVOtNnTnYzUU7kLrCxKEauRxntIfixiDEy+J4BBHHcxCS3kLOj4kUuzuHTaoctViWfPxeqzqh5PV1PyNuGi0QqhCkK3iiYvgDnavxrzMJQ/+lCcDMah0fU69/O7KvyIn3ZxSuVQHPdVWGi4dExXMHawdLsftoON6D45iAnF6D1F5B7Ajk2EGpDIRxqBjHX358Av/rxK9heDpnA7QEYC9obS9kn1ezj78di3va6D0B8NYgQA8cYOKWbTY59taARjerfm54kDlpqugLaMAQSkFBATpCyTFuH63yFxbeii0JuDTT8wNbArAnv8C3lk0Qu/kdeIsiukgQTgoUCDYeA8IMw8QOzpsf4YuJk8KNJHVTT3GEUsbxl9OAJTykLf5t0vBXelbHDTVdete3BGAvqb8fYiCF2QOgsXepZYrda5Vzfw3QS4XAgiDgegSQdPYW/ohMev8aoOowCsLvLfjeqsMPf/4UfnHeHaim4ORZHSrdEoC9ikhAGIizdunHn3wX5uYdXhCQOEExHwPwAjB1EpCDYEFEERyKzvEOEB6PLB4cr+ChxbdjW7PvAcAdjLZ0LQHY1yikPip+vxmWpIHxAHi2h0W3BGCafYWhXojedBl2c2eOHSCcmXpuLRzRIdKGrkUtalGLWtSiFrWoRS1qUYta1KIWtahFLWpRi1rUoha1qEUtalGLWtSiFrWoRS1qUYta1KIWPWfo/wP/PgDXbV7VYQAAAABJRU5ErkJggg==';
function colabBrandV601(){return `<img class="v601-brand-symbol" src="${COLAB_SYMBOL_PNG_V601}" alt="Colab">`}
officialBrandV555=function(){return colabBrandV601()};
applyOfficialBrandV555=function(){
  document.querySelectorAll('.logo').forEach(node=>{
    node.classList.add('v601-brand');
    if(!node.querySelector('.v601-brand-symbol'))node.innerHTML=colabBrandV601();
  });
  document.querySelectorAll('.top .ey').forEach(node=>{
    let mark=node.querySelector('.v555-header-mark');
    if(!mark){node.insertAdjacentHTML('afterbegin',`<span class="v555-header-mark">${colabBrandV601()}</span>`)}
    else if(!mark.querySelector('.v601-brand-symbol'))mark.innerHTML=colabBrandV601();
  });
};
applyOfficialBrandV555();

const _homePageV601Base=homePage;
homePage=function(){
  let html=_homePageV601Base();
  let monthly=sum((D.contracts||[]).filter(row=>row.status==='active'&&Number(row.monthly_fee||0)>0),'monthly_fee');
  html=html.replace(/<span>A RECEBER NO MÊS<\/span><b>[^<]*<\/b>/,`<span>A RECEBER MENSAL</span><b>${money(monthly)}</b>`);
  return html;
};

const v601Style=document.createElement('style');
v601Style.textContent=`
/* Cabeçalho geral: uma linha, sem texto institucional repetido */
.main>.top{min-height:58px!important;margin:0 0 16px!important;padding:4px 0 12px!important;border-bottom:1px solid #232323!important;align-items:center!important}
.main>.top>div:first-child{display:flex!important;align-items:center!important;gap:12px!important;min-width:0!important}
.main>.top .ey{display:flex!important;align-items:center!important;gap:0!important;font-size:0!important;letter-spacing:0!important;color:transparent!important;flex:0 0 auto!important}
.main>.top h1{margin:0!important;font-size:27px!important;line-height:1!important;letter-spacing:-.02em!important;white-space:nowrap!important}
.main>.top .v555-header-mark{display:grid!important;place-items:center!important;width:48px!important;height:44px!important;flex:0 0 48px!important;overflow:visible!important;background:transparent!important}
.main>.top .v601-brand-symbol{display:block!important;width:48px!important;height:44px!important;object-fit:contain!important}
.main>.topactions{margin-left:auto!important;gap:8px!important}

/* descrições introdutórias abaixo do título saem de todas as abas */
.main>.toolbar:first-of-type>div>p.muted{display:none!important}
.main>.toolbar:first-of-type{margin-bottom:12px!important}
.main>.toolbar:first-of-type>div:empty{display:none!important}
.main>.v5-central-hero>p.muted{display:none!important}

/* logo lateral/desktop usa o mesmo arquivo oficial */
.v601-brand{background:transparent!important;overflow:visible!important}
.side .v601-brand-symbol{width:58px!important;height:54px!important;object-fit:contain!important}

@media(max-width:760px){
  .main{padding-top:10px!important}
  .main>.top{min-height:54px!important;margin-bottom:10px!important;padding:2px 2px 10px!important}
  .main>.top>div:first-child{gap:10px!important}
  .main>.top h1{font-size:24px!important;max-width:calc(100vw - 170px)!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .main>.top .v555-header-mark{width:42px!important;height:38px!important;flex-basis:42px!important}
  .main>.top .v601-brand-symbol{width:42px!important;height:38px!important}
  .main>.toolbar:first-of-type{margin-top:0!important;margin-bottom:10px!important}
  .main>.toolbar:first-of-type>div>p.muted{display:none!important}
}
`;
document.head.appendChild(v601Style);
// ===== FIM COLAB V6.01 =====


// ===== COLAB V6.02 — AGENDA KANBAN DE TEMPO =====
let agendaViewV602='week',agendaAnchorV602=today();
function agendaDateObjV602(value){return new Date(String(value)+'T12:00:00')}
function agendaISODateV602(date){return date.toISOString().slice(0,10)}
function agendaAddDaysV602(value,days){let d=agendaDateObjV602(value);d.setDate(d.getDate()+days);return agendaISODateV602(d)}
function agendaWeekStartV602(value){let d=agendaDateObjV602(value),day=d.getDay(),diff=day===0?-6:1-day;d.setDate(d.getDate()+diff);return agendaISODateV602(d)}
function agendaMonthTitleV602(value){return agendaDateObjV602(value+'-01').toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}
function agendaDayNameV602(value){return agendaDateObjV602(value).toLocaleDateString('pt-BR',{weekday:'short'}).replace('.','').toUpperCase()}
function agendaDayMonthV602(value){return agendaDateObjV602(value).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','').toUpperCase()}
function agendaLongDayV602(value){return agendaDateObjV602(value).toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'})}
function agendaItemLabelV602(item){return item.type==='appointment'?'Reunião':item.type==='event'?'StoryMaker':item.type==='content'?'Conteúdo':'Demanda'}
function agendaItemTimeV602(item){if(item.type==='appointment'||item.type==='event')return fmtTime(item.raw?.starts_at)||'—';if(item.type==='content')return'PUBLICAÇÃO';return'PRAZO'}
function agendaItemAttrV602(item){return item.type==='appointment'?`data-appointmentopen="${item.id}"`:item.type==='content'?`data-contentopen="${item.id}"`:item.type==='task'?`data-taskopen="${item.id}"`:`data-eventopen="${item.id}"`}
function agendaCardV602(item){let client=cl(item.client)?.name||'Colab · Interno';return `<button class="v602-ag-card ${E(item.type)}" ${agendaItemAttrV602(item)}><div class="v602-ag-card-top"><span class="v602-ag-dot"></span><b>${E(agendaItemTimeV602(item))}</b><em>${E(agendaItemLabelV602(item))}</em></div><strong>${E(item.title)}</strong><small>${E(client)}</small>${item.meta?`<span>${E(item.meta)}</span>`:''}</button>`}
function agendaFilteredV602(){return agendaItemsV5().filter(item=>agendaClient==='all'||item.client===agendaClient).filter(item=>agendaType==='all'||item.type===agendaType)}
function agendaTodayPanelV602(items){let td=today(),rows=items.filter(item=>item.date===td),sorted=rows.slice().sort((a,b)=>String(a.raw?.starts_at||a.date+'T23:59').localeCompare(String(b.raw?.starts_at||b.date+'T23:59'))),next=sorted[0];return `<section class="v602-ag-today"><div><small>HOJE · ${E(agendaDayMonthV602(td))}</small><h2>${rows.length?`${rows.length} ${rows.length===1?'compromisso':'compromissos'}`:'Agenda livre hoje'}</h2>${next?`<p>Próximo · <b>${E(agendaItemTimeV602(next))}</b> · ${E(next.title)}</p>`:'<p>Sem compromissos marcados para hoje.</p>'}</div>${next?`<button class="v602-ag-next" ${agendaItemAttrV602(next)}>Abrir próximo →</button>`:''}</section>`}
function agendaWeekV602(items){let start=agendaWeekStartV602(agendaAnchorV602),days=Array.from({length:7},(_,i)=>agendaAddDaysV602(start,i));return `<div class="v602-week-nav"><button type="button" data-ag-week="-7">←</button><div><small>SEMANA</small><b>${E(agendaDayMonthV602(days[0]))} — ${E(agendaDayMonthV602(days[6]))}</b></div><button type="button" data-ag-week="7">→</button></div><div class="v602-week-board">${days.map(date=>{let rows=items.filter(item=>item.date===date),isToday=date===today();return `<section class="v602-day-col ${isToday?'today':''}" data-ag-day="${date}"><header><div><small>${E(agendaDayNameV602(date))}</small><b>${agendaDateObjV602(date).getDate()}</b></div><span>${rows.length}</span></header><div class="v602-day-stack">${rows.sort((a,b)=>String(a.raw?.starts_at||a.date).localeCompare(String(b.raw?.starts_at||b.date))).map(agendaCardV602).join('')||'<div class="v602-day-empty">Livre</div>'}</div></section>`}).join('')}</div>`}
function agendaTodayViewV602(items){let date=agendaAnchorV602||today(),rows=items.filter(item=>item.date===date);return `<div class="v602-day-view-head"><button type="button" data-ag-daymove="-1">←</button><div><small>${E(agendaDayNameV602(date))}</small><h2>${E(agendaLongDayV602(date))}</h2></div><button type="button" data-ag-daymove="1">→</button></div><div class="v602-day-view">${rows.sort((a,b)=>String(a.raw?.starts_at||a.date).localeCompare(String(b.raw?.starts_at||b.date))).map(agendaCardV602).join('')||'<div class="v602-full-empty"><b>Nada marcado.</b><span>Esse dia está livre.</span></div>'}</div>`}
function agendaMonthViewV602(items){let month=agendaMonth||dateMonth(agendaAnchorV602);return `<div class="v602-month-head"><b>${E(agendaMonthTitleV602(month))}</b><input id="agendaMonth" type="month" value="${E(month)}"></div><section class="panel v602-month-calendar">${calendarGridV5(month,items.filter(item=>dateMonth(item.date)===month))}</section>`}
agendaPage=function(){let items=agendaFilteredV602();return `<div class="v602-ag-shell"><div class="v602-ag-command"><div class="v602-ag-tabs"><button class="${agendaViewV602==='today'?'on':''}" data-ag-view="today">Hoje</button><button class="${agendaViewV602==='week'?'on':''}" data-ag-view="week">Semana</button><button class="${agendaViewV602==='month'?'on':''}" data-ag-view="month">Mês</button></div><button class="btn pri v602-ag-add" data-m="appointmentNewV5">＋ Agendar</button></div><div class="v602-ag-filters"><select id="agendaClient"><option value="all">Todos os clientes</option>${(D.clients||[]).filter(client=>client.active).map(client=>`<option value="${client.id}" ${agendaClient===client.id?'selected':''}>${E(client.name)}</option>`).join('')}</select><select id="agendaType"><option value="all">Tudo</option><option value="appointment" ${agendaType==='appointment'?'selected':''}>Reuniões</option><option value="task" ${agendaType==='task'?'selected':''}>Demandas</option><option value="content" ${agendaType==='content'?'selected':''}>Conteúdos</option><option value="event" ${agendaType==='event'?'selected':''}>Eventos / captações</option></select></div>${agendaViewV602!=='month'?agendaTodayPanelV602(items):''}<section class="v602-ag-stage">${agendaViewV602==='today'?agendaTodayViewV602(items):agendaViewV602==='month'?agendaMonthViewV602(items):agendaWeekV602(items)}</section></div>`}
const _bindV602Base=bind;
bind=function(){_bindV602Base();document.querySelectorAll('[data-ag-view]').forEach(button=>button.onclick=()=>{agendaViewV602=button.dataset.agView;if(agendaViewV602==='today')agendaAnchorV602=today();render()});document.querySelectorAll('[data-ag-week]').forEach(button=>button.onclick=()=>{agendaAnchorV602=agendaAddDaysV602(agendaAnchorV602,Number(button.dataset.agWeek));agendaMonth=dateMonth(agendaAnchorV602);render()});document.querySelectorAll('[data-ag-daymove]').forEach(button=>button.onclick=()=>{agendaAnchorV602=agendaAddDaysV602(agendaAnchorV602,Number(button.dataset.agDaymove));agendaMonth=dateMonth(agendaAnchorV602);render()});let month=document.getElementById('agendaMonth');if(month)month.addEventListener('change',()=>{agendaAnchorV602=month.value+'-01';agendaMonth=month.value});};
const v602Style=document.createElement('style');v602Style.textContent=`
.v602-ag-shell{display:grid;gap:14px}.v602-ag-command{display:flex;align-items:center;justify-content:space-between;gap:12px}.v602-ag-tabs{display:flex;gap:5px;padding:4px;border:1px solid #2b2b2b;border-radius:14px;background:#111}.v602-ag-tabs button{border:0;background:transparent;color:#747474;padding:9px 15px;border-radius:10px;font-weight:900}.v602-ag-tabs button.on{background:#21140d;color:#fff;box-shadow:inset 0 0 0 1px #673115}.v602-ag-add{min-height:44px;padding-inline:18px}.v602-ag-filters{display:flex;gap:8px;overflow:auto}.v602-ag-filters select,.v602-month-head input{min-height:42px;padding:9px 12px;border:1px solid #2e2e2e;border-radius:11px;background:#111;color:#c9c9c9}.v602-ag-today{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;border:1px solid #4f2b19;border-radius:18px;background:radial-gradient(circle at 90% 15%,rgba(255,106,0,.14),transparent 34%),#14110f}.v602-ag-today small{color:#ff7b31;font-size:9px;font-weight:950;letter-spacing:.16em}.v602-ag-today h2{margin:5px 0 4px;font-size:25px}.v602-ag-today p{margin:0;color:#858585;font-size:11px}.v602-ag-today p b{color:#fff}.v602-ag-next{border:1px solid #5a301a;background:#1b120e;color:#ff8d50;border-radius:11px;padding:10px 13px;font-weight:900;white-space:nowrap}.v602-ag-stage{min-width:0}.v602-week-nav,.v602-day-view-head,.v602-month-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:2px 0 10px}.v602-week-nav>button,.v602-day-view-head>button{width:38px;height:38px;border:1px solid #303030;border-radius:11px;background:#111;color:#aaa;font-weight:900}.v602-week-nav>div{text-align:center}.v602-week-nav small{display:block;color:#676767;font-size:8px;font-weight:950;letter-spacing:.14em}.v602-week-nav b{display:block;margin-top:3px;font-size:12px}.v602-week-board{display:flex;gap:10px;overflow-x:auto;padding:1px 1px 10px;scroll-snap-type:x mandatory;scrollbar-width:thin}.v602-day-col{flex:0 0 260px;min-height:360px;border:1px solid #292929;border-radius:18px;background:#111;overflow:hidden;scroll-snap-align:start}.v602-day-col.today{border-color:#7a3b18;box-shadow:inset 0 3px #ff6a00}.v602-day-col>header{display:flex;align-items:center;justify-content:space-between;padding:14px 14px 12px;border-bottom:1px solid #262626}.v602-day-col>header div{display:flex;align-items:baseline;gap:8px}.v602-day-col>header small{font-size:9px;color:#777;font-weight:950;letter-spacing:.12em}.v602-day-col>header b{font-size:24px}.v602-day-col>header>span{min-width:26px;height:26px;border-radius:99px;background:#1b1b1b;color:#777;display:grid;place-items:center;font-size:10px;font-weight:900}.v602-day-col.today>header>span{background:#2b170c;color:#ff7b31}.v602-day-stack{display:grid;gap:9px;padding:12px}.v602-day-empty{min-height:190px;border:1px dashed #292929;border-radius:14px;display:grid;place-items:center;color:#454545;font-size:11px}.v602-ag-card{position:relative;width:100%;text-align:left;border:1px solid #303030;border-left:3px solid #666;border-radius:14px;background:#171717;color:#fff;padding:12px;min-width:0}.v602-ag-card:hover{border-color:#555}.v602-ag-card.appointment{border-left-color:#ff6a00}.v602-ag-card.event{border-left-color:#72a7ff}.v602-ag-card.content{border-left-color:#b17cff}.v602-ag-card.task{border-left-color:#e1b94d}.v602-ag-card-top{display:flex;align-items:center;gap:6px;margin-bottom:9px}.v602-ag-dot{width:7px;height:7px;border-radius:50%;background:#777}.v602-ag-card.appointment .v602-ag-dot{background:#ff6a00}.v602-ag-card.event .v602-ag-dot{background:#72a7ff}.v602-ag-card.content .v602-ag-dot{background:#b17cff}.v602-ag-card.task .v602-ag-dot{background:#e1b94d}.v602-ag-card-top b{font-size:9px;color:#cfcfcf}.v602-ag-card-top em{margin-left:auto;font-size:7px;font-style:normal;font-weight:950;letter-spacing:.08em;color:#666;text-transform:uppercase}.v602-ag-card>strong{display:block;font-size:14px;line-height:1.28}.v602-ag-card>small{display:block;margin-top:6px;color:#8a8a8a;font-size:9px}.v602-ag-card>span{display:block;margin-top:4px;color:#626262;font-size:8px}.v602-day-view-head>div{text-align:center}.v602-day-view-head small{color:#ff7b31;font-size:9px;font-weight:950;letter-spacing:.14em}.v602-day-view-head h2{margin:3px 0 0;font-size:18px;text-transform:capitalize}.v602-day-view{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v602-day-view .v602-ag-card{min-height:128px}.v602-full-empty{grid-column:1/-1;min-height:260px;border:1px dashed #2d2d2d;border-radius:18px;display:grid;place-items:center;align-content:center;gap:5px;color:#555}.v602-full-empty span{font-size:10px}.v602-month-head b{text-transform:capitalize;font-size:18px}.v602-month-calendar{padding:12px}.v602-month-calendar .calendar{margin:0}.v602-month-calendar .day{min-height:120px}.v602-month-calendar .calitem{border-radius:7px;padding:5px 6px;margin-top:4px;font-size:8px}
@media(max-width:760px){.v602-ag-shell{gap:12px}.v602-ag-command{position:sticky;top:0;z-index:6;padding:5px 0;background:linear-gradient(#0c0c0c 80%,transparent)}.v602-ag-tabs{flex:1}.v602-ag-tabs button{flex:1;padding:9px 7px;font-size:12px}.v602-ag-add{min-height:42px;padding:8px 12px;font-size:12px}.v602-ag-filters select{min-width:150px;flex:0 0 auto}.v602-ag-today{padding:15px;align-items:flex-start}.v602-ag-today h2{font-size:21px}.v602-ag-today p{font-size:10px;line-height:1.35}.v602-ag-next{display:none}.v602-week-nav{margin-top:2px}.v602-day-col{flex-basis:82vw;min-height:430px}.v602-day-col>header b{font-size:27px}.v602-day-stack{padding:13px}.v602-ag-card{padding:14px}.v602-ag-card>strong{font-size:16px}.v602-ag-card>small{font-size:10px}.v602-ag-card>span{font-size:9px}.v602-day-view{grid-template-columns:1fr}.v602-month-head{align-items:center}.v602-month-head b{font-size:16px}.v602-month-head input{max-width:155px}.v602-month-calendar{padding:6px;overflow:auto}.v602-month-calendar .calendar{min-width:780px}.v602-month-calendar .day{min-height:104px}}
`;document.head.appendChild(v602Style);
// ===== FIM COLAB V6.02 =====


// ===== COLAB V6.03 — MAIS DA CLIENTE COMO CENTRAL DE AÇÕES =====
clientMorePaneV591=function(cid){
  let active=clientHubTabsV563[cid]==='more';
  let operation=[
    ['agenda','Agenda','Reuniões e compromissos','calendar'],
    ['tasks','Demandas','Pendências e responsáveis','tasks'],
    ['forms','Briefings & onboarding','Formulários e respostas','forms'],
    ['files','Drive & arquivos','Materiais e links','files']
  ];
  let management=[
    ['services','Serviços','Planos e operação ativa','services'],
    ['contact','Dados da cliente','Contato e informações','contact'],
    ['finance','Contrato & pagamentos','Financeiro da cliente','finance'],
    ['history','Histórico','Movimentos recentes','history']
  ];
  let card=([tab,title,desc,kind])=>`<button class="v603-more-card ${kind}" data-client-tab="${tab}"><span class="v603-more-icon" aria-hidden="true"></span><div><b>${title}</b><small>${desc}</small></div><i>›</i></button>`;
  return `<section class="panel v5-hub-wide v591-more-pane v603-more-pane" id="more" ${active?'data-v563-active':''}><div class="v603-more-head"><div><small class="ey">CENTRAL DA CLIENTE</small><h2>Mais</h2></div></div><div class="v603-more-section"><h3>OPERAÇÃO</h3><div class="v603-more-grid">${operation.map(card).join('')}</div></div><div class="v603-more-section"><h3>GESTÃO</h3><div class="v603-more-grid">${management.map(card).join('')}</div></div></section>`
};
const v603Style=document.createElement('style');v603Style.textContent=`
.v603-more-pane{padding:18px!important;background:#111!important;border-color:#292929!important}.v603-more-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.v603-more-head h2{margin:5px 0 0;font-size:27px;line-height:1}.v603-more-section{margin-top:18px}.v603-more-section:first-of-type{margin-top:0}.v603-more-section>h3{margin:0 0 9px;color:#626262;font-size:8px;font-weight:950;letter-spacing:.14em}.v603-more-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v603-more-card{position:relative;display:grid;grid-template-columns:46px minmax(0,1fr) 24px;align-items:center;gap:12px;min-height:78px;padding:13px 14px;border:1px solid #2d2d2d;border-radius:15px;background:#151515;color:#fff;text-align:left;transition:border-color .18s ease,background .18s ease,transform .18s ease}.v603-more-card:hover{border-color:#4d3527;background:#18130f;transform:translateY(-1px)}.v603-more-card>div{min-width:0}.v603-more-card b{display:block;font-size:14px;line-height:1.15}.v603-more-card small{display:block;margin-top:5px;color:#777;font-size:9px;line-height:1.3}.v603-more-card>i{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#1d1d1d;color:#ff7b32;font-size:18px;font-style:normal}.v603-more-icon{position:relative;display:grid;place-items:center;width:46px;height:46px;border-radius:13px;background:#21150f;border:1px solid #3e2719}.v603-more-icon:before,.v603-more-icon:after{content:'';position:absolute}.v603-more-card.calendar .v603-more-icon:before{width:21px;height:18px;border:2px solid #ff7b32;border-radius:4px;top:14px}.v603-more-card.calendar .v603-more-icon:after{width:13px;height:2px;background:#ff7b32;top:19px;box-shadow:0 5px 0 #ff7b32}.v603-more-card.tasks .v603-more-icon:before{width:20px;height:16px;border-left:2px solid #ff7b32;border-bottom:2px solid #ff7b32;transform:rotate(-45deg);left:12px;top:10px}.v603-more-card.forms .v603-more-icon:before{width:18px;height:22px;border:2px solid #ff7b32;border-radius:3px}.v603-more-card.forms .v603-more-icon:after{width:10px;height:2px;background:#ff7b32;box-shadow:0 5px 0 #ff7b32,0 10px 0 #ff7b32}.v603-more-card.files .v603-more-icon:before{width:22px;height:16px;border:2px solid #ff7b32;border-radius:3px;top:16px}.v603-more-card.files .v603-more-icon:after{width:10px;height:4px;border:2px solid #ff7b32;border-bottom:0;border-radius:3px 3px 0 0;left:12px;top:11px}.v603-more-card.services .v603-more-icon:before{width:21px;height:21px;border:2px solid #ff7b32;border-radius:5px;box-shadow:inset 0 0 0 5px #21150f}.v603-more-card.contact .v603-more-icon:before{width:10px;height:10px;border:2px solid #ff7b32;border-radius:50%;top:10px}.v603-more-card.contact .v603-more-icon:after{width:20px;height:10px;border:2px solid #ff7b32;border-radius:12px 12px 5px 5px;border-bottom:0;bottom:8px}.v603-more-card.finance .v603-more-icon:before{content:'R$';color:#ff7b32;font-size:12px;font-weight:950}.v603-more-card.history .v603-more-icon:before{width:20px;height:20px;border:2px solid #ff7b32;border-radius:50%;border-left-color:transparent}.v603-more-card.history .v603-more-icon:after{width:7px;height:7px;border-left:2px solid #ff7b32;border-bottom:2px solid #ff7b32;left:9px;top:8px;transform:rotate(45deg)}
@media(max-width:760px){.v603-more-pane{margin:0!important;padding:14px 12px 18px!important;border-radius:18px!important}.v603-more-head{margin-bottom:16px}.v603-more-head h2{font-size:26px}.v603-more-section{margin-top:20px}.v603-more-section>h3{font-size:9px;margin-bottom:8px;padding-left:2px}.v603-more-grid{grid-template-columns:1fr;gap:8px}.v603-more-card{grid-template-columns:50px minmax(0,1fr) 28px;min-height:82px;padding:14px 13px;gap:12px;border-radius:16px}.v603-more-icon{width:50px;height:50px;border-radius:14px}.v603-more-card b{font-size:16px!important;letter-spacing:-.01em}.v603-more-card small{font-size:11px!important;line-height:1.35;margin-top:4px}.v603-more-card>i{width:28px;height:28px;font-size:20px}}
`;document.head.appendChild(v603Style);
// ===== FIM COLAB V6.03 =====

// ===== COLAB V6.04 — CABEÇALHO, MARCA E FINANCEIRO =====
const COLAB_SYMBOL_OFFICIAL_V604='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDY4IDc4MyI+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNDE2LDIgTDM5NiwwIEwzNDgsMCBMMzE1LDQgTDI4MiwxMSBMMjQ0LDIzIEwyMTgsMzQgTDE4OSw0OSBMMTUyLDczIEwxMjMsOTYgTDk1LDEyNCBMNjQsMTYzIEw0NSwxOTQgTDMyLDIyMCBMMTcsMjU5IEw4LDI5MyBMMiwzMjggTDAsMzUyIEwxLDM5NyBMNSw0MjcgTDE5LDQ4MCBMMzIsNTExIEw1MCw1NDQgTDY4LDU3MCBMOTQsNjAwIEwxMTQsNjE5IEwxNDcsNjQ0IEwxNzcsNjYyIEwyMDcsNjc2IEwyNDQsNjg5IEwyNzcsNjk3IEwzMjYsNzAzIEwzNjYsNzAzIEwzOTUsNzAwIEw0NDMsNjg5IEw0NjcsNjgxIEw0OTksNjY3IEw1MjgsNjUxIEw1NTksNjMwIEw1ODcsNjA3IEw2MTEsNTgzIEw2NDcsNTM3IEw2NTcsNTIxIEw2NzAsNDkxIEw2NzEsNDcwIEw2NjksNDYyIEw2NjQsNDUyIEw2NTgsNDQ1IEw2NDIsNDM1IEw2MzAsNDMyIEw2MDksNDMyIEw2MDAsNDM0IEw1ODMsNDQyIEw1NzQsNDUwIEw1NTEsNDg3IEw1MzcsNTA1IEw1MTAsNTMyIEw0ODAsNTU1IEw0MzksNTc3IEw0MDgsNTg4IEwzNzcsNTk0IEwzNDYsNTk2IEwzMTcsNTk0IEwyODIsNTg3IEwyNjAsNTgwIEwyMjMsNTYyIEwyMDIsNTQ4IEwxNzMsNTIyIEwxNTcsNTAzIEwxMzgsNDczIEwxMzAsNDU2IEwxMjAsNDI2IEwxMTQsMzkyIEwxMTQsMzQ0IEwxMjEsMzA0IEwxMzYsMjYxIEwxNjEsMjE3IEwxNzksMTk1IEwxOTcsMTc3IEwyMjYsMTU0IEwyNTcsMTM2IEwzMDEsMTE5IEwzNDYsMTEwIEwzODMsMTA5IEw0MDksMTEyIEw0MzIsMTE3IEw0NTcsMTI1IEw0NzUsMTMzIEw1MTIsMTU1IEw1MjcsMTY3IEw1NDcsMTg3IEw1NjAsMTkzIEw1NzMsMTkzIEw1ODUsMTg4IEw2MTYsMTY5IEw2MjgsMTU2IEw2MzIsMTQ2IEw2MzMsMTMyIEw2MjcsMTE0IEw2MTEsOTYgTDU3NSw2NiBMNTQzLDQ1IEw1MDcsMjcgTDQ2NCwxMloiLz48cGF0aCBmaWxsPSIjZmY1YTAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03OTYsMTUyIEw3NTAsMTUxIEw3MDUsMTU3IEw2NzgsMTY0IEw2NDksMTc0IEw2MTgsMTg4IEw1ODksMjA1IEw1NTUsMjMwIEw1MjAsMjYzIEw0OTksMjg3IEw0NjgsMzMzIEw0NDksMzcwIEw0MzUsNDA0IEw0MjIsNDUzIEw0MjIsNDY0IEw0MjYsNDc5IEw0MzIsNDg5IEw0NDMsNDk5IEw0NTMsNTA0IEw0NjYsNTA3IEw0ODEsNTA2IEw0OTgsNDk5IEw1MTIsNDg3IEw1MjAsNDc0IEw1MzcsNDI0IEw1NTcsMzg1IEw1NzgsMzU0IEw1OTQsMzM1IEw2MTgsMzEyIEw2NTMsMjg3IEw2NzgsMjc0IEw3MTIsMjYyIEw3NDIsMjU2IEw3ODEsMjU1IEw3OTgsMjU3IEw4MjIsMjYzIEw4NDQsMjcxIEw4NzMsMjg3IEw4OTcsMzA2IEw5MTYsMzI2IEw5MjksMzQzIEw5NDIsMzY1IEw5NTgsNDA1IEw5NjUsNDM5IEw5NjYsNDgyIEw5NjEsNTE2IEw5NDgsNTU0IEw5MzAsNTg2IEw5MTYsNjA0IEw4OTcsNjI0IEw4NzQsNjQzIEw4NjAsNjUyIEw4MjcsNjY4IEw4MDgsNjc0IEw3ODMsNjc5IEw3NDksNjgwIEw3MTcsNjc2IEw2ODMsNjY1IEw2NDUsNjQzIEw2MjUsNjI2IEw2MTgsNjIzIEw2MDksNjIyIEw1OTgsNjI1IEw1NzEsNjQ2IEw1NDgsNjYxIEw1MzksNjcwIEw1MzUsNjc4IEw1MzQsNjkyIEw1NDIsNzA3IEw1NjMsNzI0IEw1ODMsNzM3IEw2MDUsNzQ5IEw2NDAsNzY0IEw2OTksNzc5IEw3MzAsNzgyIEw3NjgsNzgyIEw3OTgsNzc5IEw4MjIsNzc0IEw4NzYsNzU2IEw5MDQsNzQyIEw5MzQsNzIzIEw5NjQsNjk5IEw5ODQsNjc5IEwxMDA4LDY1MCBMMTAyMiw2MjkgTDEwNDMsNTg5IEwxMDU2LDU1MyBMMTA2NCw1MTYgTDEwNjcsNDkwIEwxMDY3LDQ0OSBMMTA2Myw0MTYgTDEwNTQsMzc3IEwxMDQxLDM0MSBMMTAyMywzMDUgTDEwMDAsMjcwIEw5NjQsMjI5IEw5MzQsMjA0IEw5MDksMTg4IEw4ODEsMTc0IEw4NTEsMTYzIEw4MjgsMTU3WiIvPjwvc3ZnPg==';
officialBrandV555=function(){return `<img class="v604-brand-symbol" src="${COLAB_SYMBOL_OFFICIAL_V604}" alt="Colab">`};
applyOfficialBrandV555=function(){document.querySelectorAll('.logo').forEach(node=>{node.classList.add('v604-brand');if(!node.querySelector('.v604-brand-symbol'))node.innerHTML=officialBrandV555()});document.querySelectorAll('.top .ey').forEach(node=>{let mark=node.querySelector('.v555-header-mark');if(!mark)node.insertAdjacentHTML('afterbegin',`<span class="v555-header-mark">${officialBrandV555()}</span>`);else if(!mark.querySelector('.v604-brand-symbol'))mark.innerHTML=officialBrandV555()})};
function monthlyReceivedV604(month=today().slice(0,7)){return sum((D.receivables||[]).filter(row=>row.status==='paid'&&String(row.paid_at||row.competence_month||row.due_date||'').slice(0,7)===month),'amount')}
const _homePageV604FinanceBase=homePage;
homePage=function(){let html=_homePageV604FinanceBase(),month=today().slice(0,7),received=monthlyReceivedV604(month),receive=typeof monthlyReceivableV553==='function'?monthlyReceivableV553(month):0,pay=typeof monthlyPayableV553==='function'?monthlyPayableV553(month):0;let block=`<div class="v5-finance-snapshot v604-finance-snapshot"><article data-v="finance"><span>CAIXA ATUAL</span><b>${money(cashNowV5())}</b></article><article class="received" data-v="finance"><span>RECEBIDO NO MÊS</span><b>${money(received)}</b></article><article class="receive" data-v="finance"><span>A RECEBER NO MÊS</span><b>${money(receive)}</b></article><article class="pay" data-v="finance"><span>A PAGAR NO MÊS</span><b>${money(pay)}</b></article></div>`;html=html.replace(/<div class="v5-finance-snapshot[^"]*">[\s\S]*?<\/div>/,block);return html};
financePage=function(){let tabs=[['overview','Visão geral'],['planning','Planejamento'],['flow','Fluxo de caixa']],monthName=financeMonthLabelV553(financeMonth),monthlyRows=monthlyReceivablesV553(financeMonth),toReceive=monthlyReceivableV553(financeMonth),received=monthlyReceivedV604(financeMonth),toPay=monthlyPayableV553(financeMonth);return `<div class="v604-finance-command"><label><small>MÊS</small><input id="financeMonth" type="month" value="${financeMonth}"></label><button class="btn pri" data-m="financeLaunchV5">＋ Lançar</button></div><div class="v5-finance-main v604-finance-main"><article><span>CAIXA ATUAL</span><b>${money(cashNowV5())}</b><small>saldo realizado</small></article><article class="received"><span>RECEBIDO NO MÊS</span><b>${money(received)}</b><small>${E(monthName)}</small></article><article class="receive"><span>A RECEBER NO MÊS</span><b>${money(toReceive)}</b><small>${monthlyRows.length} ${monthlyRows.length===1?'cobrança pendente':'cobranças pendentes'}</small></article><article class="pay"><span>A PAGAR NO MÊS</span><b>${money(toPay)}</b><small>${E(monthName)}</small></article></div><div class="toolbar v604-finance-tabs"><div class="v5-finance-tabs">${tabs.map(([key,label])=>`<button class="${financeTabV5===key?'on':''}" data-financetab="${key}">${label}</button>`).join('')}</div></div>${financeTabV5==='planning'?financePlanningV5():financeTabV5==='flow'?financeFlowV5():financeOverviewV5()}`};
const v604CoreStyle=document.createElement('style');v604CoreStyle.textContent=`.main>.top{position:relative;min-height:62px!important;margin:5px 0 16px!important;padding:8px 11px!important;border:1px solid #252525!important;border-radius:17px!important;background:linear-gradient(180deg,rgba(20,20,20,.96),rgba(12,12,12,.96))!important;box-shadow:0 12px 30px rgba(0,0,0,.22),inset 0 1px rgba(255,255,255,.025)!important;align-items:center!important}.main>.top>div:first-child{display:flex!important;align-items:center!important;min-width:0!important}.main>.top h1{display:none!important}.main>.top .ey{display:flex!important;align-items:center!important;font-size:0!important;letter-spacing:0!important;color:transparent!important}.main>.top .v555-header-mark{display:grid!important;place-items:center!important;width:54px!important;height:42px!important;flex:0 0 54px!important;overflow:visible!important;border:0!important;border-radius:0!important;background:transparent!important}.v604-brand-symbol{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important}.main>.top .v604-brand-symbol{width:50px!important;height:40px!important}.main>.topactions{margin-left:auto!important;gap:7px!important}.main>.topactions>button{border-radius:12px!important}.v604-brand{display:grid!important;place-items:center!important;background:transparent!important;overflow:visible!important}.side .v604-brand-symbol{width:66px!important;height:61px!important;object-fit:contain!important}.v604-finance-snapshot{grid-template-columns:repeat(4,minmax(0,1fr))!important}.v604-finance-snapshot article{min-height:90px}.v604-finance-snapshot .received b,.v604-finance-snapshot .receive b{color:#79d88d!important}.v604-finance-snapshot .pay b{color:#f28a8a!important}.v604-finance-command{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-bottom:12px}.v604-finance-command label{display:grid;gap:5px}.v604-finance-command small{color:#6f6f6f;font-size:8px;font-weight:950;letter-spacing:.12em}.v604-finance-command input{min-height:43px;padding:8px 11px;border:1px solid #323232;border-radius:11px;background:#101010;color:#fff}.v604-finance-main{grid-template-columns:repeat(4,minmax(0,1fr))!important}.v604-finance-main article{min-height:112px}.v604-finance-main article>small{display:block;margin-top:7px;color:#666;font-size:9px}.v604-finance-main .received b,.v604-finance-main .receive b{color:#79d88d}.v604-finance-main .pay b{color:#f28a8a}.v604-finance-tabs{margin-top:12px!important}.v5-central-hero>p,.v568-dna-hero,.v553-finance-head,.v553-month-filter>p{display:none!important}@media(max-width:760px){.main{padding-top:8px!important}.main>.top{min-height:56px!important;margin:4px 0 12px!important;padding:6px 8px!important;border-radius:15px!important}.main>.top .v555-header-mark{width:48px!important;height:38px!important;flex-basis:48px!important}.main>.top .v604-brand-symbol{width:45px!important;height:35px!important}.main>.topactions{gap:5px!important}.main>.topactions .v5-top-btn,.main>.topactions .bell{width:38px!important;height:38px!important}.v604-finance-snapshot{grid-template-columns:1fr 1fr!important;gap:8px!important}.v604-finance-snapshot article{min-height:82px;padding:14px!important}.v604-finance-snapshot span{font-size:9px!important}.v604-finance-snapshot b{font-size:22px!important}.v604-finance-command{align-items:center}.v604-finance-command input{max-width:158px}.v604-finance-command .btn{width:auto!important;min-height:43px}.v604-finance-main{grid-template-columns:1fr 1fr!important;gap:8px!important}.v604-finance-main article{min-height:105px;padding:14px!important}.v604-finance-main article span{font-size:9px!important}.v604-finance-main article b{font-size:21px!important}.v604-finance-tabs{overflow:auto}.v604-finance-tabs .v5-finance-tabs{min-width:max-content}}`;document.head.appendChild(v604CoreStyle);applyOfficialBrandV555();
// ===== FIM COLAB V6.04 CORE =====

// ===== COLAB V6.04 — DEMANDAS COMO CENTRAL DE EXECUÇÃO =====
let taskViewV604='mine';
function taskStatusLabelV604(status){return({todo:'A fazer',doing:'Em andamento',approval:'Aguardando',done:'Concluída'})[status]||'A fazer'}
function taskOriginV604(task){if(task.service==='social_media')return'Conteúdo';if(task.service==='storymaker')return'Evento';if(task.service==='trafego')return'Tráfego';if(task.service==='identidade_visual')return'Identidade';if(task.client_id)return'Cliente';return'Colab'}
function taskDueV604(task){if(!task.due_date)return'Sem prazo';let diff=taskDayDiffV5(task);if(diff<0)return`Atrasada · ${fmtDate(task.due_date)}`;if(diff===0)return'Hoje';if(diff===1)return'Amanhã';return fmtDate(task.due_date)}
function taskCardV604(task){let mine=task.assigned_to===S.user?.id,owner=profile(task.assigned_to)?.display_name||'Sem responsável',client=cl(task.client_id)?.name||'Colab',late=task.status!=='done'&&task.due_date&&task.due_date<today();return `<article class="v604-task-card ${mine?'mine':''} ${late?'late':''}" data-taskopen="${task.id}"><div class="v604-task-meta"><span>${E(taskOriginV604(task))}</span><em>${E(client)}</em>${mine?'<strong>COM VOCÊ</strong>':''}</div><h3>${E(task.title)}</h3><div class="v604-task-foot"><span><b>${E(owner)}</b><small>${E(taskDueV604(task))}</small></span><select data-v604-taskstatus="${task.id}" aria-label="Status da demanda"><option value="todo" ${task.status==='todo'?'selected':''}>A fazer</option><option value="doing" ${task.status==='doing'?'selected':''}>Em andamento</option><option value="approval" ${task.status==='approval'?'selected':''}>Aguardando</option><option value="done" ${task.status==='done'?'selected':''}>Concluída</option></select></div>${task.priority==='urgent'||task.priority==='high'?`<i class="v604-priority ${task.priority}">${task.priority==='urgent'?'URGENTE':'ALTA PRIORIDADE'}</i>`:''}</article>`}
function workflowActionsV604(){if(typeof workflowStageV583!=='function')return[];return (D.contents||[]).map(content=>{let work=(D.teamWorkflow||[]).find(row=>row.content_id===content.id);if(!work)return null;let stage=workflowStageV583(work),owner=typeof workflowPremiumOwnerV594==='function'?workflowPremiumOwnerV594(content):(work.assigned_to||work.design_owner_id||work.reviewer_id);if(owner!==S.user?.id||['scheduled','published'].includes(stage))return null;let next=work.next_action||(typeof workflowNextActionV591==='function'?workflowNextActionV591(content,stage):'Abrir conteúdo');return{content,work,stage,next}}).filter(Boolean)}
function workflowActionCardV604(row){let client=cl(row.content.client_id)?.name||'Cliente',stage=typeof workflowPremiumStageLabelV594==='function'?workflowPremiumStageLabelV594(row.content):taskStatusLabelV604(row.stage);return `<button class="v604-work-action" data-v604-workflow="${row.content.id}" data-client="${row.content.client_id}"><span><small>${E(stage)} · ${E(client)}</small><b>${E(row.next)}</b><em>${E(row.content.title||'Conteúdo')}</em></span><strong>→</strong></button>`}
function tasksAttentionV604(open){let late=open.filter(row=>row.due_date&&row.due_date<today()).length,todayN=open.filter(row=>row.due_date===today()).length,waiting=open.filter(row=>row.status==='approval').length;return `<div class="v604-task-attention"><span class="${late?'hot':''}"><b>${late}</b> atrasadas</span><span><b>${todayN}</b> vencem hoje</span><span><b>${waiting}</b> aguardando</span></div>`}
function tasksKanbanV604(rows){let lanes=[['todo','A fazer'],['doing','Em andamento'],['approval','Aguardando'],['done','Concluído']];return `<div class="v604-task-kanban-scroll"><div class="v604-task-kanban">${lanes.map(([status,label])=>{let list=rows.filter(row=>row.status===status).slice(0,status==='done'?12:99);return `<section class="v604-task-lane ${status}"><header><div><i></i><b>${label}</b></div><span>${list.length}</span></header><div>${list.map(taskCardV604).join('')||'<div class="v604-task-empty">Nenhuma demanda</div>'}</div></section>`}).join('')}</div></div>`}
tasksPage=function(){let all=sortedTasksV5(D.tasks||[]),open=all.filter(row=>row.status!=='done'),mine=open.filter(row=>row.assigned_to===S.user?.id),workflowMine=workflowActionsV604(),urgent=open.filter(row=>row.priority==='urgent').length,waiting=open.filter(row=>row.status==='approval').length,done=all.filter(row=>row.status==='done'),otherCount=open.filter(row=>row.assigned_to&&row.assigned_to!==S.user?.id).length;let content='';if(taskViewV604==='mine')content=`${workflowMine.length?`<section class="v604-workflow-actions"><div class="v604-section-head"><div><small>DO WORKFLOW</small><h3>Também depende de você</h3></div><span>${workflowMine.length}</span></div><div>${workflowMine.slice(0,6).map(workflowActionCardV604).join('')}</div></section>`:''}<section class="v604-my-queue"><div class="v604-section-head"><div><small>MINHA FILA</small><h3>${mine.length?`${mine.length} ${mine.length===1?'demanda':'demandas'} para executar`:'Sua fila está livre'}</h3></div></div><div class="v604-task-grid">${mine.map(taskCardV604).join('')||'<div class="v604-task-clear"><b>✓</b><span>Nenhuma demanda manual está com você agora.</span></div>'}</div></section>`;else if(taskViewV604==='team')content=tasksKanbanV604(all);else content=`<div class="v604-task-grid done">${done.map(taskCardV604).join('')||'<div class="v604-task-clear"><b>✓</b><span>Nenhuma demanda concluída ainda.</span></div>'}</div>`;return `<section class="v604-task-shell"><div class="v604-task-command"><div class="v604-task-tabs"><button class="${taskViewV604==='mine'?'on':''}" data-v604-taskview="mine">Minha vez <span>${mine.length+workflowMine.length}</span></button><button class="${taskViewV604==='team'?'on':''}" data-v604-taskview="team">Equipe <span>${open.length}</span></button><button class="${taskViewV604==='done'?'on':''}" data-v604-taskview="done">Concluídas</button></div><button class="btn pri" data-m="taskQuickV5">＋ Nova demanda</button></div><section class="v604-queue-radar"><article class="main"><small>COM VOCÊ AGORA</small><b>${mine.length+workflowMine.length}</b><span>demandas + ações do workflow</span></article><article><small>URGENTES</small><b>${urgent}</b></article><article><small>AGUARDANDO</small><b>${waiting}</b></article><article><small>COM A EQUIPE</small><b>${otherCount}</b></article></section>${tasksAttentionV604(open)}${content}</section>`};
function openWorkflowFromDemandV604(clientId,contentId){clientHubIdV5=clientId;clientHubTabsV563[clientId]='workflow';V='clientHub';MD=null;render();setTimeout(()=>{let el=document.querySelector(`[data-contentopen="${contentId}"]`);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>el.click(),180)}},80)}
const _bindV604TasksBase=bind;
bind=function(){_bindV604TasksBase();document.querySelectorAll('[data-v604-taskview]').forEach(button=>button.onclick=()=>{taskViewV604=button.dataset.v604Taskview;render()});document.querySelectorAll('[data-v604-workflow]').forEach(button=>button.onclick=()=>openWorkflowFromDemandV604(button.dataset.client,button.dataset.v604Workflow));document.querySelectorAll('[data-v604-taskstatus]').forEach(select=>{select.onclick=e=>e.stopPropagation();select.onchange=async e=>{e.stopPropagation();try{await patch('tasks',select.dataset.v604Taskstatus,{status:select.value,updated_at:new Date().toISOString()});await load();render();toast('Demanda atualizada')}catch(error){toast(error.message)}}})};
const _homePageV604ActionBase=homePage;
homePage=function(){let html=_homePageV604ActionBase(),mine=sortedTasksV5((D.tasks||[]).filter(row=>row.status!=='done'&&row.assigned_to===S.user?.id)).slice(0,3),flows=workflowActionsV604().slice(0,2);if(!mine.length&&!flows.length)return html;let section=`<section class="v604-home-turn"><div class="v604-section-head"><div><small>SUA VEZ AGORA</small><h3>O que depende de você</h3></div><button class="btn ghost small" data-v="tasks">Abrir demandas</button></div><div>${flows.map(workflowActionCardV604).join('')}${mine.map(task=>`<button class="v604-home-task" data-taskopen="${task.id}"><span><small>${E(cl(task.client_id)?.name||'Colab')} · ${E(taskOriginV604(task))}</small><b>${E(task.title)}</b></span><em>${E(taskDueV604(task))}</em></button>`).join('')}</div></section>`;return html.replace('</section>','</section>'+section)};
const v604TasksStyle=document.createElement('style');v604TasksStyle.textContent=`.v604-task-shell{display:grid;gap:13px}.v604-task-command{display:flex;align-items:center;justify-content:space-between;gap:12px}.v604-task-tabs{display:flex;gap:6px;padding:4px;border:1px solid #2a2a2a;border-radius:14px;background:#101010}.v604-task-tabs button{display:flex;align-items:center;gap:7px;min-height:38px;padding:8px 12px;border:0;border-radius:10px;background:transparent;color:#777;font-size:10px;font-weight:900}.v604-task-tabs button.on{background:#24150d;color:#fff;box-shadow:inset 0 0 0 1px #5b311b}.v604-task-tabs button span{display:grid;place-items:center;min-width:19px;height:19px;padding:0 5px;border-radius:99px;background:#282828;color:#aaa;font-size:8px}.v604-task-tabs button.on span{background:#ff6a00;color:#fff}.v604-queue-radar{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:8px}.v604-queue-radar article{min-height:95px;padding:14px;border:1px solid #2b2b2b;border-radius:15px;background:#121212}.v604-queue-radar article.main{border-color:#55301c;background:radial-gradient(circle at 95% 0,rgba(255,106,0,.15),transparent 44%),#17110e}.v604-queue-radar small{display:block;color:#696969;font-size:7px;font-weight:950;letter-spacing:.12em}.v604-queue-radar b{display:block;margin-top:7px;font-size:27px}.v604-queue-radar span{display:block;margin-top:3px;color:#6f6f6f;font-size:8px}.v604-task-attention{display:flex;gap:7px;overflow:auto}.v604-task-attention span{flex:0 0 auto;padding:7px 10px;border:1px solid #2c2c2c;border-radius:999px;background:#111;color:#777;font-size:8px}.v604-task-attention span.hot{border-color:#5b2727;color:#e78686}.v604-task-attention b{color:#fff}.v604-section-head{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-bottom:9px}.v604-section-head small{display:block;color:#ff7430;font-size:7px;font-weight:950;letter-spacing:.13em}.v604-section-head h3{margin:4px 0 0;font-size:20px}.v604-section-head>span{display:grid;place-items:center;min-width:30px;height:30px;border-radius:99px;background:#ff6a00;color:#fff;font-weight:950}.v604-workflow-actions{padding:15px;border:1px solid #4a2b19;border-radius:18px;background:linear-gradient(145deg,#1a120e,#111)}.v604-workflow-actions>div:last-child{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.v604-work-action{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;padding:13px;border:1px solid #303030;border-radius:13px;background:#111;color:#fff;text-align:left}.v604-work-action small,.v604-work-action b,.v604-work-action em{display:block}.v604-work-action small{color:#ff8040;font-size:7px;font-weight:900}.v604-work-action b{margin-top:5px;font-size:12px}.v604-work-action em{margin-top:4px;overflow:hidden;color:#777;font-size:8px;font-style:normal;text-overflow:ellipsis;white-space:nowrap}.v604-work-action>strong{color:#ff7430;font-size:18px}.v604-my-queue{padding-top:2px}.v604-task-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.v604-task-card{position:relative;min-width:0;padding:14px;border:1px solid #2d2d2d;border-radius:15px;background:#131313;color:#fff;cursor:pointer}.v604-task-card.mine{border-color:#49301f}.v604-task-card.late{border-color:#663030;background:linear-gradient(145deg,#211010,#131313)}.v604-task-meta{display:flex;align-items:center;gap:5px;min-width:0}.v604-task-meta>span,.v604-task-meta>em,.v604-task-meta>strong{padding:4px 6px;border-radius:999px;font-size:6px;font-style:normal;font-weight:950;letter-spacing:.06em}.v604-task-meta>span{background:#22150e;color:#ff8140}.v604-task-meta>em{overflow:hidden;background:#1d1d1d;color:#777;text-overflow:ellipsis;white-space:nowrap}.v604-task-meta>strong{margin-left:auto;background:#ff6a00;color:#fff}.v604-task-card h3{min-height:38px;margin:11px 0 13px;font-size:14px;line-height:1.32}.v604-task-foot{display:flex;align-items:end;justify-content:space-between;gap:10px;border-top:1px solid #292929;padding-top:10px}.v604-task-foot span b,.v604-task-foot span small{display:block}.v604-task-foot span b{font-size:8px}.v604-task-foot span small{margin-top:4px;color:#777;font-size:8px}.v604-task-foot select{max-width:128px;min-height:34px;padding:6px 8px;border:1px solid #313131;border-radius:9px;background:#0d0d0d;color:#aaa;font-size:8px}.v604-priority{position:absolute;right:12px;top:-7px;padding:4px 7px;border-radius:99px;background:#4d2714;color:#ff9b63;font-size:6px;font-style:normal;font-weight:950}.v604-priority.urgent{background:#5a1f1f;color:#ff9b9b}.v604-task-clear{grid-column:1/-1;display:flex;align-items:center;gap:11px;padding:18px;border:1px dashed #303030;border-radius:15px;color:#777}.v604-task-clear b{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#172019;color:#73d68b}.v604-task-kanban-scroll{overflow:auto;padding-bottom:5px}.v604-task-kanban{display:grid;grid-template-columns:repeat(4,minmax(260px,1fr));gap:9px;min-width:1080px}.v604-task-lane{align-self:start;border:1px solid #292929;border-radius:17px;background:#0f0f0f;overflow:hidden}.v604-task-lane>header{display:flex;align-items:center;justify-content:space-between;padding:12px 13px;border-bottom:1px solid #292929;background:#141414}.v604-task-lane>header>div{display:flex;align-items:center;gap:8px}.v604-task-lane>header i{width:7px;height:7px;border-radius:50%;background:#666}.v604-task-lane.doing>header i{background:#ff6a00}.v604-task-lane.approval>header i{background:#9a76dc}.v604-task-lane.done>header i{background:#6ccf84}.v604-task-lane>header b{font-size:10px}.v604-task-lane>header span{color:#777;font-size:9px}.v604-task-lane>div{display:grid;gap:7px;padding:9px}.v604-task-lane .v604-task-card{padding:12px}.v604-task-empty{padding:18px 10px;color:#555;font-size:8px;text-align:center}.v604-home-turn{margin-top:14px;padding:16px;border:1px solid #4b2c1b;border-radius:18px;background:radial-gradient(circle at 95% 0,rgba(255,106,0,.12),transparent 38%),#14110f}.v604-home-turn>div:last-child{display:grid;gap:7px}.v604-home-task{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 12px;border:1px solid #2d2d2d;border-radius:12px;background:#101010;color:#fff;text-align:left}.v604-home-task small,.v604-home-task b{display:block}.v604-home-task small{color:#777;font-size:7px}.v604-home-task b{margin-top:4px;font-size:11px}.v604-home-task em{color:#ff8242;font-size:8px;font-style:normal;white-space:nowrap}@media(max-width:760px){.v604-task-command{align-items:stretch;flex-direction:column}.v604-task-command>.btn{width:100%!important;min-height:46px}.v604-task-tabs{width:100%;overflow:auto}.v604-task-tabs button{flex:1;justify-content:center;min-width:max-content;font-size:11px}.v604-queue-radar{grid-template-columns:1fr 1fr}.v604-queue-radar article{min-height:84px;padding:12px}.v604-queue-radar article.main{grid-column:1/-1;min-height:92px}.v604-queue-radar b{font-size:25px}.v604-workflow-actions{padding:13px}.v604-workflow-actions>div:last-child{grid-template-columns:1fr}.v604-work-action{min-height:77px;padding:13px}.v604-work-action small{font-size:8px}.v604-work-action b{font-size:13px}.v604-work-action em{font-size:9px}.v604-task-grid{grid-template-columns:1fr}.v604-task-card{padding:15px}.v604-task-card h3{min-height:0;font-size:16px;margin:12px 0 14px}.v604-task-meta>span,.v604-task-meta>em,.v604-task-meta>strong{font-size:7px}.v604-task-foot span b,.v604-task-foot span small{font-size:9px}.v604-task-foot select{min-height:38px;max-width:145px;font-size:9px}.v604-task-kanban{display:flex;min-width:0;gap:9px}.v604-task-lane{flex:0 0 83vw;scroll-snap-align:start}.v604-task-kanban-scroll{scroll-snap-type:x mandatory}.v604-home-turn{padding:14px}.v604-home-task b{font-size:12px}.v604-home-task small,.v604-home-task em{font-size:8px}}`;document.head.appendChild(v604TasksStyle);
// ===== FIM COLAB V6.04 DEMANDAS =====

// ===== COLAB V6.04 — CENTRAL, BIBLIOTECA, DNA E MURAL =====
morePage=function(){let tools=[['commercial','COMERCIAL','Oportunidades','Propostas e próximos passos','↗'],['mural','EQUIPE','Mural Colab','Recados rápidos entre a equipe','✦'],['dna','COLAB','DNA Colab','Marca, estratégia e movimentos','CO'],['templatesV5','PROCESSOS','Briefings & onboardings','Modelos mestres reutilizáveis','▤'],['libraryV5','ARQUIVOS','Biblioteca Colab','Documentos, links e pastas','▧'],['goals','GESTÃO','Planejamento & metas','Direção e evolução da agência','◎']];return `<section class="v604-central"><div class="v604-page-title"><small>CENTRAL</small><h2>Ferramentas da Colab</h2></div><div class="v604-central-grid">${tools.map(([view,ey,title,desc,icon])=>`<button class="v604-central-card" data-v="${view}"><span>${icon}</span><div><small>${ey}</small><h3>${title}</h3><p>${desc}</p></div><em>›</em></button>`).join('')}</div><details class="v604-system-admin"><summary><span><small>SISTEMA</small><b>Administração</b></span><em>›</em></summary><div><button data-v="access"><b>Equipe & acessos</b><span>›</span></button><button data-v="settingsV5"><b>Configurações</b><span>›</span></button></div></details></section>`};
let libraryViewV604='root',libraryClientV604='',libraryQueryV604='';
function libraryItemCardV604(item){let client=item.client_id?cl(item.client_id)?.name:'Colab',kind=libraryCategoryLabelV5(item.category);return `<article class="v604-library-item" data-v604-library-item="${E((item.title+' '+kind+' '+(client||'')+' '+(item.notes||'')).toLowerCase())}"><span>${item.category==='drive_root'?'D':item.category==='contract'?'§':item.category==='payment_receipt'?'R$':item.category==='brand'?'CO':'▧'}</span><div><small>${E(kind)}${client?' · '+E(client):''}</small><h3>${E(item.title)}</h3>${item.notes?`<p>${E(item.notes)}</p>`:''}</div><div class="actions"><a class="btn pri small" href="${E(item.url)}" target="_blank" rel="noopener">Abrir ↗</a><button class="btn ghost small" data-librarydelete="${item.id}">Excluir</button></div></article>`}
function libraryFolderV604(view,title,count,icon,sub=''){return `<button class="v604-library-folder" data-v604-library-view="${view}"><span>${icon}</span><div><small>${count} ${count===1?'item':'itens'}</small><h3>${title}</h3>${sub?`<p>${sub}</p>`:''}</div><em>›</em></button>`}
libraryPageV5=function(){let all=D.internalLibrary||[],internal=all.filter(row=>!row.client_id),clientRows=all.filter(row=>row.client_id),financeRows=all.filter(row=>['contract','payment_receipt'].includes(row.category)),adminRows=all.filter(row=>row.category==='admin'),body='';if(libraryQueryV604){let q=libraryQueryV604.toLowerCase(),rows=all.filter(row=>(row.title+' '+libraryCategoryLabelV5(row.category)+' '+(cl(row.client_id)?.name||'Colab')+' '+(row.notes||'')).toLowerCase().includes(q));body=`<div class="v604-library-path"><button data-v604-library-clear>← Biblioteca</button><b>Resultados para “${E(libraryQueryV604)}”</b></div><div class="v604-library-list">${rows.map(libraryItemCardV604).join('')||'<div class="v604-library-empty">Nenhum arquivo encontrado.</div>'}</div>`}else if(libraryViewV604==='root')body=`<div class="v604-library-folders">${libraryFolderV604('colab','Colab',internal.filter(row=>!['contract','payment_receipt','admin'].includes(row.category)).length,'CO','Marca e arquivos internos')}${libraryFolderV604('clients','Clientes',clientRows.length,'◎','Pastas por cliente')}${libraryFolderV604('finance','Contratos & financeiro',financeRows.length,'R$','Contratos e comprovantes')}${libraryFolderV604('admin','Administrativo',adminRows.length,'▦','Documentos da operação')}</div><section class="v604-library-recent"><div class="v604-section-head"><div><small>RECENTES</small><h3>Últimos arquivos</h3></div></div><div class="v604-library-list">${all.slice(0,6).map(libraryItemCardV604).join('')||'<div class="v604-library-empty">Adicione o primeiro link ou pasta.</div>'}</div></section>`;else if(libraryViewV604==='clients'&&!libraryClientV604){let clients=(D.clients||[]).filter(row=>row.active);body=`<div class="v604-library-path"><button data-v604-library-view="root">← Biblioteca</button><b>Clientes</b></div><div class="v604-client-folders">${clients.map(client=>{let count=clientRows.filter(row=>row.client_id===client.id).length;return `<button data-v604-library-client="${client.id}"><span>${E(client.initials||ini(client.name))}</span><div><h3>${E(client.name)}</h3><small>${count} ${count===1?'arquivo':'arquivos'}</small></div><em>›</em></button>`}).join('')}</div>`}else if(libraryViewV604==='clients'&&libraryClientV604){let client=cl(libraryClientV604),rows=clientRows.filter(row=>row.client_id===libraryClientV604);body=`<div class="v604-library-path"><button data-v604-library-client="">← Clientes</button><b>${E(client?.name||'Cliente')}</b><button class="btn pri small" data-librarynew-client="${libraryClientV604}">＋ Adicionar</button></div><div class="v604-library-list">${rows.map(libraryItemCardV604).join('')||'<div class="v604-library-empty">Nenhum arquivo nesta pasta.</div>'}</div>`}else{let rows=libraryViewV604==='finance'?financeRows:libraryViewV604==='admin'?adminRows:internal.filter(row=>!['contract','payment_receipt','admin'].includes(row.category)),title=libraryViewV604==='finance'?'Contratos & financeiro':libraryViewV604==='admin'?'Administrativo':'Colab';body=`<div class="v604-library-path"><button data-v604-library-view="root">← Biblioteca</button><b>${title}</b></div><div class="v604-library-list">${rows.map(libraryItemCardV604).join('')||'<div class="v604-library-empty">Nenhum arquivo nesta pasta.</div>'}</div>`}return `<section class="v604-library"><div class="v604-library-command"><form id="v604LibrarySearch"><input name="q" value="${E(libraryQueryV604)}" placeholder="Buscar arquivo, cliente ou categoria"><button class="btn ghost">Buscar</button></form><button class="btn pri" data-m="libraryNewV5">＋ Adicionar</button></div>${body}</section>`};
function dnaMaterialCardV604(item){let kind=dnaMaterialKindV554(item);return `<article class="v604-dna-material"><span>${E(kind.icon)}</span><div><small>${E(kind.label)}</small><h3>${E(item.title)}</h3></div><div class="actions"><a class="btn pri small" href="${E(item.url)}" target="_blank" rel="noopener">Abrir ↗</a><button class="btn ghost small" data-librarydelete="${item.id}">Excluir</button></div></article>`}
dnaPage=function(){let items=D.dnaItems||[],parts=D.partnerships||[],labs=D.labItems||[],strat=items.filter(row=>row.category==='strategy'),campaigns=items.filter(row=>row.category==='campaign'),brandItems=(D.internalLibrary||[]).filter(row=>!row.client_id&&['brand','materials','drive_root','other'].includes(row.category));return `<section class="v604-dna"><div class="v604-page-title"><small>DNA COLAB</small><h2>Nossa base</h2></div><nav class="v604-dna-nav"><a href="#v604-dna-brand">Marca</a><a href="#v604-dna-strategy">Estratégia</a><a href="#v604-dna-campaigns">Campanhas</a><a href="#v604-dna-partners">Parcerias</a><a href="#v604-dna-lab">Lab</a></nav><section class="v604-dna-block" id="v604-dna-brand"><div class="v604-block-head"><h3>Marca</h3><button class="btn pri small" data-dna-library-new-v554>＋ Material</button></div><div class="v604-dna-materials">${brandItems.map(dnaMaterialCardV604).join('')||'<div class="v604-library-empty">Adicione logo, Canva e materiais oficiais.</div>'}</div></section><div class="v604-dna-pair"><section class="v604-dna-block" id="v604-dna-strategy"><div class="v604-block-head"><h3>Estratégia</h3><button class="btn ghost small" data-m="dnaItemNew" data-category="strategy">＋</button></div>${strat.map(dnaItemRow).join('')||'<div class="v604-mini-empty">Nenhum direcionamento cadastrado.</div>'}</section><section class="v604-dna-block" id="v604-dna-campaigns"><div class="v604-block-head"><h3>Campanhas</h3><button class="btn ghost small" data-m="dnaItemNew" data-category="campaign">＋</button></div>${campaigns.map(dnaItemRow).join('')||'<div class="v604-mini-empty">Nenhuma campanha ativa.</div>'}</section></div><section class="v604-dna-block" id="v604-dna-partners"><div class="v604-block-head"><h3>Parcerias</h3><button class="btn ghost small" data-m="partnershipNew">＋ Parceria</button></div>${parts.map(row=>`<div class="v604-dna-row"><div><b>${E(row.name)}</b><small>${E(row.category||'Parceiro')}${row.next_action?' · '+E(row.next_action):''}</small></div><select data-partstage="${row.id}"><option value="mapped" ${row.stage==='mapped'?'selected':''}>Mapeada</option><option value="talking" ${row.stage==='talking'?'selected':''}>Conversando</option><option value="aligned" ${row.stage==='aligned'?'selected':''}>Alinhada</option><option value="active" ${row.stage==='active'?'selected':''}>Ativa</option><option value="paused" ${row.stage==='paused'?'selected':''}>Pausada</option></select></div>`).join('')||'<div class="v604-mini-empty">Nenhuma parceria cadastrada.</div>'}</section><section class="v604-dna-block" id="v604-dna-lab"><div class="v604-block-head"><h3>Lab</h3><button class="btn pri small" data-m="labItemNew">＋ Experimento</button></div>${labs.map(row=>`<div class="v604-dna-row"><div><b>${E(row.title)}</b><small>${E(row.area||'Lab')}${row.hypothesis?' · '+E(row.hypothesis):''}</small></div><select data-labstatus="${row.id}"><option value="idea" ${row.status==='idea'?'selected':''}>Ideia</option><option value="testing" ${row.status==='testing'?'selected':''}>Testando</option><option value="worked" ${row.status==='worked'?'selected':''}>Funcionou</option><option value="didnt_work" ${row.status==='didnt_work'?'selected':''}>Não funcionou</option><option value="standard" ${row.status==='standard'?'selected':''}>Padrão Colab</option></select></div>`).join('')||'<div class="v604-mini-empty">Nenhum experimento em andamento.</div>'}</section></section>`};
muralPage=function(){let active=(D.muralNotes||[]).filter(row=>!row.resolved);return `<section class="v604-mural">${teamStatusStrip()}<div class="v604-mural-command"><div><small>MURAL</small><h2>Post-its da equipe</h2></div><details class="mural-create v604-postit-create"><summary>＋ Post-it</summary><form id="muralForm" class="mural-form"><div class="field"><label>Recado</label><textarea name="body" rows="3" maxlength="500" required placeholder="Escreva o recado..."></textarea></div><div class="formgrid"><div class="field"><label>Para</label><select name="recipient_id"><option value="">Todo mundo</option>${(D.profiles||[]).map(p=>`<option value="${p.user_id}">${E(p.display_name)}</option>`).join('')}</select></div><details class="v604-postit-options"><summary>Personalizar</summary><div><label>Adesivo</label><select name="emoji">${['🧡','👀','💡','😂','🚨','✨','💥','🎬','☕'].map(x=>`<option value="${x}">${x}</option>`).join('')}</select><label>Cor</label><select name="style"><option value="orange">Laranja</option><option value="light">Claro</option><option value="dark">Preto</option><option value="outline">Contorno</option></select></div></details></div><button class="btn pri">Colar no mural</button></form></details></div><div class="v604-mural-board">${active.map(muralNoteCard).join('')||'<div class="v604-mural-empty"><b>Mural livre.</b><span>Cole o primeiro post-it.</span></div>'}</div></section>`};
const _bindV604CentralBase=bind;
bind=function(){_bindV604CentralBase();document.querySelectorAll('[data-v604-library-view]').forEach(button=>button.onclick=()=>{libraryViewV604=button.dataset.v604LibraryView;libraryClientV604='';libraryQueryV604='';render()});document.querySelectorAll('[data-v604-library-client]').forEach(button=>button.onclick=()=>{libraryViewV604='clients';libraryClientV604=button.dataset.v604LibraryClient||'';libraryQueryV604='';render()});document.querySelector('[data-v604-library-clear]')?.addEventListener('click',()=>{libraryQueryV604='';libraryViewV604='root';libraryClientV604='';render()});document.getElementById('v604LibrarySearch')?.addEventListener('submit',event=>{event.preventDefault();libraryQueryV604=String(new FormData(event.currentTarget).get('q')||'').trim();render()})};
const v604CentralStyle=document.createElement('style');v604CentralStyle.textContent=`.v604-page-title{margin:2px 2px 14px}.v604-page-title small{display:block;color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.14em}.v604-page-title h2{margin:4px 0 0;font-size:28px}.v604-central-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v604-central-card{display:grid;grid-template-columns:48px minmax(0,1fr) 28px;align-items:center;gap:13px;min-height:92px;padding:15px;border:1px solid #2d2d2d;border-radius:17px;background:#131313;color:#fff;text-align:left}.v604-central-card:hover{border-color:#51301f;background:#17130f}.v604-central-card>span{display:grid;place-items:center;width:48px;height:48px;border:1px solid #4b2b19;border-radius:14px;background:#21140d;color:#ff7a34;font-size:11px;font-weight:950}.v604-central-card small{display:block;color:#686868;font-size:7px;font-weight:950;letter-spacing:.11em}.v604-central-card h3{margin:4px 0 3px;font-size:15px}.v604-central-card p{margin:0;color:#777;font-size:9px}.v604-central-card em{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#1d1d1d;color:#ff7430;font-size:19px;font-style:normal}.v604-system-admin{margin-top:12px;border:1px solid #282828;border-radius:15px;background:#101010}.v604-system-admin>summary{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;list-style:none}.v604-system-admin>summary small,.v604-system-admin>summary b{display:block}.v604-system-admin>summary small{color:#666;font-size:7px;font-weight:900}.v604-system-admin>summary b{margin-top:3px;font-size:11px}.v604-system-admin>summary em{color:#666;font-style:normal}.v604-system-admin>div{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:0 10px 10px}.v604-system-admin>div button{display:flex;align-items:center;justify-content:space-between;min-height:44px;padding:10px 12px;border:1px solid #292929;border-radius:11px;background:#151515;color:#aaa;text-align:left}.v604-library{display:grid;gap:13px}.v604-library-command{display:flex;align-items:center;justify-content:space-between;gap:10px}.v604-library-command form{display:flex;flex:1;max-width:600px;gap:7px}.v604-library-command input{flex:1;min-width:0;min-height:43px;padding:9px 12px;border:1px solid #303030;border-radius:12px;background:#101010;color:#fff}.v604-library-folders{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v604-library-folder{display:grid;grid-template-columns:50px 1fr 25px;align-items:center;gap:12px;min-height:105px;padding:15px;border:1px solid #2c2c2c;border-radius:17px;background:#131313;color:#fff;text-align:left}.v604-library-folder>span{display:grid;place-items:center;width:50px;height:50px;border-radius:14px;background:#21150e;color:#ff7b34;font-size:12px;font-weight:950}.v604-library-folder small{color:#666;font-size:7px}.v604-library-folder h3{margin:4px 0 2px;font-size:15px}.v604-library-folder p{margin:0;color:#707070;font-size:8px}.v604-library-folder em{color:#ff7430;font-size:20px;font-style:normal}.v604-library-recent{margin-top:3px}.v604-library-path{display:flex;align-items:center;gap:10px;min-height:46px;padding-bottom:3px;border-bottom:1px solid #272727}.v604-library-path>button:not(.btn){padding:7px 9px;border:1px solid #2f2f2f;border-radius:9px;background:#111;color:#aaa}.v604-library-path>b{font-size:13px}.v604-library-path>.btn{margin-left:auto}.v604-client-folders{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.v604-client-folders>button{display:grid;grid-template-columns:44px 1fr 22px;align-items:center;gap:11px;min-height:76px;padding:12px;border:1px solid #2c2c2c;border-radius:14px;background:#131313;color:#fff;text-align:left}.v604-client-folders>button>span{display:grid;place-items:center;width:44px;height:44px;border-radius:13px;background:#ff6a00;color:#fff;font-size:10px;font-weight:950}.v604-client-folders h3{margin:0;font-size:13px}.v604-client-folders small{display:block;margin-top:4px;color:#6f6f6f;font-size:8px}.v604-client-folders em{color:#ff7430;font-size:18px;font-style:normal}.v604-library-list{display:grid;gap:7px}.v604-library-item{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:11px;padding:12px;border:1px solid #2b2b2b;border-radius:14px;background:#121212}.v604-library-item>span{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:#21150e;color:#ff7b34;font-size:9px;font-weight:950}.v604-library-item small{display:block;color:#6b6b6b;font-size:7px;font-weight:850}.v604-library-item h3{margin:4px 0 0;font-size:12px}.v604-library-item p{margin:4px 0 0;color:#737373;font-size:8px}.v604-library-empty,.v604-mini-empty{padding:17px;border:1px dashed #303030;border-radius:13px;color:#666;font-size:9px}.v604-dna{display:grid;gap:11px}.v604-dna-nav{display:flex;gap:6px;overflow:auto;padding-bottom:2px}.v604-dna-nav a{flex:0 0 auto;padding:8px 11px;border:1px solid #303030;border-radius:999px;background:#111;color:#aaa;font-size:8px;font-weight:900;text-decoration:none}.v604-dna-nav a:first-child{border-color:#57301b;color:#ff8646}.v604-dna-block{scroll-margin-top:16px;padding:16px;border:1px solid #2c2c2c;border-radius:17px;background:#121212}.v604-block-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:11px}.v604-block-head h3{margin:0;font-size:18px}.v604-dna-materials{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.v604-dna-material{display:flex;min-height:145px;flex-direction:column;padding:13px;border:1px solid #2c2c2c;border-radius:14px;background:#0e0e0e}.v604-dna-material>span{display:grid;place-items:center;width:37px;height:37px;border-radius:10px;background:#21140d;color:#ff7b34;font-size:9px;font-weight:950}.v604-dna-material>div:nth-child(2){flex:1}.v604-dna-material small{display:block;margin-top:10px;color:#777;font-size:6px;font-weight:900}.v604-dna-material h3{margin:5px 0 0;font-size:12px}.v604-dna-material .actions{justify-content:flex-start}.v604-dna-pair{display:grid;grid-template-columns:1fr 1fr;gap:9px}.v604-dna-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-top:1px solid #272727}.v604-dna-row:first-of-type{border-top:0}.v604-dna-row b,.v604-dna-row small{display:block}.v604-dna-row b{font-size:11px}.v604-dna-row small{margin-top:4px;color:#6e6e6e;font-size:8px}.v604-dna-row select{max-width:150px;min-height:34px;padding:6px 8px;border:1px solid #303030;border-radius:9px;background:#0c0c0c;color:#aaa;font-size:8px}.v604-mural{display:grid;gap:11px}.v604-mural .team-status-zone,.v604-mural .v555-team-zone{margin:0!important;padding:12px 14px!important;border-radius:16px!important;background:#13110f!important}.v604-mural .team-status-zone .ey,.v604-mural .v555-team-zone .ey{font-size:9px!important;letter-spacing:.12em!important}.v604-mural .status-people,.v604-mural .v555-people-grid{gap:10px!important;padding:9px 0 3px!important}.v604-mural .status-person{min-width:76px!important}.v604-mural .status-bubble,.v604-mural .v555-person .status-bubble{width:48px!important;height:48px!important;border-width:2px!important}.v604-mural .status-bubble>span{width:38px!important;height:38px!important;font-size:13px!important}.v604-mural .status-person>b{font-size:9px!important;margin-top:5px!important}.v604-mural .status-person>small{font-size:7px!important;padding:3px 5px!important}.v604-mural .v555-person{min-height:70px!important;padding:9px!important}.v604-mural .v555-person-copy b{font-size:11px!important}.v604-mural .v555-person-copy strong{font-size:8px!important}.v604-mural-command{display:flex;align-items:end;justify-content:space-between;gap:12px}.v604-mural-command small{color:#ff7430;font-size:7px;font-weight:950;letter-spacing:.14em}.v604-mural-command h2{margin:4px 0 0;font-size:23px}.v604-postit-create{position:relative}.v604-postit-create>summary{padding:9px 12px;border:1px solid #6a3519;border-radius:11px;background:#ff6a00;color:#fff;font-size:9px;font-weight:900;list-style:none}.v604-postit-create .mural-form{position:absolute;right:0;z-index:20;width:min(520px,calc(100vw - 34px));padding:14px;border:1px solid #493020;border-radius:14px;background:#15110f;box-shadow:0 18px 45px rgba(0,0,0,.55)}.v604-postit-options>summary{padding:8px 0;color:#ff7b34;font-size:8px;font-weight:900}.v604-postit-options>div{display:grid;grid-template-columns:1fr 1fr;gap:7px}.v604-postit-options label{font-size:7px}.v604-mural-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;min-height:300px;padding:18px;border:1px solid #29251f;border-radius:19px;background:radial-gradient(circle,#2f2a25 1px,transparent 1.2px) 0 0/18px 18px,#100f0e}.v604-mural-board .mural-note{position:relative!important;left:auto!important;top:auto!important;width:auto!important;min-height:175px!important;margin:0!important;transform:rotate(-.8deg);box-shadow:0 12px 28px rgba(0,0,0,.22)!important}.v604-mural-board .mural-note:nth-child(3n+2){transform:rotate(.7deg)}.v604-mural-board .mural-note:nth-child(3n){transform:rotate(-.2deg)}.v604-mural-board .mural-note p{font-size:13px!important;line-height:1.42!important}.v604-mural-empty{grid-column:1/-1;display:grid;place-items:center;align-content:center;min-height:220px;color:#666}.v604-mural-empty b,.v604-mural-empty span{display:block}.v604-mural-empty span{margin-top:5px;font-size:9px}.mural-done{display:none!important}@media(max-width:760px){.v604-page-title{margin-bottom:11px}.v604-page-title h2{font-size:25px}.v604-central-grid{grid-template-columns:1fr;gap:8px}.v604-central-card{grid-template-columns:50px 1fr 28px;min-height:84px;padding:13px}.v604-central-card>span{width:50px;height:50px}.v604-central-card h3{font-size:15px}.v604-central-card p{font-size:9px}.v604-system-admin>div{grid-template-columns:1fr}.v604-library-command{align-items:stretch;flex-direction:column}.v604-library-command form{max-width:none}.v604-library-command>.btn{width:100%!important}.v604-library-folders{grid-template-columns:1fr}.v604-library-folder{min-height:91px;padding:13px}.v604-client-folders{grid-template-columns:1fr}.v604-library-item{grid-template-columns:42px 1fr}.v604-library-item>.actions{grid-column:2;justify-content:flex-start}.v604-library-item h3{font-size:13px}.v604-library-path{flex-wrap:wrap}.v604-dna-materials{grid-template-columns:1fr 1fr}.v604-dna-pair{grid-template-columns:1fr}.v604-dna-block{padding:14px}.v604-dna-material{min-height:132px}.v604-dna-row{align-items:flex-start}.v604-dna-row select{max-width:128px}.v604-mural .team-status-zone,.v604-mural .v555-team-zone{padding:11px!important}.v604-mural .v555-team-head{display:none!important}.v604-mural .v555-people-grid{display:flex!important;overflow:auto!important}.v604-mural .v555-person{min-width:170px!important}.v604-mural-command{align-items:center}.v604-postit-create .mural-form{position:fixed;left:12px;right:12px;bottom:86px;width:auto;max-height:70vh;overflow:auto}.v604-mural-board{grid-template-columns:1fr 1fr;gap:9px;padding:12px;min-height:260px}.v604-mural-board .mural-note{min-height:155px!important;padding:12px!important;border-radius:12px!important}.v604-mural-board .mural-note p{font-size:11px!important}.v604-mural-board .mural-note-foot{font-size:7px!important}.v604-mural-board .mural-note-tools button{width:24px!important;height:24px!important}.v604-mural-empty{min-height:190px}}@media(max-width:390px){.v604-dna-materials{grid-template-columns:1fr}.v604-mural-board{grid-template-columns:1fr 1fr}.v604-mural-board .mural-note{min-height:145px!important}}`;document.head.appendChild(v604CentralStyle);
// ===== FIM COLAB V6.04 CENTRAL =====

// ===== COLAB V6.04 — MODO EVENTO STORYMAKER + POLIMENTO =====
const _storymakerDetailV604Base=storymakerDetailModal;
storymakerDetailModal=function(id){let html=_storymakerDetailV604Base(id),event=(D.events||[]).find(row=>row.id===id),items=(D.storyChecklist||[]).filter(row=>row.event_id===id),briefing=(D.storyBriefings||[]).find(row=>row.event_id===id);if(!html||!event)return html;let done=items.filter(row=>row.completed).length,pct=items.length?Math.round(done/items.length*100):0,date=String(event.starts_at||'').slice(0,10),dateLabel=date===today()?'HOJE':date?fmtDate(date):'EVENTO',anchor=html.indexOf('<section class="story-section">');if(anchor<0)return html;let mode=`<section class="v604-event-mode"><div class="v604-event-mode-head"><div><small>MODO EVENTO · ${E(dateLabel)}</small><h2>${E(event.title||'StoryMaker')}</h2></div><span class="${date===today()?'live':''}">${date===today()?'● AO VIVO':'STORYMAKER'}</span></div><button type="button" class="v604-event-check-main" data-v604-story-scroll="checklist"><span><small>CHECKLIST DO DIA</small><b>${items.length?`${done} de ${items.length} concluídos`:'Gerar checklist pelo briefing'}</b></span><strong>${items.length?pct+'%':'→'}</strong><i><em style="width:${pct}%"></em></i></button><div class="v604-event-quick"><button type="button" data-v604-story-scroll="cronograma">Cronograma</button><button type="button" data-v604-story-scroll="pessoas">Pessoas importantes</button><button type="button" data-v604-story-scroll="referências">Referências</button>${briefing?.submitted_at?`<button type="button" data-v604-sync-checklist="${id}">${items.length?'↻ Atualizar checklist':'＋ Gerar checklist'}</button>`:''}</div></section>`;return html.slice(0,anchor)+mode+html.slice(anchor)};
function storyScrollV604(target){if(target==='checklist'){let el=document.querySelector('.v5-check-summary');if(el)return el.closest('.story-section')?.scrollIntoView({behavior:'smooth',block:'start'})}let terms=target==='cronograma'?['CRONOGRAMA']:target==='pessoas'?['PESSOAS IMPORTANTES','PESSOAS']:['REFERÊNCIAS','TRENDS E INSPIRAÇÕES'];let heads=[...document.querySelectorAll('.modal h3,.modal h4')],head=heads.find(el=>terms.some(term=>el.textContent.toUpperCase().includes(term)));head?.closest('.story-section,.story-op-block')?.scrollIntoView({behavior:'smooth',block:'start'})}
const _bindV604StoryBase=bind;
bind=function(){_bindV604StoryBase();document.querySelectorAll('[data-v604-story-scroll]').forEach(button=>button.onclick=()=>storyScrollV604(button.dataset.v604StoryScroll));document.querySelectorAll('[data-v604-sync-checklist]').forEach(button=>button.onclick=async()=>{let id=button.dataset.v604SyncChecklist,brief=(D.storyBriefings||[]).find(row=>row.event_id===id);if(!brief?.submitted_at)return toast('Finalize o briefing para gerar o checklist.');button.disabled=true;button.textContent='Atualizando...';let changed=await syncStoryChecklistV5(id);if(!changed)toast('Checklist já está atualizado');render()})};
const v604StoryStyle=document.createElement('style');v604StoryStyle.textContent=`.v604-event-mode{position:relative;overflow:hidden;margin:0 0 13px;padding:16px;border:1px solid #5c321b;border-radius:18px;background:radial-gradient(circle at 92% 0,rgba(255,106,0,.18),transparent 35%),linear-gradient(145deg,#1b120d,#101010 64%)}.v604-event-mode-head{display:flex;align-items:start;justify-content:space-between;gap:12px}.v604-event-mode-head small{display:block;color:#ff7b35;font-size:7px;font-weight:950;letter-spacing:.13em}.v604-event-mode-head h2{margin:5px 0 0;font-size:22px}.v604-event-mode-head>span{padding:6px 8px;border:1px solid #383838;border-radius:999px;color:#888;font-size:6px;font-weight:950;letter-spacing:.09em}.v604-event-mode-head>span.live{border-color:#71351a;background:#27160d;color:#ff8d4d}.v604-event-check-main{position:relative;display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;width:100%;margin-top:13px;padding:14px 14px 17px;border:1px solid #6b351a;border-radius:14px;background:#ff6a00;color:#fff;text-align:left;overflow:hidden}.v604-event-check-main small,.v604-event-check-main b{display:block}.v604-event-check-main small{font-size:7px;font-weight:950;letter-spacing:.12em;opacity:.78}.v604-event-check-main b{margin-top:4px;font-size:14px}.v604-event-check-main>strong{font-size:19px}.v604-event-check-main>i{position:absolute;left:0;right:0;bottom:0;height:4px;background:rgba(0,0,0,.18)}.v604-event-check-main>i em{display:block;height:100%;background:#fff;opacity:.9}.v604-event-quick{display:flex;gap:6px;margin-top:8px;overflow:auto}.v604-event-quick button{flex:0 0 auto;padding:8px 10px;border:1px solid #303030;border-radius:10px;background:#111;color:#aaa;font-size:7px;font-weight:900}.v604-event-quick button:last-child{border-color:#51301e;color:#ff8343}.v5-story-check{min-height:64px!important;padding:11px!important;border-radius:12px!important}.v5-story-check>input[type=checkbox]{width:24px!important;height:24px!important;flex:0 0 24px!important}.v5-story-check>div>b{font-size:11px!important;line-height:1.35!important}.v5-story-check>div>small{font-size:8px!important;line-height:1.35!important}.v5-story-check-controls select,.v5-story-check-controls input{min-height:35px!important;font-size:8px!important}.v598-quick small{display:none!important}.v598-month-bar>div>small{display:none!important}.v594-kanban-title>span{display:none!important}@media(max-width:760px){.v604-event-mode{padding:14px;margin-bottom:10px}.v604-event-mode-head h2{font-size:20px}.v604-event-check-main{min-height:72px;padding:14px 13px 18px}.v604-event-check-main b{font-size:15px}.v604-event-quick button{min-height:39px;padding:9px 11px;font-size:8px}.v5-check-group{margin-top:12px!important}.v5-story-check{display:grid!important;grid-template-columns:30px minmax(0,1fr)!important;gap:10px!important;min-height:78px!important;padding:13px!important}.v5-story-check>input[type=checkbox]{width:27px!important;height:27px!important}.v5-story-check>div>b{font-size:13px!important}.v5-story-check>div>small{font-size:9px!important}.v5-story-check-controls{grid-column:2;display:flex!important;gap:6px!important}.v5-story-check-controls select{flex:1;max-width:none!important}.v5-story-check-controls input{width:104px!important}.v598-quick button{min-height:54px!important}}`;document.head.appendChild(v604StoryStyle);
// ===== FIM COLAB V6.04 STORYMAKER =====

// ===== COLAB V6.04 — CLIENTE STORYMAKER ORIENTADO AO EVENTO =====
const _clientHubPageV604StoryBase=clientHubPageV5;
clientHubPageV5=function(clientId){let html=_clientHubPageV604StoryBase(clientId),services=typeof clientActiveServicesV582==='function'?clientActiveServicesV582(clientId):[];if(services.includes('social_media')||!services.includes('storymaker'))return html;let allowed=[['services','Evento'],['forms','Briefing'],['agenda','Agenda'],['tasks','Demandas'],['files','Arquivos'],['finance','Pagamentos'],['history','Histórico']],active=clientHubTabsV563[clientId]||'services';if(!allowed.some(row=>row[0]===active)){active='services';clientHubTabsV563[clientId]='services'}let nav=`<div class="v5-client-tabs v563-client-tabs v604-story-client-tabs" role="tablist">${allowed.map(([key,label])=>`<button type="button" class="${key===active?'on':''}" data-client-tab="${key}">${label}</button>`).join('')}</div><div class="v5-hub-grid v563-client-panes">`;html=html.replace(/<div class="v5-client-tabs v563-client-tabs"[\s\S]*?<\/div>\s*<div class="v5-hub-grid v563-client-panes">/,nav);html=html.replace(/<button[^>]*data-client-tab="more"[^>]*>[\s\S]*?<\/button>/g,'');let events=(D.events||[]).filter(row=>row.client_id===clientId&&row.event_type==='storymaker').sort((a,b)=>String(a.starts_at||'').localeCompare(String(b.starts_at||''))),future=events.find(row=>String(row.starts_at||'').slice(0,10)>=today())||events.at(-1);if(!future)return html;let checks=(D.storyChecklist||[]).filter(row=>row.event_id===future.id),done=checks.filter(row=>row.completed).length,date=String(future.starts_at||'').slice(0,10),launch=`<section class="v604-story-launch"><div><small>PRÓXIMO EVENTO${date===today()?' · HOJE':''}</small><h2>${E(future.title||'StoryMaker')}</h2><span>${date?fmtDate(date):'Data a definir'}${future.location?' · '+E(future.location):''}</span></div><div class="v604-story-launch-check"><small>CHECKLIST</small><b>${checks.length?`${done}/${checks.length}`:'Gerar'}</b></div><button class="btn pri" data-v604-story-open="${future.id}">Abrir modo evento →</button></section>`;let tabsAt=html.indexOf('<div class="v5-client-tabs v563-client-tabs');return tabsAt>0?html.slice(0,tabsAt)+launch+html.slice(tabsAt):launch+html};
const _bindV604StoryClientBase=bind;
bind=function(){_bindV604StoryClientBase();document.querySelectorAll('[data-v604-story-open]').forEach(button=>button.onclick=()=>openStoryEvent(button.dataset.v604StoryOpen))};
const v604StoryClientStyle=document.createElement('style');v604StoryClientStyle.textContent=`.v604-story-launch{display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-items:center;gap:14px;margin:12px 0;padding:16px;border:1px solid #5a321c;border-radius:18px;background:radial-gradient(circle at 90% 0,rgba(255,106,0,.16),transparent 35%),#15110f}.v604-story-launch>div:first-child small{display:block;color:#ff7b35;font-size:7px;font-weight:950;letter-spacing:.13em}.v604-story-launch h2{margin:5px 0 4px;font-size:21px}.v604-story-launch>div:first-child span{color:#777;font-size:9px}.v604-story-launch-check{min-width:72px;padding:9px 11px;border:1px solid #39302a;border-radius:12px;background:#101010;text-align:center}.v604-story-launch-check small,.v604-story-launch-check b{display:block}.v604-story-launch-check small{color:#777;font-size:6px;font-weight:900}.v604-story-launch-check b{margin-top:4px;font-size:16px}.v604-story-client-tabs{margin-top:10px!important}@media(max-width:760px){.v604-story-launch{grid-template-columns:1fr auto;padding:14px;gap:10px}.v604-story-launch h2{font-size:19px}.v604-story-launch>.btn{grid-column:1/-1;width:100%!important;min-height:46px}.v604-story-launch-check{min-width:68px}.v604-story-client-tabs button{font-size:10px!important}}`;document.head.appendChild(v604StoryClientStyle);
// ===== FIM COLAB V6.04 CLIENTE STORYMAKER =====


// ===== COLAB V6.05 — DEMANDAS + ASSINATURA DO TOPO =====
function applyHeaderV605(){
  document.querySelectorAll('.main>.top .ey').forEach(node=>{
    if(!node.querySelector('.v605-brand-word')){
      let mark=node.querySelector('.v555-header-mark');
      if(mark) mark.insertAdjacentHTML('afterend','<span class="v605-brand-word">COLAB</span>');
      else node.insertAdjacentHTML('beforeend','<span class="v605-brand-word">COLAB</span>');
    }
  });
}

const _applyOfficialBrandV605Base=applyOfficialBrandV555;
applyOfficialBrandV555=function(){_applyOfficialBrandV605Base();applyHeaderV605()};

const _taskCardV605Base=taskCardV604;
taskCardV604=function(task){
  return _taskCardV605Base(task).replace('<strong>COM VOCÊ</strong>','');
};

tasksPage=function(){
  let all=sortedTasksV5(D.tasks||[]),
      open=all.filter(row=>row.status!=='done'),
      mine=open.filter(row=>row.assigned_to===S.user?.id),
      workflowMine=workflowActionsV604(),
      urgent=open.filter(row=>row.priority==='urgent').length,
      waiting=open.filter(row=>row.status==='approval').length,
      unassigned=open.filter(row=>!row.assigned_to).length,
      done=all.filter(row=>row.status==='done'),
      nowCount=mine.length+workflowMine.length;
  let content='';
  if(taskViewV604==='mine'){
    content=`${workflowMine.length?`<section class="v604-workflow-actions"><div class="v604-section-head"><div><small>DO WORKFLOW</small><h3>Próximas ações de conteúdo</h3></div><span>${workflowMine.length}</span></div><div>${workflowMine.slice(0,6).map(workflowActionCardV604).join('')}</div></section>`:''}<section class="v604-my-queue"><div class="v604-section-head"><div><small>MINHAS DEMANDAS</small><h3>${mine.length?`${mine.length} ${mine.length===1?'demanda':'demandas'} em aberto`:'Nenhuma demanda em aberto'}</h3></div></div><div class="v604-task-grid">${mine.map(taskCardV604).join('')||'<div class="v604-task-clear"><b>✓</b><span>Nenhuma demanda manual pendente.</span></div>'}</div></section>`;
  }else if(taskViewV604==='team') content=tasksKanbanV604(all);
  else content=`<div class="v604-task-grid done">${done.map(taskCardV604).join('')||'<div class="v604-task-clear"><b>✓</b><span>Nenhuma demanda concluída ainda.</span></div>'}</div>`;
  return `<section class="v604-task-shell"><div class="v604-task-command"><div class="v604-task-tabs"><button class="${taskViewV604==='mine'?'on':''}" data-v604-taskview="mine">Minhas <span>${nowCount}</span></button><button class="${taskViewV604==='team'?'on':''}" data-v604-taskview="team">Painel da equipe <span>${open.length}</span></button><button class="${taskViewV604==='done'?'on':''}" data-v604-taskview="done">Concluídas</button></div><button class="btn pri" data-m="taskQuickV5">＋ Nova demanda</button></div><section class="v604-queue-radar"><article class="main"><small>AÇÕES AGORA</small><b>${nowCount}</b><span>demandas + workflow</span></article><article><small>URGENTES</small><b>${urgent}</b></article><article><small>AGUARDANDO</small><b>${waiting}</b></article><article><small>SEM RESPONSÁVEL</small><b>${unassigned}</b></article></section>${tasksAttentionV604(open)}${content}</section>`;
};

const _homePageV605Base=homePage;
homePage=function(){
  return _homePageV605Base()
    .replace(/SUA VEZ AGORA/g,'PRÓXIMAS AÇÕES')
    .replace(/O que depende de você/g,'Prioridades agora');
};

const _bindV605Base=bind;
bind=function(){_bindV605Base();applyHeaderV605()};

const v605Style=document.createElement('style');v605Style.textContent=`
.main>.top .ey .v605-brand-word{display:block!important;margin-left:10px!important;color:#f3f3f3!important;font-size:13px!important;font-weight:950!important;letter-spacing:.18em!important;line-height:1!important}
.v604-task-tabs button{white-space:nowrap}
@media(max-width:760px){
  .side .logo.v604-brand{display:none!important}
  .main>.top .ey .v605-brand-word{margin-left:7px!important;font-size:12px!important;letter-spacing:.16em!important}
  .v604-task-tabs button{font-size:10px!important;padding:9px 11px!important}
  .v604-task-tabs button:nth-child(2){min-width:145px!important}
}
`;
document.head.appendChild(v605Style);
applyOfficialBrandV555();
// ===== FIM COLAB V6.05 =====





// ===== COLAB V6.07 — MODO EVENTO LIMPO + TAKES COLAB =====
function storyModeTimeV607(item,briefing){
  let direct=String(item?.scheduled_time||'').slice(0,5);if(direct)return direct;
  let schedule=typeof sbObj==='function'?sbObj(briefing?.schedule_details):(briefing?.schedule_details||{}),key=String(item?.source_key||''),raw='';
  if(key.includes('ceremony'))raw=schedule.ceremony_time||'';
  else if(key.includes('reception'))raw=schedule.reception_time||'';
  else if(key.includes('bride'))raw=schedule.bride_time||'';
  else if(key.includes('first_look'))raw=schedule.first_look_time||'';
  let m=String(raw).trim().match(/^(\d{1,2})(?::|h)?(\d{2})?/i);if(!m)return'';
  return String(m[1]).padStart(2,'0')+':'+String(m[2]||'00').padStart(2,'0');
}
function storyModeMinutesV607(value){let m=String(value||'').match(/(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):9999}
function storyModeItemsV607(eventId){
  let briefing=(D.storyBriefings||[]).find(row=>row.event_id===eventId),all=(D.storyChecklist||[]).filter(row=>row.event_id===eventId),hasMust=all.some(row=>row.source==='briefing'&&String(row.source_key||'').startsWith('must_'));
  let client=all.filter(row=>row.category!=='colab_take'&&row.source==='briefing').filter(row=>!(hasMust&&['specific_moment','specific_detail'].includes(row.source_key)));
  let legacyRefs=all.filter(row=>row.category==='reference'&&row.source!=='briefing');
  let team=all.filter(row=>row.source==='team'&&row.category!=='colab_take');
  let colab=all.filter(row=>row.category==='colab_take');
  let unique=(rows)=>{let seen=new Set();return rows.filter(row=>{let key=String(row.title||'').toLowerCase().replace(/^\d+[.)-]?\s*/,'').replace(/^cobrir\s+/,'').replace(/\s+/g,' ').trim();if(seen.has(key))return false;seen.add(key);return true})};
  client=unique([...client,...legacyRefs]).map(row=>({...row,_time:storyModeTimeV607(row,briefing)}));
  let groupRank=row=>row.category==='before'?0:['event','capture','coverage','priority','reference'].includes(row.category)?1:row.category==='restriction'?2:row.category==='after'?3:4;
  client.sort((a,b)=>groupRank(a)-groupRank(b)||storyModeMinutesV607(a._time)-storyModeMinutesV607(b._time)||Number(a.sort_order||999)-Number(b.sort_order||999));
  colab.sort((a,b)=>storyModeMinutesV607(storyModeTimeV607(a,briefing))-storyModeMinutesV607(storyModeTimeV607(b,briefing))||Number(a.sort_order||999)-Number(b.sort_order||999));
  team.sort((a,b)=>Number(a.sort_order||999)-Number(b.sort_order||999));
  return {briefing,client,colab,team,all};
}
function storyModeLinkV607(item){let text=String(item.notes||'')+' '+String(item.title||''),m=text.match(/https?:\/\/[^\s·]+/);return m?m[0]:''}
function storyModeCardV607(item,kind='client',briefing=null){
  let time=item._time||storyModeTimeV607(item,briefing),owner=profile(item.assigned_to)?.display_name||'',link=storyModeLinkV607(item),urgent=item.priority==='urgent'||item.priority==='high';
  return `<label class="v607-event-item ${kind} ${item.completed?'done':''} ${urgent?'priority':''}"><input type="checkbox" ${item.completed?'checked':''} onchange="toggleStoryCheck('${item.id}',this.checked);this.closest('.v607-event-item')?.classList.toggle('done',this.checked);storyModeRefreshProgressV607()"><span class="v607-check-ui">✓</span><span class="v607-event-copy">${time?`<small class="v607-event-time">${E(time)}</small>`:''}<b>${E(item.title||'Item')}</b>${item.notes&&!link?`<small>${E(item.notes)}</small>`:''}${owner?`<small>Responsável: ${E(owner)}</small>`:''}${link?`<a href="${E(link)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Abrir referência ↗</a>`:''}</span>${urgent&&kind==='client'?'<em>PRIORIDADE</em>':''}</label>`;
}
function storyModeSectionV607(title,ey,rows,kind,briefing,empty='Nada por aqui.'){return `<section class="v607-event-section ${kind}"><div class="v607-event-section-head"><div><small>${E(ey)}</small><h2>${E(title)}</h2></div><span>${rows.filter(x=>x.completed).length}/${rows.length}</span></div><div class="v607-event-list">${rows.map(row=>storyModeCardV607(row,kind,briefing)).join('')||`<div class="v607-event-empty">${E(empty)}</div>`}</div></section>`}
function storyEventModeV607(id){
  let event=(D.events||[]).find(row=>row.id===id);if(!event)return'';
  let {briefing,client,colab,team,all}=storyModeItemsV607(id),operational=[...client,...colab,...team],done=operational.filter(row=>row.completed).length,pct=operational.length?Math.round(done/operational.length*100):0,clientDone=client.filter(row=>row.completed).length,colabDone=colab.filter(row=>row.completed).length,date=String(event.starts_at||'').slice(0,10),eventTime=event.starts_at?fmtTime(event.starts_at):'',clientName=cl(event.client_id)?.name||'Evento';
  let before=client.filter(row=>row.category==='before'),day=client.filter(row=>['event','capture','coverage','priority','reference'].includes(row.category)),restrictions=client.filter(row=>row.category==='restriction'),after=client.filter(row=>row.category==='after'),otherClient=client.filter(row=>!['before','event','capture','coverage','priority','reference','restriction','after'].includes(row.category));
  return `<div class="v607-event-page" data-v607-event="${id}"><header class="v607-event-top"><button type="button" data-v607-event-close>‹</button><div><small>STORYMAKER · MODO EVENTO</small><b>${E(clientName)}</b></div><button type="button" data-v607-event-detail="${id}">•••</button></header><main class="v607-event-main"><section class="v607-event-hero"><div><small>${date?fmtDate(date):'DATA A DEFINIR'}${eventTime?' · '+E(eventTime):''}</small><h1>${E(event.title||'Evento')}</h1>${event.location?`<p>${E(event.location)}</p>`:''}</div><div class="v607-event-score"><b data-v607-progress-number>${pct}%</b><span>${done}/${operational.length} feitos</span></div><i><em data-v607-progress-bar style="width:${pct}%"></em></i></section><nav class="v607-event-stats"><button type="button" data-v607-jump="client"><b>${clientDone}/${client.length}</b><span>Noivos</span></button><button type="button" data-v607-jump="colab"><b>${colabDone}/${colab.length}</b><span>Takes COLAB</span></button><button type="button" data-v607-add-take>＋<span>Novo take</span></button></nav>${before.length?storyModeSectionV607('Antes de começar','PREPARAÇÃO',before,'client',briefing):''}<div id="v607ClientPriority">${storyModeSectionV607('Prioridades dos noivos','NÃO PODE FALTAR',day,'client',briefing,'Nenhuma prioridade do briefing registrada.')}</div>${otherClient.length?storyModeSectionV607('Outros pedidos','BRIEFING',otherClient,'client',briefing):''}${restrictions.length?storyModeSectionV607('Atenção','RESTRIÇÕES',restrictions,'warning',briefing):''}<div id="v607ColabTakes">${storyModeSectionV607('Takes COLAB','NOSSO CONTEÚDO',colab,'colab',briefing,'Adicione os takes que vocês querem aproveitar para gravar no evento.')}</div>${team.length?storyModeSectionV607('Extras da equipe','LEMBRETES',team,'team',briefing):''}${after.length?storyModeSectionV607('Depois do evento','FINALIZAÇÃO',after,'after',briefing):''}<details class="v607-event-reference"><summary>Ver briefing completo</summary><button type="button" data-v607-event-detail="${id}">Abrir briefing e detalhes do evento →</button></details></main><button class="v607-event-fab" type="button" data-v607-add-take>＋ Take COLAB</button><dialog class="v607-take-dialog" id="v607TakeDialog"><form method="dialog" id="v607TakeForm" data-event="${id}"><div class="v607-take-head"><div><small>TAKE COLAB</small><h2>O que não podemos esquecer?</h2></div><button value="cancel" type="button" data-v607-take-close>×</button></div><div class="field"><label>Take</label><input name="title" maxlength="180" required placeholder="Ex.: Carol gravando a Thalia durante a cerimônia"></div><div class="v607-take-grid"><div class="field"><label>Quem grava?</label><select name="assigned_to"><option value="">Quem estiver livre</option>${(D.profiles||[]).map(p=>`<option value="${p.user_id}">${E(p.display_name)}</option>`).join('')}</select></div><div class="field"><label>Horário <small>(opcional)</small></label><input name="scheduled_time" type="time"></div></div><div class="field"><label>Observação <small>(opcional)</small></label><input name="notes" maxlength="240" placeholder="Ângulo, referência, ideia rápida..."></div><button class="btn pri full" type="submit">Adicionar ao Modo Evento</button></form></dialog></div>`;
}
function openStoryEventModeV607(id){MD={type:'storyEventModeV607',id};render()}
function storyModeRefreshProgressV607(){
  let page=document.querySelector('.v607-event-page');if(!page)return;let checks=[...page.querySelectorAll('.v607-event-item input[type="checkbox"]')],done=checks.filter(x=>x.checked).length,pct=checks.length?Math.round(done/checks.length*100):0;let n=page.querySelector('[data-v607-progress-number]'),bar=page.querySelector('[data-v607-progress-bar]');if(n)n.textContent=pct+'%';if(bar)bar.style.width=pct+'%';
}
async function saveStoryColabTakeV607(e){
  e.preventDefault();let form=e.currentTarget,f=new FormData(form),title=String(f.get('title')||'').trim();if(!title)return;let eventId=form.dataset.event,items=(D.storyChecklist||[]).filter(row=>row.event_id===eventId),sort=Math.max(0,...items.map(row=>Number(row.sort_order||0)))+1,btn=form.querySelector('[type="submit"]');btn.disabled=true;btn.textContent='Adicionando...';
  try{await api('/rest/v1/storymaker_checklist_items',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,event_id:eventId,title,category:'colab_take',source:'team',priority:'normal',sort_order:sort,assigned_to:f.get('assigned_to')||null,scheduled_time:f.get('scheduled_time')||null,notes:String(f.get('notes')||'').trim()||null,completed:false})});await load();MD={type:'storyEventModeV607',id:eventId};render();toast('Take COLAB adicionado ✦')}catch(err){toast(err.message);btn.disabled=false;btn.textContent='Adicionar ao Modo Evento'}
}
const _modalV607EventBase=modal;
modal=function(){if(MD?.type==='storyEventModeV607')return storyEventModeV607(MD.id);return _modalV607EventBase()};
const _bindV607EventBase=bind;
bind=function(){
  _bindV607EventBase();
  document.querySelectorAll('[data-v604-story-open]').forEach(button=>button.onclick=()=>openStoryEventModeV607(button.dataset.v604StoryOpen));
  if(MD?.type==='storymakerDetail')document.querySelector('.v604-event-check-main')?.addEventListener('click',()=>openStoryEventModeV607(MD.id));
  document.querySelector('[data-v607-event-close]')?.addEventListener('click',()=>{MD=null;render()});
  document.querySelectorAll('[data-v607-event-detail]').forEach(button=>button.onclick=()=>{MD={type:'storymakerDetail',id:button.dataset.v607EventDetail};render()});
  document.querySelectorAll('[data-v607-add-take]').forEach(button=>button.onclick=()=>document.getElementById('v607TakeDialog')?.showModal());
  document.querySelector('[data-v607-take-close]')?.addEventListener('click',()=>document.getElementById('v607TakeDialog')?.close());
  document.getElementById('v607TakeForm')?.addEventListener('submit',saveStoryColabTakeV607);
  document.querySelectorAll('[data-v607-jump]').forEach(button=>button.onclick=()=>document.getElementById(button.dataset.v607Jump==='client'?'v607ClientPriority':'v607ColabTakes')?.scrollIntoView({behavior:'smooth',block:'start'}));
};
const v607EventStyle=document.createElement('style');v607EventStyle.textContent=`
.v607-event-page{position:fixed;inset:0;z-index:10050;overflow:auto;background:#090909;color:#fff;padding-bottom:110px}.v607-event-top{position:sticky;top:0;z-index:5;display:grid;grid-template-columns:46px 1fr 46px;align-items:center;gap:10px;padding:calc(12px + env(safe-area-inset-top)) 16px 12px;border-bottom:1px solid #252525;background:rgba(9,9,9,.94);backdrop-filter:blur(16px)}.v607-event-top button{width:44px;height:44px;border:1px solid #303030;border-radius:13px;background:#111;color:#ddd;font-size:24px}.v607-event-top button:last-child{font-size:15px}.v607-event-top small,.v607-event-top b{display:block}.v607-event-top small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.14em}.v607-event-top b{margin-top:3px;font-size:14px}.v607-event-main{width:min(760px,100%);margin:0 auto;padding:16px}.v607-event-hero{position:relative;display:grid;grid-template-columns:1fr auto;gap:12px;overflow:hidden;padding:18px;border:1px solid #61351d;border-radius:22px;background:radial-gradient(circle at 92% 0,rgba(255,106,0,.22),transparent 38%),linear-gradient(145deg,#1d130e,#101010)}.v607-event-hero small{color:#ff8a4c;font-size:9px;font-weight:900}.v607-event-hero h1{margin:5px 0 4px;font-size:29px;line-height:1}.v607-event-hero p{margin:0;color:#8a8a8a;font-size:11px}.v607-event-score{text-align:right}.v607-event-score b,.v607-event-score span{display:block}.v607-event-score b{font-size:25px}.v607-event-score span{margin-top:2px;color:#777;font-size:8px}.v607-event-hero>i{position:absolute;left:0;right:0;bottom:0;height:5px;background:#2b1a11}.v607-event-hero>i em{display:block;height:100%;background:#ff6a00;transition:width .2s}.v607-event-stats{display:grid;grid-template-columns:1fr 1fr .8fr;gap:7px;margin:9px 0 14px}.v607-event-stats button{min-height:58px;padding:9px;border:1px solid #2e2e2e;border-radius:14px;background:#111;color:#aaa;text-align:left}.v607-event-stats button b,.v607-event-stats button span{display:block}.v607-event-stats button b{color:#fff;font-size:17px}.v607-event-stats button span{margin-top:2px;font-size:8px}.v607-event-stats button:last-child{border-color:#63341c;background:#21130c;color:#ff8646}.v607-event-section{scroll-margin-top:82px;margin-top:12px;padding:14px;border:1px solid #2b2b2b;border-radius:19px;background:#111}.v607-event-section.client{border-color:#5a331f;background:linear-gradient(145deg,#19120e,#101010)}.v607-event-section.colab{border-color:#343434}.v607-event-section.warning{border-color:#6b3434;background:#171010}.v607-event-section-head{display:flex;align-items:end;justify-content:space-between;gap:10px;margin-bottom:10px}.v607-event-section-head small{display:block;color:#ff7939;font-size:7px;font-weight:950;letter-spacing:.14em}.v607-event-section-head h2{margin:4px 0 0;font-size:19px}.v607-event-section-head>span{padding:5px 8px;border:1px solid #333;border-radius:999px;color:#888;font-size:8px;font-weight:900}.v607-event-list{display:grid;gap:7px}.v607-event-item{position:relative;display:grid;grid-template-columns:36px minmax(0,1fr) auto;align-items:center;gap:10px;min-height:72px;padding:11px;border:1px solid #292929;border-radius:14px;background:#0d0d0d;cursor:pointer}.v607-event-item.client.priority{border-color:#75401f;background:#17100c}.v607-event-item.colab{border-style:dashed}.v607-event-item input{position:absolute;opacity:0;pointer-events:none}.v607-check-ui{display:grid;place-items:center;width:34px;height:34px;border:2px solid #4a4a4a;border-radius:11px;color:transparent;font-size:18px;font-weight:950}.v607-event-item.done .v607-check-ui{border-color:#ff6a00;background:#ff6a00;color:#fff}.v607-event-copy{min-width:0}.v607-event-copy b,.v607-event-copy small,.v607-event-copy a{display:block}.v607-event-copy b{font-size:13px;line-height:1.3}.v607-event-item.done .v607-event-copy b{color:#777;text-decoration:line-through}.v607-event-copy small{margin-top:4px;color:#737373;font-size:9px;line-height:1.35}.v607-event-time{display:inline-block!important;width:max-content;margin:0 0 4px!important;padding:3px 6px;border-radius:7px;background:#24150e;color:#ff8748!important;font-weight:950}.v607-event-copy a{width:max-content;margin-top:7px;color:#ff8242;font-size:9px;font-weight:900;text-decoration:none}.v607-event-item>em{align-self:start;padding:4px 6px;border-radius:999px;background:#5c2d16;color:#ff9a65;font-size:6px;font-style:normal;font-weight:950;letter-spacing:.08em}.v607-event-empty{padding:17px;border:1px dashed #303030;border-radius:12px;color:#666;font-size:10px}.v607-event-reference{margin:14px 0;border:1px solid #292929;border-radius:14px;background:#101010}.v607-event-reference summary{padding:13px 14px;color:#888;font-size:10px;font-weight:900}.v607-event-reference button{width:calc(100% - 20px);margin:0 10px 10px;padding:12px;border:1px solid #333;border-radius:11px;background:#151515;color:#ddd;text-align:left}.v607-event-fab{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:10060;min-height:52px;padding:0 18px;border:1px solid #a44817;border-radius:16px;background:#ff6a00;color:#fff;font-size:12px;font-weight:950;box-shadow:0 12px 28px rgba(0,0,0,.35)}.v607-take-dialog{width:min(520px,calc(100vw - 24px));padding:0;border:1px solid #3f3028;border-radius:20px;background:#151515;color:#fff;box-shadow:0 28px 70px rgba(0,0,0,.6)}.v607-take-dialog::backdrop{background:rgba(0,0,0,.76);backdrop-filter:blur(5px)}.v607-take-dialog form{padding:17px}.v607-take-head{display:flex;align-items:start;justify-content:space-between;gap:12px;margin-bottom:14px}.v607-take-head small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.14em}.v607-take-head h2{margin:5px 0 0;font-size:21px}.v607-take-head button{width:38px;height:38px;border:1px solid #333;border-radius:11px;background:#111;color:#aaa}.v607-take-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
@media(max-width:760px){.v607-event-main{padding:12px}.v607-event-hero{padding:16px}.v607-event-hero h1{font-size:25px}.v607-event-stats{position:sticky;top:73px;z-index:4;margin:8px -1px 12px;padding:6px 0;background:#090909}.v607-event-section{padding:12px;margin-top:10px}.v607-event-section-head h2{font-size:18px}.v607-event-item{grid-template-columns:40px minmax(0,1fr) auto;min-height:78px;padding:12px}.v607-check-ui{width:38px;height:38px}.v607-event-copy b{font-size:14px}.v607-event-copy small{font-size:10px}.v607-take-grid{grid-template-columns:1fr}.v607-event-fab{bottom:calc(14px + env(safe-area-inset-bottom));right:14px}}
`;
document.head.appendChild(v607EventStyle);
// ===== FIM COLAB V6.07 STORYMAKER =====




// ===== COLAB V6.10 — CORRECAO CIRURGICA DE ENQUADRAMENTO =====
const _tasksPageV610Base=tasksPage;
tasksPage=function(){
  return _tasksPageV610Base().replace('<article class="main"><small>AÇÕES AGORA</small>','<article class="v610-task-primary"><small>AÇÕES AGORA</small>');
};
const v610Style=document.createElement('style');
v610Style.textContent=`
.v604-task-shell{align-content:start!important;grid-auto-rows:max-content!important;min-height:0!important;gap:10px!important}
.v604-queue-radar{align-content:start!important;min-height:0!important}
.v604-queue-radar article.v610-task-primary{min-height:76px!important;padding:12px 13px!important;border-color:#55301c!important;background:radial-gradient(circle at 95% 0,rgba(255,106,0,.13),transparent 44%),#17110e!important}
html,body,#app{max-width:100%!important;overflow-x:hidden!important}
*,*:before,*:after{box-sizing:border-box}
.main,.main>*{min-width:0!important;max-width:100%!important}
.main section,.main article,.main div,.main nav,.main form{min-width:0}
.main img,.main video,.main canvas,.main svg{max-width:100%}
.main input,.main select,.main textarea{max-width:100%;min-width:0}
.v596-client-copy,.v596-client-line,.v591-client-page,.v591-more-grid,.v604-central-grid,.v604-library,.v604-task-command,.v604-section-head{min-width:0!important;max-width:100%!important}
.v604-task-card h3,.v604-work-action b,.v604-work-action em,.v591-more-grid b,.v591-more-grid small{overflow-wrap:anywhere!important}
.v604-task-kanban-scroll,.v596-kanban-scroll,.v591-client-nav{max-width:100%!important;overscroll-behavior-x:contain!important}
@media(max-width:760px){
 .v604-task-command{max-width:100%!important}
 .v604-task-tabs{max-width:100%!important;overflow-x:auto!important}
 .v604-task-tabs button{flex:0 0 auto!important}
 .v604-queue-radar{max-width:100%!important;overflow-x:auto!important}
 .v604-task-kanban-scroll{width:100%!important;max-width:100%!important}
 .v604-task-card{max-width:100%!important}
 .v596-client-line{flex-wrap:wrap!important}
 .v596-client-line h1{max-width:100%!important;white-space:normal!important}
 .v591-more-grid>button,.v604-library-item{max-width:100%!important}
 .v604-library-item>div{min-width:0!important}
}
`;
document.head.appendChild(v610Style);
// ===== FIM COLAB V6.10 =====




// ===== COLAB V6.14 — AÇÕES RÁPIDAS EM UMA LINHA =====
const v614QuickStyle=document.createElement('style');
v614QuickStyle.textContent=`
.v5-quick-grid .btn{flex-direction:row!important;align-items:center!important;justify-content:center!important;gap:7px!important;min-height:48px!important;padding:10px 13px!important;text-align:center!important;white-space:nowrap!important}
.v5-quick-grid .quickplus{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important;margin:0!important;line-height:1!important;font-size:16px!important}
@media(max-width:760px){.v5-quick-grid .btn{min-height:46px!important;padding:9px 11px!important;font-size:12px!important;gap:6px!important}.v5-quick-grid .quickplus{font-size:15px!important}}
`;
document.head.appendChild(v614QuickStyle);
// ===== FIM V6.14 =====


// ===== COLAB V6.16 — EQUIPE INTERNA + PRIVACIDADE DO CLIENTE =====
const _loadV616Base=load;
load=async function(){
  await _loadV616Base();
  if(M?.role==='team'){
    try{
      const memberships=await api('/rest/v1/user_memberships?select=user_id,role&role=eq.team');
      const teamIds=new Set((memberships||[]).map(row=>row.user_id));
      D.teamMemberIds=[...teamIds];
      D.profiles=(D.profiles||[]).filter(person=>teamIds.has(person.user_id));
    }catch(error){
      console.warn('Equipe interna',error);
      D.teamMemberIds=(D.profiles||[]).map(person=>person.user_id);
    }
  }
};

profileOptionsV5=function(selected='',teamLabel='Equipe'){
  return `<option value="" ${!selected?'selected':''}>${E(teamLabel)}</option>${(D.profiles||[]).map(person=>`<option value="${person.user_id}" ${selected===person.user_id?'selected':''}>${E(person.display_name)}</option>`).join('')}`;
};

workflowProfileOptionsV583=function(selected,label='Equipe'){
  return `<option value="">${E(label)}</option>${(D.profiles||[]).map(person=>`<option value="${person.user_id}" ${selected===person.user_id?'selected':''}>${E(person.display_name)}</option>`).join('')}`;
};

portalContentVisibleV587=function(content){
  const wasSent=(D.approvals||[]).some(row=>row.content_id===content?.id);
  return wasSent&&['approval','changes_requested','approved','scheduled','published'].includes(content?.status);
};

function sanitizeInternalOwnersV616(){
  if(M?.role!=='team')return;
  const allowed=new Set((D.profiles||[]).map(person=>person.user_id));
  document.querySelectorAll('select[name="assigned_to"],select[name="owner_id"],select[name="responsible_to"],select[name="partner_user_id"],select[name="internal_assigned_to"],#taskOwner').forEach(select=>{
    [...select.options].forEach(option=>{
      if(!option.value||option.value==='all'||option.value==='none')return;
      if(!allowed.has(option.value))option.remove();
    });
  });
}
const _bindV616Base=bind;
bind=function(){_bindV616Base();sanitizeInternalOwnersV616()};
// ===== FIM COLAB V6.16 =====


// ===== COLAB V6.17 — FORMATO EDITÁVEL DURANTE A PRODUÇÃO =====
function carouselSeedV617(content,work){
  let slides=Array.isArray(work?.slides)?work.slides.filter(v=>String(v||'').trim()):[];
  if(slides.length>1)return slides;
  let raw=String(slides[0]||'').trim();
  if(!raw)return [content?.title||'Capa','','','','',''];
  let parts=raw.split(/\n\s*\n+/).map(v=>v.trim()).filter(Boolean).filter(v=>!/^legenda\s*:?$/i.test(v));
  if(parts.length>1)return [content?.title||'Capa',...parts].slice(0,20);
  return [content?.title||'Capa',raw,'','','',''];
}
function productionFormatBlockV617(content,work){
  let format=content?.format||'static_post',seed=carouselSeedV617(content,work),count=Math.max(2,Math.min(20,Number(workflowBriefV583(work).carousel_count||seed.length||6)));
  while(seed.length<20)seed.push('');
  return `<section class="v617-format-box"><div class="v617-format-head"><div><small>FORMATO</small><b>Pode mudar durante a produção</b></div><span>${E(fmt(format))}</span></div><div class="formgrid"><div class="field"><label>Formato do conteúdo</label><select name="content_format" id="productionFormatV617"><option value="static_post" ${format==='static_post'?'selected':''}>Post estático</option><option value="carousel" ${format==='carousel'?'selected':''}>Carrossel</option><option value="reel" ${format==='reel'?'selected':''}>Reels</option><option value="story" ${format==='story'?'selected':''}>Stories</option><option value="video" ${format==='video'?'selected':''}>Vídeo</option></select></div><div class="field v617-carousel-count" ${format==='carousel'?'':'hidden'}><label>Quantidade de cards</label><input name="carousel_count" id="carouselCountV617" type="number" min="2" max="20" value="${count}"></div></div><div class="v617-carousel-editor" id="carouselEditorV617" ${format==='carousel'?'':'hidden'}><div class="v617-carousel-note"><b>Estrutura do carrossel</b><span>O briefing continua preservado. Aqui você adapta o conteúdo ao novo formato.</span></div>${seed.map((text,index)=>`<div class="field v617-carousel-card" data-carousel-card="${index+1}" ${index+1>count?'hidden':''}><label>${index===0?'Capa':`Card ${index+1}`}</label><textarea name="carousel_slide_${index+1}" rows="${index===0?2:3}" placeholder="${index===0?'Título / gancho da capa':'Texto deste card'}">${E(text)}</textarea></div>`).join('')}</div></section>`;
}
function syncProductionFormatUIV617(){
  let form=document.getElementById('workflowProgressFormV591');if(!form||form.dataset.stage!=='visual_production')return;
  let format=form.querySelector('[name="content_format"]'),editor=document.getElementById('carouselEditorV617'),countBox=form.querySelector('.v617-carousel-count'),count=document.getElementById('carouselCountV617');
  let update=()=>{let isCarousel=format?.value==='carousel';if(editor)editor.hidden=!isCarousel;if(countBox)countBox.hidden=!isCarousel;let n=Math.max(2,Math.min(20,Number(count?.value||6)));form.querySelectorAll('[data-carousel-card]').forEach(card=>card.hidden=Number(card.dataset.carouselCard)>n)};
  format?.addEventListener('change',update);count?.addEventListener('input',update);update();
}
async function saveProductionFormatV617(form,contentId){
  if(!form||form.dataset.stage!=='visual_production')return;
  let content=(D.contents||[]).find(row=>row.id===contentId),work=content?workflowWorkV583(content.id):null;if(!content||!work)return;
  let data=new FormData(form),format=String(data.get('content_format')||content.format||'static_post'),now=new Date().toISOString(),brief={...workflowBriefV583(work)};
  let workflowPayload={updated_at:now};
  if(format==='carousel'){
    let count=Math.max(2,Math.min(20,Number(data.get('carousel_count')||6))),slides=[];
    for(let i=1;i<=count;i++)slides.push(String(data.get(`carousel_slide_${i}`)||'').trim());
    workflowPayload.slides=slides;brief.carousel_count=count;workflowPayload.brief=brief;
  }
  if(format!==content.format)await patch('contents',content.id,{format,updated_at:now});
  await patch('content_team_workflow',work.id,workflowPayload);
}
const _workflowProgressModalV617Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let html=_workflowProgressModalV617Base(content),work=workflowWorkV583(content.id),stage=workflowStageV583(work);if(stage!=='visual_production')return html;
  let open=`<form id="workflowProgressFormV591" data-content="${content.id}" data-stage="${stage}">`;
  return html.replace(open,open+productionFormatBlockV617(content,work));
};
const _saveWorkflowProgressV617Base=saveWorkflowProgressV591;
saveWorkflowProgressV591=async function(event){
  let form=event.currentTarget;if(form?.dataset.stage==='visual_production'){
    event.preventDefault();try{await saveProductionFormatV617(form,form.dataset.content)}catch(error){toast(error.message);return}
  }
  return _saveWorkflowProgressV617Base(event);
};
const _bindV617Base=bind;
bind=function(){
  _bindV617Base();syncProductionFormatUIV617();
  document.querySelectorAll('[data-v591-move]').forEach(button=>{
    let form=document.getElementById('workflowProgressFormV591');if(!form||form.dataset.stage!=='visual_production')return;
    button.onclick=async()=>{button.disabled=true;try{await saveProductionFormatV617(form,button.dataset.content);let data=new FormData(form),work=workflowWorkV583(button.dataset.content);if(work)await patch('content_team_workflow',work.id,{assigned_to:String(data.get('assigned_to')||'')||null,design_owner_id:String(data.get('assigned_to')||'')||work.design_owner_id||null,canva_edit_url:String(data.get('canva_edit_url')||'').trim()||null,internal_notes:String(data.get('internal_notes')||'').trim()||null,updated_at:new Date().toISOString()});await moveWorkflowV591(button.dataset.content,button.dataset.v591Move)}catch(error){toast(error.message);button.disabled=false}}
  });
};
const v617Style=document.createElement('style');v617Style.textContent=`
.v617-format-box{margin:0 0 14px;padding:14px;border:1px solid #54301d;border-radius:15px;background:linear-gradient(145deg,#1a120e,#111)}.v617-format-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.v617-format-head small,.v617-format-head b{display:block}.v617-format-head small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.12em}.v617-format-head b{margin-top:3px;font-size:13px}.v617-format-head>span{padding:6px 9px;border-radius:999px;background:#2b170d;color:#ff8a4a;font-size:9px;font-weight:900}.v617-carousel-editor{display:grid;gap:8px;margin-top:10px;padding-top:11px;border-top:1px solid #33271f}.v617-carousel-note{display:grid;gap:3px;margin-bottom:2px}.v617-carousel-note b{font-size:12px}.v617-carousel-note span{color:#818181;font-size:10px;line-height:1.4}.v617-carousel-card{margin:0!important;padding:10px;border:1px solid #2d2d2d;border-radius:11px;background:#101010}.v617-carousel-card label{color:#ff8040}.v617-carousel-card textarea{min-height:64px!important;background:#151515!important;color:#fff!important;border-color:#363636!important}.v617-carousel-count[hidden],.v617-carousel-editor[hidden],.v617-carousel-card[hidden]{display:none!important}@media(max-width:760px){.v617-format-box{padding:12px}.v617-format-head{align-items:flex-start}.v617-format-head b{font-size:14px}.v617-carousel-note span{font-size:11px}.v617-carousel-card label{font-size:12px!important}.v617-carousel-card textarea{font-size:14px!important;line-height:1.45!important}}
`;document.head.appendChild(v617Style);
// ===== FIM COLAB V6.17 =====


// ===== COLAB V6.18 — CARROSSEL VISUAL POR CARD =====
function carouselAssetsV618(content){
  if(!content)return[];
  let version=Number(content.current_version||1),rows=(D.assets||[]).filter(a=>a.content_id===content.id&&Number(a.version_no||1)===version).slice().sort((a,b)=>String(a.created_at||'').localeCompare(String(b.created_at||''))),used=new Set(),next=1;
  return rows.map(asset=>{let slot=Number(asset.slide_index||0);if(!slot){while(used.has(next))next++;slot=next++}used.add(slot);return {...asset,_slide:slot}}).sort((a,b)=>a._slide-b._slide||String(a.created_at||'').localeCompare(String(b.created_at||'')));
}
function carouselCountV618(content,work){let assets=carouselAssetsV618(content),slides=Array.isArray(work?.slides)?work.slides:[],brief=workflowBriefV583(work);return Math.max(2,Math.min(20,Number(brief.carousel_count||slides.length||assets.reduce((m,a)=>Math.max(m,a._slide||0),0)||2)))}
function carouselPreviewV618(content,opts={}){
  if(!content||content.format!=='carousel')return'';let work=typeof workflowWorkV583==='function'?workflowWorkV583(content.id):null,assets=carouselAssetsV618(content),count=opts.editor?carouselCountV618(content,work):Math.max(assets.reduce((m,a)=>Math.max(m,a._slide||0),0),assets.length,1),bySlot=new Map(assets.map(a=>[a._slide,a])),slots=[];
  for(let i=1;i<=count;i++){let asset=bySlot.get(i);if(!asset&&!opts.editor)continue;slots.push({i,asset})}
  if(!slots.length&&!opts.editor)return'';
  return `<section class="v618-carousel ${opts.editor?'editor':''}" data-v618-carousel><div class="v618-carousel-head"><div><small>${opts.editor?'PRÉVIA DO CARROSSEL':'CARROSSEL'}</small><b>${opts.editor?'Deslize para conferir a sequência':'Deslize como no Instagram'}</b></div><span data-v618-counter>1 / ${slots.length||count}</span></div><div class="v618-carousel-stage"><button type="button" class="v618-nav prev" data-v618-prev aria-label="Card anterior">‹</button><div class="v618-track" data-v618-track>${slots.map(({i,asset})=>`<div class="v618-slide" data-v618-slide="${i}">${asset?`<div class="v618-slide-media" data-asset-path="${E(asset.storage_path)}" data-mime="${E(asset.mime_type||'')}" data-filename="${E(asset.file_name||`Card ${i}`)}"></div>`:`<div class="v618-slide-empty"><span>${i}</span><b>${i===1?'Capa':`Card ${i}`}</b><small>Aguardando foto/arte</small></div>`}<em>${i}</em></div>`).join('')}</div><button type="button" class="v618-nav next" data-v618-next aria-label="Próximo card">›</button></div><div class="v618-dots">${slots.map((_,idx)=>`<button type="button" class="${idx===0?'on':''}" data-v618-dot="${idx}" aria-label="Ir para card ${idx+1}"></button>`).join('')}</div></section>`;
}
function carouselMediaEditorV618(content,work){let count=carouselCountV618(content,work),assets=carouselAssetsV618(content),bySlot=new Map(assets.map(a=>[a._slide,a]));return `<section class="v618-media-editor" id="carouselMediaEditorV618" ${content.format==='carousel'?'':'hidden'}><div class="v618-media-title"><div><small>ARTES / FOTOS</small><b>Uma mídia para cada card</b></div><span>${count} cards</span></div>${carouselPreviewV618(content,{editor:true})}<div class="v618-media-grid">${Array.from({length:20},(_,k)=>{let i=k+1,a=bySlot.get(i);return `<article class="v618-media-card" data-v618-media-card="${i}" ${i>count?'hidden':''}><div class="v618-media-thumb">${a?`<div data-asset-path="${E(a.storage_path)}" data-mime="${E(a.mime_type||'')}" data-filename="${E(a.file_name||`Card ${i}`)}" data-thumb="1"></div>`:`<span>${i}</span>`}</div><div class="v618-media-copy"><small>${i===1?'CAPA':`CARD ${i}`}</small><b>${a?E(a.file_name||'Imagem adicionada'):'Adicionar foto ou arte'}</b><label class="btn ${a?'ghost':'pri'} small">${a?'Trocar imagem':'＋ Adicionar imagem'}<input type="file" accept="image/*" data-v618-slide-upload="${i}" hidden></label>${a?`<button type="button" class="v618-remove" data-v618-slide-remove="${a.id}">Remover</button>`:''}</div></article>`}).join('')}</div></section>`}
const _productionFormatBlockV618Base=productionFormatBlockV617;
productionFormatBlockV617=function(content,work){let html=_productionFormatBlockV618Base(content,work);return html.replace('</section>',carouselMediaEditorV618(content,work)+'</section>')};
const _syncProductionFormatUIV618Base=syncProductionFormatUIV617;
syncProductionFormatUIV617=function(){_syncProductionFormatUIV618Base();let form=document.getElementById('workflowProgressFormV591');if(!form||form.dataset.stage!=='visual_production')return;let format=form.querySelector('[name="content_format"]'),count=document.getElementById('carouselCountV617'),media=document.getElementById('carouselMediaEditorV618');let update=()=>{let on=format?.value==='carousel',n=Math.max(2,Math.min(20,Number(count?.value||2)));if(media)media.hidden=!on;document.querySelectorAll('[data-v618-media-card]').forEach(card=>card.hidden=!on||Number(card.dataset.v618MediaCard)>n);let label=media?.querySelector('.v618-media-title>span');if(label)label.textContent=n+' cards'};format?.addEventListener('change',update);count?.addEventListener('input',update);update()};
const _saveProductionFormatV618Base=saveProductionFormatV617;
saveProductionFormatV617=async function(form,contentId){await _saveProductionFormatV618Base(form,contentId);if(!form||form.dataset.stage!=='visual_production')return;let data=new FormData(form),format=String(data.get('content_format')||''),content=(D.contents||[]).find(c=>c.id===contentId);if(format==='carousel'&&content){let count=Math.max(2,Math.min(20,Number(data.get('carousel_count')||2))),version=Number(content.current_version||1);await api(`/rest/v1/content_assets?content_id=eq.${content.id}&version_no=eq.${version}&slide_index=gt.${count}`,{method:'DELETE',headers:{Prefer:'return=minimal'}})}};
async function uploadCarouselSlideV618(input){let file=input.files?.[0],slot=Number(input.dataset.v618SlideUpload||0),form=document.getElementById('workflowProgressFormV591'),content=form?(D.contents||[]).find(c=>c.id===form.dataset.content):null;if(!file||!slot||!content)return;if(!String(file.type||'').startsWith('image/')){toast('Use uma imagem neste card');input.value='';return}if(file.size>20*1024*1024){toast('A imagem deve ter no máximo 20 MB');input.value='';return}let label=input.closest('label'),old=label?.textContent;if(label){label.style.pointerEvents='none';label.textContent='Enviando...'}try{await saveProductionFormatV617(form,content.id);let version=Number(content.current_version||1),existing=carouselAssetsV618(content).find(a=>a._slide===slot),safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-'),path=`${M.organization_id}/${content.client_id}/contents/${content.id}/v${version}/slide-${slot}-${Date.now()}-${safe}`;await uploadRaw(file,path);if(slot===1)await api(`/rest/v1/content_assets?content_id=eq.${content.id}&version_no=eq.${version}&is_primary=eq.true`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({is_primary:false})});if(existing)await api(`/rest/v1/content_assets?id=eq.${existing.id}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});await api('/rest/v1/content_assets',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:content.client_id,content_id:content.id,storage_path:path,file_name:file.name,mime_type:file.type||null,file_size:file.size,asset_type:'image',version_no:version,is_primary:slot===1,slide_index:slot,uploaded_by:S.user?.id})});await load();MD={type:'contentDetail',id:content.id};render();toast(`${slot===1?'Capa':`Card ${slot}`} atualizado ✦`)}catch(error){toast(error.message);if(label){label.style.pointerEvents='';label.textContent=old||'Adicionar imagem'}}finally{input.value=''}}
async function removeCarouselSlideV618(id){let asset=(D.assets||[]).find(a=>a.id===id);if(!asset)return;try{await api(`/rest/v1/content_assets?id=eq.${id}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});if(asset.is_primary){let content=(D.contents||[]).find(c=>c.id===asset.content_id),next=content?carouselAssetsV618(content).filter(a=>a.id!==id).sort((a,b)=>a._slide-b._slide)[0]:null;if(next)await api(`/rest/v1/content_assets?id=eq.${next.id}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({is_primary:true})})}await load();MD={type:'contentDetail',id:asset.content_id};render();toast('Imagem removida')}catch(error){toast(error.message)}}
function bindCarouselsV618(){document.querySelectorAll('[data-v618-carousel]').forEach(root=>{let track=root.querySelector('[data-v618-track]'),slides=[...root.querySelectorAll('.v618-slide')],dots=[...root.querySelectorAll('[data-v618-dot]')],counter=root.querySelector('[data-v618-counter]');if(!track||!slides.length)return;let go=i=>{i=Math.max(0,Math.min(slides.length-1,i));track.scrollTo({left:slides[i].offsetLeft-track.offsetLeft,behavior:'smooth'})},active=()=>{let w=track.clientWidth||1,i=Math.max(0,Math.min(slides.length-1,Math.round(track.scrollLeft/w)));dots.forEach((d,j)=>d.classList.toggle('on',i===j));if(counter)counter.textContent=`${i+1} / ${slides.length}`;root.dataset.index=i};track.addEventListener('scroll',()=>requestAnimationFrame(active),{passive:true});root.querySelector('[data-v618-prev]')?.addEventListener('click',()=>go(Number(root.dataset.index||0)-1));root.querySelector('[data-v618-next]')?.addEventListener('click',()=>go(Number(root.dataset.index||0)+1));dots.forEach((d,i)=>d.onclick=()=>go(i));active()})}
const _contentDetailModalV618Base=contentDetailModal;
contentDetailModal=function(isApproval){let html=_contentDetailModalV618Base(isApproval),content=isApproval?(D.approvals||[]).find(a=>a.id===MD?.id)?.contents:(D.contents||[]).find(c=>c.id===MD?.id);if(!content||content.format!=='carousel')return html;let preview=carouselPreviewV618(content);if(!preview)return html;return html.replace('<div class="grid2">',`<div class="v618-carousel-detail">${preview}</div><div class="grid2">`)};
const _portalAssetV618Base=portalAssetV428;
portalAssetV428=function(content){if(content?.format!=='carousel')return _portalAssetV618Base(content);let assets=carouselAssetsV618(content),a=assets.find(x=>x._slide===1)||assets[0];return `<div class="portal-content-thumb-v428 v618-portal-cover" ${a?`data-asset-path="${E(a.storage_path)}" data-mime="${E(a.mime_type||'')}" data-filename="${E(a.file_name||'Capa')}" data-thumb="1"`:''}>${a?'▧':'Sem arte'}${assets.length>1?`<span>${assets.length} cards</span>`:''}</div>`};
const _bindV618Base=bind;
bind=function(){_bindV618Base();document.querySelectorAll('[data-v618-slide-upload]').forEach(input=>input.onchange=()=>uploadCarouselSlideV618(input));document.querySelectorAll('[data-v618-slide-remove]').forEach(button=>button.onclick=()=>removeCarouselSlideV618(button.dataset.v618SlideRemove));bindCarouselsV618();setTimeout(hydratePreviews,30)};
const v618Style=document.createElement('style');v618Style.textContent=`
.v618-media-editor{display:grid;gap:12px;margin:13px 0 0;padding-top:13px;border-top:1px solid #3a2b23}.v618-media-editor[hidden],.v618-media-card[hidden]{display:none!important}.v618-media-title{display:flex;justify-content:space-between;align-items:end;gap:10px}.v618-media-title small,.v618-carousel-head small{display:block;color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.13em}.v618-media-title b,.v618-carousel-head b{display:block;margin-top:3px;font-size:13px}.v618-media-title>span{color:#8b8b8b;font-size:9px}.v618-media-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.v618-media-card{display:grid;grid-template-columns:82px minmax(0,1fr);gap:10px;align-items:center;padding:9px;border:1px solid #303030;border-radius:13px;background:#111}.v618-media-thumb{display:grid;place-items:center;aspect-ratio:1/1;border:1px dashed #3a3a3a;border-radius:10px;background:#0b0b0b;overflow:hidden}.v618-media-thumb>div,.v618-media-thumb img,.v618-media-thumb video{width:100%;height:100%;object-fit:cover}.v618-media-thumb>span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#25160e;color:#ff7430;font-weight:950}.v618-media-copy{min-width:0}.v618-media-copy small{color:#ff7d3c;font-size:7px;font-weight:950;letter-spacing:.1em}.v618-media-copy>b{display:block;margin:4px 0 8px;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v618-media-copy .btn{display:inline-flex;align-items:center;justify-content:center}.v618-remove{display:inline-block;margin-left:5px;padding:5px;border:0;background:transparent;color:#8b6b5a;font-size:8px}.v618-carousel{display:grid;gap:8px}.v618-carousel-head{display:flex;justify-content:space-between;align-items:end;gap:10px}.v618-carousel-head>span{color:#aaa;font-size:9px;font-weight:900}.v618-carousel-stage{position:relative}.v618-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;border:1px solid #2e2e2e;border-radius:16px;background:#080808;-webkit-overflow-scrolling:touch}.v618-track::-webkit-scrollbar{display:none}.v618-slide{position:relative;flex:0 0 100%;width:100%;aspect-ratio:1/1;scroll-snap-align:start;overflow:hidden;background:#0d0d0d}.v618-slide-media,.v618-slide-media img,.v618-slide-media video{width:100%;height:100%;object-fit:cover}.v618-slide-empty{display:grid;place-content:center;justify-items:center;height:100%;color:#727272}.v618-slide-empty>span{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#21150f;color:#ff7430;font-size:15px;font-weight:950}.v618-slide-empty>b{margin-top:9px;color:#aaa}.v618-slide-empty>small{margin-top:3px}.v618-slide>em{position:absolute;right:10px;top:10px;display:grid;place-items:center;min-width:27px;height:27px;padding:0 7px;border-radius:999px;background:#000b;color:#fff;font-size:9px;font-style:normal}.v618-nav{position:absolute;z-index:2;top:50%;transform:translateY(-50%);display:grid;place-items:center;width:34px;height:34px;border:1px solid #ffffff2b;border-radius:50%;background:#0b0b0bbd;color:#fff;font-size:22px}.v618-nav.prev{left:8px}.v618-nav.next{right:8px}.v618-dots{display:flex;justify-content:center;gap:5px}.v618-dots button{width:6px;height:6px;padding:0;border:0;border-radius:99px;background:#414141}.v618-dots button.on{width:15px;background:#ff6a00}.v618-carousel-detail{margin:13px 0 16px}.v618-carousel-detail .v618-carousel{max-width:560px;margin:auto}.v618-carousel-detail+.grid2>section.panel:first-child{display:none!important}.v618-carousel-detail+.grid2{grid-template-columns:1fr!important}.v618-portal-cover{position:relative}.v618-portal-cover>span{position:absolute;right:7px;top:7px;padding:4px 6px;border-radius:999px;background:#000b;color:#fff;font-size:7px;font-weight:900}
@media(max-width:760px){.v618-media-grid{grid-template-columns:1fr}.v618-media-card{grid-template-columns:72px minmax(0,1fr)}.v618-media-copy>b{font-size:11px}.v618-carousel-head b{font-size:12px}.v618-nav{display:none}.v618-track{border-radius:13px}.v618-carousel-detail{margin-left:-2px;margin-right:-2px}.v618-carousel-detail .v618-carousel{max-width:none}.v618-slide{aspect-ratio:4/5}.v618-slide-media,.v618-slide-media img,.v618-slide-media video{object-fit:contain;background:#080808}}
`;document.head.appendChild(v618Style);
// ===== FIM COLAB V6.18 =====


// ===== COLAB V6.19 — REVISÃO INTERNA DO CARROSSEL =====
function carouselReviewBlockV619(content){
  let work=workflowWorkV583(content.id),slides=Array.isArray(work?.slides)?work.slides:[],preview=carouselPreviewV618(content,{review:true});
  return `<section class="v619-review-block"><div class="v619-review-head"><div><small>PRÉVIA PARA REVISÃO</small><b>Confira o carrossel inteiro antes de enviar</b></div><button type="button" class="btn ghost small" data-v619-full-review="${content.id}">Abrir maior ↗</button></div>${preview}<div class="v619-review-copy"><small>SEQUÊNCIA</small><div>${slides.map((text,i)=>`<span><b>${i===0?'CAPA':`CARD ${i+1}`}</b><em>${E(String(text||'').slice(0,120))}${String(text||'').length>120?'…':''}</em></span>`).join('')}</div></div></section>`;
}
const _workflowProgressModalV619Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let html=_workflowProgressModalV619Base(content),work=workflowWorkV583(content.id),stage=workflowStageV583(work);
  if(stage!=='internal_review'||content.format!=='carousel')return html;
  let thumb=socialAssetV550(content);
  return html.replace(thumb,carouselReviewBlockV619(content));
};
function carouselFullReviewModalV619(content){
  let work=workflowWorkV583(content.id),slides=Array.isArray(work?.slides)?work.slides:[];
  return `<div class="modalbg v619-full-bg"><div class="modal wide v619-full-modal"><div class="head"><div><small class="ey">REVISÃO DO CARROSSEL</small><h2>${E(content.title||'Conteúdo')}</h2><p class="muted">Deslize card por card como no Instagram.</p></div><button class="btn ghost small" data-close>×</button></div><div class="v619-full-preview">${carouselPreviewV618(content,{review:true})}</div>${slides.length?`<details class="v619-full-copy"><summary>Ver textos dos ${slides.length} cards</summary><div>${slides.map((text,i)=>`<article><small>${i===0?'CAPA':`CARD ${i+1}`}</small><p>${E(text||'')}</p></article>`).join('')}</div></details>`:''}</div></div>`;
}
const _modalV619Base=modal;
modal=function(){if(MD?.type==='carouselReviewV619'){let content=(D.contents||[]).find(c=>c.id===MD.id);return content?carouselFullReviewModalV619(content):''}return _modalV619Base()};
const _bindV619Base=bind;
bind=function(){_bindV619Base();document.querySelectorAll('[data-v619-full-review]').forEach(button=>button.onclick=()=>{MD={type:'carouselReviewV619',id:button.dataset.v619FullReview};render()});setTimeout(()=>{bindCarouselsV618();hydratePreviews()},30)};
const v619Style=document.createElement('style');v619Style.textContent=`
.v619-review-block{display:grid;gap:11px;margin:10px 0 16px;padding:13px;border:1px solid #4a2d1e;border-radius:15px;background:#100d0b}.v619-review-head{display:flex;align-items:end;justify-content:space-between;gap:10px}.v619-review-head small,.v619-review-head b{display:block}.v619-review-head small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.12em}.v619-review-head b{margin-top:4px;font-size:13px}.v619-review-block .v618-carousel{max-width:560px;margin:0 auto}.v619-review-copy{padding-top:10px;border-top:1px solid #2d241f}.v619-review-copy>small{color:#777;font-size:7px;font-weight:950;letter-spacing:.1em}.v619-review-copy>div{display:grid;gap:5px;margin-top:7px}.v619-review-copy span{display:grid;grid-template-columns:58px 1fr;gap:8px;padding:8px 9px;border:1px solid #2d2d2d;border-radius:9px;background:#121212}.v619-review-copy span b{color:#ff7b3a;font-size:7px}.v619-review-copy span em{color:#aaa;font-size:8px;line-height:1.4;font-style:normal}.v619-full-bg{padding:12px}.v619-full-modal{max-width:960px!important}.v619-full-preview{max-width:680px;margin:8px auto 16px}.v619-full-preview .v618-slide{aspect-ratio:4/5}.v619-full-preview .v618-slide-media,.v619-full-preview .v618-slide-media img,.v619-full-preview .v618-slide-media video{object-fit:contain;background:#080808}.v619-full-copy{max-width:680px;margin:0 auto;padding:12px;border:1px solid #2d2d2d;border-radius:13px;background:#111}.v619-full-copy summary{color:#ff7b3a;font-size:10px;font-weight:900;cursor:pointer}.v619-full-copy>div{display:grid;gap:7px;margin-top:10px}.v619-full-copy article{padding:10px;border:1px solid #292929;border-radius:10px;background:#151515}.v619-full-copy article small{color:#ff7b3a;font-size:7px;font-weight:950}.v619-full-copy article p{margin:5px 0 0;color:#bbb;font-size:10px;line-height:1.5;white-space:pre-wrap}@media(max-width:760px){.v619-review-block{padding:10px}.v619-review-head{align-items:flex-start}.v619-review-head b{font-size:12px}.v619-review-head .btn{min-height:36px!important;padding:7px 9px!important;font-size:9px!important}.v619-review-copy span{grid-template-columns:48px 1fr}.v619-review-copy span em{font-size:10px}.v619-full-bg{padding:5px!important}.v619-full-modal{width:calc(100vw - 10px)!important;max-width:none!important;height:calc(100vh - 10px)!important;max-height:none!important;border-radius:18px!important}.v619-full-preview{max-width:none}.v619-full-preview .v618-slide{aspect-ratio:4/5}}
`;document.head.appendChild(v619Style);
// ===== FIM COLAB V6.19 =====


// ===== COLAB V6.20 — FLUXO MOBILE DE PRODUÇÃO + REVISÃO DAS DUAS =====
let carouselRestoreV620=null;
function internalReviewMapV620(work){let state=work?.approval_state&&typeof work.approval_state==='object'?work.approval_state:{},map=state.internal_review&&typeof state.internal_review==='object'?state.internal_review:{};return map}
function internalReviewReadyV620(work){let people=D.profiles||[],map=internalReviewMapV620(work);return people.length>0&&people.every(p=>map[p.user_id]?.approved===true)}
function internalReviewBlockV620(content,work){let people=D.profiles||[],map=internalReviewMapV620(work),done=people.filter(p=>map[p.user_id]?.approved===true).length,my=map[S.user?.id]?.approved===true;return `<section class="v620-review-team"><div class="v620-review-team-head"><div><small>REVISÃO DA EQUIPE</small><b>${done} de ${people.length} conferiram</b></div><span>${done}/${people.length}</span></div><div class="v620-review-people">${people.map(p=>{let ok=map[p.user_id]?.approved===true;return `<div class="${ok?'ok':''}"><span>${E(ini(p.display_name))}</span><b>${E(p.display_name)}</b><em>${ok?'Revisado ✓':'Pendente'}</em></div>`}).join('')}</div><button type="button" class="btn ${my?'ghost':'pri'} full" data-v620-my-review="${content.id}" data-approved="${my?'1':'0'}">${my?'Minha revisão está OK ✓':'Marcar minha revisão como OK'}</button></section>`}
async function toggleMyInternalReviewV620(contentId,approved){let content=(D.contents||[]).find(c=>c.id===contentId),work=content?workflowWorkV583(content.id):null;if(!work||!S.user?.id)return;let state=work.approval_state&&typeof work.approval_state==='object'?{...work.approval_state}:{},map=state.internal_review&&typeof state.internal_review==='object'?{...state.internal_review}:{};if(approved)delete map[S.user.id];else map[S.user.id]={approved:true,at:new Date().toISOString(),name:profile(S.user.id)?.display_name||''};state.internal_review=map;await patch('content_team_workflow',work.id,{approval_state:state,updated_at:new Date().toISOString()});await load();MD={type:'contentDetail',id:contentId};render();toast(approved?'Revisão desmarcada':'Sua revisão foi registrada ✓')}
const _workflowProgressModalV620Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){let html=_workflowProgressModalV620Base(content),work=workflowWorkV583(content.id),stage=workflowStageV583(work);if(stage!=='internal_review')return html;let block=internalReviewBlockV620(content,work),needle='<div class="field"><label>Observações da revisão';html=html.replace(needle,block+needle);let ready=internalReviewReadyV620(work);html=html.replace(`<button type="button" class="btn pri" data-v591-move="client_approval" data-content="${content.id}">Enviar para cliente →</button>`,ready?`<button type="button" class="btn pri" data-v591-move="client_approval" data-content="${content.id}">Enviar para cliente →</button>`:`<button type="button" class="btn pri" disabled title="Aguardando revisão das duas">Aguardando revisão da equipe</button>`);return html};
const _moveWorkflowV620Base=moveWorkflowV591;
moveWorkflowV591=async function(contentId,target,reload=true){let content=(D.contents||[]).find(c=>c.id===contentId),work=content?workflowWorkV583(contentId):null;if(work&&target==='client_approval'&&!internalReviewReadyV620(work)){toast('As duas precisam revisar antes de enviar para a cliente');return}if(work&&target==='internal_review'&&workflowStageV583(work)!=='internal_review'){let state=work.approval_state&&typeof work.approval_state==='object'?{...work.approval_state}:{};state.internal_review={};await patch('content_team_workflow',work.id,{approval_state:state,updated_at:new Date().toISOString()})}return _moveWorkflowV620Base(contentId,target,reload)};

async function uploadCarouselSlideV618(input){let file=input.files?.[0],slot=Number(input.dataset.v618SlideUpload||0),form=document.getElementById('workflowProgressFormV591'),content=form?(D.contents||[]).find(c=>c.id===form.dataset.content):null;if(!file||!slot||!content)return;if(!String(file.type||'').startsWith('image/')){toast('Use uma imagem neste card');input.value='';return}if(file.size>20*1024*1024){toast('A imagem deve ter no máximo 20 MB');input.value='';return}let modalEl=input.closest('.modal'),scrollTop=modalEl?.scrollTop||0;carouselRestoreV620={contentId:content.id,slot,scrollTop};let label=input.closest('label'),old=label?.textContent;if(label){label.style.pointerEvents='none';label.textContent='Enviando...'}try{await saveProductionFormatV617(form,content.id);let version=Number(content.current_version||1),existing=carouselAssetsV618(content).find(a=>a._slide===slot),safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-'),path=`${M.organization_id}/${content.client_id}/contents/${content.id}/v${version}/slide-${slot}-${Date.now()}-${safe}`;await uploadRaw(file,path);if(slot===1)await api(`/rest/v1/content_assets?content_id=eq.${content.id}&version_no=eq.${version}&is_primary=eq.true`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({is_primary:false})});if(existing)await api(`/rest/v1/content_assets?id=eq.${existing.id}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});await api('/rest/v1/content_assets',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:content.client_id,content_id:content.id,storage_path:path,file_name:file.name,mime_type:file.type||null,file_size:file.size,asset_type:'image',version_no:version,is_primary:slot===1,slide_index:slot,uploaded_by:S.user?.id})});await load();MD={type:'contentDetail',id:content.id};render();toast(`${slot===1?'Capa':`Card ${slot}`} atualizado ✦`)}catch(error){toast(error.message);carouselRestoreV620=null;if(label){label.style.pointerEvents='';label.textContent=old||'Adicionar imagem'}}finally{input.value=''}}
function restoreCarouselPositionV620(){if(!carouselRestoreV620)return;let state=carouselRestoreV620,content=(D.contents||[]).find(c=>c.id===state.contentId);if(!content||MD?.id!==state.contentId)return;requestAnimationFrame(()=>requestAnimationFrame(()=>{let modalEl=document.querySelector('.modal'),card=document.querySelector(`[data-v618-media-card="${state.slot}"]`);if(modalEl)modalEl.scrollTop=state.scrollTop;if(card){card.classList.add('v620-just-uploaded');setTimeout(()=>card.classList.remove('v620-just-uploaded'),900)}carouselRestoreV620=null}))}
const _bindV620Base=bind;
bind=function(){_bindV620Base();document.querySelectorAll('[data-v620-my-review]').forEach(button=>button.onclick=()=>toggleMyInternalReviewV620(button.dataset.v620MyReview,button.dataset.approved==='1'));restoreCarouselPositionV620()};
const v620Style=document.createElement('style');v620Style.textContent=`
.v620-review-team{display:grid;gap:10px;margin:12px 0;padding:13px;border:1px solid #443226;border-radius:14px;background:#12100f}.v620-review-team-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.v620-review-team-head small,.v620-review-team-head b{display:block}.v620-review-team-head small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.12em}.v620-review-team-head b{margin-top:3px;font-size:13px}.v620-review-team-head>span{display:grid;place-items:center;min-width:42px;height:30px;border-radius:999px;background:#23160f;color:#ff7b38;font-size:10px;font-weight:950}.v620-review-people{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.v620-review-people>div{display:grid;grid-template-columns:34px 1fr;column-gap:8px;align-items:center;padding:9px;border:1px solid #303030;border-radius:11px;background:#111}.v620-review-people>div>span{grid-row:1/3;display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#20130d;color:#ff7835;font-size:10px;font-weight:950}.v620-review-people b{font-size:10px}.v620-review-people em{color:#777;font-size:8px;font-style:normal}.v620-review-people>div.ok{border-color:#2b5638;background:#101813}.v620-review-people>div.ok>span{background:#173020;color:#77d997}.v620-review-people>div.ok em{color:#71c98a}.v620-just-uploaded{outline:2px solid #ff6a00!important;outline-offset:2px;transition:outline-color .4s}.v591-stage-form button[disabled]{opacity:.45!important;cursor:not-allowed!important}.v618-media-card{scroll-margin-block:110px}@media(max-width:760px){.v620-review-team{padding:11px}.v620-review-team-head b{font-size:14px}.v620-review-people{grid-template-columns:1fr 1fr}.v620-review-people>div{grid-template-columns:30px 1fr;padding:8px}.v620-review-people>div>span{width:30px;height:30px}.v620-review-people b{font-size:11px}.v620-review-people em{font-size:9px}.v618-media-grid{gap:10px}.v618-media-card{min-height:96px;padding:10px}.v618-media-copy .btn{min-height:40px!important;font-size:11px!important}.v618-remove{font-size:10px!important;padding:8px!important}}
`;document.head.appendChild(v620Style);
// ===== FIM COLAB V6.20 =====


// ===== COLAB V6.21 — REVISÃO IMERSIVA DO CARROSSEL =====
function carouselImmersiveSlidesV621(content){
  let work=workflowWorkV583(content.id),count=carouselCountV618(content,work),assets=carouselAssetsV618(content),bySlot=new Map(assets.map(a=>[a._slide,a]));
  let real=Array.from({length:count},(_,k)=>({i:k+1,asset:bySlot.get(k+1)||null}));
  if(!real.length)return[];
  return [real[real.length-1],...real,real[0]];
}
function carouselImmersiveSlideV621(item,clone=''){
  let a=item.asset,i=item.i;
  return `<div class="v621-slide ${clone}" data-v621-real="${i}">${a?`<div class="v621-media" data-asset-path="${E(a.storage_path)}" data-mime="${E(a.mime_type||'')}" data-filename="${E(a.file_name||`Card ${i}`)}"></div>`:`<div class="v621-empty"><b>${i}</b><span>${i===1?'Capa':`Card ${i}`}</span><small>Sem arte neste card</small></div>`}</div>`;
}
carouselFullReviewModalV619=function(content){
  let work=workflowWorkV583(content.id),count=carouselCountV618(content,work),slides=carouselImmersiveSlidesV621(content);
  return `<div class="modalbg v621-bg"><div class="modal v621-modal"><header class="v621-top"><div><small>REVISÃO DO CARROSSEL</small><b>${E(content.title||'Conteúdo')}</b></div><div class="v621-top-actions"><span data-v621-counter>1 / ${count}</span><button type="button" data-close aria-label="Fechar">×</button></div></header><section class="v621-stage" data-v621-root data-count="${count}"><button type="button" class="v621-arrow prev" data-v621-prev aria-label="Card anterior">‹</button><div class="v621-viewport"><div class="v621-track" data-v621-track>${slides.map((item,idx)=>carouselImmersiveSlideV621(item,idx===0?'clone-last':idx===slides.length-1?'clone-first':'')).join('')}</div></div><button type="button" class="v621-arrow next" data-v621-next aria-label="Próximo card">›</button></section><footer class="v621-bottom"><div class="v621-dots">${Array.from({length:count},(_,i)=>`<button type="button" data-v621-dot="${i}" class="${i===0?'on':''}" aria-label="Ir para card ${i+1}"></button>`).join('')}</div><span>Deslize para o lado</span></footer></div></div>`;
};
function bindImmersiveCarouselV621(){
  document.querySelectorAll('[data-v621-root]').forEach(root=>{
    if(root.dataset.bound==='1')return;root.dataset.bound='1';
    let track=root.querySelector('[data-v621-track]'),slides=[...track.children],count=Number(root.dataset.count||0),modal=root.closest('.v621-modal'),counter=modal?.querySelector('[data-v621-counter]'),dots=[...(modal?.querySelectorAll('[data-v621-dot]')||[])];
    if(!track||!count)return;
    let index=1,busy=false,startX=0,deltaX=0,dragging=false,width=()=>root.querySelector('.v621-viewport')?.clientWidth||1;
    let paint=(animate=true)=>{track.style.transition=animate?'transform .28s cubic-bezier(.22,.7,.25,1)':'none';track.style.transform=`translate3d(${-index*100}%,0,0)`;let real=((index-1)%count+count)%count;dots.forEach((d,j)=>d.classList.toggle('on',j===real));if(counter)counter.textContent=`${real+1} / ${count}`};
    let settle=()=>{if(index===0){index=count;paint(false)}else if(index===count+1){index=1;paint(false)}busy=false};
    let go=dir=>{if(busy)return;busy=true;index+=dir;paint(true)};
    track.addEventListener('transitionend',settle);
    root.querySelector('[data-v621-prev]')?.addEventListener('click',()=>go(-1));
    root.querySelector('[data-v621-next]')?.addEventListener('click',()=>go(1));
    dots.forEach((d,i)=>d.addEventListener('click',()=>{if(busy)return;index=i+1;paint(true)}));
    let pointerDown=e=>{if(e.button!==undefined&&e.button!==0)return;dragging=true;startX=e.clientX;deltaX=0;track.style.transition='none';root.setPointerCapture?.(e.pointerId)};
    let pointerMove=e=>{if(!dragging)return;deltaX=e.clientX-startX;let pct=(deltaX/width())*100;track.style.transform=`translate3d(calc(${-index*100}% + ${pct}%),0,0)`};
    let pointerUp=e=>{if(!dragging)return;dragging=false;root.releasePointerCapture?.(e.pointerId);if(Math.abs(deltaX)>Math.min(70,width()*.16))go(deltaX<0?1:-1);else paint(true)};
    root.addEventListener('pointerdown',pointerDown);root.addEventListener('pointermove',pointerMove);root.addEventListener('pointerup',pointerUp);root.addEventListener('pointercancel',pointerUp);
    root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}if(e.key==='ArrowRight'){e.preventDefault();go(1)}});
    paint(false);
  });
}
const _bindV621Base=bind;
bind=function(){_bindV621Base();bindImmersiveCarouselV621();setTimeout(hydratePreviews,20)};
const v621Style=document.createElement('style');v621Style.textContent=`
.v621-bg{padding:0!important;background:#050505f4!important}.v621-modal{display:grid!important;grid-template-rows:auto minmax(0,1fr) auto!important;width:min(1120px,100vw)!important;height:min(900px,100vh)!important;max-width:none!important;max-height:none!important;padding:0!important;overflow:hidden!important;border:0!important;border-radius:0!important;background:#070707!important}.v621-top{display:flex;align-items:center;justify-content:space-between;gap:14px;min-width:0;padding:14px 18px;border-bottom:1px solid #202020;background:#090909}.v621-top>div:first-child{min-width:0}.v621-top small,.v621-top b{display:block}.v621-top small{color:#ff7430;font-size:9px;font-weight:950;letter-spacing:.12em}.v621-top b{margin-top:4px;overflow:hidden;color:#f5f5f5;font-size:15px;white-space:nowrap;text-overflow:ellipsis}.v621-top-actions{display:flex;align-items:center;gap:10px;flex:0 0 auto}.v621-top-actions>span{color:#d0d0d0;font-size:11px;font-weight:900}.v621-top-actions>button{display:grid;place-items:center;width:42px;height:42px;padding:0;border:1px solid #303030;border-radius:50%;background:#111;color:#eee;font-size:21px}.v621-stage{position:relative;display:grid;place-items:center;min-height:0;overflow:hidden;background:#000;touch-action:pan-y;user-select:none}.v621-viewport{width:100%;height:100%;overflow:hidden}.v621-track{display:flex;width:100%;height:100%;will-change:transform}.v621-slide{display:grid;place-items:center;flex:0 0 100%;width:100%;height:100%;min-width:100%;overflow:hidden;background:#000}.v621-media{width:100%;height:100%;display:grid;place-items:center;background:#000}.v621-media img,.v621-media video{display:block;width:100%;height:100%;object-fit:contain;background:#000}.v621-empty{display:grid;place-items:center;align-content:center;gap:6px;width:100%;height:100%;color:#777}.v621-empty b{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#21140d;color:#ff7430}.v621-empty span{color:#bbb;font-weight:900}.v621-empty small{color:#666}.v621-arrow{position:absolute;z-index:3;top:50%;display:grid;place-items:center;width:44px;height:44px;padding:0;border:1px solid #ffffff24;border-radius:50%;background:#0b0b0bc9;color:#fff;font-size:28px;transform:translateY(-50%)}.v621-arrow.prev{left:16px}.v621-arrow.next{right:16px}.v621-bottom{display:grid;place-items:center;gap:7px;padding:11px 16px 13px;border-top:1px solid #1b1b1b;background:#080808}.v621-bottom>span{color:#666;font-size:9px}.v621-dots{display:flex;align-items:center;justify-content:center;gap:6px}.v621-dots button{width:6px;height:6px;padding:0;border:0;border-radius:99px;background:#3a3a3a;transition:.18s}.v621-dots button.on{width:20px;background:#ff6a00}
@media(max-width:760px){.v621-bg{padding:0!important}.v621-modal{width:100vw!important;height:100vh!important;border-radius:0!important}.v621-top{padding:10px 12px}.v621-top small{font-size:8px}.v621-top b{font-size:13px}.v621-top-actions>button{width:40px;height:40px}.v621-stage{width:100%!important}.v621-arrow{width:38px;height:38px;font-size:24px;background:#0505058f}.v621-arrow.prev{left:8px}.v621-arrow.next{right:8px}.v621-bottom{padding:9px 10px 11px}.v621-media img,.v621-media video{object-fit:contain}.v619-full-copy{display:none!important}}
`;
document.head.appendChild(v621Style);
// ===== FIM COLAB V6.21 =====


// ===== COLAB V6.22 — ESPELHAMENTO REAL + APROVAÇÃO SÓ DA PEÇA =====
// A prévia interna deixa de inventar conteúdos e métricas: espelha somente dados reais.
socialPortalDemoItemsV550=function(){return[]};
socialDemoReportsV550=function(){return[]};

function approvalArtworkV622(content,mirror=false){
  if(content?.format==='carousel'){
    let preview=carouselPreviewV618(content,{review:true});
    return `<section class="v622-approval-art carousel"><div class="v622-art-head"><div><small>CARROSSEL</small><b>Deslize para revisar a peça</b></div><button type="button" class="btn ghost small" data-v619-full-review="${content.id}">Abrir grande ↗</button></div>${preview}</section>`;
  }
  let asset=currentAsset(content);
  return `<section class="v622-approval-art"><div class="v622-art-head"><div><small>${E(fmt(content?.format||'Conteúdo'))}</small><b>Peça para aprovação</b></div></div><div class="v622-single-art" ${asset?`data-asset-path="${E(asset.storage_path)}" data-mime="${E(asset.mime_type||'')}" data-filename="${E(asset.file_name||'Arte')}"`:''}>${asset?'▧':'Arte ainda não anexada'}</div></section>`;
}

function clientApprovalOnlyModalV622(approval,mirror=false){
  let content=approval?.contents||(D.contents||[]).find(c=>c.id===approval?.content_id);if(!content)return'';
  return `<div class="modalbg v622-approval-bg"><div class="modal wide v622-approval-modal"><div class="v622-approval-top"><div><small>${mirror?'ESPELHAMENTO · APROVAÇÃO':'PARA SUA APROVAÇÃO'}</small><h2>${E(content.title||'Conteúdo')}</h2><span>${E(fmt(content.format||'Conteúdo'))}</span></div><button type="button" class="btn ghost small" data-close>×</button></div>${approvalArtworkV622(content,mirror)}${mirror?`<div class="v622-mirror-note"><b>Modo espelho</b><span>É assim que a cliente visualiza esta aprovação. Nenhuma ação funciona neste modo.</span></div>`:`<section class="v622-client-decision"><div><small>SUA DECISÃO</small><h3>A peça está aprovada?</h3></div><div class="field"><label>Comentário <span class="muted">(opcional)</span></label><textarea id="comment" rows="3" placeholder="Se quiser alguma alteração, diga o que precisa mudar."></textarea></div><div class="actions"><button class="btn danger" data-dec="changes_requested">Solicitar alteração</button><button class="btn pri" data-dec="approved">✓ Aprovar</button></div></section>`}</div></div>`;
}

const _contentDetailModalV622Base=contentDetailModal;
contentDetailModal=function(isApproval){
  if(isApproval&&M?.role==='client'){
    let approval=(D.approvals||[]).find(a=>a.id===MD?.id);return clientApprovalOnlyModalV622(approval,false);
  }
  return _contentDetailModalV622Base(isApproval);
};

function portalApprovalsV622(cid,preview=false){
  let rows=portalApprovalsV428Rows(cid),pending=rows.filter(x=>x.status==='pending'),history=rows.filter(x=>x.status!=='pending').slice(0,6);
  return `<div class="portal-v428 v622-portal-approvals">${portalTabsV428('approvals',preview)}<div class="portal-page-hero-v428"><small class="ey">APROVAÇÕES</small><h2>Veja a peça antes de ir ao ar</h2><p>Aqui aparecem somente as entregas finais liberadas pela Colab para sua aprovação.</p></div><section><div class="portal-section-head-v428"><div><small class="ey">PARA SUA REVISÃO</small><h3>${pending.length?`${pending.length} conteúdo${pending.length===1?'':'s'} aguardando você`:'Tudo aprovado por aqui ✨'}</h3></div></div><div class="v622-approval-list">${pending.map(a=>{let content=a.contents||portalContentsV428(cid).find(x=>x.id===a.content_id)||{};return `<article class="portal-approval-v428 v622-approval-card">${portalAssetV428(content)}<div><small class="ey">${E(fmt(content.format||'Conteúdo'))}</small><h3>${E(content.title||'Conteúdo')}</h3><p>Peça pronta para sua aprovação.</p></div><button class="btn pri" ${preview?`data-v622-mirror-approval="${a.id}"`:`data-ap="${a.id}"`}>Revisar peça</button></article>`}).join('')||portalEmptyV428('Quando uma peça estiver pronta para sua revisão, ela aparece aqui.')}</div></section>${history.length?`<section class="portal-panel-v428 portal-history-v428"><small class="ey">HISTÓRICO RECENTE</small><h3>Decisões anteriores</h3>${history.map(a=>`<div class="row"><span class="dot ${a.status==='approved'?'g':'r'}"></span><div class="grow"><b>${E(a.contents?.title||'Conteúdo')}</b><small>${a.status==='approved'?'Aprovado':'Alteração solicitada'}</small></div><span class="tag ${a.status==='approved'?'g':'r'}">${a.status==='approved'?'Aprovado':'Ajustes'}</span></div>`).join('')}</section>`:''}</div>`;
}

const _portalPageV622Base=portalPageV428;
portalPageV428=function(route,cid,preview=false){if(route==='approvals')return portalApprovalsV622(cid,preview);return _portalPageV622Base(route,cid,preview)};

const _clientPreviewModalV622Base=clientPreviewModal;
clientPreviewModal=function(){
  let html=_clientPreviewModalV622Base(),client=cl(MD?.clientId);if(!client||!html)return html;
  html=html.replace(/MODO CLIENTE ·/g,'ESPELHAMENTO ·').replace(/Portal completo da cliente/g,'Portal real da cliente');
  html=html.replace(/Prévia segura: nenhuma ação altera informações reais\./g,'Espelho seguro: você está vendo somente os dados reais liberados para esta cliente.');
  return html;
};

const _clientMorePaneV622Base=clientMorePaneV591;
clientMorePaneV591=function(cid){
  let html=_clientMorePaneV622Base(cid),needle='<div class="v603-more-section"><h3>OPERAÇÃO</h3>';
  let mirror=`<button type="button" class="v622-mirror-client" data-v622-client-mirror="${cid}"><span>◎</span><div><small>PORTAL DA CLIENTE</small><b>Espelhar portal</b></div><em>Ver exatamente como ela vê →</em></button>`;
  return html.includes(needle)?html.replace(needle,mirror+needle):mirror+html;
};

const _modalV622Base=modal;
modal=function(){if(MD?.type==='clientApprovalMirrorV622'){let approval=(D.approvals||[]).find(a=>a.id===MD.id);return clientApprovalOnlyModalV622(approval,true)}return _modalV622Base()};

const _bindV622Base=bind;
bind=function(){
  _bindV622Base();
  document.querySelectorAll('[data-v622-client-mirror]').forEach(button=>button.onclick=()=>{MD={type:'clientPreview',clientId:button.dataset.v622ClientMirror,previewTab:'home'};render()});
  document.querySelectorAll('[data-v622-mirror-approval]').forEach(button=>button.onclick=()=>{let cid=MD?.clientId;MD={type:'clientApprovalMirrorV622',id:button.dataset.v622MirrorApproval,clientId:cid};render()});
  bindCarouselsV618();bindImmersiveCarouselV621();setTimeout(hydratePreviews,25);
};

const v622Style=document.createElement('style');v622Style.textContent=`
.v622-approval-bg{padding:10px}.v622-approval-modal{max-width:900px!important}.v622-approval-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px}.v622-approval-top small,.v622-approval-top h2,.v622-approval-top span{display:block}.v622-approval-top small{color:#ff7430;font-size:9px;font-weight:950;letter-spacing:.12em}.v622-approval-top h2{margin:5px 0 6px;font-size:25px;line-height:1.1}.v622-approval-top span{color:#888;font-size:10px}.v622-approval-art{padding:12px;border:1px solid #332923;border-radius:16px;background:#0b0b0b}.v622-art-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.v622-art-head small,.v622-art-head b{display:block}.v622-art-head small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.1em}.v622-art-head b{margin-top:3px;font-size:13px}.v622-single-art{display:grid;place-items:center;width:100%;min-height:420px;max-height:70vh;overflow:hidden;background:#050505;color:#666}.v622-single-art img,.v622-single-art video{display:block;width:100%;height:100%;max-height:70vh;object-fit:contain;background:#050505}.v622-client-decision{display:grid;gap:10px;margin-top:12px;padding:14px;border:1px solid #3a2a22;border-radius:15px;background:#13100e}.v622-client-decision small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.1em}.v622-client-decision h3{margin:4px 0 0;font-size:18px}.v622-mirror-note{display:flex;align-items:center;gap:9px;margin-top:10px;padding:10px 12px;border:1px solid #344b3b;border-radius:12px;background:#101813}.v622-mirror-note b{color:#76d890;font-size:10px}.v622-mirror-note span{color:#829087;font-size:9px}.v622-approval-list{display:grid;gap:9px;margin-top:13px}.v622-approval-card p{color:#777!important}.v622-mirror-client{display:grid;grid-template-columns:46px minmax(0,1fr) auto;gap:11px;align-items:center;width:100%;margin-bottom:14px;padding:13px;border:1px solid #75401f;border-radius:15px;background:linear-gradient(90deg,#24140c,#121212);color:#fff;text-align:left}.v622-mirror-client>span{display:grid;place-items:center;width:46px;height:46px;border-radius:13px;background:#ff6a00;color:#fff;font-size:17px;font-weight:950}.v622-mirror-client small,.v622-mirror-client b{display:block}.v622-mirror-client small{color:#ff8b4f;font-size:7px;font-weight:950;letter-spacing:.1em}.v622-mirror-client b{margin-top:3px;font-size:13px}.v622-mirror-client em{color:#aaa;font-size:9px;font-style:normal}.portalpreview .v622-approval-card .btn{pointer-events:auto!important;opacity:1!important}
@media(max-width:760px){.v622-approval-bg{padding:0!important}.v622-approval-modal{width:100vw!important;max-width:none!important;min-height:100vh!important;border-radius:0!important;padding:13px!important}.v622-approval-top h2{font-size:21px}.v622-approval-art{padding:8px;border-radius:13px}.v622-art-head{align-items:flex-start}.v622-art-head .btn{min-height:38px!important;font-size:10px!important}.v622-single-art{min-height:56vh}.v622-client-decision .actions{grid-template-columns:1fr!important}.v622-client-decision .actions .btn{width:100%!important;min-height:48px!important}.v622-mirror-client{grid-template-columns:44px minmax(0,1fr);padding:11px}.v622-mirror-client>span{width:44px;height:44px}.v622-mirror-client em{grid-column:2;font-size:9px}.v622-approval-card{align-items:center!important}.v622-approval-card .btn{min-height:42px!important}}
`;document.head.appendChild(v622Style);
// ===== FIM COLAB V6.22 =====


// ===== COLAB V6.23 — ESPELHAR PORTAL VISÍVEL + MAIS NO ENQUADRAMENTO =====
const _clientHeaderV623Base=clientHeaderV591;
clientHeaderV591=function(cid){
  let html=_clientHeaderV623Base(cid);
  let mirror=`<button type="button" class="v623-mirror-head" data-v622-client-mirror="${cid}" aria-label="Espelhar portal da cliente"><span>◎</span><b>Espelhar portal</b></button>`;
  return html.replace('<span class="v591-active">',mirror+'<span class="v591-active">');
};
const v623Style=document.createElement('style');v623Style.textContent=`
.v623-mirror-head{display:flex;align-items:center;gap:8px;flex:0 0 auto;min-height:42px;padding:7px 11px;border:1px solid #57311d;border-radius:12px;background:#18100c;color:#f4f4f4;cursor:pointer}.v623-mirror-head span{display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#ff6a00;color:#fff;font-size:12px;font-weight:950}.v623-mirror-head b{font-size:9px;white-space:nowrap}.v591-client-nav{overflow:visible!important}.v591-client-nav button{min-width:0!important}
@media(max-width:760px){.v591-client-header{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;align-items:center!important}.v591-client-identity{min-width:0!important}.v591-client-identity h1{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v623-mirror-head{width:42px;height:42px;min-height:42px;padding:0;justify-content:center}.v623-mirror-head span{width:28px;height:28px}.v623-mirror-head b{display:none}.v591-client-nav{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:2px!important;margin:0!important;padding:8px 0 10px!important;overflow:visible!important}.v591-client-nav button{width:100%!important;min-width:0!important;padding:0 3px!important;font-size:9px!important;white-space:nowrap!important}.v591-client-nav button:nth-child(4){font-size:8.5px!important}}
`;document.head.appendChild(v623Style);
// ===== FIM COLAB V6.23 =====


// ===== COLAB V6.24 — PORTAL SEM VAZAMENTO INTERNO + WORKFLOW MOBILE LIMPO =====
function clientArtworkReadOnlyV624(content,mirror=false){
  if(!content)return'';
  return `<div class="modalbg v622-approval-bg v624-readonly-bg"><div class="modal wide v622-approval-modal v624-readonly-modal"><div class="v622-approval-top"><div><small>${mirror?'ESPELHAMENTO · PEÇA':'PEÇA LIBERADA'}</small><h2>${E(content.title||'Conteúdo')}</h2><span>${E(fmt(content.format||'Conteúdo'))}</span></div><button type="button" class="btn ghost small" data-close>×</button></div>${approvalArtworkV622(content,mirror)}${mirror?`<div class="v622-mirror-note"><b>Modo espelho</b><span>Somente a peça liberada aparece aqui. Briefing, roteiro, estrutura e produção continuam internos.</span></div>`:''}</div></div>`;
}
const _contentDetailModalV624Base=contentDetailModal;
contentDetailModal=function(isApproval){
  if(M?.role==='client'&&!isApproval){let content=(D.contents||[]).find(c=>c.id===MD?.id);return clientArtworkReadOnlyV624(content,false)}
  return _contentDetailModalV624Base(isApproval)
};

portalWorkflowCardV587=function(content,preview=false){
  let stage=portalWorkflowStageV587(content),label=content.status==='changes_requested'?'Ajustes solicitados':({review:'Para aprovar',approved:'Aprovado',scheduled:'Programado',published:'Publicado'})[stage],approval=(D.approvals||[]).find(row=>row.content_id===content.id&&row.status==='pending'),action='';
  if(stage==='review'&&approval)action=preview?`data-v622-mirror-approval="${approval.id}"`:`data-ap="${approval.id}"`;
  return `<article class="v583-card portal v587-portal-card v624-portal-card ${stage}" ${action}>${socialAssetV550(content)}<div class="v583-card-copy"><small class="ey">${E(fmt(content.format||'undefined'))}</small><h4>${E(content.title||'Conteúdo')}</h4><span class="tag v587-${stage}">${E(label)}</span></div>${stage==='review'&&approval?'<em>Revisar peça →</em>':''}</article>`
};
portalWorkflowBoardV587=function(items,preview=false){
  let stages=[['review','Para aprovar'],['approved','Aprovado'],['scheduled','Programado'],['published','Publicado']],groups=stages.map(([key,label])=>({key,label,rows:items.filter(item=>portalWorkflowStageV587(item)===key)})).filter(group=>group.rows.length);
  if(!groups.length)return '<div class="v624-portal-empty"><b>Nenhuma peça liberada neste mês.</b><span>Quando uma entrega sair da revisão interna, ela aparece aqui.</span></div>';
  return `<div class="v624-portal-board">${groups.map(group=>`<section class="v624-portal-lane stage-${group.key}"><header><i></i><b>${E(group.label)}</b><span>${group.rows.length}</span></header><div>${group.rows.map(item=>portalWorkflowCardV587(item,preview)).join('')}</div></section>`).join('')}</div>`
};
portalWorkflowPageV550=function(cid,preview=false){
  let rows=portalMonthItemsV428(cid,clientMonth);
  return `<div class="portal-v428 v550-portal-page v587-client-workflow v624-client-workflow">${portalTabsV428('workflow',preview)}<div class="portal-page-hero-v428"><small class="ey">CONTEÚDOS LIBERADOS</small><h2>O que já está pronto para você.</h2><p>Produção e revisão interna ficam com a Colab. Aqui entram somente peças enviadas para aprovação, aprovadas, programadas ou publicadas.</p></div><div class="filters"><input id="clientMonth" type="month" value="${E(clientMonth)}" ${preview?'disabled':''}></div>${portalWorkflowBoardV587(rows,preview)}</div>`
};

const _modalV624Base=modal;
modal=function(){if(MD?.type==='clientContentMirrorV624'){let content=(D.contents||[]).find(c=>c.id===MD.id);return clientArtworkReadOnlyV624(content,true)}return _modalV624Base()};
const _bindV624Base=bind;
bind=function(){
  _bindV624Base();
  document.querySelectorAll('.portalpreview [data-contentopen]').forEach(node=>{node.onclick=e=>{e.preventDefault();e.stopPropagation();MD={type:'clientContentMirrorV624',id:node.dataset.contentopen};render()}});
  document.querySelectorAll('.portalpreview [data-v622-mirror-approval]').forEach(button=>button.onclick=e=>{e.preventDefault();e.stopPropagation();let cid=MD?.clientId;MD={type:'clientApprovalMirrorV622',id:button.dataset.v622MirrorApproval,clientId:cid};render()});
};
const v624Style=document.createElement('style');v624Style.textContent=`
.v624-portal-board{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;min-width:0!important;margin-top:12px}.v624-portal-lane{min-width:0;padding:10px;border:1px solid #2d2d2d;border-radius:16px;background:#101010}.v624-portal-lane>header{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;padding:5px 4px 11px}.v624-portal-lane>header i{width:8px;height:8px;border-radius:50%;background:#ff6a00}.v624-portal-lane.stage-approved>header i,.v624-portal-lane.stage-published>header i{background:#62c878}.v624-portal-lane.stage-scheduled>header i{background:#72a7ff}.v624-portal-lane>header b{font-size:11px}.v624-portal-lane>header span{display:grid;place-items:center;min-width:24px;height:24px;padding:0 6px;border-radius:99px;background:#202020;color:#aaa;font-size:9px;font-weight:900}.v624-portal-lane>div{display:grid;gap:8px}.v624-portal-card{position:relative;min-width:0;overflow:hidden;border:1px solid #2c2c2c;border-radius:14px;background:#151515}.v624-portal-card>em{display:block;padding:0 11px 11px;color:#ff7a36;font-size:9px;font-style:normal;font-weight:900}.v624-portal-card:not([data-ap]):not([data-v622-mirror-approval]){cursor:default!important}.v624-portal-empty{display:grid;place-items:center;min-height:180px;padding:24px;border:1px dashed #333;border-radius:16px;text-align:center}.v624-portal-empty b{font-size:14px}.v624-portal-empty span{margin-top:5px;color:#777;font-size:10px}.v624-client-workflow{min-width:0!important;overflow:hidden!important}.v624-client-workflow .filters{overflow:visible!important}.portalpreview.clientmode{background:#111!important;color:#fff!important;border-color:#333!important}.portalpreview.clientmode>.head{color:#fff}.portalpreview.clientmode>.note{background:#17110e!important;color:#d99b75!important}.portalpreview.clientmode .v624-client-workflow{background:#0d0d0d!important;color:#fff!important;padding:14px;border-radius:16px}.portalpreview.clientmode .v624-portal-lane,.portalpreview.clientmode .v624-portal-card{background:#131313!important;border-color:#303030!important;color:#fff!important}.portalpreview.clientmode .v624-portal-card h4{color:#fff!important}.portalpreview.clientmode .v624-client-workflow .filters input{background:#151515!important;color:#fff!important;border-color:#333!important}.portalpreview.clientmode .portal-page-hero-v428 p{color:#999!important}
@media(max-width:760px){.v624-portal-board{grid-template-columns:1fr!important;gap:8px!important}.v624-portal-lane{min-height:0!important;padding:8px!important}.v624-portal-lane>header{padding:5px 4px 8px}.v624-portal-card{display:grid!important;grid-template-columns:92px minmax(0,1fr)!important;align-items:center!important}.v624-portal-card>.v550-media{width:92px!important;height:112px!important;min-height:112px!important;border-radius:10px!important}.v624-portal-card .v583-card-copy{min-width:0!important;padding:11px!important}.v624-portal-card .v583-card-copy h4{font-size:14px!important;line-height:1.25!important;white-space:normal!important}.v624-portal-card>em{grid-column:2;padding:0 11px 11px}.v624-client-workflow{padding-inline:0!important}.v624-client-workflow .portal-page-hero-v428{padding-inline:2px!important}.v624-client-workflow .filters{padding-inline:2px!important}.portalpreview.clientmode{width:calc(100vw - 20px)!important;max-width:none!important;max-height:92vh!important;padding:12px!important;border-radius:18px!important;overflow-x:hidden!important}.portalpreview.clientmode .v624-client-workflow{padding:10px!important}.v624-readonly-modal{width:100vw!important;max-width:none!important;min-height:100vh!important;border-radius:0!important}}
`;document.head.appendChild(v624Style);
// ===== FIM COLAB V6.24 =====


function portalPendingCountV625(cid){if(!cid)return 0;return (D.approvals||[]).filter(row=>row.client_id===cid&&row.status==='pending').length}
portalTabsV428=function(active,preview){let cid=preview?(MD?.clientId||clientHubIdV5||contentClient):M?.client_id,pending=portalPendingCountV625(cid),tabs=[['home','Visão geral'],['workflow','Workflow'],['approvals','Aprovações'],['contentCalendar','Calendário'],['calendar','Estratégia'],['recording','Para gravar'],['results','Resultados'],['more','Central']];return `<nav class="portal-tabs-v428 v625-portal-tabs" aria-label="Áreas do portal">${tabs.map(([route,label])=>`<button type="button" ${portalTabAttrsV428(route,preview)} class="${active===route?'on':''} ${route==='approvals'&&pending?'needs-attention':''}">${label}${route==='approvals'&&pending?`<i>${pending}</i>`:''}</button>`).join('')}</nav>`};
clientNav=function(){if(hasService('social_media')){let pending=portalPendingCountV625(M?.client_id);return [['home','⌂','Início'],['workflow','→','Workflow'],['approvals','✓',pending?`Aprovar <i class="v625-nav-badge">${pending}</i>`:'Aprovar'],['contentCalendar','▦','Calendário'],['more','•••','Central']]}return _clientNavV550Base()};
const v625Style=document.createElement('style');v625Style.textContent=`.v625-portal-tabs{display:flex!important;gap:5px!important;overflow-x:auto!important;scrollbar-width:none!important}.v625-portal-tabs button{position:relative!important;flex:0 0 auto!important}.v625-portal-tabs button.needs-attention{border-color:#ff6a00!important;background:#29160d!important;color:#fff!important}.v625-portal-tabs button.needs-attention i{display:inline-grid;place-items:center;min-width:20px;height:20px;margin-left:6px;padding:0 5px;border-radius:999px;background:#ff6a00;color:#fff;font-size:10px;font-style:normal;font-weight:950}.clientmode .nav button[data-v="approvals"] b{color:#ff6a00}.clientmode .nav button[data-v="approvals"] span{font-weight:900}.v625-nav-badge{display:inline-grid!important;place-items:center!important;min-width:17px!important;height:17px!important;margin-left:3px!important;padding:0 4px!important;border-radius:999px!important;background:#ff6a00!important;color:#fff!important;font-size:9px!important;font-style:normal!important}@media(max-width:760px){.v625-portal-tabs{margin-inline:-13px!important;padding:7px 13px 9px!important}.v625-portal-tabs button{min-height:39px!important;padding:8px 11px!important;font-size:11px!important}.clientmode .nav button[data-v="approvals"] b{display:grid!important;place-items:center!important;width:30px!important;height:30px!important;border-radius:10px!important;background:#ff6a00!important;color:#fff!important}.clientmode .nav button[data-v="approvals"] span{color:#ff7a31!important}}`;document.head.appendChild(v625Style);


// ===== COLAB V6.26 — RETIRAR DA APROVAÇÃO + EXCLUIR IDEIA =====
async function retractClientApprovalV626(contentId){
  let content=(D.contents||[]).find(row=>row.id===contentId),work=workflowWorkV583(contentId);if(!content||!work)return;
  if(!confirm('Tirar este conteúdo da aprovação da cliente e voltar para Produção? A cliente deixa de vê-lo imediatamente.'))return;
  let before=workflowStageV583(work),now=new Date().toISOString(),reviewState={...(work.approval_state||{}),internal_review:{}};
  try{
    await api(`/rest/v1/approvals?content_id=eq.${contentId}&status=eq.pending`,{method:'DELETE',headers:{Prefer:'return=minimal'}});
    await patch('content_team_workflow',work.id,{internal_status:'visual_production',assigned_to:work.design_owner_id||productionOwnerV591()||work.assigned_to||null,next_action:workflowNextActionV591(content,'visual_production'),approval_state:reviewState,stalled_since:now,updated_at:now});
    await patch('contents',contentId,{status:'editing',updated_at:now});
    await workflowActivityV583(content,'stage_changed','Retirado da aprovação da cliente e devolvido para produção',before,'visual_production',{reason:'retracted_before_client_decision'});
    MD=null;await load();render();toast('Voltou para Produção ✦');
  }catch(error){toast(error.message)}
}

const _moveWorkflowV626Base=moveWorkflowV591;
moveWorkflowV591=async function(contentId,target,reload=true){
  let work=workflowWorkV583(contentId),before=workflowStageV583(work);
  if(target==='visual_production'&&before==='client_approval'){
    return retractClientApprovalV626(contentId);
  }
  return _moveWorkflowV626Base(contentId,target,reload);
};

const _workflowProgressModalV626Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let html=_workflowProgressModalV626Base(content),work=workflowWorkV583(content.id),stage=workflowStageV583(work);
  if(stage!=='client_approval'||!html)return html;
  let action=`<div class="v626-retract-wrap"><button type="button" class="btn ghost v626-retract" data-v626-retract-approval="${content.id}">← Retirar da aprovação e voltar para Produção</button><small>A peça some do portal da cliente imediatamente.</small></div>`;
  let close='</section>';
  let pos=html.lastIndexOf(close);
  return pos>=0?html.slice(0,pos)+action+html.slice(pos):html+action;
};

async function deleteIdeaV626(id){
  let idea=(D.insights||[]).find(row=>row.id===id);if(!idea)return;
  let converted=idea.status==='converted'||!!idea.converted_content_id;
  let message=converted?`Excluir “${idea.title}” do Banco de Ideias?\n\nO conteúdo que já está no Workflow NÃO será excluído.`:`Excluir a ideia “${idea.title}”?`;
  if(!confirm(message))return;
  try{await api('/rest/v1/client_insights?id=eq.'+id,{method:'DELETE',headers:{Prefer:'return=minimal'}});await load();render();toast(converted?'Ideia removida do banco':'Ideia excluída')}catch(error){toast(error.message)}
}

ideaCardV591=function(idea){
  let b=ideaBriefV591(idea),missing=ideaMissingV591(idea),ready=!missing.length,converted=idea.status==='converted'||!!idea.converted_content_id;
  return `<article class="v591-idea-card ${ready?'ready':''} ${converted?'converted':''}"><div class="v591-idea-card-head"><div><small>${E(pillar(b.editorial_pillar_id)?.name||'Linha editorial')} · ${E(fmt(b.format||'undefined'))}</small><h3>${E(idea.title||'Ideia')}</h3></div><span class="${ready?'ready':'draft'}">${converted?'EM PRODUÇÃO':ready?'PRONTA':'INCOMPLETA'}</span></div><p>${E(String(b.narrative||'Sem narrativa preenchida.').slice(0,230))}${String(b.narrative||'').length>230?'…':''}</p>${b.format==='carousel'?`<div class="v591-idea-meta"><span>${Number(b.slide_count||0)} slides</span><span>${(b.slide_texts||[]).filter(Boolean).length} textos prontos</span></div>`:''}<div class="v591-idea-actions"><button class="btn ghost small" data-v591-idea-edit="${idea.id}">Editar</button>${converted?`<button class="btn ghost small" data-v591-open-content="${E(idea.converted_content_id||'')}">Abrir no Workflow →</button>`:`<button class="btn pri small" data-v591-send-production="${idea.id}" ${ready?'':`title="Falta: ${E(missing.join(', '))}"`}>Enviar para produção →</button>`}</div><button type="button" class="v626-delete-idea" data-v626-delete-idea="${idea.id}">${converted?'Excluir do Banco de Ideias':'Excluir ideia'}</button>${!ready&&!converted?`<small class="v591-missing">Falta: ${E(missing.join(' · '))}</small>`:''}</article>`;
};

const _bindV626Base=bind;
bind=function(){
  _bindV626Base();
  document.querySelectorAll('[data-v626-retract-approval]').forEach(button=>button.onclick=()=>retractClientApprovalV626(button.dataset.v626RetractApproval));
  document.querySelectorAll('[data-v626-delete-idea]').forEach(button=>button.onclick=()=>deleteIdeaV626(button.dataset.v626DeleteIdea));
};

const v626Style=document.createElement('style');v626Style.textContent=`
.v626-retract-wrap{display:grid;gap:6px;margin-top:14px;padding-top:13px;border-top:1px solid #3a2b24}.v626-retract{width:100%;min-height:46px;border-color:#71402a!important;color:#ff9a64!important}.v626-retract-wrap small{color:#75665e;font-size:9px;text-align:center}.v626-delete-idea{display:block;margin:10px 0 0 auto;padding:5px 0;border:0;background:transparent;color:#a16f68;font-size:8px;font-weight:850;text-decoration:underline;text-underline-offset:3px}.v626-delete-idea:hover{color:#ef8580}
@media(max-width:760px){.v626-retract{min-height:50px!important;font-size:11px!important}.v626-retract-wrap small{font-size:9px!important}.v626-delete-idea{margin-top:12px;font-size:10px!important}}
`;document.head.appendChild(v626Style);
// ===== FIM COLAB V6.26 =====


// ===== COLAB V6.27 — PRODUÇÃO = ESTÚDIO DE ARTES =====
function productionHiddenSlidesV627(work,count){let slides=Array.isArray(work?.slides)?work.slides:[];return Array.from({length:count},(_,k)=>`<input type="hidden" name="carousel_slide_${k+1}" value="${E(slides[k]||'')}">`).join('')}
function productionCarouselStudioV627(content,work){
  let count=carouselCountV618(content,work),assets=carouselAssetsV618(content),bySlot=new Map(assets.map(a=>[a._slide,a])),done=Array.from({length:count},(_,k)=>bySlot.has(k+1)).filter(Boolean).length;
  return `<section class="v627-art-studio"><div class="v627-studio-head"><div><small>ARTES DO CARROSSEL</small><b>${done===count?'Carrossel completo':'Suba as artes na ordem final'}</b></div><span>${done}/${count}</span></div><div class="v627-art-track" data-v627-art-track>${Array.from({length:count},(_,k)=>{let i=k+1,a=bySlot.get(i);return `<article class="v627-art-slide ${a?'has-art':'empty'}" data-v627-art-slide="${i}" data-v618-media-card="${i}"><header><b>${i===1?'CAPA':`CARD ${i}`}</b><span>${i} / ${count}</span></header><div class="v627-art-frame">${a?`<div class="v627-art-media" data-asset-path="${E(a.storage_path)}" data-mime="${E(a.mime_type||'')}" data-filename="${E(a.file_name||`Card ${i}`)}"></div>`:`<div class="v627-art-empty"><span>＋</span><b>${i===1?'Adicionar capa':`Adicionar arte do card ${i}`}</b><small>Toque em “Adicionar arte” abaixo</small></div>`}</div><footer><label class="btn ${a?'ghost':'pri'} v627-art-upload">${a?'Trocar arte':'＋ Adicionar arte'}<input type="file" accept="image/*" data-v618-slide-upload="${i}" hidden></label>${a?`<button type="button" class="v627-art-remove" data-v618-slide-remove="${a.id}">Remover</button>`:''}</footer></article>`}).join('')}</div><div class="v627-art-dots">${Array.from({length:count},(_,k)=>`<button type="button" class="${k===0?'on':''}" data-v627-jump="${k+1}" aria-label="Ir para card ${k+1}"></button>`).join('')}</div></section>`
}
function productionSingleStudioV627(content){let asset=currentAsset(content);return `<section class="v627-art-studio single"><div class="v627-studio-head"><div><small>ARTE FINAL</small><b>${asset?'Peça anexada':'Adicione a peça pronta'}</b></div><span>${asset?'1/1':'0/1'}</span></div><div class="v627-single-frame">${asset?`<div data-asset-path="${E(asset.storage_path)}" data-mime="${E(asset.mime_type||'')}" data-filename="${E(asset.file_name||'Arte')}"></div>`:`<div class="v627-art-empty"><span>＋</span><b>Adicionar arte</b></div>`}</div><label class="btn ${asset?'ghost':'pri'} full v627-single-upload">${asset?'Trocar arte':'＋ Adicionar arte'}<input type="file" accept="image/*,video/*" data-v627-single-upload="${content.id}" hidden></label></section>`}
function productionModalV627(content){
  let work=workflowWorkV583(content.id),format=content.format||'static_post',count=format==='carousel'?carouselCountV618(content,work):1,owner=profile(work?.design_owner_id||work?.assigned_to)?.display_name||'Equipe';
  return `<div class="modalbg v627-production-bg"><div class="modal wide v627-production-modal"><div class="v627-production-top"><div><small>PRODUÇÃO</small><h2>${E(content.title||'Conteúdo')}</h2><span>${E(fmt(format))}${format==='carousel'?` · ${count} cards`:''} · ${E(owner)}</span></div><button class="btn ghost small" data-close>×</button></div><form id="workflowProgressFormV591" data-content="${content.id}" data-stage="visual_production"><details class="v627-format"><summary><span>Formato</span><b>${E(fmt(format))}${format==='carousel'?` · ${count} cards`:''}</b><em>Editar ›</em></summary><div class="v627-format-fields"><div class="field"><label>Formato</label><select name="content_format" id="productionFormatV617"><option value="static_post" ${format==='static_post'?'selected':''}>Post estático</option><option value="carousel" ${format==='carousel'?'selected':''}>Carrossel</option><option value="reel" ${format==='reel'?'selected':''}>Reels</option><option value="story" ${format==='story'?'selected':''}>Stories</option><option value="video" ${format==='video'?'selected':''}>Vídeo</option></select></div>${format==='carousel'?`<div class="field"><label>Quantidade de cards</label><input name="carousel_count" id="carouselCountV617" type="number" min="2" max="20" value="${count}"></div>`:`<input type="hidden" name="carousel_count" value="${count}">`}</div></details>${format==='carousel'?productionHiddenSlidesV627(work,count):''}${format==='carousel'?productionCarouselStudioV627(content,work):productionSingleStudioV627(content)}<details class="v627-brief"><summary>Ver briefing da ideia</summary><div>${workflowBriefSummaryV591(content,work)}</div></details><div class="v627-production-actions"><button type="button" class="btn ghost" data-v627-save="${content.id}">Salvar produção</button><button type="button" class="btn pri" data-v627-review="${content.id}">Enviar para revisão →</button></div></form></div></div>`
}
const _workflowProgressModalV627Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){let work=workflowWorkV583(content.id),stage=workflowStageV583(work);if(stage==='visual_production')return productionModalV627(content);return _workflowProgressModalV627Base(content)};
async function saveProductionStudioV627(contentId,move=false){let form=document.getElementById('workflowProgressFormV591'),button=document.querySelector(move?`[data-v627-review="${contentId}"]`:`[data-v627-save="${contentId}"]`);if(!form)return;let modalEl=form.closest('.modal'),scrollTop=modalEl?.scrollTop||0;if(button){button.disabled=true;button.dataset.old=button.textContent;button.textContent=move?'Enviando...':'Salvando...'}try{await saveProductionFormatV617(form,contentId);if(move){await moveWorkflowV591(contentId,'internal_review');return}await load();MD={type:'contentDetail',id:contentId};render();requestAnimationFrame(()=>{let m=document.querySelector('.v627-production-modal');if(m)m.scrollTop=scrollTop});toast('Produção salva ✓')}catch(error){toast(error.message);if(button){button.disabled=false;button.textContent=button.dataset.old||'Salvar produção'}}}
async function uploadSingleProductionAssetV627(input){let file=input.files?.[0],content=(D.contents||[]).find(c=>c.id===input.dataset.v627SingleUpload);if(!file||!content)return;if(file.size>25*1024*1024){toast('Arquivo deve ter no máximo 25 MB');input.value='';return}let modalEl=input.closest('.modal'),scrollTop=modalEl?.scrollTop||0;try{let version=Number(content.current_version||1),old=(D.assets||[]).filter(a=>a.content_id===content.id&&Number(a.version_no||1)===version&&a.is_primary),safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-'),path=`${M.organization_id}/${content.client_id}/contents/${content.id}/v${version}/main-${Date.now()}-${safe}`;await uploadRaw(file,path);for(const a of old)await api(`/rest/v1/content_assets?id=eq.${a.id}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});await api('/rest/v1/content_assets',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:content.client_id,content_id:content.id,storage_path:path,file_name:file.name,mime_type:file.type||null,file_size:file.size,asset_type:String(file.type||'').startsWith('video/')?'video':'image',version_no:version,is_primary:true,uploaded_by:S.user?.id})});await load();MD={type:'contentDetail',id:content.id};render();requestAnimationFrame(()=>{let m=document.querySelector('.v627-production-modal');if(m)m.scrollTop=scrollTop});toast('Arte atualizada ✦')}catch(error){toast(error.message)}finally{input.value=''}}
function bindProductionStudioV627(){let track=document.querySelector('[data-v627-art-track]'),slides=[...document.querySelectorAll('[data-v627-art-slide]')],dots=[...document.querySelectorAll('[data-v627-jump]')];if(track&&slides.length){let active=()=>{let center=track.scrollLeft+track.clientWidth/2,idx=0,best=Infinity;slides.forEach((slide,i)=>{let c=slide.offsetLeft+slide.offsetWidth/2,d=Math.abs(c-center);if(d<best){best=d;idx=i}});dots.forEach((d,i)=>d.classList.toggle('on',i===idx))};track.addEventListener('scroll',()=>requestAnimationFrame(active),{passive:true});dots.forEach((dot,i)=>dot.onclick=()=>slides[i]?.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'}));active()}}
const _bindV627Base=bind;
bind=function(){_bindV627Base();document.querySelectorAll('[data-v627-save]').forEach(b=>b.onclick=()=>saveProductionStudioV627(b.dataset.v627Save,false));document.querySelectorAll('[data-v627-review]').forEach(b=>b.onclick=()=>saveProductionStudioV627(b.dataset.v627Review,true));document.querySelectorAll('[data-v627-single-upload]').forEach(input=>input.onchange=()=>uploadSingleProductionAssetV627(input));bindProductionStudioV627();setTimeout(hydratePreviews,30)};
const v627Style=document.createElement('style');v627Style.textContent=`
.v627-production-bg{padding:10px}.v627-production-modal{max-width:940px!important;padding:0!important;overflow:auto;background:#101010}.v627-production-top{position:sticky;top:0;z-index:8;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:16px 18px;border-bottom:1px solid #292929;background:#111e;backdrop-filter:blur(14px)}.v627-production-top small{display:block;color:#ff7430;font-size:9px;font-weight:950;letter-spacing:.13em}.v627-production-top h2{margin:5px 0 4px;font-size:23px;line-height:1.12}.v627-production-top span{color:#777;font-size:10px}.v627-production-modal form{padding:14px 18px 0}.v627-format,.v627-brief{margin-bottom:12px;border:1px solid #292929;border-radius:13px;background:#141414}.v627-format summary,.v627-brief summary{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:9px;padding:11px 13px;list-style:none;cursor:pointer}.v627-format summary span,.v627-format summary em{color:#777;font-size:9px;font-style:normal}.v627-format summary b{font-size:11px}.v627-format summary em{text-align:right}.v627-format-fields{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 13px 12px}.v627-art-studio{display:grid;gap:10px}.v627-studio-head{display:flex;align-items:end;justify-content:space-between;gap:10px;padding:3px 2px}.v627-studio-head small{display:block;color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.13em}.v627-studio-head b{display:block;margin-top:4px;font-size:15px}.v627-studio-head>span{display:grid;place-items:center;min-width:44px;height:31px;padding:0 9px;border-radius:999px;background:#21140d;color:#ff7c38;font-size:10px;font-weight:950}.v627-art-track{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}.v627-art-track::-webkit-scrollbar{display:none}.v627-art-slide{flex:0 0 min(560px,92%);scroll-snap-align:center;overflow:hidden;border:1px solid #303030;border-radius:18px;background:#151515}.v627-art-slide>header{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #292929}.v627-art-slide>header b{color:#ff7b3a;font-size:10px;letter-spacing:.09em}.v627-art-slide>header span{color:#777;font-size:9px}.v627-art-frame,.v627-single-frame{display:grid;place-items:center;width:100%;aspect-ratio:4/5;overflow:hidden;background:#070707}.v627-art-media,.v627-art-media img,.v627-art-media video,.v627-single-frame>div,.v627-single-frame img,.v627-single-frame video{width:100%;height:100%;object-fit:contain;background:#070707}.v627-art-empty{display:grid;place-content:center;justify-items:center;height:100%;padding:20px;text-align:center;color:#777}.v627-art-empty>span{display:grid;place-items:center;width:58px;height:58px;border:1px dashed #70401f;border-radius:18px;color:#ff7430;font-size:25px}.v627-art-empty>b{margin-top:11px;color:#bbb;font-size:14px}.v627-art-empty>small{margin-top:4px;font-size:9px}.v627-art-slide>footer{display:flex;align-items:center;gap:8px;padding:10px 12px}.v627-art-upload{flex:1;display:flex!important;align-items:center;justify-content:center;min-height:44px}.v627-art-remove{min-height:44px;padding:0 10px;border:0;background:transparent;color:#9a6c54;font-size:10px;font-weight:850}.v627-art-dots{display:flex;justify-content:center;gap:5px;padding:2px 0 4px}.v627-art-dots button{width:7px;height:7px;padding:0;border:0;border-radius:999px;background:#404040}.v627-art-dots button.on{width:22px;background:#ff6a00}.v627-brief{margin-top:12px}.v627-brief>div{padding:0 10px 10px}.v627-brief .v591-brief-summary{margin:0}.v627-production-actions{position:sticky;bottom:0;z-index:7;display:grid;grid-template-columns:.8fr 1.2fr;gap:8px;margin:14px -18px 0;padding:12px 18px calc(12px + env(safe-area-inset-bottom));border-top:1px solid #292929;background:#101010ed;backdrop-filter:blur(14px)}.v627-production-actions .btn{min-height:48px}.v627-single-frame{border:1px solid #303030;border-radius:18px}.v627-single-upload{min-height:48px;margin-top:8px}
@media(max-width:760px){.v627-production-bg{padding:0!important}.v627-production-modal{width:100vw!important;max-width:none!important;height:100dvh!important;max-height:100dvh!important;border:0!important;border-radius:0!important}.v627-production-top{padding:13px 14px}.v627-production-top h2{font-size:20px;max-width:78vw}.v627-production-modal form{padding:11px 12px 0}.v627-format-fields{grid-template-columns:1fr}.v627-art-slide{flex-basis:100%;border-radius:14px}.v627-art-frame{aspect-ratio:4/5;max-height:68dvh}.v627-art-slide>footer{padding:9px}.v627-art-upload{min-height:46px!important;font-size:12px!important}.v627-art-remove{font-size:11px}.v627-studio-head b{font-size:14px}.v627-production-actions{margin-left:-12px;margin-right:-12px;padding-left:12px;padding-right:12px}.v627-production-actions .btn{font-size:12px!important}.v627-brief summary{font-size:11px}.v627-brief .v591-brief-summary{padding:12px!important}}
`;document.head.appendChild(v627Style);
// ===== FIM COLAB V6.27 =====


// ===== COLAB V6.28 — LEITURA MOBILE DO FLUXO =====
const v628Style=document.createElement('style');v628Style.textContent=`
@media(max-width:760px){
  .v627-production-top small{font-size:11px!important;letter-spacing:.12em!important}
  .v627-production-top h2{font-size:24px!important;line-height:1.15!important}
  .v627-production-top span{font-size:13px!important;line-height:1.4!important}
  .v627-format summary,.v627-brief summary{min-height:50px!important;padding:13px 14px!important}
  .v627-format summary span,.v627-format summary em{font-size:12px!important}
  .v627-format summary b{font-size:14px!important}
  .v627-studio-head small{font-size:10px!important}
  .v627-studio-head b{font-size:17px!important;line-height:1.3!important}
  .v627-studio-head>span{font-size:12px!important;min-width:48px!important;height:34px!important}
  .v627-art-slide>header b{font-size:12px!important}
  .v627-art-slide>header span{font-size:11px!important}
  .v627-art-empty>b{font-size:16px!important}
  .v627-art-empty>small{font-size:12px!important}
  .v627-art-upload{font-size:14px!important}
  .v627-art-remove{font-size:13px!important}
  .v627-brief .v591-summary-head small{font-size:10px!important}
  .v627-brief .v591-summary-head h3{font-size:20px!important;line-height:1.25!important}
  .v627-brief .v591-summary-head>span{font-size:10px!important}
  .v627-brief .v591-summary-grid,.v627-brief .v591-summary-slides{gap:10px!important}
  .v627-brief .v591-summary-grid>div,.v627-brief .v591-summary-slides>div{padding:14px!important;border-radius:13px!important}
  .v627-brief .v591-summary-grid small,.v627-brief .v591-summary-slides small,.v627-brief .v591-reference-list>small{font-size:10px!important;letter-spacing:.04em!important}
  .v627-brief .v591-summary-grid p,.v627-brief .v591-summary-slides p{font-size:14px!important;line-height:1.55!important;margin-top:7px!important}
  .v627-brief .v591-reference-list a,.v627-brief .v591-reference-list span{font-size:12px!important;line-height:1.45!important}
  .v627-production-actions .btn{font-size:14px!important;min-height:54px!important}
}
`;document.head.appendChild(v628Style);
// ===== FIM COLAB V6.28 =====


// ===== COLAB V6.29 — PLAYER REAL NA REVISÃO DE VÍDEO =====
// A revisão interna não pode reutilizar a miniatura muda do quadro do Workflow.
// Nesta etapa a equipe recebe a mídia completa, com play, controles e tela cheia.
function reviewMediaV629(content){
  let asset=currentAsset(content);
  if(!asset)return `<section class="v629-review-empty"><span>▶</span><div><b>Nenhum arquivo anexado para revisar</b><small>Volte para Produção e adicione a peça final.</small></div></section>`;
  let mime=String(asset.mime_type||''),name=String(asset.file_name||'Peça final'),video=mime.startsWith('video/')||/\.(mp4|mov|m4v|webm|ogv)$/i.test(name);
  if(video&&!mime.startsWith('video/'))mime='video/mp4';
  return `<section class="v629-review-media ${video?'is-video':'is-image'}"><header><div><small>${video?'VÍDEO PARA REVISÃO':'PEÇA PARA REVISÃO'}</small><b>${E(name)}</b></div>${video?'<span>Use os controles para assistir do início ao fim</span>':''}</header><div class="v629-player-shell"><div class="v629-review-player" data-v629-review-player data-asset-path="${E(asset.storage_path)}" data-mime="${E(mime)}" data-filename="${E(name)}"></div>${video?`<button type="button" class="v629-play" data-v629-play aria-label="Reproduzir vídeo"><span>▶</span><b>Assistir vídeo</b></button>`:''}</div>${video?`<div class="v629-video-actions"><span>Você pode pausar, avançar e ativar o áudio.</span><button type="button" class="btn ghost small" data-v629-fullscreen>Abrir em tela cheia ↗</button></div>`:''}</section>`;
}

const _workflowProgressModalV629Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let html=_workflowProgressModalV629Base(content),work=workflowWorkV583(content.id),stage=workflowStageV583(work);
  if(stage!=='internal_review'||content.format==='carousel')return html;
  let thumbnail=socialAssetV550(content);
  return html.includes(thumbnail)?html.replace(thumbnail,reviewMediaV629(content)):html;
};

function reviewVideoElementV629(control){return control?.closest('.v629-review-media')?.querySelector('video')||null}
async function playReviewVideoV629(button){
  let video=reviewVideoElementV629(button);
  if(!video){await hydratePreviews();video=reviewVideoElementV629(button)}
  if(!video){toast('Não foi possível carregar o vídeo. Tente abrir novamente.');return}
  video.controls=true;video.playsInline=true;video.muted=false;
  try{if(video.paused)await video.play();else video.pause()}catch(error){toast('Toque novamente no vídeo para reproduzir')}
}
async function fullscreenReviewVideoV629(button){
  let video=reviewVideoElementV629(button);
  if(!video){await hydratePreviews();video=reviewVideoElementV629(button)}
  if(!video){toast('Não foi possível carregar o vídeo. Tente abrir novamente.');return}
  video.controls=true;video.playsInline=true;video.muted=false;
  try{
    if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
    else if(typeof video.requestFullscreen==='function')await video.requestFullscreen();
    else await video.play();
  }catch(error){try{await video.play()}catch{} }
}
function bindReviewPlayerV629(){
  document.querySelectorAll('[data-v629-play]').forEach(button=>{if(button.dataset.bound==='1')return;button.dataset.bound='1';button.onclick=()=>playReviewVideoV629(button)});
  document.querySelectorAll('[data-v629-fullscreen]').forEach(button=>{if(button.dataset.bound==='1')return;button.dataset.bound='1';button.onclick=()=>fullscreenReviewVideoV629(button)});
  let sync=()=>document.querySelectorAll('[data-v629-review-player] video').forEach(video=>{if(video.dataset.v629Bound==='1')return;video.dataset.v629Bound='1';video.controls=true;video.playsInline=true;let media=video.closest('.v629-review-media');video.addEventListener('play',()=>media?.classList.add('is-playing'));video.addEventListener('pause',()=>media?.classList.remove('is-playing'));video.addEventListener('ended',()=>media?.classList.remove('is-playing'))});
  sync();setTimeout(sync,80);setTimeout(sync,320);
}
const _bindV629Base=bind;
bind=function(){_bindV629Base();bindReviewPlayerV629();setTimeout(hydratePreviews,20);setTimeout(bindReviewPlayerV629,120)};

const v629Style=document.createElement('style');v629Style.textContent=`
.v629-review-media{display:grid;gap:10px;margin:12px 0 15px;padding:12px;border:1px solid #4b3021;border-radius:16px;background:#0b0b0b}.v629-review-media>header{display:flex;align-items:end;justify-content:space-between;gap:12px}.v629-review-media>header small,.v629-review-media>header b{display:block}.v629-review-media>header small{color:#ff7430;font-size:8px;font-weight:950;letter-spacing:.12em}.v629-review-media>header b{max-width:520px;margin-top:4px;overflow:hidden;color:#eee;font-size:12px;white-space:nowrap;text-overflow:ellipsis}.v629-review-media>header>span{color:#777;font-size:9px}.v629-player-shell{position:relative;display:grid;place-items:center;min-height:300px;max-height:72vh;overflow:hidden;border-radius:13px;background:#000}.v629-review-player{display:grid;place-items:center;width:100%;height:100%;min-height:300px;max-height:72vh;background:#000}.v629-review-player img,.v629-review-player video{display:block;width:100%;height:auto;max-height:72vh;object-fit:contain;background:#000}.v629-review-player video{min-height:300px}.v629-play{position:absolute;z-index:2;left:50%;top:50%;display:grid;place-items:center;gap:7px;min-width:132px;min-height:102px;padding:14px 20px;border:1px solid #ffffff3b;border-radius:20px;background:#070707d9;color:#fff;box-shadow:0 14px 40px #0009;transform:translate(-50%,-50%);backdrop-filter:blur(8px)}.v629-play>span{display:grid;place-items:center;width:46px;height:46px;padding-left:3px;border-radius:50%;background:#ff6a00;color:#fff;font-size:19px}.v629-play>b{font-size:12px}.v629-review-media.is-playing .v629-play{display:none}.v629-video-actions{display:flex;align-items:center;justify-content:space-between;gap:10px}.v629-video-actions>span{color:#7d7d7d;font-size:9px}.v629-review-empty{display:flex;align-items:center;gap:11px;margin:12px 0 15px;padding:18px;border:1px dashed #4a3022;border-radius:15px;background:#100d0b}.v629-review-empty>span{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#24150e;color:#ff7430}.v629-review-empty b,.v629-review-empty small{display:block}.v629-review-empty b{font-size:12px}.v629-review-empty small{margin-top:4px;color:#777;font-size:9px}
@media(max-width:760px){.v629-review-media{margin-inline:-2px;padding:9px}.v629-review-media>header{align-items:flex-start;flex-direction:column}.v629-review-media>header small{font-size:10px}.v629-review-media>header b{max-width:82vw;font-size:13px}.v629-review-media>header>span{font-size:11px}.v629-player-shell,.v629-review-player{min-height:52vh;max-height:68vh}.v629-review-player video{width:100%;min-height:52vh;max-height:68vh;object-fit:contain}.v629-play{min-width:142px;min-height:110px}.v629-play>b{font-size:14px}.v629-video-actions{align-items:stretch;flex-direction:column}.v629-video-actions>span{font-size:11px;line-height:1.4}.v629-video-actions .btn{width:100%;min-height:46px!important;font-size:12px!important}.v629-review-empty{padding:14px}.v629-review-empty b{font-size:14px}.v629-review-empty small{font-size:11px}}
`;document.head.appendChild(v629Style);
// ===== FIM COLAB V6.29 =====


// ===== COLAB V6.30 — PLAYER LIMPO + CONTINUIDADE ENTRE MESES =====
// O play central desaparece definitivamente após o primeiro início do vídeo.
// Pendências de meses anteriores acompanham o mês selecionado até a publicação.
function reviewMediaV630(control){return control?.closest('.v629-review-media')||null}
async function reviewVideoReadyV630(control){
  let media=reviewMediaV630(control),video=media?.querySelector('video');
  if(video)return video;
  await hydratePreviews();
  for(let attempt=0;attempt<30&&!video;attempt++){
    await new Promise(resolve=>setTimeout(resolve,100));
    video=media?.querySelector('video');
  }
  return video||null;
}
function prepareReviewVideoV630(video){
  if(!video)return;
  video.controls=true;video.playsInline=true;
  if(video.dataset.v630Bound==='1')return;
  video.dataset.v630Bound='1';
  let media=video.closest('.v629-review-media');
  video.addEventListener('play',()=>{media?.classList.add('has-started','is-playing')});
  video.addEventListener('pause',()=>media?.classList.remove('is-playing'));
  video.addEventListener('ended',()=>media?.classList.remove('is-playing'));
}
playReviewVideoV629=async function(button){
  let video=await reviewVideoReadyV630(button);
  if(!video){toast('Não foi possível carregar o vídeo. Tente abrir novamente.');return}
  prepareReviewVideoV630(video);video.muted=false;
  try{
    if(video.paused){await video.play();reviewMediaV630(button)?.classList.add('has-started','is-playing')}
    else video.pause();
  }catch(error){toast('Toque novamente no vídeo para reproduzir')}
};
fullscreenReviewVideoV629=async function(button){
  let video=await reviewVideoReadyV630(button);
  if(!video){toast('Não foi possível carregar o vídeo. Tente abrir novamente.');return}
  prepareReviewVideoV630(video);video.muted=false;reviewMediaV630(button)?.classList.add('has-started');
  try{
    if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
    else if(typeof video.requestFullscreen==='function')await video.requestFullscreen();
    else await video.play();
  }catch(error){try{await video.play()}catch{}}
};
function bindReviewPlayerV630(){
  document.querySelectorAll('[data-v629-review-player]').forEach(root=>{
    root.querySelectorAll('video').forEach(prepareReviewVideoV630);
    if(root.dataset.v630Observed==='1')return;
    root.dataset.v630Observed='1';
    let observer=new MutationObserver(()=>root.querySelectorAll('video').forEach(prepareReviewVideoV630));
    observer.observe(root,{childList:true,subtree:true});
  });
}
const _bindV630Base=bind;
bind=function(){_bindV630Base();bindReviewPlayerV630();setTimeout(bindReviewPlayerV630,120)};

function workflowItemMonthV630(content){
  let plan=(D.plans||[]).find(row=>row.id===content?.monthly_plan_id);
  return dateMonth(content?.publication_date)||dateMonth(plan?.month)||dateMonth(content?.created_at)||'';
}
function workflowMonthShortV630(value){
  let months=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'],parts=String(value||'').split('-');
  return months[Math.max(0,Math.min(11,Number(parts[1]||1)-1))]||'MÊS ANTERIOR';
}
function workflowContinuityItemsV630(cid,month,portal=false){
  let selected=String(month||contentMonth),seen=new Set(),rows=[];
  for(let content of (D.contents||[])){
    if(content.client_id!==cid)continue;
    if(portal&&!portalContentVisibleV587(content))continue;
    let origin=workflowItemMonthV630(content),stage=workflowStageV583(workflowWorkV583(content.id)),published=content.status==='published'||stage==='published';
    let belongs=origin===selected||(!published&&(!origin||origin<selected));
    if(!belongs||seen.has(content.id))continue;
    seen.add(content.id);rows.push({...content,_v630OriginMonth:origin,_v630Carryover:Boolean(origin&&origin<selected&&!published)});
  }
  return rows.sort((a,b)=>String(a._v630OriginMonth||'9999').localeCompare(String(b._v630OriginMonth||'9999'))||String(a.publication_date||'9999').localeCompare(String(b.publication_date||'9999'))||String(a.created_at||'').localeCompare(String(b.created_at||'')));
}
const _socialMonthItemsV630Base=socialMonthItemsV550;
socialMonthItemsV550=function(cid,month){return contentMode==='workflow'?workflowContinuityItemsV630(cid,month,false):_socialMonthItemsV630Base(cid,month)};
clientWorkflowItemsV586=function(cid){return workflowContinuityItemsV630(cid,contentMonth,false)};

const _workflowCardV630Base=workflowCardV591;
workflowCardV591=function(content){
  let html=_workflowCardV630Base(content);
  if(!content?._v630Carryover)return html;
  return html.replace('<div class="v591-work-meta">',`<div class="v630-carryover">PENDÊNCIA DE ${E(workflowMonthShortV630(content._v630OriginMonth))}</div><div class="v591-work-meta">`);
};
const _clientWorkflowPaneV630Base=clientWorkflowPaneV586;
clientWorkflowPaneV586=function(cid){
  let items=clientWorkflowItemsV586(cid),carry=items.filter(row=>row._v630Carryover),html=_clientWorkflowPaneV630Base(cid);
  let note=carry.length?`${carry.length} ${carry.length===1?'conteúdo anterior continua':'conteúdos anteriores continuam'} aqui até ${carry.length===1?'ser publicado':'serem publicados'}.`:'O que não foi publicado continua visível quando o mês vira.';
  return html.replace('<h2>Produção do mês</h2>','<h2>Conteúdos em andamento</h2>').replace('O conteúdo entra aqui somente depois que a ideia está estruturada e pronta para execução.',E(note));
};

const _portalMonthItemsV630Base=portalMonthItemsV428;
portalMonthItemsV428=function(cid,month){
  let base=_portalMonthItemsV630Base(cid,month),carry=workflowContinuityItemsV630(cid,month,true).filter(row=>row._v630Carryover),seen=new Set(base.map(row=>row.id));
  return base.concat(carry.filter(row=>!seen.has(row.id)));
};
const _loadV630Base=load;
load=async function(){
  await _loadV630Base();
  if(M?.role==='client'){
    D.contents=(D.contents||[]).filter(portalContentVisibleV587);
    D.teamWorkflow=[];D.workflowActivity=[];
  }
};

const v630Style=document.createElement('style');v630Style.textContent=`
.v629-review-media.has-started .v629-play{display:none!important}.v630-carryover{width:max-content;margin:9px 10px 0;padding:5px 7px;border:1px solid #6a3a20;border-radius:999px;background:#24150e;color:#ff8b4b;font-size:7px;font-weight:950;letter-spacing:.08em}.v591-work-copy>.v630-carryover{margin:0 0 8px}.v591-workflow-head p{max-width:620px}
@media(max-width:760px){.v630-carryover{font-size:9px}.v591-workflow-head p{font-size:12px!important;line-height:1.45!important}}
`;document.head.appendChild(v630Style);
// ===== FIM COLAB V6.30 =====


// ===== COLAB V6.31 — APROVAÇÃO NÃO É AGENDAMENTO =====
// A cliente encerra a etapa de aprovação. Só a equipe define data e programa.
workflowStagesV583.splice(
  0,
  workflowStagesV583.length,
  ['visual_production','Produção'],
  ['internal_review','Revisão interna'],
  ['client_approval','Aprovação cliente'],
  ['approved','Aprovado'],
  ['scheduled','Programado'],
  ['published','Publicado']
);

const _workflowPublicStatusV631Base=workflowPublicStatusV583;
workflowPublicStatusV583=function(value){
  if(value==='approved')return'approved';
  return _workflowPublicStatusV631Base(value)
};

const _workflowStageFromPublicV631Base=workflowStageFromPublicV583;
workflowStageFromPublicV583=function(status){
  if(status==='approved')return'approved';
  return _workflowStageFromPublicV631Base(status)
};

const _workflowNextActionV631Base=workflowNextActionV591;
workflowNextActionV591=function(content,stage){
  if(stage==='approved')return'Definir data e programar';
  return _workflowNextActionV631Base(content,stage)
};

const _workflowOwnerForStageV631Base=workflowOwnerForStageV591;
workflowOwnerForStageV591=function(work,stage){
  if(stage==='approved')return work?.design_owner_id||work?.content_owner_id||work?.assigned_to||productionOwnerV591();
  return _workflowOwnerForStageV631Base(work,stage)
};

const _workflowPremiumStageV631Base=workflowPremiumStageV594;
workflowPremiumStageV594=function(stage){
  if(stage==='approved')return'approved';
  return _workflowPremiumStageV631Base(stage)
};
workflowPremiumGroupsV594=function(){return[
  ['production','Produção','01'],
  ['review','Revisão interna','02'],
  ['client','Aprovação cliente','03'],
  ['approved','Aprovado','04'],
  ['scheduled','Programado','05'],
  ['published','Publicado','06']
]};

function approvedWorkflowModalV631(content){
  let work=workflowWorkV583(content.id),approval=approvalInfo(content),owner=workflowOwnerForStageV591(work,'approved');
  return `<div class="modalbg"><div class="modal wide v591-work-modal v631-approved-modal"><div class="head"><div><small class="ey">APROVADO PELA CLIENTE</small><h2>${E(content.title||'Conteúdo')}</h2></div><button class="btn ghost small" data-close>✕</button></div>${workflowProgressV591('approved')}${workflowBriefSummaryV591(content,work)}<section class="v591-stage-form v631-approved-stage"><small>ETAPA ATUAL</small><h3>Aprovado pela cliente ✓</h3><div class="v631-approved-callout"><span>✓</span><div><b>A decisão da cliente foi registrada</b><p>Isso ainda não é um agendamento. Agora a Colab define a data, o horário e o canal da publicação.</p></div></div><form id="workflowProgressFormV591" data-content="${content.id}" data-stage="schedule"><div class="formgrid"><div class="field"><label>Data de publicação</label><input name="publication_date" type="date" required value="${E(content.publication_date||'')}"></div><div class="field"><label>Horário</label><input name="publication_time" type="time" value="${E(String(content.publication_time||'').slice(0,5))}"></div></div><div class="formgrid"><div class="field"><label>Canal</label><input name="channel" value="${E(workflowBriefV583(work).channel||'Instagram')}"></div><div class="field"><label>Responsável pela programação</label><select disabled>${workflowProfileOptionsV583(owner,'Equipe Colab')}</select></div></div><div class="v631-approved-state"><span>${E(approval.label||'Aprovado')}</span><b>Próxima ação: definir data e programar</b></div><div class="actions"><button type="button" class="btn ghost" data-close>Fechar</button><button type="submit" class="btn pri" data-v591-schedule="1">Definir data e programar →</button></div></form></section></div></div>`
}

const _workflowProgressModalV631Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let stage=workflowStageV583(workflowWorkV583(content.id));
  if(stage==='approved')return approvedWorkflowModalV631(content);
  return _workflowProgressModalV631Base(content)
};

const _clientWorkflowPaneV631Base=clientWorkflowPaneV586;
clientWorkflowPaneV586=function(cid){
  return _clientWorkflowPaneV631Base(cid).replace(
    'Produção → Revisão → Cliente → Programado → Publicado',
    'Produção → Revisão → Cliente → Aprovado → Programado → Publicado'
  )
};

const v631Style=document.createElement('style');v631Style.textContent=`
.v596-kanban{grid-template-columns:repeat(6,minmax(260px,1fr));min-width:1630px}.v596-lane.stage-approved>header i{background:#62c878}.v596-lane.stage-approved{border-color:#294231}.v631-approved-stage{border-color:#315b3e!important;background:linear-gradient(145deg,#101a13,#111)!important}.v631-approved-callout{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center;margin:13px 0;padding:14px;border:1px solid #315b3e;border-radius:14px;background:#102017}.v631-approved-callout>span{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#173b24;color:#75d995;font-size:18px;font-weight:950}.v631-approved-callout b,.v631-approved-callout p{display:block}.v631-approved-callout b{font-size:13px}.v631-approved-callout p{margin:5px 0 0;color:#8a9d90;font-size:10px;line-height:1.5}.v631-approved-state{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding:11px 12px;border-radius:11px;background:#121a14}.v631-approved-state span{padding:5px 8px;border-radius:99px;background:#183823;color:#75d995;font-size:8px;font-weight:950;text-transform:uppercase}.v631-approved-state b{font-size:9px}.v591-progress span:nth-child(4).on i{border-color:#62c878!important;background:#183823!important;color:#75d995!important}
@media(max-width:760px){.v596-kanban{display:flex;min-width:0}.v631-approved-callout{padding:12px}.v631-approved-callout b{font-size:14px}.v631-approved-callout p{font-size:11px}.v631-approved-state{align-items:flex-start;flex-direction:column}.v631-approved-state b{font-size:11px}.v631-approved-modal .formgrid{grid-template-columns:1fr!important}}
`;document.head.appendChild(v631Style);
// ===== FIM COLAB V6.31 =====


// ===== COLAB V6.32 — APROVAÇÕES NA ABERTURA DO PORTAL =====
// O que depende da cliente aparece antes do acompanhamento geral.
function portalApprovalSpotlightV632(cid,preview=false){
  let pending=portalApprovalsV428Rows(cid).filter(row=>row.status==='pending');
  if(!pending.length)return `<section class="v632-approval-spotlight is-clear"><div class="v632-approval-head"><span>✓</span><div><small>CONTEÚDOS PARA REVISAR</small><h2>Nenhuma revisão pendente</h2><p>Quando a Colab liberar um conteúdo, ele aparecerá aqui logo na abertura.</p></div></div><button type="button" class="btn ghost" ${portalTabAttrsV428('approvals',preview)}>Ver aprovações anteriores</button></section>`;
  return `<section class="v632-approval-spotlight"><div class="v632-approval-head"><span>${pending.length}</span><div><small>AGUARDANDO VOCÊ</small><h2>${pending.length} conteúdo${pending.length===1?'':'s'} aguardando sua revisão</h2><p>Confira cada conteúdo e informe se está aprovado ou se precisa de algum ajuste.</p></div></div><div class="v632-approval-grid">${pending.slice(0,4).map(approval=>{let content=approval.contents||(D.contents||[]).find(row=>row.id===approval.content_id)||{};return `<article class="v632-approval-item">${socialAssetV550(content,true)}<div><small>${E(fmt(content.format||'Conteúdo'))}</small><h3>${E(content.title||'Conteúdo')}</h3><p>Conteúdo pronto para sua aprovação.</p></div><button type="button" class="btn pri" ${preview?`data-v622-mirror-approval="${approval.id}"`:`data-ap="${approval.id}"`}>Revisar conteúdo</button></article>`}).join('')}</div>${pending.length>4?`<button type="button" class="btn ghost full" ${portalTabAttrsV428('approvals',preview)}>Ver os ${pending.length} conteúdos para revisar →</button>`:''}</section>`
}

const _portalOverviewV632Base=portalOverviewV550;
portalOverviewV550=function(cid,preview=false){
  let html=_portalOverviewV632Base(cid,preview),spotlight=portalApprovalSpotlightV632(cid,preview);
  return html.replace('</nav>','</nav>'+spotlight)
};

const _portalApprovalsV632Base=portalApprovalsV622;
portalApprovalsV622=function(cid,preview=false){
  return _portalApprovalsV632Base(cid,preview)
    .replace('Veja a peça antes de ir ao ar','Revise o conteúdo antes de ir ao ar')
    .replaceAll('Peça pronta para sua aprovação.','Conteúdo pronto para sua aprovação.')
    .replaceAll('Revisar peça','Revisar conteúdo')
};

const _portalWorkflowCardV632Base=portalWorkflowCardV587;
portalWorkflowCardV587=function(content,preview=false){
  return _portalWorkflowCardV632Base(content,preview).replace('Revisar peça →','Revisar conteúdo →')
};

const _clientApprovalOnlyModalV632Base=clientApprovalOnlyModalV622;
clientApprovalOnlyModalV622=function(approval,mirror=false){
  return _clientApprovalOnlyModalV632Base(approval,mirror)
    .replace('A peça está aprovada?','Este conteúdo está aprovado?')
};

portalTabsV428=function(active,preview){
  let cid=preview?(MD?.clientId||clientHubIdV5||contentClient):M?.client_id,pending=portalPendingCountV625(cid),tabs=[['home','Visão geral'],['approvals','Aprovações'],['workflow','Workflow'],['contentCalendar','Calendário'],['calendar','Estratégia'],['recording','Para gravar'],['results','Resultados'],['more','Central']];
  return `<nav class="portal-tabs-v428 v625-portal-tabs v632-portal-tabs" aria-label="Áreas do portal">${tabs.map(([route,label])=>`<button type="button" ${portalTabAttrsV428(route,preview)} class="${active===route?'on':''} ${route==='approvals'&&pending?'needs-attention':''}">${label}${route==='approvals'&&pending?`<i>${pending}</i>`:''}</button>`).join('')}</nav>`
};

const _clientNavV632Base=clientNav;
clientNav=function(){
  if(hasService('social_media')){let pending=portalPendingCountV625(M?.client_id);return [['home','⌂','Início'],['approvals','✓',pending?`Revisar <i class="v625-nav-badge">${pending}</i>`:'Aprovações'],['workflow','→','Workflow'],['contentCalendar','▦','Calendário'],['more','•••','Central']]}
  return _clientNavV632Base()
};

const v632Style=document.createElement('style');v632Style.textContent=`
.v632-approval-spotlight{display:grid;gap:14px;margin:12px 0 15px;padding:20px;border:1px solid #8a431b;border-radius:22px;background:radial-gradient(circle at 96% 0,rgba(255,106,0,.24),transparent 36%),linear-gradient(145deg,#25150d,#111 64%);box-shadow:0 18px 50px #0004}.v632-approval-head{display:flex;align-items:center;gap:14px}.v632-approval-head>span{display:grid;place-items:center;min-width:54px;height:54px;padding:0 10px;border-radius:16px;background:#ff6a00;color:#fff;font-size:22px;font-weight:950}.v632-approval-head small,.v632-approval-head h2,.v632-approval-head p{display:block}.v632-approval-head small{color:#ff8c4d;font-size:8px;font-weight:950;letter-spacing:.14em}.v632-approval-head h2{margin:5px 0 4px;font-size:25px;line-height:1.08}.v632-approval-head p{margin:0;color:#9b8e87;font-size:10px;line-height:1.45}.v632-approval-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v632-approval-item{display:grid;grid-template-columns:82px minmax(0,1fr);gap:11px;align-items:center;padding:10px;border:1px solid #3c3029;border-radius:16px;background:#121212}.v632-approval-item>.v550-media{grid-row:1/3;width:82px!important;height:92px!important;min-height:92px!important;border-radius:12px!important}.v632-approval-item>div{min-width:0}.v632-approval-item>div small{color:#ff7d37;font-size:7px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}.v632-approval-item h3{margin:5px 0 3px;font-size:12px;line-height:1.25}.v632-approval-item p{margin:0;color:#777;font-size:8px}.v632-approval-item>.btn{grid-column:2;width:100%;min-height:38px!important;padding:8px 10px!important;font-size:10px!important}.v632-approval-spotlight.is-clear{display:flex;align-items:center;justify-content:space-between;border-color:#294b34;background:linear-gradient(145deg,#101b13,#111)}.v632-approval-spotlight.is-clear .v632-approval-head>span{background:#173a22;color:#75d995}.v632-approval-spotlight.is-clear .v632-approval-head small{color:#75d995}.v632-portal-tabs button:nth-child(2){font-weight:950}
@media(max-width:760px){.v632-approval-spotlight{margin:8px 0 13px;padding:15px;border-radius:18px}.v632-approval-head{align-items:flex-start}.v632-approval-head>span{min-width:46px;height:46px;border-radius:13px;font-size:18px}.v632-approval-head small{font-size:10px}.v632-approval-head h2{font-size:22px}.v632-approval-head p{font-size:12px}.v632-approval-grid{grid-template-columns:1fr}.v632-approval-item{grid-template-columns:74px minmax(0,1fr);padding:9px}.v632-approval-item>.v550-media{width:74px!important;height:84px!important;min-height:84px!important}.v632-approval-item h3{font-size:14px}.v632-approval-item p{font-size:10px}.v632-approval-item>.btn{min-height:44px!important;font-size:12px!important}.v632-approval-spotlight.is-clear{align-items:stretch;flex-direction:column}.v632-portal-tabs button:nth-child(2){order:-1}}
`;document.head.appendChild(v632Style);
// ===== FIM COLAB V6.32 =====


// ===== COLAB V6.33 — WORKFLOW CLARO + CAPTURA RÁPIDA =====
// Portal em colunas reais no celular; equipe começa uma ideia sem preencher a ficha inteira.
portalWorkflowBoardV587=function(items,preview=false){
  let stages=[['review','Para revisar'],['approved','Aprovado'],['scheduled','Programado'],['published','Publicado']];
  return `<div class="v633-portal-flow-note"><b>ACOMPANHE POR ETAPA</b><span>Deslize para o lado para ver o avanço dos conteúdos →</span></div><div class="v624-portal-board v633-portal-board">${stages.map(([key,label],index)=>{let rows=items.filter(item=>portalWorkflowStageV587(item)===key);return `<section class="v624-portal-lane stage-${key}"><header><i></i><b><small>0${index+1}</small>${E(label)}</b><span>${rows.length}</span></header><div>${rows.map(item=>portalWorkflowCardV587(item,preview)).join('')||`<div class="v633-empty-stage">Nenhum conteúdo nesta etapa</div>`}</div></section>`}).join('')}</div>`
};

function quickIdeaModalV633(){
  let cid=MD?.clientId||clientHubIdV5||contentClient||'',client=cl(cid)||{};
  return `<div class="modalbg"><div class="modal v633-quick-idea"><div class="head"><div><small class="ey">NOVA IDEIA</small><h2>Anote agora. Estruture depois.</h2><p class="muted">Para começar, só o título é obrigatório. A ficha completa será preenchida quando a ideia for seguir para produção.</p></div><button type="button" class="btn ghost small" data-close>✕</button></div><form id="quickIdeaFormV633"><input type="hidden" name="client_id" value="${E(cid)}"><div class="v633-client-lock"><small>CLIENTE</small><b>${E(client.name||'Cliente')}</b></div><div class="field"><label>Título da ideia</label><input name="title" required autofocus placeholder="Ex.: Trend com a equipe nos bastidores"></div><div class="field"><label>Anotação rápida <span class="muted">(opcional)</span></label><textarea name="notes" rows="4" placeholder="Escreva o contexto, gancho ou o que não pode ser esquecido."></textarea></div><div class="field"><label>Link de referência <span class="muted">(opcional)</span></label><input name="reference_url" type="url" placeholder="Cole aqui o link do Instagram, Pinterest, Drive..."></div><div class="v633-later-note"><span>→</span><p><b>Depois, dentro de Ideias:</b> complete linha editorial, objetivo, formato e narrativa antes de enviar para Produção.</p></div><div class="actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button type="submit" class="btn pri">Salvar em Ideias</button></div></form></div></div>`
}

async function saveQuickIdeaV633(event){
  event.preventDefault();let form=event.currentTarget;if(form.dataset.saving==='1')return;form.dataset.saving='1';
  let data=new FormData(form),cid=String(data.get('client_id')||''),title=String(data.get('title')||'').trim(),notes=String(data.get('notes')||'').trim(),reference=String(data.get('reference_url')||'').trim(),now=new Date().toISOString();
  try{
    await api('/rest/v1/client_insights',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:cid,title,notes:notes||null,source_url:reference||null,insight_type:'idea',status:'new',idea_brief:{notes,reference_links:reference?[reference]:[]},visible_to_client:false,created_by:S.user?.id,updated_at:now})});
    clientHubTabsV563[cid]='ideas';MD=null;await load();render();toast('Ideia salva. Complete quando for enviar para Produção ✦')
  }catch(error){form.dataset.saving='';toast(error.message)}
}

const _modalV633Base=modal;
modal=function(){if(MD?.type==='ideaQuickV633')return quickIdeaModalV633();return _modalV633Base()};

const _bindV633Base=bind;
bind=function(){
  _bindV633Base();
  document.querySelectorAll('[data-v591-new-idea]').forEach(button=>button.onclick=()=>{MD={type:'ideaQuickV633',clientId:button.dataset.v591NewIdea};render()});
  document.getElementById('quickIdeaFormV633')?.addEventListener('submit',saveQuickIdeaV633)
};

const _clientWorkflowPaneV633Base=clientWorkflowPaneV586;
clientWorkflowPaneV586=function(cid){
  return _clientWorkflowPaneV633Base(cid)
    .replace('<h2>Conteúdos do mês</h2>','<h2>Conteúdos em andamento</h2>')
    .replace('Nova pauta estruturada','Comece só pelo título')
};

const v633Style=document.createElement('style');v633Style.textContent=`
.v633-portal-flow-note{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:13px;padding:10px 12px;border:1px solid #342a25;border-radius:12px;background:#12100f}.v633-portal-flow-note b{color:#ff7a35;font-size:8px;letter-spacing:.1em}.v633-portal-flow-note span{color:#777;font-size:9px}.v633-portal-board .v624-portal-lane>header b{display:flex;align-items:center;gap:6px}.v633-portal-board .v624-portal-lane>header b small{color:#ff7a35;font-size:7px}.v633-empty-stage{display:grid;place-items:center;min-height:110px;padding:15px;border:1px dashed #303030;border-radius:12px;color:#5f5f5f;font-size:9px;text-align:center}.v633-quick-idea{max-width:650px!important}.v633-quick-idea .head p{max-width:520px;margin:5px 0 0;line-height:1.5}.v633-client-lock{display:flex;align-items:center;justify-content:space-between;margin:4px 0 14px;padding:11px 12px;border:1px solid #3c2a20;border-radius:11px;background:#17110e}.v633-client-lock small{color:#ff7b38;font-size:8px;font-weight:950;letter-spacing:.1em}.v633-client-lock b{font-size:12px}.v633-later-note{display:grid;grid-template-columns:32px 1fr;gap:9px;align-items:center;margin:12px 0;padding:11px;border:1px solid #333;border-radius:11px;background:#111}.v633-later-note>span{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:#24150e;color:#ff7b38;font-weight:950}.v633-later-note p{margin:0;color:#888;font-size:9px;line-height:1.5}.v633-later-note b{color:#ddd}
@media(max-width:760px){.v633-portal-flow-note{align-items:flex-start;flex-direction:column;margin-inline:2px}.v633-portal-flow-note b{font-size:10px}.v633-portal-flow-note span{font-size:11px}.v624-portal-board.v633-portal-board{display:flex!important;grid-template-columns:none!important;gap:10px!important;margin-inline:-2px!important;padding:1px 2px 10px!important;overflow-x:auto!important;scroll-snap-type:x mandatory!important;scrollbar-width:none!important}.v633-portal-board .v624-portal-lane{flex:0 0 86vw!important;min-width:86vw!important;scroll-snap-align:start!important}.v633-portal-board .v624-portal-lane>header b{font-size:13px!important}.v633-portal-board .v624-portal-lane>header b small{font-size:9px}.v633-empty-stage{min-height:150px;font-size:11px}.v633-quick-idea{width:calc(100vw - 16px)!important;max-width:none!important;padding:15px!important}.v633-quick-idea .head h2{font-size:23px}.v633-quick-idea .head p{font-size:12px}.v633-quick-idea label{font-size:12px!important}.v633-quick-idea input,.v633-quick-idea textarea{font-size:15px!important}.v633-later-note p{font-size:11px}.v633-quick-idea .actions{grid-template-columns:1fr!important}.v633-quick-idea .actions .btn{width:100%!important;min-height:48px!important}}
`;document.head.appendChild(v633Style);
// ===== FIM COLAB V6.33 =====


// ===== COLAB V6.34 — PORTAL ÚNICO + ARTE PRIMEIRO + ESTRATÉGIA CONECTADA =====
// A abertura deixa de empilhar versões antigas. Há uma única hierarquia:
// ação da cliente, atalhos e próximo conteúdo.
function portalHomeReviewCardV634(approval,preview=false){
  let content=approval.contents||(D.contents||[]).find(row=>row.id===approval.content_id)||{};
  return `<article class="v634-home-review">${socialAssetV550(content,true)}<div><small>${E(fmt(content.format||'Conteúdo'))}</small><h3>${E(content.title||'Conteúdo')}</h3><p>Pronto para sua revisão.</p></div><button type="button" class="btn pri" ${preview?`data-v622-mirror-approval="${approval.id}"`:`data-ap="${approval.id}"`}>Revisar conteúdo</button></article>`
}

portalOverviewV550=function(cid,preview=false){
  let client=portalClientV428(cid)||{},first=String(client.name||'').trim().split(' ')[0]||'você',pending=portalApprovalsV428Rows(cid).filter(row=>row.status==='pending'),items=portalMonthItemsV428(cid,clientMonth),active=items.filter(row=>row.status!=='published'),next=items.filter(row=>row.publication_date&&row.publication_date>=today()).sort((a,b)=>String(a.publication_date).localeCompare(String(b.publication_date)))[0],lines=new Set(items.map(row=>row.editorial_pillar_id).filter(Boolean)).size;
  return `<div class="portal-v428 v634-portal-home">${portalTabsV428('home',preview)}<section class="v634-home-head"><div><small>SEU ESPAÇO NA COLAB</small><h2>Oi, ${E(first)}.</h2><p>${pending.length?`Você tem ${pending.length} conteúdo${pending.length===1?'':'s'} para revisar.`:'Tudo certo por aqui. Você não tem revisões pendentes.'}</p></div><button type="button" class="v634-head-action ${pending.length?'attention':'clear'}" ${portalTabAttrsV428('approvals',preview)}><span>${pending.length||'✓'}</span><b>${pending.length?'Revisar agora':'Aprovações em dia'}</b><em>→</em></button></section>${pending.length?`<section class="v634-review-section"><div class="v634-section-title"><div><small>PRIORIDADE</small><h3>Conteúdos aguardando você</h3></div><button type="button" class="btn ghost small" ${portalTabAttrsV428('approvals',preview)}>Ver todos</button></div><div class="v634-home-reviews">${pending.map(row=>portalHomeReviewCardV634(row,preview)).join('')}</div></section>`:`<section class="v634-all-clear"><span>✓</span><div><b>Nenhum conteúdo esperando aprovação</b><p>Quando uma entrega for liberada, ela aparecerá aqui.</p></div></section>`}<section class="v634-home-links"><button type="button" ${portalTabAttrsV428('workflow',preview)}><span>→</span><div><small>WORKFLOW</small><b>${active.length} em acompanhamento</b></div><em>Ver etapas</em></button><button type="button" ${portalTabAttrsV428('calendar',preview)}><span>✦</span><div><small>ESTRATÉGIA</small><b>${lines?`${lines} linha${lines===1?'':'s'} em movimento`:'Direção da marca'}</b></div><em>Ver estratégia</em></button><button type="button" ${portalTabAttrsV428('contentCalendar',preview)}><span>▦</span><div><small>CALENDÁRIO</small><b>${next?.publication_date?`Próximo: ${fmtDate(next.publication_date)}`:'Datas em organização'}</b></div><em>Ver calendário</em></button><button type="button" ${portalTabAttrsV428('more',preview)}><span>•••</span><div><small>CENTRAL</small><b>Ideias, materiais e gravações</b></div><em>Abrir</em></button></section></div>`
};

// A estratégia usa a mesma editorial_pillar_id gravada no Workflow.
// Sem meta mensal, mostra a quantidade real em vez do confuso “2/—”.
portalStrategyPageV428=function(cid,preview=false){
  let client=portalClientV428(cid)||{},plan=portalPlanV428(cid,clientMonth),items=portalMonthItemsV428(cid,clientMonth),pillars=(D.pillars||[]).filter(row=>(!cid||row.client_id===cid)&&row.active),targets=(D.targets||[]).filter(row=>plan&&row.plan_id===plan.id),objective=String(client.objective||'').trim(),linked=items.filter(row=>row.editorial_pillar_id).length;
  return `<div class="portal-v428 v634-strategy">${portalTabsV428('calendar',preview)}<header class="v634-strategy-head"><div><small>ESTRATÉGIA · ${portalMonthNameV428(clientMonth)}</small><h2>Direção e conteúdos conectados</h2><p>Cada conteúdo entra automaticamente na linha editorial escolhida no Workflow.</p></div><input id="clientMonth" type="month" value="${E(clientMonth)}" ${preview?'disabled':''}></header><section class="v634-strategy-summary"><div><small>POSICIONAMENTO</small><h3>${objective?E(objective):'Direção da marca em construção'}</h3></div><div><small>FOCO DO MÊS</small><h3>${E(plan?.theme||'Planejamento em andamento')}</h3><p>${E(plan?.main_goal||'Os conteúdos já vinculados às linhas editoriais aparecem abaixo.')}</p></div><span><b>${linked}</b><small>conteúdo${linked===1?'':'s'} conectado${linked===1?'':'s'}</small></span></section><section class="v634-strategy-lines"><div class="v634-section-title"><div><small>LINHAS EDITORIAIS</small><h3>Como o mês está distribuído</h3></div></div><div class="v634-line-grid">${pillars.map(p=>{let done=items.filter(row=>row.editorial_pillar_id===p.id).length,target=Number((targets.find(row=>row.pillar_id===p.id)||{}).target_count||0),pct=target?Math.min(100,done/target*100):done?100:0;return `<article class="v634-line-card"><header><small>LINHA EDITORIAL</small><b>${target?`${done} de ${target}`:`${done} conteúdo${done===1?'':'s'}`}</b></header><h3>${E(p.name)}</h3><p>${E(p.objective||'Direção editorial da marca.')}</p><div class="progress"><i style="width:${pct}%"></i></div></article>`}).join('')||portalEmptyV428('As linhas editoriais aparecerão quando a estratégia for cadastrada.')}</div></section></div>`
};

function workflowArtworkV634(content){
  return `<section class="v634-work-art"><div class="v634-work-art-title"><small>PEÇA DO CONTEÚDO</small><b>Arte visível em todas as etapas</b></div>${approvalArtworkV622(content,true)}</section>`
}
function workflowBriefDetailsV634(summary){
  return `<details class="v634-work-brief"><summary><span>Ver briefing</span><em>Objetivo, narrativa, estrutura e referências</em><b>＋</b></summary><div>${summary}</div></details>`
}

const _workflowProgressModalV634Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let work=workflowWorkV583(content.id),stage=workflowStageV583(work),html=_workflowProgressModalV634Base(content);
  if(stage==='visual_production')return html;
  let match=html.match(/<section class="v591-brief-summary">[\s\S]*?<\/section>/),summary=match?.[0]||workflowBriefSummaryV591(content,work);
  if(match)html=html.replace(match[0],'');
  if(stage!=='internal_review')html=html.replace('<section class="v591-stage-form',workflowArtworkV634(content)+'<section class="v591-stage-form');
  return html.replace(/<\/div><\/div>$/,workflowBriefDetailsV634(summary)+'</div></div>')
};

const v634Style=document.createElement('style');v634Style.textContent=`
.v634-portal-home{display:grid;gap:14px}.v634-home-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:center;padding:22px;border:1px solid #4d2b19;border-radius:22px;background:radial-gradient(circle at 88% 0,rgba(255,106,0,.18),transparent 36%),linear-gradient(145deg,#1c130e,#111)}.v634-home-head small,.v634-strategy-head small{color:#ff7b37;font-size:8px;font-weight:950;letter-spacing:.14em}.v634-home-head h2{margin:5px 0 3px;font-size:31px;line-height:1}.v634-home-head p{margin:0;color:#98918d;font-size:11px}.v634-head-action{display:grid;grid-template-columns:auto auto auto;align-items:center;gap:10px;min-width:210px;padding:10px;border:1px solid #78401f;border-radius:15px;background:#1b120d;color:#fff;text-align:left}.v634-head-action>span{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#ff6a00;font-size:17px;font-weight:950}.v634-head-action>b{font-size:11px}.v634-head-action>em{color:#ff7a35;font-size:18px;font-style:normal}.v634-head-action.clear{border-color:#294b34}.v634-head-action.clear>span{background:#173a22;color:#75d995}.v634-review-section{padding:17px;border:1px solid #60351e;border-radius:20px;background:#120f0d}.v634-section-title{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-bottom:11px}.v634-section-title small{color:#ff7b37;font-size:8px;font-weight:950;letter-spacing:.14em}.v634-section-title h3{margin:4px 0 0;font-size:18px}.v634-home-reviews{display:flex;gap:9px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.v634-home-review{flex:1 0 min(430px,48%);display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:10px;align-items:center;padding:9px;border:1px solid #332c28;border-radius:15px;background:#151515;scroll-snap-align:start}.v634-home-review>.v550-media{width:72px!important;height:78px!important;min-height:78px!important;border-radius:11px!important}.v634-home-review>div{min-width:0}.v634-home-review small{color:#ff7b37;font-size:7px;font-weight:950;text-transform:uppercase}.v634-home-review h3{margin:4px 0;font-size:11px;line-height:1.25}.v634-home-review p{margin:0;color:#777;font-size:8px}.v634-home-review>.btn{min-height:38px!important;padding:8px 11px!important;font-size:9px!important}.v634-all-clear{display:flex;align-items:center;gap:11px;padding:14px 16px;border:1px solid #294b34;border-radius:16px;background:#101712}.v634-all-clear>span{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#173a22;color:#75d995;font-weight:950}.v634-all-clear b{font-size:11px}.v634-all-clear p{margin:3px 0 0;color:#718078;font-size:9px}.v634-home-links{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.v634-home-links>button{display:grid;grid-template-columns:auto 1fr;gap:9px;align-items:center;padding:14px;border:1px solid #2d2d2d;border-radius:16px;background:#141414;color:#fff;text-align:left}.v634-home-links>button>span{display:grid;place-items:center;width:35px;height:35px;border-radius:10px;background:#25160e;color:#ff7b37;font-weight:950}.v634-home-links small,.v634-home-links b,.v634-home-links em{display:block}.v634-home-links small{color:#777;font-size:7px;font-weight:950;letter-spacing:.1em}.v634-home-links b{margin-top:4px;font-size:10px}.v634-home-links em{grid-column:2;color:#ff7b37;font-size:8px;font-style:normal}.v634-strategy{display:grid;gap:13px}.v634-strategy-head{display:flex;align-items:end;justify-content:space-between;gap:16px;padding:21px;border:1px solid #4d2b19;border-radius:21px;background:linear-gradient(145deg,#1d130e,#111)}.v634-strategy-head h2{margin:6px 0 5px;font-size:28px}.v634-strategy-head p{margin:0;color:#888}.v634-strategy-head input{max-width:180px}.v634-strategy-summary{display:grid;grid-template-columns:1fr 1fr auto;gap:9px}.v634-strategy-summary>div,.v634-strategy-summary>span{padding:17px;border:1px solid #2e2e2e;border-radius:16px;background:#141414}.v634-strategy-summary small{color:#777;font-size:7px;font-weight:950;letter-spacing:.1em}.v634-strategy-summary h3{margin:7px 0 0;font-size:15px}.v634-strategy-summary p{margin:5px 0 0;color:#777;font-size:9px}.v634-strategy-summary>span{display:grid;place-content:center;min-width:125px;text-align:center}.v634-strategy-summary>span b{font-size:27px}.v634-strategy-lines{padding:17px;border:1px solid #2e2e2e;border-radius:20px;background:#111}.v634-line-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v634-line-card{padding:15px;border:1px solid #303030;border-radius:15px;background:#151515}.v634-line-card header{display:flex;justify-content:space-between;gap:9px}.v634-line-card header small{color:#777;font-size:7px;font-weight:950}.v634-line-card header b{color:#ff7b37;font-size:8px}.v634-line-card h3{margin:10px 0 6px;font-size:15px}.v634-line-card p{min-height:38px;margin:0;color:#818181;font-size:9px;line-height:1.45}.v634-line-card .progress{margin-top:11px}.v634-work-art{margin:12px 0}.v634-work-art-title{display:flex;align-items:end;justify-content:space-between;margin-bottom:8px}.v634-work-art-title small{color:#ff7b37;font-size:8px;font-weight:950;letter-spacing:.12em}.v634-work-art-title b{font-size:10px}.v634-work-art .v622-approval-art{margin:0}.v634-work-brief{margin-top:12px;border:1px solid #303030;border-radius:14px;background:#121212}.v634-work-brief>summary{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:13px;list-style:none;cursor:pointer}.v634-work-brief>summary span{font-size:11px;font-weight:950}.v634-work-brief>summary em{color:#777;font-size:8px;font-style:normal}.v634-work-brief>summary b{color:#ff7b37}.v634-work-brief[open]>summary b{transform:rotate(45deg)}.v634-work-brief>div{padding:0 10px 10px}.v634-work-brief .v591-brief-summary{margin:0}
@media(max-width:760px){.v634-portal-home{gap:10px}.v634-home-head{grid-template-columns:1fr;padding:16px}.v634-home-head h2{font-size:26px}.v634-home-head p{font-size:13px;line-height:1.4}.v634-head-action{width:100%;min-width:0}.v634-review-section{padding:12px}.v634-section-title h3{font-size:18px}.v634-home-review{flex:0 0 84vw;grid-template-columns:66px minmax(0,1fr);padding:9px}.v634-home-review>.v550-media{grid-row:1/3;width:66px!important;height:78px!important}.v634-home-review h3{font-size:13px}.v634-home-review p{font-size:10px}.v634-home-review>.btn{grid-column:2;width:100%;min-height:42px!important;font-size:11px!important}.v634-home-links{grid-template-columns:1fr 1fr}.v634-home-links>button{padding:11px}.v634-home-links b{font-size:11px;line-height:1.3}.v634-strategy-head{align-items:stretch;flex-direction:column;padding:16px}.v634-strategy-head h2{font-size:24px}.v634-strategy-head p{font-size:12px;line-height:1.45}.v634-strategy-head input{width:100%;max-width:none}.v634-strategy-summary{grid-template-columns:1fr}.v634-strategy-summary>div,.v634-strategy-summary>span{padding:14px}.v634-strategy-summary>span{display:flex;align-items:center;justify-content:space-between;text-align:left}.v634-line-grid{grid-template-columns:1fr}.v634-line-card p{min-height:0;font-size:11px}.v591-work-modal>.v591-progress{overflow-x:auto}.v634-work-art-title{align-items:flex-start;flex-direction:column;gap:4px}.v634-work-art-title small{font-size:10px}.v634-work-art-title b{font-size:12px}.v634-work-brief>summary{grid-template-columns:1fr auto}.v634-work-brief>summary span{font-size:13px}.v634-work-brief>summary em{grid-column:1;font-size:10px}.v634-work-brief>summary b{grid-column:2;grid-row:1/3}.v634-work-brief .v591-summary-grid,.v634-work-brief .v591-summary-slides{grid-template-columns:1fr!important}}
`;document.head.appendChild(v634Style);
// ===== FIM COLAB V6.34 =====


// ===== COLAB V6.35 — CANVA CONECTADO AO WORKFLOW =====
// O design editável permanece interno. Para revisão, o backend exporta uma
// versão fechada e a salva junto às artes que já alimentam o portal da cliente.
const CANVA_FN_V635=B+'/functions/v1/canva-connect';
let canvaStateV635={checked:false,loading:false,configured:null,connected:false,connected_at:null};
let canvaDesignsV635=[];
let canvaDesignLoadingV635=false;
let canvaSyncingV635=false;

async function canvaApiV635(action,body={}){
  let response=await fetch(`${CANVA_FN_V635}/${action}`,{method:'POST',headers:{apikey:K,Authorization:`Bearer ${S.access_token}`,'Content-Type':'application/json'},body:JSON.stringify(body)}),text=await response.text(),data={};
  try{data=text?JSON.parse(text):{}}catch(_){data={error:text}}
  if(!response.ok)throw new Error(data.error||data.message||'Não foi possível falar com o Canva');
  return data;
}
async function loadCanvaStatusV635(refresh=false){
  if(M.role!=='team'||canvaStateV635.loading||(!refresh&&canvaStateV635.checked))return canvaStateV635;
  canvaStateV635.loading=true;
  try{let state=await canvaApiV635('status');canvaStateV635={...state,checked:true,loading:false}}catch(error){canvaStateV635={checked:true,loading:false,configured:false,connected:false,error:error.message}}
  if(MD&&['contentDetail','canvaPickerV635'].includes(MD.type))render();
  return canvaStateV635;
}
function canvaDateV635(value){if(!value)return'';try{return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(value))}catch(_){return''}}
function canvaPanelV635(content,work,compact=false){
  if(M.role!=='team')return'';
  let linked=!!(work?.canva_design_id||work?.canva_edit_url),connected=canvaStateV635.connected,configured=canvaStateV635.configured,loading=canvaStateV635.loading||!canvaStateV635.checked,title=work?.canva_design_title||'Design do Canva',synced=canvaDateV635(work?.canva_synced_at);
  return `<section class="v635-canva ${compact?'compact':''}"><div class="v635-canva-head"><div><small>CANVA · SOMENTE EQUIPE</small><h3>${linked?E(title):'Conecte a arte ao conteúdo'}</h3><p>${linked?(synced?`Versão para revisão atualizada em ${E(synced)}.`:'O design está vinculado. Gere a versão para revisão.'):'Escolha um design da sua conta ou cole o link editável.'}</p></div><span class="${connected?'on':loading?'wait':'off'}">${connected?'Conectado':loading?'Verificando…':configured===false?'Configuração pendente':'Desconectado'}</span></div>${linked?`<div class="v635-linked"><div><span>◆</span><b>${E(title)}</b></div><div class="v635-linked-actions">${work?.canva_edit_url?`<a class="btn ghost" href="${E(work.canva_edit_url)}" target="_blank" rel="noopener">Abrir no Canva ↗</a>`:''}${connected?`<button type="button" class="btn pri" data-v635-sync="${content.id}">${synced?'Atualizar versão':'Gerar versão para revisão'}</button>`:''}</div></div>`:''}<div class="v635-connect-actions">${connected?`<button type="button" class="btn ghost" data-v635-picker="${content.id}">${linked?'Trocar design':'Escolher no Canva'}</button>`:configured===false?`<p class="v635-setup-note">A estrutura está pronta. Falta autorizar o aplicativo no Canva uma única vez.</p>`:`<button type="button" class="btn pri" data-v635-connect>Conectar Canva</button>`}<label class="v635-link-field"><span>${linked?'Atualizar link editável':'Ou colar link do design'}</span><input name="canva_edit_url" type="url" value="${E(work?.canva_edit_url||'')}" placeholder="https://www.canva.com/design/..."></label></div>${!compact?'<div class="v635-manual-divider"><span>ou envie a arte manualmente abaixo</span></div>':''}</section>`;
}

const _productionModalV635Base=productionModalV627;
productionModalV627=function(content){
  let html=_productionModalV635Base(content),work=workflowWorkV583(content.id),needle='<section class="v627-art-studio';
  return html.replace(needle,canvaPanelV635(content,work,false)+needle);
};
const _saveProductionFormatV635Base=saveProductionFormatV617;
saveProductionFormatV617=async function(form,contentId){
  await _saveProductionFormatV635Base(form,contentId);
  if(!form||form.dataset.stage!=='visual_production')return;
  let work=workflowWorkV583(contentId),field=form.querySelector('[name="canva_edit_url"]');
  if(work&&field)await patch('content_team_workflow',work.id,{canva_edit_url:String(field.value||'').trim()||null,updated_at:new Date().toISOString()});
};

function canvaPickerModalV635(content){
  let query=E(MD?.query||''),items=canvaDesignsV635;
  return `<div class="modalbg"><div class="modal wide v635-picker"><div class="head"><div><small class="ey">CANVA CONECTADO</small><h2>Escolher design</h2><p>Selecione o arquivo que pertence a “${E(content?.title||'este conteúdo')}”.</p></div><button class="btn ghost small" data-close>✕</button></div><form id="canvaSearchV635"><div class="v635-search"><input name="query" value="${query}" placeholder="Buscar pelo nome do design"><button class="btn pri">Buscar</button></div></form>${canvaDesignLoadingV635?'<div class="v635-loading">Buscando seus designs…</div>':`<div class="v635-design-grid">${items.map(item=>{let thumb=item.thumbnail?.url||item.thumbnail?.url_for_web||'',pages=item.page_count||item.total_pages||'';return `<article class="v635-design-card">${thumb?`<img src="${E(thumb)}" alt="">`:'<div class="v635-design-empty">◆</div>'}<div><small>${pages?`${E(pages)} página${Number(pages)===1?'':'s'}`:'DESIGN'}</small><b>${E(item.title||'Sem título')}</b><button type="button" class="btn pri full" data-v635-select="${E(item.id)}">Usar neste conteúdo</button></div></article>`}).join('')||'<div class="v635-loading">Nenhum design encontrado.</div>'}</div>`}<div class="actions"><button type="button" class="btn ghost" data-v635-back="${content?.id||''}">Voltar</button></div></div></div>`;
}
const _modalV635Base=modal;
modal=function(){if(MD?.type==='canvaPickerV635')return canvaPickerModalV635((D.contents||[]).find(row=>row.id===MD.id));return _modalV635Base()};

async function openCanvaPickerV635(contentId,query=''){
  MD={type:'canvaPickerV635',id:contentId,query};canvaDesignLoadingV635=true;render();
  try{let data=await canvaApiV635('designs',{query});canvaDesignsV635=data.items||[]}catch(error){toast(error.message);canvaDesignsV635=[]}
  canvaDesignLoadingV635=false;if(MD?.type==='canvaPickerV635'&&MD.id===contentId)render();
}
async function selectCanvaDesignV635(contentId,designId){
  let item=canvaDesignsV635.find(row=>row.id===designId),work=workflowWorkV583(contentId);if(!item||!work)return;
  let editUrl=item.urls?.edit_url||item.url||item.urls?.view_url||'';
  try{await patch('content_team_workflow',work.id,{canva_design_id:item.id,canva_design_title:item.title||'Design do Canva',canva_edit_url:editUrl||work.canva_edit_url||null,canva_synced_at:null,updated_at:new Date().toISOString()});await load();MD={type:'contentDetail',id:contentId};render();toast('Design conectado ao conteúdo ✓')}catch(error){toast(error.message)}
}
async function syncCanvaV635(contentId,{silent=false}={}){
  if(canvaSyncingV635)return false;let content=(D.contents||[]).find(row=>row.id===contentId),work=workflowWorkV583(contentId);if(!content||!work)return false;
  canvaSyncingV635=true;let buttons=[...document.querySelectorAll(`[data-v635-sync="${contentId}"]`)];buttons.forEach(button=>{button.disabled=true;button.dataset.old=button.textContent;button.textContent='Gerando versão…'});
  try{let form=document.getElementById('workflowProgressFormV591');if(form?.dataset.stage==='visual_production')await saveProductionFormatV617(form,contentId);let result=await canvaApiV635('export',{content_id:contentId,design_id:work.canva_design_id||'',design_title:work.canva_design_title||'',canva_url:form?.querySelector('[name="canva_edit_url"]')?.value||work.canva_edit_url||''});await load();MD={type:'contentDetail',id:contentId};render();if(!silent)toast(`${result.count||1} arquivo${Number(result.count)===1?'':'s'} atualizado${Number(result.count)===1?'':'s'} ✓`);return true}catch(error){toast(error.message);render();return false}finally{canvaSyncingV635=false}
}

const _workflowProgressModalV635Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let html=_workflowProgressModalV635Base(content),work=workflowWorkV583(content.id),stage=workflowStageV583(work);
  if(stage==='internal_review')html=html.replace('<section class="v591-stage-form',canvaPanelV635(content,work,true)+'<section class="v591-stage-form');
  return html;
};
const _moveWorkflowV635Base=moveWorkflowV591;
moveWorkflowV591=async function(contentId,target,reload=true){
  let work=workflowWorkV583(contentId);
  if(target==='client_approval'&&canvaStateV635.connected&&(work?.canva_design_id||work?.canva_edit_url)){
    let synced=await syncCanvaV635(contentId,{silent:true});if(!synced)return;
  }
  return _moveWorkflowV635Base(contentId,target,reload);
};

const _bindV635Base=bind;
bind=function(){
  _bindV635Base();
  if(M.role==='team'&&!canvaStateV635.checked&&!canvaStateV635.loading)setTimeout(()=>loadCanvaStatusV635(),0);
  document.querySelectorAll('[data-v635-connect]').forEach(button=>button.onclick=async()=>{button.disabled=true;try{let data=await canvaApiV635('start');location.href=data.authorization_url}catch(error){toast(error.message);button.disabled=false}});
  document.querySelectorAll('[data-v635-picker]').forEach(button=>button.onclick=()=>openCanvaPickerV635(button.dataset.v635Picker));
  document.querySelectorAll('[data-v635-sync]').forEach(button=>button.onclick=()=>syncCanvaV635(button.dataset.v635Sync));
  document.querySelectorAll('[data-v635-select]').forEach(button=>button.onclick=()=>selectCanvaDesignV635(MD.id,button.dataset.v635Select));
  document.querySelectorAll('[data-v635-back]').forEach(button=>button.onclick=()=>{MD={type:'contentDetail',id:button.dataset.v635Back};render()});
  document.getElementById('canvaSearchV635')?.addEventListener('submit',event=>{event.preventDefault();openCanvaPickerV635(MD.id,String(new FormData(event.currentTarget).get('query')||'').trim())});
};

if(new URLSearchParams(location.search).has('canva')){
  let state=new URLSearchParams(location.search).get('canva');history.replaceState({},'',location.pathname+location.hash);
  setTimeout(()=>{canvaStateV635.checked=false;loadCanvaStatusV635(true);toast(state==='connected'?'Canva conectado ✓':state==='cancelled'?'Conexão cancelada':'Não foi possível conectar o Canva')},500);
}

const v635Style=document.createElement('style');v635Style.textContent=`
.v635-canva{display:grid;gap:12px;margin:0 0 14px;padding:15px;border:1px solid #58331e;border-radius:17px;background:radial-gradient(circle at 95% 0,rgba(125,83,255,.18),transparent 38%),linear-gradient(145deg,#181213,#111)}.v635-canva.compact{margin:12px 0}.v635-canva-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.v635-canva-head small{color:#a98cff;font-size:9px;font-weight:950;letter-spacing:.12em}.v635-canva-head h3{margin:5px 0 3px;font-size:18px}.v635-canva-head p{margin:0;color:#969096;font-size:12px;line-height:1.45}.v635-canva-head>span{flex:none;padding:7px 9px;border-radius:999px;background:#242124;color:#aaa;font-size:10px;font-weight:900}.v635-canva-head>span.on{background:#15351f;color:#75db96}.v635-canva-head>span.off{background:#2f1917;color:#e99a8d}.v635-linked{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px;border:1px solid #353035;border-radius:13px;background:#131313}.v635-linked>div:first-child{display:flex;align-items:center;gap:9px;min-width:0}.v635-linked>div:first-child span{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#291f3f;color:#b699ff}.v635-linked b{overflow:hidden;font-size:13px;text-overflow:ellipsis;white-space:nowrap}.v635-linked-actions{display:flex;gap:7px}.v635-connect-actions{display:grid;grid-template-columns:auto minmax(240px,1fr);gap:10px;align-items:end}.v635-link-field{display:grid;gap:5px}.v635-link-field>span{color:#aaa;font-size:11px;font-weight:850}.v635-link-field input{min-height:44px}.v635-setup-note{grid-column:1;margin:0;color:#bbada7;font-size:12px;line-height:1.45}.v635-manual-divider{display:flex;align-items:center;gap:9px;color:#6f6966;font-size:10px}.v635-manual-divider:before,.v635-manual-divider:after{content:'';height:1px;flex:1;background:#302a27}.v635-picker{max-width:980px!important}.v635-picker .head p{margin:5px 0 0;color:#888}.v635-search{display:grid;grid-template-columns:1fr auto;gap:8px;margin:13px 0}.v635-design-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px;max-height:62vh;overflow:auto}.v635-design-card{overflow:hidden;border:1px solid #303030;border-radius:15px;background:#141414}.v635-design-card img,.v635-design-empty{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;background:#211a2c}.v635-design-empty{display:grid;place-items:center;color:#ad8cff;font-size:28px}.v635-design-card>div{display:grid;gap:7px;padding:11px}.v635-design-card small{color:#987ae9;font-size:9px;font-weight:950}.v635-design-card b{min-height:34px;font-size:13px;line-height:1.3}.v635-loading{grid-column:1/-1;padding:30px;color:#888;text-align:center}
@media(max-width:760px){.v635-canva{padding:13px}.v635-canva-head{display:grid}.v635-canva-head small{font-size:10px}.v635-canva-head h3{font-size:19px}.v635-canva-head p{font-size:13px}.v635-canva-head>span{justify-self:start;font-size:11px}.v635-linked{align-items:stretch;flex-direction:column}.v635-linked b{font-size:14px}.v635-linked-actions{display:grid;grid-template-columns:1fr}.v635-linked-actions .btn{min-height:46px!important;font-size:13px!important}.v635-connect-actions{grid-template-columns:1fr}.v635-connect-actions>.btn{min-height:48px!important;font-size:14px!important}.v635-link-field>span{font-size:12px}.v635-link-field input{font-size:15px!important}.v635-manual-divider{font-size:11px}.v635-picker{width:calc(100vw - 12px)!important;max-width:none!important;padding:14px!important}.v635-search{grid-template-columns:1fr}.v635-search input{font-size:15px!important}.v635-design-grid{grid-template-columns:1fr 1fr;max-height:65vh}.v635-design-card b{font-size:14px}.v635-design-card .btn{font-size:12px!important}.v635-setup-note{grid-column:auto;font-size:13px}}
`;document.head.appendChild(v635Style);
// ===== FIM COLAB V6.35 =====


// ===== COLAB V6.36 — IDEIA COM ESBOÇO + ARTE NA REVISÃO =====
// Guardar uma ideia e criar um conteúdo são caminhos diferentes. O esboço
// preserva o pensamento livre; a ficha estratégica só abre quando necessário.
quickIdeaModalV633=function(){
  let cid=MD?.clientId||clientHubIdV5||contentClient||'',client=cl(cid)||{};
  return `<div class="modalbg"><div class="modal v633-quick-idea v636-quick-idea"><div class="head"><div><small class="ey">GUARDAR IDEIA</small><h2>Anote antes que a ideia escape.</h2><p class="muted">Guarde o pensamento do seu jeito. Isso ainda não entra em Produção e não aparece para a cliente.</p></div><button type="button" class="btn ghost small" data-close>✕</button></div><form id="quickIdeaFormV633"><input type="hidden" name="client_id" value="${E(cid)}"><div class="v633-client-lock"><small>CLIENTE</small><b>${E(client.name||'Cliente')}</b></div><div class="field"><label>Título da ideia</label><input name="title" required autofocus placeholder="Ex.: Trend com a equipe nos bastidores"></div><div class="field v636-sketch"><label>Esboço da ideia <span class="muted">(opcional)</span></label><textarea name="notes" rows="7" placeholder="Escreva o pensamento, o gancho, a sequência ou tudo o que você imaginou para esse conteúdo."></textarea></div><div class="field"><label>Link de referência <span class="muted">(opcional)</span></label><input name="reference_url" type="url" placeholder="Instagram, Pinterest, Drive..."></div><div class="actions v636-idea-actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button type="submit" class="btn ghost">Guardar em Ideias</button><button type="button" class="btn pri" data-v636-structure>Estruturar conteúdo agora →</button></div></form></div></div>`
};

async function structureQuickIdeaV636(form){
  if(!form||form.dataset.saving==='1')return;let data=new FormData(form),cid=String(data.get('client_id')||''),title=String(data.get('title')||'').trim(),notes=String(data.get('notes')||'').trim(),reference=String(data.get('reference_url')||'').trim(),now=new Date().toISOString();
  if(!title){form.querySelector('[name="title"]')?.focus();return toast('Dê um título para continuar')}
  form.dataset.saving='1';let button=form.querySelector('[data-v636-structure]');if(button){button.disabled=true;button.textContent='Abrindo estrutura…'}
  try{let created=await api('/rest/v1/client_insights',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({organization_id:M.organization_id,client_id:cid,title,notes:notes||null,source_url:reference||null,insight_type:'idea',status:'new',idea_brief:{notes,reference_links:reference?[reference]:[]},visible_to_client:false,created_by:S.user?.id,updated_at:now})}),idea=created?.[0];if(!idea?.id)throw Error('Não foi possível guardar a ideia.');await load();MD={type:'ideaStructuredV591',id:idea.id};render();toast('Ideia guardada. Agora você pode estruturar ✓')}catch(error){form.dataset.saving='';if(button){button.disabled=false;button.textContent='Estruturar conteúdo agora →'}toast(error.message)}
}

const _workflowProgressModalV636Base=workflowProgressModalV591;
workflowProgressModalV591=function(content){
  let html=_workflowProgressModalV636Base(content),work=workflowWorkV583(content.id),stage=workflowStageV583(work);if(stage!=='internal_review'||M.role!=='team')return html;
  let studio=content.format==='carousel'?productionCarouselStudioV627(content,work):productionSingleStudioV627(content);
  return html.replace('<form id="workflowProgressFormV591"',`<details class="v636-review-art"><summary><span>Adicionar ou trocar arte</span><em>Ajuste a peça sem sair da revisão</em><b>＋</b></summary><div>${studio}</div></details><form id="workflowProgressFormV591"`);
};

const _bindV636Base=bind;
bind=function(){
  _bindV636Base();
  document.querySelector('[data-v636-structure]')?.addEventListener('click',event=>structureQuickIdeaV636(event.currentTarget.closest('form')));
};

const v636Style=document.createElement('style');v636Style.textContent=`
.v636-sketch textarea{min-height:180px;line-height:1.55}.v636-idea-actions{display:grid;grid-template-columns:auto 1fr 1.25fr}.v636-review-art{margin:14px 0;border:1px solid #54301d;border-radius:15px;background:#14110f}.v636-review-art>summary{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;min-height:52px;padding:12px 14px;list-style:none;cursor:pointer}.v636-review-art>summary span{font-size:14px;font-weight:950}.v636-review-art>summary em{color:#888;font-size:12px;font-style:normal}.v636-review-art>summary b{color:#ff7430;font-size:20px}.v636-review-art[open]>summary b{transform:rotate(45deg)}.v636-review-art>div{padding:0 12px 14px}.v636-review-art .v627-studio-head small{font-size:10px}.v636-review-art .v627-studio-head b{font-size:15px}
@media(max-width:760px){.v636-quick-idea .head h2{font-size:25px}.v636-quick-idea .head p{font-size:13px;line-height:1.45}.v636-sketch textarea{min-height:210px;font-size:16px!important}.v636-idea-actions{grid-template-columns:1fr!important}.v636-idea-actions .btn{width:100%;min-height:50px!important;font-size:14px!important}.v636-review-art>summary{grid-template-columns:1fr auto;padding:14px}.v636-review-art>summary span{font-size:15px}.v636-review-art>summary em{grid-column:1;font-size:12px}.v636-review-art>summary b{grid-column:2;grid-row:1/3}.v636-review-art>div{padding:0 10px 12px}}
`;document.head.appendChild(v636Style);
// ===== FIM COLAB V6.36 =====


// ===== COLAB V6.37 — PRODUÇÃO SEM BLOCO MORTO + ENVIO PROTEGIDO =====
const _canvaPanelV637Base=canvaPanelV635;
canvaPanelV635=function(content,work,compact=false){
  if(M.role!=='team')return'';
  if(!canvaStateV635.checked||canvaStateV635.configured===false){
    return `<details class="v637-canva-wait"><summary><span>◆</span><div><b>Usar Canva</b><small>Vincular o arquivo editável <em>(opcional)</em></small></div><strong>＋</strong></summary><div><p>A conexão automática ainda está sendo autorizada. Por enquanto, você pode guardar o link e enviar as artes manualmente.</p><label><span>Link editável do design</span><input name="canva_edit_url" type="url" value="${E(work?.canva_edit_url||'')}" placeholder="https://www.canva.com/design/..."></label></div></details>`;
  }
  return _canvaPanelV637Base(content,work,compact);
};

function productionCompleteV637(content){
  if(!content)return false;
  if(content.format==='carousel'){
    let work=workflowWorkV583(content.id),count=carouselCountV618(content,work),slots=new Set(carouselAssetsV618(content).map(row=>Number(row._slide||0)));
    return Array.from({length:count},(_,index)=>index+1).every(slot=>slots.has(slot));
  }
  return !!currentAsset(content);
}
function productionMissingLabelV637(content){
  if(content?.format==='carousel'){
    let work=workflowWorkV583(content.id),count=carouselCountV618(content,work),slots=new Set(carouselAssetsV618(content).map(row=>Number(row._slide||0))),missing=Array.from({length:count},(_,index)=>index+1).filter(slot=>!slots.has(slot));
    return missing.length===1?`Adicione a arte do card ${missing[0]}`:`Adicione as ${missing.length} artes restantes`;
  }
  return 'Adicione a arte antes de enviar';
}

const _productionModalV637Base=productionModalV627;
productionModalV627=function(content){
  let html=_productionModalV637Base(content);if(productionCompleteV637(content))return html;
  let marker=`data-v627-review="${content.id}"`;
  return html.replace(marker,`${marker} disabled aria-disabled="true" title="${E(productionMissingLabelV637(content))}"`).replace('Enviar para revisão →',E(productionMissingLabelV637(content)));
};
const _saveProductionStudioV637Base=saveProductionStudioV627;
saveProductionStudioV627=async function(contentId,move=false){
  let content=(D.contents||[]).find(row=>row.id===contentId);
  if(move&&!productionCompleteV637(content))return toast(productionMissingLabelV637(content));
  return _saveProductionStudioV637Base(contentId,move);
};

const v637Style=document.createElement('style');v637Style.textContent=`
.v637-canva-wait{margin:0 0 14px;border:1px solid #332b36;border-radius:14px;background:#141215}.v637-canva-wait>summary{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;min-height:58px;padding:11px 13px;list-style:none;cursor:pointer}.v637-canva-wait>summary>span{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#251d34;color:#b696ff}.v637-canva-wait>summary b,.v637-canva-wait>summary small{display:block}.v637-canva-wait>summary b{font-size:14px}.v637-canva-wait>summary small{margin-top:3px;color:#8b858e;font-size:11px}.v637-canva-wait>summary em{font-style:normal}.v637-canva-wait>summary strong{color:#a889ef;font-size:19px}.v637-canva-wait[open]>summary strong{transform:rotate(45deg)}.v637-canva-wait>div{display:grid;gap:10px;padding:0 13px 13px}.v637-canva-wait>div p{margin:0;color:#918a91;font-size:12px;line-height:1.45}.v637-canva-wait label{display:grid;gap:6px}.v637-canva-wait label span{font-size:12px;font-weight:850}.v637-canva-wait input{min-height:44px}.v627-production-actions [data-v627-review]:disabled{border-color:#3a302b!important;background:#27221f!important;color:#81756f!important;box-shadow:none!important;cursor:not-allowed!important}
@media(max-width:760px){.v637-canva-wait>summary{min-height:64px;padding:12px}.v637-canva-wait>summary b{font-size:15px}.v637-canva-wait>summary small{font-size:12px}.v637-canva-wait>div p{font-size:13px}.v637-canva-wait label span{font-size:13px}.v637-canva-wait input{font-size:15px!important}.v627-production-actions [data-v627-review]:disabled{font-size:12px!important}}
`;document.head.appendChild(v637Style);
// ===== FIM COLAB V6.37 =====


// ===== COLAB V6.38 — DECISÃO E FEEDBACK VISÍVEIS NO KANBAN =====
function workflowClientDecisionV638(content){
  return (D.approvals||[]).filter(row=>row.content_id===content?.id&&row.status!=='pending').slice().sort((a,b)=>String(b.decided_at||b.updated_at||'').localeCompare(String(a.decided_at||a.updated_at||'')))[0]||null;
}
function workflowFeedbackPanelV638(content,compact=false){
  let approval=workflowClientDecisionV638(content);if(!approval)return'';
  let approved=approval.status==='approved',comment=String(approval.latest_comment||'').trim();
  if(compact)return `<div class="v638-card-feedback ${approved?'approved':'changes'}"><small>${approved?'✓ APROVADO PELA CLIENTE':'↺ AJUSTES DA CLIENTE'}</small><p>${E(comment||(approved?'Aprovado sem observações.':'A cliente não deixou um comentário.'))}</p></div>`;
  return `<section class="v638-feedback ${approved?'approved':'changes'}"><div class="v638-feedback-head"><span>${approved?'✓':'↺'}</span><div><small>FEEDBACK DA CLIENTE</small><h3>${approved?'Conteúdo aprovado':'Ajustes solicitados'}</h3></div></div><blockquote>${E(comment||(approved?'Aprovado sem observações.':'A cliente não deixou um comentário.'))}</blockquote><p>Esse retorno fica registrado junto ao conteúdo e à versão revisada.</p></section>`;
}

const _workflowPremiumCardV638Base=workflowPremiumCardV594;
workflowPremiumCardV594=function(content){
  let html=_workflowPremiumCardV638Base(content),feedback=workflowFeedbackPanelV638(content,true);if(!feedback)return html;
  return html.replace('<div class="v596-card-next">',feedback+'<div class="v596-card-next">');
};

const _approvedWorkflowModalV638Base=approvedWorkflowModalV631;
approvedWorkflowModalV631=function(content){
  let html=_approvedWorkflowModalV638Base(content),feedback=workflowFeedbackPanelV638(content,false);
  return feedback?html.replace('<section class="v591-stage-form v631-approved-stage">',feedback+'<section class="v591-stage-form v631-approved-stage">'):html;
};

const _productionModalV638Base=productionModalV627;
productionModalV627=function(content){
  let html=_productionModalV638Base(content),approval=workflowClientDecisionV638(content);
  if(approval?.status!=='changes_requested')return html;
  return html.replace('<form id="workflowProgressFormV591"',workflowFeedbackPanelV638(content,false)+'<form id="workflowProgressFormV591"');
};

const v638Style=document.createElement('style');v638Style.textContent=`
.v638-card-feedback{margin:0 0 9px;padding:9px 10px;border:1px solid #385842;border-radius:10px;background:#101a13}.v638-card-feedback.changes{border-color:#6a3a26;background:#21140e}.v638-card-feedback small{display:block;color:#75d995;font-size:9px;font-weight:950;letter-spacing:.08em}.v638-card-feedback.changes small{color:#ff8b4d}.v638-card-feedback p{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;margin:5px 0 0;color:#b6beb8;font-size:12px;line-height:1.4}.v638-card-feedback.changes p{color:#d2b5a5}.v638-feedback{margin:14px 0;padding:16px;border:1px solid #315b3e;border-radius:16px;background:linear-gradient(145deg,#102017,#111)}.v638-feedback.changes{border-color:#734126;background:linear-gradient(145deg,#24150e,#111)}.v638-feedback-head{display:flex;align-items:center;gap:11px}.v638-feedback-head>span{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#173b24;color:#75d995;font-size:19px;font-weight:950}.v638-feedback.changes .v638-feedback-head>span{background:#3b2013;color:#ff8b4d}.v638-feedback-head small{color:#75d995;font-size:10px;font-weight:950;letter-spacing:.12em}.v638-feedback.changes .v638-feedback-head small{color:#ff8b4d}.v638-feedback-head h3{margin:4px 0 0;font-size:18px}.v638-feedback blockquote{margin:13px 0 8px;padding:13px 14px;border-left:3px solid #69ce86;border-radius:0 10px 10px 0;background:#0d160f;color:#f2f2f2;font-size:16px;font-weight:750;line-height:1.5;white-space:pre-wrap}.v638-feedback.changes blockquote{border-color:#ff7b35;background:#1c120d}.v638-feedback>p{margin:0;color:#748279;font-size:11px}.v638-feedback.changes>p{color:#8e7669}.v596-lane.stage-approved{border-color:#315b3e!important}.v596-lane.stage-approved>header i{background:#63cf83!important}
@media(max-width:760px){.v638-card-feedback small{font-size:10px}.v638-card-feedback p{font-size:13px}.v638-feedback{padding:14px}.v638-feedback-head small{font-size:11px}.v638-feedback-head h3{font-size:19px}.v638-feedback blockquote{font-size:16px}.v638-feedback>p{font-size:12px}}
`;document.head.appendChild(v638Style);
// ===== FIM COLAB V6.38 =====

