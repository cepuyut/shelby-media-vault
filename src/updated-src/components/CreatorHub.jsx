import React, { useState } from 'react';

function CreatorHub({ files, walletAddress }) {
  const [profileName, setProfileName] = useState('Ziyama');
  const [profileBio, setProfileBio] = useState('Web3 creator and builder. Decentralized media enthusiast.');
  const [editing, setEditing] = useState(false);

  const gatedFiles = files.filter((f) => f.isGated);
  const totalEarnings = gatedFiles.length * 0.05;

  const shortenAddress = (addr) =>
    addr ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : '';

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Creator Hub</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Your on-chain portfolio. Showcase content, set access rules, and earn.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-800/30 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center text-2xl font-bold text-white">
              {profileName.charAt(0)}
            </div>
            <div>
              {editing ? (
                <div className="space-y-2">
                  <input
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm w-48 focus:outline-none focus:border-purple-500"
                    placeholder="Display name"
                  />
                  <input
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm w-72 focus:outline-none focus:border-purple-500"
                    placeholder="Short bio"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-white text-xl font-bold">{profileName}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">{profileBio}</p>
                  <p className="text-gray-600 text-xs font-mono mt-1">{shortenAddress(walletAddress)}</p>
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="text-xs text-purple-400 hover:text-purple-300 border border-purple-800/40 px-3 py-1.5 rounded-lg transition-colors"
          >
            {editing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{files.length}</p>
          <p className="text-gray-500 text-xs mt-1">Published</p>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{gatedFiles.length}</p>
          <p className="text-gray-500 text-xs mt-1">Token-Gated</p>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{totalEarnings.toFixed(2)} APT</p>
          <p className="text-gray-500 text-xs mt-1">Earned</p>
        </div>
      </div>

      {/* Token Gating Section */}
      <div className="bg-gray-900/20 border border-gray-800/40 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Token-Gated Content</h3>
          <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-1 rounded">Micropayments via Shelby</span>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs block mb-2">Access Price</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm w-32 focus:outline-none focus:border-purple-500"
                />
                <span className="text-gray-500 text-sm">APT</span>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-2">Gate Type</label>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm w-full focus:outline-none focus:border-purple-500 appearance-none">
                <option>Pay-per-view</option>
                <option>Token holder only</option>
                <option>Time-limited access</option>
              </select>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4">
            Set pricing and access rules for your premium content. Payments flow directly to your wallet via Shelby micropayment channels.
          </p>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="bg-gray-900/20 border border-gray-800/40 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Portfolio Preview</h3>
        {files.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <span className="text-3xl block mb-3 opacity-30">✦</span>
            <p className="text-sm">Your portfolio is empty</p>
            <p className="text-xs mt-1">Upload content and it will appear here as your public showcase</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {files.slice(0, 8).map((file) => (
              <div
                key={file.id}
                className="aspect-square rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center relative overflow-hidden group"
              >
                <span className="text-xl opacity-40">
                  {file.type.startsWith('image/') ? '🖼' : file.type.startsWith('video/') ? '🎬' : '📁'}
                </span>
                <span className="text-[10px] text-gray-500 mt-1 truncate max-w-[90%]">{file.name}</span>
                {file.isGated && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-[8px] text-amber-400">🔒</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatorHub;
