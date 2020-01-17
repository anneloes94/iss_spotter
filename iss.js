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
  console.log(ip)
  const json_parsed = JSON.parse(body);
    const lat = json_parsed.data.latitude;
    const lng = json_parsed.data.longitude;
    const geo = {
      "latitude" : lat,
      "longitude" : lng
    }
    console.log("body: " + body)
    console.log("jason_parsed: " + json_parsed)
    console.log("lat: " + lat)
    console.log("lng: " + lng)

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

module.exports = { fetchMyIP, fetchCoordsByIP };

// https://geo.ipify.org/api/v1?apiKey=at_jvGYBfmz4n6ZcmASWGj0fRQ6qEFQZ

