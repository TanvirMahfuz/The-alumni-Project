import React from "react";

const FilePreview = ({ file, onRemove }) => {
  return (
    <div className="relative border rounded-lg overflow-hidden group">
      {file.type.startsWith("image/") ? (
        <img
          src={file.preview}
          alt={file.name}
          className="w-full h-32 object-cover"
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      ) : (
        <div className="h-32 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      )}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove ${file.name}`}>
        ×
      </button>
    </div>
  );
};

export default FilePreview;
