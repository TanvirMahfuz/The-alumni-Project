import React from "react";
import { UPLOADS_DISABLED_MESSAGE } from "../../../config/uploads";

// Shown wherever a file picker would normally be
function UploadUnavailable({ compact = false, className = "" }) {
  if (compact) {
    return (
      <p
        role="status"
        className={`text-sm text-amber-700 dark:text-amber-300 ${className}`}>
        {UPLOADS_DISABLED_MESSAGE}
      </p>
    );
  }
  return (
    <div
      role="status"
      className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 text-center text-sm
        border-gray-300 text-gray-500 bg-gray-50
        dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 ${className}`}>
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
      <span>{UPLOADS_DISABLED_MESSAGE}</span>
    </div>
  );
}

export default UploadUnavailable;
