// v1778538772
const CACHE='csn-1778538772';
const BASE='/Relat-rios-T-cnico/';
const ASSETS=[BASE,BASE+'index.html',BASE+'manifest.json',BASE+'icon-192.png',BASE+'icon-512.png',BASE+'lima-logo.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
