require("dotenv").config();
const getFlow = require("./getFlow");
const startFlow = require("./startFlow");
const stopFlow = require("./stopFlow");



(async () => {
  // const tx = await startFlow("0xdA064B1Cef52e19caFF22ae2Cc1A4e8873B8bAB0");
  // const tx = await stopFlow("0xdA064B1Cef52e19caFF22ae2Cc1A4e8873B8bAB0");

  const details = await getFlow();
  console.log(details)
})();
