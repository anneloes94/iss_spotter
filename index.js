// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  return ip;
});


fetchCoordsByIP("66.207.199.230", (error, data) => {
  if (error) {
    console.log("Erroooor: " + error);
  } else {
    console.log(data)
  }
})

// ASK how to give ip dynamically to fetchCoordsByIP

