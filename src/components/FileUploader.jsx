import React, { useState, useRef } from 'react';

function FileUploader({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const inputRef = useRef(null);

  const stages = ['Chunking file...', 'Erasure coding...', 'Distributing to nodes...', 'Committing on-chain...'];

  const simulateUpload = (file) => {
    setUploading(true);
    setUploadProgress(0);
    let stageIdx = 0;
    setUploadStage(stages[0]);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + Math.random() * 12;
        const newStage = Math.min(Math.floor(next / 25), 3);
        if (newStage !== stageIdx) {
          stageIdx = newStage;
          setUploadStage(stages[stageIdx]);
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setUploadProgress(0);
            onUpload(file);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 180);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) simulateUpload(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Upload to Shelby</h2>
        <p className="text-gray-500 mt-1 text-sm">Files are chunked, erasure-coded, and distributed across storage providers</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer ${
          dragActive ? 'border-purple-500 bg-purple-500/5' : 'border-gray-800 hover:border-gray-700 bg-gray-900/20'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && simulateUpload(e.target.files[0])} />

        {uploading ? (
          <div className="space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full border-[3px] border-purple-500 border-t-transparent animate-spin"></div>
            <div>
              <p className="text-white font-medium">{uploadStage}</p>
              <div className="max-w-xs mx-auto mt-3">
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-200" style={{ width: `${Math.min(uploadProgress, 100)}%` }}></div>
                </div>
                <p className="text-gray-600 text-xs mt-2">{Math.min(Math.round(uploadProgress), 100)}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-900/20 border border-purple-800/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-white font-medium text-lg">Drop files here or click to browse</p>
            <p className="text-gray-600 text-sm">Images, videos, documents, AI outputs — any file type</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
        {[
          { step: '01', title: 'Chunk', desc: 'Split into ~10 MiB chunksets' },
          { step: '02', title: 'Encode', desc: 'Clay erasure coding (m=16, k=10)' },
          { step: '03', title: 'Distribute', desc: 'Send to storage providers via fiber' },
          { step: '04', title: 'Commit
