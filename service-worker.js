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
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Cache error during install:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return cached version
        }

        // If not in cache, try to fetch from network
        return fetch(event.request).catch(error => {
          console.error('Fetch failed:', event.request.url, error);
          return new Response('<h1>Offline or error fetching resource</h1>', {
            headers: { 'Content-Type': 'text/html' }
          });
        });
      })
  );
});
