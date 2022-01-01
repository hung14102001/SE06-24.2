// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  // await deployMarketContract();
  // await deployNFTContract();
  await deployTokenContract();
}

async function deployTokenContract() {
  const AztecToken = await hre.ethers.getContractFactory("AztecToken");
  const token = await AztecToken.deploy("AztecToken", "AT");
  
  await token.deployed();
  
  console.log("AztecToken deployed to:", token.address);
}

async function deployMarketContract() {
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  
  await marketplace.deployed();
  
  console.log("MarketPlace deployed to:", marketplace.address);
  
}
async function deployNFTContract() {
  const NFT = await hre.ethers.getContractFactory("BattleShipNFT");
  const nft = await NFT.deploy();
  
  await nft.deployed();
  
  console.log("NFT deployed to:", nft.address);

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
