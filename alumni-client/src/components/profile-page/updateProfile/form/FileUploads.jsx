import React, { useState } from "react";
import { useUserStore } from "../../../../store/useUserStore";
import { pdfsToBase64 } from "../../../../bin/pdf2base64"; // Ensure this path is correct

function FileUploads({ formData, setFormData }) {
  const { authUser } = useUserStore();
  // Initialize fileName state from authUser.resume, or an empty string
  const [fileName, setFileName] = useState(
    authUser?.resume ? "resume.pdf" : ""
  ); // Assuming authUser.resume holds a base64 string, we just need a display name
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  // Effect to set initial fileName if authUser.resume exists
  // This helps if the resume is already loaded and you want to show its presence
  React.useEffect(() => {
    if (authUser?.resume) {
      // If authUser.resume is a base64 string, you might not have the original file name.
      // You could store the file name alongside the base64, or just display a generic "resume.pdf"
      setFileName("resume.pdf"); // Or whatever default name you prefer for an existing file
    } else {
      setFileName(""); // No resume, no file name
    }
  }, [authUser]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic file type and size validation
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFileName("");
      setFormData((prevData) => ({ ...prevData, resume: null })); // Clear resume in formData
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      // 50 MB
      setError("File size exceeds 50MB limit.");
      setFileName("");
      setFormData((prevData) => ({ ...prevData, resume: null })); // Clear resume in formData
      return;
    }

    try {
      setError("");
      // Convert the file to base64
      const [result] = await pdfsToBase64([file]); // Note the array wrapper for pdfsToBase64
      setFileName(file.name); // Store the actual file name for display
      console.log("Base64 result:", result);

      // *** UPDATE FORMDATA HERE ***
      setFormData((prevData) => ({ ...prevData, resume: result }));
    } catch (error) {
      setFileName("");
      setError(error.message);
      setFormData((prevData) => ({ ...prevData, resume: null })); // Clear resume in formData on error
      console.error("Error converting PDF:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];

    if (!file) return;

    // Basic file type and size validation for drop
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFileName("");
      setFormData((prevData) => ({ ...prevData, resume: null })); // Clear resume in formData
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      // 50 MB
      setError("File size exceeds 50MB limit.");
      setFileName("");
      setFormData((prevData) => ({ ...prevData, resume: null })); // Clear resume in formData
      return;
    }

    try {
      setError("");
      // Convert the file to base64
      const [result] = await pdfsToBase64([file]); // Note the array wrapper
      setFileName(file.name); // Store the actual file name for display
      console.log("Base64 result:", result);

      // *** UPDATE FORMDATA HERE ***
      setFormData((prevData) => ({ ...prevData, resume: result }));
    } catch (error) {
      setFileName("");
      setError(error.message);
      setFormData((prevData) => ({ ...prevData, resume: null })); // Clear resume in formData on error
      console.error("Error converting PDF:", error);
    }
  };

  const handleRemoveFile = () => {
    setFileName(""); // Clear the displayed file name
    setError(""); // Clear any errors
    // *** UPDATE FORMDATA TO NULL WHEN FILE IS REMOVED ***
    setFormData((prevData) => ({ ...prevData, resume: null }));
  };

  return (
    <div className="space-y-4 mt-6">
      {" "}
      {/* Increased space-y for better separation */}
      <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-200">
        File Uploads
      </h3>{" "}
      {/* Added a heading */}
      <label
        htmlFor="resume-upload"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Resume
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ease-in-out
          ${
            isDragging
              ? "border-teal-500 bg-blue-50"
              : "border-gray-300 hover:border-teal-300" // Subtle hover effect
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <div className="flex flex-col items-center justify-center space-y-3">
          <svg
            className={`w-12 h-12 transition-colors duration-200 ${
              isDragging ? "text-teal-500" : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-teal-600 hover:text-teal-700 cursor-pointer">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF (Max. 50MB)</p>
          </div>

          <input
            type="file"
            className="hidden" // Keep the actual input hidden
            id="resume-upload"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label
            htmlFor="resume-upload"
            className="mt-3 px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-sm
                       hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                       focus:ring-teal-500 cursor-pointer transition duration-200 ease-in-out">
            Browse Files
          </label>
        </div>
      </div>
      {error && (
        <div className="text-sm text-red-700 bg-red-100 border border-red-200 p-3 rounded-md animate-fade-in">
          {" "}
          {/* Enhanced error styling */}
          {error}
        </div>
      )}
      {fileName && (
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md border border-gray-200 shadow-sm">
          {" "}
          {/* Enhanced file display styling */}
          <div className="flex items-center space-x-3">
            {" "}
            {/* Increased space-x */}
            <svg
              className="w-5 h-5 text-blue-500" // Changed icon color
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-800 truncate max-w-xs">
              {" "}
              {/* Darker text */}
              {fileName}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200" // Enhanced remove button
            aria-label="Remove uploaded resume">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUploads;
