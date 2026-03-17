import React from 'react';

function Dashboard({ files, walletAddress }) {
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  const totalChunks = files.reduce((acc, f) => acc + f.chunks, 0);
  const gatedFiles = files.filter((f) => f.isGated).length;
  const aiFiles = files.filter((f) => f.isAI).length;

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const stats = [
    { label: 'Total Files', value: files.length, sub: `${totalChunks} chunks`, accent: 'purple' },
    { label: 'Storage Used', value: formatBytes(totalSize), sub: 'on Shelby network', accent: 'blue' },
    { label: 'Token-Gated', value: gatedFiles, sub: 'premium files', accent: 'amber' },
    { label: 'AI Content', value: aiFiles, sub: 'via Media Kit', accent: 'emerald' },
  ];

  const accentColors = {
    purple: { bar: 'bg-purple-500', bg: 'from-purple-500/5' },
    blue: { bar: 'bg-blue-500', bg: 'from-blue-500/5' },
    amber: { bar: 'bg-amber-500', bg: 'from-amber-500/5' },
    emerald: { bar: 'bg-emerald-500', bg: 'from-emerald-500/5' },
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-500 mt-1 text-sm">Overview of your decentralized media on Shelby</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => {
          const colors = accentColors[stat.accent];
          return (
            <div key={stat.label} className={`bg-gradient-to-br ${colors.bg} to-transparent border border-gray-800/40 rounded-xl p-4`}>
              <p className="text-gray-500 text-xs">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <p className="text-gray-600 text-xs mt-1">{stat.sub}</p>
              <div className={`h-0.5 w-8 rounded-full ${colors.bar} mt-3 opacity-60`}></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs">Network</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Shelbynet Active
            </span>
          </div>
          <p className="text-white text-sm font-medium">Aptos Testnet</p>
          <p className="text-gray-600 text-xs mt-1 font-mono truncate">{walletAddress}</p>
        </div>

        <div className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-5">
          <span className="text-gray-400 text-xs">Encoding</span>
          <p className="text-white text-sm font-medium mt-2">Clay Erasure Codes</p>
          <p className="text-gray-600 text-xs mt-1">m=16 · k=10 · ~1 MiB chunks</p>
        </div>

        <div className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-5">
          <span className="text-gray-400 text-xs">Micropayments</span>
          <p className="text-white text-sm font-medium mt-2">0.00 APT earned</p>
          <p className="text-gray-600 text-xs mt-1">from content access fees</p>
        </div>
      </div>

      <div className="bg-gray-900/20 border border-gray-800/40 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
        {files.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <p className="text-base mb-1">No activity yet</p>
            <p className="text-xs">Upload files, set up your Creator Hub, or try the AI Vault</p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.slice(0, 6).map((file) => (
              <div key={file.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-900/20 border border-purple-800/20 flex items-center justify-center">
                    <span className="text-purple-400 text-[10px] font-mono font-bold">
                      {file.type.split('/')[1]?.toUpperCase().slice(0, 3) || 'BIN'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-gray-600 text-xs">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.isGated && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">GATED</span>}
                  {file.isAI && <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">AI</span>}
                  <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">{file.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
