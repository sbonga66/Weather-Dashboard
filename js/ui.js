const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const currentDate = document.getElementById("currentDate");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");

const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const forecastContainer = document.getElementById("forecastContainer");

function updateWeatherUI(data){

    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    currentDate.textContent = formatDate();

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    description.textContent =
        data.weather[0].description;

    feelsLike.textContent =
        `Feels like ${Math.round(data.main.feels_like)}°C`;

    minTemp.textContent =
        `${Math.round(data.main.temp_min)}°C`;

    maxTemp.textContent =
        `${Math.round(data.main.temp_max)}°C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} km/h`;

    pressure.textContent =
        `${data.main.pressure} hPa`;

    visibility.textContent =
        `${data.visibility / 1000} km`;

    sunrise.textContent =
        formatTime(data.sys.sunrise);

    sunset.textContent =
        formatTime(data.sys.sunset);
}

function updateForecastUI(data){

    forecastContainer.innerHTML = "";

    const forecast = filterForecast(data.list);

    forecast.forEach(day=>{

        const card = document.createElement("div");

        card.className = "forecast-card";

        card.innerHTML = `

            <h3>${new Date(day.dt_txt).toLocaleDateString(undefined,{
                weekday:"short"
            })}</h3>

            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

            <h2>${Math.round(day.main.temp)}°C</h2>

            <p>${day.weather[0].main}</p>

        `;

        forecastContainer.appendChild(card);

    });

}

function showLoader(){

    loader.classList.remove("hidden");

}

function hideLoader(){

    loader.classList.add("hidden");

}

function showError(message){

    errorMessage.textContent = message;

    errorMessage.classList.remove("hidden");

    setTimeout(()=>{

        errorMessage.classList.add("hidden");

    },3000);

}