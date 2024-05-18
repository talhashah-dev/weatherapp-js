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
  searchInp.classList.toggle("bg-blue-container");
});

async function getSearchWeather() {
  let data;

  if (searchInp.value !== "") {
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInp.value}&units=metric&appid=${API_KEY}`
      );
      data = await result.json();
      console.log(data);

      switch (data.weather[0].icon) {
        case "01n":
          weather_icon.src = "assets/images/clear-night.png";
          break;

        case "01d":
          weather_icon.src = "assets/images/clear-day.png";
          break;

        case "02d":
          weather_icon.src = "assets/images/partly-cloudy-day.png";
          break;

        case "02n":
          weather_icon.src = "assets/images/partly-cloudy-night.png";
          break;

        case "03d":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "03n":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "04d":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "04n":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "09d":
          weather_icon.src = "assets/images/heavy-showers.png";
          break;

        case "09n":
          weather_icon.src = "assets/images/heavy-showers.png";
          break;

        case "10d":
          weather_icon.src = "assets/images/showers.png";
          break;

        case "10n":
          weather_icon.src = "assets/images/showers.png";
          break;

        case "11d":
          weather_icon.src = "assets/images/thunderstorm-showers.png";
          break;

        case "11n":
          weather_icon.src = "assets/images/thunderstorm-showers.png";
          break;

        case "13d":
          weather_icon.src = "assets/images/snow.png";
          break;

        case "13n":
          weather_icon.src = "assets/images/snow.png";
          break;

        case "50d":
          weather_icon.src = "assets/images/fog.png";
          break;

        case "50n":
          weather_icon.src = "assets/images/fog.png";
          break;

        default:
          weather_icon.src = "assets/images/clear-day.png";
          break;
      }

      searchLocation.innerText = `${data.name}, ${data.sys.country}`;
      temperature.innerText = `${Math.floor(data.main.temp)}°C`;
      description.innerText = `${data.weather[0].description}`;
      feels_like.innerText = `Feels Like ${Math.floor(data.main.feels_like)}°C`;
      temp_max.innerText = `${Math.floor(data.main.temp_max)}°C`;
      temp_min.innerText = `${Math.floor(data.main.temp_min)}°C`;
      humidity.innerText = `Humidity ${data.main.humidity}%`;
      wind_speed.innerText = `Wind ${Math.floor(data.wind.speed)}km/h`;
      pressure.innerText = `Pressure ${data.main.pressure}hpa`;
    } catch (error) {
      switch (data.cod) {
        case "404":
          Swal.fire({
            title: "Oops!",
            text: "City Not Found!",
            icon: "error",
            confirmButtonText: "Ok",
          });
          break;

        default:
          Swal.fire({
            title: "Oops!",
            text: `${error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
          break;
      }
    }
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
  async function resolved(location) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=${API_KEY}`
      );
      const data = await result.json();

      searchLocation.innerText = `${data.name}, ${data.sys.country}`;
      temperature.innerText = `${Math.floor(data.main.temp)}°C`;
      description.innerText = `${data.weather[0].description}`;
      feels_like.innerText = `Feels Like ${Math.floor(data.main.feels_like)}°C`;
      temp_max.innerText = `${Math.floor(data.main.temp_max)}°C`;
      temp_min.innerText = `${Math.floor(data.main.temp_min)}°C`;
      humidity.innerText = `Humidity ${data.main.humidity}%`;
      wind_speed.innerText = `Wind ${Math.floor(data.wind.speed)}km/h`;
      pressure.innerText = `Pressure ${data.main.pressure}hpa`;

      switch (data.weather[0].icon) {
        case "01n":
          weather_icon.src = "assets/images/clear-night.png";
          break;

        case "01d":
          weather_icon.src = "assets/images/clear-day.png";
          break;

        case "02d":
          weather_icon.src = "assets/images/partly-cloudy-day.png";
          break;

        case "02n":
          weather_icon.src = "assets/images/partly-cloudy-night.png";
          break;

        case "03d":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "03n":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "04d":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "04n":
          weather_icon.src = "assets/images/cloudy.png";
          break;

        case "09d":
          weather_icon.src = "assets/images/heavy-showers.png";
          break;

        case "09n":
          weather_icon.src = "assets/images/heavy-showers.png";
          break;

        case "10d":
          weather_icon.src = "assets/images/showers.png";
          break;

        case "10n":
          weather_icon.src = "assets/images/showers.png";
          break;

        case "11d":
          weather_icon.src = "assets/images/thunderstorm-showers.png";
          break;

        case "11n":
          weather_icon.src = "assets/images/thunderstorm-showers.png";
          break;

        case "13d":
          weather_icon.src = "assets/images/snow.png";
          break;

        case "13n":
          weather_icon.src = "assets/images/snow.png";
          break;

        case "50d":
          weather_icon.src = "assets/images/fog.png";
          break;

        case "50n":
          weather_icon.src = "assets/images/fog.png";
          break;

        default:
          weather_icon.src = "assets/images/clear-day.png";
          break;
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
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
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${API_KEY}`
    );
    const data = await result.json();

    searchLocation.innerText = `${data.name}, ${data.sys.country}`;
    temperature.innerText = `${Math.floor(data.main.temp)}°C`;
    description.innerText = `${data.weather[0].description}`;
    feels_like.innerText = `Feels Like ${Math.floor(data.main.feels_like)}°C`;
    temp_max.innerText = `${Math.floor(data.main.temp_max)}°C`;
    temp_min.innerText = `${Math.floor(data.main.temp_min)}°C`;
    humidity.innerText = `Humidity ${data.main.humidity}%`;
    wind_speed.innerText = `Wind ${Math.floor(data.wind.speed)}km/h`;
    pressure.innerText = `Pressure ${data.main.pressure}hpa`;

    switch (data.weather[0].icon) {
      case "01n":
        weather_icon.src = "assets/images/clear-night.png";
        break;

      case "01d":
        weather_icon.src = "assets/images/clear-day.png";
        break;

      case "02d":
        weather_icon.src = "assets/images/partly-cloudy-day.png";
        break;

      case "02n":
        weather_icon.src = "assets/images/partly-cloudy-night.png";
        break;

      case "03d":
        weather_icon.src = "assets/images/cloudy.png";
        break;

      case "03n":
        weather_icon.src = "assets/images/cloudy.png";
        break;

      case "04d":
        weather_icon.src = "assets/images/cloudy.png";
        break;

      case "04n":
        weather_icon.src = "assets/images/cloudy.png";
        break;

      case "09d":
        weather_icon.src = "assets/images/heavy-showers.png";
        break;

      case "09n":
        weather_icon.src = "assets/images/heavy-showers.png";
        break;

      case "10d":
        weather_icon.src = "assets/images/showers.png";
        break;

      case "10n":
        weather_icon.src = "assets/images/showers.png";
        break;

      case "11d":
        weather_icon.src = "assets/images/thunderstorm-showers.png";
        break;

      case "11n":
        weather_icon.src = "assets/images/thunderstorm-showers.png";
        break;

      case "13d":
        weather_icon.src = "assets/images/snow.png";
        break;

      case "13n":
        weather_icon.src = "assets/images/snow.png";
        break;

      case "50d":
        weather_icon.src = "assets/images/fog.png";
        break;

      case "50n":
        weather_icon.src = "assets/images/fog.png";
        break;

      default:
        weather_icon.src = "assets/images/clear-day.png";
        break;
    }
  } catch (error) {
    Swal.fire({
      title: "Oops!",
      text: "Check Your Connection!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

window.addEventListener("load", defaultSearch)
locateMe.addEventListener("click", getLocationWeather);
searchBtn.addEventListener("click", getSearchWeather);
