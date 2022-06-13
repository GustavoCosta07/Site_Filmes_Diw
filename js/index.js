
let page = 1;
let genres = null;
const movieId = 550
const apiKey = '12b63b8ce21b09c2bc2ef3feb4912b9f'
const baseUrl = 'https://api.themoviedb.org/3'
const moviedetail = baseUrl + "/movie/" + movieId + "?api_key=" + apiKey + "&language=en-US"

// querystring, body, parans (get, post, put, delete)
// promise, fetch

fetch(moviedetail).then(function(dados){
    console.log(dados)
    return dados.json()
}).then(function(dados2){
    console.log(dados2)
})


// callback frunction
// function teste (callback) {
//     setTimeout(function() {
//         const fakeDados = {
//             amendoin: 1.5
//         }
//         callback(fakeDados)
//     }, 3000) // ms 3000 => 3s
// }

// teste(function(saudacao){
//     console.log(saudacao)
// })