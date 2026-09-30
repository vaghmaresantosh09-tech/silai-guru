const CACHE='silai-guru-clean-v25';
const ASSETS=['./','./index.html','./manifest.json','./silai-guru-icon-fix.js','./blouse-neck-designs.js','./silai-guru-backfix.js','./silai-guru-finalfix.js','./kurti-neck-catalog.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));});
