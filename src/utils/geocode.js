const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=1&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiYW1lZW43MDgiLCJhIjoiY2wyenJpc3p6MHQ4ajNic2JidjZ3ejJ3ciJ9.cUsNEIKyOfu-Wd-8wglMkg";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location Service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Please try another Location!");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude:body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
