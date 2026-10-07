/* SILAI GURU — Kurti online design library v1
   Selected from Pixabay's royalty-free Kurti/Kurta image search.
   Remote originals are used directly so no low-quality bundled copy is created.
*/
(function(){
'use strict';

const kurtiOnlineDesigns=[
  {
    id:'silai-guru-kurti-online-pink-20261007',
    type:'Kurti',
    name:'Pink Kurti — Elegant Front',
    image:'https://cdn.pixabay.com/photo/2022/09/22/09/54/woman-7472039_1280.jpg',
    source:'Pixabay'
  },
  {
    id:'silai-guru-kurti-online-coral-20261007',
    type:'Kurti',
    name:'Coral Printed Kurti — Flared',
    image:'https://cdn.pixabay.com/photo/2024/07/02/07/58/dress-8866994_640.jpg',
    source:'Pixabay'
  },
  {
    id:'silai-guru-kurti-online-pink-teal-20261007',
    type:'Kurti',
    name:'Pink Kurti with Teal Dupatta',
    image:'https://cdn.pixabay.com/photo/2025/09/03/05/21/ai-generated-9812566_640.jpg',
    source:'Pixabay'
  }
];

function install(){
  const current=window.garmentDesignsFor;
  if(typeof current!=='function') return false;
  if(current.__sgKurtiOnlineV1) return true;
  const base=current;
  function wrapped(type){
    let list=[];
    try{list=base(type)||[]}catch(e){list=[]}
    list=Array.isArray(list)?list.filter(x=>!kurtiOnlineDesigns.some(d=>d.id===x?.id)):list;
    return String(type)==='Kurti' ? kurtiOnlineDesigns.concat(list) : list;
  }
  wrapped.__sgKurtiOnlineV1=true;
  window.garmentDesignsFor=wrapped;
  return true;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
else install();
setTimeout(install,300);
setTimeout(install,1000);
})();