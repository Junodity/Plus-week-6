let form = document.querySelector("#city-form");
let cityName = document.querySelector("h1");
let now = new Date();
let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");
let searchInput = document.querySelector("#search-input");
let temperatureElement = document.querySelector("#temperature");

let apiKey = "40687od552f0t368ad35aab0cbeb1460";

function correctCityName() {
  let trimmedInput = searchInput.value.trim().toLowerCase();
  let capitalizedName = trimmedInput
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return capitalizedName;
}

function changeCityName(event) {
  event.preventDefault();
  cityName.innerHTML = correctCityName();
  let city = correctCityName();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function formatDate() {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  currentTime.innerHTML = ` ${hours}:${minutes}`;
  currentDay.innerHTML = week[now.getDay()];
}

function getTemp(response) {
  let temp = Math.round(response.data.temperature.current);

  temperatureElement.innerHTML = temp;
}

formatDate();
form.addEventListener("submit", changeCityName);

let defaultCity = "Paris";
let defaultApiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
axios.get(defaultApiUrl).then(getTemp);
