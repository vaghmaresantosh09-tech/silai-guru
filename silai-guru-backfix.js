/* SILAI GURU - Blouse catalogue fix */
(function(){
  const originalOpenDesignCatalog = window.openDesignCatalog;
  const blouseImage = './ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  window.openDesignCatalog = function(type){
    if(type === 'Blouse'){
      if(window.__sgRecordView) window.__sgRecordView('blouse-neck-catalog');
      const title=document.getElementById('mt'), body=document.getElementById('mb');
      if(title) title.textContent='👚 Blouse Neck Designs';
      if(body) body.innerHTML='<div class="design-back"><button class="secondary" onclick="openGarmentLibrary()">← Garments</button><b>Blouse Neck Designs</b></div><div class="card" style="text-align:center"><h3 style="margin:4px 0 8px">Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p><div id="sgZoomBox" style="position:relative;overflow:auto;max-height:75vh;background:#111;border-radius:16px;touch-action:none"><img id="sgZoomImg" src="'+blouseImage+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:auto;display:block;transform-origin:0 0;cursor:zoom-in;user-select:none;-webkit-user-drag:none"></div><p class="muted" style="margin-top:8px">Do ungliyon se pinch karke jitna chahein zoom karein • drag karke image dekhein</p></div>';
      const img=document.getElementById('sgZoomImg'), box=document.getElementById('sgZoomBox');
      if(img&&box){let scale=1,startDist=0,startScale=1,x=0,y=0,sx=0,sy=0;
        const apply=()=>{img.style.transform='translate('+x+'px,'+y+'px) scale('+scale+')';};
        box.addEventListener('touchstart',e=>{if(e.touches.length===2){startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=scale;}else if(e.touches.length===1){sx=e.touches[0].clientX-x;sy=e.touches[0].clientY-y;}},{passive:true});
        box.addEventListener('touchmove',e=>{if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(8,startScale*d/startDist));apply();}else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-sx;y=e.touches[0].clientY-sy;apply();}},{passive:true});
        box.addEventListener('dblclick',()=>{scale=scale===1?2:1;x=0;y=0;apply();});
      }
      return;
    }
    if(typeof originalOpenDesignCatalog==='function') return originalOpenDesignCatalog(type);
  };
})();
