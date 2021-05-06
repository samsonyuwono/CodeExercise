import "../styles/index.css";
import { render } from "ejs";

console.log("App Ready");
function buildCorsFreeUrl(target) {
  return `https://cors.bridged.cc/${target}`;
}

const mediaContainer = document.querySelector("#media-container");
const searchInput = document.querySelector("#search-input");
let mediaList;
let query;

searchInput.addEventListener("change", (event) => {
  query = event.target.value;
  console.log(query);
});

function fetchMedia() {
  let mediaList;
  const apiUrl =
    "https://hubspotwebteam.github.io/CodeExercise/src/js/data/data.json";

  const corsFreeUrl = buildCorsFreeUrl(apiUrl);

  fetch(corsFreeUrl, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      mediaList = data.media;
      renderList(mediaList, mediaContainer);
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchMedia();

function renderList(list, container) {
  container.innerHTML = "";
  let result = "";
  list.sort((a, b) => (a.title > b.title ? 1 : -1));

  list.forEach((media) => {
    result += `<div class="media-card">
                 <img class="media-image" src="${media.poster}" alt=${media.title}/>
                  <p class="media-title">${media.title} (${media.year})</p>
                  <p class="media-genre">Genres: ${media.genre}</p>
               </div>`;
  });
  container.innerHTML = result;
}

let radioButtons = document.querySelectorAll(".radio-button");

function fillContainer() {}

// console.log(radioButtons);

radioButtons.forEach((btn) => {
  btn.addEventListenerListener("click", renderList);
});

// document.querySelector(".books").addEventListener("change", () => {
//   alert("checked books");
// });

function filterType(type) {}
