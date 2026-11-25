/* Prana service worker: network first (so updates show right away), cache fallback (so it works offline,
   e.g. in a store with no signal). Bump VERSION only if you need to force-clear old caches. */
const VERSION = 'prana-v1';
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'content/meals.js', 'content/shop.js', 'content/practices.js', 'content/learn.js',
  'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function timeout(ms) { return new Promise((_, no) => setTimeout(() => no(new Error('timeout')), ms)); }
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Fonts: cache first.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req); if (hit) return hit;
      const res = await fetch(req); c.put(req, res.clone()); return res;
    }).catch(() => caches.match(req)));
    return;
  }
  if (url.origin !== self.location.origin) return; // store lookups, maps: straight to network
  // App files: network first with a short timeout, then cache.
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    try {
      const res = await Promise.race([fetch(req), timeout(3500)]);
      if (res && res.ok) c.put(req, res.clone());
      return res;
    } catch (err) {
      return (await c.match(req, {ignoreSearch: true})) || (req.mode === 'navigate' ? c.match('index.html') : Response.error());
    }
  })());
});
