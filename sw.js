const CACHE='silai-guru-clean-v31';
const ASSETS=['./','./index.html','./manifest.json','./silai-guru.html','./silai-guru-core.js','./icon-192.png','./icon-512.png'];

async function cleanAppResponse(request){
  const res=await fetch(request,{cache:'no-store'});
  if(!res.ok)return res;
  const type=res.headers.get('content-type')||'';
  if(!type.includes('text/html'))return res;
  let html=await res.text();
  html=html
    .replace(/<script[^>]*src=["']silai-guru-backfix\.js[^>]*><\/script>/gi,'')
    .replace(/<script[^>]*src=["']blouse-neck-designs\.js[^>]*><\/script>/gi,'')
    .replace(/<script[^>]*src=["']silai-guru-custom-measurements\.js[^>]*><\/script>/gi,'')
    .replace(/<script[^>]*src=["']silai-guru-icon-fix\.js[^>]*><\/script>/gi,'')
    .replace(/<script[^>]*id=["']sg-expanded-library-script["'][^>]*>[\s\S]*?<\/script>/gi,'')
    .replace(/<style[^>]*id=["']sg-expanded-library-style["'][^>]*>[\s\S]*?<\/style>/gi,'')
    .replace(/const DESIGN_IMAGE_URLS=\{[\s\S]*?\};function getGarmentMaster\(\)/,'function getGarmentMaster()')
    .replace(/<script[^>]*>\s*\/\* SG_REAL_DESIGN_LIBRARY_V2 \*\/[\s\S]*?<\/script>/gi,'')
    .replace(/<script[^>]*>\s*\/\* SG_GARMENTS_MANAGEMENT_FIX_V1 \*\/[\s\S]*?<\/script>/gi,'');
  if(!html.includes('silai-guru-core.js'))html=html.replace(/<\/body>/i,'<script src="./silai-guru-core.js?v=31"></script></body>');
  const headers=new Headers(res.headers);headers.set('content-type','text/html; charset=utf-8');headers.set('cache-control','no-store, max-age=0');
  return new Response(html,{status:res.status,statusText:res.statusText,headers});
}
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.pathname.endsWith('/silai-guru.html')||url.pathname.endsWith('/')){e.respondWith(cleanAppResponse(e.request).catch(()=>caches.match(e.request)));return}e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));});
