/* SILAI GURU — Kurti premium online design library v2
   10 curated high-quality Kurti / Indian-wear references.
   Images are served from their original Unsplash CDN sources; no bundled
   low-resolution copies are added to the repository.
*/
(function(){
'use strict';

const kurtiOnlineDesigns=[
  {
    id:'silai-guru-kurti-premium-red-20261007',
    type:'Kurti',
    name:'Red Embroidered Kurti — Festive',
    image:'https://images.unsplash.com/photo-1759840278361-f1adc75529a1?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-red-floral-20261007',
    type:'Kurti',
    name:'Red Kurti — Floral Dupatta',
    image:'https://images.unsplash.com/photo-1759840278381-bf7d5e332050?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-navy-20261007',
    type:'Kurti',
    name:'Navy Floral Kurti — Designer Print',
    image:'https://images.unsplash.com/photo-1740992556357-f7fe9afff763?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-coral-20261007',
    type:'Kurti',
    name:'Coral Printed Kurti — Full Set',
    image:'https://images.unsplash.com/photo-1742800788220-1e42256d6022?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-teal-20261007',
    type:'Kurti',
    name:'Teal Blue Kurti — Elegant V Neck',
    image:'https://images.unsplash.com/photo-1743229995601-be9b69018813?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-maroon-20261007',
    type:'Kurti',
    name:'Maroon Kurti — Embroidered Look',
    image:'https://images.unsplash.com/photo-1708534246051-7f47b279e94b?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-cream-20261007',
    type:'Kurti',
    name:'Cream Kurti — Minimal Premium',
    image:'https://images.unsplash.com/photo-1754391851702-e5275cf80e34?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-floral-navy-20261007',
    type:'Kurti',
    name:'Navy Floral Kurti — Classic',
    image:'https://images.unsplash.com/photo-1740992556553-fc3b65201cf3?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-pink-floral-20261007',
    type:'Kurti',
    name:'Pink Floral Kurti — Boutique Style',
    image:'https://images.unsplash.com/photo-1742800786544-e935375035e3?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  },
  {
    id:'silai-guru-kurti-premium-multicolor-20261007',
    type:'Kurti',
    name:'Multicolor Printed Kurti — Designer',
    image:'https://images.unsplash.com/photo-1742800788220-1e42256d6022?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    source:'Unsplash'
  }
];

function install(){
  const current=window.garmentDesignsFor;
  if(typeof current!=='function') return false;
  if(current.__sgKurtiOnlineV2) return true;
  const base=current;
  function wrapped(type){
    let list=[];
    try{list=base(type)||[]}catch(e){list=[]}
    list=Array.isArray(list)?list.filter(x=>!kurtiOnlineDesigns.some(d=>d.id===x?.id)):list;
    return String(type)==='Kurti' ? kurtiOnlineDesigns.concat(list) : list;
  }
  wrapped.__sgKurtiOnlineV2=true;
  window.garmentDesignsFor=wrapped;
  return true;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
else install();
setTimeout(install,300);
setTimeout(install,1000);
})();
