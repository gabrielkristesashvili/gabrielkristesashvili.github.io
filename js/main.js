var suggestMovies = `
                        <div class="card" onclick="movieSelected(298874)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/65/163175.jpg')">
                            </div>
                            <div class="name">
                                unknown
                            </div>
                        </div>
                        <div class="card" onclick="movieSelected(275274)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/423/1059147.jpg')">
                            </div>
                            <div class="name">
                                8.9/10
                            </div>
                        </div>
                        <div class="card" onclick="movieSelected(361585)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/199/499718.jpg')">
                            </div>
                            <div class="name">
                                6.8/10
                            </div>
                        </div>
                        <div class="card" onclick="movieSelected(325186)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/350/876059.jpg')">
                            </div>
                            <div class="name">
                                8/10
                            </div>
                        </div>
                        <div class="card" onclick="movieSelected(392598)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/286/715165.jpg')">
                            </div>
                            <div class="name">
                                7.7/10
                            </div>
                        </div>
                        <div class="card" onclick="movieSelected(75911)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/26/65378.jpg')">
                            </div>
                            <div class="name">
                                unknown
                            </div>
                        </div>
                        <div class="card" onclick="movieSelected(365471)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/213/532898.jpg')">
                            </div>
                            <div class="name">
                                6.3/10
                            </div>
                        </div>
                        <div class="card" onclick="movieSelected(409599)">
                            <div class="img"
                                style="background-image: url('https://static.tvmaze.com/uploads/images/original_untouched/373/933945.jpg')">
                            </div>
                            <div class="name">
                                5.2/10
                            </div>
                        </div>
                        `




$(document).ready(function () {
    $('#movies').html(suggestMovies)
    $('#searchForm').on('submit', (e) => {
        if ($('#searchText').val() == "") {
            alert('Please enter a search text');
        } else {
            let searchText = $('#searchText').val()
            getMovies(searchText);
            $('.head-title').html(`
            <a id="indexhtml" href="https://gabrielkristesashvili.github.io/search-movie/">Home</a>
            <span style="color:#e53637;">></span>
            <span style="margin-left: 8px; color:#fff;">Searched Movies</span>
            `)
        }
        e.preventDefault();
    })
});


function getMovies(searchText) {
    axios.get('https://api.tvmaze.com/search/shows?q=' + searchText)
        .then((response) => {
            // console.log(response)
            let movies = response.data
            let output = ``



            $.each(movies, (index, movie) => {

                output += `
                    
                    <div class="card" onclick="movieSelected(${movie.show.externals.thetvdb})">
                <div class="img" style="background-image: url('${movie.show.image.original}')"></div>
                <div class="name">
                ${movie.show.rating.average ? `${movie.show.rating.average}/10` : 'unknown'}
                </div>
                </div>
                `
            })
            $('#movies').html(output)

        })

        .catch((err) => {
            // console.log(err)
        })


}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html'
    windot.location.split('/')
    window.location.pathname = '/abezara'

    return false

}
function getMovie() {
    let movieId = sessionStorage.getItem('movieId')
    axios.get(' https://api.tvmaze.com/lookup/shows?thetvdb=' + movieId)
        .then((response) => {
            // console.log(response)
            let movie = response.data

            let output = `
            <div class="row">
            <div class="left">
            <div  class="img" style="background-image: url('${movie.image.original}')"></div>
            </div>
            <div class="right">
            <div class="details">
            <div class="details-title">
            <h3>${movie.name}</h3>
            <span>${movie.genres}</span>
            </div>
            <div class="details-rating">
            ${movie.premiered}
            </div>
            <div class="details-summary">
            
            <p>${movie.summary}</p>
            </div>
            <div class="details-list">
            <div class="row">
            <div class="left">
            <ul>
            <li><span>Language:</span> ${movie.language}</li>
            <li><span>Status:</span>${movie.status}</li>
            <li><span>ended:</span> 
            ${movie.status == 'Ended' ? movie.ended : 'Publishing'}
            </li >
            </ul >
            </div >
            <div class="right"></div>
            </div >
            </div >
            <div class="details-imdb-btn">
            <a href="http://imdb.com/title/${movie.externals.imdb}">
            <span>See Imdb</span>
            </a>
            </div>
            <div class="details-goback-btn">
            <a href="/index.html">
            <span>Main Menu</span>
            </a>
            </div>
            </div >
            </div >
            </div >
            `
            $('#movie').html(output)
        })
        .catch((err) => {
            console.log(err)
        })

}










