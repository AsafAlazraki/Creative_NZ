/* KavaWorks service worker — shell cache, stale-while-revalidate for images */
const VERSION = 'kavaworks-v1';
const SHELL = ['./KavaWorks.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== VERSION).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Shell: cache-first
  if (SHELL.some((path) => url.pathname.endsWith(path.replace('./', '/')))) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((cache) => cache.put(req, copy));
        return res;
      }))
    );
    return;
  }

  // Images: stale-while-revalidate
  if (req.destination === 'image') {
    event.respondWith(
      caches.open(VERSION).then((cache) =>
        cache.match(req).then((hit) => {
          const fetchPromise = fetch(req).then((res) => {
            cache.put(req, res.clone());
            return res;
          }).catch(() => hit);
          return hit || fetchPromise;
        })
      )
    );
    return;
  }

  // Fonts and other CDN: network-first with cache fallback
  event.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((cache) => cache.put(req, copy));
      return res;
    }).catch(() => caches.match(req))
  );
});
