import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

function WalletConnect(props) {
  var onDemo = props.onDemo;
  var wallet = useWallet();
  var wallets = wallet.wallets || [];
  var connect = wallet.connect;

  var connectingState = useState(false);
  var connecting = connectingState[0];
  var setConnecting = connectingState[1];
  var errorState = useState('');
  var error = errorState[0];
  var setError = errorState[1];

  var handleConnect = function(walletName) {
    setConnecting(true);
    setError('');
    connect(walletName).then(function() {
      setConnecting(false);
    }).catch(function(err) {
      setError(String(err && err.message ? err.message : 'Connection failed'));
      setConnecting(false);
    });
  };

  var features = [
    {
      icon: '\u2726',
      title: 'Creator Hub',
      desc: 'On-chain portfolio with token-gated access and micropayment earnings.',
      color: 'from-pink-500/10 to-pink-900/5',
      border: 'border-pink-800/20',
      iconBg: 'bg-pink-500/10'
    },
    {
      icon: '\u2B21',
      title: 'AI Vault',
      desc: 'Store GenAI content via Shelby Media Kit with verifiable provenance.',
      color: 'from-fuchsia-500/10 to-fuchsia-900/5',
      border: 'border-fuchsia-800/20',
      iconBg: 'bg-fuchsia-500/10'
    },
    {
      icon: '\u229E',
      title: 'Media Gallery',
      desc: 'Browse blobs with metadata, preview files, and share access links.',
      color: 'from-rose-500/10 to-rose-900/5',
      border: 'border-rose-800/20',
      iconBg: 'bg-rose-500/10'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="relative w-full max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex-1 text-left md:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-800/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              <span className="text-pink-400 text-xs font-semibold">Built on Shelby Protocol</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              {'Shelby'}
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                Media Vault
              </span>
            </h1>

            <p className="text-gray-400 max-w-md mb-8 leading-relaxed text-base" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              The all-in-one decentralized media platform. Store, showcase, monetize, and deliver your content on the fastest hot storage network.
            </p>

            <div className="space-y-3 max-w-sm">
              {wallets.length > 0 ? (
                <div>
                  {wallets.map(function(w) {
                    var wName = w.name || 'Unknown';
                    var wIcon = w.icon || '';
                    return (
                      <button
                        key={wName}
                        onClick={function() { handleConnect(wName); }}
                        disabled={connecting}
                        className="w-full flex items-center gap-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:shadow-xl hover:shadow-pink-900/30 active:scale-95 mb-2"
                        style={{ fontFamily: 'Quicksand, sans-serif' }}
                      >
                        {wIcon && <img src={wIcon} alt={wName} className="w-5 h-5 rounded" />}
                        {connecting ? 'Connecting...' : 'Connect ' + wName}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <a
                  href="https://petra.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-8 py-3 rounded-2xl text-sm font-bold transition-all hover:shadow-xl hover:shadow-pink-900/30"
                  style={{ fontFamily: 'Quicksand, sans-serif' }}
                >
                  Install Petra Wallet
                </a>
              )}

              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}

              <button
                onClick={onDemo}
                className="text-pink-400 hover:text-pink-300 text-xs font-semibold transition-colors"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              >
                Or try Demo Mode
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end animate-fade-up delay-200">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-b from-pink-500/20 via-transparent to-transparent rounded-3xl blur-2xl"></div>
              <img
                src="/ziyama.png"
                alt="Ziyama"
                className="relative w-72 md:w-96 rounded-2xl animate-float"
                style={{ filter: 'drop-shadow(0 0 30px rgba(255, 45, 155, 0.2))' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-8 animate-fade-up delay-300">
        {features.map(function(feature) {
          return (
            <div
              key={feature.title}
              className={'bg-gradient-to-br ' + feature.color + ' border ' + feature.border + ' rounded-2xl p-5 text-left hover:scale-[1.03] transition-all hover:shadow-lg hover:shadow-pink-900/10'}
            >
              <div className={'w-10 h-10 rounded-xl ' + feature.iconBg + ' flex items-center justify-center mb-3'}>
                <span className="text-xl text-pink-400">{feature.icon}</span>
              </div>
              <h3 className="text-white font-bold text-base mb-1.5" style={{ fontFamily: 'Quicksand, sans-serif' }}>{feature.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: 'Quicksand, sans-serif' }}>{feature.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-14 flex items-center gap-5 text-xs text-gray-600" style={{ fontFamily: 'Quicksand, sans-serif' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
          Shelby Protocol
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Aptos Blockchain
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></span>
          Jump Crypto
        </span>
      </div>
    </div>
  );
}

export default WalletConnect;
