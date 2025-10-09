# Deployment Guide for MiniCraft

This guide will help you deploy your MiniCraft dApp to Base network.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Base Sepolia ETH** for testnet deployment
3. **Base ETH** for mainnet deployment
4. **BaseScan API Key** (optional, for contract verification)

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Base Network Configuration
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_MAINNET_RPC_URL=https://mainnet.base.org

# Private Key (for deployment - keep this secure!)
PRIVATE_KEY=your_private_key_here

# BaseScan API Key (for contract verification)
BASESCAN_API_KEY=your_basescan_api_key_here

# Contract Address (will be set after deployment)
NEXT_PUBLIC_FILSTORE_ADDRESS=
```

## Getting Base Sepolia ETH

1. Visit [Base Sepolia Faucet](https://bridge.base.org/deposit)
2. Bridge some Sepolia ETH to Base Sepolia
3. Or use [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)

## Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile Contracts

```bash
npx hardhat compile
```

### 3. Deploy to Base Sepolia (Testnet)

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

### 4. Deploy to Base Mainnet

```bash
npx hardhat run scripts/deploy.js --network base
```

## Contract Verification

After deployment, the contract will be automatically verified on BaseScan if you provide a `BASESCAN_API_KEY`.

## Frontend Configuration

After deployment, the contract address will be automatically saved to your `.env.local` file. The frontend will use this address to interact with the deployed contract.

## Testing the Deployment

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the products page and test the purchase functionality

3. Check your wallet for the purchased items

## Troubleshooting

### Common Issues

1. **Insufficient funds**: Make sure you have enough ETH on the target network
2. **Network issues**: Check your RPC URL configuration
3. **Private key issues**: Ensure your private key is correctly formatted (without 0x prefix)

### Getting Help

- [Base Documentation](https://docs.base.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OnchainKit Documentation](https://onchainkit.xyz/)

## Security Notes

- Never commit your private key to version control
- Use environment variables for sensitive information
- Test thoroughly on testnet before mainnet deployment
- Consider using a hardware wallet for mainnet deployments
