const apiKey = "af00dffbed00b4e95b9be6c65f25beb2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const error = document.querySelector(".error");
const weatherInfo = document.querySelector(".weather-info");
const weatherIcon = document.querySelector(".weather img");

async function checkWeather(city) {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    error.style.display = "block";
    weatherInfo.style.display = "none";
  }

  let data = await response.json();

  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".descr").innerHTML = data.weather[0].description;
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".h").innerHTML = data.main.humidity + "%";
  document.querySelector(".w").innerHTML = data.wind.speed + " km/h";

  switch (data.weather[0].main) {
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "images/snow.png";
      break;
  }

  input.value = "";

  weatherInfo.style.display = "block";
  error.style.display = "none";
}

btn.addEventListener("click", () => {
  checkWeather(input.value);
});
