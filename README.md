# 🗄️ Shelby Media Vault

An all-in-one decentralized media platform built on [Shelby Protocol](https://shelby.xyz/) — combining creator tools, AI content delivery, and media gallery into a single app powered by Aptos blockchain.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Shelby](https://img.shields.io/badge/Shelby-Protocol-7C3AED)
![Aptos](https://img.shields.io/badge/Aptos-Blockchain-00D4AA)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

Shelby Media Vault goes beyond simple file storage. It's a platform designed for creators, AI builders, and collectors who want full ownership over their digital content. Upload, showcase, monetize, and distribute media — all on decentralized infrastructure with sub-second performance.

### What Makes This Different

Most Shelby apps focus on basic upload and download. Media Vault combines three layers into one cohesive platform:

**Creator Hub** — Build your on-chain portfolio. Upload content, set token-gated access rules, and earn through Shelby's micropayment channels. Creators keep full control over distribution and monetization without platform lock-in.

**AI Vault** — Store and serve AI-generated content at scale using Shelby Media Kit. Whether it's generative art, AI video, or model outputs, the AI Vault provides fast delivery with verifiable provenance built in.

**Media Gallery** — Browse, preview, and manage all your stored blobs with rich metadata. View file status, chunk distribution, encoding details, and share links directly from the gallery interface.

## Features

- 📤 Upload media files with automatic chunking and erasure coding
- 🎨 Creator portfolio with customizable showcase pages
- 🔒 Token-gated access control for premium and exclusive content
- 💰 Micropayment integration for content monetization
- 🤖 AI content pipeline using Shelby Media Kit for GenAI distribution
- 🖼️ Media gallery with blob metadata, preview, and retrieval stats
- 📊 Dashboard showing storage usage, earnings, and network activity
- 🌐 Built on Aptos testnet with Petra wallet integration

## Tech Stack

- **Frontend:** React 18 + Tailwind CSS
- **Storage:** Shelby Protocol SDK (`@shelby-protocol/sdk`)
- **AI Delivery:** Shelby Media Kit
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
git clone https://github.com/cepuyut/shelby-media-vault.git
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
│   │   ├── Dashboard.jsx        # Stats, earnings, network overview
│   │   ├── FileUploader.jsx     # Upload interface with chunking display
│   │   ├── MediaGallery.jsx     # Gallery view with metadata preview
│   │   ├── FileCard.jsx         # Individual file card with blob info
│   │   ├── WalletConnect.jsx    # Petra wallet connection
│   │   └── Navbar.jsx           # Navigation with tab system
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

## Architecture

```
┌─────────────────────────────────────────┐
│            Shelby Media Vault           │
├──────────┬──────────┬───────────────────┤
│ Creator  │ AI Vault │  Media Gallery    │
│ Hub      │          │                   │
│          │ Media Kit│  Blob Explorer    │
│ Token    │ GenAI    │  Metadata View    │
│ Gating   │ Delivery │  Share Links      │
│ Earnings │ Provenance│                  │
├──────────┴──────────┴───────────────────┤
│         Shelby Protocol SDK             │
│    Upload · Download · Blob Mgmt        │
├─────────────────────────────────────────┤
│         Aptos Blockchain                │
│   Smart Contract · Micropayments        │
└─────────────────────────────────────────┘
```

## Roadmap

- [x] Project setup and UI design
- [x] Petra wallet integration
- [x] File upload with chunking visualization
- [ ] Shelby SDK integration for upload/download
- [ ] Media gallery with blob metadata and preview
- [ ] Creator portfolio page with customizable layout
- [ ] Token-gated access control system
- [ ] Micropayment earnings dashboard
- [ ] AI Vault: Shelby Media Kit integration for GenAI content
- [ ] AI Vault: Content provenance and verification display
- [ ] Multi-chain wallet support (Ethereum, Solana)
- [ ] Mobile responsive design

## Resources

- [Shelby Documentation](https://docs.shelby.xyz/)
- [Shelby Developer Portal](https://developers.shelby.xyz/)
- [Shelby GitHub](https://github.com/shelby)
- [Shelby Media Kit](https://docs.shelby.xyz/)
- [Aptos Documentation](https://aptos.dev/)
- [Shelby Blob Explorer](https://explorer.shelby.xyz/shelbynet)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for the Shelby ecosystem by [@fatitihlara](https://x.com/fatitihlara)
