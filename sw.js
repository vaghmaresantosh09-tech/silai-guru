/* SILAI GURU — clean runtime service worker v53 */
const CACHE='silai-guru-v53';
const ASSETS=['./','./index.html','./manifest.json','./profile-validation-v2.js','./silai-guru-order-ui.js','./silai-guru-custom-measurements.js','./blouse-design-library.js','./silai-guru-order-design.js','./app-navigation.js','./silai-guru-measurement-ui.js'];
const ORDER_SCRIPT='<script src="./silai-guru-order-ui.js?v=20261002-53"></script>';
const OTHER='<script src="./profile-validation-v2.js?v=20261001-10"></script><script src="./silai-guru-custom-measurements.js?v=20261002-52"></script><script src="./app-navigation.js?v=20261002-37"></script><script src="./silai-guru-measurement-ui.js?v=20261002-39"></script><script src="./blouse-design-library.js?v=20261002-10"></script><script src="./silai-guru-order-design.js?v=20261002-1"></script>';
function cleanHtml(text){
 text=text.replace(/<script\s+src=["']\.\/silai-guru-order-ui\.js[^>]*><\/script>/gi,'');
 text=text.replace(/<script\s+src=["']\.\/profile-validation-v2\.js[^>]*><\/script>/gi,'');
 text=text.replace(/<script\s+src=["']\.\/silai-guru-custom-measurements\.js[^>]*><\/script>/gi,'');
 text=text.replace(/<script\s+src=["']\.\/app-navigation\.js[^>]*><\/script>/gi,'');
 text=text.replace(/<script\s+src=["']\.\/silai-guru-measurement-ui\.js[^>]*><\/script>/gi,'');
 text=text.replace(/<script\s+src=["']\.\/blouse-design-library\.js[^>]*><\/script>/gi,'');
 text=text.replace(/<script\s+src=["']\.\/silai-guru-order-design\.js[^>]*><\/script>/gi,'');
 const inject=OTHER+ORDER_SCRIPT;
 return text.includes('</body>')?text.replace('</body>',inject+'</body>'):text+inject;
}
async function prime(){try{const r=await fetch('./silai-guru.html',{cache:'no-store'});if(r.ok){const h=cleanHtml(await r.text());await caches.open(CACHE).then(c=>c.put('./silai-guru.html',new Response(h,{headers:r.headers,status:r.status})))}}catch(e){}}
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(prime).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.pathname.endsWith('.html')||u.pathname.endsWith('/')||/\.(js|css|json|svg)$/i.test(u.pathname)){e.respondWith(fetch(r,{cache:'no-store'}).then(async x=>{if(u.pathname.endsWith('/silai-guru.html'))x=new Response(cleanHtml(await x.text()),{headers:x.headers,status:x.status});caches.open(CACHE).then(c=>c.put(r,x.clone()));return x}).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))))}else e.respondWith(caches.match(r).then(x=>x||fetch(r)))})
