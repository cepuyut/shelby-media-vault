import React from 'react';
import FileCard from './FileCard';

function MediaGallery({ files }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Media Gallery</h2>
        <p className="text-gray-400 mt-1">
          All your files stored on Shelby's decentralized network
        </p>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/30 border border-gray-800 rounded-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-400 text-lg">No media files yet</p>
          <p className="text-gray-600 text-sm mt-1">
            Upload files to see them in your gallery
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaGallery;
