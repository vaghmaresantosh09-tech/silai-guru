/* SILAI GURU CORE CATALOG + BACK FIX v27
   One stable implementation for catalogue navigation, real Blouse catalogue,
   step-by-step Android/browser Back, and isolated image zoom.
*/
(function(){
  'use strict';
  const BLOUSE_IMG='./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  let route='none',zoomBound=false,libraryBound=false;

  const $=id=>document.getElementById(id);
  function openModal(){const m=$('modal');if(m)m.classList.add('modal','show')}
  function closeModal(){if(typeof window.closeM==='function')window.closeM();else{$('modal')?.classList.remove('show')}}
  function modalBody(){return $('mb')}
  function modalTitle(){return $('mt')}
  function push(level){route=level;history.pushState({sgSilaiGuru:true,level},'',location.href)}

  function cleanGarmentLibrary(){
    const modal=$('modal'),title=$('mt'),body=$('mb');if(!modal||!title||!body)return;
    route='garments';
    title.textContent='👗 Garments';
    const types=['Kurti','Blouse','Salwar Suit','Kameez','Saree Blouse','Lehenga','Gown','Dress','Shirt','Pant','Salwar','Choli','Sherwani','Suit','Blazer','Waistcoat','Pajama','School Uniform','Coat','Other'];
    body.innerHTML='<div class="card"><div class="library-note">📁 Garment folder open karke customer ko designs dikha sakte hain.</div><div class="garment-library">'+types.map(t=>'<button type="button" class="garment-library-card" data-sg-clean-garment="'+t.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'"><div class="libpic">'+(typeof window.garmentVisual==='function'?window.garmentVisual(t):'👗')+'</div><b>'+t+'</b><small>📁 Open Designs</small></button>').join('')+'</div></div>';
    body.querySelectorAll('[data-sg-clean-garment]').forEach(btn=>btn.addEventListener('click',function(){
      const type=btn.getAttribute('data-sg-clean-garment');
      if(type==='Blouse'){push('blouse');showBlouse();return;}
      push('catalog');showCleared(type);
    }));
    openModal();
  }

  function setupZoom(){
    const box=$('sgCoreZoomBox'),img=$('sgCoreZoomImg');if(!box||!img||zoomBound)return;
    zoomBound=true;
    let scale=1,startScale=1,startDist=0,x=0,y=0,lastX=0,lastY=0;
    const apply=()=>{img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')'};
    box.addEventListener('touchstart',e=>{
      if(e.touches.length===2){startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=scale}
      else if(e.touches.length===1&&scale>1){lastX=e.touches[0].clientX-x;lastY=e.touches[0].clientY-y}
    },{passive:true});
    box.addEventListener('touchmove',e=>{
      if(e.touches.length===2&&startDist){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(12,startScale*d/startDist));apply()}
      else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-lastX;y=e.touches[0].clientY-lastY;apply()}
    },{passive:true});
    box.addEventListener('dblclick',()=>{scale=scale===1?2:1;x=0;y=0;apply()});
  }

  function showBlouse(){
    route='blouse';openModal();
    const title=modalTitle(),body=modalBody();
    if(title)title.textContent='👚 Blouse Neck Designs';
    if(body)body.innerHTML='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button type="button" class="secondary" id="sgCoreBack">← Garments</button><b>Blouse Neck Designs</b></div><div class="card" style="text-align:center"><h3>Blouse Neck Designs</h3><p class="muted">Latest & Traditional Collection</p><div id="sgCoreZoomBox" style="position:relative;overflow:hidden;height:70vh;min-height:360px;background:#111;border-radius:16px;touch-action:none;display:flex;align-items:center;justify-content:center"><img id="sgCoreZoomImg" src="'+BLOUSE_IMG+'" alt="Blouse Neck Designs Catalogue" style="width:100%;height:100%;object-fit:contain;display:block;transform-origin:center;user-select:none;-webkit-user-drag:none;will-change:transform"></div><p class="muted">Do ungliyon se pinch karke jitna chahein zoom karein • zoom ke baad drag karein</p></div>';
    $('sgCoreBack')?.addEventListener('click',()=>history.back());
    zoomBound=false;setTimeout(setupZoom,0);
  }

  function showCleared(type){
    route='catalog';openModal();
    if(modalTitle())modalTitle().textContent='✂️ '+String(type).replace(/[<>]/g,'')+' Designs';
    if(modalBody())modalBody().innerHTML='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><button type="button" class="secondary" onclick="history.back()">← Garments</button><b>'+String(type).replace(/[<>]/g,'')+'</b></div><div class="design-empty"><h3>Design catalogue cleared</h3><p>Purane faltu built-in designs permanently hata diye gaye hain.</p></div>';
  }

  function overrideDesignCatalog(){
    if(typeof window.openDesignCatalog!=='function')return;
    if(window.openDesignCatalog.__sgCoreV27)return;
    const original=window.openDesignCatalog;
    const wrapped=function(type){
      if(type==='Blouse'){push('blouse');showBlouse();return}
      if(type==='Kurti'&&typeof window.openKurtiNeckCatalog==='function'){push('catalog');window.openKurtiNeckCatalog();return}
      push('catalog');showCleared(type)
    };
    wrapped.__sgCoreV27=true;wrapped.__sgOriginal=original;window.openDesignCatalog=wrapped;
  }

  function overrideGarmentLibrary(){
    if(typeof window.openGarmentLibrary!=='function')return;
    if(window.openGarmentLibrary.__sgCoreV27)return;
    window.openGarmentLibrary=function(){cleanGarmentLibrary()};
    window.openGarmentLibrary.__sgCoreV27=true;
  }

  function paintIcons(){
    document.querySelectorAll('.garment-library-card .libpic').forEach(el=>{
      const card=el.closest('.garment-library-card'),name=(card?.querySelector('b')?.textContent||'').trim();
      if(name&&typeof window.garmentVisual==='function'&&!el.querySelector('svg')){try{el.innerHTML=window.garmentVisual(name)}catch(e){}}
    });
  }

  window.addEventListener('popstate',e=>{
    if(route==='blouse'||route==='catalog'){cleanGarmentLibrary();return}
    if(route==='garments'||!e.state){route='none';closeModal()}
  });

  function install(){overrideDesignCatalog();overrideGarmentLibrary();paintIcons()}
  const timer=setInterval(install,100);
  setTimeout(()=>{clearInterval(timer);install()},5000);
  document.addEventListener('DOMContentLoaded',install);
})();
