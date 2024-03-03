// WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3f79bd0fcfe4861352c2df219d6536d9";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    // console.log(response.json());

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity},
           sys: {country}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("img");

    cityDisplay.textContent = city + `, ${country}`;
    tempDisplay.textContent = `${temp.toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.src = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "https://openweathermap.org/img/wn/11d@2x.png";
        case (weatherId >= 300 && weatherId < 400):
            return "https://openweathermap.org/img/wn/09d@2x.png";
        case (weatherId >= 500 && weatherId < 600):

            if (weatherId >= 500 && weatherId <= 504) {
                return "https://openweathermap.org/img/wn/10d@2x.png"
            }

            else if (weatherId == 511) {
                return "https://openweathermap.org/img/wn/13d@2x.png"
            }

            else {
                return "https://openweathermap.org/img/wn/09d@2x.png";
            }
            
        case (weatherId >= 600 && weatherId < 700):
            return "https://openweathermap.org/img/wn/13d@2x.png";
        case (weatherId >= 700 && weatherId < 800):
            return "https://openweathermap.org/img/wn/50d@2x.png";
        case (weatherId === 800):
            return "https://openweathermap.org/img/wn/01d@2x.png";
        case (weatherId >= 801 && weatherId < 810):

            if (weatherId == 801) {
                return "https://openweathermap.org/img/wn/02d@2x.png";
            }

            else if (weatherId == 802) {
                return "https://openweathermap.org/img/wn/03d@2x.png";
            }

            else {
                return "https://openweathermap.org/img/wn/04d@2x.png";
            }
            
        default:
            return "❓";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}