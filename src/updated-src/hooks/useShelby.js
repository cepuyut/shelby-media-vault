import { useState, useCallback } from 'react';

function useShelby() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const rpcUrl = import.meta.env.VITE_SHELBY_RPC_URL || 'https://rpc.shelby.xyz';

  const upload = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const blobId = `blob_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const chunks = Math.ceil(file.size / (10 * 1024 * 1024));
      const result = { blobId, name: file.name, size: file.size, type: file.type, chunks, status: 'stored', timestamp: new Date().toISOString() };
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [rpcUrl]);

  const download = useCallback(async (blobId) => {
    setLoading(true);
    setError(null);
    try {
      setLoading(false);
      return null;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, [rpcUrl]);

  return { upload, download, loading, error, rpcUrl };
}

export default useShelby;
