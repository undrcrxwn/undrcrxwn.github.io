function showCategory(category) {
  const gallery = document.getElementById("gallery");
  const cards = gallery.contentDocument.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    console.log(cards[i]);
    const title = cards[i].getElementsByClassName("card__title")[0].innerHTML.toLowerCase();

    let show = true;

    if (category === 1)
      show = title.includes("машинка");
    else if (category === 2)
      show = title.includes("кукла") || title.includes("пони");
    else if (category === 3)
      show = title.includes("конструктор");
    else if (category === 4)
      show = title.includes("коптер");
    else if (category === 5)
      show = title.includes("развив");

    if (show) {
      cards[i].style.display = "flex";
    }
    else {
      cards[i].style.display = "none";
    }
  }
}