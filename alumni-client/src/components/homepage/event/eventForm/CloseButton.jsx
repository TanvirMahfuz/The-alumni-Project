import React from "react";

function CloseButton({ openForm, setOpenForm }) {
  return (
    <div className="flex justify-end transform translate-y-3">
      <button
        onClick={() => setOpenForm(false)}
        className=" bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-white">
        X
      </button>
    </div>
  );
}

export default CloseButton;
