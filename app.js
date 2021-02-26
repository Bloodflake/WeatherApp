const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{
  const query = req.body.cityName
  // Login to openweathermap and get your apiKey, then uncomment bellow line
  // const apiKey = "9838e3a6e740cfbe0dad83b3af679370";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" +unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
      res.write("<h1>Weather is " + weatherDescription + "</h1>");
      res.write("<h1> The temprature in "+query+ " is " + temp + " degree Celcius </h1>");
      res.write("<img src="+imageurl+">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server Running");
});
