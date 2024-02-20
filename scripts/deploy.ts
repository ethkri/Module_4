import { ethers } from "hardhat";
import { DEPLOYER } from "../helper-hardhat-config";

async function main() {
  const degenToken = await ethers.deployContract("degenToken", [
    "Degen",
    "DGN",
    DEPLOYER,
  ]);

  await degenToken.waitForDeployment();

  console.log(`ERC20 deployed to ${degenToken.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
