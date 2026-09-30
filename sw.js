const CACHE='silai-guru-v8';
const ASSETS=['./','./index.html','./manifest.json','./silai-guru-icon-fix.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET') return;
  if(u.pathname.endsWith('.html')||u.pathname.endsWith('/')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(async res=>{
      const type=res.headers.get('content-type')||'';
      if(type.includes('text/html')){
        const text=await res.text();
        const injected=text.includes('silai-guru-icon-fix.js')?text:text.replace('</body>','<script src="./silai-guru-icon-fix.js?v=8"></script></body>');
        const out=new Response(injected,{status:res.status,statusText:res.statusText,headers:res.headers});
        caches.open(CACHE).then(c=>c.put(e.request,out.clone()));
        return out;
      }
      const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res})));
  }
});
