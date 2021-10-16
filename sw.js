console.log("Sw; limpio");

const CACHE_NAME = 'cache-v1'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'
const CACHE_STATIC_NAME = 'static-v1'
const CACHE_INMUTABLE_NAME = 'inmutable_v1'

const cleanCache = (name, sizeItems) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            console.log(keys)
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
                '/',
                'index.html', 
                'css/page.css',
                'img/1.png',
                'js/app.js'
            ])
        });

    const promesaInmu = caches.open(CACHE_INMUTABLE_NAME)
    .then(cache => {
        return cache.addAll([
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
        ])
    });

    event.waitUntil(Promise.all([promesa, promesaInmu]));
})

self.addEventListener('fetch', event => {
    //1. Only chaché
    // event.respondWith(caches.match(event.request))

    //2. Caché with network fallback
    // Primero va a buscar en caché y sino lo encuentra va a la red

    const respuesta = caches.match(event.request)
        .then(response => {
            if(response) return response

            console.log("No está en chaché")
            return fetch(event.request)
                .then(res => {
                    caches.open(CACHE_DYNAMIC_NAME).then(cache => cache.put(event.request, res).then(() => {
                        cleanCache(CACHE_DYNAMIC_NAME, 6)
                    }))
                    
                    return res.clone()
                })
        })

        event.respondWith(respuesta)
})