const CACHE_NAME = 'nishit-portfolio-v4';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  './assets/videos/',
  './assets/Nishit bhardwaj resume.pdf',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Urbanist:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch((error) => {
          console.log('Cache addAll failed:', error);
          // Continue even if some resources fail to cache
        });
      })
  );
});

// Fetch event with improved error handling
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.startsWith('safari-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((fetchResponse) => {
            // Cache successful responses
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return fetchResponse;
          })
          .catch((error) => {
            console.log('Fetch failed for:', event.request.url, error);
            // Return a fallback response for failed requests
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
            return new Response('Resource not available', { 
              status: 404,
              statusText: 'Not Found'
            });
          });
      })
      .catch((error) => {
        console.log('Cache match failed:', error);
        return new Response('Service unavailable', { 
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Message event handler to prevent async response errors
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Always respond to prevent async response errors
  if (event.ports && event.ports[0]) {
    event.ports[0].postMessage({ success: true });
  }
});