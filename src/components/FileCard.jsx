import React, { useState } from 'react';

function FileCard({ file }) {
  const [copied, setCopied] = useState(false);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const copyBlobId = () => {
    navigator.clipboard.writeText(file.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'IMG';
    if (type.startsWith('video/')) return 'VID';
    if (type.startsWith('audio/')) return 'AUD';
    if (type.includes('pdf')) return 'PDF';
    return 'DOC';
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-shelby-800 transition-colors group">
      {/* File icon */}
      <div className="w-full h-32 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4">
        <span className="text-2xl font-bold text-shelby-500/60 font-mono">
          {getFileIcon(file.type)}
        </span>
      </div>

      {/* File info */}
      <h4 className="text-white font-medium text-sm truncate">{file.name}</h4>
      <div className="flex items-center justify-between mt-2">
        <span className="text-gray-500 text-xs">{formatBytes(file.size)}</span>
        <span className="text-gray-500 text-xs">{formatDate(file.uploadedAt)}</span>
      </div>

      {/* Blob ID */}
      <div className="mt-3 flex items-center gap-2">
        <code className="text-xs text-shelby-400 bg-shelby-900/30 px-2 py-1 rounded font-mono flex-1 truncate">
          {file.id}
        </code>
        <button
          onClick={copyBlobId}
          className="text-xs text-gray-400 hover:text-white transition-colors shrink-0"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
        <span className="text-xs text-gray-400">
          Stored across {file.chunks} chunk(s) on Shelby network
        </span>
      </div>
    </div>
  );
}

export default FileCard;
