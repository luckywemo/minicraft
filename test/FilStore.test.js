const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FilStore", function () {
  let filStore;
  let owner;
  let buyer;
  let addr1;

  beforeEach(async function () {
    [owner, buyer, addr1] = await ethers.getSigners();
    
    const FilStore = await ethers.getContractFactory("FilStore");
    filStore = await FilStore.deploy(owner.address);
    await filStore.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await filStore.owner()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await filStore.name()).to.equal("FilStore");
      expect(await filStore.symbol()).to.equal("FILSTORE");
    });
  });

  describe("Product Creation", function () {
    it("Should allow owner to create a product", async function () {
      const tx = await filStore.createProduct(
        "Test Product",
        "A test product description",
        ethers.parseEther("0.1"),
        "https://example.com/image.jpg",
        "https://example.com/metadata.json",
        false
      );

      await expect(tx)
        .to.emit(filStore, "ProductCreated")
        .withArgs(1, "Test Product", ethers.parseEther("0.1"));

      const product = await filStore.getProduct(1);
      expect(product.name).to.equal("Test Product");
      expect(product.description).to.equal("A test product description");
      expect(product.price).to.equal(ethers.parseEther("0.1"));
      expect(product.isNFT).to.equal(false);
      expect(product.owner).to.equal(await filStore.getAddress());
    });

    it("Should not allow non-owner to create a product", async function () {
      await expect(
        filStore.connect(buyer).createProduct(
          "Test Product",
          "A test product description",
          ethers.parseEther("0.1"),
          "https://example.com/image.jpg",
          "https://example.com/metadata.json",
          false
        )
      ).to.be.revertedWithCustomError(filStore, "OwnableUnauthorizedAccount");
    });
  });

  describe("Product Purchase", function () {
    beforeEach(async function () {
      await filStore.createProduct(
        "Test Product",
        "A test product description",
        ethers.parseEther("0.1"),
        "https://example.com/image.jpg",
        "https://example.com/metadata.json",
        false
      );
    });

    it("Should allow purchase with correct payment", async function () {
      const tx = await filStore.connect(buyer).purchaseProduct(1, {
        value: ethers.parseEther("0.1")
      });

      await expect(tx)
        .to.emit(filStore, "ProductPurchased")
        .withArgs(1, buyer.address);

      const product = await filStore.getProduct(1);
      expect(product.owner).to.equal(buyer.address);

      const userProducts = await filStore.getUserProducts(buyer.address);
      expect(userProducts).to.include(1n);
    });

    it("Should not allow purchase with insufficient payment", async function () {
      await expect(
        filStore.connect(buyer).purchaseProduct(1, {
          value: ethers.parseEther("0.05")
        })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should not allow purchase of unavailable product", async function () {
      // First purchase the product
      await filStore.connect(buyer).purchaseProduct(1, {
        value: ethers.parseEther("0.1")
      });

      // Try to purchase again
      await expect(
        filStore.connect(addr1).purchaseProduct(1, {
          value: ethers.parseEther("0.1")
        })
      ).to.be.revertedWith("Product not available");
    });
  });

  describe("NFT Products", function () {
    it("Should mint NFT when creating NFT product", async function () {
      await filStore.createProduct(
        "Test NFT",
        "A test NFT",
        ethers.parseEther("0.1"),
        "https://example.com/nft.jpg",
        "https://example.com/nft-metadata.json",
        true
      );

      expect(await filStore.ownerOf(1)).to.equal(await filStore.getAddress());
    });

    it("Should transfer NFT ownership on purchase", async function () {
      await filStore.createProduct(
        "Test NFT",
        "A test NFT",
        ethers.parseEther("0.1"),
        "https://example.com/nft.jpg",
        "https://example.com/nft-metadata.json",
        true
      );

      await filStore.connect(buyer).purchaseProduct(1, {
        value: ethers.parseEther("0.1")
      });

      expect(await filStore.ownerOf(1)).to.equal(buyer.address);
    });
  });

  describe("Withdrawal", function () {
    it("Should allow owner to withdraw funds", async function () {
      // Create and purchase a product to generate funds
      await filStore.createProduct(
        "Test Product",
        "A test product description",
        ethers.parseEther("0.1"),
        "https://example.com/image.jpg",
        "https://example.com/metadata.json",
        false
      );

      await filStore.connect(buyer).purchaseProduct(1, {
        value: ethers.parseEther("0.1")
      });

      const initialBalance = await ethers.provider.getBalance(owner.address);
      const tx = await filStore.withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      const finalBalance = await ethers.provider.getBalance(owner.address);

      expect(finalBalance).to.be.closeTo(
        initialBalance + ethers.parseEther("0.1") - gasUsed,
        ethers.parseEther("0.001")
      );
    });

    it("Should not allow non-owner to withdraw", async function () {
      await expect(
        filStore.connect(buyer).withdraw()
      ).to.be.revertedWithCustomError(filStore, "OwnableUnauthorizedAccount");
    });
  });
});
