/* SILAI GURU — protected Kurti design library v3
   User-supplied Kurti design collections in HD.
   Keeps Kurti separate from Blouse library.
*/
(function(){
'use strict';
const kurtiImage1='https://raw.githubusercontent.com/vaghmaresantosh09-tech/silai-guru/main/assets/kurti-neck-designs-hd.webp';
const kurtiImage2='https://raw.githubusercontent.com/vaghmaresantosh09-tech/silai-guru/main/assets/kurti2-hd.webp';
const kurtiDesigns=[
 {id:'silai-guru-kurti-neck-sheet-20261007',type:'Kurti',name:'Kurti Neck Designs — Front & Back Collection',image:kurtiImage1,source:'SILAI GURU Design Library'},
 {id:'silai-guru-kurti-collection-2-20261007',type:'Kurti',name:'Kurti Designs — Latest & Traditional Collection',image:kurtiImage2,source:'SILAI GURU Design Library'}
];
function install(){
 const current=window.garmentDesignsFor;
 if(typeof current!=='function')return false;
 if(current.__sgKurtiProtectedV3)return true;
 const base=current;
 function wrapped(type){
   let list=[];try{list=base(type)||[]}catch(e){list=[]}
   list=Array.isArray(list)?list.filter(x=>!kurtiDesigns.some(d=>d.id===x?.id)):list;
   return String(type)==='Kurti'?kurtiDesigns.concat(list):list;
 }
 wrapped.__sgKurtiProtectedV3=true;
 window.garmentDesignsFor=wrapped;
 return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);setTimeout(install,1000);
})();