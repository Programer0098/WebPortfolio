const apiKey = "74da09497eb6fcd6727bb97bb9461a95";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
        alert("City not found");
        return;
    }
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
}

// Ensure the DOM is loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    searchBtn.addEventListener("click", () => {
        const city = searchBox.value;
        if (city !== "") {
            checkWeather(city);
        } else {
            alert("Please enter a city name");
        }
    });
});

// Optionally, call checkWeather with a default city on page load
// checkWeather("New York");
