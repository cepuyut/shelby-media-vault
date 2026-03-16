import React from 'react';

function Dashboard({ files }) {
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  const totalChunks = files.reduce((acc, f) => acc + f.chunks, 0);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const stats = [
    { label: 'Total Files', value: files.length, color: 'from-blue-500 to-blue-700' },
    { label: 'Storage Used', value: formatBytes(totalSize), color: 'from-shelby-500 to-shelby-700' },
    { label: 'Chunks Stored', value: totalChunks, color: 'from-emerald-500 to-emerald-700' },
    { label: 'Network Status', value: 'Active', color: 'from-amber-500 to-amber-700' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-400 mt-1">
          Overview of your decentralized storage on Shelby network
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${stat.color} mt-3`}></div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h3>
        {files.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No files uploaded yet</p>
            <p className="text-sm">
              Go to Upload tab to store your first file on Shelby
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {files.slice(0, 5).map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-shelby-900/50 flex items-center justify-center">
                    <span className="text-shelby-400 text-xs font-mono">
                      {file.type.split('/')[1]?.toUpperCase().slice(0, 3) || 'FILE'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{file.name}</p>
                    <p className="text-gray-500 text-xs">
                      {formatBytes(file.size)} — {file.chunks} chunk(s)
                    </p>
                  </div>
                </div>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  {file.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
