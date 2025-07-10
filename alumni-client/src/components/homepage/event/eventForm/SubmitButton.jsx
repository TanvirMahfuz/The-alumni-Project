import React from "react";

function SubmitButton() {
  return (
    <div className="w-full flex justify-center items-center ">
      <button className="px-4 py-1.5 w-2/4 text-white bg-violet-500 hover:bg-violet-600 border-gray-600 rounded-lg shadow-2xl cursor-pointer">
        publish
      </button>
    </div>
  );
}

export default SubmitButton;
