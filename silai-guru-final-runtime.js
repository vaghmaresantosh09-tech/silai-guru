/* SILAI GURU — final runtime guard v57 */
(function(){
'use strict';
const LADIES=['Blouse','Kurti','Pleated Kurti','Gathering Kurti','Panjabi Dress','Anarkali Dress','Umbrella Dress','Chaniya Choli','Pant Plazo'];
const GENTS=['Shirt','Pant','Kurta','Sherwani','Waistcoat','Blazer','Coat','T-Shirt','Shorts','Pajama','Suit','Night Wear'];
function boot(){
  if(typeof window.initGarments==='function') window.initGarments();
  const w=document.getElementById('garmentsWrap');
  if(w && !w.querySelector('[data-sg-v50],[data-sg-v49],[data-sg-v48]') && typeof window.sgV50Select==='function'){
    const p=document.createElement('div');
    p.innerHTML='<div class="sg-v50-picker" id="garment-picker-0"><div class="sg-v50-title">👗 Select Garment</div><div class="sg-v50-sub">Pehle garment select karein.</div><div class="sg-v50-tabs"><button type="button" class="sg-v50-tab active" onclick="sgV50Category(0,\'ladies\')">👩 Ladies Garments</button><button type="button" class="sg-v50-tab" onclick="sgV50Category(0,\'gents\')">👨 Gents Garments</button></div>'+LADIES.map(x=>'<button type="button" class="sg-v50-type" onclick="sgV50Select(0,'+JSON.stringify(x)+')"><span style="font-size:42px">👗</span><b>'+x+'</b></button>').join('')+'</div>';
    w.replaceChildren(p.firstElementChild);
  }
  const form=document.getElementById('orderForm');
  const title=[...(form?.querySelectorAll('.section-title')||[])].find(x=>/Measurements-1|Measurements/i.test(x.textContent));
  if(w&&title) title.parentNode.insertBefore(w,title);
}
const oldOpen=window.openM;
if(typeof oldOpen==='function'&&!window.__sgFinal57Open){
 window.openM=function(type){const r=oldOpen.apply(this,arguments);if(type==='order')setTimeout(boot,0);return r};
 window.__sgFinal57Open=true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);
})();