import React from "react";

const DropzoneArea = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-2 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop files here...</p>
      ) : (
        <div>
          <p className="text-gray-600">
            Drag & drop files here, or click to select
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Supports: JPG, PNG, GIF, PDF
          </p>
        </div>
      )}
    </div>
  );
};

export default DropzoneArea;
