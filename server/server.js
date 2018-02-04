const express = require('express');
const bodyParser = require('body-parser');
var path = require("path");
 
let port = process.env.PORT || 3000;
let app = express();

let reservations = [];
let waitList = [];

app.use(bodyParser.json());

app.post('/api/reservation', function (req, res) {
    

    if (reservations.length < 5) {
        reservations.push(req.body);
        res.end('true');
    } else {
        waitList.push(req.body);
        res.end('false');
    }
});

app.get('/api/reservation', function(req, res) {
    res.json(reservations);
});

app.get('/api/waitList', function(req, res) {
    res.json(waitList);
});

app.get('/api/reservation/clear', function (req, res) {
    reservations = [];
    waitList = [];
    res.end();
});

app.listen(port, () => {
    console.log('App is listening port ' + port);
});

// Routes to pages

app.get("/", (req, res)=> {
    
    res.sendFile(path.join(__dirname, "../HTML/home.html"))
});

app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "../HTML/reserve.html"))
});

app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "../HTML/tables.html"))
});