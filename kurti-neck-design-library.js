/* SILAI GURU — Kurti Neck Design Library v3 — 50 real garment thumbnails */
(function(){
'use strict';
const families=["Round Neck","V Neck","Square Neck","Boat Neck","Mandarin Collar","Keyhole Neck","High Neck","Collar Neck","Cowl Neck","Embroidered Neck"];
const sprite='./assets/kurti-neck-50-sprite.jpg';
const designs=[];
families.forEach((family,fi)=>names(family,fi));
function names(family,fi){for(let n=0;n<5;n++){const idx=fi*5+n;designs.push({
id:'sg-kurti-neck-'+family.toLowerCase().replace(/[^a-z]+/g,'-')+'-'+(n+1),
type:'Kurti Neck',family,name:family+' — Design '+(n+1),index:idx,sprite,col:idx%5,row:Math.floor(idx/5),source:'SILAI GURU 50 Kurti Neck Designs'});}}
window.sgKurtiNeckDesigns=designs;
window.sgKurtiNeckFamilies=families;
})();