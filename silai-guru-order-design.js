/* SILAI GURU — authoritative New Order Design Picker v1 */
(function(){
  'use strict';
  if(window.__sgOrderDesignPickerV1)return;
  window.__sgOrderDesignPickerV1=true;
  function esc(v){return typeof window.esc==='function'?window.esc(v):String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function getType(i){const c=document.getElementById('garment-'+i);return c?.dataset.selectedType||'Kurti';}
  function close(){document.getElementById('sg-order-design-picker')?.remove();}
  function open(i){
    const type=getType(i);
    let designs=[];
    try{designs=typeof window.garmentDesignsFor==='function'?(window.garmentDesignsFor(type)||[]):[]}catch(_){designs=[]}
    const modal=document.createElement('div');modal.id='sg-order-design-picker';
    modal.innerHTML='<div class="sg-odp-backdrop"></div><div class="sg-odp-modal"><div class="sg-odp-head"><b>🎨 '+esc(type)+' Design</b><button type="button" id="sg-odp-close">✕</button></div><div class="sg-odp-sub">'+esc(type)+' • Select Design (Optional)</div><div class="sg-odp-search"><input id="sg-odp-search" placeholder="🔎 Search '+esc(type)+' design..."></div><div id="sg-odp-grid" class="sg-odp-grid"></div></div>';
    document.body.appendChild(modal);
    const grid=modal.querySelector('#sg-odp-grid');
    function render(q=''){
      const query=q.trim().toLowerCase();
      const list=designs.filter(d=>!query||String(d.name||'').toLowerCase().includes(query));
      grid.innerHTML=list.length?list.map((d,n)=>'<div class="sg-odp-card"><div class="sg-odp-img">'+(d.image?'<img src="'+esc(d.image)+'" alt="'+esc(d.name||type)+'">':'<span>🎨</span>')+'</div><b>'+esc(d.name||('Design '+(n+1)))+'</b><small>'+esc(d.source||'SILAI GURU')+'</small><button type="button" class="sg-odp-select" data-id="'+esc(d.id||String(n))+'">✓ Select</button>'+(d.image?'<button type="button" class="sg-odp-show" data-image="'+esc(d.image)+'" data-title="'+esc(d.name||type)+'">👁️ Show</button>':'')+'</div>').join(''):'<div class="sg-odp-empty">Design nahi mila.</div>';
      grid.querySelectorAll('.sg-odp-select').forEach(b=>b.onclick=()=>{const d=list.find(x=>String(x.id||list.indexOf(x))===b.dataset.id);if(!d)return;window.orderDesignTargets=window.orderDesignTargets||{};window.orderDesignTargets[i]=d;const out=document.getElementById('selected-design-'+i);if(out)out.innerHTML='<div class="selected-design">✓ <b>'+esc(d.name||type)+'</b><br><small>'+esc(d.source||'SILAI GURU')+'</small></div>';const btn=document.querySelector('#garment-'+i+' .sg-v40-design');if(btn)btn.innerHTML='✓ Change Design: '+esc(d.name||type);close();});
      grid.querySelectorAll('.sg-odp-show').forEach(b=>b.onclick=()=>window.sgOpenBlouseViewer?window.sgOpenBlouseViewer(b.dataset.image,b.dataset.title):window.open(b.dataset.image,'_blank'));
    }
    modal.querySelector('#sg-odp-close').onclick=close;modal.querySelector('.sg-odp-backdrop').onclick=close;modal.querySelector('#sg-odp-search').oninput=e=>render(e.target.value);render();
  }
  window.openOrderDesignPicker=open;
  const s=document.createElement('style');s.textContent='#sg-order-design-picker{position:fixed;inset:0;z-index:2147483646}#sg-order-design-picker .sg-odp-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.48)}#sg-order-design-picker .sg-odp-modal{position:absolute;left:4%;right:4%;top:8%;bottom:6%;background:#fff;border-radius:20px;padding:14px;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.35)}.sg-odp-head{display:flex;justify-content:space-between;align-items:center;font-size:22px;color:#24243b}.sg-odp-head button{border:0;border-radius:12px;padding:10px 14px;font-size:20px}.sg-odp-sub{font-weight:800;color:#5144bd;margin:8px 0}.sg-odp-search input{width:100%;box-sizing:border-box;padding:13px;border:1px solid #ddd8ff;border-radius:12px;font-size:16px}.sg-odp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px}.sg-odp-card{border:1px solid #e2def5;border-radius:14px;padding:8px;background:#faf9ff;display:flex;flex-direction:column;gap:5px}.sg-odp-img{height:150px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:10px;background:#fff}.sg-odp-img img{width:100%;height:100%;object-fit:contain}.sg-odp-img span{font-size:48px}.sg-odp-card small{color:#77718b}.sg-odp-card button{border:0;border-radius:9px;padding:8px;font-weight:800}.sg-odp-select{background:#5b4bdb;color:#fff}.sg-odp-show{background:#eeeaff;color:#4035a0}.sg-odp-empty{text-align:center;padding:35px;color:#77718b}@media(max-width:430px){.sg-odp-grid{grid-template-columns:1fr 1fr}.sg-odp-img{height:125px}}';document.head.appendChild(s);
})();