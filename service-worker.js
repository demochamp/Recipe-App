const CACHE_NAME = 'recipe-app-cache-v1';
const urlsToCache = [
  '/Recipe-App/',
  '/Recipe-App/index.html',
  '/Recipe-App/style.css',
  '/Recipe-App/script.js',
  '/Recipe-App/icons/icon-192x192.png',
  '/Recipe-App/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
