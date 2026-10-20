/* SILAI GURU — Round Neck catalogue fix v1 */
(function(){
'use strict';
function esc(s){return String(s||'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));}
function uploadBox(orderIndex){
 const target=orderIndex===undefined?'':'<input type="hidden" id="sgUploadOrderIndex" value="'+orderIndex+'">';
 return '<div class="sg-rn-upload"><b>➕ Naya Design Add Karein</b><div class="sg-rn-upload-grid">'+
 '<button type="button" class="secondary" onclick="sgRoundCamera('+orderIndex+')">📷 Camera</button>'+
 '<button type="button" class="secondary" onclick="sgRoundGallery('+orderIndex+')">🖼️ Gallery</button>'+
 '<button type="button" class="secondary" onclick="sgRoundWebsite('+orderIndex+')">🌐 Website / Image URL</button></div>'+target+ '<input id="sgRoundFile" type="file" accept="image/*" capture="environment" style="display:none">'+
 '<input id="sgRoundGalleryFile" type="file" accept="image/*" style="display:none"></div>';
}
function source(){return 'https://raw.githubusercontent.com/vaghmaresantosh09-tech/silai-guru/ee37f1fe07081f444051c717c4c8cfdfd29a9231/ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';}
function cards(orderIndex){
 const names=['Round Neck 01','Round Neck 02','Round Neck 03','Round Neck 04','Round Neck 05','Round Neck 06','Round Neck 07','Round Neck 08','Round Neck 09','Round Neck 10','Round Neck 11','Round Neck 12'];
 const out=[];
 for(let i=0;i<12;i++){
  const col=i%6,row=Math.floor(i/6),x=17+col*99.7,y=151+row*187;
  const style='background-image:url("'+source()+'");background-repeat:no-repeat;background-size:'+(1254/96*100)+'% '+(1254/80*100)+'%;background-position:'+((x/(1254-96))*100)+'% '+((y/(1254-80))*100)+'%;';
  const select=orderIndex===undefined?'':'<button type="button" class="primary" onclick="sgRoundSelect('+orderIndex+','+i+')">✓ Select</button>';
  out.push('<div class="design-card"><div class="design-img sg-rn-crop" style="'+style+'" aria-label="'+esc(names[i])+'"></div><div class="design-name">'+names[i]+'</div><div class="design-actions"><button type="button" class="secondary" onclick="sgRoundShow('+i+','+orderIndex+')">👁 Show</button>'+select+'<button type="button" class="secondary" onclick="sgRoundSave('+i+')">💾 Save</button></div></div>');
 }
 return out.join('');
}
function render(orderIndex){
 mt.textContent='✨ Round Neck Catalogue';
 mb.innerHTML='<div class="design-back">'+(orderIndex===undefined?'<button class="secondary" onclick="openBlouseDesignChoice()">← Blouse</button>':'<button class="secondary" onclick="openBlouseDesignChoiceForOrder('+orderIndex+')">← Blouse</button>')+'<b>Round Neck · 12 Designs</b></div><div class="library-note">Har design alag card mein hai. Design ko Show, Save ya Order mein Select karein.</div><div class="design-grid sg-rn-grid">'+cards(orderIndex)+'</div>'+uploadBox(orderIndex);
}
window.sgRoundShow=function(i,orderIndex){render(orderIndex);const el=mb.querySelectorAll('.sg-rn-crop')[i];if(el){el.style.height='330px';el.style.gridColumn='1/-1';el.scrollIntoView({behavior:'smooth',block:'center'});}};
window.sgRoundSave=function(i){
 const names=['Round Neck 01','Round Neck 02','Round Neck 03','Round Neck 04','Round Neck 05','Round Neck 06','Round Neck 07','Round Neck 08','Round Neck 09','Round Neck 10','Round Neck 11','Round Neck 12'];
 try{const a=JSON.parse(localStorage.getItem('sg_garment_designs')||'[]');const id='sg-round-neck-'+i;if(!a.some(x=>x&&x.id===id)){a.push({id,type:'Blouse',name:names[i],image:source(),source:'Round Neck Catalogue',savedAt:Date.now()});localStorage.setItem('sg_garment_designs',JSON.stringify(a));}alert(names[i]+' Blouse folder mein save ho gaya ✓');}catch(e){alert('Design save nahi ho paya.');}
};
window.sgRoundSelect=function(orderIndex,i){const names=['Round Neck 01','Round Neck 02','Round Neck 03','Round Neck 04','Round Neck 05','Round Neck 06','Round Neck 07','Round Neck 08','Round Neck 09','Round Neck 10','Round Neck 11','Round Neck 12'];window.orderDesignTargets=window.orderDesignTargets||[];window.orderDesignTargets[orderIndex]={source:'SILAI GURU',name:names[i],url:'',image:source(),crop:{index:i}};if(typeof backToOrderPicker==='function')backToOrderPicker();else alert(names[i]+' order mein select ho gaya ✓');};
window.sgRoundCamera=function(orderIndex){const x=document.getElementById('sgRoundFile');x.dataset.orderIndex=orderIndex===undefined?'':orderIndex;x.setAttribute('capture','environment');x.click();};
window.sgRoundGallery=function(orderIndex){const x=document.getElementById('sgRoundGalleryFile');x.dataset.orderIndex=orderIndex===undefined?'':orderIndex;x.click();};
window.sgRoundWebsite=function(orderIndex){const url=prompt('Website/Image URL paste karein:');if(!url)return;try{const a=JSON.parse(localStorage.getItem('sg_garment_designs')||'[]');a.push({id:'sg-upload-'+Date.now(),type:'Blouse',name:'My Round Neck Design',image:url,url,source:'Website',savedAt:Date.now()});localStorage.setItem('sg_garment_designs',JSON.stringify(a));alert('Website design Blouse folder mein save ho gaya ✓');}catch(e){alert('URL save nahi hua.');}};
function handleFile(file,orderIndex){if(!file)return;const r=new FileReader();r.onload=function(){try{const a=JSON.parse(localStorage.getItem('sg_garment_designs')||'[]');a.push({id:'sg-upload-'+Date.now(),type:'Blouse',name:'My Round Neck Design',image:r.result,source:'Camera/Gallery',savedAt:Date.now()});localStorage.setItem('sg_garment_designs',JSON.stringify(a));alert('Naya design Blouse folder mein save ho gaya ✓');render(orderIndex===''?undefined:Number(orderIndex));}catch(e){alert('Image save nahi hui.');}};r.readAsDataURL(file);}
document.addEventListener('change',e=>{if(e.target.id==='sgRoundFile'||e.target.id==='sgRoundGalleryFile')handleFile(e.target.files&&e.target.files[0],e.target.dataset.orderIndex);});
function hook(){
 if(typeof window.openBlouseDesignChoice==='function'&&!window.openBlouseDesignChoice.__sgRN){
  window.openBlouseDesignChoice=function(){mt.textContent='🎨 Blouse Design';mb.innerHTML='<div class="design-back"><button class="secondary" onclick="openGarmentLibrary()">← Garments</button><b>Blouse</b></div><div class="sg-blouse-catalog-pair"><button type="button" class="sg-blouse-catalog-tile" onclick="openBlouseNeckCatalog(0)"><span>✨ Blouse Neck Designs — Latest & Traditional Collection</span></button><button type="button" class="sg-blouse-catalog-tile" onclick="openBlouseRoundNeckFullCatalog()"><span>✨ Round Neck Catalogue — Full 12 Designs</span></button></div>'};window.openBlouseDesignChoice.__sgRN=true;
 }
 window.openBlouseRoundNeckFullCatalog=render;
 if(typeof window.openBlouseDesignChoiceForOrder==='function'&&!window.openBlouseDesignChoiceForOrder.__sgRN){
  window.openBlouseDesignChoiceForOrder=function(orderIndex){mt.textContent='🎨 Blouse Design';mb.innerHTML='<div class="design-back"><button class="secondary" onclick="backToOrderPicker()">← Order</button><b>Blouse</b></div><div class="sg-blouse-catalog-pair"><button type="button" class="sg-blouse-catalog-tile" onclick="openBlouseNeckCatalogForOrder(0,'+orderIndex+')"><span>✨ Blouse Neck Designs — Latest & Traditional Collection</span></button><button type="button" class="sg-blouse-catalog-tile" onclick="openBlouseRoundNeckFullCatalog('+orderIndex+')"><span>✨ Round Neck Catalogue — Full 12 Designs</span></button></div>'};window.openBlouseDesignChoiceForOrder.__sgRN=true;
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(hook,0));else setTimeout(hook,0);
setTimeout(hook,500);setTimeout(hook,1500);
})();
