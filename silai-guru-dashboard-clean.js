(()=>{'use strict';
if(window.__SG_DASHBOARD_CLEAN_V1__)return;window.__SG_DASHBOARD_CLEAN_V1__=true;
const musicRe=/^\s*(?:🎵\s*)?music\s*&?\s*entertainment\s*$/i;
function clean(){
  document.querySelectorAll('.icons .ico').forEach(el=>{
    const txt=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
    if(musicRe.test(txt)||/music\s*&?\s*entertainment/i.test(txt)) el.remove();
  });
}
function run(){clean();setTimeout(clean,50);setTimeout(clean,300);setTimeout(clean,1000);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(clean).observe(document.documentElement,{childList:true,subtree:true});
})();
