/* SILAI GURU — Ladies garment selector v48. Replaces the retired ladies list after the authoritative order UI loads. */
(function(){
  'use strict';
  const LADIES_V48=['Blouse','Kurti','Pleated Kurti','Gathering Kurti','Panjabi Dress','Anarkali Dress','Umbrella Dress','Chaniya Choli','Pant Plazo','Chaniya'];
  const GENTS_V48=['Shirt','Pant','Kurta','Sherwani','Waistcoat','Blazer','Coat','T-Shirt','Shorts','Pajama','Suit','Night Wear'];
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const icon=t=>{try{if(typeof window.garmentVisual==='function')return window.garmentVisual(t)}catch(e){} const x=String(t).toLowerCase(); let e='👗'; if(x.includes('blouse'))e='👚'; else if(x.includes('pant')||x.includes('plazo'))e='👖'; else if(x.includes('chaniya')||x.includes('anarkali')||x.includes('umbrella')||x.includes('gown')||x.includes('dress')||x.includes('kurti')||x.includes('panjabi'))e='👗'; return '<span aria-hidden="true" style="font-size:42px;line-height:1">'+e+'</span>';};
  function picker(i,active){const list=active==='gents'?GENTS_V48:LADIES_V48;return '<div class="sg-v40-picker" id="garment-picker-'+i+'"><div class="sg-v40-title">👗 Select Garment</div><div class="sg-v40-sub">Pehle garment select karein. Select karte hi neeche Measurements-'+(i+1)+' khul jayega.</div><div class="sg-v40-category-tabs"><button type="button" class="sg-v40-category '+(active==='ladies'?'active':'')+'" onclick="sgV48Category('+i+',\'ladies\')">👩 Ladies Garments</button><button type="button" class="sg-v40-category '+(active==='gents'?'active':'')+'" onclick="sgV48Category('+i+',\'gents\')">👨 Gents Garments</button></div>'+list.map(t=>'<button type="button" class="sg-v40-type" onclick="sgV40Select('+i+',\''+String(t).replace(/'/g,"\\'")+'\')">'+icon(t)+'<b>'+esc(t)+'</b></button>').join('')+'</div>';}
  function renderPicker(i,cat){const old=document.getElementById('garment-'+i)||document.getElementById('garment-picker-'+i);if(old)old.outerHTML=picker(i,cat);}
  window.sgV48Category=function(i,cat){renderPicker(i,cat);};
  window.sgV48Rechoose=function(i){const c=document.getElementById('garment-'+i);let vals={};if(c)c.querySelectorAll('.g-measure').forEach(x=>vals[x.dataset.name]=x.value||'');renderPicker(i,c?.dataset.category||'ladies');const p=document.getElementById('garment-picker-'+i);if(p)p.dataset.previousValues=JSON.stringify(vals);};
  window.sgV48Init=function(){const w=document.getElementById('garmentsWrap');if(!w)return;w.querySelectorAll('.sg-v40-picker').forEach((p,n)=>p.outerHTML=picker(n,'ladies'));};
  window.sgV48AddGarment=function(){const w=document.getElementById('garmentsWrap');if(!w)return;const i=w.children.length;w.insertAdjacentHTML('beforeend',picker(i,'ladies'));};
  function boot(){
    window.sgV40Category=window.sgV48Category;
    window.sgV40Rechoose=window.sgV48Rechoose;
    window.addGarment=window.sgV48AddGarment;
    window.initGarments=window.sgV48Init;
    window.sgV48Init();
    setTimeout(window.sgV48Init,100);setTimeout(window.sgV48Init,500);setTimeout(window.sgV48Init,1200);
    if(typeof window.openM==='function'&&!window.__sgV48OrderPatch){const old=window.openM;window.openM=function(t){const r=old.apply(this,arguments);if(t==='order'){setTimeout(window.sgV48Init,50);setTimeout(window.sgV48Init,400);}return r;};window.__sgV48OrderPatch=true;}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
