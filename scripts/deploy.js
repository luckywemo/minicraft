const hre = require("hardhat");

async function main() {
  console.log("Deploying FilStore contract...");

  // Get the contract factory
  const FilStore = await hre.ethers.getContractFactory("FilStore");

  // Deploy the contract with the deployer as the initial owner
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  const filStore = await FilStore.deploy(deployer.address);

  await filStore.waitForDeployment();

  const contractAddress = await filStore.getAddress();
  console.log("FilStore deployed to:", contractAddress);

  // Verify contract on BaseScan (if not on localhost)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await filStore.deploymentTransaction().wait(6);
    
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [deployer.address],
      });
      console.log("Contract verified on BaseScan!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }

  // Create some sample products
  console.log("Creating sample products...");
  
  const sampleProducts = [
    {
      name: "Filecoin T-Shirt",
      description: "Premium cotton t-shirt with Filecoin logo",
      price: hre.ethers.parseEther("0.01"), // 0.01 ETH
      imageURI: "https://example.com/tshirt.jpg",
      metadataURI: "https://example.com/tshirt-metadata.json",
      isNFT: false
    },
    {
      name: "Filecoin Hoodie",
      description: "Comfortable hoodie for tech enthusiasts",
      price: hre.ethers.parseEther("0.02"), // 0.02 ETH
      imageURI: "https://example.com/hoodie.jpg",
      metadataURI: "https://example.com/hoodie-metadata.json",
      isNFT: false
    },
    {
      name: "Filecoin Collectible NFT",
      description: "Limited edition Filecoin collectible NFT",
      price: hre.ethers.parseEther("0.05"), // 0.05 ETH
      imageURI: "https://example.com/nft.jpg",
      metadataURI: "https://example.com/nft-metadata.json",
      isNFT: true
    }
  ];

  for (const product of sampleProducts) {
    try {
      const tx = await filStore.createProduct(
        product.name,
        product.description,
        product.price,
        product.imageURI,
        product.metadataURI,
        product.isNFT
      );
      await tx.wait();
      console.log(`Created product: ${product.name}`);
    } catch (error) {
      console.error(`Failed to create product ${product.name}:`, error.message);
    }
  }

  console.log("\nDeployment completed!");
  console.log("Contract address:", contractAddress);
  console.log("Deployer address:", deployer.address);
  
  // Save contract address to .env file
  const fs = require('fs');
  const envContent = `NEXT_PUBLIC_FILSTORE_ADDRESS=${contractAddress}\n`;
  
  try {
    fs.appendFileSync('.env.local', envContent);
    console.log("Contract address saved to .env.local");
  } catch (error) {
    console.log("Could not save to .env.local:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });