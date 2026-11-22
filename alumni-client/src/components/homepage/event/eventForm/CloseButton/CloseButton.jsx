import React from "react";

function CloseButton({ openForm, setOpenForm }) {
  return (
    <div className="flex justify-end transform translate-y-3">
      <button
        onClick={() => setOpenForm(false)}
        aria-label="Close form"
        className="mx-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 dark:bg-gray-700 text-white hover:bg-gray-500 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-cyan-500">
        ×
      </button>
    </div>
  );
}

export default CloseButton;
