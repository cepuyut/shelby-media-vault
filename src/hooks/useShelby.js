import { useState, useCallback } from 'react';

function useShelby() {
  var loadState = useState(false);
  var loading = loadState[0];
  var setLoading = loadState[1];
  var errState = useState(null);
  var error = errState[0];
  var setError = errState[1];

  var upload = useCallback(function(file) {
    setLoading(true);
    setError(null);
    try {
      var blobId = 'blob_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      var chunks = Math.ceil(file.size / (10 * 1024 * 1024));
      var result = { blobId: blobId, name: file.name, size: file.size, type: file.type, chunks: chunks, status: 'stored', timestamp: new Date().toISOString() };
      setLoading(false);
      return Promise.resolve(result);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return Promise.reject(err);
    }
  }, []);

  var download = useCallback(function(blobId) {
    setLoading(true);
    setError(null);
    setLoading(false);
    return Promise.resolve(null);
  }, []);

  return { upload: upload, download: download, loading: loading, error: error };
}

export default useShelby;
