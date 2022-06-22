let page = 1;
let genres = null;
const apiKey = '12b63b8ce21b09c2bc2ef3feb4912b9f'
const baseUrl = 'https://api.themoviedb.org/3'
const moviesPopularUrl = baseUrl + '/movie/popular?api_key=' + apiKey + '&language=pt-BR'
const searchMovieUrl = baseUrl + '/search/multi?api_key=' + apiKey + '&language=pt-BR'
const searchGenresUrl = baseUrl + '/genre/movie/list?api_key=' + apiKey + '&language=pt-BR'
let paginaAnterior = null
let proximaPagina = null
let pesquisar = null
let barraDePesquisa = null


window.onload = () => {

    paginaAnterior = document.querySelector('#prevPage')
    paginaAnterior.disabled = true
    proximaPagina = document.querySelector('#proxPage')
    proximaPagina.disabled = false
    getGenres()
    getMovies()
    barraDePesquisa = document.getElementById('barraDePesquisa')
    pesquisar = document.querySelector('#pesquisar')
    pesquisar.addEventListener("click", searchMovies);
}

const getGenres = () => {
    fetch(searchGenresUrl)

        .then(dados => dados.json())
        .then(dados => {
            genres = dados.genres
        }).catch(err => console.log(err))
}


const getMovies = (page = 1) => {
    const url = moviesPopularUrl + '&page=' + page
    fetch(url)
        .then(dados => dados.json())
        .then(dados => {
            montarHtml(dados)
            proximaPagina.disabled = false
            barraDePesquisa.value = '';
        }).catch(err => console.log(err))
}

const montarHtml = (response) => {
    const moviesContainer = document.querySelector('#movies-container')
    moviesContainer.innerHTML = '';

    let contador = 0;
    let divRow = null;

    const filmes = response.results


    for (const filme of filmes) {


        const controle = filme.title ? 'movie' : 'tv';

        let associateGenres = genres.filter((genre) => {
            return filme.genre_ids.includes(genre.id)
        })

        associateGenres = associateGenres.map((genre) => {
            return genre.name
        })

        const imgUrl = getPoster(filme.poster_path)

        const newRow = `<div class="row justify-content-center mb-5">
                <div class="col-5">
                    <img src="${imgUrl}" class="rounded mx-auto d-block" alt="">
                </div>
                <div class="col-5">
                    <h3 class="text-left font-weight-bold text-white mb-3">${filme.title || filme.name}</h3>
                    <p class="text-left font-weight-normal text-muted ">${filme.overview}</p>
                    <div class="row justify-content-center text-center text-light">
                        <div class="col-3">
                            <i class="fas fa-thumbs-up fa-2x fa" aria-hidden="true"></i> 
                            <p class="mt-1">${filme.vote_average}</p> 
                        </div>
                        <div class="col-4">
                            <i class="fas fa-calendar-alt fa-2x" aria-hidden="true"></i> 
                            <p class="mt-1">${filme.release_date || filme.first_air_date}</p>                  
                        </div>
                        <div class="col-5">
                            <i class="fas fa-film fa-2x" aria-hidden="true"></i>
                            <p class="mt-1">${associateGenres.join(', ')}</p>                   
                        </div>
                         <div class="col-6">
                         <! -- chamar uma função no href e nesta função ter a lógica de if propriedade--> 
                            <a class="btn btn-outline-success" href="https://www.themoviedb.org/${controle}/${filme.id} " target="_blank" >Detalhes</a>        
                         </div>
                    </div>
                </div>
          </div>`

        moviesContainer.innerHTML = moviesContainer.innerHTML + newRow
        contador++;

    }
}

const searchMovies = () => {
    const barraDePesquisa = document.querySelector('#barraDePesquisa')
    const query = barraDePesquisa.value
    const url = searchMovieUrl + '&query=' + query
    fetch(url)

        .then(data => data.json())
        .then(response => {
            montarHtml(response)
        }).catch(err => console.log(err))

    paginaAnterior.disabled = true
    proximaPagina.disabled = true

}

const nextPage = () => {
    page++
    if (page != 1) {

        paginaAnterior.disabled = false

    }
    getMovies(page)
}

const previousPage = () => {
    if (page > 1) {
        page--
        paginaAnterior.disabled = false
    }

    if (page === 1) {
        paginaAnterior.disabled = true
    }

    getMovies(page)
}


function getPoster(id) {
    const urlImg = `https://www.themoviedb.org/t/p/w220_and_h330_face${id}`
    return urlImg
}

