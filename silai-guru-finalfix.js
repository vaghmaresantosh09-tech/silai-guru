/* SILAI GURU FINAL FIX v25
   1) Default built-in design cards are permanently suppressed from the UI.
   2) Blouse opens only the real blouse catalogue image.
   3) App back button + Android/browser Back return step-by-step.
   4) Image zoom is isolated to the image viewer and supports pinch/drag. */
(function(){
  const IMG='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  const CLEAR_KEY='sg_default_designs_cleared_v25';
  let route='none',busy=false,zoomReady=false;
  localStorage.setItem(CLEAR_KEY,'1');

  function getModalBody(){return document.getElementById('mb')||document.querySelector('.modal.show #mb')}
  function getModalTitle(){return document.getElementById('mt')||document.querySelector('.modal.show #mt')}
  function closeSheet(){
    if(typeof window.closeM==='function') window.closeM();
    else {const m=document.getElementById('modal');if(m)m.classList.remove('show')}
  }
  function showGarments(push){
    route='garments';
    if(push) history.pushState({sgV25:'garments'},'',location.href);
    if(typeof window.openGarmentLibrary==='function') window.openGarmentLibrary();
    else if(typeof window.openM==='function') window.openM('designs');
  }
  function setRoute(r,push){
    route=r;
    if(push) history.pushState({sgV25:r},'',location.href);
  }
  function setupZoom(){
    const box=document.getElementById('sgV25ZoomBox'),img=document.getElementById('sgV25ZoomImg');
    if(!box||!img||zoomReady)return;
    zoomReady=true;
    let scale=1,startScale=1,startDist=0,x=0,y=0,sx=0,sy=0;
    const apply=()=>{img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'};
    box.addEventListener('touchstart',e=>{
      if(e.touches.length===2){
        startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        startScale=scale;
      }else if(e.touches.length===1&&scale>1){sx=e.touches[0].clientX-x;sy=e.touches[0].clientY-y;}
    },{passive:true});
    box.addEventListener('touchmove',e=>{
      if(e.touches.length===2&&startDist){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        scale=Math.max(1,Math.min(12,startScale*d/startDist));apply();
      }else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-sx;y=e.touches[0].clientY-sy;apply();}
    },{passive:true});
    box.addEventListener('dblclick',()=>{scale=scale===1?2:1;x=0;y=0;apply()});
  }
  function showBlouse(push){
    setRoute('blouse',push);
    const title=getModalTitle(),body=getModalBody();
    if(title) title.textContent='👚 Blouse Neck Designs';
    if(body) body.innerHTML=
      '<div class="sg-v25-back" style="display:flex;align-items:center;gap:10px;margin-bottom:12px">'+
      '<button class="secondary" id="sgV25Back" type="button">← Garments</button><b>Blouse Neck Designs</b></div>'+
      '<div class="card" style="text-align:center">'+
      '<h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p>'+
      '<div id="sgV25ZoomBox" style="position:relative;overflow:hidden;height:70vh;min-height:360px;background:#111;border-radius:16px;touch-action:none;display:flex;align-items:center;justify-content:center">'+
      '<img id="sgV25ZoomImg" src="'+IMG+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:100%;object-fit:contain;display:block;transform-origin:center;user-select:none;-webkit-user-drag:none;will-change:transform">'+
      '</div><p class="muted">Do ungliyon se pinch karke zoom karein • zoom ke baad drag karein</p></div>';
    const b=document.getElementById('sgV25Back');
    if(b)b.onclick=()=>{history.back()};
    zoomReady=false;setTimeout(setupZoom,0);
  }
  function clearDefaultDesigns(){
    document.querySelectorAll('.design-grid').forEach(grid=>{
      if(grid.dataset.sgV25Cleared)return;
      const host=grid.closest('.modal,.sheet')||document;
      const text=(host.innerText||'').toLowerCase();
      if(text.includes('blouse')||text.includes('designs')){
        const title=(getModalTitle()?.textContent||'').toLowerCase();
        if(title.includes('blouse')){
          grid.dataset.sgV25Cleared='1';
          setTimeout(()=>{if(route!=='blouse')showBlouse(false)},0);
        }else{
          grid.dataset.sgV25Cleared='1';
          grid.innerHTML='<div class="design-empty" style="grid-column:1/-1"><b>Design catalogue cleared</b><br><small>Purane faltu default designs permanently hata diye gaye hain.</small></div>';
        }
      }
    });
  }
  function interceptBlouseFolder(e){
    const card=e.target.closest('.garment-library-card');
    if(!card)return;
    const t=(card.innerText||'').replace(/\s+/g,' ').trim().toLowerCase();
    if(t.startsWith('blouse')||t.includes('\nblouse ')||t.includes(' blouse ')){
      e.preventDefault();e.stopPropagation();showBlouse(true);
    }
  }
  document.addEventListener('click',interceptBlouseFolder,true);
  const mo=new MutationObserver(()=>{
    if(busy)return;busy=true;
    try{clearDefaultDesigns()}finally{busy=false}
  });
  mo.observe(document.documentElement,{subtree:true,childList:true});

  window.addEventListener('popstate',function(){
    if(route==='blouse'){
      showGarments(false);
    }else if(route==='garments'){
      route='none';closeSheet();
    }else if(route==='garment'){
      route='garments';showGarments(false);
    }
  });

  const originalCatalog=window.openDesignCatalog;
  if(typeof originalCatalog==='function'){
    window.openDesignCatalog=function(type){
      if(type==='Blouse'){showBlouse(true);return}
      route='garment';history.pushState({sgV25:'garment'},'',location.href);
      const body=getModalBody();
      if(body) body.innerHTML='<div class="design-back"><button class="secondary" type="button" onclick="history.back()">← Garments</button></div><div class="design-empty"><b>Design catalogue cleared</b><br><small>Purane faltu default designs permanently hata diye gaye hain.</small></div>';
    };
  }

  setTimeout(clearDefaultDesigns,300);
  setTimeout(clearDefaultDesigns,1200);
})();
