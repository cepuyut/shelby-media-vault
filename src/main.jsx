import React from 'react';
import ReactDOM from 'react-dom/client';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import App from './App';
import './index.css';

function Root() {
  return (
    <AptosWalletAdapterProvider autoConnect={false} optInWallets={['Petra']}>
      <App />
    </AptosWalletAdapterProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
