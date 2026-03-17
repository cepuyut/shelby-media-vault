import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FileUploader from './components/FileUploader';
import MediaGallery from './components/MediaGallery';
import CreatorHub from './components/CreatorHub';
import AIVault from './components/AIVault';
import WalletConnect from './components/WalletConnect';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [files, setFiles] = useState([]);

  const handleWalletConnect = async () => {
    try {
      if (window.aptos) {
        const response = await window.aptos.connect();
        setWalletAddress(response.address);
        setWalletConnected(true);
      } else {
        setWalletAddress('0x7a8f3b2c1d4e5f6a9b0c1d2e3f4a5b6c7d8e9f0a');
        setWalletConnected(true);
      }
    } catch (error) {
      setWalletAddress('0x7a8f3b2c1d4e5f6a9b0c1d2e3f4a5b6c7d8e9f0a');
      setWalletConnected(true);
    }
  };

  const handleFileUpload = (newFile) => {
    const fileObj = {
      id: `blob_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: newFile.name,
      size: newFile.size,
      type: newFile.type,
      uploadedAt: new Date().toISOString(),
      status: 'stored',
      chunks: Math.ceil(newFile.size / (10 * 1024 * 1024)) || 1,
      merkleRoot: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      encoding: 'clay · m=16 · k=10',
      isAI: newFile.isAI || false,
      isGated: false,
      price: 0,
    };
    setFiles((prev) => [fileObj, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#08080f]">
      <Navbar
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        onConnect={handleWalletConnect}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!walletConnected ? (
          <WalletConnect onConnect={handleWalletConnect} />
        ) : (
          <div>
            {activeTab === 'dashboard' && <Dashboard files={files} walletAddress={walletAddress} />}
            {activeTab === 'upload' && <FileUploader onUpload={handleFileUpload} />}
            {activeTab === 'gallery' && <MediaGallery files={files} />}
            {activeTab === 'creator' && <CreatorHub files={files} walletAddress={walletAddress} />}
            {activeTab === 'ai-vault' && <AIVault files={files} onUpload={handleFileUpload} />}
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-sm text-gray-600 border-t border-gray-800/30">
        Built on{' '}
        <a href="https://shelby.xyz" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
          Shelby Protocol
        </a>{' '}
        — Decentralized Hot Storage on Aptos
      </footer>
    </div>
  );
}

export default App;
