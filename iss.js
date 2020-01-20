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
      return ip;
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
  
    const jsonParsed = JSON.parse(body);
    const lat = jsonParsed.data.latitude;
    const lng = jsonParsed.data.longitude;
    const geo = {
      "latitude" : lat,
      "longitude" : lng
    };
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, geo);
    }
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const responseParsed = JSON.parse(body).response;
      let flyOvers = [];
      let counter = 0;
      for (let element of responseParsed) {
        const elementObject = {};
        elementObject["risetime"] = element.risetime;
        elementObject["duration"] = element["duration"];
        flyOvers.push(elementObject);
        counter++;
      }
      callback(null, flyOvers);
    }
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };