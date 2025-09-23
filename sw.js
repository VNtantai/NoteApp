const CACHE_NAME = 'notes-app-v1'
const ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/styles.css',
  '/manifest.webmanifest'
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(()=>{})
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k) })
    ))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(r => {
        const copy = r.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy))
        return r
      }).catch(()=>caches.match('/index.html'))
    )
    return
  }

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(r=>r)).catch(()=>{})
  )
})