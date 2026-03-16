import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FileUploader from './components/FileUploader';
import MediaGallery from './components/MediaGallery';
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
        alert('Please install Petra Wallet extension');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleFileUpload = (newFile) => {
    setFiles((prev) => [
      {
        id: `blob_${Date.now()}`,
        name: newFile.name,
        size: newFile.size,
        type: newFile.type,
        uploadedAt: new Date().toISOString(),
        status: 'stored',
        chunks: Math.ceil(newFile.size / (10 * 1024 * 1024)),
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
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
          <>
            {activeTab === 'dashboard' && <Dashboard files={files} />}
            {activeTab === 'upload' && (
              <FileUploader onUpload={handleFileUpload} />
            )}
            {activeTab === 'gallery' && <MediaGallery files={files} />}
          </>
        )}
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-800">
        <p>
          Built on{' '}
          <a
            href="https://shelby.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-shelby-400 hover:text-shelby-300 transition-colors"
          >
            Shelby Protocol
          </a>{' '}
          — Decentralized Hot Storage on Aptos
        </p>
      </footer>
    </div>
  );
}

export default App;
