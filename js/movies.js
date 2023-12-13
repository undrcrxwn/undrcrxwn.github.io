export default class Movies {
  static apiToken = "0HNJ0KC-T4GMEYF-PBQZPTE-5AVP50P" // 😱
  static apiUrl = "https://api.kinopoisk.dev/v1.3"

  static async fetchFromApi() {
    return await fetch(`${this.apiUrl}/movie?limit=50`, {
      headers: {
        "Accept": "application/json",
        "X-API-KEY": this.apiToken
      }
    }).then(response => response.json())
  }

  static async getOrFetch() {
    let movies = JSON.parse(localStorage.getItem("movies"))

    if (!movies) {
      movies = await Movies.fetchFromApi()
      localStorage.setItem("movies", JSON.stringify(movies))
    }

    return movies.docs.map(movie => ({
      name: movie.name,
      summary: movie.shortDescription,
      genres: movie.genres.map(genre => genre.name).join(", "),
      posterUrl: movie.poster.previewUrl,
      rating: movie.rating.imdb,
      year: movie.year,
      url: `https://www.kinopoisk.ru/film/${movie.id}/`
    }))
  }
}
