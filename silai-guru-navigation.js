/* SILAI GURU — single navigation owner v2
   Modal X / Android Back:
   - Back/X closes only the current modal view first.
   - Repeated Back walks back through modal views.
   - After returning to dashboard, a double-back gesture is treated as exit intent.
*/
(function(){
'use strict';
if(window.__SG_SINGLE_NAV_V2)return;
window.__SG_SINGLE_NAV_V2=true;

const BASE_KEY='sgNavBase';
const stack=[];
let restoring=false;
let lastBackAt=0;

function modal(){return document.getElementById('modal')}
function isModalOpen(){const m=modal();return !!(m&&m.classList.contains('show'))}
function isViewerOpen(){const v=document.getElementById('sg-design-viewer-bridge');return !!(v&&v.classList.contains('open'))}
function isGameOpen(){const g=document.querySelector('.nv');return !!(g&&g.classList.contains('on'))}

function snapshot(){
  const m=modal(), mt=document.getElementById('mt'), mb=document.getElementById('mb');
  if(!m||!mt||!mb||!isModalOpen())return null;
  return {title:mt.textContent||'',html:mb.innerHTML||'',scroll:mb.scrollTop||0};
}
function same(a,b){return !!a&&!!b&&a.title===b.title&&a.html===b.html}
function restore(s){
  const mt=document.getElementById('mt'),mb=document.getElementById('mb'),m=modal();
  if(!s||!mt||!mb||!m)return;
  restoring=true;
  m.classList.add('show');
  mt.textContent=s.title;
  mb.innerHTML=s.html;
  mb.scrollTop=s.scroll||0;
  restoring=false;
}
function pushModalHistory(){
  try{
    history.pushState(Object.assign({},history.state||{},{sgModal:true,sgModalDepth:stack.length}),document.title,location.href);
  }catch(e){}
}
function recordCurrent(){
  const s=snapshot();
  if(!s)return;
  const last=stack[stack.length-1];
  if(!same(last,s))stack.push(s);
}
function clearStack(){stack.length=0}

function seed(){
  try{
    if(!history.state||history.state.sgNavBase!==true){
      history.replaceState(Object.assign({},history.state||{},{sgNavBase:true}),document.title,location.href);
    }
    sessionStorage.setItem(BASE_KEY,'1');
  }catch(e){}
}

const originalOpenM=window.openM;
if(typeof originalOpenM==='function'){
  window.openM=function(t){
    const was=isModalOpen();
    if(was)recordCurrent();
    const before=stack.length;
    const r=originalOpenM.apply(this,arguments);
    if(!was&&isModalOpen()){
      clearStack();
      recordCurrent();
      pushModalHistory();
    }else if(was&&isModalOpen()){
      const now=snapshot();
      const last=stack[stack.length-1];
      if(now&&!same(last,now)){
        stack.push(now);
        pushModalHistory();
      }else if(stack.length===before){
        // same screen reopened: do not create a fake Back step.
      }
    }
    return r;
  };
}

const originalCloseM=window.closeM;
function closeModalRoot(){
  clearStack();
  if(typeof originalCloseM==='function')return originalCloseM.apply(this,arguments);
}
window.closeM=function(){
  if(restoring){return originalCloseM&&originalCloseM.apply(this,arguments)}
  if(isModalOpen()){
    if(history.state&&history.state.sgModal===true){
      history.back();
      return;
    }
    clearStack();
    return closeModalRoot();
  }
};

function goBackOneModalView(){
  if(!isModalOpen())return false;
  if(stack.length>1){
    stack.pop();
    restore(stack[stack.length-1]);
    if(history.state&&history.state.sgModal===true)history.back();
    return true;
  }
  // Root modal: close only the modal, never navigate the whole page away.
  clearStack();
  const m=modal();if(m)m.classList.remove('show');
  if(history.state&&history.state.sgModal===true)history.back();
  return true;
}

window.__sgGoBack=function(){
  if(isViewerOpen()&&typeof window.__sgCloseDesignViewer==='function'){
    window.__sgCloseDesignViewer(false);return;
  }
  if(isGameOpen()&&typeof window.__sgCloseBreakTime==='function'){
    window.__sgCloseBreakTime(false);return;
  }
  if(isModalOpen()){
    goBackOneModalView();return;
  }
  const now=Date.now();
  if(now-lastBackAt<1200){
    // Browsers/PWAs do not expose a reliable "close app" API.
    // Two quick backs leave the app history when possible.
    lastBackAt=0;
    try{history.go(-1)}catch(e){}
    return;
  }
  lastBackAt=now;
  try{
    if(navigator.vibrate)navigator.vibrate(35);
  }catch(e){}
  // Keep the dashboard visible and give the user a second-back window.
  try{history.pushState(Object.assign({},history.state||{},{sgExitGuard:true}),document.title,location.href)}catch(e){}
  setTimeout(()=>{if(Date.now()-lastBackAt>=1200)lastBackAt=0},1250);
};

window.addEventListener('popstate',function(){
  if(isViewerOpen()&&typeof window.__sgCloseDesignViewer==='function'){
    window.__sgCloseDesignViewer(true);return;
  }
  if(isGameOpen()&&typeof window.__sgCloseBreakTime==='function'){
    window.__sgCloseBreakTime(true);return;
  }
  if(isModalOpen()){
    if(stack.length>1){
      stack.pop();
      restore(stack[stack.length-1]);
      return;
    }
    clearStack();
    const m=modal();if(m)m.classList.remove('show');
    return;
  }
});

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',seed,{once:true});
else seed();
})();
