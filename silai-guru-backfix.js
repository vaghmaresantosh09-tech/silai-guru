/* SILAI GURU - Blouse catalogue + safe mobile back + remove default design lists */
(function(){
  const originalOpenDesignCatalog = window.openDesignCatalog;
  const blouseImage = './ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  let blouseOpen=false;
  let backGuardReady=false;
  function installBackGuard(){
    if(backGuardReady) return;
    backGuardReady=true;
    history.pushState({sgSilai:true,sgLevel:'garments'},'',location.href);
    window.addEventListener('popstate',function(){
      if(blouseOpen){
        blouseOpen=false;
        if(typeof window.openGarmentLibrary==='function') window.openGarmentLibrary();
        setTimeout(function(){ history.pushState({sgSilai:true,sgLevel:'garments'},'',location.href); },0);
      }
    });
  }
  window.openDesignCatalog=function(type){
    if(type==='Blouse'){
      blouseOpen=true; installBackGuard();
      if(window.__sgRecordView) window.__sgRecordView('blouse-neck-catalog');
      const title=document.getElementById('mt'), body=document.getElementById('mb');
      if(title) title.textContent='👚 Blouse Neck Designs';
      if(body) body.innerHTML='<div class="design-back"><button class="secondary" onclick="openGarmentLibrary()">← Garments</button><b>Blouse Neck Designs</b></div><div class="card" style="text-align:center"><h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p><div id="sgZoomBox" style="position:relative;overflow:hidden;max-height:75vh;background:#111;border-radius:16px;touch-action:none"><img id="sgZoomImg" src="'+blouseImage+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:auto;display:block;transform-origin:0 0;user-select:none;-webkit-user-drag:none"></div><p class="muted">Do ungliyon se pinch karke zoom karein • drag karke image dekhein</p></div>';
      const img=document.getElementById('sgZoomImg'),box=document.getElementById('sgZoomBox');
      if(img&&box){let scale=1,startDist=0,startScale=1,x=0,y=0,sx=0,sy=0;
        const apply=()=>{img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')';};
        box.addEventListener('touchstart',e=>{if(e.touches.length===2){startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=scale;}else if(e.touches.length===1&&scale>1){sx=e.touches[0].clientX-x;sy=e.touches[0].clientY-y;}},{passive:true});
        box.addEventListener('touchmove',e=>{if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(12,startScale*d/startDist));apply();}else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-sx;y=e.touches[0].clientY-sy;apply();}},{passive:true});
        box.addEventListener('dblclick',()=>{scale=scale===1?2:1;x=0;y=0;apply();});
      }
      return;
    }
    if(type){
      const title=document.getElementById('mt'),body=document.getElementById('mb');
      if(title) title.textContent='✂️ '+type+' Designs';
      if(body) body.innerHTML='<div class="design-back"><button class="secondary" onclick="openGarmentLibrary()">← Garments</button></div><div class="empty"><h3>No default designs</h3><p>Purane faltu design yahan se hata diye gaye hain.</p></div>';
      return;
    }
    if(typeof originalOpenDesignCatalog==='function') return originalOpenDesignCatalog(type);
  };
})();
