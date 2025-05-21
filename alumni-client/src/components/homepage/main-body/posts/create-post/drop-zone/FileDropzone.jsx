import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DropzoneArea from "./DropzoneArea.jsx";
import FilePreviewList from "./FilePreviewList.jsx";
import { imagesToBase64 } from "../../../../../../bin/Image2base64.js";
const FileDropzone = ({ formData, setFormData }) => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const updatedFiles = [...files, ...newFiles];

      setFiles(updatedFiles);
      const updatedImages = await imagesToBase64(updatedFiles);
      setFormData((prev) => ({ ...prev, images: updatedImages }));
    },
    [files, setFormData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 5,
  });

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFormData((prev) => ({ ...prev, images: updatedFiles }));
  };

  // Clean up object URLs
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="space-y-4">
      <DropzoneArea
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
      />

      <FilePreviewList files={files} onRemoveFile={removeFile} />
    </div>
  );
};

export default FileDropzone;
