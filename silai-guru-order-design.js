/* SILAI GURU — design viewer bridge v1 */
(function(){
'use strict';
function install(){
  if(window.__sgDesignViewerBridge)return;
  window.__sgDesignViewerBridge=true;
  const style=document.createElement('style');style.id='sg-design-viewer-bridge-style';style.textContent='#sg-design-viewer-bridge{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.94);display:none;flex-direction:column}#sg-design-viewer-bridge.open{display:flex}#sg-design-viewer-bridge .sg-dv-top{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#151515;color:#fff}#sg-design-viewer-bridge .sg-dv-stage{flex:1;overflow:hidden;display:flex;align-items:center;justify-content:center;touch-action:none}#sg-design-viewer-bridge img{max-width:none;max-height:none;transform-origin:center;user-select:none}#sg-design-viewer-bridge .sg-dv-bottom{padding:9px;text-align:center;color:#fff;background:#151515;font-size:12px}#sg-design-viewer-bridge button{background:#333;color:#fff;padding:8px 12px}';document.head.appendChild(style);
  const v=document.createElement('div');v.id='sg-design-viewer-bridge';v.innerHTML='<div class="sg-dv-top"><b>SILAI GURU • Design</b><button type="button" data-sg-dv-close>✕</button></div><div class="sg-dv-stage"><img alt="Design preview"></div><div class="sg-dv-bottom">Pinch / drag / double tap to zoom</div>';document.body.appendChild(v);
  const img=v.querySelector('img'),stage=v.querySelector('.sg-dv-stage');let scale=1,x=0,y=0,pointers=new Map(),dist=0,start=1,sx=0,sy=0,px=0,py=0;
  function render(){img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'}
  function open(src,title){if(!src)return;img.src=src;v.querySelector('.sg-dv-top b').textContent='SILAI GURU • '+(title||'Design');scale=1;x=0;y=0;render();v.classList.add('open')}
  v.addEventListener('click',e=>{if(e.target.closest('[data-sg-dv-close]'))v.classList.remove('open')});
  stage.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){sx=x;sy=y;px=e.clientX;py=e.clientY}else if(pointers.size===2){const a=[...pointers.values()];dist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);start=scale}});
  stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const a=[...pointers.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(dist)scale=Math.min(20,Math.max(.5,start*d/dist))}else{x=sx+e.clientX-px;y=sy+e.clientY-py}render()});
  ['pointerup','pointercancel','pointerleave'].forEach(n=>stage.addEventListener(n,e=>pointers.delete(e.pointerId)));
  stage.addEventListener('dblclick',()=>{scale=scale<2?2.5:1;render()});
  document.addEventListener('click',e=>{
    const b=e.target.closest('.design-card button,.design-card [role="button"],button');if(!b)return;
    const label=((b.innerText||b.textContent||'')+' '+(b.getAttribute('aria-label')||'')+' '+(b.getAttribute('title')||'')).trim().toLowerCase();
    if(!/(show|view|preview|देख)/i.test(label))return;
    const card=b.closest('.design-card');if(!card)return;
    const image=card.querySelector('.design-img img,img');if(!image||!image.src)return;
    e.preventDefault();e.stopPropagation();open(image.currentSrc||image.src,card.querySelector('.design-name')?.textContent?.trim()||'Design');
  },true);
  window.sgOpenDesignViewer=open;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();setTimeout(install,300);setTimeout(install,1000);
})();
