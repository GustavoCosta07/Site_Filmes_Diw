let page = 1;
const apiKey = '12b63b8ce21b09c2bc2ef3feb4912b9f'
const baseUrl = 'https://api.themoviedb.org/3'
const moviesPopularUrl = baseUrl + '/movie/popular?api_key=' + apiKey + '&language=pt-BR'
let searchMovieUrl = baseUrl + '/search/multi?api_key=' + apiKey + '&language=pt-BR'

window.onload = () => {
    const moviesContainer = document.querySelector('#movies-container')
    getMovies(moviesContainer)
}


const getMovies = (moviesContainer, page = 1) => {
    const url = moviesPopularUrl + '&page=' + page
    fetch(url)
        // arrow function =>
        .then(data => data.json())
        .then(response => {
            mountHtml(moviesContainer, response)
        }).catch(err => console.log(err))
}

const searchMovies = () => {
    const query = 'Aranha'
    const url = searchMovieUrl + '&query=' + query
    const moviesContainer = document.querySelector('#movies-container')
    fetch(url)
        // arrow function =>
        .then(data => data.json())
        .then(response => {
            mountHtml(moviesContainer, response)
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


const mountHtml = (moviesContainer, response) => {
    moviesContainer.innerHTML = '';

    let counter = 0;
    let divRow = null;

    const movies = response.results

    for (const movie of movies) {
        if (counter === 0) {
            divRow = document.createElement("div");
            divRow.classList.add('row')
        }

        const imgUrl = getPoster(movie.poster_path)
        divRow.innerHTML += `<div class="col-md-3">
            <div class="movie" onclick="showInfo()">
                <img src="${imgUrl}" class="img-fluid movie-img" alt="">
                <div class="movie-desc">
                    ${movie.title}
                </div>
            </div>
        </div>`

        moviesContainer.appendChild(divRow)
        counter++;

        if (counter === 4) {
            counter = 0;
        }
    }
}

function getPoster(id) {
    const urlImg = `https://www.themoviedb.org/t/p/w220_and_h330_face${id}`
    return urlImg
}

