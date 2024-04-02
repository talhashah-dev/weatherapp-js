// getting elements from DOM
const temp = document.getElementById("temp");
const time = document.getElementById("time");
const searchLocation = document.getElementById("location");
const day = document.getElementById("day");
const description = document.getElementById("description");

// stoping from from refreshing page on submit
const mainForm = document.querySelector("#mainForm");
function handleForm(e) {
  e.preventDefault();
}
mainForm.addEventListener("submit", handleForm);

// getting and printing current date
const currentDate = document.querySelector(".date");
const date = new Date();
function showDate() {
  currentDate.innerHTML = date.toDateString();
}

// fetching and rendering weather data
const citySearchInp = document.getElementById("searchInp");
const API_KEY = "210eeabe1cac851c368047662c4815fd";

async function getData() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInp.value}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    temp.innerText = data.main.temp;
    description.innerText = data.weather[0].description;
  } catch (error) {
    console.log(error);
  }
}

function handleKey() {
  getData();
}

// defaulf search on window load
async function defaultSearch() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  searchLocation.innerHTML = `${data.name}, ${data.sys.country}`;
  temp.innerText = `${data.main.temp}°`;
  description.innerText = data.weather[0].description;
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
  const formattedHours = hours % 12 || 12; // Convert 0 to 12-hour format
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if minutes are less than 10
  const timeString = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  time.innerText = timeString;
}
