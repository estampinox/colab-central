// ===== COLAB V5.62 — CICLO CRIATIVO, APROVAÇÃO E APRENDIZADO =====
const _loadV562Base=load;
load=async function(){
  await _loadV562Base();
  if(M?.role!=='team'){D.contentLabVersions=[];return}
  try{D.contentLabVersions=await api('/rest/v1/content_lab_versions?select=*&order=created_at.desc&limit=160')||[]}
  catch(error){console.warn('Versões do Laboratório',error);D.contentLabVersions=[]}
};

function labVersionsV562(cid){return(D.contentLabVersions||[]).filter(function(row){return row.client_id===cid})}
function labStatusLabelV562(value){return({draft:'Em revisão',approved:'Aprovado',changes_requested:'Ajustes pedidos',rejected:'Reprovado',superseded:'Versão anterior'})[value]||value}
function labStatusClassV562(value){return value==='approved'?'approved':value==='rejected'?'rejected':value==='changes_requested'?'changes':'draft'}
function labUiFormatV562(value){return({reel:'reel',carousel:'carrossel',static_post:'estatico',story:'stories'})[value]||value}
function labUuidV562(){
  if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID();
  return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(char){let random=Math.random()*16|0,value=char==='x'?random:(random&3|8);return value.toString(16)})
}
function labObjectiveLabelV562(value){return({positioning:'Posicionamento',connection:'Conexão',education:'Educação',authority:'Autoridade',conversion:'Conversão'})[value]||value}

const _labStateV562Base=labStateV560;
labStateV560=function(){
  let state=_labStateV562Base();
  if(!state.objectiveType)state.objectiveType='positioning';
  if(!Array.isArray(state.selectedReferenceIds))state.selectedReferenceIds=[];
  if(!state.versionNo)state.versionNo=0;
  return state
};

const _labContextV562Base=labContextV560;
labContextV560=function(extra={}){
  let base=_labContextV562Base(extra),state=labStateV560(),allReferences=contentReferencesV561(contentClient),selectedIds=state.selectedReferenceIds||[];
  let selected=allReferences.filter(function(row){return selectedIds.includes(row.id)}).map(function(row){return{id:row.id,type:row.reference_type,title:row.title,notes:row.notes||'',takeaway:row.takeaway||'',avoid:row.avoid_copying||'',is_template:!!row.is_template,template_format:row.template_format||'',style_tags:row.style_tags||[],page_count:row.page_count||null}});
  let template=allReferences.find(function(row){return row.id===state.templateId})||null;
  let signals=labVersionsV562(contentClient).filter(function(row){return['approved','changes_requested','rejected'].includes(row.status)}).slice(0,14).map(function(row){return{status:row.status,title:row.title||'',objective_type:row.objective_type||'',format:row.format||'',feedback:row.decision_notes||'',tags:row.decision_tags||[],angle:row.output?.angulo||''}});
  return Object.assign({},base,{objective_type:state.objectiveType,selected_references:selected,selected_reference_ids:selectedIds,selected_template:template?{id:template.id,title:template.title,format:template.template_format||'',style_tags:template.style_tags||[],page_count:template.page_count||null,notes:template.notes||'',takeaway:template.takeaway||''}:null,feedback_signals:signals},extra)
};

referenceTypeV561=function(value){return({content:'Conteúdo',design:'Design',cover:'Capa',reel:'Reels',caption:'Legenda',copy:'Copy',competitor:'Concorrente',template:'Template Canva',other:'Outra'})[value]||'Referência'};
labReferencePanelV561=function(){
  let references=contentReferencesV561(contentClient),state=labStateV560();
  let rows=references.slice(0,10).map(function(row){
    let selected=(state.selectedReferenceIds||[]).includes(row.id),template=!!row.is_template||row.reference_type==='template',url=row.canva_edit_url||row.source_url;
    return '<article class="'+(selected?'is-selected ':'')+(template?'is-template':'')+'"><button type="button" class="v562-ref-toggle" data-lab-ref-select="'+E(row.id)+'" title="'+(selected?'Remover da criação':'Usar como inspiração')+'">'+(selected?'✓':'＋')+'</button><button type="button" data-lab-ref-edit="'+E(row.id)+'"><b>'+E(row.title)+'</b><small>'+E((template?'Canva · ':'')+(row.takeaway||row.notes||referenceTypeV561(row.reference_type)))+'</small></button><span>'+E(template?'Template':referenceTypeV561(row.reference_type))+'</span>'+(url?'<a href="'+E(url)+'" target="_blank" rel="noopener" aria-label="Abrir referência">↗</a>':'')+'</article>'
  }).join('');
  return '<section class="v560-control-block v561-reference-block"><div class="v560-control-title"><div><small>REFERÊNCIAS & TEMPLATES</small><b>Selecione o que inspira esta criação</b></div><button data-lab-ref-new>＋ Adicionar</button></div><div class="v561-reference-list v562-reference-list">'+(rows||'<p>Adicione referências de conteúdo, design e packs editáveis do Canva.</p>')+'</div></section>'
};

function labObjectivePickerV562(){
  let state=labStateV560(),options=[['positioning','Posicionamento'],['connection','Conexão'],['education','Educação'],['authority','Autoridade'],['conversion','Conversão']];
  return '<small class="v560-label">PAPEL ESTRATÉGICO DO CONTEÚDO</small><div class="v560-choice-row v562-objective-row">'+options.map(function(option){return '<button class="'+(state.objectiveType===option[0]?'on':'')+'" data-lab-objective="'+option[0]+'">'+option[1]+'</button>'}).join('')+'</div>'
}
const _labConsoleV562Base=labConsoleV560;
labConsoleV560=function(){
  let html=_labConsoleV562Base();
  return html.replace('<small class="v560-label">FORMATO</small>',labObjectivePickerV562()+'<small class="v560-label">FORMATO</small>')
};

function labResultViewV560(){
  let state=labStateV560(),result=state.result||{},units=labResultUnitsV561(result,state.format),status=state.currentVersionStatus||'draft',version=state.versionNo||1;
  let decision=status==='approved'?'<span class="v562-decision approved">Aprovado</span>':status==='rejected'?'<span class="v562-decision rejected">Reprovado</span>':status==='changes_requested'?'<span class="v562-decision changes">Em reformulação</span>':'<span class="v562-decision draft">Aguardando revisão</span>';
  let actions=result.savedId?'<button class="btn pri" data-lab-open-workflow>Abrir no workflow →</button>':'<button class="btn ghost" data-lab-request-changes>Pedir ajustes</button><button class="btn ghost v562-reject" data-lab-reject>Reprovar e reformular</button><button class="btn pri" data-lab-approve-result>✓ Aprovar e avançar</button>';
  return '<div class="v560-result v561-result v562-result"><div class="v560-result-head"><div><small class="ey">VERSÃO '+E(String(version))+' · '+E(labFormatLabelV560(state.format).toUpperCase())+' · '+E(labObjectiveLabelV562(state.objectiveType).toUpperCase())+'</small><h2>'+E(result.titulo||'Conteúdo gerado')+'</h2><p>'+E(result.angulo||'')+'</p></div><div class="v562-version-state">'+decision+'<span>'+units+' '+(state.format==='reel'?(units===1?'cena':'cenas'):(units===1?'tela':'telas'))+'</span></div></div>'+(state.format==='reel'?labReelPreviewV561(result):labPreviewSlidesV560(result))+labDirectionDetailsV561(result)+'<div class="v562-review-note"><b>Revise antes de avançar</b><span>Ao aprovar, a peça entra em produção. Ao pedir ajuste ou reprovar, o motivo gera uma nova versão e alimenta o aprendizado desta cliente.</span></div><div class="v560-stage-actions"><button class="btn ghost" data-lab-copy>Copiar conteúdo</button><button class="btn ghost" data-lab-variation>↻ Outra opção</button>'+actions+'</div></div>'
}

function labHistoryV560(){
  let rows=labVersionsV562(contentClient).slice(0,12);
  if(!rows.length)return'';
  return '<section class="v560-history v562-history"><div class="head"><div><small class="ey">HISTÓRICO VERSIONADO</small><h3>O que foi aprovado, ajustado ou reprovado</h3></div></div><div class="v562-history-grid">'+rows.map(function(row){return '<button data-lab-version="'+E(row.id)+'"><div><span>'+E(row.title||row.topic||'Conteúdo')+'</span><small>v'+E(String(row.version_no))+' · '+E(labObjectiveLabelV562(row.objective_type||''))+' · '+E(labFormatLabelV560(labUiFormatV562(row.format)))+'</small></div><em class="'+labStatusClassV562(row.status)+'">'+E(labStatusLabelV562(row.status))+'</em></button>'}).join('')+'</div></section>'
}

async function labPersistVersionV562(result,meta){
  let state=labStateV560(),context=labContextV560(),payload={organization_id:M.organization_id,client_id:contentClient,cycle_id:meta.cycleId,parent_version_id:meta.parentId||null,version_no:meta.versionNo,stage:'content',status:'draft',objective_type:state.objectiveType,format:labFormatDbV560(state.format),style:state.style,topic:state.topic||null,title:result.titulo||state.topic||null,brief:{topic:state.topic,pauta:state.selectedPauta,structure:meta.structure||null,tone:state.tone,objective_type:state.objectiveType,format:state.format,style:state.style,template_id:state.templateId||null},output:result,strategy_snapshot:{client:context.client,plan:context.plan,pillars:context.pillars,dna:context.dna},reference_ids:(state.selectedReferenceIds||[]),created_by:S.user?.id};
  let rows=await api('/rest/v1/content_lab_versions',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)}),saved=rows?.[0];
  if(!saved?.id)throw Error('A versão foi criada, mas não entrou no histórico.');
  D.contentLabVersions=[saved].concat((D.contentLabVersions||[]).filter(function(row){return row.id!==saved.id}));
  state.cycleId=saved.cycle_id;state.currentVersionId=saved.id;state.versionNo=saved.version_no;state.currentVersionStatus=saved.status;return saved
}

labGenerateContentV560=async function(useStructure=false){
  let state=labStateV560(),topic=labCaptureTopicV560();if(!topic){state.error='Escreva um tema ou selecione uma pauta antes de criar.';render();return}
  let structure=useStructure?labCaptureStructureV560():null,revision=state.pendingRevision||null,variation=!!state.requestVariation,previous=state.result?JSON.parse(JSON.stringify(state.result)):null,sameCycle=!!((revision||variation)&&state.cycleId),cycleId=sameCycle?state.cycleId:labUuidV562(),versionNo=sameCycle?Number(state.versionNo||1)+1:1,parentId=sameCycle?state.currentVersionId:null;
  state.busy='content';state.error='';state.stage='content-loading';render();
  try{
    let payload=await labAIRequestV560('content',{topic:topic,structure:structure,pauta:state.selectedPauta,objective_type:state.objectiveType,selected_reference_ids:state.selectedReferenceIds||[],template_id:state.templateId||null,revision:revision?{decision:revision.decision,feedback:revision.feedback,tags:revision.tags,previous_output:previous,previous_version:state.versionNo}:null,variation:variation?{instruction:'Crie uma alternativa realmente diferente sem sair da estratégia.',previous_output:previous}:null});
    payload.slides=labSafeSlidesV560(payload);
    if(state.format==='reel'){if(!Array.isArray(payload.roteiro)||!payload.roteiro.length)throw Error('O roteiro voltou sem cenas. Tente novamente.')}else if(!payload.slides.length)throw Error('A criação voltou sem telas. Tente novamente.');
    if(variation&&state.currentVersionId)await patch('content_lab_versions',state.currentVersionId,{status:'superseded',decided_at:new Date().toISOString(),decided_by:S.user?.id});
    state.cycleId=cycleId;state.versionNo=versionNo;
    await labPersistVersionV562(payload,{cycleId:cycleId,versionNo:versionNo,parentId:parentId,structure:structure});
    state.result=payload;state.stage='result';state.pendingRevision=null;state.requestVariation=false;state.history.unshift({result:JSON.parse(JSON.stringify(payload)),format:state.format,style:state.style,topic:topic});if(state.history.length>8)state.history.pop()
  }catch(error){state.error=error.message;state.stage=previous?'result':(structure?'structure':'empty');state.result=previous}
  finally{state.busy='';state.pendingRevision=null;state.requestVariation=false;render()}
};

async function labUpdateDecisionV562(status,notes,tags){
  let state=labStateV560();if(!state.currentVersionId)throw Error('Esta versão ainda não foi sincronizada.');
  let values={status:status,decision_notes:notes||null,decision_tags:tags||[],decided_by:S.user?.id,decided_at:new Date().toISOString()};
  await patch('content_lab_versions',state.currentVersionId,values);
  let row=(D.contentLabVersions||[]).find(function(item){return item.id===state.currentVersionId});if(row)Object.assign(row,values);state.currentVersionStatus=status
}
function labFeedbackModalV562(decision){
  let rejected=decision==='rejected',title=rejected?'Reprovar e reformular':'Pedir ajustes',copy=rejected?'Diga por que esta direção não funciona. O Laboratório criará uma nova versão sem repetir o erro.':'Explique o que deve mudar. A nova versão preserva a estratégia e aplica o seu direcionamento.';
  let tags=['Gancho','Tom de voz','Profundidade','Formato','Capa / visual','Roteiro','Legenda','CTA'];
  return '<div class="modalbg"><div class="modal v562-feedback-modal"><div class="head"><div><small class="ey">REVISÃO CRIATIVA</small><h2>'+title+'</h2><p class="muted">'+copy+'</p></div><button class="btn ghost small" data-close>✕</button></div><form id="labFeedbackFormV562" data-decision="'+decision+'"><div class="field"><label>O que precisa mudar?</label><textarea name="feedback" rows="5" required placeholder="Seja específico: o gancho está genérico, a fala não parece com a cliente, a capa precisa ser mais direta..."></textarea></div><div class="field"><label>Áreas do ajuste</label><div class="v562-feedback-tags">'+tags.map(function(tag){return '<label><input type="checkbox" name="tags" value="'+E(tag)+'"> '+E(tag)+'</label>'}).join('')+'</div></div><div class="actions"><button type="button" class="btn ghost" data-close>Cancelar</button><button class="btn '+(rejected?'danger':'pri')+'">'+(rejected?'Reprovar e criar v'+(Number(labStateV560().versionNo||1)+1):'Aplicar ajustes na v'+(Number(labStateV560().versionNo||1)+1))+'</button></div></form></div></div>'
}
const _modalV562Base=modal;
modal=function(){if(MD?.type==='labFeedbackV562')return labFeedbackModalV562(MD.decision);return _modalV562Base()};

async function applyLabFeedbackV562(event){
  event.preventDefault();let form=event.currentTarget,data=new FormData(form),feedback=String(data.get('feedback')||'').trim(),tags=data.getAll('tags').map(String),decision=form.dataset.decision||'changes_requested';if(!feedback)return;
  let button=form.querySelector('button[type="submit"],button.pri,button.danger');if(button){button.disabled=true;button.textContent='Criando nova versão...'}
  try{await labUpdateDecisionV562(decision,feedback,tags);let state=labStateV560();state.pendingRevision={decision:decision,feedback:feedback,tags:tags};MD=null;render();await labGenerateContentV560(!!state.structure)}
  catch(error){toast(error.message);if(button)button.disabled=false}
}

function labOpenVersionV562(id){
  let row=(D.contentLabVersions||[]).find(function(item){return item.id===id});if(!row)return;let state=labStateV560(),output=JSON.parse(JSON.stringify(row.output||{}));if(row.content_id)output.savedId=row.content_id;
  state.result=output;state.topic=row.topic||row.title||'';state.format=labUiFormatV562(row.format);state.style=row.style||state.style;state.objectiveType=row.objective_type||'positioning';state.cycleId=row.cycle_id;state.currentVersionId=row.id;state.versionNo=row.version_no;state.currentVersionStatus=row.status;state.stage='result';state.error='';render()
}

async function labApproveAndAdvanceV562(){
  let state=labStateV560(),result=state.result;if(!result)return;if(result.savedId){contentMode='workflow';render();return}
  state.busy='approve';state.error='';render();
  try{
    await labUpdateDecisionV562('approved','Aprovado para avançar à produção.',[]);
    let plan=await ensurePlan(contentClient,contentMonth),pillars=labPillarsV560(contentClient),pillarName=result.pilar||state.selectedPauta?.pilar||'',matched=pillars.find(function(row){return String(row.name).toLowerCase()===String(pillarName).toLowerCase()})||pillars[0],script='';
    if(state.format==='reel')script=(result.roteiro||[]).map(function(scene,index){return['Cena '+(index+1)+(scene.duracao?' · '+scene.duracao:''),scene.imagem?'Imagem: '+scene.imagem:'',scene.fala?'Fala/narração: '+scene.fala:'',scene.texto_tela?'Texto na tela: '+scene.texto_tela:''].filter(Boolean).join('\n')}).join('\n\n');else script=labSafeSlidesV560(result).map(function(row,index){return'Tela '+(index+1)+' — '+row.rotulo+'\n'+row.texto_curto}).join('\n\n');
    let direction=result.direcao?'\n\nDIREÇÃO DE PRODUÇÃO\nExecução: '+(result.direcao.execucao||'')+'\nÁudio: '+(result.direcao.audio||'')+'\nEdição: '+(result.direcao.edicao||''):'',cover=result.capa?'\n\nCAPA\n'+(result.capa.titulo||'')+(result.capa.apoio?'\n'+result.capa.apoio:'')+(result.capa.direcao_visual?'\nDireção visual: '+result.capa.direcao_visual:''):'',selected=contentReferencesV561(contentClient).filter(function(row){return(state.selectedReferenceIds||[]).includes(row.id)}),referenceLinks=selected.map(function(row){return row.canva_edit_url||row.source_url}).filter(Boolean).slice(0,12);
    let rows=await api('/rest/v1/contents',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({organization_id:M.organization_id,client_id:contentClient,title:result.titulo||state.topic,format:labFormatDbV560(state.format),objective:result.objetivo||labObjectiveLabelV562(state.objectiveType),central_idea:result.angulo||state.topic||null,script:(script+cover+direction).trim()||null,caption:result.legenda||null,cta:result.cta||state.structure?.cta||null,editorial_pillar_id:matched?.id||null,monthly_plan_id:plan?.id||null,status:'production',reference_links:referenceLinks,created_by:S.user?.id,internal_notes:'Aprovado no Laboratório · v'+state.versionNo+' · '+labObjectiveLabelV562(state.objectiveType)+' · '+labStyleLabelV560(state.style)})});
    let content=rows?.[0];if(!content?.id)throw Error('O conteúdo foi aprovado, mas não retornou para o fluxo.');result.savedId=content.id;
    await patch('content_lab_versions',state.currentVersionId,{content_id:content.id});
    try{await api('/rest/v1/content_team_workflow',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:contentClient,content_id:content.id,internal_status:'design',internal_notes:'Texto aprovado no Laboratório. Próxima etapa: aplicar o template e desenvolver o design.',created_by:S.user?.id})})}catch(error){console.warn('Workflow do Laboratório',error)}
    await load();contentMode='workflow';render();toast('Aprovado e enviado para produção ✦')
  }catch(error){state.error=error.message;state.busy='';state.stage='result';render()}
}

contentReferenceModalV561=function(id){
  let reference=(D.contentReferences||[]).find(function(row){return row.id===id})||{},client=cl(contentClient)||{},isTemplate=!!reference.is_template||reference.reference_type==='template',tags=Array.isArray(reference.style_tags)?reference.style_tags.join(', '):'';
  let types=['content','design','cover','reel','caption','copy','competitor','template','other'].map(function(value){return '<option value="'+value+'" '+(reference.reference_type===value?'selected':'')+'>'+E(referenceTypeV561(value))+'</option>'}).join('');
  let formats=[['universal','Vários formatos'],['carousel','Carrossel'],['static_post','Estático'],['story','Stories'],['reel','Reels']].map(function(option){return '<option value="'+option[0]+'" '+((reference.template_format||'universal')===option[0]?'selected':'')+'>'+option[1]+'</option>'}).join('');
  return '<div class="modalbg"><div class="modal wide v561-reference-modal v562-template-modal"><div class="head"><div><small class="ey">REPERTÓRIO CRIATIVO · '+E(client.name||'CLIENTE')+'</small><h2>'+(reference.id?'Editar referência ou template':'Adicionar referência ou pack')+'</h2></div><button class="btn ghost small" data-close>✕</button></div><form id="contentReferenceFormV561" data-id="'+E(reference.id||'')+'"><div class="formgrid"><div class="field"><label>Tipo</label><select name="reference_type">'+types+'</select></div><div class="field"><label>Nome</label><input name="title" required value="'+E(reference.title||'')+'" placeholder="Ex.: Pack editorial clean"></div></div><label class="v562-template-switch"><input type="checkbox" name="is_template" '+(isTemplate?'checked':'')+'> É um template ou pack editável do Canva</label><div class="formgrid"><div class="field"><label>Link da referência original</label><input name="source_url" type="url" value="'+E(reference.source_url||'')+'" placeholder="https://instagram.com/..."></div><div class="field"><label>Link editável do Canva</label><input name="canva_edit_url" type="url" value="'+E(reference.canva_edit_url||'')+'" placeholder="https://www.canva.com/design/..."></div></div><div class="formgrid"><div class="field"><label>Formato do template</label><select name="template_format">'+formats+'</select></div><div class="field"><label>Número de páginas</label><input name="page_count" type="number" min="1" max="100" value="'+E(reference.page_count||'')+'" placeholder="Ex.: 7"></div></div><div class="field"><label>Tags de estilo</label><input name="style_tags" value="'+E(tags)+'" placeholder="Ex.: editorial, minimalista, fotografia, elegante"></div><div class="field"><label>O que existe nessa referência?</label><textarea name="notes" rows="3">'+E(reference.notes||'')+'</textarea></div><div class="field"><label>O que queremos aproveitar?</label><textarea name="takeaway" rows="3" placeholder="Ritmo, gancho, composição, hierarquia, distribuição das telas...">'+E(reference.takeaway||'')+'</textarea></div><div class="field"><label>O que não devemos copiar?</label><textarea name="avoid_copying" rows="2">'+E(reference.avoid_copying||'')+'</textarea></div><div class="actions">'+(reference.id?'<button type="button" class="btn danger" data-lab-ref-delete="'+reference.id+'">Excluir</button>':'')+'<button class="btn pri">Salvar no repertório</button></div></form></div></div>'
};
saveContentReferenceV561=async function(event){
  event.preventDefault();let form=event.currentTarget,data=new FormData(form),id=form.dataset.id,isTemplate=data.get('is_template')==='on'||data.get('reference_type')==='template',page=Number(data.get('page_count')||0),payload={reference_type:isTemplate?'template':String(data.get('reference_type')||'content'),title:String(data.get('title')||'').trim(),source_url:String(data.get('source_url')||'').trim()||null,canva_edit_url:String(data.get('canva_edit_url')||'').trim()||null,is_template:isTemplate,template_format:isTemplate?String(data.get('template_format')||'universal'):null,page_count:isTemplate&&page?page:null,style_tags:String(data.get('style_tags')||'').split(',').map(function(value){return value.trim()}).filter(Boolean),notes:String(data.get('notes')||'').trim()||null,takeaway:String(data.get('takeaway')||'').trim()||null,avoid_copying:String(data.get('avoid_copying')||'').trim()||null,updated_at:new Date().toISOString()};if(!payload.title)return;
  try{if(id)await patch('client_content_references',id,payload);else await api('/rest/v1/client_content_references',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(Object.assign({},payload,{organization_id:M.organization_id,client_id:contentClient,created_by:S.user.id}))});await load();MD=null;render();toast(isTemplate?'Template Canva salvo ✦':'Referência salva no repertório ✦')}catch(error){toast(error.message)}
};

const _bindV562Base=bind;
bind=function(){
  _bindV562Base();
  document.querySelectorAll('[data-lab-objective]').forEach(function(button){button.onclick=function(){let state=labStateV560();labCaptureTopicV560();state.objectiveType=button.dataset.labObjective;render()}});
  document.querySelectorAll('[data-lab-ref-select]').forEach(function(button){button.onclick=function(){let state=labStateV560(),id=button.dataset.labRefSelect,row=contentReferencesV561(contentClient).find(function(item){return item.id===id}),index=state.selectedReferenceIds.indexOf(id);labCaptureTopicV560();if(index>=0){state.selectedReferenceIds.splice(index,1);if(state.templateId===id)state.templateId=null}else{state.selectedReferenceIds.push(id);if(row?.is_template||row?.reference_type==='template')state.templateId=id}render()}});
  document.querySelector('[data-lab-variation]')?.addEventListener('click',function(){let state=labStateV560();state.requestVariation=true;labGenerateContentV560(!!state.structure)});
  document.querySelector('[data-lab-request-changes]')?.addEventListener('click',function(){MD={type:'labFeedbackV562',decision:'changes_requested'};render()});
  document.querySelector('[data-lab-reject]')?.addEventListener('click',function(){MD={type:'labFeedbackV562',decision:'rejected'};render()});
  document.querySelector('[data-lab-approve-result]')?.addEventListener('click',labApproveAndAdvanceV562);
  document.querySelector('[data-lab-open-workflow]')?.addEventListener('click',function(){contentMode='workflow';render()});
  document.querySelectorAll('[data-lab-version]').forEach(function(button){button.onclick=function(){labOpenVersionV562(button.dataset.labVersion)}});
  document.getElementById('labFeedbackFormV562')?.addEventListener('submit',applyLabFeedbackV562)
};

const v562Style=document.createElement('style');v562Style.textContent=[
'.v562-objective-row{grid-template-columns:repeat(3,1fr)!important}.v562-reference-list article{grid-template-columns:auto minmax(0,1fr) auto auto}.v562-reference-list article.is-selected{border-color:#ff6a00;background:#1d130e}.v562-reference-list article.is-template>span{background:#35210f;color:#ffad6f}.v562-ref-toggle{display:grid!important;place-items:center;width:24px!important;height:24px;border:1px solid #3a3a3a!important;border-radius:8px!important;background:#181818!important;color:#aaa!important;text-align:center!important}.v562-reference-list article.is-selected .v562-ref-toggle{border-color:#ff6a00!important;background:#ff6a00!important;color:#fff!important}.v562-version-state{display:flex;align-items:flex-end;flex-direction:column;gap:7px}.v562-decision{padding:6px 9px!important;border-radius:99px!important;font-size:7px!important;font-weight:950!important;text-transform:uppercase}.v562-decision.approved{background:#153521!important;color:#79da9a!important}.v562-decision.rejected{background:#3b1717!important;color:#ff8d8d!important}.v562-decision.changes{background:#3d2e10!important;color:#ffd37c!important}.v562-decision.draft{background:#242424!important;color:#aaa!important}.v562-review-note{display:flex;align-items:center;gap:16px;margin-top:14px;padding:13px 15px;border:1px solid #4b321f;border-radius:12px;background:#1c130d}.v562-review-note b{color:#ff8c48;font-size:9px;white-space:nowrap}.v562-review-note span{color:#9c8a80;font-size:8px;line-height:1.45}.v562-reject{border-color:#6c2b2b!important;color:#ff9292!important}.v562-history-grid{display:grid;gap:6px}.v562-history-grid>button{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:10px 12px;border:1px solid #2d2d2d;border-radius:11px;background:#111;color:#fff;text-align:left}.v562-history-grid span,.v562-history-grid small{display:block}.v562-history-grid span{font-size:9px;font-weight:850}.v562-history-grid small{margin-top:4px;color:#777;font-size:7px}.v562-history-grid em{padding:5px 7px;border-radius:99px;font-size:6px;font-style:normal;font-weight:950;text-transform:uppercase}.v562-history-grid em.approved{background:#153521;color:#79da9a}.v562-history-grid em.rejected{background:#3b1717;color:#ff8d8d}.v562-history-grid em.changes{background:#3d2e10;color:#ffd37c}.v562-history-grid em.draft{background:#242424;color:#aaa}.v562-feedback-modal h2{margin:6px 0}.v562-feedback-modal .head{align-items:flex-start}.v562-feedback-modal .head p{max-width:520px;margin:4px 0 0}.v562-feedback-tags{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}.v562-feedback-tags label{padding:8px 10px;border:1px solid #333;border-radius:9px;background:#111;color:#aaa;font-size:8px}.v562-feedback-tags input{accent-color:#ff6a00}.v562-template-switch{display:flex;align-items:center;gap:8px;margin:10px 0 14px;padding:11px;border:1px solid #4a321f;border-radius:11px;background:#1b130e;color:#ff9a5d;font-size:9px;font-weight:850}.v562-template-switch input{accent-color:#ff6a00}.v562-template-modal h2{margin:6px 0}',
'@media(max-width:760px){.v562-objective-row{grid-template-columns:1fr 1fr!important}.v562-review-note{align-items:flex-start;flex-direction:column;gap:5px}.v562-reference-list article{grid-template-columns:auto minmax(0,1fr) auto}.v562-reference-list article>span{display:none}.v562-version-state{align-items:flex-start}.v562-result .v560-result-head{align-items:flex-start;flex-direction:column}.v562-history-grid>button{align-items:flex-start}.v562-template-modal .formgrid{grid-template-columns:1fr}}'
].join('');
document.head.appendChild(v562Style);
// ===== FIM COLAB V5.62 =====

// ===== COLAB V5.63 — LOGO INTEGRAL E ABAS REAIS NA CLIENTE =====
const clientHubTabsV563={};
const clientHubTabDefsV563=[
  ['services','Serviços'],
  ['contact','Dados'],
  ['ideas','Ideias'],
  ['agenda','Agenda'],
  ['tasks','Demandas'],
  ['forms','Briefings & onboarding'],
  ['finance','Contrato & pagamentos'],
  ['files','Drive & arquivos'],
  ['history','Histórico']
];

const _clientHubPageV563Base=clientHubPageV5;
clientHubPageV5=function(clientId){
  let html=_clientHubPageV563Base(clientId);
  let allowed=clientHubTabDefsV563.map(function(item){return item[0]});
  let active=clientHubTabsV563[clientId]||'services';
  if(!allowed.includes(active))active='services';

  html=html
    .replace('<section class="panel"><div class="head"><div><small class="ey">CONTATOS</small>','<section class="panel" id="contact"><div class="head"><div><small class="ey">CONTATOS</small>')
    .replace('<section class="panel"><div class="head"><div><small class="ey">DEMANDAS</small>','<section class="panel" id="tasks"><div class="head"><div><small class="ey">DEMANDAS</small>')
    .replace('<section class="panel"><div class="head"><div><small class="ey">HISTÓRICO</small>','<section class="panel" id="history"><div class="head"><div><small class="ey">HISTÓRICO</small>');

  let tabs='<div class="v5-client-tabs v563-client-tabs" role="tablist" aria-label="Áreas da cliente">'+clientHubTabDefsV563.map(function(item){
    let selected=item[0]===active;
    return '<button type="button" role="tab" class="'+(selected?'on':'')+'" aria-selected="'+selected+'" data-client-tab="'+item[0]+'">'+item[1]+'</button>'
  }).join('')+'</div><div class="v5-hub-grid v563-client-panes">';

  html=html.replace(/<div class="v5-client-tabs">[\s\S]*?<\/div>\s*<div class="v5-hub-grid">/,tabs);
  html=html.replace(/data-client-scroll="([^"]+)"/g,'data-client-tab="$1"');
  let panePattern=new RegExp('(<section class="[^"]*" id="'+active+'")');
  html=html.replace(panePattern,'$1 data-v563-active');
  return html
};

const _bindV563Base=bind;
bind=function(){
  _bindV563Base();
  document.querySelectorAll('[data-client-tab]').forEach(function(button){
    button.onclick=function(){
      if(!clientHubIdV5)return;
      clientHubTabsV563[clientHubIdV5]=button.dataset.clientTab;
      render();
      requestAnimationFrame(function(){
        let tabs=document.querySelector('.v563-client-tabs');
        let selected=tabs?.querySelector('button.on');
        tabs?.scrollIntoView({behavior:'smooth',block:'start'});
        selected?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})
      })
    }
  })
};

const v563Style=document.createElement('style');v563Style.textContent=[
'.v555-official-brand{overflow:visible!important}.v555-official-brand img{display:block!important;width:126px!important;height:78px!important;object-fit:contain!important;object-position:center!important;border-radius:0!important;transform:none!important}.side .v555-official-brand{padding:0 10px 18px!important}.side .v555-official-brand img{width:118px!important;height:72px!important}.v555-header-mark{display:block!important;flex:0 0 48px!important;width:48px!important;height:42px!important;overflow:visible!important;border-radius:0!important;background:transparent!important}.v555-header-mark img{display:block!important;width:48px!important;height:42px!important;object-fit:contain!important;object-position:center!important;transform:none!important}.v555-with-mark{gap:10px!important}.v563-client-tabs{position:sticky;top:0;z-index:6;display:flex;gap:8px;margin:14px 0;padding:10px 0;overflow-x:auto;scrollbar-width:none;background:linear-gradient(90deg,var(--bg) 92%,transparent)}.v563-client-tabs::-webkit-scrollbar{display:none}.v563-client-tabs button{flex:0 0 auto;min-height:43px;padding:10px 15px;border:1px solid #353535;border-radius:12px;background:#111;color:#999;font-size:11px;font-weight:850;white-space:nowrap}.v563-client-tabs button.on{border-color:#ff6a00;background:#ff6a00;color:#fff;box-shadow:0 8px 24px rgba(255,106,0,.2)}.v563-client-panes>section{display:none!important}.v563-client-panes>section[data-v563-active]{display:block!important;grid-column:1/-1;animation:v563PaneIn .18s ease-out}.v563-client-panes>section[data-v563-active].v5-hub-wide{grid-column:1/-1}@keyframes v563PaneIn{from{opacity:.25;transform:translateY(4px)}to{opacity:1;transform:none}}',
'@media(max-width:760px){.v555-header-mark{flex-basis:42px!important;width:42px!important;height:38px!important}.v555-header-mark img{width:42px!important;height:38px!important}.v555-with-mark{gap:7px!important}.v563-client-tabs{margin:10px -13px 14px;padding:9px 13px;scroll-padding-inline:13px}.v563-client-tabs button{min-height:42px;padding:9px 14px;font-size:10px}.v563-client-panes{display:block!important}.v563-client-panes>section[data-v563-active]{width:100%;margin:0}.v563-client-panes .panel{padding:16px}.v563-client-panes .head{align-items:flex-start}.v563-client-panes .v5-contact-list>div{gap:8px}}'
].join('');
document.head.appendChild(v563Style);
// ===== FIM COLAB V5.63 =====

// ===== COLAB V5.64 — LABORATÓRIO COMO NÚCLEO DA CLIENTE =====
if(!clientHubTabDefsV563.some(function(item){return item[0]==='strategy'})){
  clientHubTabDefsV563.splice(1,0,['strategy','Estratégia'],['lab','Laboratório'])
}

function clientLabCyclesV564(cid){
  let rows=labVersionsV562(cid).slice().sort(function(a,b){return String(b.created_at||'').localeCompare(String(a.created_at||''))}),seen=new Set();
  return rows.filter(function(row){let key=row.cycle_id||row.id;if(seen.has(key))return false;seen.add(key);return true})
}
function clientLabMetricsV564(cid){
  let cycles=clientLabCyclesV564(cid),versions=labVersionsV562(cid),dna=contentDnaV561(cid),refs=contentReferencesV561(cid),ideas=(D.refs||D.insights||[]).filter(function(row){return row.client_id===cid&&row.status!=='archived'&&!row.converted_content_id}),contents=(D.contents||[]).filter(function(row){return row.client_id===cid});
  return{
    dna:contentDnaScoreV561(dna),
    ideas:ideas.length,
    cycles:cycles.length,
    review:cycles.filter(function(row){return row.status==='draft'||row.status==='changes_requested'}).length,
    approved:cycles.filter(function(row){return row.status==='approved'}).length,
    production:contents.filter(function(row){return ['production','editing','approval'].includes(row.status)}).length,
    templates:refs.filter(function(row){return row.is_template||row.reference_type==='template'}).length,
    references:refs.length,
    learnings:versions.filter(function(row){return String(row.decision_notes||'').trim()}).length
  }
}
function clientLabSpotlightV564(cid){
  let metrics=clientLabMetricsV564(cid),client=cl(cid)||{};
  return '<section class="v564-lab-spotlight"><div class="v564-lab-intro"><span>✦</span><div><small>NÚCLEO CRIATIVO DA CLIENTE</small><h3>Laboratório de Conteúdo</h3><p>A estratégia, as referências e os aprendizados de '+E(client.name||'cada cliente')+' entram em toda nova criação.</p></div></div><div class="v564-lab-glance"><span><b>'+metrics.dna+'%</b> DNA</span><span><b>'+metrics.review+'</b> em revisão</span><span><b>'+metrics.approved+'</b> aprovados</span></div><div class="v564-lab-actions"><button class="btn ghost" data-client-strategy-open-v564="'+E(cid)+'">Ver estratégia</button><button class="btn pri" data-client-lab-v564="'+E(cid)+'">Abrir Laboratório →</button></div></section>'
}
function clientStrategyPaneV564(cid){
  let client=cl(cid)||{},plan=labPlanV560(cid),pillars=labPillarsV560(cid),dna=contentDnaV561(cid),refs=contentReferencesV561(cid),metrics=clientLabMetricsV564(cid),templates=refs.filter(function(row){return row.is_template||row.reference_type==='template'}),colors=[dna?.primary_color,dna?.secondary_color,dna?.accent_color].filter(Boolean);
  let positioning=dna?.positioning||plan?.main_goal||client.objective||'A direção estratégica ainda precisa ser estruturada.';
  let persona=dna?.persona_summary||dna?.audience_context||'A persona ainda não foi detalhada no DNA de conteúdo.';
  let voice=dna?.tone_of_voice||'O tom de voz ainda não foi definido.';
  let rules=dna?.content_rules||dna?.content_promise||'O padrão de conteúdo ainda não foi registrado.';
  return '<section class="panel v5-hub-wide v564-strategy-pane" id="strategy"><div class="head"><div><small class="ey">ESTRATÉGIA & DNA</small><h3>A direção que orienta todo conteúdo</h3></div><div class="actions"><button class="btn ghost small" data-client-dna-v564="'+E(cid)+'">'+(dna?'Editar DNA':'Construir DNA')+'</button><button class="btn pri small" data-client-strategy-open-v564="'+E(cid)+'">Abrir estratégia completa</button></div></div><div class="v564-strategy-score"><div><span>'+metrics.dna+'%</span><small>DNA estruturado</small></div><i><b style="width:'+metrics.dna+'%"></b></i><p>'+E(positioning)+'</p></div><div class="v564-strategy-kpis"><article><b>'+pillars.length+'</b><span>pilares editoriais</span></article><article><b>'+metrics.references+'</b><span>referências salvas</span></article><article><b>'+metrics.templates+'</b><span>packs do Canva</span></article><article><b>'+metrics.learnings+'</b><span>aprendizados registrados</span></article></div><div class="v564-strategy-grid"><article><small>PERSONA</small><p>'+E(persona)+'</p></article><article><small>TOM DE VOZ</small><p>'+E(voice)+'</p></article><article><small>PADRÃO DE CONTEÚDO</small><p>'+E(rules)+'</p></article><article><small>IDENTIDADE VISUAL</small><div class="v564-color-line">'+(colors.map(function(color){return '<i style="background:'+E(color)+'"></i>'}).join('')||'<span>Cores ainda não cadastradas</span>')+'</div><p>'+E(dna?.visual_direction||'A direção visual será construída a partir do DNA e dos templates selecionados.')+'</p></article></div><section class="v564-pillar-panel"><div class="head"><div><small class="ey">LINHAS EDITORIAIS</small><h3>O papel de cada conteúdo</h3></div><button class="btn ghost small" data-client-ref-new-v564="'+E(cid)+'">＋ Referência ou pack</button></div><div class="v564-pillar-list">'+(pillars.map(function(row){return '<article><b>'+E(row.name)+'</b><p>'+E(row.objective||row.description||'Direção editorial da marca.')+'</p></article>'}).join('')||'<div class="v5-empty-soft">Cadastre os pilares na estratégia completa.</div>')+'</div>'+(templates.length?'<div class="v564-template-note"><b>'+templates.length+' pack'+(templates.length===1?'':'s')+' do Canva conectado'+(templates.length===1?'':'s')+'</b><span>O Laboratório pode usar esses modelos para distribuir o texto conforme as páginas do pack.</span></div>':'')+'</section></section>'
}
function clientLabPaneV564(cid){
  let metrics=clientLabMetricsV564(cid),cycles=clientLabCyclesV564(cid).slice(0,7),versions=labVersionsV562(cid),learnings=versions.filter(function(row){return String(row.decision_notes||'').trim()}).slice(0,4);
  return '<section class="panel v5-hub-wide v564-lab-pane" id="lab"><div class="v564-lab-pane-head"><div><small class="ey">LABORATÓRIO DE CONTEÚDO</small><h2>Ideia, construção, revisão e aprendizado.</h2><p>Cada aprovação ou reprovação melhora o padrão criativo desta cliente.</p></div><div class="actions"><button class="btn ghost" data-client-lab-new-v564="'+E(cid)+'">＋ Novo ciclo</button><button class="btn pri" data-client-lab-v564="'+E(cid)+'">Entrar no Laboratório →</button></div></div><div class="v564-lab-kpis"><article><span>IDEIAS</span><b>'+metrics.ideas+'</b><small>pontos de partida</small></article><article><span>EM REVISÃO</span><b>'+metrics.review+'</b><small>ciclos abertos</small></article><article><span>APROVADOS</span><b>'+metrics.approved+'</b><small>direções validadas</small></article><article><span>EM PRODUÇÃO</span><b>'+metrics.production+'</b><small>conteúdos no fluxo</small></article></div><div class="v564-lab-dashboard"><section><div class="head"><div><small class="ey">CICLOS CRIATIVOS</small><h3>Versões recentes</h3></div></div><div class="v564-cycle-list">'+(cycles.map(function(row){return '<button data-client-lab-version-v564="'+E(row.id)+'" data-client="'+E(cid)+'"><div><b>'+E(row.title||row.topic||'Conteúdo')+'</b><small>v'+E(String(row.version_no||1))+' · '+E(labObjectiveLabelV562(row.objective_type||''))+' · '+E(labFormatLabelV560(labUiFormatV562(row.format)))+'</small></div><span class="'+labStatusClassV562(row.status)+'">'+E(labStatusLabelV562(row.status))+'</span></button>'}).join('')||'<div class="v5-empty-soft">Nenhum ciclo criado. Comece por uma ideia ou pauta estratégica.</div>')+'</div></section><aside><div class="head"><div><small class="ey">MEMÓRIA CRIATIVA</small><h3>O que o Laboratório aprendeu</h3></div></div><div class="v564-learning-list">'+(learnings.map(function(row){return '<article><span>'+E(labStatusLabelV562(row.status))+'</span><p>'+E(row.decision_notes)+'</p></article>'}).join('')||'<div class="v5-empty-soft">Os motivos de aprovação, ajuste e reprovação aparecerão aqui.</div>')+'</div><div class="v564-canva-status"><b>'+metrics.templates+' packs do Canva</b><span>'+metrics.references+' referências disponíveis para inspirar novas criações.</span><button data-client-ref-new-v564="'+E(cid)+'">Adicionar referência →</button></div></aside></div></section>'
}

const _clientHubPageV564Base=clientHubPageV5;
clientHubPageV5=function(clientId){
  let html=_clientHubPageV564Base(clientId),active=clientHubTabsV563[clientId]||'services';
  html=html.replace('<div class="v5-client-tabs v563-client-tabs"',clientLabSpotlightV564(clientId)+'<div class="v5-client-tabs v563-client-tabs"');
  html=html.replace(/<\/section><\/div>$/,'</section>'+clientStrategyPaneV564(clientId)+clientLabPaneV564(clientId)+'</div>');
  if(active==='strategy'||active==='lab')html=html.replace('id="'+active+'"','id="'+active+'" data-v563-active');
  return html
};

function labProgressV564(cid){
  let state=labStateV560(),dnaScore=contentDnaScoreV561(contentDnaV561(cid)),phase=0;
  if(state.topic||state.selectedPauta||(state.selectedReferenceIds||[]).length)phase=1;
  if(['structure-loading','structure','content-loading'].includes(state.stage))phase=2;
  if(state.stage==='result')phase=3;
  if(state.result?.savedId)phase=4;
  let steps=[['01','Direção'],['02','Inspiração'],['03','Construção'],['04','Revisão'],['05','Produção']];
  return '<section class="v564-lab-progress"><div class="v564-lab-progress-head"><div><small>CICLO CRIATIVO · DNA '+dnaScore+'%</small><b>Uma decisão por vez, sem perder a estratégia.</b></div><button data-lab-new-cycle-v564="'+E(cid)+'">＋ Novo ciclo</button></div><div class="v564-lab-steps">'+steps.map(function(step,index){return '<span class="'+(index<phase?'done':index===phase?'on':'')+'"><i>'+step[0]+'</i><b>'+step[1]+'</b></span>'}).join('')+'</div></section>'
}
const _contentLabPageV564Base=contentLabPageV560;
contentLabPageV560=function(socialClients){
  let html=_contentLabPageV564Base(socialClients);
  return html.replace('<div class="v560-lab-layout">',labProgressV564(contentClient)+'<div class="v560-lab-layout">')
};

function openClientAreaV564(cid,mode){
  contentClient=cid;contentMode=mode;V='content';MD=null;render()
}
function resetClientLabV564(cid){
  delete labStatesV560[cid];openClientAreaV564(cid,'lab')
}
function activateClientTabV564(button){
  if(!clientHubIdV5)return;let tab=button.dataset.clientTab;
  if(tab==='strategy'||tab==='lab')contentClient=clientHubIdV5;
  clientHubTabsV563[clientHubIdV5]=tab;render();
  requestAnimationFrame(function(){let tabs=document.querySelector('.v563-client-tabs'),selected=tabs?.querySelector('button.on');tabs?.scrollIntoView({behavior:'smooth',block:'start'});selected?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})})
}

const _bindV564Base=bind;
bind=function(){
  _bindV564Base();
  document.querySelectorAll('[data-client-tab="strategy"],[data-client-tab="lab"]').forEach(function(button){button.onclick=function(){activateClientTabV564(button)}});
  document.querySelectorAll('[data-client-lab-v564]').forEach(function(button){button.onclick=function(){openClientAreaV564(button.dataset.clientLabV564,'lab')}});
  document.querySelectorAll('[data-client-strategy-open-v564]').forEach(function(button){button.onclick=function(){openClientAreaV564(button.dataset.clientStrategyOpenV564,'strategy')}});
  document.querySelectorAll('[data-client-dna-v564]').forEach(function(button){button.onclick=function(){contentClient=button.dataset.clientDnaV564;MD={type:'contentDnaV561'};render()}});
  document.querySelectorAll('[data-client-ref-new-v564]').forEach(function(button){button.onclick=function(){contentClient=button.dataset.clientRefNewV564;MD={type:'contentReferenceV561',id:null};render()}});
  document.querySelectorAll('[data-client-lab-new-v564]').forEach(function(button){button.onclick=function(){resetClientLabV564(button.dataset.clientLabNewV564)}});
  document.querySelectorAll('[data-lab-new-cycle-v564]').forEach(function(button){button.onclick=function(){resetClientLabV564(button.dataset.labNewCycleV564)}});
  document.querySelectorAll('[data-client-lab-version-v564]').forEach(function(button){button.onclick=function(){contentClient=button.dataset.client;contentMode='lab';V='content';MD=null;labOpenVersionV562(button.dataset.clientLabVersionV564)}});
};

const v564Style=document.createElement('style');v564Style.textContent=[
'.v564-lab-spotlight{display:grid;grid-template-columns:minmax(0,1.3fr) auto auto;gap:18px;align-items:center;margin:14px 0;padding:19px 21px;border:1px solid #683416;border-radius:20px;background:radial-gradient(circle at 75% 0,rgba(255,106,0,.26),transparent 34%),linear-gradient(145deg,#23140c,#111 65%)}.v564-lab-intro{display:flex;align-items:center;gap:14px}.v564-lab-intro>span{display:grid;place-items:center;width:48px;height:48px;border:1px solid #6c3518;border-radius:15px;background:#2b160a;color:#ff7b32;font-size:21px}.v564-lab-intro small{color:#ff7b32;font-size:7px;font-weight:950;letter-spacing:.14em}.v564-lab-intro h3{margin:5px 0 4px;font-size:20px}.v564-lab-intro p{margin:0;color:#8a8a8a;font-size:9px;line-height:1.4}.v564-lab-glance{display:flex;gap:8px}.v564-lab-glance span{min-width:74px;padding:9px;border-left:1px solid #5b321c;color:#777;font-size:7px;text-transform:uppercase}.v564-lab-glance b{display:block;margin-bottom:3px;color:#fff;font-size:18px}.v564-lab-actions{display:flex;gap:7px}.v564-strategy-pane,.v564-lab-pane{padding:24px!important}.v564-strategy-pane>.head{margin-bottom:16px}.v564-strategy-score{display:grid;grid-template-columns:auto minmax(150px,.5fr) minmax(0,1.5fr);gap:14px;align-items:center;padding:17px;border:1px solid #50301e;border-radius:17px;background:#1c120d}.v564-strategy-score>div span,.v564-strategy-score>div small{display:block}.v564-strategy-score>div span{color:#ff7b32;font-size:28px;font-weight:950}.v564-strategy-score>div small{color:#777;font-size:7px;text-transform:uppercase}.v564-strategy-score>i{height:6px;overflow:hidden;border-radius:99px;background:#36251d}.v564-strategy-score>i b{display:block;height:100%;background:#ff6a00}.v564-strategy-score>p{margin:0;color:#aaa;font-size:10px;line-height:1.5}.v564-strategy-kpis,.v564-lab-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.v564-strategy-kpis article,.v564-lab-kpis article{padding:16px;border:1px solid #2d2d2d;border-radius:15px;background:#111}.v564-strategy-kpis b,.v564-lab-kpis b{display:block;font-size:24px}.v564-strategy-kpis span,.v564-lab-kpis span,.v564-lab-kpis small{display:block;margin-top:5px;color:#777;font-size:7px;text-transform:uppercase}.v564-strategy-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.v564-strategy-grid>article{min-height:145px;padding:17px;border:1px solid #2d2d2d;border-radius:15px;background:#111}.v564-strategy-grid small{color:#ff7b32;font-size:7px;font-weight:950;letter-spacing:.12em}.v564-strategy-grid p{color:#999;font-size:9px;line-height:1.55}.v564-color-line{display:flex;gap:7px;margin-top:12px}.v564-color-line i{width:28px;height:28px;border:1px solid #444;border-radius:50%}.v564-color-line span{color:#777;font-size:8px}.v564-pillar-panel{margin-top:12px;padding:19px;border:1px solid #2d2d2d;border-radius:17px;background:#101010}.v564-pillar-list{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:13px}.v564-pillar-list article{padding:14px;border:1px solid #2d2d2d;border-radius:13px;background:#151515}.v564-pillar-list b{font-size:11px}.v564-pillar-list p{margin:7px 0 0;color:#777;font-size:8px;line-height:1.45}.v564-template-note{display:flex;align-items:center;gap:13px;margin-top:12px;padding:12px;border:1px solid #4b311f;border-radius:12px;background:#1b130e}.v564-template-note b{color:#ff8a48;font-size:9px}.v564-template-note span{color:#8f7b70;font-size:8px}.v564-lab-pane-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:25px;border:1px solid #5d3018;border-radius:20px;background:radial-gradient(circle at 88% 0,rgba(255,106,0,.22),transparent 35%),linear-gradient(145deg,#21140d,#111)}.v564-lab-pane-head h2{max-width:720px;margin:7px 0;font-size:31px;line-height:1.02}.v564-lab-pane-head p{margin:0;color:#888}.v564-lab-dashboard{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(260px,.75fr);gap:10px}.v564-lab-dashboard>section,.v564-lab-dashboard>aside{padding:18px;border:1px solid #2d2d2d;border-radius:17px;background:#111}.v564-cycle-list,.v564-learning-list{display:grid;gap:7px;margin-top:13px}.v564-cycle-list>button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:12px;border:1px solid #2d2d2d;border-radius:12px;background:#151515;color:#fff;text-align:left}.v564-cycle-list b,.v564-cycle-list small{display:block}.v564-cycle-list b{font-size:10px}.v564-cycle-list small{margin-top:4px;color:#777;font-size:7px}.v564-cycle-list span{padding:5px 7px;border-radius:99px;background:#242424;color:#aaa;font-size:6px;font-weight:950;text-transform:uppercase}.v564-cycle-list span.approved{background:#153521;color:#79da9a}.v564-cycle-list span.rejected{background:#3b1717;color:#ff8d8d}.v564-cycle-list span.changes{background:#3d2e10;color:#ffd37c}.v564-learning-list article{padding:11px;border-left:2px solid #ff6a00;background:#17120f}.v564-learning-list span{color:#ff8841;font-size:6px;font-weight:950;text-transform:uppercase}.v564-learning-list p{margin:5px 0 0;color:#aaa;font-size:8px;line-height:1.45}.v564-canva-status{display:grid;gap:5px;margin-top:12px;padding:13px;border:1px solid #49301f;border-radius:12px;background:#1b130e}.v564-canva-status b{color:#ff8a48;font-size:10px}.v564-canva-status span{color:#88766b;font-size:8px}.v564-canva-status button{justify-self:start;margin-top:5px;border:0;background:transparent;color:#ff8a48;font-size:8px;font-weight:900}.v564-lab-progress{margin-bottom:13px;padding:15px 18px;border:1px solid #34271f;border-radius:17px;background:#12100f}.v564-lab-progress-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.v564-lab-progress-head small,.v564-lab-progress-head b{display:block}.v564-lab-progress-head small{color:#ff7b32;font-size:7px;font-weight:950;letter-spacing:.12em}.v564-lab-progress-head b{margin-top:4px;font-size:11px}.v564-lab-progress-head button{border:0;background:transparent;color:#ff8240;font-size:8px;font-weight:950}.v564-lab-steps{display:grid;grid-template-columns:repeat(5,1fr);margin-top:15px;border-top:1px solid #333}.v564-lab-steps span{position:relative;display:flex;align-items:center;gap:7px;padding:13px 5px 0;color:#555}.v564-lab-steps span:before{content:"";position:absolute;top:-4px;left:6px;width:7px;height:7px;border-radius:50%;background:#444}.v564-lab-steps i{font-size:7px;font-style:normal}.v564-lab-steps b{font-size:8px}.v564-lab-steps span.on{color:#ff8848}.v564-lab-steps span.on:before{background:#ff6a00;box-shadow:0 0 0 4px rgba(255,106,0,.14)}.v564-lab-steps span.done{color:#8aae91}.v564-lab-steps span.done:before{background:#62c878}',
'@media(max-width:1050px){.v564-lab-spotlight{grid-template-columns:1fr auto}.v564-lab-glance{grid-column:1/-1}.v564-lab-dashboard{grid-template-columns:1fr}.v564-pillar-list{grid-template-columns:1fr 1fr}}',
'@media(max-width:760px){.v564-lab-spotlight{grid-template-columns:1fr;margin:11px 0;padding:16px}.v564-lab-intro{align-items:flex-start}.v564-lab-intro>span{width:42px;height:42px}.v564-lab-glance{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}.v564-lab-glance span{min-width:0;padding:8px}.v564-lab-actions{display:grid;grid-template-columns:1fr 1fr}.v564-lab-actions .btn{width:100%;padding:10px 7px;font-size:9px}.v564-strategy-pane,.v564-lab-pane{padding:16px!important}.v564-strategy-pane>.head,.v564-lab-pane-head{align-items:flex-start;flex-direction:column}.v564-strategy-pane>.head .actions,.v564-lab-pane-head .actions{display:grid;grid-template-columns:1fr 1fr;width:100%}.v564-strategy-pane>.head .btn,.v564-lab-pane-head .btn{width:100%;padding:9px 6px;font-size:8px}.v564-strategy-score{grid-template-columns:1fr}.v564-strategy-kpis,.v564-lab-kpis{grid-template-columns:1fr 1fr}.v564-strategy-grid,.v564-pillar-list{grid-template-columns:1fr}.v564-strategy-grid>article{min-height:0}.v564-lab-pane-head{padding:20px 17px}.v564-lab-pane-head h2{font-size:27px}.v564-cycle-list>button{align-items:flex-start}.v564-template-note{align-items:flex-start;flex-direction:column}.v564-lab-progress{padding:13px}.v564-lab-progress-head{align-items:flex-start}.v564-lab-steps{overflow-x:auto;grid-template-columns:repeat(5,minmax(85px,1fr))}}'
].join('');
document.head.appendChild(v564Style);
// ===== FIM COLAB V5.64 =====

// ===== COLAB V5.65 — AÇÕES ESSENCIAIS E LABORATÓRIO LEGÍVEL =====
const _clientHubPageV565Base=clientHubPageV5;
clientHubPageV5=function(clientId){
  let html=_clientHubPageV565Base(clientId),client=cl(clientId),services=(D.services||[]).filter(function(item){return item.client_id===clientId&&item.active}),hasSocial=services.some(function(item){return item.service==='social_media'}),onboarding=(D.onboardings||[]).find(function(item){return item.client_id===clientId});
  if(!client)return html;
  let firstAction=hasSocial&&!onboarding
    ? '<button class="btn pri" data-client-tab="forms">Briefing e onboarding</button>'
    : '<button class="btn pri" data-taskquick-client="'+E(client.id)+'">＋ Demanda</button>';
  let secondary=hasSocial&&!onboarding
    ? '<button class="btn ghost" data-taskquick-client="'+E(client.id)+'">＋ Demanda</button><button class="btn ghost" data-ideaquick-client="'+E(client.id)+'">＋ Ideia</button>'
    : '<button class="btn ghost" data-ideaquick-client="'+E(client.id)+'">＋ Ideia</button><button class="btn ghost" data-appointment-kind="meeting" data-client="'+E(client.id)+'">＋ Reunião</button>';
  html=html.replace(/<div class="v5-client-actions">[\s\S]*?<\/div><\/section>/,'<div class="v5-client-actions v565-client-actions">'+firstAction+secondary+'</div></section>');
  html=html.replace(/<div class="v564-lab-actions">[\s\S]*?<\/div><\/section>/,'<div class="v564-lab-actions v565-lab-actions"><button class="btn pri" data-client-lab-new-v564="'+E(client.id)+'">＋ Criar conteúdo</button></div></section>');
  return html
};

const v565Style=document.createElement('style');v565Style.textContent=[
'.v565-lab-actions{display:block}.v565-lab-actions .btn{min-width:150px}.v565-client-actions .btn{min-height:42px}',
'@media(max-width:760px){.v565-client-actions{display:grid!important;grid-template-columns:1fr 1fr!important;width:100%;gap:8px!important}.v565-client-actions .btn:first-child{grid-column:1/-1}.v565-client-actions .btn{min-height:50px!important;padding:12px 10px!important;font-size:13px!important}.v565-lab-actions{display:block!important}.v565-lab-actions .btn{width:100%!important;min-height:48px!important;font-size:13px!important}.v560-lab-layout{gap:16px!important}.v560-lab-console{gap:12px!important}.v560-strategy-card,.v560-control-block,.v560-lab-stage{padding:19px!important}.v560-strategy-top small,.v560-control-title small,.v560-label,.v560-topic>small,.v560-structure-grid label>small{font-size:10px!important;line-height:1.3!important}.v560-strategy-top b{margin-top:7px!important;font-size:24px!important;line-height:1.15!important}.v560-strategy-top span{font-size:13px!important;line-height:1.4!important}.v560-strategy-top button{min-height:38px!important;padding:7px 9px!important;font-size:12px!important}.v560-strategy-card>p{margin:15px 0!important;font-size:15px!important;line-height:1.55!important}.v560-pillar-chips{gap:7px!important}.v560-pillar-chips span{padding:7px 10px!important;font-size:11px!important}.v560-colors{gap:14px!important;margin-top:15px!important;padding-top:14px!important;flex-wrap:wrap}.v560-colors label,.v560-colors label span,.v561-dna-card .v560-colors>button{font-size:12px!important}.v560-colors input{width:30px!important;height:30px!important}.v560-control-block{padding:18px!important}.v560-control-title{align-items:flex-start!important;margin-bottom:13px!important}.v560-control-title b{margin-top:6px!important;font-size:18px!important;line-height:1.28!important}.v560-control-title>button{min-height:42px!important;padding:9px 11px!important;font-size:12px!important;white-space:nowrap}.v561-reference-list{gap:8px!important}.v561-reference-list>p,.v560-pauta-list>p{font-size:13px!important;line-height:1.5!important}.v561-reference-list article{gap:9px!important;padding:11px!important}.v561-reference-list article>span{padding:6px 7px!important;font-size:9px!important}.v561-reference-list article b{font-size:14px!important}.v561-reference-list article small{max-width:52vw!important;margin-top:4px!important;font-size:11px!important}.v561-reference-list article>a{font-size:18px!important}.v562-ref-toggle{width:34px!important;height:34px!important;font-size:15px!important}.v560-pauta-list{gap:8px!important;max-height:280px!important}.v560-pauta-list>button{padding:13px!important}.v560-pauta-list span{font-size:14px!important;line-height:1.42!important}.v560-pauta-list small{margin-top:6px!important;font-size:10px!important}.v560-label{margin:17px 0 8px!important}.v560-choice-row,.v560-tone-row{gap:7px!important}.v560-choice-row button,.v560-tone-row button{min-height:45px!important;padding:11px 8px!important;font-size:12px!important;line-height:1.25!important}.v560-topic{margin-top:17px!important}.v560-topic textarea,.v560-structure textarea{margin-top:8px!important;padding:13px!important;font-size:15px!important;line-height:1.5!important}.v560-create{min-height:54px!important;margin-top:18px!important;padding:14px!important;font-size:14px!important}.v560-error{padding:11px!important;font-size:12px!important}.v564-lab-progress{padding:17px!important}.v564-lab-progress-head{gap:14px!important}.v564-lab-progress-head small{font-size:10px!important}.v564-lab-progress-head b{margin-top:6px!important;font-size:15px!important;line-height:1.35!important}.v564-lab-progress-head button{min-height:38px!important;font-size:12px!important;white-space:nowrap}.v564-lab-steps{grid-template-columns:repeat(5,minmax(108px,1fr))!important;margin-top:18px!important}.v564-lab-steps span{gap:8px!important;padding-top:15px!important}.v564-lab-steps i{font-size:10px!important}.v564-lab-steps b{font-size:11px!important}.v560-lab-stage{min-height:560px!important}.v560-lab-empty{min-height:430px!important}.v560-lab-empty h2{font-size:30px!important}.v560-lab-empty p,.v560-lab-loading p{font-size:14px!important;line-height:1.55!important}.v560-result-head>span{font-size:11px!important}.v560-result-head h2{font-size:28px!important}.v561-result .v560-result-head>div>p{font-size:14px!important;line-height:1.55!important}.v561-scenes{padding:16px!important}.v561-scenes>article small{font-size:10px!important}.v561-scenes>article p,.v561-deliverables p,.v561-copy-grid p{font-size:13px!important;line-height:1.55!important}.v560-slides article p{font-size:14px!important}.v560-slides article em,.v560-slides article>small,.v560-slide-num{font-size:10px!important}.v560-caption summary{font-size:12px!important}.v560-caption p{font-size:13px!important}.v560-history>button span{font-size:13px!important}.v560-history>button small{font-size:11px!important}}'
].join('');
document.head.appendChild(v565Style);
// ===== FIM COLAB V5.65 =====

// ===== COLAB V5.66 — CONFIABILIDADE, FINANCEIRO SEGURO E ESCALA MÓVEL =====
let loadWarningsV566=[];
async function settledDataV566(paths){
  let results=await Promise.allSettled(paths.map(function(path){return api(path)}));
  results.forEach(function(result,index){
    if(result.status==='rejected'){
      let name=String(paths[index]||'').match(/\/rest\/v1\/([^?]+)/)?.[1]||'dados';
      loadWarningsV566.push(name);
      console.warn('Carga parcial · '+name,result.reason)
    }
  });
  return results.map(function(result){return result.status==='fulfilled'?(result.value??[]):[]})
}

const _shellV566Base=shell;
shell=function(body,client=false){
  let warning=loadWarningsV566.length
    ? '<section class="v566-load-warning"><div><b>Algumas informações não carregaram</b><span>O restante do aplicativo continua disponível. Tente atualizar somente os dados pendentes.</span></div><button type="button" data-v566-retry>Atualizar dados</button></section>'
    : '';
  let result=_shellV566Base(warning+body,client),button=document.querySelector('[data-v566-retry]');
  if(button)button.onclick=async function(){button.disabled=true;button.textContent='Atualizando...';try{await load();render();if(!loadWarningsV566.length)toast('Dados atualizados ✓')}catch(error){button.disabled=false;button.textContent='Tentar novamente';toast('Ainda não foi possível carregar tudo.')}};
  return result
};

let undoToastTimerV566=null;
function showUndoToastV566(message,undo){
  clearTimeout(undoToastTimerV566);document.querySelector('.toast')?.remove();
  let box=document.createElement('div');box.className='toast v566-undo-toast';box.innerHTML='<span>'+E(message)+'</span><button type="button">Desfazer</button>';
  box.querySelector('button').onclick=async function(){let button=this;button.disabled=true;button.textContent='Desfazendo...';try{await undo();box.remove()}catch(error){button.disabled=false;button.textContent='Desfazer';toast(error.message)}};
  document.body.appendChild(box);undoToastTimerV566=setTimeout(function(){box.remove()},8000)
}

markPaid=async function(table,id){
  let collection=table==='receivables'?(D.receivables||[]):(D.expenses||[]),item=collection.find(function(row){return row.id===id});if(!item)return;
  let action=table==='receivables'?'recebimento':'pagamento',description=item.description||cl(item.client_id)?.name||'lançamento',amount=money(item.amount),old={status:item.status||'pending',paid_at:item.paid_at||null};
  if(!confirm('Confirmar '+action+' de '+amount+' — '+description+'?'))return;
  try{
    await patch(table,id,{status:'paid',paid_at:new Date().toISOString(),updated_at:new Date().toISOString()});await load();render();
    showUndoToastV566((table==='receivables'?'Recebimento':'Pagamento')+' confirmado · '+amount,async function(){await patch(table,id,{status:old.status,paid_at:old.paid_at,updated_at:new Date().toISOString()});await load();render();toast('Lançamento restaurado')})
  }catch(error){toast(error.message)}
};

markRecurringCostPaid=async function(id){
  let item=(D.recurringCosts||[]).find(function(row){return row.id===id});if(!item)return;
  if(!confirm('Confirmar pagamento de '+money(item.amount)+' — '+item.name+'?'))return;
  let old={last_paid_at:item.last_paid_at||null,next_due_date:item.next_due_date,status:item.status||'active'},paid=new Date().toISOString();
  try{
    let created=await api('/rest/v1/expenses',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({organization_id:M.organization_id,description:item.name,category:'fixed',expense_date:today(),due_date:item.next_due_date,amount:Number(item.amount||0),status:'paid',paid_at:paid,vendor:item.vendor||null,notes:item.notes||null,created_by:S.user?.id})}),expenseId=created?.[0]?.id;
    let date=new Date(item.next_due_date+'T12:00:00');if(item.recurrence==='monthly')date.setMonth(date.getMonth()+1);if(item.recurrence==='annual')date.setFullYear(date.getFullYear()+1);
    let next=date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
    await patch('recurring_costs',id,{last_paid_at:paid,next_due_date:item.recurrence==='one_time'?item.next_due_date:next,status:item.recurrence==='one_time'?'inactive':'active',updated_at:paid});await load();render();
    showUndoToastV566('Pagamento confirmado · '+money(item.amount),async function(){if(expenseId)await api('/rest/v1/expenses?id=eq.'+expenseId,{method:'DELETE',headers:{Prefer:'return=minimal'}});await patch('recurring_costs',id,{last_paid_at:old.last_paid_at,next_due_date:old.next_due_date,status:old.status,updated_at:new Date().toISOString()});await load();render();toast('Pagamento desfeito')})
  }catch(error){toast(error.message)}
};

const v566Style=document.createElement('style');v566Style.textContent=[
'.v566-load-warning{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:14px;padding:13px 15px;border:1px solid #65461d;border-radius:13px;background:#251b0d;color:#ffe0a1}.v566-load-warning b,.v566-load-warning span{display:block}.v566-load-warning b{font-size:12px}.v566-load-warning span{margin-top:4px;color:#bda982;font-size:10px;line-height:1.4}.v566-load-warning button{min-height:38px;border:1px solid #876126;border-radius:9px;background:#33230e;color:#ffd88d;padding:8px 11px;font-size:10px;font-weight:900;white-space:nowrap}.v566-undo-toast{display:flex;align-items:center;gap:16px;max-width:min(430px,calc(100vw - 28px));background:#fff;color:#111}.v566-undo-toast span{font-size:12px;font-weight:750}.v566-undo-toast button{border:0;background:transparent;color:#d95000;font-size:12px;font-weight:950}',
'@media(max-width:760px){.main{padding:15px 14px!important;margin-bottom:82px!important}.side{height:82px!important;padding:8px 6px!important}.nav button{min-width:56px!important;min-height:64px!important;padding:7px 6px!important}.nav button b{font-size:20px!important}.nav button span{font-size:10px!important;line-height:1.15!important}.top{margin-bottom:17px!important}.top h1{font-size:26px!important;line-height:1.1!important}.ey{font-size:11px!important;line-height:1.25!important}.muted,.row small,.v5-empty-soft,.empty{font-size:13px!important;line-height:1.5!important}.btn{min-height:44px;padding:10px 13px;font-size:13px}.btn.small{min-height:40px;padding:8px 10px;font-size:12px}.bell,.v5-top-btn{width:42px!important;height:42px!important;min-height:42px!important}.panel{padding:18px!important}.panel h3,.head h3{font-size:20px;line-height:1.25}.hero{padding:21px!important}.hero h2{font-size:30px!important;line-height:1.05}.field{gap:7px!important;margin:14px 0!important}.field label{font-size:13px!important}.field input,.field select,.field textarea,.filters select,.filters input,.v5-filterbar select,.v5-filterbar input{min-height:46px!important;padding:11px 12px!important;font-size:14px!important}.tag{min-height:29px;padding:6px 9px!important;font-size:11px!important}.row{gap:11px!important;padding:14px 0!important}.row b{font-size:14px!important;line-height:1.35!important}.stat{padding:17px!important}.stat span{font-size:13px!important}.stat small{font-size:12px!important;line-height:1.4!important}.tabs button,.v5-finance-tabs button,.v550-content-tabs button,.v563-client-tabs button{min-height:44px!important;padding:10px 14px!important;font-size:12px!important}.v5-client-card h3,.client-card h3{font-size:20px!important}.v5-task-card h4{font-size:15px!important}.v5-task-card small,.v5-flow-row small,.v5-library-row small{font-size:12px!important;line-height:1.4!important}.v5-flow-row b,.v5-library-row b{font-size:14px!important}.v564-lab-intro small,.v564-lab-glance span,.v564-strategy-kpis span,.v564-lab-kpis span,.v564-lab-kpis small,.v564-strategy-grid small,.v564-pillar-list p,.v564-cycle-list small,.v564-learning-list p,.v564-canva-status span{font-size:11px!important;line-height:1.4!important}.v564-lab-intro p,.v564-strategy-score>p{font-size:13px!important;line-height:1.5!important}.v564-cycle-list b,.v564-pillar-list b,.v564-canva-status b{font-size:13px!important}.v566-load-warning{align-items:flex-start;flex-direction:column;padding:14px}.v566-load-warning b{font-size:14px}.v566-load-warning span{font-size:12px}.v566-load-warning button{width:100%;min-height:44px;font-size:12px}.v566-undo-toast{right:14px!important;bottom:96px!important;justify-content:space-between;width:calc(100vw - 28px);padding:13px 14px!important}.v566-undo-toast span,.v566-undo-toast button{font-size:13px!important}}'
].join('');document.head.appendChild(v566Style);
// ===== FIM COLAB V5.66 =====

// ===== COLAB V5.67 — IDENTIDADE VISUAL POR CLIENTE =====
function clientBrandColorV567(value,fallback){
  value=String(value||'').trim();
  return /^#[0-9a-f]{6}$/i.test(value)?value:fallback
}
function clientBrandIdentityV567(cid){
  let dna=contentDnaV561(cid)||{},state=labStateV560();
  return{
    primary:clientBrandColorV567(dna.primary_color||state.primary,'#0d0d0d'),
    secondary:clientBrandColorV567(dna.secondary_color||state.secondary,'#ff6a00'),
    accent:clientBrandColorV567(dna.accent_color||state.accent,'#ffffff')
  }
}

labProgressV564=function(cid){
  let state=labStateV560(),dnaScore=contentDnaScoreV561(contentDnaV561(cid)),phase=0;
  if(state.topic||state.selectedPauta||(state.selectedReferenceIds||[]).length)phase=1;
  if(['structure-loading','structure','content-loading'].includes(state.stage))phase=2;
  if(state.stage==='result')phase=3;
  if(state.result?.savedId)phase=4;
  let steps=[['01','Direção'],['02','Inspiração'],['03','Construção'],['04','Revisão'],['05','Produção']];
  return '<section class="v564-lab-progress"><div class="v564-lab-progress-head"><div><small>CICLO CRIATIVO · DNA '+dnaScore+'%</small><b>Da direção à produção, tudo conectado.</b></div><button data-lab-new-cycle-v564="'+E(cid)+'">＋ Novo ciclo</button></div><div class="v564-lab-steps">'+steps.map(function(step,index){return '<span class="'+(index<phase?'done':index===phase?'on':'')+'"><i>'+step[0]+'</i><b>'+step[1]+'</b></span>'}).join('')+'</div></section>'
};

labStrategyCardV560=function(){
  let client=cl(contentClient)||{},plan=labPlanV560(contentClient),pillars=labPillarsV560(contentClient),dna=contentDnaV561(contentClient),refs=contentReferencesV561(contentClient),score=contentDnaScoreV561(dna),brand=clientBrandIdentityV567(contentClient),hasIdentity=!!(dna?.primary_color||dna?.secondary_color||dna?.accent_color||dna?.visual_direction);
  return '<section class="v560-strategy-card v561-dna-card v567-dna-card"><div class="v560-strategy-top"><div><small>DNA DE CONTEÚDO</small><b>'+E(client.name||'Cliente')+'</b><span>'+(dna?score+'% estruturado · '+refs.length+' referências':'Ainda não configurado')+'</span></div><button type="button" data-cmode="strategy">Estratégia do mês →</button></div><div class="v561-dna-progress"><i style="width:'+score+'%"></i></div><p>'+E(dna?.positioning||plan?.main_goal||client.objective||'Defina a persona, a narrativa e o padrão de conteúdo desta cliente.')+'</p><div class="v560-pillar-chips">'+(pillars.map(function(row){return '<span>'+E(row.name)+'</span>'}).join('')||'<span>Sem pilares cadastrados</span>')+'</div><button type="button" class="v567-brand-identity" data-lab-dna><span class="v567-brand-copy"><small>IDENTIDADE VISUAL DA CLIENTE</small><b>'+(hasIdentity?'Identidade conectada':'Adicionar identidade visual')+'</b><em>Paleta e direção visual personalizam automaticamente as prévias e cada nova criação.</em></span><span class="v567-brand-swatches" aria-label="Paleta da cliente"><i style="background:'+brand.primary+'"></i><i style="background:'+brand.secondary+'"></i><i style="background:'+brand.accent+'"></i></span><strong>'+(hasIdentity?'Editar':'Configurar')+' →</strong></button></section>'
};

const _contentDnaModalV567Base=contentDnaModalV561;
contentDnaModalV561=function(){
  let html=_contentDnaModalV567Base();
  html=html.replace('04 · DIREÇÃO VISUAL & PRODUÇÃO','04 · IDENTIDADE VISUAL');
  html=html.replace('Como esse conteúdo ganha forma?','Como esta marca deve aparecer?');
  html=html.replace('<div class="v561-color-grid">','<p class="v567-identity-help">Cadastre a paleta e a direção visual uma única vez. O Laboratório usa essas escolhas automaticamente nas prévias, capas e materiais gerados para esta cliente.</p><div class="v561-color-grid">');
  return html
};

const _contentLabPageV567Base=contentLabPageV560;
contentLabPageV560=function(socialClients){
  let brand=clientBrandIdentityV567(contentClient),html=_contentLabPageV567Base(socialClients);
  return '<div class="v567-client-theme" style="--client-brand-primary:'+brand.primary+';--client-brand-secondary:'+brand.secondary+';--client-brand-accent:'+brand.accent+'">'+html+'</div>'
};

const v567Style=document.createElement('style');v567Style.textContent=`
.v567-brand-identity{display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-items:center;gap:13px;width:100%;margin-top:14px;padding:13px;border:1px solid #3b302a;border-radius:13px;background:#111;color:#fff;text-align:left}.v567-brand-identity:hover{border-color:var(--client-brand-secondary,#ff6a00)}.v567-brand-copy small,.v567-brand-copy b,.v567-brand-copy em{display:block}.v567-brand-copy small{color:var(--client-brand-secondary,#ff6a00);font-size:7px;font-weight:950;letter-spacing:.12em}.v567-brand-copy b{margin-top:5px;font-size:11px}.v567-brand-copy em{margin-top:4px;color:#777;font-size:8px;font-style:normal;line-height:1.4}.v567-brand-swatches{display:flex}.v567-brand-swatches i{width:27px;height:27px;margin-left:-5px;border:2px solid #171717;border-radius:50%;box-shadow:0 0 0 1px #3b3b3b}.v567-brand-identity>strong{color:var(--client-brand-secondary,#ff6a00);font-size:8px;white-space:nowrap}.v567-identity-help{margin:0 0 12px;color:#929292;font-size:10px;line-height:1.55}.v567-client-theme .v560-head:after{background:radial-gradient(circle,color-mix(in srgb,var(--client-brand-secondary) 25%,transparent),transparent 67%)}.v567-client-theme .v564-lab-progress-head small,.v567-client-theme .v564-lab-progress-head button,.v567-client-theme .v564-lab-steps span.on{color:var(--client-brand-secondary)}.v567-client-theme .v564-lab-steps span.on:before{background:var(--client-brand-secondary);box-shadow:0 0 0 4px color-mix(in srgb,var(--client-brand-secondary) 17%,transparent)}.v567-client-theme .v561-dna-progress i{background:linear-gradient(90deg,var(--client-brand-primary),var(--client-brand-secondary),var(--client-brand-accent))}
@media(max-width:760px){.v567-brand-identity{grid-template-columns:1fr auto;padding:14px}.v567-brand-copy em{font-size:11px}.v567-brand-copy small{font-size:9px}.v567-brand-copy b{font-size:14px}.v567-brand-identity>strong{grid-column:1/-1;font-size:11px}.v567-identity-help{font-size:12px}}
`;document.head.appendChild(v567Style);
// ===== FIM COLAB V5.67 =====

// ===== COLAB V5.68 — DNA INTERNO, MODELOS LIMPOS E CENTRAL SIMPLIFICADA =====
function dnaPage(){
  let items=D.dnaItems||[],parts=D.partnerships||[],labs=D.labItems||[],strat=items.filter(row=>row.category==='strategy'),campaigns=items.filter(row=>row.category==='campaign'),brand=items.filter(row=>row.category==='brand');
  return `<section class="hero v568-dna-hero"><div><small class="ey">DNA COLAB · ÁREA INTERNA</small><h2>A marca e o jeito de trabalhar da Colab.</h2><p class="muted">Este espaço é exclusivamente nosso. Nenhum DNA, calendário ou material de cliente aparece aqui.</p></div><span class="v568-internal-seal">CO</span></section>${dnaMaterialsV554()}<div class="grid2 v568-dna-grid"><section class="panel"><div class="head"><div><small class="ey">ESTRATÉGIA & POSICIONAMENTO</small><h3>O que queremos construir</h3></div><button class="btn ghost small" data-m="dnaItemNew" data-category="strategy">＋</button></div>${strat.map(dnaItemRow).join('')||'<div class="empty">Nenhum direcionamento cadastrado.</div>'}</section><section class="panel"><div class="head"><div><small class="ey">CAMPANHAS DA COLAB</small><h3>O que vamos colocar na rua</h3></div><button class="btn ghost small" data-m="dnaItemNew" data-category="campaign">＋</button></div>${campaigns.map(dnaItemRow).join('')||'<div class="empty">Nenhuma campanha planejada.</div>'}</section><section class="panel"><div class="head"><div><small class="ey">PARCERIAS</small><h3>Relações que fazem a Colab crescer</h3></div><button class="btn ghost small" data-m="partnershipNew">＋ Parceria</button></div>${parts.map(row=>`<div class="row"><span class="dot ${row.stage==='active'?'g':row.stage==='talking'?'o':''}"></span><div class="grow"><b>${E(row.name)}</b><small>${E(row.category||'Parceiro potencial')}${row.next_action?' · '+E(row.next_action):''}${row.next_action_date?' · '+fmtDate(row.next_action_date):''}</small></div><select data-partstage="${row.id}" style="max-width:145px"><option value="mapped" ${row.stage==='mapped'?'selected':''}>Mapeada</option><option value="talking" ${row.stage==='talking'?'selected':''}>Conversando</option><option value="aligned" ${row.stage==='aligned'?'selected':''}>Alinhada</option><option value="active" ${row.stage==='active'?'selected':''}>Ativa</option><option value="paused" ${row.stage==='paused'?'selected':''}>Pausada</option></select></div>`).join('')||'<div class="empty">Nenhuma parceria cadastrada.</div>'}</section><section class="panel"><div class="head"><div><small class="ey">ATIVOS DA MARCA</small><h3>Movimentos e decisões da Colab</h3></div><button class="btn ghost small" data-m="dnaItemNew" data-category="brand">＋</button></div>${brand.map(dnaItemRow).join('')||'<div class="empty">Adicione decisões e movimentos da nossa marca.</div>'}</section></div><section class="panel v568-colab-lab"><div class="head"><div><small class="ey">LAB COLAB</small><h3>Testar antes de virar padrão</h3><p class="muted">Experimentos internos de formato, processo e operação.</p></div><button class="btn pri small" data-m="labItemNew">＋ Experimento</button></div>${labs.map(row=>`<div class="row"><span class="dot ${row.status==='standard'||row.status==='worked'?'g':row.status==='testing'?'o':row.status==='didnt_work'?'r':''}"></span><div class="grow"><b>${E(row.title)}</b><small>${E(row.area||'LAB')}${row.hypothesis?' · '+E(row.hypothesis):''}</small></div><select data-labstatus="${row.id}" style="max-width:150px"><option value="idea" ${row.status==='idea'?'selected':''}>Ideia</option><option value="testing" ${row.status==='testing'?'selected':''}>Testando</option><option value="worked" ${row.status==='worked'?'selected':''}>Funcionou</option><option value="didnt_work" ${row.status==='didnt_work'?'selected':''}>Não funcionou</option><option value="standard" ${row.status==='standard'?'selected':''}>Padrão Colab</option></select></div>`).join('')||'<div class="empty">Nenhum experimento no LAB ainda.</div>'}</section>`
}

morePage=function(){
  return `<section class="v5-central-hero"><small class="ey">CENTRAL DA COLAB</small><h2>Base interna, sem misturar com a operação diária.</h2><p class="muted">Aqui ficam nossa marca, os modelos mestres e os recursos administrativos usados com menos frequência.</p></section><button class="v554-dna-entry" data-v="dna"><span>CO</span><div><small class="ey">NOSSA MARCA & NOSSO MÉTODO</small><h2>DNA Colab</h2><p>Logos, Canva editável, posicionamento, campanhas, parcerias e experimentos exclusivamente da Colab.</p></div><em>Abrir DNA →</em></button><div class="v568-central-primary"><button class="v5-central-card" data-v="templatesV5"><span>▤</span><div><small class="ey">MODELOS MESTRES</small><h3>Briefings & onboardings</h3><p>Crie uma cópia limpa para cada nova cliente ou evento. O modelo original nunca é alterado.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="libraryV5"><span>▧</span><div><small class="ey">ARQUIVOS INTERNOS</small><h3>Biblioteca Colab</h3><p>Drive, contratos, comprovantes e links administrativos.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="goals"><span>◎</span><div><small class="ey">DIREÇÃO DA AGÊNCIA</small><h3>Planejamento & metas</h3><p>Objetivos, marcos e evolução da Colab.</p></div><em>Abrir →</em></button><button class="v5-central-card" data-v="mural"><span>✦</span><div><small class="ey">THALIA & CAROL</small><h3>Mural Colab</h3><p>Recados, post-its e decisões sincronizados entre a equipe.</p></div><em>Abrir →</em></button></div><details class="v568-admin"><summary><span><small class="ey">ADMINISTRAÇÃO DO SISTEMA</small><b>Acessos e configurações</b></span><em>Mostrar opções</em></summary><div><button data-v="access"><b>Equipe & acessos</b><small>Convidar pessoas e controlar quem pode ver ou editar cada área.</small><span>Abrir →</span></button><button data-v="settingsV5"><b>Configurações financeiras</b><small>Definir caixa inicial, reserva e preferências administrativas.</small><span>Abrir →</span></button></div></details>`
};

function templateUseModalV568(){
  let template=(D.formTemplates||[]).find(row=>row.id===MD.templateId);if(!template)return'';
  let clients=(D.clients||[]).filter(row=>row.active),clientId=MD.clientId||clients[0]?.id||'',client=cl(clientId),story=template.service==='storymaker',existingOnboarding=(D.onboardings||[]).find(row=>row.client_id===clientId),events=(D.events||[]).filter(row=>row.client_id===clientId&&row.event_type==='storymaker'),availableEvents=events.filter(row=>!(D.storyBriefings||[]).some(brief=>brief.event_id===row.id)),eventId=MD.eventId||availableEvents[0]?.id||'';
  let blocked=!story&&!!existingOnboarding;
  return `<div class="modalbg"><div class="modal v568-template-modal"><div class="head"><div><small class="ey">CRIAR CÓPIA DO MODELO</small><h2>${E(template.name)}</h2><p class="muted">O modelo mestre permanece intacto. Esta ação cria um preenchimento novo, sem respostas anteriores.</p></div><button class="btn ghost small" data-close>✕</button></div><form id="templateUseFormV568" data-template="${template.id}"><div class="field"><label>Cliente que receberá a cópia</label><select name="client_id" id="templateClientV568">${clients.map(row=>`<option value="${row.id}" ${row.id===clientId?'selected':''}>${E(row.name)}</option>`).join('')}</select></div>${story?`<div class="field"><label>Evento desta cópia</label><select name="event_id" ${availableEvents.length?'':'disabled'}>${availableEvents.map(row=>`<option value="${row.id}" ${row.id===eventId?'selected':''}>${E(row.title)}${row.starts_at?' · '+fmtDate(String(row.starts_at).slice(0,10)):''}</option>`).join('')}</select>${availableEvents.length?'<small class="muted">Aparecem somente eventos que ainda não possuem briefing.</small>':'<div class="v568-template-alert">Esta cliente ainda não tem um evento livre. Cadastre um novo evento StoryMaker e volte aqui para gerar a cópia.</div>'}</div>`:blocked?`<div class="v568-template-alert"><b>${E(client?.name||'Esta cliente')} já possui um onboarding.</b><span>Para proteger as respostas salvas, o sistema não irá substituí-las. Use este modelo em uma nova cliente.</span><button type="button" class="btn ghost small" data-onboardingopen="${clientId}">Ver respostas existentes</button></div>`:`<div class="v568-clean-copy"><span>✓</span><div><b>Cópia limpa pronta para criar</b><small>Nenhuma resposta de outra cliente será reaproveitada.</small></div></div>`}<div class="actions"><button type="button" class="btn ghost" data-close>Cancelar</button>${story&&!availableEvents.length?`<button type="button" class="btn pri" data-m="storyEventNew" data-client="${clientId}">＋ Novo evento</button>`:`<button class="btn pri" ${blocked?'disabled':''}>Criar cópia limpa</button>`}</div></form></div></div>`
}

templatesPageV5=function(){
  return `<div class="toolbar"><div><p class="muted">Escolha um modelo e crie uma cópia limpa. Respostas já preenchidas nunca são abertas nem substituídas.</p></div><span class="tag g">Modelos protegidos</span></div><div class="v5-template-list">${(D.formTemplates||[]).map(template=>{let config=template.config||{},sections=Array.isArray(config.sections)?config.sections:[];return `<article class="v5-template-master"><div class="head"><div><small class="ey">${E(lab(template.service))} · ${E(template.segment||'GERAL')}</small><h3>${E(template.name)}</h3></div><span class="tag g">Modelo mestre</span></div><p>${E(template.description||'Modelo reutilizável Colab.')}</p><div class="v5-template-sections">${sections.map(section=>`<span class="tag">${E(section)}</span>`).join('')}</div><div class="v568-template-footer"><span>Uma ficha nova para cada cliente ou evento.</span><button class="btn pri" data-template-use-v568="${template.id}">Criar uma cópia →</button></div></article>`}).join('')||'<div class="v5-empty-soft">Nenhum modelo salvo.</div>'}</div>`
};

const _modalV568Base=modal;
modal=function(){if(MD?.type==='templateUseV568')return templateUseModalV568();return _modalV568Base()};

async function createTemplateCopyV568(event){
  event.preventDefault();let form=event.currentTarget,data=new FormData(form),template=(D.formTemplates||[]).find(row=>row.id===form.dataset.template),clientId=String(data.get('client_id')||''),client=cl(clientId);if(!template||!client)return;
  let button=form.querySelector('button[type="submit"],button.btn.pri');if(button){button.disabled=true;button.textContent='Criando cópia...'}
  try{
    if(template.service==='storymaker'){
      let eventId=String(data.get('event_id')||''),storyEvent=(D.events||[]).find(row=>row.id===eventId&&row.client_id===clientId);if(!storyEvent)throw Error('Escolha um evento StoryMaker sem briefing.');
      if((D.storyBriefings||[]).some(row=>row.event_id===eventId))throw Error('Este evento já possui briefing. Escolha outro evento.');
      let created=await api('/rest/v1/storymaker_briefings',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({organization_id:M.organization_id,event_id:eventId,template_id:template.id,partner_names:storyEvent.title||null})}),briefing=created?.[0];await load();MD=null;productionClient=clientId;V='production';render();if(briefing?.public_token)await clientShareCopyTextV429(storyPublicUrl(briefing.public_token));toast('Cópia limpa criada e link do briefing copiado');return
    }
    if((D.onboardings||[]).some(row=>row.client_id===clientId))throw Error('Esta cliente já possui onboarding. As respostas existentes foram preservadas.');
    await api('/rest/v1/client_onboardings',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({organization_id:M.organization_id,client_id:clientId,template_id:template.id,answers:{},status:'draft'})});await load();MD=null;clientHubIdV5=clientId;V='clientHub';render();let url=`${B}/functions/v1/client-onboarding?token=${encodeURIComponent(client.portal_preview_token)}`;await clientShareCopyTextV429(url);toast('Cópia limpa criada e link do onboarding copiado')
  }catch(error){toast(error.message);if(button){button.disabled=false;button.textContent='Criar cópia limpa'}}
}

useTemplateV5=function(templateId,clientId){MD={type:'templateUseV568',templateId,clientId:clientId||null,eventId:null};render()};

const _labConsoleV568Base=labConsoleV560;
labConsoleV560=function(){
  let html=_labConsoleV568Base();
  html=html.replace(/<small class="v560-label">MODELO VISUAL<\/small><div class="v560-choice-row">([\s\S]*?)<\/div><label class="v560-topic">/,function(_,choices){choices=choices.replace('>Bold</button>','>Padrão da cliente</button>');return '<div class="v568-brand-applied"><span>✓</span><div><small>IDENTIDADE VISUAL APLICADA</small><b>Paleta e direção da cliente carregadas automaticamente</b></div></div><details class="v568-piece-options"><summary>Variação visual desta peça <span>Opcional</span></summary><div class="v560-choice-row">'+choices+'</div></details><label class="v560-topic">'});
  html=html.replace('<small class="v560-label">ÊNFASE DESTE CONTEÚDO</small>','<small class="v560-label">ÊNFASE DESTE CONTEÚDO · OPCIONAL</small>');
  return html
};
labStyleLabelV560=function(value){return({bold:'Padrão da cliente',minimal:'Minimalista',editorial:'Editorial'})[value]||value};

const _bindV568Base=bind;
bind=function(){
  _bindV568Base();
  document.querySelectorAll('[data-template-use-v568]').forEach(button=>button.onclick=()=>{MD={type:'templateUseV568',templateId:button.dataset.templateUseV568,clientId:null,eventId:null};render()});
  document.getElementById('templateClientV568')?.addEventListener('change',event=>{MD.clientId=event.target.value;MD.eventId=null;render()});
  document.getElementById('templateUseFormV568')?.addEventListener('submit',createTemplateCopyV568)
};

const v568Style=document.createElement('style');v568Style.textContent=`
.v568-dna-hero{align-items:center}.v568-internal-seal{display:grid;place-items:center;width:74px;height:74px;border:1px solid #7a3b18;border-radius:22px;background:radial-gradient(circle,#3b1909,#15110f 70%);color:#ff7424;font-size:18px;font-weight:950;box-shadow:0 0 35px #ff5a0022}.v568-dna-grid{margin-top:14px}.v568-colab-lab{margin-top:14px}.v568-central-primary{display:grid;grid-template-columns:1fr 1fr;gap:12px}.v568-admin{margin-top:15px;border:1px solid #2e2e2e;border-radius:18px;background:#111}.v568-admin>summary{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:18px;cursor:pointer;list-style:none}.v568-admin>summary::-webkit-details-marker{display:none}.v568-admin>summary small,.v568-admin>summary b{display:block}.v568-admin>summary b{margin-top:5px}.v568-admin>summary em{color:#ff8742;font-size:10px;font-style:normal;font-weight:900}.v568-admin>div{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:0 18px 18px}.v568-admin>div button{display:grid;grid-template-columns:1fr auto;gap:4px 12px;padding:15px;border:1px solid #303030;border-radius:13px;background:#151515;color:#fff;text-align:left}.v568-admin>div button b,.v568-admin>div button small{display:block}.v568-admin>div button small{grid-column:1;color:#777;line-height:1.45}.v568-admin>div button span{grid-column:2;grid-row:1/3;align-self:center;color:#ff8742;font-size:10px;font-weight:900}.v568-template-footer{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:15px;padding-top:15px;border-top:1px solid #332820}.v568-template-footer>span{color:#888;font-size:10px}.v568-template-modal .muted{line-height:1.5}.v568-template-alert{display:grid;gap:7px;margin:14px 0;padding:14px;border:1px solid #64401d;border-radius:13px;background:#21160d;color:#d8aa83}.v568-template-alert b,.v568-template-alert span{display:block}.v568-template-alert span{font-size:10px;line-height:1.5}.v568-template-alert .btn{justify-self:start}.v568-clean-copy{display:flex;align-items:center;gap:11px;margin:14px 0;padding:14px;border:1px solid #284d38;border-radius:13px;background:#102018}.v568-clean-copy>span{display:grid;place-items:center;width:31px;height:31px;border-radius:50%;background:#1c5131;color:#84e5a5;font-weight:950}.v568-clean-copy b,.v568-clean-copy small{display:block}.v568-clean-copy small{margin-top:4px;color:#799184}.v568-brand-applied{display:flex;align-items:center;gap:10px;margin-top:17px;padding:12px;border:1px solid color-mix(in srgb,var(--client-brand-secondary,#ff6a00) 38%,#2d2d2d);border-radius:12px;background:color-mix(in srgb,var(--client-brand-secondary,#ff6a00) 7%,#111)}.v568-brand-applied>span{display:grid;place-items:center;width:29px;height:29px;border-radius:50%;background:var(--client-brand-secondary,#ff6a00);color:var(--client-brand-primary,#111);font-weight:950}.v568-brand-applied small,.v568-brand-applied b{display:block}.v568-brand-applied small{color:var(--client-brand-secondary,#ff6a00);font-size:7px;font-weight:950;letter-spacing:.11em}.v568-brand-applied b{margin-top:4px;font-size:10px;line-height:1.35}.v568-piece-options{margin-top:9px;border:1px solid #2e2e2e;border-radius:11px;background:#101010}.v568-piece-options>summary{display:flex;justify-content:space-between;gap:10px;padding:11px;color:#aaa;font-size:9px;font-weight:850;cursor:pointer;list-style:none}.v568-piece-options>summary::-webkit-details-marker{display:none}.v568-piece-options>summary span{color:#ff8742}.v568-piece-options .v560-choice-row{padding:0 10px 10px}
@media(max-width:760px){.v568-internal-seal{width:54px;height:54px;border-radius:16px}.v568-central-primary{grid-template-columns:1fr}.v568-admin>div{grid-template-columns:1fr}.v568-template-footer{align-items:stretch;flex-direction:column}.v568-template-footer .btn{width:100%}.v568-template-alert span,.v568-template-footer>span{font-size:12px}.v568-brand-applied{padding:13px}.v568-brand-applied small{font-size:9px}.v568-brand-applied b{font-size:12px}.v568-piece-options>summary{min-height:44px;align-items:center;padding:12px;font-size:12px}}
`;document.head.appendChild(v568Style);
// ===== FIM COLAB V5.68 =====

// ===== COLAB V5.69 — ONBOARDING REAL DA CLIENTE =====
templateMatchesClientV5=function(template,client,services){
  let service=services.some(item=>item.service===template.service&&item.active),normalize=value=>String(value||'').trim().toLocaleLowerCase('pt-BR'),segment=!template.segment||normalize(client.segment)===normalize(template.segment);
  return service&&segment
};

function onboardingAnswerLabelV569(key){
  return onboardingLabelsV430[key]||({servico_dia:'Como funciona o serviço no dia',tipos_eventos:'Tipos de eventos atendidos',outros_servicos:'Outros serviços oferecidos',servico_assessoria_completa:'Como funciona a assessoria completa'})[key]||String(key||'').replace(/_/g,' ').replace(/^./,letter=>letter.toUpperCase())
}

openClientOnboardingV430=async function(cid){
  let saved=(D.onboardings||[]).find(row=>row.client_id===cid);
  if(saved){onboardingViewV430=saved;MD={type:'onboardingViewV430',id:cid};render();return}
  let client=cl(cid);try{if(!client?.portal_preview_token)throw Error('Esta cliente ainda não possui onboarding preenchido');let url=`https://pskerhmvejorsdvinind.supabase.co/functions/v1/client-onboarding?token=${encodeURIComponent(client.portal_preview_token)}`;let response=await fetch(url,{cache:'no-store'}),payload=await response.json();if(!response.ok)throw Error(payload?.error||'Não foi possível abrir o onboarding');onboardingViewV430=payload.onboarding||{answers:{},status:'draft'};MD={type:'onboardingViewV430',id:cid};render()}catch(error){toast(error.message)}
};

onboardingModalV430=function(){
  let client=cl(MD.id),data=onboardingViewV430||{},answers=data.answers||{},known=Object.keys(onboardingLabelsV430),keys=[...known.filter(key=>Object.prototype.hasOwnProperty.call(answers,key)),...Object.keys(answers).filter(key=>!known.includes(key))],rows=keys.map(key=>`<div class="onboarding-answer-v430"><small>${E(onboardingAnswerLabelV569(key))}</small><p>${E(Array.isArray(answers[key])?answers[key].join(' · '):(answers[key]??'Ainda não respondido'))}</p></div>`).join('');
  return `<div class="modalbg"><div class="modal wide"><div class="head"><div><small class="ey">ONBOARDING REAL · ${E(client?.name||'Cliente')}</small><h2>O que foi construído com a cliente</h2><p class="muted">${data.status==='completed'?'Finalizado e salvo na Colab':'Em preenchimento'}${data.updated_at?' · atualizado em '+fmtDate(String(data.updated_at).slice(0,10)):''}</p></div><button class="btn ghost small" data-close>Fechar</button></div><div class="v569-real-onboarding-note"><span>✓</span><div><b>Respostas desta cliente</b><small>Este conteúdo é o onboarding preenchido, não o modelo padrão.</small></div></div><div class="onboarding-grid-v430">${rows||'<div class="v5-empty-soft">Este onboarding ainda não possui respostas.</div>'}</div></div></div>`
};

const _clientHubPageV569Base=clientHubPageV5;
clientHubPageV5=function(clientId){
  let html=_clientHubPageV569Base(clientId),onboarding=(D.onboardings||[]).find(row=>row.client_id===clientId);if(!onboarding)return html;
  let sectionStart=html.indexOf('<section class="panel v5-hub-wide" id="forms">');if(sectionStart<0)return html;let gridStart=html.indexOf('<div class="grid2">',sectionStart);if(gridStart<0)return html;gridStart+='<div class="grid2">'.length;
  let answerCount=Object.keys(onboarding.answers||{}).filter(key=>String(onboarding.answers[key]??'').trim()).length,card=`<article class="v569-onboarding-real"><div><small class="ey">ONBOARDING DA CLIENTE</small><span class="tag ${onboarding.status==='completed'?'g':'y'}">${onboarding.status==='completed'?'Finalizado':'Em preenchimento'}</span></div><h3>Respostas de ${E(cl(clientId)?.name||'cliente')}</h3><p>${answerCount} ${answerCount===1?'resposta salva':'respostas salvas'}${onboarding.updated_at?' · atualizado em '+fmtDate(String(onboarding.updated_at).slice(0,10)):''}</p><button class="btn pri" data-onboardingopen="${clientId}">Abrir onboarding feito com a cliente →</button></article>`;
  return html.slice(0,gridStart)+card+html.slice(gridStart)
};

const v569Style=document.createElement('style');v569Style.textContent=`
.v569-onboarding-real{padding:18px;border:1px solid #5c3a21;border-radius:17px;background:radial-gradient(circle at 90% 8%,rgba(255,106,0,.16),transparent 36%),linear-gradient(145deg,#20150e,#121212)}.v569-onboarding-real>div{display:flex;align-items:center;justify-content:space-between;gap:10px}.v569-onboarding-real h3{margin:13px 0 6px}.v569-onboarding-real p{margin:0 0 15px;color:#888;font-size:10px;line-height:1.5}.v569-onboarding-real .btn{width:100%}.v569-real-onboarding-note{display:flex;align-items:center;gap:11px;margin-top:15px;padding:13px;border:1px solid #28503a;border-radius:13px;background:#102018}.v569-real-onboarding-note>span{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#1d5533;color:#8ce8aa;font-weight:950}.v569-real-onboarding-note b,.v569-real-onboarding-note small{display:block}.v569-real-onboarding-note small{margin-top:4px;color:#769182}
@media(max-width:760px){.v569-onboarding-real p,.v569-real-onboarding-note small{font-size:12px}}
`;document.head.appendChild(v569Style);
// ===== FIM COLAB V5.69 =====

// ===== COLAB V5.70 — RELATÓRIO PDF DO ONBOARDING =====
function onboardingReportValueV570(value){
  if(Array.isArray(value))return value.length?value.join(' · '):'Não informado';
  if(value&&typeof value==='object'){
    let parts=Object.entries(value).filter(([,item])=>item!==null&&item!==undefined&&String(item).trim()).map(([key,item])=>`${onboardingAnswerLabelV569(key)}: ${Array.isArray(item)?item.join(' · '):item}`);
    return parts.length?parts.join(' | '):'Não informado'
  }
  return String(value??'').trim()||'Não informado'
}

function generateOnboardingPdfV570(){
  let reportWindow=window.open('','_blank');
  if(!reportWindow){toast('Autorize a abertura da nova janela para gerar o PDF.');return}
  let client=cl(MD?.id),data=onboardingViewV430||(D.onboardings||[]).find(row=>row.client_id===MD?.id)||{},answers=data.answers||{},known=Object.keys(onboardingLabelsV430),keys=[...known.filter(key=>Object.prototype.hasOwnProperty.call(answers,key)),...Object.keys(answers).filter(key=>!known.includes(key))],status=data.status==='completed'?'Finalizado':'Em preenchimento',updated=data.updated_at?fmtDate(String(data.updated_at).slice(0,10)):'Data não informada',generated=new Intl.DateTimeFormat('pt-BR',{dateStyle:'long',timeStyle:'short'}).format(new Date()),rows=keys.map((key,index)=>`<section class="answer"><span>${String(index+1).padStart(2,'0')}</span><div><small>${E(onboardingAnswerLabelV569(key))}</small><p>${E(onboardingReportValueV570(answers[key]))}</p></div></section>`).join('');
  let report=`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Onboarding — ${E(client?.name||'Cliente')}</title><style>
  :root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#ece9e4;color:#171513;font-family:Arial,Helvetica,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}.toolbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:center;gap:12px;padding:12px;background:#111;color:#fff}.toolbar button{min-height:44px;padding:0 18px;border:0;border-radius:12px;background:#ff6500;color:#fff;font-weight:800}.toolbar small{color:#aaa}.sheet{width:min(210mm,100%);min-height:297mm;margin:22px auto;background:#fff;box-shadow:0 18px 60px #0002}.cover{position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr;align-items:center;gap:22px;padding:28mm 18mm 18mm;background:#090909;color:#fff}.cover:after{content:"";position:absolute;right:-30mm;top:-34mm;width:100mm;height:100mm;border-radius:50%;background:radial-gradient(circle,#ff650044,transparent 66%)}.brand{position:relative;z-index:1;width:28mm;height:28mm;border-radius:9mm;object-fit:cover;box-shadow:0 0 32px #ff650033}.kicker{position:relative;z-index:1;color:#ff6500;font-size:10px;font-weight:900;letter-spacing:.18em}.cover h1{position:relative;z-index:1;margin:7px 0 5px;font-size:30px;line-height:1.05}.cover p{position:relative;z-index:1;margin:0;color:#aaa;font-size:12px}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#ddd}.meta div{padding:14px 18px;background:#f7f5f2}.meta small,.answer small{display:block;color:#8d8178;font-size:9px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.meta b{display:block;margin-top:5px;font-size:12px}.content{padding:14mm 18mm 18mm}.intro{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:10mm;padding-bottom:6mm;border-bottom:2px solid #161412}.intro h2{margin:0;font-size:21px}.intro p{max-width:72mm;margin:0;color:#777;font-size:10px;line-height:1.5;text-align:right}.answer{display:grid;grid-template-columns:10mm 1fr;gap:5mm;padding:6mm 0;border-bottom:1px solid #e7e2dc;break-inside:avoid;page-break-inside:avoid}.answer>span{display:grid;place-items:center;width:9mm;height:9mm;border-radius:50%;background:#fff0e6;color:#ff6500;font-size:9px;font-weight:900}.answer p{margin:5px 0 0;font-size:12px;line-height:1.6;white-space:pre-wrap}.empty{padding:18mm;border:1px dashed #cfc8c0;border-radius:16px;color:#777;text-align:center}.footer{display:flex;justify-content:space-between;gap:20px;margin-top:12mm;padding-top:5mm;border-top:1px solid #ded8d2;color:#89817a;font-size:8px}.footer b{color:#ff6500;letter-spacing:.13em}.hint{display:none}@media(max-width:700px){.toolbar{align-items:stretch;flex-direction:column;text-align:center}.sheet{margin:0;min-height:100vh;box-shadow:none}.cover{grid-template-columns:1fr;padding:18mm 10mm 12mm}.brand{width:24mm;height:24mm}.meta{grid-template-columns:1fr}.content{padding:10mm}.intro{align-items:flex-start;flex-direction:column}.intro p{text-align:left}.hint{display:block}}@media print{@page{size:A4;margin:0}.toolbar{display:none}.sheet{width:210mm;margin:0;box-shadow:none}.cover{padding-top:22mm}.hint{display:none}}
  </style></head><body><div class="toolbar"><small>Relatório pronto para PDF</small><button onclick="window.print()">Salvar ou compartilhar PDF</button></div><main class="sheet"><header class="cover"><img class="brand" src="${COLAB_LOGO_FULL_V555}" alt="Colab"><div><span class="kicker">ECOSSISTEMA COLAB</span><h1>Relatório de onboarding</h1><p>Estratégia construída a partir da conversa com a cliente.</p></div></header><section class="meta"><div><small>Cliente</small><b>${E(client?.name||'Cliente')}</b></div><div><small>Status</small><b>${E(status)}</b></div><div><small>Atualização</small><b>${E(updated)}</b></div></section><div class="content"><div class="intro"><h2>Respostas do onboarding</h2><p>Registro centralizado para orientar estratégia, conteúdo, atendimento e próximos passos.</p></div>${rows||'<div class="empty">Este onboarding ainda não possui respostas registradas.</div>'}<footer class="footer"><b>COLAB · STORYMAKER &amp; CONTEÚDO</b><span>Gerado em ${E(generated)}</span></footer></div></main><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),500))<\/script></body></html>`;
  reportWindow.document.open();reportWindow.document.write(report);reportWindow.document.close();reportWindow.focus()
}

const _onboardingModalV570Base=onboardingModalV430;
onboardingModalV430=function(){
  let html=_onboardingModalV570Base();
  return html.replace('<button class="btn ghost small" data-close>Fechar</button>','<div class="v570-report-actions"><button class="btn pri small" data-onboarding-pdf>Gerar relatório em PDF</button><button class="btn ghost small" data-close>Fechar</button></div>')
};

const _bindV570Base=bind;
bind=function(){_bindV570Base();document.querySelector('[data-onboarding-pdf]')?.addEventListener('click',generateOnboardingPdfV570)};

const v570Style=document.createElement('style');v570Style.textContent=`
.v570-report-actions{display:flex;align-items:center;gap:8px}.v570-report-actions .btn{white-space:nowrap}
@media(max-width:760px){.v570-report-actions{width:100%;display:grid;grid-template-columns:1fr}.v570-report-actions .btn{width:100%;min-height:44px}.modal .head:has(.v570-report-actions){align-items:stretch;flex-direction:column}}
`;document.head.appendChild(v570Style);
// ===== FIM COLAB V5.70 =====

// ===== COLAB V5.71 — BRIEFING STORYMAKER SEM CADASTRO =====
function storyOnlyClientV571(clientId){
  let active=(D.services||[]).filter(item=>item.client_id===clientId&&item.active);
  return active.some(item=>item.service==='storymaker')&&!active.some(item=>item.service==='social_media')
}

function storyPublicAccessPanelV571(client){
  let events=storyEventsForClientV433(client.id),event=events.find(item=>{let briefing=storyBriefingForEventV433(item.id);return briefing&&!briefing.submitted_at})||events[0],briefing=event&&storyBriefingForEventV433(event.id),link=briefing?.public_token?storyPublicUrl(briefing.public_token):'';
  return `<div class="portal-access-control-v431 v571-public-briefing"><div class="portal-access-label-v431"><div><b>Briefing do evento</b><span>LINK PÚBLICO · SEM CADASTRO E SEM LOGIN</span></div><span class="portal-access-status-v431 ${briefing?.submitted_at?'active':''}">${briefing?.submitted_at?'RESPONDIDO':link?'PRONTO PARA ENVIAR':'CRIAR BRIEFING'}</span></div><p>${link?`Envie este link para ${E(client.name)}. Eles apenas abrem, preenchem e salvam — não precisam criar conta.`:'Cadastre o evento StoryMaker e gere o briefing para criar o link público.'}</p>${event?`<div class="v571-event-name"><small>EVENTO</small><b>${E(event.title||'Evento StoryMaker')}</b>${event.starts_at?`<span>${fmtDate(String(event.starts_at).slice(0,10))}</span>`:''}</div>`:''}<div class="portal-access-row-v431"><input value="${E(link||'Link ainda não gerado')}" readonly aria-label="Link público do briefing, sem cadastro">${event?`<button type="button" class="btn pri small" data-copystorylink-v433="${event.id}">${link?'Copiar briefing sem login':'Gerar briefing'}</button>`:''}</div><small>Não use “acesso ao portal” para este serviço. O portal com conta é destinado às clientes de Social Media.</small></div>`
}

const _clientAccessPanelV571Base=clientAccessPanelV431;
clientAccessPanelV431=function(client){return storyOnlyClientV571(client?.id)?storyPublicAccessPanelV571(client):_clientAccessPanelV571Base(client)};

const _prepareClientAccessV571Base=prepareClientAccessV431;
prepareClientAccessV431=async function(clientId){
  if(!storyOnlyClientV571(clientId))return _prepareClientAccessV571Base(clientId);
  let event=storyEventsForClientV433(clientId).find(item=>{let briefing=storyBriefingForEventV433(item.id);return briefing&&!briefing.submitted_at})||storyEventsForClientV433(clientId)[0];
  if(!event)return toast('Cadastre o evento para gerar o briefing');
  return copyStoryLinkV433(event.id)
};

const _storyLinkCardsV571Base=storyLinkCardsV433;
storyLinkCardsV433=function(clientId,compact=false){
  let html=_storyLinkCardsV571Base(clientId,compact);
  return html.replaceAll('Copiar link do evento','Copiar briefing sem login').replaceAll('Gerar link do evento','Gerar briefing sem login')
};

const _clientLinksModalV571Base=clientLinksModalV433;
clientLinksModalV433=function(clientId){
  let html=_clientLinksModalV571Base(clientId);
  if(clientHasStoryV433(clientId))html=html.replace('O mesmo endereço começa com o briefing e passa a mostrar as entregas quando os materiais forem liberados.','Este é o link para enviar aos noivos. Ele abre direto, sem cadastro e sem login; depois passa a mostrar as entregas quando os materiais forem liberados.');
  return html
};

const v571Style=document.createElement('style');v571Style.textContent=`
.v571-public-briefing{border-color:#2d6541;background:linear-gradient(145deg,#102018,#111)}.v571-public-briefing .portal-access-label-v431>div span{color:#7ddd9a}.v571-event-name{display:grid;grid-template-columns:1fr auto;gap:4px 12px;margin:12px 0;padding:12px;border:1px solid #294634;border-radius:11px;background:#0d1711}.v571-event-name small{grid-column:1/3;color:#63816c;font-size:8px;font-weight:900;letter-spacing:.13em}.v571-event-name b{font-size:12px}.v571-event-name span{color:#8caa95;font-size:10px}.v571-public-briefing>small{color:#8da696}
@media(max-width:620px){.v571-public-briefing .portal-access-row-v431{grid-template-columns:1fr}.v571-event-name b{font-size:14px}.v571-event-name span{font-size:12px}}
`;document.head.appendChild(v571Style);
// ===== FIM COLAB V5.71 =====

// ===== COLAB V5.72 — ROTAS PÚBLICAS ANTES DO LOGIN =====
storyPublicUrl=function(token){let url=new URL(location.origin+location.pathname);url.searchParams.set('story',token);url.searchParams.set('v','5.72');return url.href};
const _bootV572Base=boot;
boot=async function(){
  let params=new URLSearchParams(location.search),storyToken=params.get('story'),portalToken=params.get('portal'),accessToken=params.get('acesso');
  if(storyToken)return storyPublicBoot(storyToken);
  if(portalToken)return clientPortalShareBootV429(portalToken);
  if(accessToken)return clientAccessBootV431(accessToken);
  return _bootV572Base()
};
// ===== FIM COLAB V5.72 =====

// ===== COLAB V5.73 — DNA VISÍVEL E VOLTAR CONTEXTUAL =====
clientLabSpotlightV564=function(cid){
  let metrics=clientLabMetricsV564(cid),client=cl(cid)||{},dna=contentDnaV561(cid),dnaLabel=dna?'Editar DNA':'Preencher DNA';
  return '<section class="v564-lab-spotlight v573-lab-spotlight"><div class="v564-lab-intro"><span>✦</span><div><small>NÚCLEO CRIATIVO DA CLIENTE</small><h3>Laboratório de Conteúdo</h3><p>A estratégia, as referências e os aprendizados de '+E(client.name||'cada cliente')+' entram em toda nova criação.</p></div></div><div class="v564-lab-glance"><button type="button" class="v573-dna-metric '+(metrics.dna?'':'empty')+'" data-client-dna-v564="'+E(cid)+'"><b>'+metrics.dna+'%</b><span>DNA</span><em>'+(metrics.dna?'Abrir':'Preencher agora')+' →</em></button><span><b>'+metrics.review+'</b> em revisão</span><span><b>'+metrics.approved+'</b> aprovados</span></div>'+(metrics.dna?'':'<div class="v573-dna-alert"><span>!</span><div><b>O DNA desta cliente ainda não foi configurado.</b><small>Preencha a persona, o posicionamento e o padrão de conteúdo antes de criar novas peças.</small></div></div>')+'<div class="v564-lab-actions v573-lab-actions"><button class="btn '+(metrics.dna?'ghost':'pri')+'" data-client-dna-v564="'+E(cid)+'">'+dnaLabel+'</button><button class="btn ghost" data-client-strategy-open-v564="'+E(cid)+'">Ver estratégia</button><button class="btn pri" data-client-lab-new-v564="'+E(cid)+'">＋ Criar conteúdo</button></div></section>'
};

function applyClientHubOrderV573(){
  if(V!=='clientHub'||!clientHubIdV5)return;
  let active=clientHubTabsV563[clientHubIdV5]||'services',tabs=document.querySelector('.v563-client-tabs'),pane=active==='strategy'?document.querySelector('.v564-strategy-pane'):active==='lab'?document.querySelector('.v564-lab-pane'):null;
  if(tabs&&pane)tabs.insertAdjacentElement('afterend',pane);
  if(active==='strategy'&&pane&&!contentDnaV561(clientHubIdV5)&&!pane.querySelector('.v573-strategy-empty')){
    let banner=document.createElement('section');banner.className='v573-strategy-empty';banner.innerHTML='<span>✦</span><div><small>PRIMEIRO PASSO</small><b>Construa o DNA de '+E(cl(clientHubIdV5)?.name||'cliente')+'</b><p>É aqui que ficam persona, posicionamento, tom de voz, regras e identidade visual.</p></div><button class="btn pri">Preencher DNA agora →</button>';
    pane.querySelector('.head')?.insertAdjacentElement('afterend',banner);
    banner.querySelector('button').onclick=function(){contentClient=clientHubIdV5;MD={type:'contentDnaV561'};render()}
  }
}

function returnToClientHubV573(){
  let cid=contentClient;if(!cid){V='clients';MD=null;render();return}
  let tab=contentMode==='lab'?'lab':'strategy';clientHubIdV5=cid;clientHubTabsV563[cid]=tab;MD=null;V='clientHub';render();
  requestAnimationFrame(function(){document.getElementById(tab)?.scrollIntoView({behavior:'smooth',block:'start'})})
}

function renderContextBackV573(){
  document.querySelectorAll('.v573-context-back').forEach(function(row){row.remove()});
  if(V!=='content'||!contentClient)return;
  let main=document.querySelector('.main');if(!main)return;
  let button=document.createElement('button');button.type='button';button.className='v573-context-back';button.innerHTML='<span>←</span><div><small>VOLTAR PARA A CLIENTE</small><b>'+E(cl(contentClient)?.name||'Cliente')+'</b></div><em>Clientes › '+E(cl(contentClient)?.name||'Cliente')+' › '+(contentMode==='lab'?'Laboratório':'Estratégia')+'</em>';
  button.onclick=returnToClientHubV573;main.insertAdjacentElement('afterbegin',button)
}

function labelModalBackV573(html){
  return html.replace('<button class="btn ghost small" data-close>✕</button>','<button class="btn ghost small v573-modal-back" data-close>← Voltar</button>')
}

const _contentDnaModalV573Base=contentDnaModalV561;
contentDnaModalV561=function(){return labelModalBackV573(_contentDnaModalV573Base())};
const _strategyModalV573Base=strategyModal;
strategyModal=function(){return labelModalBackV573(_strategyModalV573Base())};
const _pillarsModalV573Base=pillarsModal;
pillarsModal=function(){return labelModalBackV573(_pillarsModalV573Base())};

const _bindV573Base=bind;
bind=function(){
  _bindV573Base();
  applyClientHubOrderV573();
  renderContextBackV573()
};

const v573Style=document.createElement('style');v573Style.textContent=`
.v573-lab-spotlight{grid-template-columns:minmax(0,1.3fr) auto}.v573-lab-spotlight .v564-lab-glance{grid-column:auto}.v573-dna-metric{min-width:94px;padding:10px;border:1px solid #71401f;border-radius:12px;background:#19110d;color:#fff;text-align:left}.v573-dna-metric b,.v573-dna-metric span,.v573-dna-metric em{display:block}.v573-dna-metric b{font-size:22px}.v573-dna-metric span{margin-top:3px;color:#888;font-size:8px;font-weight:900;text-transform:uppercase}.v573-dna-metric em{margin-top:7px;color:#ff7a2f;font-size:8px;font-style:normal;font-weight:900}.v573-dna-metric.empty{border-color:#ff6a00;background:#2c160a;box-shadow:0 0 0 4px rgba(255,106,0,.08)}.v573-dna-alert{grid-column:1/-1;display:flex;align-items:center;gap:12px;padding:13px 14px;border:1px solid #7a431f;border-radius:13px;background:#27160d}.v573-dna-alert>span{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#ff6a00;color:#111;font-weight:950}.v573-dna-alert b,.v573-dna-alert small{display:block}.v573-dna-alert b{font-size:12px}.v573-dna-alert small{margin-top:4px;color:#b4937f;font-size:9px;line-height:1.45}.v573-lab-actions{grid-column:1/-1;display:grid!important;grid-template-columns:1fr 1fr 1.25fr!important}.v573-strategy-empty{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:13px;margin:0 0 16px;padding:15px;border:1px solid #75401e;border-radius:15px;background:linear-gradient(135deg,#29160b,#14110f)}.v573-strategy-empty>span{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:#ff6a00;color:#111;font-size:18px}.v573-strategy-empty small,.v573-strategy-empty b{display:block}.v573-strategy-empty small{color:#ff7e37;font-size:8px;font-weight:950;letter-spacing:.13em}.v573-strategy-empty b{margin-top:4px}.v573-strategy-empty p{margin:5px 0 0;color:#917b6e;font-size:10px}.v573-context-back{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:11px;width:100%;margin:0 0 13px;padding:11px 14px;border:1px solid #39312c;border-radius:14px;background:#12110f;color:#fff;text-align:left}.v573-context-back>span{display:grid;place-items:center;width:35px;height:35px;border-radius:11px;background:#24211f;color:#ff7a31;font-size:20px}.v573-context-back small,.v573-context-back b{display:block}.v573-context-back small{color:#777;font-size:8px;letter-spacing:.11em}.v573-context-back b{margin-top:3px;font-size:13px}.v573-context-back em{color:#736b66;font-size:9px;font-style:normal}.v573-context-back:hover{border-color:#7b4322;background:#18130f}.v573-modal-back{white-space:nowrap}
@media(max-width:760px){.v573-lab-spotlight{grid-template-columns:1fr}.v573-lab-spotlight .v564-lab-glance{grid-column:1}.v573-dna-alert{align-items:flex-start}.v573-dna-alert b{font-size:14px}.v573-dna-alert small{font-size:12px}.v573-lab-actions{grid-template-columns:1fr 1fr!important}.v573-lab-actions .btn:last-child{grid-column:1/-1}.v573-dna-metric{min-height:74px}.v573-dna-metric em{font-size:10px}.v573-strategy-empty{grid-template-columns:auto 1fr;padding:14px}.v573-strategy-empty .btn{grid-column:1/-1;width:100%}.v573-strategy-empty p{font-size:12px;line-height:1.45}.v573-context-back{position:sticky;top:8px;z-index:18;grid-template-columns:auto 1fr;margin-bottom:12px;box-shadow:0 8px 22px #0008}.v573-context-back em{grid-column:1/-1;padding-left:46px;font-size:10px}.v573-context-back small{font-size:9px}.v573-context-back b{font-size:14px}}
`;document.head.appendChild(v573Style);
// ===== FIM COLAB V5.73 =====

// ===== COLAB V5.74 — CÓDIGOS HEX NA PALETA DO DNA =====
function dnaHexFieldsV574(html){
  html=html.replace('<div class="v561-color-grid">','<p class="v574-color-note">Cole o código HEX exato ou toque na amostra para escolher visualmente.</p><div class="v561-color-grid v574-color-grid">');
  return html.replace(/<input type="color" name="(primary_color|secondary_color|accent_color)" value="([^"]+)">/g,function(_,name,value){
    return '<div class="v574-color-control"><input type="color" data-dna-color-picker="'+name+'" value="'+value+'" aria-label="Selecionar cor"><input type="text" name="'+name+'" data-dna-color-hex="'+name+'" value="'+value.toUpperCase()+'" maxlength="7" inputmode="text" autocomplete="off" spellcheck="false" placeholder="#3A4636" aria-label="Código hexadecimal da cor"></div>'
  })
}

const _contentDnaModalV574Base=contentDnaModalV561;
contentDnaModalV561=function(){return dnaHexFieldsV574(_contentDnaModalV574Base())};

function normalizeDnaHexV574(value){
  let clean=String(value||'').trim().toUpperCase().replace(/[^0-9A-F#]/g,'');
  if(clean&&!clean.startsWith('#'))clean='#'+clean;
  return clean.slice(0,7)
}

function bindDnaHexV574(){
  document.querySelectorAll('[data-dna-color-picker]').forEach(function(picker){
    picker.addEventListener('input',function(){let hex=document.querySelector('[data-dna-color-hex="'+picker.dataset.dnaColorPicker+'"]');if(hex){hex.value=picker.value.toUpperCase();hex.classList.remove('invalid')}})
  });
  document.querySelectorAll('[data-dna-color-hex]').forEach(function(hex){
    hex.addEventListener('input',function(){let value=normalizeDnaHexV574(hex.value);hex.value=value;let picker=document.querySelector('[data-dna-color-picker="'+hex.dataset.dnaColorHex+'"]');if(/^#[0-9A-F]{6}$/.test(value)){if(picker)picker.value=value;hex.classList.remove('invalid')}else hex.classList.add('invalid')});
    hex.addEventListener('blur',function(){let value=normalizeDnaHexV574(hex.value);if(/^#[0-9A-F]{6}$/.test(value)){hex.value=value;hex.classList.remove('invalid')}})
  })
}

const _bindV574Base=bind;
bind=function(){_bindV574Base();bindDnaHexV574()};

const v574Style=document.createElement('style');v574Style.textContent=`
.v574-color-note{margin:2px 0 9px;color:#888;font-size:9px;line-height:1.45}.v574-color-grid label{align-items:stretch;flex-direction:column;gap:8px}.v574-color-control{display:grid;grid-template-columns:44px 1fr;align-items:center;gap:8px}.v574-color-control input[type=color]{width:44px;height:38px;border:1px solid #3b3b3b;border-radius:9px;background:#0d0d0d}.v574-color-control input[type=text]{min-width:0;height:38px;padding:0 10px;border:1px solid #393939;border-radius:9px;background:#0c0c0c;color:#fff;font:800 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.04em;text-transform:uppercase}.v574-color-control input[type=text]:focus{border-color:#ff6a00;outline:none}.v574-color-control input[type=text].invalid{border-color:#9b4a37;background:#1c100d}
@media(max-width:620px){.v574-color-note{font-size:12px}.v574-color-grid{grid-template-columns:1fr!important}.v574-color-grid label{font-size:12px}.v574-color-control input[type=text]{font-size:15px}}
`;document.head.appendChild(v574Style);
// ===== FIM COLAB V5.74 =====

// ===== COLAB V5.75 — HEX MOBILE E VALIDAÇÃO AMIGÁVEL =====
const _saveContentDnaV575Base=saveContentDnaV561;
saveContentDnaV561=function(event){
  let form=event.currentTarget,invalid=null;
  ['primary_color','secondary_color','accent_color'].forEach(function(name){
    let input=form.elements[name],value=normalizeDnaHexV574(input?.value);
    if(input)input.value=value;
    if(!/^#[0-9A-F]{6}$/.test(value)&&!invalid)invalid=input
  });
  if(invalid){event.preventDefault();invalid.classList.add('invalid');invalid.focus();toast('Complete o código da cor com 6 caracteres. Ex.: #3A4636');return}
  return _saveContentDnaV575Base(event)
};

const v575Style=document.createElement('style');v575Style.textContent=`
.v574-color-grid label{width:100%}.v574-color-control{width:100%;grid-template-columns:52px minmax(0,1fr)}.v574-color-control input[type=color]{width:52px!important}.v574-color-control input[type=text]{display:block;width:100%!important;max-width:none!important;min-width:0!important;padding:0 12px!important}
@media(max-width:620px){.v574-color-control{grid-template-columns:58px minmax(0,1fr);gap:12px}.v574-color-control input[type=color]{width:58px!important;height:48px}.v574-color-control input[type=text]{height:48px;font-size:17px!important;letter-spacing:.06em}}
`;document.head.appendChild(v575Style);
// ===== FIM COLAB V5.75 =====

// ===== COLAB V5.76 — PALETA NATI EM UM TOQUE =====
const _contentDnaModalV576Base=contentDnaModalV561;
contentDnaModalV561=function(){
  let html=_contentDnaModalV576Base(),client=cl(contentClient)||{};
  if(!/(nati|nr cerimonial)/i.test(String(client.name||'')))return html;
  return html.replace('<p class="v574-color-note">Cole o código HEX exato ou toque na amostra para escolher visualmente.</p>','<div class="v576-palette-head"><p class="v574-color-note">Cole o código HEX exato ou toque na amostra para escolher visualmente.</p><button type="button" class="btn ghost small" data-apply-nati-palette>Aplicar paleta Nati Romani</button></div>')
};

function setDnaPaletteV576(){
  let palette={primary_color:'#3A4636',secondary_color:'#D7A7A6',accent_color:'#EBD9C6'};
  Object.entries(palette).forEach(function([name,value]){let hex=document.querySelector('[data-dna-color-hex="'+name+'"]'),picker=document.querySelector('[data-dna-color-picker="'+name+'"]');if(hex){hex.value=value;hex.classList.remove('invalid')}if(picker)picker.value=value});
  toast('Paleta Nati Romani aplicada ✓')
}

function repairDnaHexTypingV576(){
  document.querySelectorAll('[data-dna-color-hex]').forEach(function(oldInput){
    let input=oldInput.cloneNode(true);oldInput.replaceWith(input);
    input.addEventListener('input',function(){let raw=String(input.value||'').trim();let candidate=raw.startsWith('#')?raw:'#'+raw;let picker=document.querySelector('[data-dna-color-picker="'+input.dataset.dnaColorHex+'"]');if(/^#[0-9A-Fa-f]{6}$/.test(candidate)){input.classList.remove('invalid');if(picker)picker.value=candidate}else if(raw.length>=7)input.classList.add('invalid')});
    input.addEventListener('blur',function(){let value=normalizeDnaHexV574(input.value);input.value=value;if(/^#[0-9A-F]{6}$/.test(value)){input.classList.remove('invalid');let picker=document.querySelector('[data-dna-color-picker="'+input.dataset.dnaColorHex+'"]');if(picker)picker.value=value}else input.classList.add('invalid')})
  });
  document.querySelector('[data-apply-nati-palette]')?.addEventListener('click',setDnaPaletteV576)
}

const _bindV576Base=bind;
bind=function(){_bindV576Base();repairDnaHexTypingV576()};

const v576Style=document.createElement('style');v576Style.textContent=`
.v576-palette-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:2px 0 10px}.v576-palette-head .v574-color-note{margin:0}.v576-palette-head .btn{white-space:nowrap;border-color:#7a8877;color:#dce5d8}
@media(max-width:620px){.v576-palette-head{align-items:stretch;flex-direction:column}.v576-palette-head .btn{width:100%;min-height:48px;font-size:12px}}
`;document.head.appendChild(v576Style);
// ===== FIM COLAB V5.76 =====

// ===== COLAB V5.77 — PALETA NATI AUTOMÁTICA E SALVAMENTO SEGURO =====
const NATI_PALETTE_V577={primary_color:'#90A678',secondary_color:'#000000',accent_color:'#FFFFFF'};

function isNatiClientV577(){
  let client=cl(contentClient)||{};
  return /(nati|nr cerimonial)/i.test(String(client.name||''))
}

function applyNatiPaletteV577(root=document,notify=false){
  if(!isNatiClientV577())return;
  Object.entries(NATI_PALETTE_V577).forEach(function([name,value]){
    let hex=root.querySelector?.('[data-dna-color-hex="'+name+'"]'),picker=root.querySelector?.('[data-dna-color-picker="'+name+'"]');
    if(hex){hex.value=value;hex.classList.remove('invalid')}
    if(picker)picker.value=value
  });
  if(notify)toast('Paleta Nati Romani aplicada ✓')
}

const _contentDnaModalV577Base=contentDnaModalV561;
contentDnaModalV561=function(){
  return _contentDnaModalV577Base().replace('data-apply-nati-palette>','data-apply-nati-palette onclick="applyNatiPaletteV577(document,true)">')
};

const _saveContentDnaV577Base=saveContentDnaV561;
saveContentDnaV561=function(event){
  let form=event.currentTarget;
  if(isNatiClientV577()){
    Object.entries(NATI_PALETTE_V577).forEach(function([name,value]){
      let input=form.elements[name],picker=form.querySelector('[data-dna-color-picker="'+name+'"]');
      if(input){input.value=value;input.classList.remove('invalid')}
      if(picker)picker.value=value
    })
  }
  return _saveContentDnaV577Base(event)
};

const _bindV577Base=bind;
bind=function(){
  _bindV577Base();
  if(MD?.type==='contentDnaV561'&&isNatiClientV577())applyNatiPaletteV577(document,false)
};
// ===== FIM COLAB V5.77 =====

// ===== COLAB V5.78 — LABORATÓRIO SEM CUSTO: PROMPT PARA O CHATGPT =====
function labPromptLineV578(label,value){
  let text=Array.isArray(value)?value.filter(Boolean).join(', '):String(value||'').trim();
  return text?label+': '+text:''
}

function labOutputInstructionsV578(format){
  if(format==='reel')return 'Entregue: título; ângulo estratégico; sugestão de capa; roteiro cena a cena com imagem, fala ou narração, texto na tela e duração; direção de gravação e edição; legenda; CTA.';
  if(format==='stories')return 'Entregue uma sequência de 5 a 8 Stories. Para cada tela, informe objetivo, imagem ou cena, texto na tela e recurso de interação quando fizer sentido. Inclua fechamento e CTA.';
  if(format==='estatico')return 'Entregue: título principal; texto exato da arte; direção visual; legenda completa; CTA; justificativa estratégica.';
  return 'Entregue um carrossel de 7 a 10 telas. Para cada tela, informe função e texto curto. Inclua capa, progressão narrativa, fechamento, direção visual, legenda completa, CTA e justificativa estratégica.'
}

function labBuildPromptV578(kind='content'){
  let state=labStateV560(),client=cl(contentClient)||{},dna=contentDnaV561(contentClient)||{},plan=labPlanV560(contentClient),pillars=labPillarsV560(contentClient),references=contentReferencesV561(contentClient),selected=references.filter(function(row){return(state.selectedReferenceIds||[]).includes(row.id)}),topic=labCaptureTopicV560()||state.selectedPauta?.titulo||'',objective=labObjectiveLabelV562(state.objectiveType||'positioning'),format=labFormatLabelV560(state.format),lines=[];
  lines.push('Atue como estrategista de conteúdo e copywriter sênior para marcas de casamento.');
  lines.push('Crie um conteúdo autoral, específico e pronto para produção. Não use frases genéricas, clichês de casamento ou linguagem que pareça produzida por IA. Não invente fatos, depoimentos ou resultados.');
  lines.push('');
  lines.push('CLIENTE');
  lines.push(labPromptLineV578('Marca',client.name));
  lines.push(labPromptLineV578('Segmento',client.segment||client.area));
  lines.push(labPromptLineV578('Objetivo geral',client.objective));
  lines.push(labPromptLineV578('Plano ou foco do período',plan?.main_goal||plan?.theme));
  lines.push('');
  lines.push('PERSONA');
  lines.push(labPromptLineV578('Definição',dna.persona_name));
  lines.push(labPromptLineV578('Momento de vida',dna.audience_context));
  lines.push(labPromptLineV578('Resumo',dna.persona_summary));
  lines.push(labPromptLineV578('Dores',dna.pains));
  lines.push(labPromptLineV578('Desejos',dna.desires));
  lines.push(labPromptLineV578('Objeções',dna.objections));
  lines.push('');
  lines.push('POSICIONAMENTO E VOZ');
  lines.push(labPromptLineV578('Posicionamento',dna.positioning));
  lines.push(labPromptLineV578('Narrativa da marca',dna.brand_narrative));
  lines.push(labPromptLineV578('Tom de voz',dna.tone_of_voice));
  lines.push(labPromptLineV578('Vocabulário e recursos que usa',dna.vocabulary_use));
  lines.push(labPromptLineV578('O que deve evitar',dna.vocabulary_avoid));
  lines.push(labPromptLineV578('Promessa editorial',dna.content_promise));
  lines.push('');
  lines.push('PADRÃO EDITORIAL');
  lines.push(labPromptLineV578('Regras',dna.content_rules));
  lines.push(labPromptLineV578('Ganchos',dna.hook_pattern));
  lines.push(labPromptLineV578('Capas',dna.cover_pattern));
  lines.push(labPromptLineV578('Legendas',dna.caption_pattern));
  lines.push(labPromptLineV578('CTAs',dna.cta_pattern));
  lines.push(labPromptLineV578('Pilares',pillars.map(function(row){return row.name+(row.purpose||row.description?' — '+(row.purpose||row.description):'')})));
  lines.push('');
  lines.push('DIREÇÃO VISUAL E PRODUÇÃO');
  lines.push(labPromptLineV578('Direção visual',dna.visual_direction));
  if(/(nati|nr cerimonial)/i.test(String(client.name||''))){
    lines.push('Diretriz visual atual e prioritária: usar Athena como tipografia principal. Athena Light para títulos elegantes e frases curtas; Athena Bold para destaques e palavras-chave; Athena Inline somente em detalhes pontuais, nunca em textos longos.');
    lines.push('Paleta oficial atual: verde #90A678 como assinatura da marca; preto #000000 para contraste e autoridade; branco #FFFFFF para respiro e limpeza; marrom #3A3026 como apoio sofisticado. Não usar rosa ou champanhe como cores principais.');
  }
  lines.push(labPromptLineV578('Direção de Reels',dna.reel_direction));
  lines.push(labPromptLineV578('Direção de áudio',dna.audio_direction));
  lines.push(labPromptLineV578('Paleta',/(nati|nr cerimonial)/i.test(String(client.name||''))?['Verde #90A678','Preto #000000','Branco #FFFFFF','Marrom #3A3026']: [dna.primary_color,dna.secondary_color,dna.accent_color]));
  if(selected.length){lines.push(labPromptLineV578('Referências escolhidas',selected.map(function(row){return row.title+' — aproveitar: '+(row.takeaway||row.notes||'referência visual')+(row.avoid_copying?' — não copiar: '+row.avoid_copying:'')})))}
  lines.push('');
  lines.push('PEDIDO DESTA PEÇA');
  lines.push(labPromptLineV578('Papel estratégico',objective));
  lines.push(labPromptLineV578('Formato',format));
  lines.push(labPromptLineV578('Modelo visual',labStyleLabelV560(state.style)));
  lines.push(labPromptLineV578('Assunto',topic));
  lines.push(labPromptLineV578('Ênfase',state.tone));
  if(state.selectedPauta?.angulo)lines.push(labPromptLineV578('Ângulo inicial',state.selectedPauta.angulo));
  if(state.pendingRevision?.feedback)lines.push(labPromptLineV578('Ajuste solicitado',state.pendingRevision.feedback));
  if(state.requestVariation)lines.push('Crie uma alternativa realmente diferente da versão anterior sem sair da estratégia.');
  lines.push('');
  if(kind==='ideas'){
    lines.push('TAREFA: sugira 10 pautas fortes, diferentes entre si e conectadas ao DNA acima. Para cada pauta, apresente título, pilar, papel estratégico, ângulo e formato recomendado. Priorize bastidores reais, a Nati por trás do perfil, autoridade leve e carismática, acolhimento e segurança profissional.');
  }else if(kind==='structure'){
    lines.push('TAREFA: construa três estruturas narrativas diferentes para o assunto acima. Em cada opção, entregue gancho, desenvolvimento em tópicos, virada ou tensão, fechamento e CTA.');
  }else{
    lines.push('TAREFA: crie uma única versão completa e bem desenvolvida. '+labOutputInstructionsV578(state.format));
    lines.push('O conteúdo deve mostrar a Nati profissional por trás dos casamentos, combinando sensibilidade, presença, bastidores concretos e autoridade sem arrogância. Faça a noiva sentir acolhimento e segurança, não pressão de venda.');
  }
  lines.push('');
  lines.push('Revise antes de responder: elimine repetições, promessas vazias, clichês e frases que poderiam servir para qualquer cerimonialista.');
  return lines.filter(function(line,index,array){return line!==''||array[index-1]!==''}).join('\n').trim()
}

function labCopyPromptV578(notify=true){
  let state=labStateV560(),text=state.promptText||'';
  if(!text)return Promise.resolve(false);
  function legacyCopy(){let area=document.createElement('textarea');area.value=text;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();let ok=false;try{ok=document.execCommand('copy')}catch(error){}area.remove();return ok}
  let action=navigator.clipboard?.writeText?navigator.clipboard.writeText(text).then(function(){return true}).catch(legacyCopy):Promise.resolve(legacyCopy());
  return action.then(function(ok){if(notify)toast(ok?'Prompt completo copiado ✓':'Selecione o texto e copie manualmente.');return ok})
}

function labPromptViewV578(){
  let state=labStateV560();
  return '<div class="v578-prompt-view"><div class="v578-prompt-mark">✓</div><small class="ey">SEM CUSTO DE API</small><h2>Prompt estratégico pronto.</h2><p>Todo o DNA, a linha editorial e as escolhas desta peça já estão reunidos. Copie e cole no ChatGPT para gerar o conteúdo.</p><textarea id="labPromptTextV578" readonly>'+E(state.promptText||'')+'</textarea><div class="v560-stage-actions"><button class="btn ghost" data-lab-prompt-back>← Voltar e ajustar</button><button class="btn ghost" data-lab-prompt-copy>Copiar novamente</button><a class="btn pri" href="https://chatgpt.com/" target="_blank" rel="noopener" data-lab-prompt-open>Abrir o ChatGPT →</a></div></div>'
}

const _labStageV578Base=labStageV560;
labStageV560=function(){
  if(labStateV560().stage==='prompt')return '<section class="v560-lab-stage v578-prompt-stage">'+labPromptViewV578()+'</section>';
  return _labStageV578Base()
};

const _labConsoleV578Base=labConsoleV560;
labConsoleV560=function(){
  return _labConsoleV578Base().replace('✦ Criar conteúdo completo','✦ Copiar prompt para o ChatGPT').replace('✦ Sugerir ideias','✦ Copiar prompt de ideias')
};

labGenerateIdeasV560=async function(){
  let state=labStateV560();state.promptText=labBuildPromptV578('ideas');state.promptKind='ideas';state.error='';state.stage='prompt';render();requestAnimationFrame(function(){labCopyPromptV578(true)})
};

labSelectPautaV560=async function(index){
  let state=labStateV560(),pauta=labPautasV560()[Number(index)];if(!pauta)return;state.selectedPauta={...pauta};state.topic=pauta.titulo;state.structure=null;state.result=null;state.error='';state.stage='empty';render();toast('Pauta selecionada. Escolha o formato e copie o prompt.')
};

labRegenerateStructureV560=async function(){
  let state=labStateV560();state.promptText=labBuildPromptV578('structure');state.promptKind='structure';state.error='';state.stage='prompt';render();requestAnimationFrame(function(){labCopyPromptV578(true)})
};

labGenerateContentV560=async function(){
  let state=labStateV560(),topic=labCaptureTopicV560();if(!topic){state.error='Escreva um tema ou selecione uma pauta antes de criar.';render();return}
  state.topic=topic;state.promptText=labBuildPromptV578('content');state.promptKind='content';state.error='';state.stage='prompt';state.pendingRevision=null;state.requestVariation=false;render();requestAnimationFrame(function(){labCopyPromptV578(true)})
};

const _bindV578Base=bind;
bind=function(){
  _bindV578Base();
  document.querySelector('[data-lab-prompt-copy]')?.addEventListener('click',function(){labCopyPromptV578(true)});
  document.querySelector('[data-lab-prompt-open]')?.addEventListener('click',function(){labCopyPromptV578(false)});
  document.querySelector('[data-lab-prompt-back]')?.addEventListener('click',function(){labStateV560().stage='empty';render()})
};

const v578Style=document.createElement('style');v578Style.textContent=`
.v578-prompt-stage{display:grid;place-items:center}.v578-prompt-view{width:min(760px,100%);text-align:center}.v578-prompt-mark{display:grid;place-items:center;width:62px;height:62px;margin:0 auto 14px;border:1px solid #7a8877;border-radius:20px;background:#172017;color:#d7a7a6;font-size:25px;font-weight:950}.v578-prompt-view h2{margin:8px 0 10px;font-size:32px}.v578-prompt-view>p{max-width:580px;margin:0 auto 18px;color:#999;line-height:1.55}.v578-prompt-view textarea{width:100%;min-height:330px;padding:16px;border:1px solid #3a4636;border-radius:15px;background:#0d100d;color:#d8ddd6;font:500 11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;resize:vertical;text-align:left}.v578-prompt-view textarea:focus{outline:1px solid #d7a7a6}.v578-prompt-view .v560-stage-actions{justify-content:center}.v578-prompt-view .btn.pri{background:#3a4636;color:#fff}
@media(max-width:760px){.v578-prompt-view h2{font-size:25px}.v578-prompt-view textarea{min-height:360px;font-size:10px}.v578-prompt-view .v560-stage-actions{display:grid;grid-template-columns:1fr}.v578-prompt-view .btn{width:100%}}
`;document.head.appendChild(v578Style);
// ===== FIM COLAB V5.78 =====

// ===== COLAB V5.79 — PADRÃO VISUAL OFICIAL NATI ROMANI =====
const _contentDnaModalV579Base=contentDnaModalV561;
contentDnaModalV561=function(){
  let html=_contentDnaModalV579Base(),client=cl(contentClient)||{};
  if(!/(nati|nr cerimonial)/i.test(String(client.name||'')))return html;
  return html.replace('</div><div class="v561-color-grid v574-color-grid">','</div><div class="v579-brand-standard"><div><small>TIPOGRAFIA PRINCIPAL</small><b>Athena</b><span>Light para títulos · Bold para destaques · Inline apenas em detalhes</span></div></div><div class="v561-color-grid v574-color-grid">')
};

const v579Style=document.createElement('style');v579Style.textContent=`
.v579-brand-standard{display:grid;grid-template-columns:1fr;gap:8px;margin:10px 0 12px}.v579-brand-standard>div{padding:12px;border:1px solid #3a4636;border-radius:12px;background:#11150f}.v579-brand-standard small,.v579-brand-standard b,.v579-brand-standard span{display:block}.v579-brand-standard small{color:#90a678;font-size:7px;font-weight:950;letter-spacing:.12em}.v579-brand-standard b{margin:5px 0 4px;font-size:13px}.v579-brand-standard span{color:#999;font-size:8px;line-height:1.45}
@media(max-width:620px){.v579-brand-standard{grid-template-columns:1fr}.v579-brand-standard b{font-size:15px}.v579-brand-standard span{font-size:11px}}
`;document.head.appendChild(v579Style);
// ===== FIM COLAB V5.79 =====

// ===== COLAB V5.80 — IDENTIDADE VISUAL SEM REPETIÇÃO =====
const _contentDnaModalV580Base=contentDnaModalV561;
contentDnaModalV561=function(){
  let html=_contentDnaModalV580Base(),client=cl(contentClient)||{};
  if(!/(nati|nr cerimonial)/i.test(String(client.name||'')))return html;
  html=html.replace(/<button[^>]*data-apply-nati-palette[^>]*>[\s\S]*?<\/button>/,'');
  return html.replace('<div class="field"><label>Direção visual de posts e design</label>','<label class="v580-support-color">Complementar<div class="v574-color-control"><input type="color" data-dna-support-picker value="#3A3026" aria-label="Selecionar cor complementar"><input type="text" name="support_color" data-dna-support-hex value="#3A3026" maxlength="7" inputmode="text" autocomplete="off" spellcheck="false" placeholder="#3A3026" aria-label="Código hexadecimal da cor complementar"></div><small>Marrom de apoio para fundos, detalhes e contraste.</small></label><div class="field"><label>Direção visual de posts e design</label>')
};

const v580Style=document.createElement('style');v580Style.textContent=`
.v576-palette-head:has(.v574-color-note:only-child){display:block}.v580-support-color{display:flex;align-items:stretch;flex-direction:column;gap:8px;width:100%;margin:0 0 12px;padding:10px 12px;border:1px solid #3a3026;border-radius:11px;background:#15120f;color:#aaa;font-size:9px}.v580-support-color .v574-color-control{width:100%}.v580-support-color>small{color:#88786b;font-size:8px;line-height:1.4}
@media(max-width:620px){.v580-support-color{font-size:12px}.v580-support-color>small{font-size:10px}}
`;document.head.appendChild(v580Style);
// ===== FIM COLAB V5.80 =====

// ===== COLAB V5.81 — QUARTA COR EDITÁVEL E PERSISTENTE =====
function dnaSupportColorV581(dna=contentDnaV561(contentClient)||{}){
  let match=String(dna.visual_direction||'').match(/Cor complementar padronizada:\s*(#[0-9A-Fa-f]{6})/i);
  return(match?.[1]||'#3A3026').toUpperCase()
}

const _contentDnaModalV581Base=contentDnaModalV561;
contentDnaModalV561=function(){
  let html=_contentDnaModalV581Base(),color=dnaSupportColorV581();
  return html.replaceAll('data-dna-support-picker value="#3A3026"','data-dna-support-picker value="'+color+'"').replaceAll('data-dna-support-hex value="#3A3026"','data-dna-support-hex value="'+color+'"')
};

function bindDnaSupportColorV581(){
  let picker=document.querySelector('[data-dna-support-picker]'),hex=document.querySelector('[data-dna-support-hex]');
  if(picker&&hex)picker.addEventListener('input',function(){hex.value=picker.value.toUpperCase();hex.classList.remove('invalid')});
  if(hex)hex.addEventListener('input',function(){let value=normalizeDnaHexV574(hex.value);hex.value=value;if(/^#[0-9A-F]{6}$/.test(value)){hex.classList.remove('invalid');if(picker)picker.value=value}else hex.classList.add('invalid')})
}

const _saveContentDnaV581Base=saveContentDnaV561;
saveContentDnaV561=function(event){
  let form=event.currentTarget,support=form.elements.support_color;
  if(support){
    let color=normalizeDnaHexV574(support.value);
    if(!/^#[0-9A-F]{6}$/.test(color)){event.preventDefault();support.classList.add('invalid');support.focus();toast('Complete o código da cor complementar com 6 caracteres.');return}
    support.value=color;
    let visual=form.elements.visual_direction;if(visual){let clean=String(visual.value||'').replace(/\s*Cor complementar padronizada:\s*#[0-9A-Fa-f]{6}\.?/gi,'').trim();visual.value=(clean?clean+'\n\n':'')+'Cor complementar padronizada: '+color+'.'}
  }
  return _saveContentDnaV581Base(event)
};

const _labBuildPromptV581Base=labBuildPromptV578;
labBuildPromptV578=function(kind='content'){
  return _labBuildPromptV581Base(kind).replaceAll('#3A3026',dnaSupportColorV581())
};

const _bindV581Base=bind;
bind=function(){_bindV581Base();bindDnaSupportColorV581()};
// ===== FIM COLAB V5.81 =====

// ===== COLAB V5.82 — FICHA RESPEITA O SERVIÇO CONTRATADO =====
function clientActiveServicesV582(clientId){
  return (D.services||[]).filter(function(item){return item.client_id===clientId&&item.active}).map(function(item){return item.service})
}

function storymakerNucleusV582(clientId){
  let client=cl(clientId)||{},events=storyEventsForClientV433(clientId).slice().sort(function(a,b){return String(a.starts_at||'').localeCompare(String(b.starts_at||''))}),event=events.find(function(item){return String(item.starts_at||'').slice(0,10)>=today()})||events[0],briefing=event&&storyBriefingForEventV433(event.id),answered=!!briefing?.submitted_at;
  return '<section class="v582-story-spotlight"><div class="v582-story-intro"><span>◉</span><div><small>OPERAÇÃO STORYMAKER</small><h3>'+E(event?.title||client.name||'Evento')+'</h3><p>Briefing, cronograma, momentos importantes e entregas organizados para a cobertura.</p></div></div><div class="v582-story-status"><span><b>'+events.length+'</b> evento'+(events.length===1?'':'s')+'</span><span><b>'+(answered?'✓':briefing?'…':'—')+'</b> briefing '+(answered?'respondido':briefing?'em aberto':'a criar')+'</span>'+(event?.starts_at?'<span><b>'+E(fmtDate(String(event.starts_at).slice(0,10)))+'</b> data do evento</span>':'')+'</div><div class="v582-story-actions"><button class="btn pri" data-client-tab="forms">Abrir briefing</button><button class="btn ghost" data-client-tab="agenda">Ver cronograma</button><button class="btn ghost" data-client-tab="files">Arquivos e entregas</button></div></section>'
}

const _clientHubPageV582Base=clientHubPageV5;
clientHubPageV5=function(clientId){
  let services=clientActiveServicesV582(clientId),hasSocial=services.includes('social_media'),hasStory=services.includes('storymaker');
  if(!hasSocial&&['strategy','lab'].includes(clientHubTabsV563[clientId]))clientHubTabsV563[clientId]='services';
  let html=_clientHubPageV582Base(clientId);
  if(hasSocial)return html;

  html=html
    .replace(/<button[^>]*data-client-tab="strategy"[^>]*>[\s\S]*?<\/button>/,'')
    .replace(/<button[^>]*data-client-tab="lab"[^>]*>[\s\S]*?<\/button>/,'');

  let spotlightStart=html.indexOf('<section class="v564-lab-spotlight">'),tabsStart=html.indexOf('<div class="v5-client-tabs v563-client-tabs"');
  if(spotlightStart>=0&&tabsStart>spotlightStart){
    html=html.slice(0,spotlightStart)+(hasStory?storymakerNucleusV582(clientId):'')+html.slice(tabsStart)
  }
  return html
};

storyPublicUrl=function(token){let url=new URL(location.origin+location.pathname);url.searchParams.set('story',token);url.searchParams.set('v','5.82');return url.href};

const v582Style=document.createElement('style');v582Style.textContent=`
.v582-story-spotlight{display:grid;grid-template-columns:minmax(0,1.25fr) auto;gap:18px;margin:14px 0;padding:20px 21px;border:1px solid #623317;border-radius:20px;background:radial-gradient(circle at 82% 0,rgba(255,106,0,.2),transparent 34%),linear-gradient(145deg,#20140d,#111 68%)}.v582-story-intro{display:flex;align-items:center;gap:14px}.v582-story-intro>span{display:grid;place-items:center;width:50px;height:50px;flex:0 0 50px;border:1px solid #733916;border-radius:50%;background:#2b160a;color:#ff7b32;font-size:21px}.v582-story-intro small{color:#ff7b32;font-size:8px;font-weight:950;letter-spacing:.14em}.v582-story-intro h3{margin:5px 0 4px;font-size:22px}.v582-story-intro p{max-width:590px;margin:0;color:#8b8b8b;font-size:10px;line-height:1.45}.v582-story-status{grid-column:2;grid-row:1;display:flex;align-items:center}.v582-story-status span{min-width:92px;padding:10px 12px;border-left:1px solid #51301d;color:#777;font-size:7px;text-transform:uppercase}.v582-story-status b{display:block;margin-bottom:4px;color:#fff;font-size:17px}.v582-story-actions{grid-column:1/-1;display:flex;gap:8px;padding-top:15px;border-top:1px solid #352820}.v582-story-actions .btn{min-height:40px}
@media(max-width:760px){.v582-story-spotlight{grid-template-columns:1fr;padding:17px}.v582-story-intro{align-items:flex-start}.v582-story-intro>span{width:43px;height:43px;flex-basis:43px}.v582-story-intro h3{font-size:20px}.v582-story-intro p{font-size:12px}.v582-story-status{grid-column:1;grid-row:auto;display:grid;grid-template-columns:repeat(2,1fr)}.v582-story-status span{min-width:0;padding:9px}.v582-story-status span:last-child:nth-child(3){grid-column:1/-1}.v582-story-status b{font-size:15px}.v582-story-actions{display:grid;grid-template-columns:1fr 1fr}.v582-story-actions .btn:first-child{grid-column:1/-1}.v582-story-actions .btn{min-height:46px;font-size:12px}}
`;document.head.appendChild(v582Style);
// ===== FIM COLAB V5.82 =====



// ===== COLAB V6.54 — VISUALIZAR MODELO ANTES DA CÓPIA =====
function templatePreviewV654(template){
 const config=template?.config||{},sections=Array.isArray(config.sections)?config.sections:[],fields=Array.isArray(config.fields)?config.fields:[],questions=Array.isArray(config.questions)?config.questions:[];
 let rows=fields.length?fields:questions;
 return `<div class="modalbg"><div class="modal wide v654-template-preview"><div class="head"><div><small class="ey">PRÉ-VISUALIZAÇÃO DO MODELO</small><h2>${E(template?.name||'Modelo')}</h2><p class="muted">Confira a estrutura antes de criar uma cópia. Nada é alterado nesta visualização.</p></div><button class="btn ghost small" data-close>Fechar</button></div><div class="v654-preview-sections">${sections.map((section,index)=>`<section><span>${String(index+1).padStart(2,'0')}</span><div><b>${E(typeof section==='string'?section:(section.title||section.name||'Seção'))}</b>${typeof section==='object'&&section.description?`<p>${E(section.description)}</p>`:''}</div></section>`).join('')||'<div class="v5-empty-soft">Este modelo não possui seções nomeadas.</div>'}</div>${rows.length?`<div class="v654-preview-questions"><small class="ey">CAMPOS / PERGUNTAS</small>${rows.map((field,index)=>`<article><span>${String(index+1).padStart(2,'0')}</span><div><b>${E(typeof field==='string'?field:(field.label||field.question||field.title||field.name||'Campo'))}</b>${typeof field==='object'&&field.help?`<p>${E(field.help)}</p>`:''}</div></article>`).join('')}</div>`:''}<div class="actions"><button class="btn ghost" data-close>Voltar</button><button class="btn pri" data-template-use-v568="${E(template?.id||'')}">Criar uma cópia →</button></div></div></div>`;
}
const modalBeforeV654=modal;
modal=function(){if(MD?.type==='templatePreviewV654'){let t=(D.formTemplates||[]).find(x=>x.id===MD.templateId);return templatePreviewV654(t)}return modalBeforeV654()};
const templatesPageBeforeV654=templatesPageV5;
templatesPageV5=function(){let html=templatesPageBeforeV654();return html.replace(/<button class="btn pri" data-template-use-v568="([^"]+)">Criar uma cópia →<\/button>/g,'<div class="v654-template-actions"><button class="btn ghost" data-template-preview-v654="$1">Visualizar modelo</button><button class="btn pri" data-template-use-v568="$1">Criar uma cópia →</button></div>')};
const bindBeforeV654=bind;
bind=function(){bindBeforeV654();document.querySelectorAll('[data-template-preview-v654]').forEach(btn=>btn.onclick=()=>{MD={type:'templatePreviewV654',templateId:btn.dataset.templatePreviewV654};render()})};
const v654TemplateStyle=document.createElement('style');v654TemplateStyle.textContent=`.v654-template-actions{display:flex;gap:8px}.v654-template-actions .btn{min-height:42px}.v654-template-preview{max-width:780px}.v654-preview-sections,.v654-preview-questions{display:grid;gap:8px;margin-top:18px}.v654-preview-sections section,.v654-preview-questions article{display:grid;grid-template-columns:36px 1fr;gap:11px;align-items:start;padding:13px;border:1px solid #2d2d2d;border-radius:12px;background:#111}.v654-preview-sections span,.v654-preview-questions article>span{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:#21140d;color:#ff7b35;font-size:10px;font-weight:950}.v654-preview-sections b,.v654-preview-questions b{font-size:13px}.v654-preview-sections p,.v654-preview-questions p{margin:4px 0 0;color:#777;font-size:11px}.v654-preview-questions>.ey{margin:8px 0 2px}.v654-template-preview>.actions{margin-top:18px}@media(max-width:760px){.v654-template-actions{display:grid;grid-template-columns:1fr 1fr;width:100%}.v654-template-actions .btn{font-size:12px!important}.v654-template-preview{width:calc(100vw - 20px)!important}.v654-preview-sections b,.v654-preview-questions b{font-size:14px}.v654-preview-sections p,.v654-preview-questions p{font-size:12px}}`;document.head.appendChild(v654TemplateStyle);
// ===== FIM COLAB V6.54 MODELOS =====
