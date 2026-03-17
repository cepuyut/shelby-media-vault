import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FileUploader from './components/FileUploader';
import MediaGallery from './components/MediaGallery';
import CreatorHub from './components/CreatorHub';
import AIVault from './components/AIVault';
import WalletConnect from './components/WalletConnect';

function App() {
  var wallet = useWallet();
  var connected = wallet.connected;
  var account = wallet.account;

  var demoState = useState(false);
  var isDemo = demoState[0];
  var setIsDemo = demoState[1];
  var demoAddr = useState('');
  var demoAddress = demoAddr[0];
  var setDemoAddress = demoAddr[1];
  var tabState = useState('dashboard');
  var activeTab = tabState[0];
  var setActiveTab = tabState[1];
  var filesState = useState([]);
  var files = filesState[0];
  var setFiles = filesState[1];

  var isConnected = connected || isDemo;
  var walletAddress = connected ? String(account && account.address ? account.address : '') : demoAddress;

  var handleDemo = function() {
    setIsDemo(true);
    setDemoAddress('0x7a8f3b2c1d4e5f6a9b0c1d2e3f4a5b6c7d8e9f0a');
  };

  var handleFileUpload = function(newFile) {
    var fileObj = {
      id: 'blob_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      name: newFile.name,
      size: newFile.size,
      type: newFile.type,
      uploadedAt: new Date().toISOString(),
      status: 'stored',
      chunks: Math.ceil(newFile.size / (10 * 1024 * 1024)) || 1,
      merkleRoot: '0x' + Array.from({ length: 40 }, function() { return Math.floor(Math.random() * 16).toString(16); }).join(''),
      encoding: 'clay m=16 k=10',
      isAI: newFile.isAI || false,
      isGated: false,
      price: 0
    };
    setFiles(function(prev) { return [fileObj].concat(prev); });
  };

  return (
    <div className="min-h-screen bg-[#0d0a12] bg-noise">
      <Navbar
        walletConnected={isConnected}
        walletAddress={walletAddress}
        isDemo={isDemo}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          <WalletConnect onDemo={handleDemo} />
        ) : (
          <div className="animate-fade-up">
            {activeTab === 'dashboard' && <Dashboard files={files} walletAddress={walletAddress} />}
            {activeTab === 'upload' && <FileUploader onUpload={handleFileUpload} />}
            {activeTab === 'gallery' && <MediaGallery files={files} />}
            {activeTab === 'creator' && <CreatorHub files={files} walletAddress={walletAddress} />}
            {activeTab === 'ai-vault' && <AIVault files={files} onUpload={handleFileUpload} />}
          </div>
        )}
      </main>
      <footer className="text-center py-8 text-sm text-gray-600 border-t border-pink-900/10">
        {'Built on '}
        <a href="https://shelby.xyz" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors font-medium">
          Shelby Protocol
        </a>
        {' \u2014 Decentralized Hot Storage on Aptos'}
      </footer>
    </div>
  );
}

export default App;
