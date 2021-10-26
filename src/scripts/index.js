// API https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30
/* const { name, url } = el,
      pokeInfo = await RestFetch.getData(url),
      {
        types: [insideTypes],
        sprites: { front_default: imgUrl },
      } = pokeInfo,
      pokeType = insideTypes.type.name; */
import RestFetch from "../helpers/RestFetch.js";

const d = document;

const drawCardTemp = async (data) => {
  const $template = d.querySelector("#card-temp").content,
    $fragment = d.createDocumentFragment(),
    $cardContainer = d.querySelector("#card-cont");

  for (const el of data) {
    const { name, imgUrl, pokeType } = el;

    $template.querySelector(".card-title").textContent = name;
    $template.querySelector(".card-img").setAttribute("src", imgUrl);
    $template.querySelector(".card-text").textContent = pokeType;
    $fragment.appendChild(d.importNode($template, true));
  }

  $cardContainer.appendChild($fragment);
};

d.addEventListener("DOMContentLoaded", async () => {
  const pokemons = await RestFetch.getData("http://localhost:3000/pokemons");
  drawCardTemp(pokemons);
});
