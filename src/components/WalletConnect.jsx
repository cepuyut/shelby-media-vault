import React, { useState } from 'react';

function WalletConnect({ onConnect }) {
  const [showDemo, setShowDemo] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      if (window.aptos) {
        const response = await window.aptos.connect();
        onConnect(response.address, false);
      } else {
        setShowDemo(true);
      }
    } catch (error) {
      setShowDemo(true);
    }
    setConnecting(false);
  };

  const handleDemo = () => {
    onConnect('0x7a8f3b2c1d4e5f6a9b0c1d2e3f4a5b6c7d8e9f0a', true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center mb-8">
        <span className="text-white font-bold text-3xl">S</span>
      </div>

      <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
        Shelby Media Vault
      </h1>

      <p className="text-gray-400 max-w-lg mb-10 leading-relaxed text-lg">
        The all-in-one decentralized media platform. Store, showcase, monetize, and deliver content on Shelby's hot storage network.
      </p>

      {!showDemo ? (
        <>
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-3.5 rounded-xl text-base font-medium transition-all hover:scale-[1.03] active:scale-[0.97] hover:shadow-xl hover:shadow-purple-900/30"
          >
            {connecting ? 'Connecting...' : 'Connect Petra Wallet'}
          </button>
          <p className="text-gray-600 text-xs mt-4">
            Don't have Petra?{' '}
            <a href="https://petra.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              Download here
            </a>
          </p>
        </>
      ) : (
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 max-w-md w-full">
          <p className="text-amber-400 text-sm font-medium mb-2">Petra Wallet not detected</p>
          <p className="text-gray-400 text-sm mb-5">Install Petra to connect with Aptos testnet, or try demo mode to explore the app.</p>
          <div className="flex gap-3 justify-center">
            
              href="https://petra.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Install Petra
            </a>
            <button
              onClick={handleDemo}
              className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all border border-gray-700"
            >
              Try Demo Mode
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-20 max-w-4xl w-full">
        {[
          {
            icon: '✦',
            title: 'Creator Hub',
            desc: 'Build your on-chain portfolio. Set token-gated access and earn through micropayments.',
            gradient: 'from-purple-500/10 to-purple-900/5',
            border: 'border-purple-800/30',
          },
          {
            icon: '⬡',
            title: 'AI Vault',
            desc: 'Store and serve AI-generated content via Shelby Media Kit with verifiable provenance.',
            gradient: 'from-blue-500/10 to-blue-900/5',
            border: 'border-blue-800/30',
          },
          {
            icon: '⊞',
            title: 'Media Gallery',
            desc: 'Browse blobs with rich metadata, preview files, and share decentralized access links.',
            gradient: 'from-emerald-500/10 to-emerald-900/5',
            border: 'border-emerald-800/30',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className={`bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform`}
          >
            <span className="text-2xl mb-3 block">{feature.icon}</span>
            <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center gap-6 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          Shelby Protocol
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Aptos Blockchain
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Jump Crypto
        </span>
      </div>
    </div>
  );
}

export default WalletConnect;
