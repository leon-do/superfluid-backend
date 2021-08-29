require("dotenv").config();
const fs = require("fs");
const startFlow = require("./src/startFlow");
const stopFlow = require("./src/stopFlow");
const getNftOwners = require("./src/getNftOwners");

setInterval(async () => {
  // get hodlers from database
  const hodlers = JSON.parse(
    fs.readFileSync("./database/hodlers.json", {
      encoding: "utf8",
    })
  );

  // get nft owners from blockchain
  const nftOwners = getNftOwners();

  // loop through hodlers to find expired flows
  for (hodler in hodlers) {
    const { expiration } = hodlers[hodler];
    // if flow is expired
    if (Date.now() > expiration) {
      await stopFlow(hodler);
      // set expiration date to Number.MAX_SAFE_INTEGER
      hodlers[hodler].expiration = Number.MAX_SAFE_INTEGER;
      // write to database
      fs.writeFileSync("./database/hodlers.json", JSON.stringify(hodlers));
    }
  }

  // loop through nftOwners to start flow
  for (nftOwner of nftOwners) {
    // if owner is not in the list
    if (!hodlers[nftOwner]) {
      await startFlow(nftOwner);
      // add as hodlr with expiration date 7 days from now
      hodlers[nftOwner] = Date.now() + 1000 * 60 * 60 * 24 * 7;
      // write to database
      fs.writeFileSync("./database/hodlers.json", JSON.stringify(hodlers));
    }
  }

  fs.writeFileSync("./database/interval.txt", new Date().toString());


}, 1000 * 60);
