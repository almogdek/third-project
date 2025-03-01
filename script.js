const moviesDiv = document.querySelector('#movies');
fetch("http://www.omdbapi.com/?t=get+out&apikey=6cf42fd4&")
    .then(response => {
    if (!response.ok) {
        throw new Error("No response returned");
    }
    else {
        console.log(response)
        return response.json();
    }
    })
    .then(data => {
        if (data.Response === 'False') {
            throw new Error("No response returned");
        }
        else {
            console.log(data);
            return data
        }
    })
    .then(data => {
        data.Search.forEach(movie => {
            const movies = document.createElement("div")
            movies.classList.add("movie");
            moviesDiv.appendChild(movies);
            movies.innerHTML = `
                <img src="${movie.Poster}" class="poster" style="max-width: 100%">
                <div class="movie-description">
                    <p class="movie-title"> <b class="title">` + movie.Title + `</b> (`+ movie.Year + `)</p>
                    
                    <p></p>
                </div>`

                

        })
    })
    .catch(error => console.log(error));
