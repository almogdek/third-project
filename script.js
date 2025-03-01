const moviesDiv = document.querySelector('#movies');

const apiData = {};

fetch("http://www.omdbapi.com/?s=get+out&apikey=6cf42fd4&")
    .then(response => {
        if (!response.ok) {
            throw new Error("No response returned (Error: ok: false)");
        }
        return response.json();
    })
    .then(data => {
        if (data.Response === 'False') {
            throw new Error("No response returned (Error: Response: false)");
        }
        console.log(data);
        return data;
    })
    .then(data => {
        const movieDetailsPromises = data.Search.map(movie => {
            return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=6cf42fd4`)
                .then(response => response.json())
        });

        return Promise.all(movieDetailsPromises);
    })
    .then(fullMovieDetails => {
        fullMovieDetails.forEach(movie => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");
            moviesDiv.appendChild(movieDiv);
            movieDiv.innerHTML = `
                <img src="${movie.Poster}" class="poster" style="max-width: 100%">
                <div class="movie-description">
                    <p class="movie-title"><b class="title">${movie.Title}</b> (${movie.Year})</p>
                    <p>${movie.Plot}</p>
                </div>`;
        });
    })
    .catch(error => console.log(error));
