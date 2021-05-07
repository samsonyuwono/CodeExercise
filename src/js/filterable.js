import "../styles/index.css";
import { render } from "ejs";

function buildCorsFreeUrl(target) {
  return `https://cors.bridged.cc/${target}`;
}

let mediaList;
const mediaContainer = document.querySelector(".media-container");

function fetchMedia() {
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
      radioButtonFilter();
      getCheckboxes();
      clearAllFilters();
    })
    .catch((error) => {
      console.log(error);
    });
}

const radioFilter = document.querySelector(".radio-filter");

function radioButtonFilter() {
  radioFilter.addEventListener("change", (e) => {
    console.log(mediaList);
    let radioFiltered = mediaList.filter((media) => {
      return media.type == event.target.value;
    });
    console.log(radioFiltered);
    renderList(radioFiltered, mediaContainer);
  });
}

const searchInput = document.querySelector(".search-input");
let searchQuery = "";

function searchFilter() {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    console.log(searchQuery);
    let searchFiltered = mediaList.filter((media) => {
      return media.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    renderList(searchFiltered, mediaContainer);
  });
}

let checkboxes = document.querySelector(".checkboxes");
let selectBox = document.querySelector(".select-box");

function showCheckboxes() {
  let expanded = false;
  selectBox.addEventListener("click", () => {
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  });
}

showCheckboxes();

let genreCheckboxes = document.querySelectorAll(".genre-checkbox");
let selectedGenres = [];

function getCheckboxes() {
  genreCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.addEventListener("change", () => genreFilter());
  });
}

function grabCheckboxValues() {
  genreCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) selectedGenres = [...selectedGenres, checkbox.value];
  });
  selectedGenres = [...new Set(selectedGenres)];
  console.log(selectedGenres);
  return selectedGenres;
}

function genreFilter() {
  selectedGenres = grabCheckboxValues();
  let genreFiltered = mediaList.filter((media) => {
    let genres = media.genre;
    let result = (arr, target) => target.every((v) => arr.includes(v));
    return result(genres, selectedGenres);
  });

  renderList(genreFiltered, mediaContainer);
}

const clearFilter = document.querySelector(".clear-filter");

function clearAllFilters() {
  clearFilter.addEventListener("click", () => {
    renderList(mediaList, mediaContainer);
    searchInput.value = "";
    radioFilter.children[0].checked = false;
    radioFilter.children[2].checked = false;
    getCheckboxes();
    selectedGenres = [];
  });
}

function renderList(list, container) {
  container.innerHTML = "";
  let result = "";
  list
    .sort((a, b) => (a.title > b.title ? 1 : -1))
    .forEach((media) => {
      result += `<div class="media-card">
                 <img class="media-image" src="${media.poster}" alt=${media.title}/>
                  <p class="media-title">${media.title} (${media.year})</p>
                  <p class="media-genre">Genres: ${media.genre}</p>
               </div>`;
    });

  container.innerHTML = result;
}

fetchMedia();
