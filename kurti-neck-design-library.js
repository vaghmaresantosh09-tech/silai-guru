/* SILAI GURU — Kurti-only Neck Design Library v1 */
(function(){
'use strict';
if(window.__sgKurtiNeckV1)return; window.__sgKurtiNeckV1=true;
const specs=[
 ['round-neck','Round Neck','M 30 18 Q 50 42 70 18'],
 ['deep-round-neck','Deep Round Neck','M 30 18 Q 50 58 70 18'],
 ['v-neck','V Neck','M 30 18 L 50 52 L 70 18'],
 ['deep-v-neck','Deep V Neck','M 30 18 L 50 70 L 70 18'],
 ['square-neck','Square Neck','M 30 18 L 30 48 L 70 48 L 70 18'],
 ['u-neck','U Neck','M 30 18 Q 30 55 50 58 Q 70 55 70 18'],
 ['boat-neck','Boat Neck','M 25 24 Q 50 38 75 24'],
 ['sweetheart-neck','Sweetheart Neck','M 30 25 Q 38 10 50 28 Q 62 10 70 25 Q 68 50 50 58 Q 32 50 30 25'],
 ['keyhole-neck','Keyhole Neck','M 30 18 Q 50 40 70 18 M 50 34 C 42 34 42 46 50 50 C 58 46 58 34 50 34'],
 ['collar-neck','Collar Neck','M 30 18 L 42 32 L 50 22 L 58 32 L 70 18'],
 ['notch-neck','Notch Neck','M 30 18 L 43 34 L 50 27 L 57 34 L 70 18'],
 ['mandarin-neck','Mandarin Neck','M 30 18 L 30 36 Q 50 45 70 36 L 70 18']
];
function esc(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function svgPath(path){const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85"><path d="'+path+'" fill="none" stroke="%235b4bdb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';return 'data:image/svg+xml,'+encodeURIComponent(svg)}
const designs=specs.map(([id,name,path])=>({id:'kurti-neck-'+id,type:'Kurti',name:name,image:svgPath(path),source:'SILAI GURU • Kurti Neck Designs'}));
function install(){const base=window.garmentDesignsFor;if(typeof base!=='function'||base.__sgKurtiNeckV1)return false;if(window.garmentDesignsFor.__sgKurtiNeckV1)return true;const wrapped=function(type){let list=[];try{list=base(type)||[]}catch(_){list=[]}if(String(type)!=='Kurti')return list;const ids=new Set(designs.map(x=>x.id));list=list.filter(x=>!ids.has(x?.id)&&!String(x?.source||'').includes('Kurti Neck Designs'));return designs.concat(list)};wrapped.__sgKurtiNeckV1=true;window.garmentDesignsFor=wrapped;return true}
function boot(){if(install())return;let n=0;const t=setInterval(()=>{if(install()||++n>80)clearInterval(t)},250)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
