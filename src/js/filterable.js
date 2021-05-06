import "../styles/index.css";

console.log("App Ready");
function buildCorsFreeUrl(target) {
  return `https://cors.bridged.cc/${target}`;
}

const mediaContainer = document.querySelector("#media-container");
let mediaList;

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
  console.log(list);
  container.innerHTML = "";
  let result = "";

  list.forEach((media) => {
    console.log(media.genre);
    result += `<div class="media-card">
                 <img class="media-image" src="${media.poster}" alt=${media.title}/>
                  <p class="media-title">${media.title} (${media.year})</p>
                  <p class="media-genre">${media.genre}</p>
               </div>`;
  });
  container.innerHTML = result;
}

renderList();
