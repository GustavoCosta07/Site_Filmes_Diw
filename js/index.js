let page = 1;
let genres = null;
const apiKey = '12b63b8ce21b09c2bc2ef3feb4912b9f'
const baseUrl = 'https://api.themoviedb.org/3'
const moviesPopularUrl = baseUrl + '/movie/popular?api_key=' + apiKey + '&language=pt-BR'
const searchMovieUrl = baseUrl + '/search/multi?api_key=' + apiKey + '&language=pt-BR'
const searchGenresUrl = baseUrl + '/genre/movie/list?api_key=' + apiKey + '&language=pt-BR'

window.onload = () => {
    getGenres()
    getMovies()
}

const getGenres = () => {
    fetch(searchGenresUrl)
        // arrow function =>
        .then(dados => dados.json())
        .then(dados => {
            genres = dados.genres
        }).catch(err => console.log(err))
}


const getMovies = (page = 1) => {
    const url = moviesPopularUrl + '&page=' + page
    fetch(url)
        // arrow function =>
        .then(dados => dados.json())
        .then(dados => {
            montarHtml(dados)
        }).catch(err => console.log(err))
}

const montarHtml = (response) => {
    const moviesContainer = document.querySelector('#movies-container')
    moviesContainer.innerHTML = '';

    let contador = 0;
    let divRow = null;

    // acessando propriedade results
    // vai retornar uma lista []
    const filmes = response.results
            //     divRow = document.createElement("div");
        //     divRow.classList.add('row')

    for (const filme of filmes) {
        // if (contador === 0) {
        //     divRow = document.createElement("div");
        //     divRow.classList.add('row')
        // }

        console.log(filme)

        
        let associateGenres = genres.filter((genre) => {
            return filme.genre_ids.includes(genre.id)
        }) 

        associateGenres = associateGenres.map((genre) => {
            return genre.name
        })

        const imgUrl = getPoster(filme.poster_path)

        const newRow = ` <div class="row justify-content-center mb-5">
            <div class="col-5">
                <img src="${imgUrl}" class="rounded mx-auto d-block" alt="">
            </div>
            <div class="col-5">
                <h3 class="text-left font-weight-bold text-white mb-3">${filme.title}</h3>
                <p class="text-left font-weight-normal text-muted ">${filme.overview}</p>
                <div class="row justify-content-center text-center text-light">
                    <div class="col-3">
                        <i class="fas fa-thumbs-up fa-2x fa" aria-hidden="true"></i> 
                        <p class="mt-1">${filme.vote_average}</p> 
                    </div>
                    <div class="col-4">
                        <i class="fas fa-calendar-alt fa-2x" aria-hidden="true"></i> 
                        <p class="mt-1">${filme.release_date}</p>                  
                    </div>
                    <div class="col-5">
                        <i class="fas fa-film fa-2x" aria-hidden="true"></i>
                        <p class="mt-1">${associateGenres.join(', ')}</p>                   
                    </div>
                </div>
            </div>
      </div>`

        // divRow.innerHTML += `<div class="col-md-6 col-xs-12 col-sm-6 col-lg-3 mb-5">
        // <div class="card bg-dark text-white" style="width: 100%;">
        //     <img class="card-img-top" src="${imgUrl}" height="280px; width: auto"  alt="asdads">
        //     <div class="card-body">
        //         <h5 class="card-title text-truncate">${filme.title}</h5>
        //         <p class="card-text">${filme.overview}</p>
        //     </div>
        //     </div>      
        // </div>`

        // <img src="${imgUrl}" class="rounded mx-auto d-block" alt="">

        moviesContainer.innerHTML = moviesContainer.innerHTML + newRow
        contador++;

        // if (contador === 4) {
        //     contador = 0;
        // }
    }
}

const searchMovies = () => {
    const query = 'Aranha'
    const url = searchMovieUrl + '&query=' + query
    fetch(url)
        // arrow function =>
        .then(data => data.json())
        .then(response => {
            montarHtml(response)
        }).catch(err => console.log(err))
}


const nextPage = () => {
    page++
    const moviesContainer = document.querySelector('#movies-container')
    getMovies(moviesContainer, page)
}

const previousPage = () => {
    page--
    const moviesContainer = document.querySelector('#movies-container')
    getMovies(moviesContainer, page)
}


function getPoster(id) {
    const urlImg = `https://www.themoviedb.org/t/p/w220_and_h330_face${id}`
    return urlImg
}

