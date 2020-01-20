const request = require("request");

const fetchMyIP = (callback) => {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    const ip = JSON.parse(body).ip;
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, ip);
      return ip
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
  
  const json_parsed = JSON.parse(body);
    const lat = json_parsed.data.latitude;
    const lng = json_parsed.data.longitude;
    const geo = {
      "latitude" : lat,
      "longitude" : lng
    }
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null)
      return;
    } else {
      callback(null, geo )
    }
  });

}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null)
      return;
    } else {
      const response_parsed = JSON.parse(body).response;
      let flyOvers = []
      let counter = 0
      for (element of response_parsed) {
        const elementObject = {}
        elementObject["risetime"] = element.risetime;
        elementObject["duration"] = element["duration"];
        flyOvers.push(elementObject);
        counter++;
      }
      callback(null, flyOvers);
    }
})
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };