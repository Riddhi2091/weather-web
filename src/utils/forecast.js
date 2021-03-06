const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9331f4862b2faeab4393560781eb8673&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      console.log(body.error);
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "Today, "+body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out."
      );
    }
  });
};

module.exports = forecast;
