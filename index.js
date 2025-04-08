let container = document.querySelector(".weather-container");
let search_form = document.querySelector(".search-form");
let input = document.querySelector(".search-input");
let cityname = document.querySelector(".city-name");
let date_id = document.querySelector(".date-time");
let icon = document.querySelector(".weather-icon");
let min_temp = document.querySelector(".min-temp");
let max_temp = document.querySelector(".max-temp");
let feel = document.querySelector(".feels-like");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind-speed");
let pressure = document.querySelector(".pressure");
let city = "Tirupati";

search_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    city=input.value
    input.value=""
    Api_data()
})

let countryname = (code) => {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

let datee = (dt) => {
    const currentDate = new Date(dt * 1000);
    const options = {
        weekday: "long",
        month: "numeric",
        year: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(currentDate);
};

const Api_data = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a931d652e4cada8642ec8a0ff5b09dd4&units=metric`; // Add units=metric for °C
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const { name, main, sys, dt, weather, wind: windData } = data;

        date_id.innerHTML = datee(dt);
        cityname.innerHTML = `${name} , ${countryname(sys.country)}`;
        min_temp.innerHTML = `Min Temp: ${main.temp_min} &#176 `;
        max_temp.innerHTML = `Max Temp: ${main.temp_max} &#176`;
        wind.innerHTML = `${windData.speed} m/s`;
        pressure.innerHTML = `${main.pressure} hPa`;
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">`;
        feel.innerHTML = `${main.feels_like} &#176`;
        humidity.innerHTML = `${main.humidity}%`;

    } catch (error) {
        console.log(error);
        document.createElement("div").innerText = error
        
    }
};

document.body.onload=Api_data
