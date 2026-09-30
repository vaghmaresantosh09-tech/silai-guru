/* SILAI GURU FINAL FIX - loaded LAST by service worker */
(function(){
  const IMG='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  let level='none', installed=false;

  function garments(){
    level='garments';
    if(typeof window.openGarmentLibrary==='function') window.openGarmentLibrary();
  }
  function closeSheet(){
    const btn=document.querySelector('.modal.show .close, .modal.show button.close');
    if(btn) btn.click();
    else if(typeof window.closeM==='function') window.closeM();
  }
  function push(levelName){
    level=levelName;
    history.pushState({sgFinal:true,level:levelName},'',location.href);
  }
  function replace(levelName){
    level=levelName;
    history.replaceState({sgFinal:true,level:levelName},'',location.href);
  }

  function zoomSetup(){
    const box=document.getElementById('sgFinalZoomBox'),img=document.getElementById('sgFinalZoomImg');
    if(!box||!img||img.dataset.ready)return;
    img.dataset.ready='1';
    let scale=1,startScale=1,startDist=0,x=0,y=0,sx=0,sy=0;
    const apply=()=>img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')';
    box.addEventListener('touchstart',e=>{
      if(e.touches.length===2){startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=scale;}
      else if(e.touches.length===1&&scale>1){sx=e.touches[0].clientX-x;sy=e.touches[0].clientY-y;}
    },{passive:true});
    box.addEventListener('touchmove',e=>{
      if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(12,startScale*d/startDist));apply();}
      else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-sx;y=e.touches[0].clientY-sy;apply();}
    },{passive:true});
    box.addEventListener('dblclick',()=>{scale=scale===1?2:1;x=0;y=0;apply();});
  }

  function install(){
    if(installed||typeof window.openDesignCatalog!=='function') return;
    const original=window.openDesignCatalog;
    function open(type){
      if(type==='Blouse'){
        push('blouse');
        const title=document.getElementById('mt'),body=document.getElementById('mb');
        if(title) title.textContent='👚 Blouse Neck Designs';
        if(body) body.innerHTML=
          '<div class="design-back" style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'+
          '<button class="secondary" id="sgFinalBack" type="button">← Garments</button><b>Blouse Neck Designs</b></div>'+ 
          '<div class="card" style="text-align:center"><h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p>'+ 
          '<div id="sgFinalZoomBox" style="position:relative;overflow:hidden;max-height:70vh;background:#111;border-radius:16px;touch-action:none">'+
          '<img id="sgFinalZoomImg" src="'+IMG+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:auto;display:block;transform-origin:0 0;user-select:none;-webkit-user-drag:none"></div>'+ 
          '<p class="muted">Do ungliyon se pinch karke jitna chahein zoom karein • drag karke image dekhein</p></div>';
        const b=document.getElementById('sgFinalBack');
        if(b)b.onclick=function(){replace('garments');garments();};
        setTimeout(zoomSetup,0);
        return;
      }
      if(type){
        push('garment');
        const title=document.getElementById('mt'),body=document.getElementById('mb');
        if(title) title.textContent='✂️ '+type+' Designs';
        if(body) body.innerHTML='<div class="design-back" style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><button class="secondary" id="sgFinalGenericBack" type="button">← Garments</button></div><div class="empty"><h3>Design catalogue cleared</h3><p>Purane faltu default designs permanently hata diye gaye hain.</p></div>';
        const b=document.getElementById('sgFinalGenericBack');if(b)b.onclick=function(){replace('garments');garments();};
        return;
      }
      return original.apply(this,arguments);
    }
    open.__sgFinal=true;
    window.openDesignCatalog=open;
    installed=true;
  }

  window.addEventListener('popstate',function(){
    if(level==='blouse'||level==='garment'){
      replace('garments');garments();
    }else if(level==='garments'){
      level='none';
      closeSheet();
    }
  });

  const timer=setInterval(()=>{install();if(installed)clearInterval(timer);},50);
  setTimeout(()=>{try{install();}catch(e){}},5000);
})();
