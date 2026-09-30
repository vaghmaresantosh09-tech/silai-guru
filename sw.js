const CACHE='silai-guru-v26';
const ASSETS=['./','./index.html','./silai-guru.html','./manifest.json','./silai-guru-backfix.js','./silai-guru-icon-fix.js','./silai-guru-custom-measurements.js','./ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.pathname.endsWith('.html')||u.pathname.endsWith('/')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(async res=>{
      const type=res.headers.get('content-type')||'';
      if(!type.includes('text/html'))return res;
      const text=await res.text();
      let html=text;
      const add=s=>{if(!html.includes(s))html=html.replace('</body>',s+'</body>')};
      add('<script src="./silai-guru-icon-fix.js?v=26"></script>');
      add('<script src="./silai-guru-custom-measurements.js?v=26"></script>');
      /* backfix is already part of silai-guru.html; inject only when a legacy page lacks it */
      add('<script src="./silai-guru-backfix.js?v=26"></script>');
      const out=new Response(html,{status:res.status,statusText:res.statusText,headers:res.headers});
      caches.open(CACHE).then(c=>c.put(e.request,out.clone()));
      return out;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./silai-guru.html'))));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res})));
  }
});
