const apiKey = "0523f3d681e8ff5b4d2a9709f7002a67";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    const forecastResponse = await fetch(forecastApiUrl + city +`&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();
        var forecastData = await forecastResponse.json();

document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML =  Math.round(data.main.temp) + "°c";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

document.querySelector(".card").classList.remove("sunny", "cloudy", "rainy", "misty");

if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "images/clouds.png";
    document.querySelector(".card").classList.add("cloudy");
}
else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "images/sun.png";
    document.querySelector(".card").classList.add("sunny");
}
else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png";
    document.querySelector(".card").classList.add("rainy");
}
else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "images/drizzle.png";
    document.querySelector(".card").classList.add("rainy");
}
else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "images/mist.png";
    document.querySelector(".card").classList.add("misty");
}

const forecastDays = document.querySelectorAll('.forecast-day');
        for(let i = 0; i < 3; i++) {
            const forecast = forecastData.list[i * 8]; 
            const temp = Math.round(forecast.main.temp);
            const weather = forecast.weather[0].main;
            
            let iconSrc = "images/sun.png";
            if(weather == "Clouds") iconSrc = "images/clouds.png";
            else if(weather == "Rain" || weather == "Drizzle") iconSrc = "images/rain.png";
            else if(weather == "Mist") iconSrc = "images/mist.png";
            
            forecastDays[i].querySelector('.forecast-icon').src = iconSrc;
            forecastDays[i].querySelector('.forecast-temp').innerHTML = temp + "°c";
        }

document.querySelector(".weather").style.display = "block";
    }
}


searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
        checkWeather(searchBox.value);
    }
})