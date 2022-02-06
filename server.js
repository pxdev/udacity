
/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
// Note: the .get('/') requests will be blocked.
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`server running on localhost: ${port}`);
}


// POST

app.post('/api/add-data', callBack);

function callBack(req,res){
    projectData = {
        date: req.body.date,
        weather: req.body.weather,
        city: req.body.city,
        temp: req.body.temp,
        feelings: req.body.feelings
    };
    console.log(projectData);
    res.send(projectData)
}

// Get
app.get('/api/all-data', function(req, res) {
    res.send(projectData)
});
