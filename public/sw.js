const CACHE_NAME = 'firstcare-v2'

const STATIC_ASSETS = [
  '/',
  '/quick-reference',
  '/triage',
  '/category/emergency',
  '/category/acute',
  '/category/common',
  '/category/womens-health',
  '/category/chronic',
  '/category/maternal-child',
  '/category/sexual-health'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return

  // Don't cache API calls — these must always hit the network
  if (event.request.url.includes('/api/')) return

  // Network-first: always try to get the freshest version.
  // Only fall back to cache if the network genuinely fails
  // (offline, or no connection) — this is what actually makes
  // "works offline" true without also making "shows the latest
  // deploy" false.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200) {
          return response
        }
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone)
        })
        return response
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached
          return caches.match('/')
        })
      })
  )
})
