console.log("Sw; limpio");

const CACHE_NAME = 'cache'
const CACHE_DYNAMIC_NAME = 'dynamic'
const CACHE_STATIC_NAME = 'static'
const CACHE_INMUTABLE_NAME = 'inmutable'
const URL = '/U2-T1-Estrategia-Cache/'

const cleanCache = (name, sizeItems) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > sizeItems) {
                cache.delete(keys[0]).then(() => {
                    cleanCache(name, sizeItems)
                })
            }
        })
    })
}

self.addEventListener('install', event => {
    const promesa = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                URL,
                URL + 'index.html', 
                URL + 'manifest.json', 
                URL + 'css/style.css',
                URL + 'img/1.png',
                URL + 'img/2.png',
                URL + 'img/3.png',
                URL + 'img/4.png',
                URL + 'js/app.js'
            ])
        });

    const promesaInmu = caches.open(CACHE_INMUTABLE_NAME)
    .then(cache => {
        return cache.addAll([
            URL + 'css/bootstrap.min.css',
            'https://code.jquery.com/jquery-3.5.1.slim.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js'
        ])
    });

    event.waitUntil(Promise.all([promesa, promesaInmu]));
})

self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request)
        .then(response => {
            if(response) return response

            return fetch(event.request)
                .then(res => {
                    caches.open(CACHE_DYNAMIC_NAME).then(cache => cache.put(event.request, res).then(() => {
                        cleanCache(CACHE_DYNAMIC_NAME, 10)
                    }))
                    
                    return res.clone()
                })
        })

        event.respondWith(respuesta)
})