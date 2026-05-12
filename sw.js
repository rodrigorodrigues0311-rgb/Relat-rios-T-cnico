// v1778545979
const CACHE='csn-1778545979';
const BASE='/Relat-rios-T-cnico/';
const ASSETS=[BASE,BASE+'index.html',BASE+'manifest.json',BASE+'icon-192.png',BASE+'icon-512.png',BASE+'lima-logo.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS).catch(function(){});}).catch(function(){}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));});
