import {
  renderList,
  radioButtonFilter,
  searchFilter,
  clearAllFilters,
} from "./filterable.js";

function buildCorsFreeUrl(target) {
  return `https://cors.bridged.cc/${target}`;
}

let mediaList;
const mediaContainer = document.querySelector(".media-container");

//extract fetch to another file
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
      clearAllFilters();
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchMedia();
