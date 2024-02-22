//TMDB API
const API_KEY = "api_key=6aecc18374bbe900a633560c56cc2e1a";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL =
  BASE_URL +
  "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&" +
  API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchURL = BASE_URL + "search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getPopularMovies = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showMovies(data.results);
    });
};
getPopularMovies(API_URL);

const showMovies = (data) => {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
     <img
    src= "${IMG_URL + poster_path}"
    alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    ${overview}
  </div>
    `;
    main.appendChild(movieElement);
  });
};

const getColor = (vote) => {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 4) {
    return "orange";
  } else {
    return "red";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchResult = search.value;

  if (searchResult) {
    getPopularMovies(searchURL + "&query=" + searchResult);
  } else {
    getPopularMovies(API_URL);
  }
});
