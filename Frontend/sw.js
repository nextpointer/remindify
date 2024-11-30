// Listen for the 'install' event to set up initial caching
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
  
    event.waitUntil(
      caches.open('static-cache-v1').then((cache) => {
        console.log('Caching app shell...');
        return cache.addAll([
          '/',
          '/index.html',
          '/assets/icon-192.png',
          '/assets/icon-512.png',
          '/style.css',
          '/main.js',
        ]);
      })
    );
    self.skipWaiting(); // Force service worker activation
  });
  
  // Listen for the 'activate' event for cleanup
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== 'static-cache-v1')
            .map((cacheName) => caches.delete(cacheName))
        );
      })
    );
    self.clients.claim(); // Control clients without waiting
  });
  
  // Listen for 'fetch' events to serve cached resources or fetch from network
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });