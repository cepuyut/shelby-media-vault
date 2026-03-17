import React, { useState, useRef } from 'react';

function FileUploader(props) {
  var onUpload = props.onUpload;
  var dragState = useState(false);
  var dragActive = dragState[0];
  var setDragActive = dragState[1];
  var uploadState = useState(false);
  var uploading = uploadState[0];
  var setUploading = uploadState[1];
  var progressState = useState(0);
  var uploadProgress = progressState[0];
  var setUploadProgress = progressState[1];
  var stageState = useState('');
  var uploadStage = stageState[0];
  var setUploadStage = stageState[1];
  var inputRef = useRef(null);

  var stages = ['Chunking file...', 'Erasure coding...', 'Distributing to nodes...', 'Committing on-chain...'];

  var simulateUpload = function(file) {
    setUploading(true);
    setUploadProgress(0);
    var stageIdx = 0;
    setUploadStage(stages[0]);

    var interval = setInterval(function() {
      setUploadProgress(function(prev) {
        var next = prev + Math.random() * 12;
        var newStage = Math.min(Math.floor(next / 25), 3);
        if (newStage !== stageIdx) {
          stageIdx = newStage;
          setUploadStage(stages[stageIdx]);
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(function() {
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

  var handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  var handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  var handleChange = function(e) {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  var handleClick = function() {
    if (!uploading && inputRef.current) {
      inputRef.current.click();
    }
  };

  var steps = [
    { step: '01', title: 'Chunk', desc: 'Split into ~10 MiB chunksets' },
    { step: '02', title: 'Encode', desc: 'Clay erasure coding (m=16, k=10)' },
    { step: '03', title: 'Distribute', desc: 'Send to storage providers via fiber' },
    { step: '04', title: 'Commit', desc: 'Record merkle root on Aptos' }
  ];

  var dropzoneClass = dragActive
    ? 'relative border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer border-purple-500 bg-purple-500/5'
    : 'relative border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer border-gray-800 hover:border-gray-700 bg-gray-900/20';

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Upload to Shelby</h2>
        <p className="text-gray-500 mt-1 text-sm">Files are chunked, erasure-coded, and distributed across storage providers</p>
      </div>

      <div
        className={dropzoneClass}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />

        {uploading ? (
          <div className="space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full border-[3px] border-purple-500 border-t-transparent animate-spin"></div>
            <div>
              <p className="text-white font-medium">{uploadStage}</p>
              <div className="max-w-xs mx-auto mt-3">
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-200"
                    style={{ width: Math.min(uploadProgress, 100) + '%' }}
                  ></div>
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
            <p className="text-gray-600 text-sm">{'Images, videos, documents, AI outputs \u2014 any file type'}</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
        {steps.map(function(item) {
          return (
            <div key={item.step} className="bg-gray-900/20 border border-gray-800/30 rounded-xl p-4">
              <span className="text-purple-500 font-mono text-[10px] font-bold">{item.step}</span>
              <h4 className="text-white font-medium text-sm mt-1.5">{item.title}</h4>
              <p className="text-gray-600 text-xs mt-0.5">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileUploader;
