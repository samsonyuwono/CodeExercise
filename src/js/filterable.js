import "../styles/index.css";
import { render } from "ejs";

console.log("App Ready");
function buildCorsFreeUrl(target) {
  return `https://cors.bridged.cc/${target}`;
}

let mediaList;
let query;

//extract fetch to another file
function fetchMedia() {
  // let mediaList;
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
      searchFilter();
    })
    .catch((error) => {
      console.log(error);
    });
}
//fix querySelector vs getElementById
const mediaContainer = document.querySelector("#media-container");
// const radioButtons = document.querySelectorAll(".radio-button");

const radioFilter = document.querySelector(".radio-filter");

radioFilter.addEventListener("change", (e) => {
  console.log(mediaList);
  let radioFiltered = mediaList.filter((media) => {
    return media.type == event.target.value;
  });
  console.log(radioFiltered);
  renderList(radioFiltered, mediaContainer);
});

const searchInput = document.getElementById("search-input");
let searchQuery = "";

//extract event listeners and consolidate all filters into 1 function
function searchFilter() {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    console.log(searchQuery);
    let filtered = mediaList.filter((media) => {
      return media.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    // console.log(searchQuery);
    renderList(filtered, mediaContainer);

    console.log("filtered", filtered);
  });
}

const clearFilter = document.querySelector(".clear-filter");

clearFilter.addEventListener("click", () => {
  renderList(mediaList, mediaContainer);
  document.querySelector("#search-input").value = "";
  document.querySelector(".radio-filter").children[0].checked = false;
  document.querySelector(".radio-filter").children[2].checked = false;
});

//extract to another file
function renderList(list, container, query) {
  console.log("container", container);
  container.innerHTML = "";
  console.log("list", list);
  let result = "";
  console.log(query);
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

fetchMedia();

// let expanded = false;
// console.log(expanded);
// function showCheckboxes() {
//   let checkboxes = document.getElementById("checkboxes");
//   if (!expanded) {
//     checkboxes.style.display = "block";
//     expanded = true;
//   } else {
//     checkboxes.style.display = "none";
//     expanded = false;
//   }
// }

// showCheckboxes();
