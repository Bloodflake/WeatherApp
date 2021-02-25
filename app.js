const express = require('express');

const https = require('https');

const app = express();

app.get("/", (req, res) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=9838e3a6e740cfbe0dad83b3af679370&q=delhi&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      console.log(temp);
      console.log(weatherDescription);
    });
  });
  res.send("Got weather report");
});

app.listen(3000, function() {
  console.log("Server Running");
});
