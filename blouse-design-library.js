/* SILAI GURU — protected blouse design library v49
   One authoritative blouse collection only.
   Viewer/navigation is handled by silai-guru-order-design.js.
*/
(function(){
'use strict';
const blouseImage='https://raw.githubusercontent.com/vaghmaresantosh09-tech/silai-guru/ee37f1fe07081f444051c717c4c8cfdfd29a9231/ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
const blouseDesign={
  id:'silai-guru-blouse-neck-sheet-20260930',
  type:'Blouse',
  name:'Blouse Neck Designs — Latest & Traditional Collection',
  image:blouseImage,
  source:'SILAI GURU Design Library'
};
function install(){
  const current=window.garmentDesignsFor;
  if(typeof current!=='function') return false;
  if(current.__sgBlouseProtectedV49) return true;
  const base=current;
  function wrapped(type){
    let list=[];
    try{list=base(type)||[]}catch(e){list=[]}
    list=Array.isArray(list)?list.filter(x=>x?.id!==blouseDesign.id):[];
    return String(type)==='Blouse' ? [blouseDesign].concat(list) : list;
  }
  wrapped.__sgBlouseProtectedV49=true;
  window.garmentDesignsFor=wrapped;
  return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);
setTimeout(install,1000);
})();
