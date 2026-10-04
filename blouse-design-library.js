/* SILAI GURU — Blouse Design Library v48
   Verified blouse neck design collection.
   This library is protected: the built-in blouse collection is not deletable.
   Viewer navigation is isolated to SILAI GURU and supports Android/browser Back.
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
function install(){
  const current=window.garmentDesignsFor;
  if(typeof current!=='function') return false;
  if(current.__sgBlouseProtectedV48) return true;
  const base=current;
  function wrapped(type){
    let list=[];
    try{list=base(type)||[]}catch(e){list=[]}
    list=list.filter(x=>x?.id!==blouseDesign.id);
    return String(type)==='Blouse' ? [blouseDesign].concat(list) : list;
  }
  wrapped.__sgBlouseProtectedV48=true;
  window.garmentDesignsFor=wrapped;

  if(!window.sgOpenBlouseViewer){
    const style=document.createElement('style');
    style.id='sg-blouse-zoom-style-v48';
    style.textContent='#sg-blouse-viewer-v48{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.94);display:none;flex-direction:column}#sg-blouse-viewer-v48.open{display:flex}#sg-blouse-viewer-v48 .top{display:flex;justify-content:space-between;align-items:center;padding:10px;background:#151515;color:#fff}#sg-blouse-viewer-v48 .stage{flex:1;overflow:hidden;display:flex;align-items:center;justify-content:center;touch-action:none}#sg-blouse-viewer-v48 img{max-width:none;max-height:none;transform-origin:center;user-select:none}#sg-blouse-viewer-v48 .bottom{padding:8px;text-align:center;color:#fff;background:#151515;font-size:12px}#sg-blouse-viewer-v48 button{background:#333;color:#fff;padding:8px 12px;border-radius:10px}';
    document.head.appendChild(style);
    const v=document.createElement('div');
    v.id='sg-blouse-viewer-v48';
    v.innerHTML='<div class="top"><b>SILAI GURU • Blouse Design</b><button type="button" data-z="x">✕</button></div><div class="stage"><img alt="Blouse Design"></div><div class="bottom">Pinch / drag / double tap to zoom</div>';
    document.body.appendChild(v);
    const img=v.querySelector('img'),stage=v.querySelector('.stage');
    let scale=1,x=0,y=0,pointers=new Map(),dist=0,start=1,sx=0,sy=0,px=0,py=0;
    function render(){img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'}
    function isOpen(){return v.classList.contains('open')}
    function pushViewerHistory(){
      if(!history.state||history.state.sgBlouseViewer!==true){
        history.pushState(Object.assign({},history.state||{},{sgBlouseViewer:true}),document.title,location.href);
      }
    }
    function closeViewer(fromPop){
      if(!isOpen()) return false;
      v.classList.remove('open');
      pointers.clear();
      if(!fromPop&&history.state&&history.state.sgBlouseViewer===true) history.back();
      return true;
    }
    window.sgOpenBlouseViewer=function(src,title){
      if(!src)return;
      img.src=src;
      v.querySelector('.top b').textContent='SILAI GURU • '+(title||'Blouse Design');
      scale=1;x=0;y=0;render();v.classList.add('open');pushViewerHistory();
    };
    v.addEventListener('click',e=>{const a=e.target.closest('[data-z]');if(a&&a.dataset.z==='x')closeViewer(false)});
    stage.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){sx=x;sy=y;px=e.clientX;py=e.clientY}if(pointers.size===2){const a=[...pointers.values()];dist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);start=scale}});
    stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const a=[...pointers.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(dist)scale=Math.min(20,Math.max(.5,start*d/dist))}else{x=sx+e.clientX-px;y=sy+e.clientY-py}render()});
    ['pointerup','pointercancel','pointerleave'].forEach(n=>stage.addEventListener(n,e=>pointers.delete(e.pointerId)));
    stage.addEventListener('dblclick',()=>{scale=scale<2?2.5:1;render()});
    window.addEventListener('popstate',function(){closeViewer(true)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeViewer(false)});
  }
  return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);
setTimeout(install,1000);
})();