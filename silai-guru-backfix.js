/* SILAI GURU - CENTRAL NAVIGATION + BLOUSE CATALOG + ZOOM v29 */
(function(){
'use strict';
const IMG='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
let route='none', zoomReady=false;
const $=id=>document.getElementById(id);
const modal=()=>$('modal'), body=()=>$('mb'), title=()=>$('mt');
function showModal(){const m=modal();if(m)m.classList.add('show');}
function hideModal(){const m=modal();if(m)m.classList.remove('show');}
function goGarments(){route='garments'; if(typeof window.openGarmentLibrary==='function')window.openGarmentLibrary(); showModal();}
function push(level){history.pushState({sg:true,level:level},'',location.href);route=level;}
function zoomSetup(){
 const box=$('sgZoom'),img=$('sgZoomImg'); if(!box||!img||zoomReady)return; zoomReady=true;
 let scale=1,startScale=1,startDist=0,x=0,y=0,ox=0,oy=0,moved=false,lastTap=0,lx=0,ly=0;
 const apply=()=>img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')';
 const dist=e=>Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
 box.addEventListener('touchstart',e=>{moved=false;if(e.touches.length===2){startDist=dist(e);startScale=scale}else if(e.touches.length===1&&scale>1){ox=e.touches[0].clientX-x;oy=e.touches[0].clientY-y}},{passive:true});
 box.addEventListener('touchmove',e=>{moved=true;if(e.touches.length===2&&startDist){scale=Math.max(1,Math.min(20,startScale*dist(e)/startDist));apply()}else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-ox;y=e.touches[0].clientY-oy;apply()}},{passive:true});
 box.addEventListener('touchend',e=>{if(e.touches.length||moved)return;const t=e.changedTouches[0],now=Date.now();if(now-lastTap<450&&Math.hypot(t.clientX-lx,t.clientY-ly)<55){if(scale===1)scale=2.5;else{scale=1;x=0;y=0}apply();lastTap=0}else{lastTap=now;lx=t.clientX;ly=t.clientY}},{passive:true});
 box.addEventListener('dblclick',e=>{e.preventDefault();if(scale===1)scale=2.5;else{scale=1;x=0;y=0}apply()});
}
function blouse(){
 route='blouse';showModal();if(title())title().textContent='👚 Blouse Neck Designs';
 if(body())body().innerHTML='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button type="button" class="secondary" id="sgBack">← Garments</button><b>Blouse Neck Designs</b></div><div class="card" style="text-align:center"><h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p><div id="sgZoom" style="height:70vh;min-height:360px;overflow:hidden;background:#111;border-radius:16px;touch-action:none;display:flex;align-items:center;justify-content:center"><img id="sgZoomImg" src="'+IMG+'" alt="Blouse Neck Designs" style="width:100%;height:100%;object-fit:contain;transform-origin:center;user-select:none;-webkit-user-drag:none"></div><p class="muted">2 baar touch = bada view • 🤏 pinch se 20× tak zoom • drag karke design dekhein</p></div>';
 const b=$('sgBack');if(b)b.onclick=()=>history.back();zoomReady=false;setTimeout(zoomSetup,0);
}
function empty(type){route='catalog';showModal();if(title())title().textContent='✂️ '+type+' Designs';if(body())body().innerHTML='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button type="button" class="secondary" onclick="history.back()">← Garments</button><b>'+type+'</b></div><div class="design-empty"><h3>Design catalogue cleared</h3><p>Purane faltu built-in designs permanently disabled hain.</p></div>'}
function install(){const old=window.openDesignCatalog;if(typeof old!=='function'||old.__sgCentral)return;function open(type){const t=String(type||'');push(t.toLowerCase()==='blouse'?'blouse':'catalog');if(t.toLowerCase()==='blouse')blouse();else empty(t)}open.__sgCentral=true;window.openDesignCatalog=open}
window.addEventListener('popstate',e=>{if(route==='blouse'||route==='catalog'){goGarments();return}if(route==='garments'){route='none';hideModal();return}});
install();new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true});setInterval(install,250);
})();
