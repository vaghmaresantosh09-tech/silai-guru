/* SILAI GURU — Kurti Neck Design Library v2 */
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
 const d=[0,5,10,16,8][v];
 if(type==='Round Neck')return `M145 62 Q180 ${72+d} 215 62`;
 if(type==='V Neck')return `M145 62 L180 ${112+d} L215 62`;
 if(type==='Square Neck')return `M145 62 L145 ${96+d} L215 ${96+d} L215 62`;
 if(type==='Boat Neck')return `M128 ${66+d/3} Q180 ${82+d} 232 ${66+d/3}`;
 if(type==='Keyhole Neck')return `M150 62 Q180 78 210 62 M180 78 C168 89 168 108 180 116 C192 108 192 89 180 78`;
 if(type==='Collar Neck')return `M145 62 L158 84 L180 96 L202 84 L215 62 M158 84 L158 113 M202 84 L202 113`;
 if(type==='Designer Neck')return v%2===0?`M145 62 L165 86 L180 70 L195 86 L215 62`:`M145 62 L170 ${101+d} L215 62`;
 return `M145 62 Q180 84 215 62`;
}
function deco(type,v){
 const gold='#c58a2d';
 if(type==='V Neck'&&v===2)return `<g fill="${gold}"><circle cx="180" cy="122" r="5"/><circle cx="180" cy="136" r="4"/><circle cx="180" cy="150" r="3"/></g>`;
 if(type==='Keyhole Neck')return `<g fill="none" stroke="${gold}" stroke-width="3"><circle cx="180" cy="97" r="5"/><path d="M168 68Q180 80 192 68"/></g>`;
 if(type==='Collar Neck')return `<g fill="${gold}"><circle cx="156" cy="122" r="3"/><circle cx="180" cy="132" r="3"/><circle cx="204" cy="122" r="3"/></g>`;
 if(v===0)return '';
 if(v===1)return `<path d="M150 76 Q180 99 210 76" fill="none" stroke="${gold}" stroke-width="3"/>`;
 if(v===2)return Array.from({length:5},(_,i)=>`<circle cx="${160+i*10}" cy="145" r="2.5" fill="${gold}"/>`).join('');
 if(v===3)return `<path d="M160 78 Q180 94 200 78 M164 87Q180 105 196 87" fill="none" stroke="${gold}" stroke-width="2.5"/>`;
 return `<g fill="${gold}"><circle cx="180" cy="116" r="4"/><circle cx="166" cy="116" r="3"/><circle cx="194" cy="116" r="3"/></g>`;
}
function makeSvg(type,v){
 const path=neckShape(type,v);
 return `<svg viewBox="0 0 360 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(type)} Kurti design ${v+1}">
 <rect x="8" y="8" width="344" height="314" rx="24" fill="#fffaf4"/>
 <path d="M125 43 L151 28 H209 L235 43 L278 77 L254 119 L232 104 V285 Q180 303 128 285 V104 L106 119 L82 77 Z" fill="#f3e6dc" stroke="#6f4a3d" stroke-width="3" stroke-linejoin="round"/>
 <path d="M128 285 Q180 304 232 285" fill="none" stroke="#6f4a3d" stroke-width="3"/>
 <path d="${path}" fill="none" stroke="#6f4a3d" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="${path}" fill="none" stroke="#fffdf8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
 ${deco(type,v)}
 <path d="M132 170 Q180 178 228 170" fill="none" stroke="#d8c2b3" stroke-width="2" opacity=".8"/>
 <text x="180" y="315" text-anchor="middle" font-size="13" font-weight="700" fill="#6f4a3d">${esc(type)} • ${v+1}</text>
 </svg>`;
}
const designs=[];
families.forEach(([type,names])=>names.forEach((name,v)=>designs.push({id:'sg-kurti-neck-'+type.toLowerCase().replace(/[^a-z]+/g,'-')+'-'+(v+1),type:'Kurti Neck',family:type,name:type+' — '+name,svg:makeSvg(type,v),source:'SILAI GURU Neck Design Library'})));
window.sgKurtiNeckDesigns=designs;
window.sgKurtiNeckFamilies=families.map(x=>x[0]);
})();