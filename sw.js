/**
 * Joue le rôle d'intermédiaire entre le client et le serveur.
 * Permet de mettre en cache des données utilisable
 * lorsqu'il n'y aura plus de réseaux
 */

const STATIC_CACHE_NAME = "todosApp.v0";

this.addEventListener("install", function (event) {
  // Garantit que le Service Worker ne s'installera pas tant que le code à l'intérieur de
  // waitUntil() n'a pas été exécuté avec succès.
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(function (cache) {
      // Tableau d'URL correspondant aux ressources à mettre en cache.
      return cache.addAll([
        "/todolist-pwa/",
        "/todolist-pwa/index.html",
        "/todolist-pwa/css/style.css",
        "/todolist-pwa/js/apiRequest.js",
        "/todolist-pwa/js/controller.js",
        "/todolist-pwa/js/ihm.js",
        "/todolist-pwa/img/",
        "/todolist-pwa/img/favicon-32x32-seochecker-manifest-3210.png",
      ]);
    })
  );
});

self.addEventListener("fetch", () => {});
