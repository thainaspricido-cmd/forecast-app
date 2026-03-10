const CACHE_NAME = 'forecast-app-full-v1';
const CORE = ['./','./index.html','./manifest.json','./sw.js','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install', e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE))));
self.addEventListener('activate', e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))));
self.addEventListener('fetch', e=>{
  const u=new URL(e.request.url);
  if(u.pathname.endsWith('/data/base.xlsx')) return; // não cacheia base
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
