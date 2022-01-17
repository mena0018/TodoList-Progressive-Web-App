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


self.addEventListener("fetch", (event) => {
  // Nous voulons seulement répondre aux requêtes concernant notre application en testant l'URL de la requête
  if (event.request.url.startsWith("http://localhost:3000/")) {
    // Tente de produire une réponse à la requête fetch interceptée
    event.respondWith(
        caches.open(STATIC_CACHE_NAME)
            // En allant chercher la réponse dans le cache en premier
            .then(cache => cache.match(event.request))
            // Puis sur le réseau si elle n'existe pas dans le cache (cacheRequest === undefined)
            .then(cacheRequest => cacheRequest || fetch(event.request))
    );
  }
  // Si votre condition if() est fausse, alors cet écouteur d'événement ne proposera pas de réponse à la requête.
  // Cela laisse l'opportunité à d'autres écouteurs d'événements d'intercepter cette requête pour produire une réponse adaptée.
  // Si aucun écouteur d'événement ne propose de réponse à cette requête, alors la requête sera gérée par votre navigateur
  // comme si aucun "Service Worker" n'était enregistré
});