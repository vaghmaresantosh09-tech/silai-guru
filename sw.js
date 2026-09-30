const CACHE='silai-guru-v17';
const ASSETS=['./','./index.html','./manifest.json','./silai-guru-icon-fix.js','./blouse-neck-designs.js','./silai-guru-backfix.js','./kurti-neck-catalog.js','./kurti-neck-catalog-1.jpg','./kurti-neck-catalog-2.jpg','./kurti-neck-catalog-3.jpg'];
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
        let injected=text;
        if(!injected.includes('silai-guru-icon-fix.js')) injected=injected.replace('</body>','<script src="./silai-guru-icon-fix.js?v=14"></script></body>');
        if(!injected.includes('blouse-neck-designs.js')) injected=injected.replace('</body>','<script src="./blouse-neck-designs.js?v=12"></script></body>');
        if(!injected.includes('silai-guru-backfix.js')) injected=injected.replace('</body>','<script src="./silai-guru-backfix.js?v=12"></script></body>');
        if(!injected.includes('kurti-neck-catalog.js')) injected=injected.replace('</body>','<script src="./kurti-neck-catalog.js?v=12"></script></body>');
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
