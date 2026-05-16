// CSN Automacao v1778898911 - FORCE UPDATE
const CACHE_NAME = 'csn-v1778898911';
const URLS = ['./', './index.html', './manifest.json', './sw.js',
  './icon-192.png', './icon-512.png', './lima-logo.png'];

// INSTALL: baixa tudo novo
self.addEventListener('install', function(e) {
  console.log('SW instalando v1778898911');
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS).catch(function(err) {
        console.log('Cache partial fail:', err);
      });
    })
  );
});

// ACTIVATE: deleta TODOS os caches antigos sem exceção
self.addEventListener('activate', function(e) {
  console.log('SW ativando v1778898911');
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) {
               console.log('Deletando cache antigo:', n);
               return caches.delete(n);
             })
      );
    }).then(function() {
      console.log('SW v1778898911 ativo!');
      return self.clients.claim();
    })
  );
});

// FETCH: sempre busca do servidor primeiro
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(response) {
      if (response.ok) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(e.request).then(function(cached) {
        return cached || new Response('Offline', {status: 503});
      });
    })
  );
});
