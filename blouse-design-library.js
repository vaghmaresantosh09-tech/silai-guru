/* SILAI GURU — protected blouse design library v50
   One authoritative blouse collection only.
   Also cleans exact duplicate saved uploads in local browser storage.
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
function cleanSavedUploads(){
  try{
    const raw=localStorage.getItem('sg_garment_designs');
    if(!raw)return;
    const list=JSON.parse(raw);
    if(!Array.isArray(list))return;
    const seen=new Set(),clean=[];
    for(const x of list){
      if(!x||typeof x!=='object')continue;
      const type=String(x.type||'').trim();
      const name=String(x.name||'').trim();
      const image=String(x.image||'').trim();
      const url=String(x.url||'').trim();
      if(!type||!name)continue;
      const key=image||url ? type.toLowerCase()+'|'+(image||url) : type.toLowerCase()+'|name|'+name.toLowerCase();
      if(seen.has(key))continue;
      seen.add(key);clean.push(x);
    }
    if(clean.length!==list.length)localStorage.setItem('sg_garment_designs',JSON.stringify(clean));
  }catch(e){}
}
function install(){
  cleanSavedUploads();
  const current=window.garmentDesignsFor;
  if(typeof current!=='function')return false;
  if(current.__sgBlouseProtectedV50)return true;
  const base=current;
  function wrapped(type){
    let list=[];
    try{list=base(type)||[]}catch(e){list=[]}
    list=Array.isArray(list)?list.filter(x=>x?.id!==blouseDesign.id):[];
    return String(type)==='Blouse' ? [blouseDesign].concat(list) : list;
  }
  wrapped.__sgBlouseProtectedV50=true;
  window.garmentDesignsFor=wrapped;
  return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);
setTimeout(install,1000);
})();
