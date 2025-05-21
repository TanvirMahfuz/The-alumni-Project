import React from "react";
import FilePreview from "./FilePreview";

const FilePreviewList = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {files.map((file, index) => (
        <FilePreview
          key={`${file.name}-${index}`}
          file={file}
          onRemove={(e) => {
            e.stopPropagation();
            onRemoveFile(index);
          }}
        />
      ))}
    </div>
  );
};

export default FilePreviewList;
