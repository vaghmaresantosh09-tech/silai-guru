/* SILAI GURU — clean runtime service worker v42 */
const CACHE='silai-guru-v42';
const ASSETS=['./','./index.html','./manifest.json','./profile-validation-v2.js','./silai-guru-order-ui.js','./blouse-design-library.js','./app-navigation.js','./silai-guru-measurement-ui.js'];
const PROFILE_SCRIPT='<script src="./profile-validation-v2.js?v=20261002-12"></script>';
const ORDER_SCRIPT='<script src="./silai-guru-order-ui.js?v=20261002-40"></script>';
const BLOUSE_SCRIPT='<!-- SG_BLOUSE_LIBRARY_LOADER_V42 --><script src="./blouse-design-library.js?v=20261002-5"></script>';
const NAV_SCRIPT='<script src="./app-navigation.js?v=20261002-37"></script>';
const MEASURE_SCRIPT='<script src="./silai-guru-measurement-ui.js?v=20261002-39"></script>';
function cleanHtml(text){
  const blocks=[
    /<script>\s*\/\* SG_GARMENTS_MANAGEMENT_FIX_V1 \*\/[\s\S]*?<\/script>/gi,
    /<script>\s*\/\* SG_REAL_DESIGN_LIBRARY_V2 \*\/[\s\S]*?<\/script>/gi,
    /<style id="sg-expanded-library-style">[\s\S]*?<\/style>/gi,
    /<script id="sg-expanded-library-script">[\s\S]*?<\/script>/gi,
    /<!-- SG_DESIGN_LIBRARY_EXPANDED_V1 -->[\s\S]*?<!-- \/SG_DESIGN_LIBRARY_EXPANDED_V1 -->/gi,
    /function garmentCard\([\s\S]*?function addO\(/gi,
    /setTimeout\(initGarments,0\);/gi
  ];
  for(const re of blocks) text=text.replace(re,m=>m.startsWith('function garmentCard')?'function addO(':m.startsWith('setTimeout')?'':'');
  if(!text.includes('profile-validation-v2.js')) text=text.includes('</body>')?text.replace('</body>',PROFILE_SCRIPT+'</body>'):text+PROFILE_SCRIPT;
  if(!text.includes('silai-guru-order-ui.js')) text=text.includes('</body>')?text.replace('</body>',ORDER_SCRIPT+'</body>'):text+ORDER_SCRIPT;
  /* Blouse Design Library is a single authoritative runtime asset. Use a dedicated marker so an old filename/comment cannot suppress loading. */
  if(!text.includes('SG_BLOUSE_LIBRARY_LOADER_V42')) text=text.includes('</body>')?text.replace('</body>',BLOUSE_SCRIPT+'</body>'):text+BLOUSE_SCRIPT;
  if(!text.includes('app-navigation.js')) text=text.includes('</body>')?text.replace('</body>',NAV_SCRIPT+'</body>'):text+NAV_SCRIPT;
  if(!text.includes('silai-guru-measurement-ui.js')) text=text.includes('</body>')?text.replace('</body>',MEASURE_SCRIPT+'</body>'):text+MEASURE_SCRIPT;
  return text;
}
async function primeAppShell(){try{const res=await fetch('./silai-guru.html',{cache:'no-store'});if(!res.ok)return;const html=cleanHtml(await res.clone().text());await caches.open(CACHE).then(cache=>cache.put('./silai-guru.html',new Response(html,{status:res.status,statusText:res.statusText,headers:res.headers})));}catch(e){}}
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(primeAppShell).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.pathname.endsWith('.html')||url.pathname.endsWith('/')||/\.(js|css|svg|json)$/i.test(url.pathname)){event.respondWith(fetch(req,{cache:'no-store'}).then(async response=>{if(url.pathname.endsWith('/silai-guru.html')){const text=cleanHtml(await response.clone().text());response=new Response(text,{status:response.status,statusText:response.statusText,headers:response.headers});}const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));return response;}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));}else event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));});