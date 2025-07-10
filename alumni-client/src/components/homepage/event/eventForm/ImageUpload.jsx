import React, { useState, useEffect } from "react";
import { imagesToBase64 } from "../../../../bin/Image2base64";

function ImageUpload({ image, setImage }) {
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (image && typeof image === "string" && image.startsWith("data:image")) {
      // Use base64 string for preview
      setPreview(image);
    } else {
      setPreview("");
    }
  }, [image]);

  const handleFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      setImage(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      setImage(null);
      return;
    }

    try {
      const [base64] = await imagesToBase64([file]); // Await base64 conversion
      setImage(base64); // Store base64 string in state
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to process image.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // prevent triggering upload dialog
    setImage(null);
    setError("");
  };

  return (
    <div className="">
      <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Event Image
      </label>

      <div
        className={`h-48 relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ease-in-out cursor-pointer ${
          isDragging
            ? "border-cyan-500 bg-cyan-50 dark:bg-gray-700"
            : "border-gray-300 hover:border-cyan-400 dark:border-gray-600"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("image-upload").click()}>
        {preview ? (
          <>
            <img
              src={preview}
              alt="Uploaded"
              className="w-full h-40 object-cover rounded-md mx-auto"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 text-red-500 dark:text-gray-100 hover:text-red-500 hover:text-shadow-red-500 hover:scale-110 dark:hover:text-white transition"
              aria-label="Remove image">
              ✕
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
            <svg
              className={`w-12 h-12 transition-colors duration-200 ${
                isDragging ? "text-cyan-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 15a4 4 0 018 0m-8 0a4 4 0 018 0m-8 0v6m8-6a4 4 0 018 0v6M5 21h14a2 2 0 002-2v-5.586a1 1 0 00-.293-.707l-4.707-4.707a1 1 0 00-1.414 0L12 13l-2.586-2.586a1 1 0 00-1.414 0L3 15.414A1 1 0 003 16.586V19a2 2 0 002 2z"
              />
            </svg>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="text-cyan-600 hover:underline cursor-pointer">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, JPEG (Max 10MB)
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 border border-red-300 p-3 rounded-md animate-fade-in mt-2">
          {error}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
