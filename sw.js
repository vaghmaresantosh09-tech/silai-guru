/* SILAI GURU — clean navigation/service worker v85 */
const CACHE='silai-guru-v93';
const ASSETS=[
  './index.html','./silai-guru.html','./manifest.json',
  './profile-validation-v2.js?v=20261008-2','./silai-guru-order-ui.js?v=20261008-1',
  './blouse-design-library.js','./kurti-design-library.js','./kurti-neck-design-library.js?v=20261007-2','./assets/kurti-neck-50-sprite.jpg',
  './pleated-kurti-design-library.js?v=20261008-1',
  './silai-guru-order-design.js',
  './silai-guru-navigation.js','./silai-guru-break-time.js','./silai-guru-entertainment-card.js','./music-entertainment.html'
];
async function cachePage(){
  try{
    const r=await fetch('./silai-guru.html',{cache:'no-store'});
    if(r.ok) await caches.open(CACHE).then(c=>c.put('./silai-guru.html',r.clone()));
  }catch(e){}
}
self.addEventListener('install',e=>e.waitUntil(
  caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(cachePage).then(()=>self.skipWaiting())
));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k.startsWith('silai-guru-')&&k!==CACHE).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.origin===location.origin &&
     (u.pathname.endsWith('.html')||u.pathname.endsWith('/')||
      /\.(js|css|json|svg|png|webp)$/i.test(u.pathname))){
    e.respondWith(
      fetch(r,{cache:'no-store'}).then(async x=>{
        if(x.ok) caches.open(CACHE).then(c=>c.put(r,x.clone()));
        return x;
      }).catch(()=>caches.match(r).then(x=>x||caches.match(u.pathname).then(y=>y||caches.match('./index.html'))))
    );
  }else{
    e.respondWith(caches.match(r).then(x=>x||fetch(r)));
  }
});
