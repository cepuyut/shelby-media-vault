import React, { useState } from 'react';

function CreatorHub(props) {
  var files = props.files; var walletAddress = props.walletAddress;
  var nameState = useState('Ziyama'); var profileName = nameState[0]; var setProfileName = nameState[1];
  var bioState = useState('Web3 creator and builder. Decentralized media enthusiast.'); var profileBio = bioState[0]; var setProfileBio = bioState[1];
  var editState = useState(false); var editing = editState[0]; var setEditing = editState[1];
  var gatedFiles = files.filter(function(f) { return f.isGated; });
  var totalEarnings = gatedFiles.length * 0.05;
  var shortenAddress = function(addr) { return addr ? addr.slice(0, 8) + '...' + addr.slice(-6) : ''; };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>Creator Hub</h2>
        <p className="text-gray-500 mt-1 text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>Your on-chain portfolio. Showcase content, set access rules, and earn.</p>
      </div>

      <div className="bg-gradient-to-br from-pink-500/8 to-transparent border border-pink-800/15 rounded-3xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-pink-900/20">{profileName.charAt(0)}</div>
            <div>
              {editing ? (
                <div className="space-y-2">
                  <input value={profileName} onChange={function(e) { setProfileName(e.target.value); }} className="bg-[#1a1428] border border-pink-900/20 rounded-xl px-3 py-1.5 text-white text-sm w-48 focus:outline-none focus:border-pink-500" placeholder="Display name" />
                  <input value={profileBio} onChange={function(e) { setProfileBio(e.target.value); }} className="bg-[#1a1428] border border-pink-900/20 rounded-xl px-3 py-1.5 text-white text-sm w-72 focus:outline-none focus:border-pink-500" placeholder="Short bio" />
                </div>
              ) : (
                <div>
                  <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Quicksand, sans-serif' }}>{profileName}</h3>
                  <p className="text-gray-400 text-sm mt-0.5" style={{ fontFamily: 'Quicksand, sans-serif' }}>{profileBio}</p>
                  <p className="text-gray-600 text-xs font-mono mt-1">{shortenAddress(walletAddress)}</p>
                </div>
              )}
            </div>
          </div>
          <button onClick={function() { setEditing(!editing); }} className="text-xs text-pink-400 hover:text-pink-300 border border-pink-800/20 px-3.5 py-1.5 rounded-xl font-semibold transition-colors">{editing ? 'Save' : 'Edit Profile'}</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>{files.length}</p>
          <p className="text-gray-500 text-xs mt-1 font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Published</p>
        </div>
        <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400" style={{ fontFamily: 'Quicksand, sans-serif' }}>{gatedFiles.length}</p>
          <p className="text-gray-500 text-xs mt-1 font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Token-Gated</p>
        </div>
        <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400" style={{ fontFamily: 'Quicksand, sans-serif' }}>{totalEarnings.toFixed(2) + ' APT'}</p>
          <p className="text-gray-500 text-xs mt-1 font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Earned</p>
        </div>
      </div>

      <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>Token-Gated Content</h3>
          <span className="text-[10px] text-gray-500 bg-pink-900/10 px-2.5 py-1 rounded-full font-semibold">Micropayments via Shelby</span>
        </div>
        <div className="bg-[#0d0a12] border border-pink-900/10 rounded-2xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs block mb-2 font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Access Price</label>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="0.00" className="bg-[#140f1e] border border-pink-900/15 rounded-xl px-3 py-2 text-white text-sm w-32 focus:outline-none focus:border-pink-500" />
                <span className="text-gray-500 text-sm font-semibold">APT</span>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-2 font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Gate Type</label>
              <select className="bg-[#140f1e] border border-pink-900/15 rounded-xl px-3 py-2 text-white text-sm w-full focus:outline-none focus:border-pink-500 appearance-none">
                <option>Pay-per-view</option>
                <option>Token holder only</option>
                <option>Time-limited access</option>
              </select>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4" style={{ fontFamily: 'Quicksand, sans-serif' }}>Set pricing and access rules. Payments flow directly to your wallet via Shelby micropayment channels.</p>
        </div>
      </div>

      <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Quicksand, sans-serif' }}>Portfolio Preview</h3>
        {files.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <span className="text-3xl block mb-3 opacity-20">{'\u2726'}</span>
            <p className="text-sm font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Your portfolio is empty</p>
            <p className="text-xs mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>Upload content and it will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {files.slice(0, 8).map(function(file) {
              var icon = file.type.startsWith('image/') ? '\uD83D\uDDBC' : file.type.startsWith('video/') ? '\uD83C\uDFAC' : '\uD83D\uDCC1';
              return (
                <div key={file.id} className="aspect-square rounded-2xl bg-gradient-to-br from-pink-900/10 to-[#0d0a12] flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="text-xl opacity-30">{icon}</span>
                  <span className="text-[10px] text-gray-500 mt-1 truncate max-w-[90%]">{file.name}</span>
                  {file.isGated && (<div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center"><span className="text-[8px] text-amber-400">{'\uD83D\uDD12'}</span></div>)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatorHub;
