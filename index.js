// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


const flyoversMessage = (flyovers) => {
  for (let flyover of flyovers) {
    let date = new Date();
    date.setUTCSeconds(flyover.risetime);
    console.log(`Next pass at ${date} for ${flyover.duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  } else {
    flyoversMessage(passTimes)
  }
});

