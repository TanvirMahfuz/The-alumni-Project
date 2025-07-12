
import { useState } from "react";



function PDFViewer({ pdfUrl }) {
  console.log(("PDF URL:", pdfUrl));
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const handleError = (err) => {
    console.error("PDF load error:", err);
    setError("Failed to load PDF");
  };

  if (!pdfUrl || error) {
    return (
      <div className="w-full flex flex-col items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner transition-all duration-300">
        <svg
          className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No PDF found or failed to load.
        </p>
      </div>
    );
  }

      return (
        <div className="w-full h-[80vh] p-4 bg-white dark:bg-gray-900">
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            className="w-full h-full border border-gray-300 rounded-lg"
          />
        </div>
      );
    
}

export default PDFViewer;
