(function(){
  const STYLE_ID='colab-direct-delivery-style';
  if(!document.getElementById(STYLE_ID)){
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .v604-story-launch .colab-direct-delivery{min-height:46px!important;border-color:#ff6a00!important;background:#ff6a00!important;color:#fff!important}
      .colab-delivery-modal-bg{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.82);display:grid;place-items:center;padding:16px}
      .colab-delivery-modal{width:min(560px,100%);background:#171717;border:1px solid #3a3a3a;border-radius:22px;padding:22px;color:#fff;box-shadow:0 24px 70px rgba(0,0,0,.55)}
      .colab-delivery-modal .head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:18px}
      .colab-delivery-modal .head small{display:block;color:#ff6a00;font-weight:900;letter-spacing:.16em;font-size:11px}
      .colab-delivery-modal .head h2{margin:6px 0 4px;font-size:26px}
      .colab-delivery-modal .head p{margin:0;color:#888;line-height:1.45;font-size:13px}
      .colab-delivery-modal label{display:block;font-weight:800;margin:14px 0 7px}
      .colab-delivery-modal input,.colab-delivery-modal select{width:100%;box-sizing:border-box;min-height:48px;border:1px solid #383838;border-radius:12px;background:#0f0f0f;color:#fff;padding:0 13px;font:inherit}
      .colab-delivery-modal .actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
      .colab-delivery-modal button{min-height:48px;border-radius:12px;border:1px solid #3b3b3b;background:#151515;color:#fff;font-weight:900}
      .colab-delivery-modal button.pri{border-color:#ff6a00;background:#ff6a00}
      @media(max-width:760px){.v604-story-launch{grid-template-columns:1fr auto!important}.v604-story-launch>.colab-direct-delivery{grid-column:1/-1;width:100%!important}.colab-delivery-modal{padding:18px}.colab-delivery-modal .actions{grid-template-columns:1fr}.colab-delivery-modal .head h2{font-size:22px}}
    `;
    document.head.appendChild(s);
  }

  function addButtons(){
    document.querySelectorAll('.v604-story-launch').forEach(card=>{
      if(card.querySelector('.colab-direct-delivery')) return;
      const open=card.querySelector('[data-v604-story-open]');
      if(!open) return;
      const id=open.getAttribute('data-v604-story-open');
      const event=(typeof D!=='undefined'&&Array.isArray(D.events))?D.events.find(x=>String(x.id)===String(id)):null;
      const b=document.createElement('button');
      b.type='button';
      b.className='btn pri colab-direct-delivery';
      b.dataset.colabDelivery=id;
      b.textContent=event&&event.delivery_folder_url?'Editar entrega / Drive':'Adicionar entrega / Drive';
      open.insertAdjacentElement('afterend',b);
    });
  }

  function closeModal(){document.querySelector('.colab-delivery-modal-bg')?.remove();}

  function openDelivery(id){
    closeModal();
    const event=(typeof D!=='undefined'&&Array.isArray(D.events))?D.events.find(x=>String(x.id)===String(id)):null;
    if(!event){ if(typeof toast==='function') toast('Evento não encontrado'); return; }
    const bg=document.createElement('div');
    bg.className='colab-delivery-modal-bg';
    bg.innerHTML=`<div class="colab-delivery-modal" role="dialog" aria-modal="true">
      <div class="head"><div><small>ENTREGA / DRIVE</small><h2>Entrega do evento</h2><p>Cole a pasta completa do Drive e salve. Sem precisar sair do cliente.</p></div><button type="button" data-colab-close aria-label="Fechar">✕</button></div>
      <form data-colab-delivery-form>
        <label>Pasta completa do Google Drive</label>
        <input name="url" type="url" inputmode="url" placeholder="https://drive.google.com/..." required>
        <label>Status da entrega</label>
        <select name="status"><option value="pending">Aguardando entrega</option><option value="organizing">Organizando material</option><option value="delivered">Entrega concluída</option></select>
        <div class="actions"><button type="button" data-colab-close>Cancelar</button><button class="pri" type="submit">Salvar entrega</button></div>
      </form>
    </div>`;
    document.body.appendChild(bg);
    const form=bg.querySelector('[data-colab-delivery-form]');
    form.elements.url.value=event.delivery_folder_url||'';
    form.elements.status.value=event.delivery_status||'pending';
    bg.querySelectorAll('[data-colab-close]').forEach(x=>x.onclick=closeModal);
    bg.onclick=e=>{if(e.target===bg)closeModal();};
    form.onsubmit=async e=>{
      e.preventDefault();
      const url=String(form.elements.url.value||'').trim();
      const status=String(form.elements.status.value||'delivered');
      const submit=form.querySelector('button[type="submit"]');
      submit.disabled=true;submit.textContent='Salvando...';
      try{
        if(typeof patch!=='function') throw new Error('Não foi possível salvar agora');
        await patch('events',id,{delivery_folder_url:url||null,delivery_status:status,updated_at:new Date().toISOString()});
        if(typeof D!=='undefined'&&Array.isArray(D.events)){
          const row=D.events.find(x=>String(x.id)===String(id));
          if(row){row.delivery_folder_url=url||null;row.delivery_status=status;}
        }
        closeModal();
        if(typeof load==='function') await load();
        if(typeof render==='function') render();
        if(typeof toast==='function') toast('Entrega salva ✓');
      }catch(err){
        submit.disabled=false;submit.textContent='Salvar entrega';
        if(typeof toast==='function') toast(err?.message||'Erro ao salvar entrega');
      }
    };
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-colab-delivery]');
    if(!b) return;
    e.preventDefault();e.stopPropagation();
    openDelivery(b.dataset.colabDelivery);
  },true);

  const obs=new MutationObserver(addButtons);
  obs.observe(document.documentElement,{subtree:true,childList:true});
  addButtons();
})();
