const button = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  button.style.opacity = window.pageYOffset > 500
    ? 1
    : 0;
});