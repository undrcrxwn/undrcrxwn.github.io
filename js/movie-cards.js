import Movies from "./movies.js";

const container = document.getElementById("movie-cards")

const normalize = (value) => value.toLowerCase().replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g, "")

const renderCards = (movies) => {
  const cards = movies.map(movie =>
    `<div class="d-flex col-md-3">=
      <div class="card mb-4 bg-dark text-light">
        <a href="${movie.url}">
          <img class="card-img-top poster" src="${movie.posterUrl}" alt="${movie.name}"/>
        </a>
        <div class="card-body d-flex flex-column">
          <div class="flex-fill">
            <a href="${movie.url}" class="text-white">
              <h4 class="card-title">${movie.name} <span class="text-secondary">${movie.year}</span></h4>
            </a>
            <p class="card-text summary">${movie.summary}.</p>
            <p class="text-secondary">Жанры: ${movie.genres}</p>
          </div>
          <p class="m-0 badge bg-primary fs-6" style="align-self: flex-start">${movie.rating} ★</p>
        </div>
      </div>
    </div>`
  )

  container.innerHTML = cards.length > 0
    ? cards.join("")
    : `<div class="container text-center text-light mb-5">
      <h3>Такого у нас нет.</h3>
    </div>`
}

Movies.getOrFetch().then(movies => {
  movies.reverse();

  const input = document.getElementById("search")

  input.addEventListener("input", (event) => {
    const normalizedQuery = normalize(event.target.value)
    console.log(normalizedQuery)
    renderCards(movies.filter(movie => {
      if (normalizedQuery === "") return true;
      const normalizedMovie = normalize(movie.name + movie.year + movie.summary + movie.genres)
      console.log(normalizedMovie)
      return normalizedMovie.includes(normalizedQuery);
    }));
  })

  renderCards(movies);
})