'use strict';

var cachedFiles = [
    'index.html',
    'game.html'
];

async function loadCache() {
    let cache = await caches.open('CACHE1');
    await cache.addAll(cachedFiles);
    console.log('Service worker installed');
}

async function clearCache() {
    await caches.delete('CACHE1');
}

async function myFetch(request) {
    let response = await caches.match(request);
    if (typeof response === "undefined") response = await fetch(request);
    return response;
}

self.addEventListener('install', function (event) {
    console.log('Service worker installing');
    event.waitUntil(loadCache());
});

self.addEventListener('fetch', function (event) {
    event.respondWith(myFetch(event.request));
});