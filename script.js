const moviesDiv = document.querySelector('#movies');
fetch("http://www.omdbapi.com/?s=get+out&apikey=6cf42fd4")
    .then(response => {
    if (!response.ok) {
        throw new Error("No response returned");
    }
    else {
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
                <div class="poster-container" style="width: 50%;">
                    <img src="${movie.Poster}" class="poster" style="max-width: 100%">
                    
                </div>
                <div class="title">`+ movie.Title +`</div>`

                

        })
    })
    .catch(error => console.log(error));
