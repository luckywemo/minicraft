const hre = require("hardhat");

async function main() {
  const ArchiveVault = await hre.ethers.getContractFactory("ArchiveVault");
  const archiveVault = await ArchiveVault.deploy();

  await archiveVault.deployed();

  console.log("ArchiveVault deployed to:", archiveVault.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 