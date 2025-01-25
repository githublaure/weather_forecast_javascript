//showing date and hours
let now = new Date();
function formatDate(date) {
  console.log(date);
  let hours = date.getHours();
  if (hours < 10) {
    // hours = '0${hours}';
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    //  minutes = '0${minutes}';
  }
  let year = now.getFullYear();
  let currentDate = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[now.getMonth()];
  return `${currentDay} <br /> ${currentMonth} ${currentDate}, ${year}, ${hours}:${minutes}`;
}

//gives the date
let dateElement = document.querySelector("#currentDay");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//button search engine
let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", handleSubmit);

//Search function "changeit" to change our html called later by axios
function changeit(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  console.log(response.data);
  console.log(response.data);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let iconElement = document.querySelector("#icon");
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsius = response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.name);
}

//API integration
function getCity(city) {
  let apiKey = "c2e224fec8a7d03bd4666d66822ddff4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeit);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  getCity(city);
}

// cities headsearch
function showParisWeather(event) {
  event.preventDefault();
  let city = "Paris";
  getCity(city);
}
let parislink = document.querySelector("#paris");
parislink.addEventListener("click", showParisWeather);

function showromaWeather(event) {
  event.preventDefault();
  let city = "rome";
  getCity(city);
}
let romalink = document.querySelector("#roma");
romalink.addEventListener("click", showromaWeather);

function showbangkokWeather(event) {
  event.preventDefault();
  let city = "Bangkok";
  getCity(city);
}
let bangkoklink = document.querySelector("#bangkok");
bangkoklink.addEventListener("click", showbangkokWeather);

function showMadridWeather(event) {
  event.preventDefault();
  let city = "Madrid";
  getCity(city);
}
let madridlink = document.querySelector("#madrid");
madridlink.addEventListener("click", showMadridWeather);

function showAmsterdamWeather(event) {
  event.preventDefault();
  let city = "Amsterdam";
  getCity(city);
}
let amsterdamlink = document.querySelector("#amsterdam");
amsterdamlink.addEventListener("click", showAmsterdamWeather);

//axios call the function that fetch the current location city and then launch innerHTML modifications with `changeit`
function searchLocation(position) {
  let apiKey = "c2e224fec8a7d03bd4666d66822ddff4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeit);
}

//call the function for geolocalisation
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#geoloc");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Celsius to Fahrenheit. Fahrenheit to Celsius

//on click Fahreniheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = (celsius * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");

  //on click remove active class for celsius add for F
  celsiuslink.classList.remove("activeconversion");
  celsiuslink.classList.add("testfcolor");
  fahrenheitlink.classList.remove("testfcolor");
  fahrenheitlink.classList.add("activeconversion");

  temperatureElement.innerHTML = `${Math.round(fahrenheit)}`;
}

//on clickk Celsius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  //remove active class for Fahrenheit add for C
  celsiuslink.classList.add("activeconversion");
  celsiuslink.classList.remove("testfcolor");
  fahrenheitlink.classList.remove("activeconversion");
  fahrenheitlink.classList.add("testfcolor");

  temperatureElement.innerHTML = `${Math.round(celsius)}`;
}

let celsius = null;
getCity("Paris");

let celsiuslink = document.querySelector("#celsiuslink");
celsiuslink.addEventListener("click", convertToCelsius);

let fahrenheitlink = document.querySelector("#fahrenheitlink");
fahrenheitlink.addEventListener("click", convertToFahrenheit);

//loop forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="${forecastDay.condition.icon_url}"
          alt="${forecastDay.condition.description}"
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "oafbe8035b88726c0e80be71t4409330";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//fin forecast
//fin forecast
