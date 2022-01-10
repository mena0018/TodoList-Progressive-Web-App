if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };
  
  const STATIC_CACHE_NAME = "todosApp.v0";

  this.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open('todosApp.v0').then(function(cache) {
      return cache.addAll([
          '/sw-test/',
          '/sw-test/index.html',
          '/sw-test/css/style.css',
          '/sw-test/js/apiRequest.js',
          '/sw-test/js/controller.js',
          '/sw-test/js/ihm.js',
          '/sw-test/img/',
          '/sw-test/img/..jpg',
      ]);
      })
  );
  });