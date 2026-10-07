/* SILAI GURU — Kurti design library
   Pink placeholder Kurti designs removed.
   Kept as an empty protected library so the existing loader remains valid.
*/
(function(){
'use strict';
if(window.__SG_KURTI_LIBRARY_EMPTY_V1)return;
window.__SG_KURTI_LIBRARY_EMPTY_V1=true;
function install(){
  const current=window.garmentDesignsFor;
  if(typeof current!=='function')return false;
  if(current.__sgKurtiEmptyV1)return true;
  const base=current;
  function wrapped(type){
    let list=[];
    try{list=base(type)||[]}catch(e){list=[]}
    return Array.isArray(list)?list.filter(x=>!String(type).toLowerCase().includes('kurti')||!x?.id?.startsWith('silai-guru-kurti-')):list;
  }
  wrapped.__sgKurtiEmptyV1=true;
  window.garmentDesignsFor=wrapped;
  return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);
setTimeout(install,1000);
})();