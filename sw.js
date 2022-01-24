/**
 * Joue le rôle d'intermédiaire entre le client et le serveur.
 * Permet de mettre en cache des données utilisable
 * lorsqu'il n'y aura plus de réseaux
 */

const STATIC_CACHE_NAME = "todosApp.v2";
const CACHE_NAME = "todosList";

this.addEventListener("install", function (event) {
  // Garantit que le Service Worker ne s'installera pas tant que le code à l'intérieur de
  // waitUntil() n'a pas été exécuté avec succès.
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(function (cache) {
      // Tableau d'URL correspondant aux ressources à mettre en cache.
      return cache.addAll([
        "/",
        "/index.html",
        "/css/style.css",
        "/css/background.css",
        "/js/apiRequest.js",
        "/js/controller.js",
        "/js/ihm.js",
        "/img/icon-512x512.png",
        "/img/android-icon-192x192-seochecker-manifest-3210.png",
        "/img/apple-icon-180x180-seochecker-manifest-3210.png",
        "/img/apple-icon-152x152-seochecker-manifest-3210.png",
        "/img/apple-icon-144x144-seochecker-manifest-3210.png",
        "/img/apple-icon-120x120-seochecker-manifest-3210.png",
        "/img/apple-icon-114x114-seochecker-manifest-3210.png",
        "/img/favicon-96x96-seochecker-manifest-3210.png",
        "/img/apple-icon-76x76-seochecker-manifest-3210.png",
        "/img/apple-icon-72x72-seochecker-manifest-3210.png",
        "/img/apple-icon-60x60-seochecker-manifest-3210.png",
        "/img/apple-icon-57x57-seochecker-manifest-3210.png",
        "/img/favicon-32x32-seochecker-manifest-3210.png",
        "/img/favicon-16x16-seochecker-manifest-3210.png"
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != STATIC_CACHE_NAME;
        }).map(function(cacheName) {
            return caches.delete(cacheName);
        })
      );
    })
  );
})

self.addEventListener('fetch', function (event) {
  if (event.request.url.startsWith("http://localhost:3000/")) {
    event.respondWith(
      caches.open(STATIC_CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      }),
    );
  }
});

self.addEventListener('fetch', function (event) {
  if (event.request.url.startsWith("http://localhost:7000/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  }
});
