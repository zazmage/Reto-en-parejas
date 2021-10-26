// Api web https://www.themoviedb.org/

// Api used https://api.themoviedb.org/3/movie/popular?api_key=6aa6e33230b96c084eb909a19028aa6f

// Url for poster images https://image.tmdb.org/t/p/w500/

import { getData, eraseContent } from "./auxFunctions.js";

const d = document;

const drawCardTemp = (data) => {
  const $template = d.querySelector("#card-temp").content,
    $fragment = d.createDocumentFragment(),
    $cardContainer = d.querySelector("#card-cont");
  data.forEach((el) => {
    const { title, overview, poster_path: imgUrl } = el;
    $template.querySelector(".card-title").textContent = title;
    $template
      .querySelector(".card-img")
      .setAttribute("src", `https://image.tmdb.org/t/p/w500/${imgUrl}`);
    $template.querySelector(".card-des").textContent = overview;
    $fragment.appendChild(d.importNode($template, true));
  });
  $cardContainer.appendChild($fragment);
};

const search = async () => {
  let data = await getData(
    "https://api.themoviedb.org/3/movie/popular?api_key=6aa6e33230b96c084eb909a19028aa6f"
  );
  const search = d.querySelector("#search").value;
  console.log(search);
  if (search) {
    eraseContent(d.querySelector("#card-cont"));
    data = data.filter((el) => el.title === search);
    if (data.length) {
      drawCardTemp(data);
    } else {
      const $cardContainer = d.querySelector("#card-cont");
      $cardContainer.innerHTML = "Sin resultados";
      console.log("Sin resultados");
    }
  } else {
    eraseContent(d.querySelector("#card-cont"));
    drawCardTemp(data);
  }
};

d.addEventListener("DOMContentLoaded", async () => {
  const data = await getData(
    "https://api.themoviedb.org/3/movie/popular?api_key=6aa6e33230b96c084eb909a19028aa6f"
  );
  drawCardTemp(data);
});

d.querySelector("#search-button").addEventListener("click", (e) => {
  e.preventDefault();
  search();
});
