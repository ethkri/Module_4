import { ethers } from "hardhat";
import { CONTRACT, DEPLOYER } from "../helper-hardhat-config";

const b_address = CONTRACT;
const deployer = DEPLOYER;

export async function rateOwnerChange() {
  console.log(`Degen Token at ${b_address}`);

  const _contract = await ethers.getContractAt("degenToken", b_address);

  const transferTx = await _contract.getBalance(deployer);

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
