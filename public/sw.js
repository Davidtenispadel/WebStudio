// ✅ sw.js — elimina cualquier service worker antiguo
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

// ✅ No interceptamos nada, no cacheamos nada
self.addEventListener("fetch", () => {});
