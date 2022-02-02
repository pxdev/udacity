/*
    Global Variables
*/

let baseURL = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey = '3a413027d425bd99f5273e74788f6d14';


let resultCity = document.getElementById('resultCity')
let resultTemperature = document.getElementById('resultTemperature')
let resultFeeling = document.getElementById('resultFeeling')
let resultWeather = document.getElementById('resultWeather')


let zipInput = document.getElementById('zipInput').value;


document.getElementById('generate').addEventListener('click', performAction);


function performAction(e) {
    fetchWeatherData(baseURL, zipInput, apiKey)
}

/* fetch the data from weather api with zip code
    https://openweathermap.org/current#zip
*/
const fetchWeatherData = async (baseURL, zipInput, apiKey) => {

    const response = await fetch(`${baseURL}?zip=${zipInput},us&units=imperial&APPID=${apiKey}`)
    const feelingInput = document.getElementById('feelingInput').value;

    try {
        const data = await response.json();

        let feeling = feelingInput

        resultCity.textContent = data.name;
        resultTemperature.textContent = data.main.temp.toFixed(1);
        resultFeeling.textContent = feeling;
        resultWeather.textContent = data.weather[0].main;


        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}



