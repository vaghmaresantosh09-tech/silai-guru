/* SILAI GURU — design viewer bridge v5: reliable Back to Order + Android/browser Back */
(function(){
'use strict';
function install(){
  if(window.__sgDesignViewerBridge)return;
  window.__sgDesignViewerBridge=true;
  const style=document.createElement('style');
  style.id='sg-design-viewer-bridge-style';
  style.textContent='#sg-design-viewer-bridge{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.94);display:none;flex-direction:column}#sg-design-viewer-bridge.open{display:flex}#sg-design-viewer-bridge .sg-dv-top{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 12px;background:#151515;color:#fff}#sg-design-viewer-bridge .sg-dv-top b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#sg-design-viewer-bridge .sg-dv-top button{background:#333;color:#fff;padding:8px 12px;border-radius:9px}#sg-design-viewer-bridge .sg-dv-stage{flex:1;overflow:hidden;display:flex;align-items:center;justify-content:center;touch-action:none}#sg-design-viewer-bridge .sg-dv-media{max-width:94vw;max-height:82vh;transform-origin:center;user-select:none;-webkit-user-drag:none;display:flex;align-items:center;justify-content:center}#sg-design-viewer-bridge .sg-dv-media img{max-width:94vw;max-height:82vh;object-fit:contain;border-radius:12px}#sg-design-viewer-bridge .sg-dv-media svg{width:min(94vw,620px);height:auto;max-height:82vh}#sg-design-viewer-bridge .sg-dv-bottom{padding:9px;text-align:center;color:#fff;background:#151515;font-size:12px}';
  document.head.appendChild(style);
  const v=document.createElement('div');
  v.id='sg-design-viewer-bridge';
  v.innerHTML='<div class="sg-dv-top"><button type="button" data-sg-dv-back aria-label="Back to Order">← Back to Order</button><b>SILAI GURU • Design</b><button type="button" data-sg-dv-close aria-label="Close design preview">✕</button></div><div class="sg-dv-stage"><div class="sg-dv-media"></div></div><div class="sg-dv-bottom">Pinch / drag / double tap to zoom</div>';
  document.body.appendChild(v);
  const media=v.querySelector('.sg-dv-media'),stage=v.querySelector('.sg-dv-stage');
  let scale=1,x=0,y=0,pointers=new Map(),dist=0,start=1,sx=0,sy=0,px=0,py=0;
  function render(){media.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'}
  function isOpen(){return v.classList.contains('open')}
  function pushViewerHistory(){
    if(!history.state||history.state.sgDesignViewer!==true){
      history.pushState(Object.assign({},history.state||{},{sgDesignViewer:true}),document.title,location.href);
    }
  }
  function focusOrder(){
    const i=window.orderDesignTargetIndex;
    const target=(i!==undefined&&i!==null)?(
      document.getElementById('garment-'+i)||
      document.getElementById('garment-picker-'+i)
    ):null;
    const fallback=document.getElementById('garmentsWrap')||document.getElementById('orderForm');
    const el=target||fallback;
    if(el&&typeof el.scrollIntoView==='function'){
      setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'center'}),30);
    }
  }
  function closeViewer(fromPop,after){
    if(!isOpen()){if(after)after();return false}
    v.classList.remove('open');
    pointers.clear();
    scale=1;x=0;y=0;render();
    if(!fromPop&&history.state&&history.state.sgDesignViewer===true){
      history.back();
      if(after)setTimeout(after,80);
    }else if(after)after();
    return true;
  }
  function open(src,title,html){
    if(!src&&!html)return;
    media.innerHTML=html||'<img alt="Design preview">';
    if(!html){const img=media.querySelector('img');img.src=src}
    v.querySelector('.sg-dv-top b').textContent='SILAI GURU • '+(title||'Design');
    scale=1;x=0;y=0;render();v.classList.add('open');pushViewerHistory();
  }
  function backToOrder(){
    closeViewer(false,()=>{
      if(typeof window.backToOrderPicker==='function'&&window.orderDesignTargetIndex!==undefined){
        try{window.backToOrderPicker(window.orderDesignTargetIndex)}catch(e){}
      }
      focusOrder();
    });
  }
  v.addEventListener('click',e=>{
    if(e.target.closest('[data-sg-dv-back]')){e.preventDefault();backToOrder();return}
    if(e.target.closest('[data-sg-dv-close]')){e.preventDefault();closeViewer(false);}
  });
  stage.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){sx=x;sy=y;px=e.clientX;py=e.clientY}else if(pointers.size===2){const a=[...pointers.values()];dist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);start=scale}});
  stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const a=[...pointers.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(dist)scale=Math.min(20,Math.max(.5,start*d/dist))}else{x=sx+e.clientX-px;y=sy+e.clientY-py}render()});
  ['pointerup','pointercancel','pointerleave'].forEach(n=>stage.addEventListener(n,e=>pointers.delete(e.pointerId)));
  stage.addEventListener('dblclick',()=>{scale=scale<2?2.5:1;render()});
  document.addEventListener('click',e=>{
    const b=e.target.closest('.design-card button,.design-card [role="button"]');if(!b)return;
    const label=((b.innerText||b.textContent||'')+' '+(b.getAttribute('aria-label')||'')+' '+(b.getAttribute('title')||'')).trim().toLowerCase();
    if(!/(show|view|preview|देख)/i.test(label))return;
    const card=b.closest('.design-card');if(!card)return;
    const image=card.querySelector('.design-img img');
    const svg=card.querySelector('.design-img svg');
    if(!image&&!svg)return;
    e.preventDefault();e.stopPropagation();
    if(image)open(image.currentSrc||image.src,card.querySelector('.design-name')?.textContent?.trim()||'Design');
    else open('',card.querySelector('.design-name')?.textContent?.trim()||'Design',svg.outerHTML);
  },true);
  window.addEventListener('popstate',function(){if(closeViewer(true))return});
  window.sgOpenDesignViewer=open;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,300);setTimeout(install,1000);
})();
