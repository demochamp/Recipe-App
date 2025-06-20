const CACHE_NAME = 'recipe-app-cache-v2';
const urlsToCache = [
  '/Recipe-App/',
  '/Recipe-App/index.html',
  '/Recipe-App/style.css',
  '/Recipe-App/script.js',
  '/Recipe-App/manifest.json',
  '/Recipe-App/icons/icon-192x192.png',
  '/Recipe-App/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching files...');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return new Response('<h1>Offline</h1>', {
        headers: { 'Content-Type': 'text/html' }
      });
    })
  );
});
