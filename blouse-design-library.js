/* SILAI GURU — authoritative Blouse Design Library + zoom viewer */
(function(){
  'use strict';

  const original = window.garmentDesignsFor;
  const blouseImage = './ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  const blouseDesign = {
    id: 'silai-guru-blouse-neck-sheet-20260930',
    type: 'Blouse',
    name: 'Blouse Neck Designs — Latest & Traditional Collection',
    image: blouseImage,
    source: 'SILAI GURU Design Library'
  };

  window.garmentDesignsFor = function(type){
    const base = typeof original === 'function' ? original(type) : [];
    if(String(type) === 'Blouse') return [blouseDesign].concat(base || []);
    return base || [];
  };

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function installViewer(){
    if(document.getElementById('sg-blouse-zoom-style')) return;

    const style=document.createElement('style');
    style.id='sg-blouse-zoom-style';
    style.textContent=`
      #sg-blouse-viewer{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.94);display:none;flex-direction:column;touch-action:none}
      #sg-blouse-viewer.sg-open{display:flex}
      #sg-blouse-viewer .sg-bv-top{height:58px;flex:0 0 58px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;box-sizing:border-box;background:rgba(20,20,20,.96);color:#fff}
      #sg-blouse-viewer .sg-bv-title{font-size:15px;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:62vw}
      #sg-blouse-viewer button{border:0;border-radius:10px;background:#fff;color:#222;font-weight:800;padding:9px 12px;font-size:14px}
      #sg-blouse-viewer .sg-bv-actions{display:flex;gap:6px;align-items:center}
      #sg-blouse-viewer .sg-bv-stage{position:relative;flex:1;min-height:0;overflow:hidden;display:flex;align-items:center;justify-content:center}
      #sg-blouse-viewer .sg-bv-img{max-width:none;max-height:none;width:auto;height:auto;transform-origin:center center;user-select:none;-webkit-user-drag:none;touch-action:none;will-change:transform}
      #sg-blouse-viewer .sg-bv-bottom{height:48px;flex:0 0 48px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;background:rgba(20,20,20,.96)}
    `;
    document.head.appendChild(style);

    const viewer=document.createElement('div');
    viewer.id='sg-blouse-viewer';
    viewer.innerHTML=`
      <div class="sg-bv-top">
        <div class="sg-bv-title">SILAI GURU • Blouse Design</div>
        <div class="sg-bv-actions">
          <button type="button" data-sg-zoom="out">−</button>
          <button type="button" data-sg-zoom="reset">Reset</button>
          <button type="button" data-sg-zoom="in">+</button>
          <button type="button" data-sg-zoom="close">✕</button>
        </div>
      </div>
      <div class="sg-bv-stage"><img class="sg-bv-img" alt="Blouse Design"></div>
      <div class="sg-bv-bottom">Pinch with two fingers to zoom • Drag to move • Double tap to zoom</div>
    `;
    document.body.appendChild(viewer);

    const stage=viewer.querySelector('.sg-bv-stage');
    const img=viewer.querySelector('.sg-bv-img');
    let scale=1, x=0, y=0, lastTap=0, pointers=new Map(), startDist=0, startScale=1, startX=0, startY=0, startPX=0, startPY=0;

    function clampScale(v){return Math.min(20,Math.max(.5,v));}
    function render(){img.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`;}
    function reset(){scale=1;x=0;y=0;render();}
    function open(src,title){
      img.src=src;viewer.querySelector('.sg-bv-title').textContent=title||'SILAI GURU • Blouse Design';reset();viewer.classList.add('sg-open');
    }
    function close(){viewer.classList.remove('sg-open');img.removeAttribute('src');}
    window.sgOpenBlouseViewer=open;

    viewer.addEventListener('click',e=>{
      const b=e.target.closest('[data-sg-zoom]');if(!b)return;
      const action=b.dataset.sgZoom;
      if(action==='in')scale=clampScale(scale*1.35);
      else if(action==='out')scale=clampScale(scale/1.35);
      else if(action==='reset')reset();
      else if(action==='close')close();
      render();
    });

    stage.addEventListener('pointerdown',e=>{
      pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});stage.setPointerCapture(e.pointerId);
      if(pointers.size===1){startX=x;startY=y;startPX=e.clientX;startPY=e.clientY;}
      if(pointers.size===2){const a=[...pointers.values()];startDist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);startScale=scale;}
    });
    stage.addEventListener('pointermove',e=>{
      if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size===2){const a=[...pointers.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(startDist)scale=clampScale(startScale*(d/startDist));}
      else if(pointers.size===1){x=startX+(e.clientX-startPX);y=startY+(e.clientY-startPY);}
      render();
    });
    ['pointerup','pointercancel','pointerleave'].forEach(ev=>stage.addEventListener(ev,e=>pointers.delete(e.pointerId)));
    stage.addEventListener('wheel',e=>{e.preventDefault();scale=clampScale(scale*(e.deltaY<0?1.15:.87));render();},{passive:false});
    stage.addEventListener('dblclick',e=>{e.preventDefault();scale=clampScale(scale<2?2.5:1);render();});
    document.addEventListener('keydown',e=>{if(!viewer.classList.contains('sg-open'))return;if(e.key==='Escape')close();});

    // Capture the existing library's Show button without changing the authoritative order runtime.
    document.addEventListener('click',e=>{
      const btn=e.target.closest('button');if(!btn)return;
      const text=(btn.textContent||'').trim().toLowerCase();
      if(text!=='show')return;
      const scope=btn.closest('[class*="design"],[class*="Design"],div')||btn.parentElement;
      const candidate=scope?.querySelector('img');
      const src=candidate?.getAttribute('src') || blouseImage;
      if(src){e.preventDefault();e.stopPropagation();open(src,'SILAI GURU • Blouse Design');}
    },true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installViewer,{once:true});
  else installViewer();
})();
