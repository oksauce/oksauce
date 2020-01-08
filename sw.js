var cacheName = 'sauce-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/fonts.css',
  '/css/style.css',
  '/manifest.json',
  '/img/circuitous-16x16.png',
  '/img/sauce-16x16.png',
  '/img/+sauce-16x16.png',
  '/icon/touch-icon-msapp.png',
  '/js/jquery.js',
  '/js/main.js',
  '/%E2%98%B0/circuitous.json',
  '/%E2%98%B0/circuitousinfo.json',
  '/js/circuitous.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});