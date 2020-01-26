const { nextISSTimesForMyLocation } = require("./iss_promised")
const { flyoversMessage } = require("./index")

nextISSTimesForMyLocation()
  .then ((flyovers) => {
    flyoversMessage(flyovers)
  })
  .catch (Error, console.log("Oh no!"))
