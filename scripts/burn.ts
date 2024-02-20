import { ethers } from "hardhat";
import { CONTRACT, DEPLOYER, AMOUNT_TO_BURN } from "../helper-hardhat-config";

const b_address = CONTRACT;
const amount = AMOUNT_TO_BURN;
const deployer = DEPLOYER;

export async function rateOwnerChange() {
  console.log(`Rate at ${b_address}`);

  const _contract = await ethers.getContractAt("degenToken", b_address);

  const balanceBefore = await _contract.getBalance(deployer, {
    from: deployer,
  });

  console.log("Balance: before burn " + balanceBefore);

  const transferTx = await _contract.burn(amount, {
    from: deployer,
  });

  const balanceAfter = await _contract.getBalance(deployer, {
    from: deployer,
  });

  console.log("Balance: after burn " + balanceAfter);
}

rateOwnerChange()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
