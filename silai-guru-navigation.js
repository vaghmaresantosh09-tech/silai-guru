/* SILAI GURU — single navigation owner v1
   One owner for Android/browser Back.
   Design Viewer and Break Time expose close hooks only.
*/
(function(){
'use strict';
if(window.__SG_SINGLE_NAV_V1)return;
window.__SG_SINGLE_NAV_V1=true;

const BASE_KEY='sgNavBase';

function modal(){return document.getElementById('modal')}
function isModalOpen(){const m=modal();return !!(m&&m.classList.contains('show'))}
function isViewerOpen(){const v=document.getElementById('sg-design-viewer-bridge');return !!(v&&v.classList.contains('open'))}
function isGameOpen(){const g=document.querySelector('.nv');return !!(g&&g.classList.contains('on'))}

function seed(){
  try{
    if(!history.state || history.state.sgNavBase!==true){
      history.replaceState(Object.assign({},history.state||{},{sgNavBase:true}),document.title,location.href);
    }
    sessionStorage.setItem(BASE_KEY,'1');
  }catch(e){}
}

function pushModal(){
  try{
    if(history.state&&history.state.sgModal===true)return;
    history.pushState(Object.assign({},history.state||{},{sgModal:true}),document.title,location.href);
  }catch(e){}
}

const originalOpenM=window.openM;
if(typeof originalOpenM==='function'){
  window.openM=function(t){
    const was=isModalOpen();
    const r=originalOpenM.apply(this,arguments);
    if(!was&&isModalOpen())pushModal();
    return r;
  };
}

const originalCloseM=window.closeM;
if(typeof originalCloseM==='function'){
  window.closeM=function(){
    if(history.state&&history.state.sgModal===true){
      history.back();
      return;
    }
    return originalCloseM.apply(this,arguments);
  };
}

window.__sgGoBack=function(){
  if(isViewerOpen()&&typeof window.__sgCloseDesignViewer==='function'){
    window.__sgCloseDesignViewer(false);
    return;
  }
  if(isGameOpen()&&typeof window.__sgCloseBreakTime==='function'){
    window.__sgCloseBreakTime(false);
    return;
  }
  if(isModalOpen()){
    window.closeM();
    return;
  }
  if(history.length>1)history.back();
};

window.addEventListener('popstate',function(){
  if(isViewerOpen()&&typeof window.__sgCloseDesignViewer==='function'){
    window.__sgCloseDesignViewer(true);
    return;
  }
  if(isGameOpen()&&typeof window.__sgCloseBreakTime==='function'){
    window.__sgCloseBreakTime(true);
    return;
  }
  if(isModalOpen()){
    if(typeof originalCloseM==='function')originalCloseM();
    return;
  }
});

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',seed,{once:true});
else seed();
})();