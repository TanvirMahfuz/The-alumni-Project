import React from "react";

function CloseButton({ openForm, setOpenForm }) {
  return (
    <div className="flex justify-end transform translate-y-3">
      <button
        onClick={() => setOpenForm(false)}
        className="mx-3 px-2 bg-gray-300 dark:bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-white">
        X
      </button>
    </div>
  );
}

export default CloseButton;
