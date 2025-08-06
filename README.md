🧱 MiniCraft with MiniKit
A modular Web3 starter built on Base, powered by MiniKit

📌 Overview
MiniCraft is a modular, developer-friendly dApp boilerplate built on Base — an Ethereum Layer 2 scaling solution developed by Coinbase. The project uses MiniKit, a framework originally built for the Celo ecosystem, extended here to support Base and EVM-compatible chains.

MiniCraft is not a game — it’s a development sandbox where builders can experiment with smart contracts, frontend integration, and onchain UX using modern tools.

🔍 What is MiniCraft?
MiniCraft offers:

🧱 A scaffolded full-stack dApp architecture on Base

⚙️ Hardhat-based smart contract development

💡 Ethers.js + React for frontend interaction

🔐 Built-in wallet support (MetaMask, Coinbase Wallet)

🌐 Modular contract components (payments, rewards, access control, etc.)

🚀 1-click deploy to Base testnet or mainnet

🌍 Why Base?
Base provides:

✅ Cheap L2 transaction fees

✅ Coinbase-native onboarding via Base Wallet

✅ EVM compatibility

✅ Access to Ethereum’s security and tooling

✅ Growing ecosystem with solid developer support

MiniCraft is designed to leverage Base’s L2 advantages to provide a fast, affordable dev experience.

⚙️ Features
Feature	Description
🪙 Smart Contracts	Modular Solidity contracts (payments, staking, access control, etc.)
🖼 Frontend	React + Ethers.js integration
🔌 Wallet Support	MetaMask, WalletConnect, Coinbase Wallet
⚡ Deployment	Local Hardhat + Base Sepolia/Mainnet deployment
🧪 Testing	Mocha + Chai test suite
📤 Scripts	TypeScript-based deploy + interaction scripts
🌐 Modular	Easily extendable contract and UI components

📁 Project Structure
bash
Copy
Edit
minicraft/
├── contracts/         # Solidity smart contracts
├── frontend/          # React app (MiniKit + Vite)
├── scripts/           # Deployment and utility scripts
├── test/              # Smart contract tests
├── hardhat.config.ts  # Hardhat configuration
├── .env               # Environment variables (private keys, RPCs)
└── README.md
 