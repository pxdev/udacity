// New Date format function to return (Day Month, Year) credits for https://stackoverflow.com
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate());
let year = dateObj.getFullYear();
let newDate = day + ' ' + month + ', ' + year;

// Define our template variables to put the results on it after we got it from our endpoint
const resultCity = document.getElementById('resultCity')
const resultTemperature = document.getElementById('resultTemperature')
const resultFeeling = document.getElementById('resultFeeling')
const resultDate = document.getElementById('resultDate')
const resultWeather = document.getElementById('resultWeather')

// Api Base URL and Api Key generated from open weather map
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = '3a413027d425bd99f5273e74788f6d14';

// Event listener on the submit button that call perform action method
document.getElementById('generate').addEventListener('click', performAction);

// Async Post function that post the data to our local server and we convert the data to be string to send it to the server.
const postData = async (requestLink, data) => {
    const response = await fetch(requestLink, {
        // required meta options from making a successful request if the method is post data.
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        // convert the data to string to post it to the server
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    try {
        const data = await response.json();
        return data;

        // Catch errors if it happened.
    } catch (error) {
        console.log(error)
        // appropriately handle the error
    }
}


// Async Get function that request the data with the fetch method.
const requestData = async (requestLink) => {
    const request = await fetch(requestLink);
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log(error)
        // appropriately handle the error
    }
}


function performAction() {
     // the zip and feeling are placed here to check for the value every time we call the performAction function.
    const zipCode = document.getElementById("zipInput").value;
    const feelings = document.getElementById("feelingInput").value;
    const requestLink = `${baseURL}?zip=${zipCode},us&units=metric&APPID=${apiKey}`;

    try {
        // request the data from openweather
        requestData(requestLink)
            // Post it to our end point server with the user input
            .then(
                function (data) {

                    postData('/api/add-data', {
                            date: newDate,
                            city: data.name,
                            weather: data.weather[0].description,
                            temp: data.main.temp,
                            feelings: feelings
                        }
                    )
                        .then(
                            // Request it again and update out layout with the new values
                            // Dynamically Update UI https://review.udacity.com/#!/rubrics/4671/view
                            async () => {
                                const request = await fetch('/api/all-data');

                                try {
                                    // Transform into JSON
                                    const allData = await request.json()
                                    console.log(allData)
                                    resultDate.textContent = allData.date
                                    resultTemperature.textContent = allData.temp.toFixed(1);
                                    resultCity.textContent = allData.city;
                                    resultFeeling.textContent = allData.feelings;
                                    resultWeather.textContent = allData.weather;

                                } catch (error) {
                                    console.log(error)
                                }
                            }
                        );
                }
            );


    } catch (error) {
        console.log(error)
        // appropriately handle the error
    }


}



