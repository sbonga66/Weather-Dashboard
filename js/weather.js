const API_KEY = "f17116dbd88ed03271404b1283ee1502";

const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

async function getWeather(city) {

    try {

        showLoader();

        const response = await fetch(
            `${CURRENT_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        hideLoader();

        return data;

    } catch (error) {

        hideLoader();
        showError(error.message);

        return null;

    }

}

async function getForecast(city) {

    try {

        const response = await fetch(
            `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Forecast unavailable");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        return null;

    }

}

async function getCurrentLocationWeather() {

    if (!navigator.geolocation) {

        showError("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(async(position)=>{

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try{

            showLoader();

            const response = await fetch(
                `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );

            const data = await response.json();

            hideLoader();

            updateWeatherUI(data);

            const forecast = await getForecastByCoords(lat,lon);

            updateForecastUI(forecast);

        }

        catch(error){

            hideLoader();

            showError("Unable to fetch your location weather.");

        }

    });

}

async function getForecastByCoords(lat,lon){

    try{

        const response = await fetch(
            `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        return await response.json();

    }

    catch(error){

        console.log(error);

        return null;

    }

}

function formatTime(timestamp){

    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit"

    });

}

function formatDate(){

    const today = new Date();

    return today.toLocaleDateString(undefined,{

        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"

    });

}

function filterForecast(list){

    const dailyForecast = [];

    const usedDates = [];

    list.forEach(item=>{

        const date = item.dt_txt.split(" ")[0];

        if(!usedDates.includes(date) && item.dt_txt.includes("12:00:00")){

            usedDates.push(date);

            dailyForecast.push(item);

        }

    });

    return dailyForecast;

}