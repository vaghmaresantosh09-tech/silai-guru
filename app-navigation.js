/* SILAI GURU — single authoritative app navigation/session guard */
(function(){
  'use strict';
  const KEY='sg_profile';
  function readProfile(){
    try{
      const p=JSON.parse(localStorage.getItem(KEY)||'null');
      if(p && p.name && p.mobile && p.shop && p.email && p.address && p.state && p.city && p.pin) return p;
    }catch(e){}
    try{
      const m=document.cookie.match(/(?:^|;\s*)sg_profile_backup=([^;]*)/);
      if(m){const p=JSON.parse(decodeURIComponent(m[1]));if(p&&p.name&&p.mobile&&p.shop&&p.email&&p.address&&p.state&&p.city&&p.pin){localStorage.setItem(KEY,JSON.stringify(p));return p;}}
    }catch(e){}
    return null;
  }
  function keepOnApp(){
    const p=readProfile();
    if(!p)return false;
    window.p=p;
    const gate=document.getElementById('onboard');
    if(gate){gate.hidden=true;gate.style.display='none';}
    if(typeof render==='function'){try{render()}catch(e){}}
    return true;
  }
  function trapBack(){
    if(!keepOnApp())return;
    try{
      if(!history.state || history.state.sgApp!==true) history.replaceState({sgApp:true},'',location.href);
      history.pushState({sgApp:true},'',location.href);
    }catch(e){}
    window.addEventListener('popstate',function(){
      if(!keepOnApp())return;
      const modal=document.querySelector('.modal.show');
      if(modal){modal.classList.remove('show');try{history.pushState({sgApp:true},'',location.href)}catch(e){};return;}
      try{history.pushState({sgApp:true},'',location.href)}catch(e){}
      window.scrollTo(0,0);
    });
  }
  function boot(){
    keepOnApp();
    setTimeout(keepOnApp,50);
    setTimeout(keepOnApp,300);
    setTimeout(keepOnApp,1000);
    setTimeout(trapBack,1100);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
