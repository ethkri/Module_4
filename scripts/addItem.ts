import { ethers } from "hardhat";
import { CONTRACT, DEPLOYER } from "../helper-hardhat-config";

const b_address = CONTRACT;
const itemName = "Shoes";
const itemPrice = 30;
const deployer = DEPLOYER;

export async function rateOwnerChange() {
  console.log(`degenToken at ${b_address}`);

  const _contract = await ethers.getContractAt("degenToken", b_address);

  const transferTx = await _contract.addItems(itemName, itemPrice, {
    from: deployer,
  });

  console.log(`Your transaction hash is: ${transferTx.hash}`);
}

rateOwnerChange()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
