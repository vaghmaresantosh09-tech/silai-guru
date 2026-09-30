/* SILAI GURU - Blouse catalogue + mobile back handling + remove default design lists + image-only pinch zoom */
(function(){
  const originalOpenDesignCatalog = window.openDesignCatalog;
  const blouseImage = './ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  let blouseOpen = false, backGuardReady = false;

  function installBackGuard(){
    if(backGuardReady) return;
    backGuardReady = true;
    history.pushState({sgBlouse:true}, '', location.href);
    window.addEventListener('popstate', function(){
      if(blouseOpen){
        blouseOpen = false;
        if(typeof window.openGarmentLibrary === 'function') window.openGarmentLibrary();
        history.pushState({sgGarments:true}, '', location.href);
      }
    });
  }

  function closeZoom(){
    const z=document.getElementById('sgImageZoomOverlay');
    if(z) z.remove();
    document.body.style.overflow='';
  }

  function openZoom(){
    if(document.getElementById('sgImageZoomOverlay')) return;
    const z=document.createElement('div');
    z.id='sgImageZoomOverlay';
    z.innerHTML='<div style="position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:999999;display:flex;align-items:center;justify-content:center;overflow:hidden;touch-action:none">'+
      '<button id="sgZoomClose" style="position:fixed;top:18px;right:18px;z-index:2;width:48px;height:48px;border:0;border-radius:50%;font-size:30px;background:#fff;color:#111">×</button>'+
      '<img id="sgFullZoomImg" src="'+blouseImage+'" alt="Blouse Neck Designs" style="max-width:96vw;max-height:88vh;width:auto;height:auto;object-fit:contain;transform-origin:center center;user-select:none;-webkit-user-drag:none;touch-action:none;will-change:transform">'+
      '<div style="position:fixed;bottom:16px;left:0;right:0;text-align:center;color:#fff;font-size:14px;pointer-events:none">🤏 Pinch to zoom • Drag to move • × Close</div></div>';
    document.body.appendChild(z);
    document.body.style.overflow='hidden';
    const img=document.getElementById('sgFullZoomImg'), stage=z.firstElementChild;
    document.getElementById('sgZoomClose').onclick=closeZoom;
    let scale=1,x=0,y=0,lastX=0,lastY=0,startDist=0,startScale=1,moving=false;
    function apply(){img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')';}
    stage.addEventListener('touchstart',function(e){
      e.preventDefault();
      if(e.touches.length===2){
        startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        startScale=scale;
      } else if(e.touches.length===1){
        lastX=e.touches[0].clientX; lastY=e.touches[0].clientY; moving=true;
      }
    },{passive:false});
    stage.addEventListener('touchmove',function(e){
      e.preventDefault();
      if(e.touches.length===2){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        if(startDist>0) scale=Math.max(1,Math.min(12,startScale*d/startDist));
        apply();
      } else if(e.touches.length===1 && moving && scale>1){
        x+=e.touches[0].clientX-lastX; y+=e.touches[0].clientY-lastY;
        lastX=e.touches[0].clientX; lastY=e.touches[0].clientY; apply();
      }
    },{passive:false});
    stage.addEventListener('touchend',function(e){
      e.preventDefault();
      if(e.touches.length===0){moving=false;startDist=0;}
    },{passive:false});
    stage.addEventListener('dblclick',function(){scale=scale===1?2:1;x=0;y=0;apply();});
  }

  window.openDesignCatalog = function(type){
    if(type === 'Blouse'){
      blouseOpen=true; installBackGuard();
      if(window.__sgRecordView) window.__sgRecordView('blouse-neck-catalog');
      const title=document.getElementById('mt'), body=document.getElementById('mb');
      if(title) title.textContent='👚 Blouse Neck Designs';
      if(body) body.innerHTML='<div class="design-back"><button class="secondary" onclick="openGarmentLibrary()">← Garments</button><b>Blouse Neck Designs</b></div><div class="card" style="text-align:center"><h3 style="margin:4px 0 8px">Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p><div style="background:#111;border-radius:16px;overflow:hidden;padding:8px"><img src="'+blouseImage+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:auto;display:block;cursor:zoom-in;border-radius:10px" onclick="openBlouseImageZoom()"></div><p class="muted" style="margin-top:8px">Image par tap karke full screen zoom kholen</p></div>';
      return;
    }
    if(type){
      const title=document.getElementById('mt'), body=document.getElementById('mb');
      if(title) title.textContent='✂️ '+type+' Designs';
      if(body) body.innerHTML='<div class="design-back"><button class="secondary" onclick="openGarmentLibrary()">← Garments</button></div><div class="empty"><h3>No default designs</h3><p>Purane faltu design yahan se hata diye gaye hain.</p></div>';
      return;
    }
    if(typeof originalOpenDesignCatalog==='function') return originalOpenDesignCatalog(type);
  };
  window.openBlouseImageZoom=openZoom;
})();
