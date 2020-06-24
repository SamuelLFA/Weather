const baseUrl = "http://localhost:8080";

window.onload = (e) => {
    const form = document.querySelector(".inputSearch");
    form.addEventListener("submit", search, true);

    const socket = io.connect(baseUrl);
    socket.on("updateHistory", function () {
        loadHistory();
    });
};

async function search(event) {
    event.preventDefault();
    const city = document.querySelector(".inputSearch input").value;

    await submitSearch(city);
}

async function submitSearch(city) {
    if (city) {
        const weatherInfos = await (
            await fetch(`${baseUrl}/currentWeather?city=${city}`)
        ).json();
        setInfos(weatherInfos);
    }
}

function setInfos(weatherInfos) {
    document.querySelector(".city").innerHTML = weatherInfos.city;
    document.querySelector(".country").innerHTML = weatherInfos.country;
    document.querySelector(
        ".temp .current"
    ).innerHTML = `${weatherInfos.temp.current} ºC`;
    document.querySelector(
        ".weather .humidity"
    ).innerHTML = `${weatherInfos.humidity}%`;
    document.querySelector(".weather .desc").innerHTML = weatherInfos.weather;
}

async function loadHistory() {
    let cityLists = await (
        await fetch(`${baseUrl}/history?limit=5&isTop=true`)
    ).json();

    const topSearchs = document.querySelector(".topSearchs");
    loadList(cityLists, topSearchs, "Top Searches");

    cityLists = await (
        await fetch(`${baseUrl}/history?limit=5`)
    ).json();

    const list = document.querySelector(".recentSearchs");
    loadList(cityLists, list, "Recent Searches");
}

function loadList(cityLists, list, title) {
    const h3 = document.createElement("h3");
    h3.innerHTML = title;
    list.innerHTML = "";
    list.appendChild(h3);
    const ul = document.createElement("ul");

    cityLists.forEach((city) => {
        const item = document.createElement("li");
        item.onclick = () => submitSearch(city.city);
        item.innerHTML = city.city;
        ul.appendChild(item);
    });

    list.appendChild(ul);
}

function getDate() {
    const date = new Date();
    document.querySelector(".date_info .date").innerHTML = `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}`;

    document.querySelector(".date_info .clock").innerHTML = `${
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
}

getDate();
loadHistory();
