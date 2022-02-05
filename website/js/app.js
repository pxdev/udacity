
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate());
let year = dateObj.getFullYear();
let newDate = day + ' '+ month  + ', ' + year;

let resultCity = document.getElementById('resultCity')
let resultTemperature = document.getElementById('resultTemperature')
let resultFeeling = document.getElementById('resultFeeling')
let resultDate = document.getElementById('resultDate')
let resultWeather = document.getElementById('resultWeather')


let baseURL = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey = '3a413027d425bd99f5273e74788f6d14';



document.getElementById('generate').addEventListener('click', performAction);


postData = async (url = '', data = {})=> {

     const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    try {
        const data= await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

 function performAction(){
    const zipCode = document.getElementById("zipInput").value;
    const feelings = document.getElementById("feelingInput").value;
    const url = `${baseURL}?zip=${zipCode},us&units=metric&APPID=${apiKey}`;

     try {
        fetchData(url)
            .then(
                function(data = {}) {
                postData('/api/add-data', {
                    date: newDate,
                    city: data.name,
                    weather: data.weather[0].description,
                    temp: data.main.temp,
                    feelings: feelings
                }
                    )
                    .then(
                        updateUi()
                    );
                }

            );


    } catch (error) {
        console.log(error)
    }
}


fetchData = async (url)=> {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}


updateUi = async ()=> {
    const req = await fetch('/api/all-data');

    try {
        const projectData = await req.json();
        console.log(projectData)
        resultDate.textContent = projectData.date
        resultTemperature.textContent = projectData.temp.toFixed(1);
        resultCity.textContent = projectData.city;
        resultFeeling.textContent = projectData.feelings;
        resultWeather.textContent = projectData.weather;

    } catch (error) {
        console.log(error)
    }
}
