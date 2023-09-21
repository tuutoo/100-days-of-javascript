let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
  let movieName = movieNameRef.value;
  let baseURL = "https://imdb-api.tuutoo.workers.dev"
  let queryByTitleURL = `${baseURL}/search?query=${movieName}`;


  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`
  }
  else {
    fetch(queryByTitleURL).then(res => res.json()).then(data => {
      if (data.results.length > 0) {
        movie = data.results[0]
        let queryMovieDetailURL = `${baseURL}${movie.api_path}`
        fetch(queryMovieDetailURL).then(res => res.json()).then(data => {
          console.log(data)
          result.innerHTML = `
                    <div class="info">
                        <img src=${data.image} class="poster">
                        <div>
                            <h2>${data.title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.rating.star}<span class="total-rating">/10</span></h4>
                            </div>
                            <div class="details">
                                <span>${data.contentRating}</span>
                                <span>${data.year}</span>
                                <span>${data.runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.genre.join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.actors}</p>
                `;
        })
      }
    })
      //if error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
}

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);