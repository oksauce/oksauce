var cacheName = '☰ sauce';
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
  '/js/circuitous.js'
];

/* start the service worker and cache all of the app's content */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* start the service worker and cache all of the app's content - check for errors
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
    .catch(error => console.error('💩', error))
  )
});
*/

/* serve cached content when offline */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
        return fetch(event.request);
      }
    )
  );
});