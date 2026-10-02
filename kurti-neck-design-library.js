/* SILAI GURU — authoritative Kurti Neck Design Library v2 */
(function(){
'use strict';
if(window.__sgKurtiNeckV2)return;window.__sgKurtiNeckV2=true;
const catalogueSpecs=[["Round Gold", "M28 28 Q50 8 72 28"], ["Scallop", "M28 28 Q34 14 40 28 Q50 12 60 28 Q66 14 72 28"], ["Keyhole", "M28 26 Q50 10 72 26 L50 42 Z"], ["Bow Round", "M28 26 Q50 8 72 26 M50 26 L44 38 M50 26 L56 38"], ["Petal", "M28 28 Q38 10 50 28 Q62 10 72 28"], ["Notch", "M28 24 L42 38 L50 28 L58 38 L72 24"], ["V Collar", "M28 24 L50 48 L72 24"], ["Deep V", "M28 24 L50 58 L72 24"], ["U Neck", "M28 24 Q28 50 50 54 Q72 50 72 24"], ["Square", "M28 24 L28 48 L72 48 L72 24"], ["Boat", "M24 30 Q50 42 76 30"], ["High Neck", "M30 22 L30 44 Q50 54 70 44 L70 22"], ["Leaf", "M28 26 Q40 12 50 28 Q60 12 72 26"], ["Layered", "M28 24 L50 46 L72 24 M34 28 L50 40 L66 28"], ["Tie V", "M28 24 L50 46 L72 24 M50 46 L50 58"], ["Double U", "M28 24 Q50 48 72 24 M34 28 Q50 40 66 28"], ["Heart", "M28 28 Q36 10 50 26 Q64 10 72 28 Q68 48 50 56 Q32 48 28 28"], ["Cross V", "M28 24 L50 44 L72 24 M38 30 L62 46"], ["Petal Wide", "M25 28 Q38 6 50 28 Q62 6 75 28"], ["Round Notch", "M28 24 Q50 8 72 24 L62 34 L50 27 L38 34 Z"], ["Leaf Drop", "M28 24 Q50 8 72 24 L50 54 Z"], ["Ruffle", "M27 26 Q32 12 38 26 Q44 12 50 26 Q56 12 62 26 Q68 12 73 26"], ["Princess", "M28 24 L40 34 L50 22 L60 34 L72 24"], ["Tulip", "M28 24 Q40 18 50 34 Q60 18 72 24 L50 54 Z"], ["Classic", "M28 24 Q50 10 72 24 L72 34 Q50 44 28 34 Z"]];
function makeCatalogue(){
 const W=1000,H=1180,tw=188,th=205;
 let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'"><rect width="100%" height="100%" rx="28" fill="#fff"/><text x="500" y="48" text-anchor="middle" font-family="Arial" font-size="30" font-weight="800" fill="#24243b">25 UNIQUE KURTI NECK DESIGNS</text><text x="500" y="78" text-anchor="middle" font-family="Arial" font-size="16" fill="#6b5f9d">SILAI GURU • Neck Design Catalogue</text>';
 catalogueSpecs.forEach(function(d,i){
  const r=Math.floor(i/5),c=i%5,x=20+c*195,y=95+r*215;
  s+='<rect x="'+x+'" y="'+y+'" width="'+tw+'" height="'+th+'" rx="18" fill="#faf9ff" stroke="#d9d3ff" stroke-width="3"/>';
  s+='<circle cx="'+(x+26)+'" cy="'+(y+26)+'" r="18" fill="#5b4bdb"/><text x="'+(x+26)+'" y="'+(y+33)+'" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#fff">'+(i+1)+'</text>';
  s+='<path d="M'+(x+45)+' '+(y+150)+' L'+(x+45)+' '+(y+78)+' Q'+(x+94)+' '+(y+52)+' '+(x+143)+' '+(y+78)+' L'+(x+143)+' '+(y+150)+'" fill="#efeaff" stroke="#5b4bdb" stroke-width="3"/>';
  s+='<g transform="translate('+(x+44)+','+(y+72)+') scale(.98)"><path d="'+d[1]+'" fill="none" stroke="#b42318" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>';
  s+='<text x="'+(x+94)+'" y="'+(y+182)+'" text-anchor="middle" font-family="Arial" font-size="13" font-weight="700" fill="#24243b">'+d[0]+'</text>';
 });
 return 'data:image/svg+xml,'+encodeURIComponent(s+'</svg>');
}
const catalogue={id:'silai-guru-kurti-neck-catalogue-25-20261002',type:'Kurti',name:'Kurti Neck Designs — 25 Design Catalogue',image:makeCatalogue(),source:'SILAI GURU Design Library'};
const specs=[
 ['round-neck','Round Neck','M 30 18 Q 50 42 70 18'],['deep-round-neck','Deep Round Neck','M 30 18 Q 50 58 70 18'],['v-neck','V Neck','M 30 18 L 50 52 L 70 18'],['deep-v-neck','Deep V Neck','M 30 18 L 50 70 L 70 18'],['square-neck','Square Neck','M 30 18 L 30 48 L 70 48 L 70 18'],['u-neck','U Neck','M 30 18 Q 30 55 50 58 Q 70 55 70 18'],['boat-neck','Boat Neck','M 25 24 Q 50 38 75 24'],['sweetheart-neck','Sweetheart Neck','M 30 25 Q 38 10 50 28 Q 62 10 70 25 Q 68 50 50 58 Q 32 50 30 25'],['keyhole-neck','Keyhole Neck','M 30 18 Q 50 40 70 18 M 50 34 C 42 34 42 46 50 50 C 58 46 58 34 50 34'],['collar-neck','Collar Neck','M 30 18 L 42 32 L 50 22 L 58 32 L 70 18'],['notch-neck','Notch Neck','M 30 18 L 43 34 L 50 27 L 57 34 L 70 18'],['mandarin-neck','Mandarin Neck','M 30 18 L 30 36 Q 50 45 70 36 L 70 18']
];
function svgPath(path){const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85"><path d="'+path+'" fill="none" stroke="%235b4bdb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';return 'data:image/svg+xml,'+encodeURIComponent(svg)}
const designs=[catalogue].concat(specs.map(([id,name,path])=>({id:'kurti-neck-'+id,type:'Kurti',name:name,image:svgPath(path),source:'SILAI GURU • Kurti Neck Designs'})));
function install(){
 const base=window.garmentDesignsFor;if(typeof base!=='function'||base.__sgKurtiNeckV2)return false;if(window.garmentDesignsFor.__sgKurtiNeckV2)return true;
 const wrapped=function(type){let list=[];try{list=base(type)||[]}catch(_){list=[]}if(String(type)!=='Kurti')return list;const ids=new Set(designs.map(x=>x.id));list=list.filter(x=>!ids.has(x?.id)&&!String(x?.source||'').includes('Kurti Neck Designs'));return designs.concat(list)};
 wrapped.__sgKurtiNeckV2=true;window.garmentDesignsFor=wrapped;return true;
}
function boot(){if(install())return;let n=0;const t=setInterval(()=>{if(install()||++n>100)clearInterval(t)},200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
