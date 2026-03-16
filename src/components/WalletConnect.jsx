import React from 'react';

function WalletConnect({ onConnect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-shelby-500 to-shelby-800 flex items-center justify-center mb-6">
        <span className="text-white font-bold text-3xl">S</span>
      </div>

      <h1 className="text-4xl font-bold text-white mb-3">
        Shelby Media Vault
      </h1>

      <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
        Store, manage, and share your media files on the decentralized Shelby
        network. Your content, your control — powered by Aptos blockchain.
      </p>

      <button
        onClick={onConnect}
        className="bg-shelby-600 hover:bg-shelby-700 text-white px-8 py-3 rounded-xl text-base font-medium transition-all hover:scale-105 active:scale-95"
      >
        Connect Petra Wallet
      </button>

      <p className="text-gray-600 text-xs mt-4">
        Don't have Petra?{' '}
        <a
          href="https://petra.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-shelby-400 hover:underline"
        >
          Download here
        </a>
      </p>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl w-full">
        {[
          {
            title: 'Decentralized',
            desc: 'Files distributed across global storage nodes with erasure coding',
          },
          {
            title: 'Sub-Second Reads',
            desc: 'Dedicated fiber network delivers instant file retrieval',
          },
          {
            title: 'Creator-Owned',
            desc: 'Monetize content with built-in micropayment channels',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 text-left"
          >
            <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletConnect;
