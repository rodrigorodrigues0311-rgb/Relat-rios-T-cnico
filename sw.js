// v1778292933 — gerado automaticamente, NÃO edite
const CACHE = 'csn-1778292933';

self.addEventListener('install', e => {
  console.log('[SW] instalando v1778292933');
  self.skipWaiting(); // força ativação imediata
});

self.addEventListener('activate', e => {
  console.log('[SW] ativando v1778292933');
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        console.log('[SW] deletando cache antigo:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

// Network-first: sempre busca versão mais nova, cai no cache só se offline
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  );
});
