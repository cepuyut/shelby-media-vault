import React, { useState } from 'react';

function FileCard(props) {
  var file = props.file;
  var copyState = useState(false);
  var copied = copyState[0]; var setCopied = copyState[1];
  var formatBytes = function(bytes) { if (bytes === 0) return '0 B'; var k = 1024; var sizes = ['B', 'KB', 'MB', 'GB']; var i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]; };
  var formatDate = function(iso) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); };
  var copyId = function() { navigator.clipboard.writeText(file.id); setCopied(true); setTimeout(function() { setCopied(false); }, 1500); };
  var getIcon = function(type) { if (type.startsWith('image/')) return '\uD83D\uDDBC'; if (type.startsWith('video/')) return '\uD83C\uDFAC'; if (type.startsWith('audio/')) return '\uD83C\uDFB5'; return '\uD83D\uDCC1'; };

  return (
    <div className="bg-[#140f1e] border border-pink-900/10 rounded-2xl p-4 hover:border-pink-800/25 transition-all hover:shadow-lg hover:shadow-pink-900/5">
      <div className="w-full h-28 rounded-xl bg-gradient-to-br from-pink-900/10 to-[#0d0a12] flex items-center justify-center mb-3">
        <span className="text-3xl opacity-40">{getIcon(file.type)}</span>
      </div>
      <h4 className="text-white font-semibold text-sm truncate" style={{ fontFamily: 'Quicksand, sans-serif' }}>{file.name}</h4>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-gray-600 text-xs">{formatBytes(file.size)}</span>
        <span className="text-gray-600 text-xs">{formatDate(file.uploadedAt)}</span>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <code className="text-[10px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-lg font-mono flex-1 truncate">{file.id}</code>
        <button onClick={copyId} className="text-[10px] text-gray-500 hover:text-pink-400 transition-colors shrink-0">{copied ? '\u2713' : 'Copy'}</button>
      </div>
      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400"></span><span className="text-[10px] text-gray-500">{file.chunks} chunk(s)</span></div>
        {file.isGated && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full font-semibold">Gated</span>}
        {file.isAI && <span className="text-[10px] text-fuchsia-400 bg-fuchsia-400/10 px-2 py-0.5 rounded-full font-semibold">AI</span>}
      </div>
    </div>
  );
}

export default FileCard;
