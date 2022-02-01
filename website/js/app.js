
// https://openweathermap.org/current#zip
let baseURL = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey = '3a413027d425bd99f5273e74788f6d14';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode =  document.getElementById('zip').value;

    fetchWeatherData(baseURL,zipCode, apiKey)
}


const fetchWeatherData = async (baseURL, zipCode, key)=>{

    const response = await fetch(`${baseURL}?zip=${zipCode},us&units=standard&APPID=${apiKey}`)

    try {
        const data = await response.json();
        console.log(data.name)

        return data;

    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}