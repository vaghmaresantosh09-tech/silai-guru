/* SILAI GURU CORE CATALOG + BACK FIX v26
   One stable file for:
   - Blouse real catalogue only (no 20 built-in cards)
   - Step-by-step Android/browser Back
   - In-app <- Garments button
   - Pinch zoom + drag without zooming the whole page
   - Garment icon repaint
*/
(function(){
  'use strict';
  const BLOUSE_IMG='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  let route='none';
  let zoomBound=false;

  function modalBody(){return document.getElementById('mb')}
  function modalTitle(){return document.getElementById('mt')}
  function openModal(){const m=document.getElementById('modal');if(m)m.classList.add('modal','show')}
  function closeModal(){if(typeof window.closeM==='function')window.closeM();else{const m=document.getElementById('modal');if(m)m.classList.remove('show')}}
  function pushRoute(level){route=level;history.pushState({sgSilaiGuru:true,level},'',location.href)}
  function showGarments(push){
    route='garments';
    if(push)history.pushState({sgSilaiGuru:true,level:'garments'},'',location.href);
    if(typeof window.openGarmentLibrary==='function')window.openGarmentLibrary();
    else if(typeof window.openM==='function')window.openM('designs');
    openModal();
  }

  function setupZoom(){
    const box=document.getElementById('sgCoreZoomBox'),img=document.getElementById('sgCoreZoomImg');
    if(!box||!img||zoomBound)return;
    zoomBound=true;
    let scale=1,startScale=1,startDist=0,x=0,y=0,lastX=0,lastY=0;
    function apply(){img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'}
    box.addEventListener('touchstart',function(e){
      if(e.touches.length===2){
        startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        startScale=scale;
      }else if(e.touches.length===1&&scale>1){lastX=e.touches[0].clientX-x;lastY=e.touches[0].clientY-y}
    },{passive:true});
    box.addEventListener('touchmove',function(e){
      if(e.touches.length===2&&startDist){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        scale=Math.max(1,Math.min(12,startScale*d/startDist));apply();
      }else if(e.touches.length===1&&scale>1){
        x=e.touches[0].clientX-lastX;y=e.touches[0].clientY-lastY;apply();
      }
    },{passive:true});
    box.addEventListener('dblclick',function(){scale=scale===1?2:1;x=0;y=0;apply()});
  }

  function showBlouse(){
    route='blouse';
    const title=modalTitle(),body=modalBody();
    openModal();
    if(title)title.textContent='👚 Blouse Neck Designs';
    if(body)body.innerHTML=
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">'+
        '<button type="button" class="secondary" id="sgCoreBack">← Garments</button><b>Blouse Neck Designs</b></div>'+
      '<div class="card" style="text-align:center">'+
        '<h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p>'+
        '<div id="sgCoreZoomBox" style="position:relative;overflow:hidden;height:70vh;min-height:360px;background:#111;border-radius:16px;touch-action:none;display:flex;align-items:center;justify-content:center">'+
          '<img id="sgCoreZoomImg" src="'+BLOUSE_IMG+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:100%;object-fit:contain;display:block;transform-origin:center;user-select:none;-webkit-user-drag:none;will-change:transform">'+
        '</div><p class="muted">Do ungliyon se pinch karke jitna chahein zoom karein • zoom ke baad drag karein</p>'+
      '</div>';
    const b=document.getElementById('sgCoreBack');
    if(b)b.onclick=function(){history.back()};
    zoomBound=false;setTimeout(setupZoom,0);
  }

  function showCleared(type){
    route='catalog';
    const title=modalTitle(),body=modalBody();
    openModal();
    if(title)title.textContent='✂️ '+type+' Designs';
    if(body)body.innerHTML='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button type="button" class="secondary" onclick="history.back()">← Garments</button><b>'+String(type).replace(/[<>]/g,'')+'</b></div><div class="design-empty"><h3>Design catalogue cleared</h3><p>Purane faltu built-in designs hata diye gaye hain.</p><p class="muted">Naya actual catalogue upload hone par yahin dikhaya jayega.</p></div>';
  }

  function installCatalogOverride(){
    if(typeof window.openDesignCatalog!=='function')return false;
    if(window.openDesignCatalog.__sgCoreV26)return true;
    const original=window.openDesignCatalog;
    function wrapped(type){
      if(type==='Blouse'){
        pushRoute('blouse');
        showBlouse();
        return;
      }
      /* Kurti has its own catalogue function when present; keep it intact. */
      if(type==='Kurti' && typeof window.openKurtiNeckCatalog==='function'){
        pushRoute('catalog');
        window.openKurtiNeckCatalog();
        return;
      }
      /* Do not render the old generic 20-card catalogue for any other garment. */
      pushRoute('catalog');
      showCleared(type);
    }
    wrapped.__sgCoreV26=true;
    wrapped.__sgOriginal=original;
    window.openDesignCatalog=wrapped;
    return true;
  }

  function paintIcons(){
    if(typeof window.dashboardIcon!=='function')return;
    document.querySelectorAll('.garment-library-card .libpic').forEach(function(el){
      if(el.querySelector('svg'))return;
      const card=el.closest('.garment-library-card');
      const name=(card?.querySelector('b')?.textContent||'').trim();
      if(name&&typeof window.garmentVisual==='function'){
        try{el.innerHTML=window.garmentVisual(name)}catch(e){}
      }
    });
  }

  window.addEventListener('popstate',function(e){
    const level=e.state&&e.state.sgSilaiGuru?e.state.level:null;
    if(route==='blouse'||route==='catalog'){
      route='garments';
      if(typeof window.openGarmentLibrary==='function')window.openGarmentLibrary();
      openModal();
      return;
    }
    if(route==='garments'||level===null){
      route='none';
      closeModal();
    }
  });

  const timer=setInterval(function(){
    const ok=installCatalogOverride();
    paintIcons();
    if(ok)clearInterval(timer);
  },50);
  setTimeout(function(){try{installCatalogOverride();paintIcons()}catch(e){}},3000);
  document.addEventListener('DOMContentLoaded',function(){installCatalogOverride();paintIcons()});
})();
