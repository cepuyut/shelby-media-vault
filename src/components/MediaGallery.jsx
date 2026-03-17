import React, { useState } from 'react';
import FileCard from './FileCard';

function MediaGallery(props) {
  var files = props.files;
  var filterState = useState('all');
  var filter = filterState[0];
  var setFilter = filterState[1];

  var filtered = files.filter(function(f) {
    if (filter === 'gated') return f.isGated;
    if (filter === 'ai') return f.isAI;
    return true;
  });

  var filters = ['all', 'gated', 'ai'];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Media Gallery</h2>
          <p className="text-gray-500 mt-1 text-sm">{files.length + ' file(s) stored on Shelby network'}</p>
        </div>
        <div className="flex gap-1 bg-gray-900/40 rounded-lg p-0.5 border border-gray-800/30">
          {filters.map(function(f) {
            return (
              <button
                key={f}
                onClick={function() { setFilter(f); }}
                className={filter === f
                  ? 'px-3 py-1 rounded-md text-xs font-medium capitalize bg-purple-600 text-white'
                  : 'px-3 py-1 rounded-md text-xs font-medium capitalize text-gray-500 hover:text-white'
                }
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/20 border border-gray-800/30 rounded-2xl">
          <span className="text-4xl block mb-4 opacity-30">{'\u229E'}</span>
          <p className="text-gray-400 text-base">{files.length === 0 ? 'No media files yet' : 'No files match this filter'}</p>
          <p className="text-gray-600 text-sm mt-1">{files.length === 0 ? 'Upload files to see them here' : 'Try a different filter'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(function(file) {
            return <FileCard key={file.id} file={file} />;
          })}
        </div>
      )}
    </div>
  );
}

export default MediaGallery;
