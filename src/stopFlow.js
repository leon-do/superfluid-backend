const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Superfluid_ABI = require("@superfluid-finance/js-sdk/src/abi");
const Web3 = require("web3");
const { ethers } = require("ethers");

async function stopFlow(_toAddress) {
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

  // connect to contract
  const contract = new ethers.Contract(
    process.env.HOST_ADDRESS,
    Superfluid_ABI.ISuperfluid,
    wallet
  );

  // create call data to flow funds
  const callData = sf.agreements.cfa.contract.methods
    .deleteFlow(
      process.env.FLOW_TOKEN_ADDRESS, // xDai
      wallet.address,
      _toAddress,
      "0x"
    )
    .encodeABI();

  console.log(callData);

  // send tx
  const receipt = await contract["callAgreement"](
    process.env.CFA_ADDRESS,
    callData,
    "0x"
  );
  console.log({flow: "stop", receipt});

  return receipt.hash;
}

module.exports = stopFlow;
