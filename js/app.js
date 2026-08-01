const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

const locationBtn =
document.getElementById("locationBtn");

async function searchWeather(city){

    const weather =
        await getWeather(city);

    if(!weather) return;

    updateWeatherUI(weather);

    const forecast =
        await getForecast(city);

    if(forecast){

        updateForecastUI(forecast);

    }

    saveSearch(city);

}

searchBtn.addEventListener("click",()=>{

    const city = cityInput.value.trim();

    if(city==="") return;

    searchWeather(city);

});

cityInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

locationBtn.addEventListener("click",()=>{

    getCurrentLocationWeather();

});

window.addEventListener("load",()=>{

    displayHistory();

    searchWeather("Durban");

});