// getting elements from DOM
const temp = document.getElementById("temp");
const time = document.getElementById("time");
const searchLocation = document.getElementById("location");
const day = document.getElementById("day");
const description = document.getElementById("description");
const wind = document.getElementById("wind");
const feel = document.getElementById("feel");
const humidity = document.getElementById("humidity");
const error = document.getElementById("error");
const citySearchInp = document.getElementById("searchInp");
const API_KEY = "210eeabe1cac851c368047662c4815fd";
const mainForm = document.querySelector("#mainForm");

// stoping from from refreshing page on submit
function handleForm(e) {
  e.preventDefault();
}
mainForm.addEventListener("submit", handleForm);

// fetching and rendering weather data
async function getData() {
    if(citySearchInp.value !== ""){
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInp.value}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          searchLocation.innerHTML = `${data.name}, ${data.sys.country}`;
          temp.innerText = `${data.main.temp}°`;
          description.innerText = data.weather[0].description;
        } catch (error) {
            if(error.message === "Cannot read properties of undefined (reading 'country')"){
                Swal.fire({
                    title: "Oh oh",
                    text: "City couldn't be found!",
                    icon: "error"
                  }); 
            }
        }
    }else {
        Swal.fire({
            title: "Opps",
            text: "Search feild can't be empty!",
            icon: "warning"
          });
    }
}

// default search on window load
async function defaultSearch() {
  // getting and printing current date
  const currentDate = document.querySelector(".date");
  const date = new Date();
  currentDate.innerHTML = date.toDateString();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=${API_KEY}&units=metric`
    );
    
    const data = await response.json();
    searchLocation.innerHTML = `${data.name}, ${data.sys.country}`;
    temp.innerText = `${data.main.temp}°`;
    description.innerText = data.weather[0].description;
    wind.innerText = `${data.wind.speed} km/h`;
    humidity.innerText = `${data.main.humidity}%`;
    feel.innerText = `${data.main.feels_like}°`;
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeekString = daysOfWeek[date.getDay()];
    day.innerText = dayOfWeekString;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const timeString = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
    time.innerText = timeString;
  } catch (e) {
    e == "TypeError: Failed to fetch"
      ? (error.innerText = "Check your internet connection!")
      : console.log(e);
  }

  
}

// forecast weather fetching
const forecast = document.getElementById("forecast");

async function forecastData() {
    
    try {
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=karachi&units=metric&appid=${API_KEY}`
          );
          const forecastData = await forecastRes.json();
        
          for (let i = 0; i < forecastData.list.length; i++) {
            forecast.innerHTML += `
              <div class="card d-flex flex-row mb-2" >
              <div class="card-body p-1">
                <h5 class="card-title m-0">${new Date(forecastData.list[i].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</h5>
                <p class="card-text m-0">${forecastData.list[i].main.temp_max}/${forecastData.list[i].main.temp_min}</p>
                <p class="card-text m-0">${forecastData.list[i].weather[0].description}</p>
                </div>
              <img
                src="https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}.png
                style="width: 80px"
                alt=""
              />
            </div>
            `;
          }
    } catch (error) {
      console.log(error)
        Swal.fire({
            title: "Opps",
            text: "Check your internet connection!",
            icon: "warning"
          });
    }


}

function handleKey() {
  getData();
  forecastData();
}