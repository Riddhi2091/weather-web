const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGhydXZpZGVzYWkwNCIsImEiOiJjbDAzZTJrdXowMnlnM2pvZ2I0MWt5em96In0.KHkn8Yaz9U6FhMlYHWC6aQ&limit=1";

  request({ url: geocodeUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connection request", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
