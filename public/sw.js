/* KavaWorks PWA service worker */
const VERSION = 'kavaworks-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => n !== VERSION).map((n) => caches.delete(n))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  // Let Next.js handle everything; stale-while-revalidate for images only.
  if (req.destination !== 'image') return;
  event.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req).then((hit) => {
        const fetchPromise = fetch(req).then((res) => {
          cache.put(req, res.clone());
          return res;
        });
        return hit || fetchPromise;
      }),
    ),
  );
});
