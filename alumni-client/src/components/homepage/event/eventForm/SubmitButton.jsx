import React from "react";

function SubmitButton() {
  return (
    <div className="w-full flex justify-center items-center ">
      <button className="px-4 py-1 w-1/4 bg-violet-500 hover:bg-violet-600 outline-1 border-2 border-gray-600 rounded-lg shadow-2xl cursor-pointer">
        publish
      </button>
    </div>
  );
}

export default SubmitButton;
