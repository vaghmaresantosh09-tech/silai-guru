/* SILAI GURU — authoritative navigation/session stability */
(function(){
  'use strict';
  const PROFILE_KEY='sg_profile';
  function profileExists(){
    try{
      const p=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null');
      return !!(p && p.name && p.mobile && p.shop && p.email && p.address && p.state && p.city && p.pin);
    }catch(e){return false;}
  }
  function keepAppOpen(){
    if(!profileExists()) return;
    const onboard=document.getElementById('onboard');
    if(onboard){onboard.hidden=true;onboard.style.display='none';}
    try{
      if(!history.state || history.state.sgApp!==true){
        history.replaceState({sgApp:true},'',location.href);
      }
    }catch(e){}
  }
  function guardBack(){
    try{history.pushState({sgApp:true},'',location.href);}catch(e){}
    window.addEventListener('popstate',function(){
      if(profileExists()){
        try{history.pushState({sgApp:true},'',location.href);}catch(e){}
        const openModal=document.querySelector('.modal.show');
        if(openModal){openModal.classList.remove('show');return;}
        window.scrollTo(0,0);
      }
    });
  }
  function boot(){
    keepAppOpen();
    guardBack();
    setTimeout(keepAppOpen,100);
    setTimeout(keepAppOpen,500);
    setTimeout(keepAppOpen,1200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
