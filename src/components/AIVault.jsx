import React, { useState, useRef } from 'react';

function AIVault(props) {
  var files = props.files; var onUpload = props.onUpload;
  var genState = useState(false); var generating = genState[0]; var setGenerating = genState[1];
  var promptState = useState(''); var prompt = promptState[0]; var setPrompt = promptState[1];
  var inputRef = useRef(null);
  var aiFiles = files.filter(function(f) { return f.isAI; });

  var simulateGenerate = function() {
    if (!prompt.trim()) return;
    setGenerating(true);
    var cleanName = prompt.slice(0, 20).replace(/\s/g, '_');
    setTimeout(function() {
      onUpload({ name: 'ai_' + cleanName + '_' + Date.now() + '.png', size: Math.floor(Math.random() * 5000000) + 500000, type: 'image/png', isAI: true });
      setGenerating(false); setPrompt('');
    }, 2500);
  };

  var provenanceItems = [
    { icon: '\uD83D\uDD17', title: 'Cryptographic Hash', desc: 'Every AI output gets a unique merkle root committed on Aptos' },
    { icon: '\uD83D\uDCCB', title: 'Generation Metadata', desc: 'Model name, prompt, parameters, and timestamp stored alongside content' },
    { icon: '\u2713', title: 'Verification', desc: 'Anyone can verify content origin through the blob explorer' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>AI Vault</h2>
        <p className="text-gray-500 mt-1 text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>Store and serve AI-generated content via Shelby Media Kit</p>
      </div>

      <div className="bg-gradient-to-br from-fuchsia-500/8 to-transparent border border-fuchsia-800/15 rounded-3xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">{'\u2B21'}</span>
          <h3 className="text-white font-bold" style={{ fontFamily: 'Quicksand, sans-serif' }}>AI Content Pipeline</h3>
          <span className="text-[10px] text-fuchsia-400 bg-fuchsia-400/10 px-2.5 py-0.5 rounded-full font-semibold ml-auto">Media Kit</span>
        </div>
        <div className="flex gap-3">
          <input value={prompt} onChange={function(e) { setPrompt(e.target.value); }} onKeyDown={function(e) { if (e.key === 'Enter') simulateGenerate(); }}
            placeholder="Describe your AI content (e.g. cyberpunk cityscape at sunset)"
            className="flex-1 bg-[#0d0a12] border border-fuchsia-900/20 rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-fuchsia-500 transition-colors"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          />
          <button onClick={simulateGenerate} disabled={generating || !prompt.trim()}
            className="bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shrink-0"
            style={{ fontFamily: 'Quicksand, sans-serif' }}
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Generating
              </span>
            ) : 'Generate & Store'}
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-3" style={{ fontFamily: 'Quicksand, sans-serif' }}>Content is stored on Shelby with cryptographic commitment and verifiable provenance.</p>
      </div>

      <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-bold text-white mb-3" style={{ fontFamily: 'Quicksand, sans-serif' }}>Upload Existing AI Content</h3>
        <div onClick={function() { if (inputRef.current) inputRef.current.click(); }}
          className="border-2 border-dashed border-fuchsia-900/20 rounded-2xl p-8 text-center cursor-pointer hover:border-fuchsia-700/30 transition-colors"
        >
          <input ref={inputRef} type="file" className="hidden" onChange={function(e) { if (e.target.files && e.target.files[0]) { var f = e.target.files[0]; onUpload({ name: f.name, size: f.size, type: f.type, isAI: true }); }}} />
          <span className="text-2xl block mb-2 opacity-20">{'\u2B21'}</span>
          <p className="text-gray-400 text-sm font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>Drop AI-generated files here</p>
          <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>Images, videos, model outputs, datasets</p>
        </div>
      </div>

      <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Quicksand, sans-serif' }}>How Provenance Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {provenanceItems.map(function(item) {
            return (
              <div key={item.title} className="bg-[#0d0a12] border border-pink-900/10 rounded-2xl p-4">
                <span className="text-lg block mb-2">{item.icon}</span>
                <h4 className="text-white text-sm font-bold" style={{ fontFamily: 'Quicksand, sans-serif' }}>{item.title}</h4>
                <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>AI Content Library</h3>
          <span className="text-xs text-gray-500 font-semibold">{aiFiles.length + ' file(s)'}</span>
        </div>
        {aiFiles.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <span className="text-3xl block mb-3 opacity-20">{'\u2B21'}</span>
            <p className="text-sm font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>No AI content stored yet</p>
            <p className="text-xs mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>Generate or upload AI content to build your library</p>
          </div>
        ) : (
          <div className="space-y-2">
            {aiFiles.map(function(file) {
              return (
                <div key={file.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-pink-900/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 border border-fuchsia-800/15 flex items-center justify-center">
                      <span className="text-fuchsia-400 text-xs font-bold">AI</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold truncate max-w-[250px]" style={{ fontFamily: 'Quicksand, sans-serif' }}>{file.name}</p>
                      <p className="text-gray-600 text-xs font-mono truncate max-w-[200px]">{file.merkleRoot}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-fuchsia-400 bg-fuchsia-400/10 px-2 py-0.5 rounded-full font-semibold">Verified</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIVault;
