const searchInp = document.getElementById("searchInp");
const searchBtn = document.getElementById("searchBtn");
const locateMe = document.getElementById("locateMe");
const darkModeToggleBtn = document.getElementById("darkModeToggleBtn");
const searchLocation = document.querySelector(".location");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const feels_like = document.querySelector(".feels-like");
const temp_min = document.querySelector(".temp-min");
const temp_max = document.querySelector(".temp-max");
const humidity = document.querySelector(".humidity");
const wind_speed = document.querySelector(".wind-speed");
const pressure = document.querySelector(".pressure");
const weather_icon = document.querySelector(".weather-icon");

const API_KEY = "210eeabe1cac851c368047662c4815fd";

darkModeToggleBtn.addEventListener("click", () => {
  const body = document.body;
  const searchContainer = document.querySelector(".search-container");
  const weatherContainer = document.querySelector(".weather-container");
  darkModeToggleBtn.classList.toggle("fa-moon");
  body.classList.toggle("bg-body-dark");
  searchContainer.classList.toggle("bg-blue-container");
  weatherContainer.classList.toggle("bg-blue-container");
});

function setWeatherIcon(iconCode) {
  const iconMap = {
    "01n": "clear-night.png",
    "01d": "clear-day.png",
    "02d": "partly-cloudy-day.png",
    "02n": "partly-cloudy-night.png",
    "03d": "cloudy.png",
    "03n": "cloudy.png",
    "04d": "cloudy.png",
    "04n": "cloudy.png",
    "09d": "heavy-showers.png",
    "09n": "heavy-showers.png",
    "10d": "showers.png",
    "10n": "showers.png",
    "11d": "thunderstorm-showers.png",
    "11n": "thunderstorm-showers.png",
    "13d": "snow.png",
    "13n": "snow.png",
    "50d": "fog.png",
    "50n": "fog.png"
  };
  weather_icon.src = `assets/images/${iconMap[iconCode] || "undefined-icon.png"}`;
}

function updateWeatherDetails(data) {
  searchLocation.innerText = `${data.name}, ${data.sys.country}`;
  temperature.innerText = `${Math.floor(data.main.temp)}°C`;
  description.innerText = `${data.weather[0].description}`;
  feels_like.innerText = `Feels Like ${Math.floor(data.main.feels_like)}°C`;
  temp_max.innerText = `${Math.floor(data.main.temp_max)}°C`;
  temp_min.innerText = `${Math.floor(data.main.temp_min)}°C`;
  humidity.innerText = `Humidity ${data.main.humidity}%`;
  wind_speed.innerText = `Wind ${Math.floor(data.wind.speed)}km/h`;
  pressure.innerText = `Pressure ${data.main.pressure}hpa`;
  setWeatherIcon(data.weather[0].icon);
}

async function fetchWeather(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    updateWeatherDetails(data);
  } catch (error) {
    Swal.fire({
      title: "Oops!",
      text: `City Not Found!`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

async function getSearchWeather() {
  if (searchInp.value !== "") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInp.value}&units=metric&appid=${API_KEY}`;
    await fetchWeather(url);
  } else {
    Swal.fire({
      title: "Oops!",
      text: "Enter a City Name!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

async function getLocationWeather() {
  function resolved(location) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=${API_KEY}`;
    fetchWeather(url);
  }

  function rejected() {
    Swal.fire({
      title: "Oops!",
      text: "Access Denied!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }

  navigator.geolocation.getCurrentPosition(resolved, rejected);
}

async function defaultSearch() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${API_KEY}`;
  await fetchWeather(url);
}

window.addEventListener("load", defaultSearch);
locateMe.addEventListener("click", getLocationWeather);
searchBtn.addEventListener("click", getSearchWeather);
