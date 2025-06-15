# 🚀 DaoConnect - Polkadot Ecosystem DAO Platform

<div align="center">
  <img src="/public/images/edge-polkadot-integration.jpg" alt="Polkadot Integration" width="600" />
  
  **Revolutionary DAO platform built specifically for the Polkadot ecosystem**
  
  [![Polkadot](https://img.shields.io/badge/Polkadot-E6007A?style=for-the-badge&logo=polkadot&logoColor=white)](https://polkadot.network/)
  [![Substrate](https://img.shields.io/badge/Substrate-282828?style=for-the-badge&logo=parity-substrate&logoColor=white)](https://substrate.io/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

## 🌟 What Makes DaoConnect Special

DaoConnect is the **first comprehensive DAO platform** built specifically for the Polkadot ecosystem, supporting both **Substrate-native** and **EVM-compatible parachains**.

### 🔗 Polkadot Ecosystem Integration
- **Multi-Parachain Support** - Works across Moonbeam, Astar, Acala, and more
- **Cross-Chain Messaging (XCM)** - Seamless asset transfers between parachains  
- **Substrate Native** - Direct integration with Polkadot's governance primitives
- **EVM Compatibility** - Smart contracts on Moonbeam and other EVM parachains
- **Shared Security** - Benefit from Polkadot's shared security model

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Polkadot.js extension or compatible wallet
- Access to Polkadot ecosystem RPCs

### 1. Clone & Install
\`\`\`bash
git clone https://github.com/your-org/daoconnect
cd daoconnect
npm install
\`\`\`

### 2. Environment Configuration

Create a `.env.local` file with the following variables:

\`\`\`bash
# === REQUIRED: POLKADOT NETWORK CONFIGURATION ===
# Primary RPC endpoint (Moonbeam recommended for EVM compatibility)
NEXT_PUBLIC_RPC_URL=https://rpc.api.moonbeam.network
NEXT_PUBLIC_WS_RPC_URL=wss://wss.api.moonbeam.network

# Network identification
NEXT_PUBLIC_CHAIN_ID=1284
NEXT_PUBLIC_NETWORK_NAME=moonbeam

# === REQUIRED: CONTRACT ADDRESSES ===
# Deploy your contracts first, then add addresses here
NEXT_PUBLIC_DAO_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_ADDRESS=0x...

# === REQUIRED: API CONFIGURATION ===
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# === REQUIRED: WALLET INTEGRATION ===
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# === FEATURE FLAGS ===
NEXT_PUBLIC_ENABLE_REAL_TIME=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_XCM=true
NEXT_PUBLIC_ENABLE_SUBSTRATE=true

# === PERFORMANCE TUNING ===
NEXT_PUBLIC_EVENT_POLLING_INTERVAL=5000
NEXT_PUBLIC_MAX_EVENTS_CACHE=100
NEXT_PUBLIC_BLOCK_CONFIRMATION_COUNT=2

# === POLKADOT RELAY CHAINS ===
NEXT_PUBLIC_POLKADOT_RELAY_RPC=wss://rpc.polkadot.io
NEXT_PUBLIC_KUSAMA_RELAY_RPC=wss://kusama-rpc.polkadot.io

# === SERVER-ONLY VARIABLES ===
WS_RPC_URL=wss://wss.api.moonbeam.network
ALCHEMY_API_KEY=your_alchemy_key_optional
INFURA_PROJECT_ID=your_infura_id_optional
GEMINI_API_KEY=your_gemini_key_for_ai_features
\`\`\`

## 🔧 Where to Get API Keys & Endpoints

### 🌐 RPC Endpoints (FREE)

#### **Moonbeam (Recommended for Smart Contracts)**
\`\`\`bash
NEXT_PUBLIC_RPC_URL=https://rpc.api.moonbeam.network
NEXT_PUBLIC_WS_RPC_URL=wss://wss.api.moonbeam.network
NEXT_PUBLIC_CHAIN_ID=1284
\`\`\`

#### **Moonriver (Kusama Ecosystem)**
\`\`\`bash
NEXT_PUBLIC_RPC_URL=https://rpc.api.moonriver.moonbeam.network
NEXT_PUBLIC_WS_RPC_URL=wss://wss.api.moonriver.moonbeam.network
NEXT_PUBLIC_CHAIN_ID=1285
\`\`\`

#### **Astar Network**
\`\`\`bash
NEXT_PUBLIC_RPC_URL=https://evm.astar.network
NEXT_PUBLIC_WS_RPC_URL=wss://rpc.astar.network
NEXT_PUBLIC_CHAIN_ID=592
\`\`\`

#### **Acala Network**
\`\`\`bash
NEXT_PUBLIC_RPC_URL=https://eth-rpc-acala.aca-api.network
NEXT_PUBLIC_WS_RPC_URL=wss://acala-rpc.aca-api.network/ws
NEXT_PUBLIC_CHAIN_ID=787
\`\`\`

#### **Polkadot Relay Chain (Substrate)**
\`\`\`bash
NEXT_PUBLIC_POLKADOT_RELAY_RPC=wss://rpc.polkadot.io
\`\`\`

#### **Kusama Relay Chain (Substrate)**
\`\`\`bash
NEXT_PUBLIC_KUSAMA_RELAY_RPC=wss://kusama-rpc.polkadot.io
\`\`\`

### 🔑 API Keys

#### **WalletConnect Project ID** (REQUIRED)
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create free account
3. Create new project
4. Copy Project ID
\`\`\`bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
\`\`\`

#### **Alchemy API Key** (OPTIONAL - Better Performance)
1. Visit [Alchemy](https://www.alchemy.com)
2. Create account
3. Create app for your network
4. Copy API key
\`\`\`bash
ALCHEMY_API_KEY=your_alchemy_api_key
\`\`\`

#### **Gemini AI API Key** (OPTIONAL - AI Features)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to environment
\`\`\`bash
GEMINI_API_KEY=your_gemini_api_key
\`\`\`

### 📝 Contract Deployment

Before using the platform, deploy the smart contracts:

\`\`\`bash
# Install Hardhat
npm install --save-dev hardhat

# Deploy to Moonbeam
npx hardhat run scripts/deploy.js --network moonbeam

# Copy contract addresses to .env.local
NEXT_PUBLIC_DAO_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_ADDRESS=0x...
\`\`\`

## 🏗️ Development

### Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Deploy Smart Contracts
\`\`\`bash
npm run deploy:moonbeam
npm run deploy:astar
npm run deploy:acala
\`\`\`

## 🌍 Supported Networks

| Network | Type | Chain ID | RPC Endpoint | Status |
|---------|------|----------|--------------|--------|
| **Moonbeam** | EVM | 1284 | `https://rpc.api.moonbeam.network` | ✅ Primary |
| **Moonriver** | EVM | 1285 | `https://rpc.api.moonriver.moonbeam.network` | ✅ Supported |
| **Astar** | EVM | 592 | `https://evm.astar.network` | ✅ Supported |
| **Acala** | EVM | 787 | `https://eth-rpc-acala.aca-api.network` | ✅ Supported |
| **Polkadot** | Substrate | - | `wss://rpc.polkadot.io` | 🔄 Coming Soon |
| **Kusama** | Substrate | - | `wss://kusama-rpc.polkadot.io` | 🔄 Coming Soon |

## 🎯 Features

### 🏛️ DAO Governance
- **Proposal Creation** - Create and submit governance proposals
- **Voting System** - Secure, transparent voting mechanisms  
- **Treasury Management** - Multi-signature treasury operations
- **Member Management** - Role-based access control

### 🔗 Polkadot Integration
- **Cross-Chain Assets** - Transfer assets between parachains
- **XCM Support** - Cross-consensus messaging protocol
- **Substrate Pallets** - Direct integration with governance pallets
- **Parachain Connectivity** - Connect to multiple parachains

### 🤖 AI-Powered Features
- **Proposal Analysis** - AI-powered proposal impact analysis
- **Governance Insights** - Smart recommendations for DAO operations
- **Risk Assessment** - Automated risk analysis for proposals
- **Trend Analysis** - Market and governance trend insights

### 📱 User Experience
- **Real-time Updates** - Live blockchain event streaming
- **Mobile Optimized** - Progressive Web App (PWA) support
- **Multi-Wallet** - Support for all major Polkadot wallets
- **Dark/Light Mode** - Beautiful, accessible interface

## 🔒 Security

- **Multi-signature Treasury** - Secure fund management
- **Time-locked Proposals** - Execution delays for security
- **Access Control** - Role-based permissions
- **Audit Ready** - Clean, auditable smart contract code

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 🆘 Support

- **Documentation**: [docs.daoconnect.app](https://docs.daoconnect.app)
- **Discord**: [Join our community](https://discord.gg/daoconnect)
- **Twitter**: [@DaoConnect](https://twitter.com/daoconnect)
- **Email**: support@daoconnect.app

---

<div align="center">
  <strong>Built with ❤️ for the Polkadot ecosystem</strong>
</div>
