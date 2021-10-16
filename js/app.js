let principal = $('#principal')
let noticia = $('#notice')

$('.btn-seguir').on('click', (e) => {
    e.preventDefault();
    console.log("entraste a seguir")
    principal.fadeOut(() => {
        noticia.slideDown(1000)
    })
    // noticia.fadeIn('slow', () => {
    //     principal.slideUp(1000)
    // })
    //20213-PW-SELG-U2-P2
})

$('.btn-regresar').on('click', () => {
    noticia.fadeOut(() => {
        principal.slideDown(1000)
    })
})