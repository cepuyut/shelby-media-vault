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

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const copyId = () => {
    navigator.clipboard.writeText(file.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getIcon = (type) => {
    if (type.startsWith('image/')) return '🖼';
    if (type.startsWith('video/')) return '🎬';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    return '📁';
  };

  return (
    <div className="bg-gray-900/30 border border-gray-800/40 rounded-xl p-4 hover:border-purple-800/40 transition-all group">
      <div className="w-full h-28 rounded-lg bg-gradient-to-br from-gray-800/80 to-gray-900 flex items-center justify-center mb-3">
        <span className="text-3xl opacity-50">{getIcon(file.type)}</span>
      </div>

      <h4 className="text-white font-medium text-sm truncate">{file.name}</h4>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-gray-600 text-xs">{formatBytes(file.size)}</span>
        <span className="text-gray-600 text-xs">{formatDate(file.uploadedAt)}</span>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <code className="text-[10px] text-purple-400 bg-purple-900/20 px-2 py-0.5 rounded font-mono flex-1 truncate">
          {file.id}
        </code>
        <button onClick={copyId} className="text-[10px] text-gray-500 hover:text-white transition-colors shrink-0">
          {copied ? '✓' : 'Copy'}
        </button>
      </div>

      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
          <span className="text-[10px] text-gray-500">{file.chunks} chunk(s)</span>
        </div>
        {file.isGated && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Gated</span>}
        {file.isAI && <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">AI</span>}
      </div>
    </div>
  );
}

export default FileCard;
