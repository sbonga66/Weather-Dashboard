const STORAGE_KEY = "weatherHistory";

function saveSearch(city){

    let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if(history.includes(city)) return;

    history.unshift(city);

    history = history.slice(0,5);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );

    displayHistory();

}

function displayHistory(){

    const historyList = document.getElementById("historyList");

    historyList.innerHTML = "";

    const history =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    history.forEach(city=>{

        const li = document.createElement("li");

        li.textContent = city;

        li.onclick = ()=>{

            searchWeather(city);

        };

        historyList.appendChild(li);

    });

}