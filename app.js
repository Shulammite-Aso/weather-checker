const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname +'/index.html')
})

app.post('/', function(req, res) {
    var place = req.body.place;

    http.get(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=243d420b9914f83c022b02c82083d1f2`, (response) => {
       // console.log(response.statusCode);

       response.on('data', function(data) {
           const weatherData = JSON.parse(data);
           const temp = weatherData.main.temp;
           const description = weatherData.weather[0].description;
           const weatherIcon =  weatherData.weather[0].icon;
           const weatherIconUrl =   `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
           console.log(temp);
           res.write("<h1>The temperature is " + temp + " in " + place + ".</h1>");
           res.write("<p>" + description + "</p>");
           res.write("<img src=" + weatherIconUrl + ">");
           res.send();
       })
    }
    )

}
)
app.listen('3000', function() {
    console.log('listening on port 3000');
})