/* SILAI GURU - Blouse catalogue fix */
(function(){
  const originalOpenDesignCatalog = window.openDesignCatalog;
  const blouseImage = './ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  window.openDesignCatalog = function(type){
    if(type === 'Blouse'){
      if(window.__sgRecordView) window.__sgRecordView('blouse-neck-catalog');
      const title=document.getElementById('mt'), body=document.getElementById('mb');
      if(title) title.textContent='👚 Blouse Neck Designs';
      if(body) body.innerHTML='<div class="design-back"><button class="secondary" onclick="openGarmentLibrary()">← Garments</button><b>Blouse Neck Designs</b></div><div class="card" style="text-align:center"><h3 style="margin:4px 0 8px">Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p><div style="overflow:auto;max-height:75vh;background:#111;border-radius:16px"><img src="'+blouseImage+'" alt="Blouse Neck Designs Catalogue" style="width:100%;max-width:none;height:auto;display:block;cursor:zoom-in" onclick="this.style.width=this.style.width===\'100%\'?\'200%\':\'100%\'" title="Tap to zoom"></div><p class="muted" style="margin-top:8px">Image par tap karke zoom karein</p></div>';
      return;
    }
    if(typeof originalOpenDesignCatalog==='function') return originalOpenDesignCatalog(type);
  };
})();
