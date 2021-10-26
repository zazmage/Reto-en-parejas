// API https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30
/* const { name, url } = el,
      pokeInfo = await RestFetch.getData(url),
      {
        types: [insideTypes],
        sprites: { front_default: imgUrl },
      } = pokeInfo,
      pokeType = insideTypes.type.name; */
import RestFetch from "../helpers/RestFetch.js";
import { eraseContent } from "../helpers/auxFunctions.js";

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

const search = async () => {
  let data = await RestFetch.getData("http://localhost:3000/pokemons");
  const search = d.querySelector("#filter").value;
  if (search) {
    eraseContent(d.querySelector("#card-cont"));
    data = data.filter((el) => el.name === search);
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
  // GET
  const pokemons = await RestFetch.getData("http://localhost:3000/pokemons");
  drawCardTemp(pokemons);
  /* d.querySelectorAll(".ed-btn").forEach((btn) => {
    btn.addEventListener("click", editCard);
  }); */
  /* d.querySelectorAll(".del-btn").forEach((btn) => {
    btn.addEventListener("click", delCard);
  }); */
});

d.addEventListener("submit", async (e) => {
  /* const $mainButton = d.querySelector("#main-btn");
  $mainButton.preventDefault(); */

  if (e.target.matches(".main-form")) {
    e.preventDefault();
    // POST
    if (!e.target.id.value) {
      if (
        e.target.name.value &&
        e.target.image.value &&
        e.target.pokeType.value
      ) {
        RestFetch.postData("http://localhost:3000/pokemons", {
          name: e.target.name.value,
          imgUrl: e.target.image.value,
          pokeType: e.target.pokeType.value,
        });
      } else {
        alert("Faltan datos");
      }
    } else {
      // PUT

      RestFetch.putData("http://localhost:3000/pokemons", e.target.id.value, {
        name: e.target.name.value,
        imgUrl: e.target.image.value,
        pokeType: e.target.pokeType.value,
      });
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".ed-btn")) {
    const $mainForm = d.querySelector(".main-form"),
      $formTitle = d.querySelector(".form-title");

    $formTitle.textContent = "Editar pokemon";
    $mainForm.name.value = e.target.dataset.name;
    $mainForm.image.value = e.target.dataset.imgUrl;
    $mainForm.pokeType.value = e.target.dataset.pokeType;
    $mainForm.id.value = e.target.dataset.id;
    $mainForm.querySelector("#main-btn").innerText = "Editar";
  }
  if (e.target.matches(".del-btn")) {
    // DELETE
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

d.querySelector("#fil-btn").addEventListener("click", (e) => {
  e.preventDefault();
  search();
});

//d.addEventListener("submit");
