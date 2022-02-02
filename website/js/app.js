
// https://openweathermap.org/current#zip
let baseURL = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey = '3a413027d425bd99f5273e74788f6d14';


let resultCity = document.getElementById('resultCity')
let resultDegree = document.getElementById('resultDegree')


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipInput =  document.getElementById('zipInput').value;

    fetchWeatherData(baseURL,zipInput, apiKey)
}


const fetchWeatherData = async (baseURL, zipInput, apiKey)=>{

    const response = await fetch(`${baseURL}?zip=${zipInput},us&units=imperial&APPID=${apiKey}`)

    try {
        const data = await response.json();

        resultCity.textContent = data.name;
        resultDegree.textContent = data.main.temp.toFixed(1);


        console.log(data)

        return data;

    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
