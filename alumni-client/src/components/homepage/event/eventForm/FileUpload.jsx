import React, { useState, useCallback } from "react";
import { imagesToBase64 } from "../../../../bin/Image2base64";
import ImageInput from "../../../common/ImageInput"; 
import ImagePreview from "../../../common/ImagePreview"; 

function FileUpload({
  label = "Upload Image",
  onFileUpload,
  accept = "image/*",
  multiple = false,
  required = false,
  className = "",
}) {
  const [base64Images, setBase64Images] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = useCallback(
    async (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) {
        if (required && base64Images.length === 0) {
          setError("Please upload at least one image.");
        }
        return;
      }

      const fileArray = Array.from(files);

      try {
        setError(null);
        const newBase64Strings = await imagesToBase64(fileArray);

        setBase64Images((prev) =>
          multiple ? [...prev, ...newBase64Strings] : [newBase64Strings[0]]
        );
        onFileUpload(
          multiple
            ? [...base64Images, ...newBase64Strings]
            : newBase64Strings[0]
        );
      } catch (err) {
        setError(err.message || "Failed to process image(s)");
        console.error("File upload error:", err);
        if (required && base64Images.length === 0) {
          setError(err.message || "Please upload an image.");
        }
      }
    },
    [multiple, onFileUpload, required, base64Images]
  );

  const handleRemovePreview = useCallback(
    (indexToRemove) => {
      const updatedImages = base64Images.filter(
        (_, index) => index !== indexToRemove
      );
      setBase64Images(updatedImages);
      onFileUpload(multiple ? updatedImages : updatedImages[0] || null);
      if (required && updatedImages.length === 0) {
        setError("Please upload at least one image.");
      } else {
        setError(null);
      }
    },
    [multiple, onFileUpload, required, base64Images]
  );

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-bold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex items-center gap-4">
        <ImageInput
          id={`image-upload-${Math.random().toString(36).substring(7)}`} // Unique ID for each instance
          onChange={handleFileChange}
          multiple={multiple}
          accept={accept}
        />
        {base64Images.length > 0 && (
          <ImagePreview images={base64Images} setImages={setBase64Images} />
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default FileUpload;
