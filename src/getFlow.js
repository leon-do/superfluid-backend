const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");
const { ethers } = require("ethers");

async function getFlow() {
  // providers to connect to superflid
  const web3 = new Web3(process.env.RPC);

  // wallet to start flow
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider(process.env.RPC)
  );

  // initialize superflid SDK
  const sf = new SuperfluidSDK.Framework({
    web3,
  });
  await sf.initialize();

  const owner = sf.user({
    address: wallet.address,
    token: process.env.FLOW_TOKEN_ADDRESS,
  });

  const details = await owner.details();
  return(JSON.stringify(details, null, 2));
}

module.exports = getFlow;
