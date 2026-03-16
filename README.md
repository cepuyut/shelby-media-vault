# 🗄️ Shelby Media Vault

A decentralized media storage and sharing application built on [Shelby Protocol](https://shelby.xyz/) — the first decentralized hot storage network powered by Aptos blockchain.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Shelby](https://img.shields.io/badge/Shelby-Protocol-7C3AED)
![Aptos](https://img.shields.io/badge/Aptos-Blockchain-00D4AA)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

Shelby Media Vault is a concept application that demonstrates how creators can upload, store, and share media files using Shelby's decentralized hot storage infrastructure. Unlike traditional cloud storage, your files are distributed across a global network of storage nodes with sub-second retrieval times.

### Why Shelby?

- **Decentralized** — No single point of failure. Your data lives across distributed storage nodes
- **Fast Retrieval** — Sub-second reads powered by dedicated fiber network, not public internet
- **Creator-Owned** — You control your content. No platform lock-in, no censorship risk
- **Monetizable** — Built-in micropayment channels let you monetize access to your content
- **Verifiable** — Cryptographic auditing ensures your data is always intact and available

## Features

- 📤 Upload media files (images, videos, documents) to Shelby network
- 📂 Browse and manage your stored files with metadata
- 🔗 Generate shareable links for decentralized file access
- 🔒 Token-gated access control for premium content
- 📊 Dashboard showing storage usage and retrieval stats
- 🌐 Built on Aptos testnet with Petra wallet integration

## Tech Stack

- **Frontend:** React 18 + Tailwind CSS
- **Storage:** Shelby Protocol SDK (`@shelby-protocol/sdk`)
- **Blockchain:** Aptos (via Petra Wallet)
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- [Petra Wallet](https://petra.app/) browser extension
- Aptos testnet tokens ([Faucet](https://docs.shelby.xyz/tools/wallets/petra-setup))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/shelby-media-vault.git
cd shelby-media-vault

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SHELBY_RPC_URL=https://rpc.shelby.xyz
VITE_APTOS_NETWORK=testnet
```

## Project Structure

```
shelby-media-vault/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx        # Main dashboard with stats
│   │   ├── FileUploader.jsx     # Upload interface for Shelby
│   │   ├── MediaGallery.jsx     # Gallery view of stored files
│   │   ├── FileCard.jsx         # Individual file display card
│   │   ├── WalletConnect.jsx    # Petra wallet connection
│   │   └── Navbar.jsx           # Navigation bar
│   ├── hooks/
│   │   └── useShelby.js         # Custom hook for Shelby SDK
│   ├── App.jsx                  # Root application component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles with Tailwind
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
├── .gitignore
└── README.md
```

## How It Works

1. **Connect Wallet** — User connects their Petra wallet (Aptos)
2. **Upload File** — File is chunked, erasure-coded, and distributed across Shelby storage nodes
3. **Get Blob ID** — Shelby returns a unique blob identifier stored on-chain
4. **Share or Access** — Use the blob ID to retrieve files with sub-second latency from any node
5. **Monetize** — Optionally set token-gated access rules for premium content

## Roadmap

- [x] Project setup and UI design
- [x] Petra wallet integration
- [ ] Shelby SDK integration for upload/download
- [ ] Media gallery with blob metadata
- [ ] Token-gated sharing with access control
- [ ] Real-time storage analytics dashboard
- [ ] Mobile responsive design
- [ ] Multi-chain wallet support (Ethereum, Solana)

## Resources

- [Shelby Documentation](https://docs.shelby.xyz/)
- [Shelby Developer Portal](https://developers.shelby.xyz/)
- [Shelby GitHub](https://github.com/shelby)
- [Aptos Documentation](https://aptos.dev/)
- [Shelby Blob Explorer](https://explorer.shelby.xyz/shelbynet)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for the Shelby ecosystem by [@fatitihlara](https://x.com/fatitihlara)
