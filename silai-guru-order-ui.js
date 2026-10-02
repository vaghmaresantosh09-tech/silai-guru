/* SILAI GURU — clean New Order garment-first authoritative runtime v40 */
(function(){
  'use strict';

  const LADIES=['Kurti','Blouse','Saree','Salwar Suit','Gown','Lehenga','Frock','Choli','Dress','Plazo','Jacket','Kameez'];
  const GENTS=['Shirt','Pant','Kurta','Sherwani','Waistcoat','Blazer','Coat','T-Shirt','Shorts','Pajama','Suit','Night Wear'];

  function esc(v){
    if(typeof window.esc==='function') return window.esc(v);
    return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function icon(type){
    try{
      if(typeof window.garmentVisual==='function') return window.garmentVisual(type);
    }catch(_){ }
    const labels={Kurti:'👗',Blouse:'👚',Saree:'🥻','Salwar Suit':'👗',Gown:'👗',Lehenga:'👗',Frock:'👗',Choli:'👚',Dress:'👗',Plazo:'👖',Jacket:'🧥',Kameez:'👗',Shirt:'👔',Pant:'👖',Kurta:'👔',Sherwani:'🤵',Waistcoat:'🦺',Blazer:'🧥',Coat:'🧥','T-Shirt':'👕',Shorts:'🩳',Pajama:'👖',Suit:'🤵','Night Wear':'🥼'};
    return '<span aria-hidden="true" style="font-size:42px;line-height:1">'+(labels[type]||'👕')+'</span>';
  }
  function names(type){
    return typeof window.orderMeasurementNames==='function' ? window.orderMeasurementNames(type) : ['Height','Shoulder','Chest','Waist','Hip','Sleeve','Length'];
  }
  function categoryButtons(i,active){
    const list=active==='gents'?GENTS:LADIES;
    return '<div class="sg-v40-category-tabs">'+
      '<button type="button" class="sg-v40-category '+(active==='ladies'?'active':'')+'" onclick="sgV40Category('+i+',\'ladies\')">👩 Ladies Garments</button>'+
      '<button type="button" class="sg-v40-category '+(active==='gents'?'active':'')+'" onclick="sgV40Category('+i+',\'gents\')">👨 Gents Garments</button>'+
      '</div>'+list.map(t=>'<button type="button" class="sg-v40-type" onclick="sgV40Select('+i+',\''+String(t).replace(/'/g,"\\'")+'\')">'+icon(t)+'<b>'+esc(t)+'</b></button>').join('');
  }
  function picker(i,active){
    return '<div class="sg-v40-picker" id="garment-picker-'+i+'">'+
      '<div class="sg-v40-title">👗 Select Garment</div>'+
      '<div class="sg-v40-sub">Pehle garment select karein. Select karte hi neeche Measurements-1 khul jayega.</div>'+
      categoryButtons(i,active||'ladies')+
      '</div>';
  }
  function measurementFields(type,values){
    const vals=values||{};
    return names(type).map(n=>'<div class="field"><div style="display:flex;align-items:center;justify-content:space-between;gap:6px"><label>'+esc(n)+'</label><button type="button" class="remove-g sg-remove-measure" onclick="removeOrderMeasurement('+Number(this&&0)+',this.dataset.name)" data-name="'+esc(n)+'" title="Remove this measurement">−</button></div><input class="g-measure" data-name="'+esc(n)+'" placeholder="inches" value="'+esc(vals[n]||'')+'"></div>').join('');
  }
  function getValues(card){
    const out={};
    if(!card)return out;
    card.querySelectorAll('.g-measure').forEach(x=>{out[x.dataset.name]=x.value||''});
    return out;
  }
  function selected(i,type,values){
    const fields=names(type).map(n=>'<div class="field"><div style="display:flex;align-items:center;justify-content:space-between;gap:6px"><label>'+esc(n)+'</label><button type="button" class="remove-g sg-remove-measure" onclick="removeOrderMeasurement('+i+',this.dataset.name)" data-name="'+esc(n)+'" title="Remove this measurement">−</button></div><input class="g-measure" data-name="'+esc(n)+'" placeholder="inches" value="'+esc((values||{})[n]||'')+'"></div>').join('');
    const design=window.orderDesignTargets&&window.orderDesignTargets[i];
    return '<div class="sg-v40-selected" id="garment-'+i+'" data-selected-type="'+esc(type)+'" data-removed-measures="[]" data-removed-values="{}">'+
      '<div class="sg-v40-selected-head"><div class="sg-v40-selected-name">'+icon(type)+'<div><b>'+esc(type)+'</b><small>Garment selected</small></div></div><div class="sg-v40-actions"><button type="button" class="secondary" onclick="sgV40Rechoose('+i+')">Change</button>'+(i>0?'<button type="button" class="remove-g" onclick="removeGarment('+i+')">Remove</button>':'')+'</div></div>'+
      '<div class="sg-v40-measurements"><div class="sg-v40-measure-title">📏 Measurements-'+(i+1)+'</div><div class="sg-v40-measure-sub">Garment select ho gaya — measurements abhi se available hain.</div><div class="measure-grid g-fields sg-order-measures">'+fields+'</div></div>'+
      '<button type="button" class="sg-v40-design" onclick="sgV40Design('+i+')">'+(design?'✓ Change Design: '+esc(design.name):'🎨 Select Design (Optional)')+'</button>'+
      '<div id="selected-design-'+i+'">'+(design?'<div class="selected-design">✓ <b>'+esc(design.name)+'</b><br><small>'+esc(design.source||'SILAI GURU')+'</small></div>':'')+'</div>'+ 
      '</div>';
  }
  function css(){
    if(document.getElementById('sg-v40-order-style'))return;
    const s=document.createElement('style');s.id='sg-v40-order-style';s.textContent=`
      .sg-v40-picker,.sg-v40-selected{border:1px solid #ddd8ff;background:linear-gradient(145deg,#fbfaff,#f5f2ff);border-radius:16px;padding:12px;margin:10px 0}
      .sg-v40-title{font-size:17px;font-weight:900;color:#39324f;margin-bottom:4px}.sg-v40-sub,.sg-v40-measure-sub{font-size:12px;color:#77718b;margin-bottom:10px}
      .sg-v40-category-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}.sg-v40-category{border:1px solid #ddd8ff;background:#fff;border-radius:12px;padding:10px 6px;font-weight:900;color:#5144bd}.sg-v40-category.active{background:#5b4bdb;color:#fff}
      .sg-v40-type{border:1px solid #e2e0ec;background:#fff;border-radius:13px;min-height:100px;padding:7px 3px;display:inline-flex;width:calc(33.333% - 6px);margin:3px;vertical-align:top;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#202238}.sg-v40-type:hover{border-color:#5b4bdb;background:#f7f5ff}.sg-v40-type span,.sg-v40-type svg{width:58px;height:58px;display:flex;align-items:center;justify-content:center}.sg-v40-type svg{width:58px;height:58px}.sg-v40-type b{font-size:11px;line-height:1.1}
      .sg-v40-selected-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.sg-v40-selected-name{display:flex;align-items:center;gap:8px;font-size:16px;color:#39324f}.sg-v40-selected-name>span,.sg-v40-selected-name>svg{width:48px;height:48px}.sg-v40-selected-name small{display:block;color:#77718b;font-size:10px;font-weight:600;margin-top:2px}.sg-v40-actions{display:flex;gap:6px}.sg-v40-actions button{padding:7px 9px;font-size:11px}
      .sg-v40-measurements{margin-top:10px;padding:11px;background:#fff;border:1px solid #e4e0ff;border-radius:14px}.sg-v40-measure-title{font-size:16px;font-weight:900;color:#39324f;margin-bottom:2px}.sg-v40-measurements .measure-grid{margin-top:8px}.sg-v40-design{width:100%;margin-top:10px;background:#5b4bdb;color:#fff;border-radius:11px;padding:10px;font-weight:900}
      @media(max-width:430px){.sg-v40-type{width:calc(33.333% - 6px);min-height:92px}.sg-v40-type span,.sg-v40-type svg{width:52px;height:52px}}
    `;document.head.appendChild(s);
  }
  function ensureWrap(){
    let w=document.getElementById('garmentsWrap');
    const form=document.getElementById('orderForm');
    if(!form)return null;
    if(!w){w=document.createElement('div');w.id='garmentsWrap';const titles=[...form.querySelectorAll('.section-title')];const t=titles.find(x=>/Garments\s*&\s*Measurements/i.test(x.textContent));if(t)t.insertAdjacentElement('afterend',w);else form.insertBefore(w,form.firstChild)}
    return w;
  }
  function moveTop(){
    const w=document.getElementById('garmentsWrap'),form=document.getElementById('orderForm');if(!w||!form)return;
    const titles=[...form.querySelectorAll('.section-title')];
    const mt=titles.find(x=>/Measurements\s*-?\s*1/i.test(x.textContent))||titles.find(x=>/^Measurements$/i.test(x.textContent));
    if(mt&&mt.parentNode){const block=w.closest('.field')||w.parentElement;mt.parentNode.insertBefore(block,mt)}
  }
  function currentCategory(card){return card?.dataset.category||'ladies'}
  function valuesFor(card){return getValues(card)}
  window.sgV40Category=function(i,cat){const c=document.getElementById('garment-'+i)||document.getElementById('garment-picker-'+i);if(!c)return;c.outerHTML=picker(i,cat)};
  window.sgV40Select=function(i,type){
    const old=document.getElementById('garment-'+i);const vals=valuesFor(old);const p=document.getElementById('garment-picker-'+i);if(p)p.outerHTML=selected(i,type,vals);else if(old)old.outerHTML=selected(i,type,vals);moveTop();
  };
  window.sgV40Rechoose=function(i){const c=document.getElementById('garment-'+i);const vals=valuesFor(c);const cat=currentCategory(c);if(c)c.outerHTML=picker(i,cat);const p=document.getElementById('garment-picker-'+i);if(p)p.dataset.previousValues=JSON.stringify(vals);moveTop()};
  window.sgV40Design=function(i){
    if(typeof window.openOrderDesignPicker==='function')window.openOrderDesignPicker(i);
    else if(typeof window.openDesignCatalogForOrder==='function'){const c=document.getElementById('garment-'+i);window.openDesignCatalogForOrder(c?.dataset.selectedType||'Kurti',i)}
  };
  window.garmentCard=function(i,type,values){return type?selected(i,type,values||{}):picker(i,'ladies')};
  window.initGarments=function(){
    css();const w=ensureWrap();if(!w)return;
    if(!w.children.length)w.insertAdjacentHTML('beforeend',picker(0,'ladies'));
    moveTop();
  };
  window.addGarment=function(){const w=ensureWrap();if(!w)return;const i=w.children.length;w.insertAdjacentHTML('beforeend',picker(i,'ladies'));moveTop()};
  window.removeGarment=function(i){const w=document.getElementById('garmentsWrap'),c=document.getElementById('garment-'+i)||document.getElementById('garment-picker-'+i);if(w&&c&&w.children.length>1){c.remove();[...w.children].forEach((x,n)=>{const id=x.id;if(id&&/^garment(-picker)?-\d+$/.test(id)){x.id=id.replace(/(garment(?:-picker)?-)\d+$/, '$1'+n);x.querySelectorAll('[id]').forEach(el=>{if(/garmentCategoryGrid-|orderGarmentTypes-/.test(el.id))el.id=el.id.replace(/\d+$/,n)});}})}};
  function boot(){css();window.initGarments();[100,500,1200].forEach(t=>setTimeout(moveTop,t));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
