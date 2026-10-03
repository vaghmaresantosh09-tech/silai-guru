/* SILAI GURU — final runtime guard v58 */
(function(){
'use strict';
const LADIES=['Blouse','Kurti','Pleated Kurti','Gathering Kurti','Panjabi Dress','Anarkali Dress','Umbrella Dress','Chaniya Choli','Pant Plazo','Chaniya'];
function boot(){
  if(typeof window.initGarments==='function') window.initGarments();
  const w=document.getElementById('garmentsWrap');
  if(w && !w.querySelector('.sg-v54-picker,.sg-v54-card') && typeof window.sgV54Sel==='function') window.initGarments();
  const form=document.getElementById('orderForm');
  const title=[...(form?.querySelectorAll('.section-title')||[])].find(x=>/Measurements-1/i.test(x.textContent));
  if(w&&title) title.parentNode.insertBefore(w,title);
}
const oldOpen=window.openM;
if(typeof oldOpen==='function'&&!window.__sgFinal58Open){
 window.openM=function(type){const r=oldOpen.apply(this,arguments);if(type==='order')setTimeout(boot,0);return r};
 window.__sgFinal58Open=true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);
})();
