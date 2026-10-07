/* SILAI GURU — Kurti Neck Design Library v1
   8 neck families × 5 individual designs.
   Each card is one single neck design; no catalogue-sheet images.
*/
(function(){
'use strict';

const families=[
  ['Round Neck',['Classic Piping','Embroidered Border','Double Line','Button Accent','Pearl Edge']],
  ['V Neck',['Classic V','Deep V Piping','V with Buttons','V Embroidery','V with Dori']],
  ['Square Neck',['Classic Square','Double Border','Square with Buttons','Embroidered Square','Soft Square']],
  ['Boat Neck',['Classic Boat','Wide Boat','Boat Piping','Embroidered Boat','Boat with Motif']],
  ['Keyhole Neck',['Teardrop Keyhole','Round Keyhole','Keyhole Button','Double Keyhole','Embroidered Keyhole']],
  ['Collar Neck',['Mandarin Collar','Band Collar','Collar with V','Collar with Buttons','Embroidered Collar']],
  ['Designer Neck',['Notched Neck','Angrakha Cut','Scallop Neck','Asymmetric Cut','Leaf Cut']],
  ['Embroidery Neck',['Floral Embroidery','Mango Motif','Vine Border','Butti Border','Royal Embroidery']]
];

function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

function neckShape(type,v){
  const depth=[0,8,15,22,12][v], wide=[0,4,8,2,12][v];
  if(type==='Round Neck') return `M${145-wide} 92 Q180 ${92+depth} ${215+wide} 92`;
  if(type==='V Neck') return `M145 92 L180 ${142+depth} L215 92`;
  if(type==='Square Neck') return `M145 92 L145 130 L215 130 L215 92`;
  if(type==='Boat Neck') return `M128 ${94+wide} Q180 ${118+depth} 232 ${94+wide}`;
  if(type==='Keyhole Neck') return `M150 92 Q180 108 210 92 M180 108 C168 120 168 142 180 150 C192 142 192 120 180 108`;
  if(type==='Collar Neck') return `M145 92 L158 116 L180 128 L202 116 L215 92 M158 116 L158 145 M202 116 L202 145`;
  if(type==='Designer Neck') return v%2===0 ? `M145 92 L165 116 L180 100 L195 116 L215 92` : `M145 92 L170 125 L215 92`;
  return `M145 92 Q180 116 215 92`;
}

function deco(type,v){
  const dot=Array.from({length:5},(_,i)=>`<circle cx="${160+i*10}" cy="${v%2?138:145}" r="2.5" fill="#c58a2d"/>`).join('');
  if(type==='V Neck' && v===2) return '<g fill="#c58a2d"><circle cx="180" cy="145" r="5"/><circle cx="180" cy="158" r="4"/><circle cx="180" cy="171" r="3"/></g>';
  if(type==='Keyhole Neck') return '<g fill="none" stroke="#c58a2d" stroke-width="3"><circle cx="180" cy="132" r="5"/><path d="M168 98Q180 112 192 98"/></g>';
  if(type==='Collar Neck') return '<g fill="#c58a2d">'+[140,155,205,220].map(x=>`<circle cx="${x}" cy="145" r="3"/></g>';
  if(v===0) return '';
  if(v===1) return `<path d="M150 103 Q180 128 210 103" fill="none" stroke="#c58a2d" stroke-width="3"/>`;
  if(v===2) return dot;
  if(v===3) return `<path d="M160 105 Q180 120 200 105" fill="none" stroke="#c58a2d" stroke-width="3"/><path d="M164 111Q180 128 196 111" fill="none" stroke="#c58a2d" stroke-width="2"/>`;
  return `<g fill="#c58a2d"><circle cx="180" cy="126" r="4"/><circle cx="166" cy="126" r="3"/><circle cx="194" cy="126" r="3"/></g>`;
}

function makeSvg(type,v){
  const path=neckShape(type,v);
  return `<svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(type)} design ${v+1}">
    <rect x="8" y="8" width="344" height="284" rx="24" fill="#fffaf4"/>
    <path d="M95 82L132 55H228L265 82L292 105L270 151L240 132V255H120V132L90 151L68 105Z" fill="#f3e6dc" stroke="#6f4a3d" stroke-width="3"/>
    <path d="${path}" fill="none" stroke="#6f4a3d" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${path}" fill="none" stroke="#fffdf8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    ${deco(type,v)}
    <text x="180" y="278" text-anchor="middle" font-size="14" font-weight="700" fill="#6f4a3d">${esc(type)} • ${v+1}</text>
  </svg>`;
}

const designs=[];
families.forEach(([type,names])=>names.forEach((name,v)=>{
  designs.push({
    id:'sg-kurti-neck-'+type.toLowerCase().replace(/[^a-z]+/g,'-')+'-'+(v+1),
    type:'Kurti Neck',
    family:type,
    name:type+' — '+name,
    svg:makeSvg(type,v),
    source:'SILAI GURU Neck Design Library'
  });
}));

window.sgKurtiNeckDesigns=designs;
window.sgKurtiNeckFamilies=families.map(x=>x[0]);
})();
