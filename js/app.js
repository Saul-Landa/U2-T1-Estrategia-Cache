let principal = $('#principal')
let noticia = $('#noticia')
let url = window.location.href
let swDirect = '/U2-T1-Estrategia-Cache/sw.js'

if(navigator.serviceWorker){
    if(url.includes('localhost')){
        swDirect = '/sw.js'
    }
    navigator.serviceWorker.register(swDirect);
}

$('.btn-seguir').on('click', (e) => {
    e.preventDefault();
    principal.fadeOut(() => {
        noticia.slideDown(1000)
    })
})

$('.btn-regresar').on('click', () => {
    noticia.fadeOut(() => {
        principal.slideDown(1000)
    })
})