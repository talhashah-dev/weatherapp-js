const searchInp = document.getElementById("searchInp");
const searchBtn = document.getElementById("searchBtn");
const locateMe = document.getElementById("locateMe");
const darkModeToggleBtn = document.getElementById("darkModeToggleBtn");

const API_KEY = "210eeabe1cac851c368047662c4815fd";

darkModeToggleBtn.addEventListener("click", () => {
  const body = document.body;
  const searchContainer = document.querySelector(".search-container");
  const weatherContainer = document.querySelector(".weather-container");
  darkModeToggleBtn.classList.toggle("fa-moon");
  body.classList.toggle("bg-body-dark");
  searchContainer.classList.toggle("bg-blue-container");
  weatherContainer.classList.toggle("bg-blue-container");
  searchInp.classList.toggle("bg-blue-container");
});

async function getSearchWeather() {
  if (searchInp.value !== "") {
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInp.value}&units=metric&appid=${API_KEY}`
      );
      const data = await result.json();

      const location = document.querySelector(".location");
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const feels_like = document.querySelector(".feels-like");
      const temp_min = document.querySelector(".temp-min");
      const temp_max = document.querySelector(".temp-max");
      const humidity = document.querySelector(".humidity");
      const wind_speed = document.querySelector(".wind-speed");
      const pressure = document.querySelector(".pressure");

      location.innerText = `${data.name}, ${data.sys.country}`;
      temperature.innerText = `${Math.floor(data.main.temp)}°C`;
      description.innerText = `${data.weather[0].description}`;
      feels_like.innerText = `Feels Like ${Math.floor(data.main.feels_like)}°C`;
      temp_max.innerText = `${Math.floor(data.main.temp_max)}°C`;
      temp_min.innerText = `${Math.floor(data.main.temp_min)}°C`;
      humidity.innerText = `Humidity ${data.main.humidity}%`;
      wind_speed.innerText = `Wind ${Math.floor(data.wind.speed)}km/h`;
      pressure.innerText = `Pressure ${data.main.pressure}hpa`;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Please enter a city name!");
  }
}

async function getLocationWeather() {
  async function resolved(location) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=${API_KEY}`
      );
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function rejected() {
    console.log("Access Denied!");
  }

  navigator.geolocation.getCurrentPosition(resolved, rejected);
}

locateMe.addEventListener("click", getLocationWeather);
searchBtn.addEventListener("click", getSearchWeather);
