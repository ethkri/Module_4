const hre = require("hardhat");
const ethers = require("ethers");
import {
  AMOUNT_TO_MINT,
  CONTRACT,
  DEPLOYER,
  RECIEVER,
} from "../helper-hardhat-config";

const CONTRACT_ADDRESS = CONTRACT;
const recieverAddress = RECIEVER;
const amount = AMOUNT_TO_MINT;
const deployer = DEPLOYER;

export async function mint() {
  const _contract = await hre.ethers.getContractAt("aval_20", CONTRACT_ADDRESS);

  const owner = await _contract.owner();

  console.log("Owner: " + owner);

  const mintTX = await _contract.mint(recieverAddress, amount, {
    from: deployer,
  });

  console.log(`The Transaction Hash ${mintTX.hash}`);
}

mint()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
