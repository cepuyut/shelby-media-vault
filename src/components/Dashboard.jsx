import React from 'react';

function Dashboard(props) {
  var files = props.files;
  var walletAddress = props.walletAddress;
  var totalSize = files.reduce(function(acc, f) { return acc + f.size; }, 0);
  var totalChunks = files.reduce(function(acc, f) { return acc + f.chunks; }, 0);
  var gatedFiles = files.filter(function(f) { return f.isGated; }).length;
  var aiFiles = files.filter(function(f) { return f.isAI; }).length;

  var formatBytes = function(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  var stats = [
    { label: 'Total Files', value: files.length, sub: totalChunks + ' chunks', bar: 'bg-pink-500', bg: 'from-pink-500/8' },
    { label: 'Storage Used', value: formatBytes(totalSize), sub: 'on Shelby network', bar: 'bg-fuchsia-500', bg: 'from-fuchsia-500/8' },
    { label: 'Token-Gated', value: gatedFiles, sub: 'premium files', bar: 'bg-amber-500', bg: 'from-amber-500/8' },
    { label: 'AI Content', value: aiFiles, sub: 'via Media Kit', bar: 'bg-emerald-500', bg: 'from-emerald-500/8' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>Dashboard</h2>
        <p className="text-gray-500 mt-1 text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>Overview of your decentralized media on Shelby</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(function(stat) {
          return (
            <div key={stat.label} className={'bg-gradient-to-br ' + stat.bg + ' to-transparent border border-pink-900/10 rounded-2xl p-4'}>
              <p className="text-gray-500 text-xs font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>{stat.value}</p>
              <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>{stat.sub}</p>
              <div className={'h-1 w-10 rounded-full ' + stat.bar + ' mt-3 opacity-50'}></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
        <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Network</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Shelbynet Active
            </span>
          </div>
          <p className="text-white text-sm font-bold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Aptos Testnet</p>
          <p className="text-gray-600 text-xs mt-1 font-mono truncate">{walletAddress}</p>
        </div>
        <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5">
          <span className="text-gray-400 text-xs font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Encoding</span>
          <p className="text-white text-sm font-bold mt-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>Clay Erasure Codes</p>
          <p className="text-gray-600 text-xs mt-1">m=16 k=10 ~1 MiB chunks</p>
        </div>
        <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5">
          <span className="text-gray-400 text-xs font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Micropayments</span>
          <p className="text-white text-sm font-bold mt-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>0.00 APT earned</p>
          <p className="text-gray-600 text-xs mt-1">from content access fees</p>
        </div>
      </div>

      <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Quicksand, sans-serif' }}>Recent Activity</h3>
        {files.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <p className="text-base mb-1 font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>No activity yet</p>
            <p className="text-xs" style={{ fontFamily: 'Quicksand, sans-serif' }}>Upload files, set up your Creator Hub, or try the AI Vault</p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.slice(0, 6).map(function(file) {
              var ext = file.type.split('/')[1];
              var label = ext ? ext.toUpperCase().slice(0, 3) : 'BIN';
              return (
                <div key={file.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-pink-900/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-800/15 flex items-center justify-center">
                      <span className="text-pink-400 text-[10px] font-mono font-bold">{label}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold truncate max-w-[200px]" style={{ fontFamily: 'Quicksand, sans-serif' }}>{file.name}</p>
                      <p className="text-gray-600 text-xs">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.isGated && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full font-semibold">GATED</span>}
                    {file.isAI && <span className="text-[10px] text-fuchsia-400 bg-fuchsia-400/10 px-2 py-0.5 rounded-full font-semibold">AI</span>}
                    <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-semibold">{file.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
