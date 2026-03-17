import React, { useState } from 'react';
import FileCard from './FileCard';

function MediaGallery(props) {
  var files = props.files;
  var filterState = useState('all');
  var filter = filterState[0]; var setFilter = filterState[1];
  var filtered = files.filter(function(f) { if (filter === 'gated') return f.isGated; if (filter === 'ai') return f.isAI; return true; });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>Media Gallery</h2>
          <p className="text-gray-500 mt-1 text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>{files.length + ' file(s) on Shelby network'}</p>
        </div>
        <div className="flex gap-1 bg-[#140f1e] rounded-2xl p-0.5 border border-pink-900/10">
          {['all', 'gated', 'ai'].map(function(f) {
            return (
              <button key={f} onClick={function() { setFilter(f); }}
                className={filter === f
                  ? 'px-3.5 py-1 rounded-xl text-xs font-bold capitalize bg-gradient-to-r from-pink-600 to-pink-500 text-white'
                  : 'px-3.5 py-1 rounded-xl text-xs font-medium capitalize text-gray-500 hover:text-pink-400'
                }
              >{f}</button>
            );
          })}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-[#140f1e] border border-pink-900/10 rounded-3xl">
          <span className="text-4xl block mb-4 opacity-20">{'\u229E'}</span>
          <p className="text-gray-400 text-base font-semibold" style={{ fontFamily: 'Quicksand, sans-serif' }}>{files.length === 0 ? 'No media files yet' : 'No files match this filter'}</p>
          <p className="text-gray-600 text-sm mt-1" style={{ fontFamily: 'Quicksand, sans-serif' }}>{files.length === 0 ? 'Upload files to see them here' : 'Try a different filter'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(function(file) { return <FileCard key={file.id} file={file} />; })}
        </div>
      )}
    </div>
  );
}

export default MediaGallery;
