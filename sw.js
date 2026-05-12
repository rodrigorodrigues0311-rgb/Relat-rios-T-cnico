// v1778543862 - RESET + CACHE
const CACHE='csn-1778543862';
const BASE='/Relat-rios-T-cnico/';
const ASSETS=[BASE,BASE+'index.html',BASE+'manifest.json',BASE+'icon-192.png',BASE+'icon-512.png',BASE+'lima-logo.png'];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS).catch(function(){});}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});
self.addEventListener('fetch',function(e){
  // Sempre busca do servidor primeiro, usa cache só se offline
  e.respondWith(
    fetch(e.request).then(function(resp){
      var clone=resp.clone();
      caches.open(CACHE).then(function(c){c.put(e.request,clone);});
      return resp;
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
