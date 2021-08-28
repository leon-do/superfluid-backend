require("dotenv").config();
const getFlow = require("./src/getFlow");
const startFlow = require("./src/startFlow");
const stopFlow = require("./src/stopFlow");



(async () => {
  // await startFlow("0xdA064B1Cef52e19caFF22ae2Cc1A4e8873B8bAB0");
  // await stopFlow("0xdA064B1Cef52e19caFF22ae2Cc1A4e8873B8bAB0");

  const details = await getFlow();
  console.log(details)
})();
