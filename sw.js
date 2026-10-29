// Service worker: cho phép dùng offline. Nội dung bài học vẫn là file mã hoá enc/*.bin.
const APP='hn-app-v67',DATA='hn-data',FONTS='hn-fonts',MEDIA='hn-media';
const SHELL=['./','index.html','hoc-thu.html','hoc-thu.js','chao-cau.js','don-khach.js','thanh-ngu.html','lesson.html','tin-tuc.html','cong-dong.html','tin-nhan.html','xep-hang.html','luyen-nghe.html','on-tap.html','thi-thu.html','kiem-tra-trinh-do.html','hoi-ai.html','ung-dung.html','dang-nhap.html','dang-cho.html','chinh-sach.html','admin.html','manifest.json','icons/icon-192.png','enc/meta.json','hero.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(APP).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>![APP,DATA,FONTS,MEDIA].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function netFirst(req,cacheName,opt){const c=await caches.open(cacheName);try{const r=await fetch(req);if(r.ok)c.put(req,r.clone());return r}catch(e){const m=await c.match(req,opt);if(m)return m;throw e}}
async function cacheFirst(req,cacheName){const c=await caches.open(cacheName);const m=await c.match(req);if(m)return m;const r=await fetch(req);if(r.ok)c.put(req,r.clone());return r}
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!='GET')return;const u=new URL(req.url);
 if(u.origin==location.origin){
  if(/\/enc\/[\w-]+\.bin$/.test(u.pathname))return e.respondWith(cacheFirst(req,DATA));   // có ?v=hash nên an toàn
  // trang, js, css, meta.json: ưu tiên mạng (bản mới), mất mạng thì dùng bản đã lưu
  return e.respondWith(netFirst(req,APP,{ignoreSearch:req.mode=='navigate'||/\.(js|css|json)$/.test(u.pathname)}))}
 if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))e.respondWith(cacheFirst(req,FONTS));
 // Thumbnail YouTube (click-to-load facade trên luyen-nghe)
 if(u.hostname==='i.ytimg.com')e.respondWith(cacheFirst(req,MEDIA));
 // youtube-nocookie.com / www.youtube.com: để trình duyệt tải thẳng (iframe embed) — không cache SW
});
