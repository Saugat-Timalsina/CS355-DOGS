const CAHCE_NAME = "v1.0"
const OFFLINE_URL = "offline.html"

async function cacheOffline() {
    const cache = await caches.open(CAHCE_NAME)
    cache.add(OFFLINE_URL)
}

function deleteOldCache(){
    cache.keys()
    .then(keys => {
        return Promise.all(keys
            .filter(key => key!==CAHCE_NAME)
            .map(key=>caches.delete(key))
        )
    })
}

async function onlineOrOffline(req) {
    try {
        return await fetch(req)
    } catch (error) {
        const cache = await caches.open(CAHCE_NAME)
        const cacheResponse = await cache.match(OFFLINE_URL)
        return cacheResponse
    }
}

self.addEventListener("install", (event) => {
    event.waitUntill( cacheOffline())
    self.skipWaiting()
})

self.addEventListener("activate", (event) => {
    event.waitUntill( deleteOldCache())
})

self.addEventListener('fetch', (event) => {
    if (event.request.mode == "navigate") {
        event.respondWith(onlineOrOffline(event.request))
    }
})