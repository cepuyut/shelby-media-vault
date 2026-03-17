import React from 'react';

var tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '\u25C8' },
  { id: 'upload', label: 'Upload', icon: '\u2191' },
  { id: 'gallery', label: 'Gallery', icon: '\u229E' },
  { id: 'creator', label: 'Creator Hub', icon: '\u2726' },
  { id: 'ai-vault', label: 'AI Vault', icon: '\u2B21' },
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
    <nav className="border-b border-gray-800/50 bg-[#08080f]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">Media Vault</span>
          </div>

          {walletConnected && (
            <div className="hidden md:flex items-center gap-0.5 bg-gray-900/60 rounded-xl p-1 border border-gray-800/50">
              {tabs.map(function(tab) {
                return (
                  <button
                    key={tab.id}
                    onClick={function() { onTabChange(tab.id); }}
                    className={activeTab === tab.id
                      ? 'px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                      : 'px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 text-gray-400 hover:text-white hover:bg-gray-800/50'
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
                {isDemo && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg">Demo</span>}
                <div className="flex items-center gap-2 bg-gray-900/60 border border-gray-800/50 px-3 py-1.5 rounded-lg">
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
                    ? 'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-purple-600 text-white'
                    : 'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap text-gray-500 bg-gray-900/40'
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
