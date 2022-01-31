const postData = async ( url = '', data = {})=>{
     // The First parameter is the URL we want to make the POST request to, and the second is an object with the request info.
    const response = await fetch(url, {
        // The post method same as the route post we already created in the server file.
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header.
        // Turns JavaScript objects and JSON data into a string for our server to receive the information.
        // The body of the request is the part how we will access the data on the server side.
        body: JSON.stringify(data),
    });

    try {
        // Convert the response to json.
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

postData('/add', {movie:'the matrix', score:5});


// Async POST
// const postData = async (url = '', data = {}) => {
//
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });
//
//     try {
//         const newData = await response.json();
//         return newData
//     } catch (error) {
//         console.log("error", error);
//     }
// }
//
// const retrieveData = async (url = '') => {
//     const request = await fetch(url);
//     try {
//         // Transform into JSON
//         const allData = await request.json()
//     } catch (error) {
//         console.log("error", error);
//         // appropriately handle the error
//     }
// }
//
//
// const fetchData = async (url = '') => {
//
//     const request = await fetch(url);
//
//     try {
//
//         const allData = await request.json()
//
//     } catch (e) {
//         console.log("error", e);
//     }
//
// }
