import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} 
    className="border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
export default MyDropzone;