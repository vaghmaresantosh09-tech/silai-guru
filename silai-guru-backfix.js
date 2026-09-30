/* SILAI GURU CORE CATALOG + BACK FIX v27
   Single authoritative catalogue/back layer.
*/
(function(){
  'use strict';
  const BLOUSE_IMG='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  let route='none', zoomBound=false, busy=false;
  const safe=t=>String(t||'').replace(/[<>]/g,'');
  const modal=()=>document.getElementById('modal');
  const body=()=>document.getElementById('mb');
  const title=()=>document.getElementById('mt');
  function openModal(){const m=modal();if(m)m.classList.add('modal','show')}
  function closeModal(){if(typeof window.closeM==='function')window.closeM();else{const m=modal();if(m)m.classList.remove('show')}}
  function push(level){history.pushState({sgSilaiGuru:true,level},'',location.href);route=level}
  function garments(){route='garments';if(typeof window.openGarmentLibrary==='function')window.openGarmentLibrary();else if(typeof window.openM==='function')window.openM('designs');openModal()}
  function setupZoom(){
    const box=document.getElementById('sgCoreZoomBox'),img=document.getElementById('sgCoreZoomImg');
    if(!box||!img||zoomBound)return; zoomBound=true;
    let scale=1,startScale=1,startDist=0,x=0,y=0,lastX=0,lastY=0;
    const apply=()=>{img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'};
    box.addEventListener('touchstart',e=>{if(e.touches.length===2){startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=scale}else if(e.touches.length===1&&scale>1){lastX=e.touches[0].clientX-x;lastY=e.touches[0].clientY-y}},{passive:true});
    box.addEventListener('touchmove',e=>{if(e.touches.length===2&&startDist){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(12,startScale*d/startDist));apply()}else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-lastX;y=e.touches[0].clientY-lastY;apply()}},{passive:true});
    box.addEventListener('dblclick',()=>{scale=scale===1?2:1;x=0;y=0;apply()});
  }
  function showBlouse(){
    route='blouse';openModal();
    if(title())title().textContent='👚 Blouse Neck Designs';
    if(body())body().innerHTML='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button type="button" class="secondary" id="sgCoreBack">← Garments</button><b>Blouse Neck Designs</b></div><div class="card" style="text-align:center"><h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p><div id="sgCoreZoomBox" style="position:relative;overflow:hidden;height:70vh;min-height:360px;background:#111;border-radius:16px;touch-action:none;display:flex;align-items:center;justify-content:center"><img id="sgCoreZoomImg" src="'+BLOUSE_IMG+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:100%;object-fit:contain;display:block;transform-origin:center;user-select:none;-webkit-user-drag:none;will-change:transform"></div><p class="muted">Do ungliyon se pinch karke jitna chahein zoom karein • zoom ke baad drag karein</p></div>';
    const b=document.getElementById('sgCoreBack');if(b)b.onclick=()=>history.back();zoomBound=false;setTimeout(setupZoom,0);
  }
  function cleared(type){route='catalog';openModal();if(title())title().textContent='✂️ '+safe(type)+' Designs';if(body())body().innerHTML='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button type="button" class="secondary" onclick="history.back()">← Garments</button><b>'+safe(type)+'</b></div><div class="design-empty"><h3>Design catalogue cleared</h3><p>Purane faltu built-in designs permanently disabled hain.</p><p class="muted">Actual catalogue add hone par yahin dikhaya jayega.</p></div>'}
  function install(){
    const fn=window.openDesignCatalog;
    if(typeof fn!=='function')return false;
    if(fn.__sgCoreV27)return true;
    function wrapped(type){
      const t=safe(type);
      if(t.toLowerCase()==='blouse'){push('blouse');showBlouse();return}
      if(t.toLowerCase()==='kurti'&&typeof window.openKurtiNeckCatalog==='function'){push('catalog');window.openKurtiNeckCatalog();return}
      push('catalog');cleared(t);
    }
    wrapped.__sgCoreV27=true;wrapped.__sgOriginal=fn;window.openDesignCatalog=wrapped;return true;
  }
  function killOldBlouseCards(){
    if(busy)return;
    const m=modal();if(!m||!m.classList.contains('show'))return;
    const text=(m.textContent||'').toLowerCase();
    if(!text.includes('blouse'))return;
    const generic=text.includes('20 designs')||text.includes('padded blouse')||text.includes('princess cut blouse')||text.includes('built-in reference');
    if(generic){busy=true;push('blouse');showBlouse();setTimeout(()=>busy=false,0)}
  }
  function paintIcons(){
    document.querySelectorAll('.garment-library-card .libpic').forEach(el=>{const card=el.closest('.garment-library-card');const n=(card?.querySelector('b')?.textContent||'').trim();if(n&&typeof window.garmentVisual==='function'&&!el.querySelector('svg')){try{el.innerHTML=window.garmentVisual(n)}catch(e){}}});
  }
  window.addEventListener('popstate',e=>{
    const level=e.state&&e.state.sgSilaiGuru?e.state.level:null;
    if(route==='blouse'||route==='catalog'){route='garments';garments();return}
    if(route==='garments'||level===null){route='none';closeModal()}
  });
  const obs=new MutationObserver(()=>{try{install();paintIcons();killOldBlouseCards()}catch(e){}});
  obs.observe(document.documentElement,{childList:true,subtree:true});
  const timer=setInterval(()=>{try{if(install())clearInterval(timer);paintIcons();killOldBlouseCards()}catch(e){}},100);
  document.addEventListener('DOMContentLoaded',()=>{install();paintIcons();killOldBlouseCards()});
})();