function search(e) {
  console.log(e.value)
  // fetch`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=c9644e36e339884153aeb7e1e1d60248&units=metric`
  //   .then(() => result.json())
  //   .then(() => (data = result));
  // console.log(data);
}

mainForm.addEventListener("submit", handleForm);

// fetching and rendering weather data
async function getData() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInp.value}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    searchLocation.innerHTML = `${data.name}, ${data.sys.country}`;
    temp.innerText = `${data.main.temp}°`;
    description.innerText = data.weather[0].description;
  } catch (error) {
    console.log(error);
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
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=karachi&units=metric&appid=${API_KEY}`
  );
  const forecastData = await forecastRes.json();
  console.log(forecastData.list.length);

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
}

function handleKey() {
  getData();
  forecastData();
}

