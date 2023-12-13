import Movies from "./movies.js";

Movies.getOrFetch().then(movies => {

  const carousel = document.getElementById('cards-carousel');

  const carouselCards = movies.map(movie =>
    `<div class="carousel-card border border-dark">
      <a href="${movie.url}">
        <img src="${movie.posterUrl}" alt="${movie.name}">
      </a>
    </div>`
  )

  carousel.innerHTML = carouselCards.join("")

  carousel.addEventListener("wheel", (event) => {
    const isTouchPad = event.wheelDeltaY
      ? event.wheelDeltaY === -3 * event.deltaY
      : event.deltaMode === 0

    if (isTouchPad) return;

    carousel.scrollLeft += event.deltaY
    event.preventDefault();
  });

  const updateCarousel = () => {
    const screenCenter = window.innerWidth / 2 + carousel.scrollLeft
    for (let i = 0; i < carousel.children.length; i++) {
      const card = carousel.children[i]

      const cardCenter = card.offsetWidth / 2 + card.offsetLeft
      const distanceFromCenter = screenCenter - cardCenter
      const position = Math.min(Math.max(distanceFromCenter / window.innerWidth * 2, -1), 1)

      const matrix = new WebKitCSSMatrix()
      matrix.m11 = 1 - Math.pow(position, 4)
      matrix.m14 = Math.pow(position, 3) * 0.004
      card.style.transform = matrix.toString()

      const scale = 1 - (0.9 * Math.pow(position, 4))
      card.style.scale = scale.toString()
    }
  }

  carousel.addEventListener("scroll", updateCarousel)
  updateCarousel()
})
