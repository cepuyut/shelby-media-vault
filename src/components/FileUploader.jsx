import React, { useState, useRef } from 'react';

function FileUploader({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const simulateUpload = (file) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate chunking and upload to Shelby network
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUpload(file);
          return 0;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Upload to Shelby</h2>
        <p className="text-gray-400 mt-1">
          Files are automatically chunked, erasure-coded, and distributed across
          storage nodes
        </p>
      </div>

      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-shelby-500 bg-shelby-500/5'
            : 'border-gray-700 hover:border-gray-600 bg-gray-900/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />

        {uploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-shelby-500 border-t-transparent animate-spin"></div>
            <p className="text-white font-medium">
              Uploading to Shelby network...
            </p>
            <div className="max-w-xs mx-auto">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-shelby-500 to-shelby-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Chunking → Erasure coding → Distributing to nodes
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-shelby-900/30 border border-shelby-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-shelby-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-lg">
                Drop files here or click to browse
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Images, videos, documents — up to 1 GB per file
              </p>
            </div>
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            step: '01',
            title: 'Chunk & Encode',
            desc: 'File is split into ~10 MiB chunksets and erasure-coded for redundancy',
          },
          {
            step: '02',
            title: 'Distribute',
            desc: 'Encoded chunks are sent to storage providers via dedicated fiber network',
          },
          {
            step: '03',
            title: 'Commit On-Chain',
            desc: 'Blob metadata and cryptographic commitment recorded on Aptos blockchain',
          },
        ].map((item) => (
          <div
            key={item.step}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-5"
          >
            <span className="text-shelby-500 font-mono text-xs">
              STEP {item.step}
            </span>
            <h4 className="text-white font-semibold mt-2">{item.title}</h4>
            <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUploader;
