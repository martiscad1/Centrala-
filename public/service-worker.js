const CACHE_NAME = 'pompa-apa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg' // Assuming vite.svg is the icon in public folder
];

// La instalarea service worker-ului, deschidem cache-ul și adăugăm fișierele de bază
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptăm cererile de rețea
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Dacă resursa este în cache, o returnăm de acolo
        if (response) {
          return response;
        }

        // Altfel, încercăm să o obținem de la rețea
        return fetch(event.request).then(
          response => {
            // Verificăm dacă am primit un răspuns valid
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonăm răspunsul. Un răspuns este un Stream și poate fi consumat o singură dată.
            // Trebuie să avem o copie pentru browser și una pentru cache.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// La activarea unui nou service worker, ștergem cache-urile vechi
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
