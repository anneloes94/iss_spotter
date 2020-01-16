
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

 const fetchMyIP = (callback) => {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    const ip = JSON.parse(body).ip;
    if (ip.length === 0) {
      callback(error, null);
    } else {
      callback(null, ip);
    }
  })
}

module.exports = { fetchMyIP };
