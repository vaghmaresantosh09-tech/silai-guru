/* SILAI GURU — authoritative Blouse Design Library v46 */
(function(){
'use strict';
const blouseImage='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
const blouseDesign={id:'silai-guru-blouse-neck-sheet-20260930',type:'Blouse',name:'Blouse Neck Designs — Latest & Traditional Collection',image:blouseImage,source:'SILAI GURU Design Library'};
let installed=false;
function installGarmentDesigns(){
  const current=window.garmentDesignsFor;
  if(typeof current!=='function') return false;
  if(current.__sgBlouseV46) return true;
  const base=current;
  function wrapped(type){
    let list=[]; try{list=base(type)||[]}catch(_){list=[]}
    list=list.filter(x=>x?.id!==blouseDesign.id);
    return String(type)==='Blouse'?[blouseDesign].concat(list):list;
  }
  wrapped.__sgBlouseV46=true;
  window.garmentDesignsFor=wrapped;
  return true;
}
function addCard(grid){
  if(!grid || grid.querySelector('[data-sg-blouse-design]')) return;
  const card=document.createElement('div');
  card.setAttribute('data-sg-blouse-design','1');
  card.className='design-card';
  card.innerHTML='<div class="design-img"><img src="'+blouseImage+'" alt="'+blouseDesign.name+'"></div><div class="design-name">'+blouseDesign.name+'</div><div class="design-actions"><button type="button" class="primary" data-sg-show-blouse="1">👁️ Show</button></div>';
  grid.prepend(card);
}
function patchRenderer(name){
  const fn=window[name];
  if(typeof fn!=='function' || fn.__sgBlouseV46) return;
  function wrapped(type){
    const result=fn.apply(this,arguments);
    if(String(type)==='Blouse') setTimeout(()=>addCard(document.getElementById(name==='filterOrderDesigns'?'orderDesignGrid':'designGrid')),0);
    return result;
  }
  wrapped.__sgBlouseV46=true;
  window[name]=wrapped;
}
function ensureCard(){
  const text=(document.body?.innerText||'').toLowerCase();
  const isBlouse=text.includes('blouse') || String(window.__sgCurrentDesignType||'')==='Blouse';
  if(!isBlouse) return;
  addCard(document.getElementById('designGrid'));
  addCard(document.getElementById('orderDesignGrid'));
}
function install(){
  if(installed) return;
  installed=true;
  installGarmentDesigns();
  patchRenderer('filterDesigns');
  patchRenderer('filterOrderDesigns');
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-sg-show-blouse]');
    if(b){e.preventDefault();e.stopPropagation();window.sgOpenBlouseViewer?.(blouseImage,blouseDesign.name);}
  },true);
  if(!document.getElementById('sg-blouse-zoom-style')){
    const s=document.createElement('style');s.id='sg-blouse-zoom-style';s.textContent='#sg-blouse-viewer{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.94);display:none;flex-direction:column}#sg-blouse-viewer.open{display:flex}#sg-blouse-viewer .top{display:flex;justify-content:space-between;align-items:center;padding:10px;background:#151515;color:#fff}#sg-blouse-viewer .stage{flex:1;overflow:hidden;display:flex;align-items:center;justify-content:center;touch-action:none}#sg-blouse-viewer img{max-width:none;max-height:none;transform-origin:center;user-select:none}#sg-blouse-viewer .bottom{padding:8px;text-align:center;color:#fff;background:#151515;font-size:12px}';document.head.appendChild(s);
    const v=document.createElement('div');v.id='sg-blouse-viewer';v.innerHTML='<div class="top"><b>SILAI GURU • Blouse Design</b><div><button data-z="-">−</button><button data-z="0">Reset</button><button data-z="+">+</button><button data-z="x">✕</button></div></div><div class="stage"><img alt="Blouse Design"></div><div class="bottom">Pinch / drag / double tap to zoom</div></div>';document.body.appendChild(v);
    const img=v.querySelector('img'),stage=v.querySelector('.stage');let scale=1,x=0,y=0,pointers=new Map(),dist=0,start=1,sx=0,sy=0,px=0,py=0;
    function render(){img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'}
    window.sgOpenBlouseViewer=function(src,title){img.src=src;v.querySelector('.top b').textContent='SILAI GURU • '+title;scale=1;x=0;y=0;render();v.classList.add('open')};
    v.addEventListener('click',e=>{const a=e.target.closest('[data-z]');if(!a)return;const z=a.dataset.z;if(z==='+')scale=Math.min(20,scale*1.35);else if(z==='-')scale=Math.max(.5,scale/1.35);else if(z==='0'){scale=1;x=0;y=0}else v.classList.remove('open');render()});
    stage.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){sx=x;sy=y;px=e.clientX;py=e.clientY}if(pointers.size===2){const a=[...pointers.values()];dist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);start=scale}});
    stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const a=[...pointers.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(dist)scale=Math.min(20,Math.max(.5,start*d/dist))}else{x=sx+e.clientX-px;y=sy+e.clientY-py}render()});
    ['pointerup','pointercancel','pointerleave'].forEach(n=>stage.addEventListener(n,e=>pointers.delete(e.pointerId)));stage.addEventListener('dblclick',()=>{scale=scale<2?2.5:1;render()});
  }
  const timer=setInterval(()=>{installGarmentDesigns();patchRenderer('filterDesigns');patchRenderer('filterOrderDesigns');ensureCard()},250);
  setTimeout(()=>clearInterval(timer),15000);
  new MutationObserver(ensureCard).observe(document.body,{childList:true,subtree:true});
  ensureCard();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();