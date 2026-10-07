/* SILAI GURU — protected Kurti design library v1
   User-supplied Kurti Neck Designs sheet.
   Keeps Kurti separate from Blouse library.
*/
(function(){
'use strict';
const kurtiImage='https://raw.githubusercontent.com/vaghmaresantosh09-tech/silai-guru/main/assets/kurti-neck-designs.webp';
const kurtiDesign={id:'silai-guru-kurti-neck-sheet-20261007',type:'Kurti',name:'Kurti Neck Designs — Front & Back Collection',image:kurtiImage,source:'SILAI GURU Design Library'};
function install(){
 const current=window.garmentDesignsFor;
 if(typeof current!=='function')return false;
 if(current.__sgKurtiProtectedV1)return true;
 const base=current;
 function wrapped(type){let list=[];try{list=base(type)||[]}catch(e){list=[]}list=Array.isArray(list)?list.filter(x=>x?.id!==kurtiDesign.id):[];return String(type)==='Kurti'?[kurtiDesign].concat(list):list}
 wrapped.__sgKurtiProtectedV1=true;window.garmentDesignsFor=wrapped;return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);setTimeout(install,1000);
})();