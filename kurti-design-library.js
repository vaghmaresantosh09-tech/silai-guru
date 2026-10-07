/* SILAI GURU — protected Kurti design library v6
   User-supplied Kurti Neck Designs sheet.
   Replaces the deleted pink placeholder designs.
*/
(function(){
'use strict';
const SG_ASSET_V='20261007-6';
function sgAsset(name){
  try{return new URL('/silai-guru/assets/'+name,location.origin).href+'?v='+SG_ASSET_V}
  catch(e){return './assets/'+name+'?v='+SG_ASSET_V}
}
const kurtiImage=sgAsset('kurti-neck-designs.webp');
const kurtiDesign={
  id:'silai-guru-kurti-neck-sheet-20261007',
  type:'Kurti',
  name:'Kurti Neck Designs — Front & Back Collection',
  image:kurtiImage,
  source:'SILAI GURU Design Library'
};
function install(){
 const current=window.garmentDesignsFor;
 if(typeof current!=='function')return false;
 if(current.__sgKurtiProtectedV6)return true;
 const base=current;
 function wrapped(type){
   let list=[];try{list=base(type)||[]}catch(e){list=[]}
   list=Array.isArray(list)?list.filter(x=>x?.id!==kurtiDesign.id):[];
   return String(type)==='Kurti'?[kurtiDesign].concat(list):list;
 }
 wrapped.__sgKurtiProtectedV6=true;
 window.garmentDesignsFor=wrapped;
 return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);setTimeout(install,1000);
})();