/* SILAI GURU - FINAL GARMENT CLEANUP / BLOUSE CATALOGUE / MOBILE BACK */
(function(){
  const blouseImage='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  let installed=false;
  let currentLevel='none';
  let historyGuard=false;

  function install(){
    if(typeof window.openDesignCatalog!=='function') return;
    if(window.openDesignCatalog.__sgFinalFix) return;
    const original=window.openDesignCatalog;

    function pushLevel(level){
      currentLevel=level;
      if(!historyGuard){
        historyGuard=true;
        history.pushState({sgSilaiGuru:true,level:level},'',location.href);
        setTimeout(()=>historyGuard=false,0);
      }
    }

    function goGarments(){
      currentLevel='garments';
      if(typeof window.openGarmentLibrary==='function') window.openGarmentLibrary();
    }

    window.openDesignCatalog=function(type){
      /* Permanently replace every built-in 20-design catalog with an empty screen.
         Blouse is the exception: it opens the real uploaded catalogue image. */
      if(type==='Blouse'){
        pushLevel('blouse');
        const title=document.getElementById('mt'), body=document.getElementById('mb');
        if(title) title.textContent='👚 Blouse Neck Designs';
        if(body){
          body.innerHTML=
            '<div class="design-back" style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'+
            '<button class="secondary" id="sgBlouseBackBtn" type="button">← Garments</button>'+ 
            '<b>Blouse Neck Designs</b></div>'+ 
            '<div class="card" style="text-align:center">'+
            '<h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p>'+ 
            '<div id="sgZoomBox" style="position:relative;overflow:hidden;max-height:70vh;background:#111;border-radius:16px;touch-action:none">'+
            '<img id="sgZoomImg" src="'+blouseImage+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:auto;display:block;transform-origin:0 0;user-select:none;-webkit-user-drag:none">'+
            '</div><p class="muted">Do ungliyon se pinch karke jitna chahein zoom karein • drag karke image dekhein</p></div>';
          document.getElementById('sgBlouseBackBtn').onclick=function(e){e.preventDefault();goGarments();};
        }
        setupZoom();
        return;
      }
      if(type){
        pushLevel('garment-'+type);
        const title=document.getElementById('mt'),body=document.getElementById('mb');
        if(title) title.textContent='✂️ '+type+' Designs';
        if(body) body.innerHTML='<div class="design-back" style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><button class="secondary" id="sgGenericBack" type="button">← Garments</button></div><div class="empty"><h3>Design catalogue cleared</h3><p>Purane faltu default designs permanently hata diye gaye hain.</p></div>';
        const b=document.getElementById('sgGenericBack'); if(b)b.onclick=function(){goGarments();};
        return;
      }
      return original.apply(this,arguments);
    };
    window.openDesignCatalog.__sgFinalFix=true;
    window.__sgFinalGoGarments=goGarments;
    installed=true;
  }

  function setupZoom(){
    const img=document.getElementById('sgZoomImg'),box=document.getElementById('sgZoomBox');
    if(!img||!box||img.__sgZoomReady)return;
    img.__sgZoomReady=true;
    let scale=1,startScale=1,startDist=0,x=0,y=0,startX=0,startY=0;
    const apply=()=>{img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')';};
    box.addEventListener('touchstart',e=>{
      if(e.touches.length===2){startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=scale;}
      else if(e.touches.length===1&&scale>1){startX=e.touches[0].clientX-x;startY=e.touches[0].clientY-y;}
    },{passive:true});
    box.addEventListener('touchmove',e=>{
      if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(12,startScale*d/startDist));apply();}
      else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-startX;y=e.touches[0].clientY-startY;apply();}
    },{passive:true});
    box.addEventListener('dblclick',()=>{scale=scale===1?2:1;x=0;y=0;apply();});
  }

  window.addEventListener('popstate',function(){
    if(historyGuard)return;
    if(currentLevel==='blouse'||currentLevel.indexOf('garment-')===0){
      historyGuard=true;
      goBackToGarments();
      history.pushState({sgSilaiGuru:true,level:'garments'},'',location.href);
      setTimeout(()=>historyGuard=false,0);
    }
  });

  function goBackToGarments(){
    currentLevel='garments';
    if(typeof window.openGarmentLibrary==='function') window.openGarmentLibrary();
  }

  /* Main HTML currently defines openDesignCatalog after some helper scripts.
     Keep checking until the final app function exists, then wrap it. */
  const timer=setInterval(()=>{install();if(installed){clearInterval(timer);}},50);
  setTimeout(()=>{try{install();}catch(e){}},3000);
})();
