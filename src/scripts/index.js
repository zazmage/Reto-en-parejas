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
    const { id, name, imgUrl, pokeType } = el;

    $template.querySelector(".card-title").textContent = name;
    $template.querySelector(".card-img").setAttribute("src", imgUrl);
    $template.querySelector(".card-text").textContent = pokeType;
    $template.querySelector(".ed-btn").dataset.id = id;
    $template.querySelector(".ed-btn").dataset.name = name;
    $template.querySelector(".ed-btn").dataset.pokeType = pokeType;
    $template.querySelector(".ed-btn").dataset.imgUrl = imgUrl;
    $template.querySelector(".del-btn").dataset.id = id;
    $fragment.appendChild(d.importNode($template, true));
  }

  $cardContainer.appendChild($fragment);
};

/* const editCard = (e) => {
  const $mainForm = d.querySelector(".main-form"),
    $formTitle = d.querySelector(".form-title");

  $formTitle.textContent = "Editar pokemon";
  $mainForm.name.value = e.target.dataset.name;
  $mainForm.image.value = e.target.dataset.imgUrl;
  $mainForm.pokeType.value = e.target.dataset.pokeType;

  console.log(e.target.dataset.pokeType);
}; */

d.addEventListener("DOMContentLoaded", async () => {
  const pokemons = await RestFetch.getData("http://localhost:3000/pokemons");
  drawCardTemp(pokemons);
  /* d.querySelectorAll(".ed-btn").forEach((btn) => {
    btn.addEventListener("click", editCard);
  }); */
  /* d.querySelectorAll(".del-btn").forEach((btn) => {
    btn.addEventListener("click", delCard);
  }); */
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".ed-btn")) {
    const $mainForm = d.querySelector(".main-form"),
      $formTitle = d.querySelector(".form-title");

    $formTitle.textContent = "Editar pokemon";
    $mainForm.name.value = e.target.dataset.name;
    $mainForm.image.value = e.target.dataset.imgUrl;
    $mainForm.pokeType.value = e.target.dataset.pokeType;
  }
  if (e.target.matches(".del-btn")) {
    let isDelete = confirm(
      `¿Estás seguro de eliminar el pokemon ${e.target.dataset.nombre}?`
    );
    if (isDelete) {
      RestFetch.deleteData(
        "http://localhost:3000/pokemons",
        e.target.dataset.id
      );
    }
  }
});

//d.addEventListener("submit");
