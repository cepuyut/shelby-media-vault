import React from 'react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'upload', label: 'Upload', icon: '↑' },
  { id: 'gallery', label: 'Gallery', icon: '⊞' },
  { id: 'creator', label: 'Creator Hub', icon: '✦' },
  { id: 'ai-vault', label: 'AI Vault', icon: '⬡' },
];

function Navbar({ walletConnected, walletAddress, onConnect, activeTab, onTabChange }) {
  const shortenAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  return (
    <nav className="border-b border-gray-800/50 bg-[#08080f]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center glow-pulse">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">
              Media Vault
            </span>
          </div>

          {walletConnected && (
            <div className="hidden md:flex items-center gap-0.5 bg-gray-900/60 rounded-xl p-1 border border-gray-800/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-[10px]">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <div>
            {walletConnected ? (
              <div className="flex items-center gap-2 bg-gray-900/60 border border-gray-800/50 px-3 py-1.5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs text-gray-300 font-mono">
                  {shortenAddress(walletAddress)}
                </span>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-900/30"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Mobile tabs */}
        {walletConnected && (
          <div className="md:hidden flex overflow-x-auto gap-1 pb-3 -mx-1 px-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-500 bg-gray-900/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
