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
const forecast = document.querySelector(".forecast");

const API_KEY = "210eeabe1cac851c368047662c4815fd";

darkModeToggleBtn.addEventListener("click", () => {
  const body = document.body;
  const searchContainer = document.querySelector(".search-container");
  const weatherContainer = document.querySelector(".weather-container");
  darkModeToggleBtn.classList.toggle("fa-moon");
  body.classList.toggle("bg-body-dark");
  searchContainer.classList.toggle("bg-blue-container");
  weatherContainer.classList.toggle("bg-blue-container");
  forecast.classList.toggle("bg-blue-container");
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
    "50n": "fog.png",
  };
  weather_icon.src = `assets/images/${
    iconMap[iconCode] || "undefined-icon.png"
  }`;
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
    if (error.message === "Failed to fetch") {
      Swal.fire({
        title: "Oops!",
        text: `Check your Connection!`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        text: `City Not Found!`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }
}

async function getForecast(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
    );
    const forecastData = await response.json();
    const cardContainer = document.querySelector(".card-container");

    // Function to get one forecast entry per day
    function getDailyForecasts(forecastList) {
      const dailyForecasts = [];
      const usedDates = new Set();

      forecastList.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!usedDates.has(date)) {
          dailyForecasts.push(forecast);
          usedDates.add(date);
        }
      });

      return dailyForecasts.slice(0, 5); // Get only the next 5 days
    }

    const dailyForecasts = getDailyForecasts(forecastData.list);

    dailyForecasts.forEach((forecast) => {
      // Create a card element
      const card = document.createElement("div");
      card.className = "card";

      // Create elements for the forecast data
      const date = document.createElement("p");
      date.className = "date";
      date.textContent = new Date(forecast.dt * 1000).toLocaleDateString(
        "en-US",
        { weekday: "long" }
      );

      const icon = document.createElement("img");
      icon.className = "card-img";
      icon.src = `assets/images/${forecast.weather[0].icon}.png`
      icon.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
      icon.alt = forecast.weather[0].description;

      const temperature = document.createElement("p");
      temperature.className = "temperature";
      temperature.textContent = `${forecast.main.temp}°C`;

      const maxMinTemp = document.createElement("p");
      maxMinTemp.className = "max-min-temp";
      maxMinTemp.textContent = `${forecast.main.temp_min}°C|${forecast.main.temp_max}°C`;

      const description = document.createElement("p");
      description.className = "description";
      description.textContent = forecast.weather[0].description;

      // Append the elements to the card
      card.appendChild(date);
      card.appendChild(icon);
      card.appendChild(temperature);
      card.appendChild(maxMinTemp);
      card.appendChild(description);

      // Append the card to the container
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
    // Swal.fire({
    //   title: "Oops!",
    //   text: `${error}`,
    //   icon: "error",
    //   confirmButtonText: "Ok",
    // });
  }
}

async function getSearchWeather() {
  if (searchInp.value !== "") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInp.value}&units=metric&appid=${API_KEY}`;
    await fetchWeather(url);
    await getForecast(searchInp.value);
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
  await getForecast("london");
}

searchInp.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    if (searchInp.value !== "") {
      getForecast(searchInp.value);
      getSearchWeather();
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Enter a City Name!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }
});

window.addEventListener("load", defaultSearch);
locateMe.addEventListener("click", getLocationWeather);
searchBtn.addEventListener("click", getSearchWeather);
