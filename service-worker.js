
const CACHE_NAME = 'greenbite-cache-v1';


const urlsToCache = [
  '/',
  './html/index.html',
  './css/styles.css',
  '.js/scripts.js',
  './favicons/apple-icon-57x57.png',
  '/offline.html' 
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        
        if (cachedResponse) {
          return cachedResponse;
        }
        
        
        return fetch(event.request).then((response) => {
          
          if (event.request.url.includes('/api/')) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          }
          return response;
        });
      }).catch(() => {
       
        return caches.match('/offline.html');
      })
  );
});


self.addEventListener('sync', (event) => {
  if (event.tag === 'syncData') {
    event.waitUntil(
      
      console.log('Background sync event triggered!')
    );
  }
});
