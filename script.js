const apiKey = process.env.REACT_APP_WEATHER_API_KEY; //  OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const weatherContainer = document.getElementById("weather-container");

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherContainer.innerHTML = `<p class='error'>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherContainer.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather Icon">
    `;
}


searchButton.addEventListener("click", async () => {
    const city = searchBox.value;
    if (city.trim() === "") {
        alert("Please enter a city name!");
        return;
    }
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();
        document.getElementById("city-name").textContent = data.name;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("weather-info").style.display = "block";
    } catch (error) {
        alert(error.message);
    }
});

