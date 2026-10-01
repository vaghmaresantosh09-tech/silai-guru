/* SILAI GURU — FINAL New Order garment-first UI. One authoritative runtime. */
(function(){'use strict';
const LADIES=[['','Kurti'],['','Blouse'],['','Saree'],['','Salwar Suit'],['','Gown'],['','Lehenga'],['','Frock'],['','Choli'],['','Dress'],['','Plazo'],['','Jacket'],['','Kameez']];
const GENTS=[['','Shirt'],['','Pant'],['','Kurta'],['','Sherwani'],['','Waistcoat'],['','Blazer'],['','Coat'],['','T-Shirt'],['','Shorts'],['','Pajama'],['','Suit'],['','Night Wear']];
const P=(d)=>'<svg viewBox="0 0 64 64" aria-hidden="true"><path d="'+d+'" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/></svg>';
const ICONS={
Kurti:P('M25 7h14l4 12 9 6-7 10-7-5v27H26V30l-7 5-7-10 9-6z M29 7c0 5 6 5 6 0 M32 19v38'),
Blouse:P('M26 9h12l4 9 11 6-7 10-7-4v23H25V30l-7 4-7-10 11-6z M29 9c0 5 6 5 6 0'),
Saree:P('M23 8h15l4 11 10 7-7 8-7-5 8 27H16l9-27-7 5-7-8 10-7z M27 8c0 5 7 5 7 0 M21 28c8 5 16 5 24 1'),
'Salwar Suit':P('M25 8h14l4 11 8 6-7 9-7-5v9l8 20H36l-4-15-4 15H19l8-20v-9l-7 5-7-9 8-6z M29 8c0 5 6 5 6 0'),
Gown:P('M26 8h12l3 14 14 34H9l14-34z M29 8c0 5 6 5 6 0'),
Lehenga:P('M25 8h14l3 11 9 7-7 8-6-5v7l12 19H14l12-19v-7l-6 5-7-8 9-7z M29 8c0 5 6 5 6 0 M15 53h34'),
Frock:P('M26 8h12l3 14 13 31H10l13-31z M29 8c0 5 6 5 6 0'),
Choli:P('M25 9h14l3 9 9 6-7 9-6-4v8l10 19H16l10-19v-8l-6 4-7-9 9-6z M29 9c0 5 6 5 6 0'),
Dress:P('M26 8h12l4 15 11 31H11l11-31z M29 8c0 5 6 5 6 0'),
Plazo:P('M19 8h26l8 49H38l-6-27-6 27H11z M19 8h26 M24 16h16'),
Jacket:P('M24 8h16l4 12 10 7-7 10-7-5v23H24V32l-7 5-7-10 10-7z M28 8l4 11 4-11 M32 19v36'),
Kameez:P('M24 8h16l4 12 10 7-7 10-7-5v24H24V32l-7 5-7-10 10-7z M28 8c0 5 8 5 8 0 M32 20v36'),
Shirt:P('M24 8h16l4 11 11 7-6 12-8-5v23H23V33l-8 5-6-12 11-7z M28 8l4 9 4-9 M32 17v38'),
Pant:P('M19 8h26l8 49H38l-6-27-6 27H11z M19 8h26 M24 16h16'),
Kurta:P('M24 8h16l4 12 10 7-7 10-7-5v24H24V32l-7 5-7-10 10-7z M28 8c0 5 8 5 8 0 M32 20v36'),
Sherwani:P('M24 8h16l4 12 10 7-7 10-7-5v24H24V32l-7 5-7-10 10-7z M28 8c0 5 8 5 8 0 M32 20v36 M28 29h8 M28 38h8 M28 47h8'),
Waistcoat:P('M24 8l8 10 8-10 8 16-8 8v22H24V32l-8-8z M32 18v36 M27 34h10 M27 44h10'),
Blazer:P('M24 8h16l4 12 10 7-7 11-7-5v22H24V33l-7 5-7-11 10-7z M28 8l4 11 4-11 M32 19v36'),
Coat:P('M24 8h16l4 12 10 7-7 11-7-5v24H24V33l-7 5-7-11 10-7z M28 8c0 5 8 5 8 0 M32 20v36 M28 31h8 M28 42h8'),
'T-Shirt':P('M23 9l9 6 9-6 12 9-6 12-7-4v28H24V26l-7 4-6-12z M28 9c0 5 8 5 8 0'),
Shorts:P('M18 8h28l6 31H37l-5-12-5 12H12z M18 8h28 M32 8v19'),
Pajama:P('M18 8h28l7 49H37l-5-27-5 27H11z M18 8h28 M24 16h16'),
Suit:P('M24 8l8 10 8-10 9 19-7 7v21H22V34l-7-7z M32 18v37 M27 30l5 7 5-7'),
'Night Wear':P('M23 9h18l4 11 10 7-7 10-7-5v22H23V32l-7 5-7-10 10-7z M28 9c0 5 8 5 8 0 M32 20v34')
};
const icon=t=>ICONS[t]||P('M22 8h20l4 48H18z');
const esc=v=>typeof window.esc==='function'?window.esc(v):String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function css(){if(document.getElementById('sg-final-order-ui'))return;const s=document.createElement('style');s.id='sg-final-order-ui';s.textContent=`.sg-final-order{border:1px solid #ddd8ff;background:linear-gradient(145deg,#fbfaff,#f5f2ff);border-radius:16px;padding:12px;margin-bottom:12px}.sg-final-title{font-size:16px;font-weight:900;color:#39324f;margin-bottom:3px}.sg-final-sub{font-size:11px;color:#77718b;margin-bottom:10px}.sg-final-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}.sg-final-tab{border:1px solid #ddd8ff;background:#fff;border-radius:12px;padding:10px 6px;font-weight:900;color:#5144bd}.sg-final-tab.active{background:#5b4bdb;color:#fff}.sg-final-icons{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.sg-final-icon{border:1px solid #e2e0ec;background:#fff;border-radius:14px;min-height:90px;padding:7px 3px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px}.sg-final-icon span{font-size:31px;line-height:1}.sg-final-icon .sg-garment-svg{width:48px;height:48px;display:flex;align-items:center;justify-content:center}.sg-final-icon .sg-garment-svg svg{width:48px;height:48px;color:#5144bd}.sg-final-icon b{font-size:11px;line-height:1.1}.sg-final-selected{border:1px solid #d9d3ff;background:#fff;border-radius:16px;padding:11px;margin-bottom:10px}.sg-final-selected-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.sg-final-selected-name{font-weight:900;font-size:15px}.sg-final-actions{display:flex;gap:6px}.sg-final-actions button{border:0;border-radius:9px;padding:7px 9px;font-weight:800}.sg-final-change{background:#eeeaff;color:#5144bd}.sg-final-remove{background:#fff0f0;color:#c62828}.sg-final-design{width:100%;margin:10px 0;background:#5b4bdb;color:#fff;border:0;border-radius:11px;padding:11px;font-weight:900}.sg-final-measure-title{font-weight:900;margin:5px 0 8px}.sg-final-measure-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.sg-final-measure-grid .field{margin:0}.sg-final-locked{background:#fff7df;border:1px solid #f0d58b;color:#7a5a00;border-radius:12px;padding:11px;font-size:12px;font-weight:800}.sg-final-measure-grid label{font-size:11px}.sg-final-measure-grid input{width:100%}@media(max-width:430px){.sg-final-icons{grid-template-columns:repeat(3,1fr)}.sg-final-measure-grid{grid-template-columns:1fr 1fr}}`;document.head.appendChild(s)}
function names(type){return typeof window.orderMeasurementNames==='function'?window.orderMeasurementNames(type):[]}
function buttons(i,list){return list.map(x=>`<button type="button" class="sg-final-icon" onclick="sgFinalSelect(${i},'${String(x[1]).replace(/'/g,"\\'")}')"><span class="sg-garment-svg">${icon(x[1])}</span><b>${esc(x[1])}</b></button>`).join('')}
function picker(i,tab='ladies'){return `<div class="sg-final-order" id="garment-${i}" data-selected-type=""><div class="sg-final-title">👗 Select Garment</div><div class="sg-final-sub">Pehle garment select karein → phir design → phir measurements.</div><div class="sg-final-tabs"><button type="button" class="sg-final-tab ${tab==='ladies'?'active':''}" onclick="sgFinalTab(${i},'ladies')">👩 Ladies Garments</button><button type="button" class="sg-final-tab ${tab==='gents'?'active':''}" onclick="sgFinalTab(${i},'gents')">👨 Gents Garments</button></div><div class="sg-final-icons">${buttons(i,tab==='gents'?GENTS:LADIES)}</div></div>`}
function selected(i,type){
 const ms=names(type);
 const hasDesign=!!(window.orderDesignTargets&&window.orderDesignTargets[i]);
 const fields=ms.map(n=>'<div class="field"><label>'+esc(n)+'</label><input class="g-measure" data-name="'+esc(n)+'" placeholder="inches"></div>').join('');
 const measurementBlock=hasDesign?'<div class="sg-final-measure-title">📏 Measurements</div><div class="sg-final-measure-grid">'+fields+'</div>':'<div class="sg-final-measure-title">📏 Measurements</div><div class="sg-final-locked">🔒 Pehle Design select karein, uske baad Measurements bharen.</div>';
 return '<div class="sg-final-selected" id="garment-'+i+'" data-selected-type="'+esc(type)+'"><div class="sg-final-selected-head"><div class="sg-final-selected-name">'+icon(type)+' '+esc(type)+'</div><div class="sg-final-actions"><button type="button" class="sg-final-change" onclick="sgFinalRechoose('+i+')">Change</button>'+(i>0?'<button type="button" class="sg-final-remove" onclick="removeGarment('+i+')">Remove</button>':'')+'</div></div><button type="button" class="sg-final-design" onclick="sgFinalDesign('+i+',\''+String(type).replace(/'/g,"\\'")+'\')">'+(hasDesign?'✓ Change Design':'🎨 Select Design')+'</button>'+measurementBlock+'</div>';
}
function moveTop(){
 const w=document.getElementById('garmentsWrap'),form=document.getElementById('orderForm');if(!w||!form)return false;
 const block=w.closest('.field')||w.parentElement;
 const titles=[...form.querySelectorAll('.section-title')];
 const measureTitle=titles.find(x=>/Measurements\s*-?\s*1/i.test(x.textContent))||titles.find(x=>/^Measurements$/i.test(x.textContent));
 if(!measureTitle||!measureTitle.parentNode)return false;
 const orderTitle=titles.find(x=>/Garments\s*&\s*Measurements/i.test(x.textContent));
 measureTitle.parentNode.insertBefore(block,measureTitle);
 if(orderTitle&&orderTitle!==block&&orderTitle.parentNode===measureTitle.parentNode)measureTitle.parentNode.insertBefore(orderTitle,block);
 return true;
}
window.sgFinalTab=function(i,tab){const c=document.getElementById('garment-'+i);if(c)c.outerHTML=picker(i,tab)};
window.sgFinalSelect=function(i,type){const c=document.getElementById('garment-'+i);if(c)c.outerHTML=selected(i,type);if(typeof window.openDesignCatalogForOrder==='function')setTimeout(()=>window.openDesignCatalogForOrder(type,i),30)};
window.sgFinalDesign=function(i,type){if(typeof window.openDesignCatalogForOrder==='function')window.openDesignCatalogForOrder(type,i)};
window.sgFinalRechoose=function(i){const c=document.getElementById('garment-'+i);if(c)c.outerHTML=picker(i)};
window.garmentCard=function(i,type){return type?selected(i,type):picker(i)};
window.initGarments=function(){css();let w=document.getElementById('garmentsWrap');if(!w){const form=document.getElementById('orderForm');if(form){w=document.createElement('div');w.id='garmentsWrap';const titles=[...form.querySelectorAll('.section-title')];const t=titles.find(x=>/Garments\\s*&\\s*Measurements/i.test(x.textContent));if(t)t.insertAdjacentElement('afterend',w);else form.insertBefore(w,form.firstChild)}}if(w){w.innerHTML='';w.insertAdjacentHTML('afterbegin',picker(0))}moveTop()};
window.addGarment=function(){const w=document.getElementById('garmentsWrap');if(!w)return;const i=w.children.length;w.insertAdjacentHTML('beforeend',picker(i));moveTop()};
function boot(){css();window.initGarments();[50,250,750,1500].forEach(t=>setTimeout(moveTop,t));if(typeof window.openM==='function'&&!window.__sgFinalOpenMPatch){const oldOpenM=window.openM;window.openM=function(t){const r=oldOpenM.apply(this,arguments);if(t==='order')setTimeout(window.initGarments,0);return r};window.__sgFinalOpenMPatch=true}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
