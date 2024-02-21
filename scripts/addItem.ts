import { ethers } from "hardhat";
import {
  CONTRACT,
  DEPLOYER,
  ITEM_NAME,
  ITEM_PRICE,
} from "../helper-hardhat-config";

const b_address = CONTRACT;
const itemName = ITEM_NAME;
const itemPrice = ITEM_PRICE;
const deployer = DEPLOYER;

export async function rateOwnerChange() {
  console.log(`degenToken at ${b_address}`);

  const _contract = await ethers.getContractAt("degenToken", b_address);

  const transferTx = await _contract.addItem(itemName, itemPrice, {
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
