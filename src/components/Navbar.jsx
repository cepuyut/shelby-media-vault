import React from 'react';

var tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '\u25C8' },
  { id: 'upload', label: 'Upload', icon: '\u2191' },
  { id: 'gallery', label: 'Gallery', icon: '\u229E' },
  { id: 'creator', label: 'Creator Hub', icon: '\u2726' },
  { id: 'ai-vault', label: 'AI Vault', icon: '\u2B21' }
];

function Navbar(props) {
  var walletConnected = props.walletConnected;
  var walletAddress = props.walletAddress;
  var isDemo = props.isDemo;
  var activeTab = props.activeTab;
  var onTabChange = props.onTabChange;

  var shortenAddress = function(addr) {
    return addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';
  };

  return (
    <nav className="border-b border-pink-900/10 bg-[#0d0a12]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center shadow-lg shadow-pink-900/20">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Quicksand, sans-serif' }}>Media Vault</span>
          </div>

          {walletConnected && (
            <div className="hidden md:flex items-center gap-0.5 bg-[#140f1e] rounded-2xl p-1 border border-pink-900/15">
              {tabs.map(function(tab) {
                return (
                  <button
                    key={tab.id}
                    onClick={function() { onTabChange(tab.id); }}
                    className={activeTab === tab.id
                      ? 'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-900/30'
                      : 'px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 text-gray-400 hover:text-pink-300 hover:bg-pink-900/10'
                    }
                  >
                    <span className="text-[10px]">{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-2">
            {walletConnected && (
              <>
                {isDemo && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full font-semibold">Demo</span>}
                <div className="flex items-center gap-2 bg-[#140f1e] border border-pink-900/15 px-3 py-1.5 rounded-xl">
                  <div className={isDemo ? 'w-2 h-2 rounded-full bg-amber-400 animate-pulse' : 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse'}></div>
                  <span className="text-xs text-gray-300 font-mono">{shortenAddress(walletAddress)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {walletConnected && (
          <div className="md:hidden flex overflow-x-auto gap-1 pb-3 -mx-1 px-1">
            {tabs.map(function(tab) {
              return (
                <button
                  key={tab.id}
                  onClick={function() { onTabChange(tab.id); }}
                  className={activeTab === tab.id
                    ? 'px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-pink-600 text-white'
                    : 'px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap text-gray-500 bg-[#140f1e]'
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
