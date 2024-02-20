import { ethers } from "hardhat";
import { CONTRACT, DEPLOYER, RECIEVER } from "../helper-hardhat-config";

const b_address = CONTRACT;
const deployer = DEPLOYER;
const receiver = RECIEVER;

export async function rateOwnerChange() {
  console.log(`Rate at ${b_address}`);

  const _contract = await ethers.getContractAt("aval_20", b_address);

  const transferTx = await _contract.getBalance(receiver);

  const items = await _contract.getItems();

  console.log(`The Balance: ${transferTx}`);

  for (let i = 0; i < items.length; i++) {
    console.log(`Item ${i}: ${items[i]}`);
  }
}

rateOwnerChange()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
