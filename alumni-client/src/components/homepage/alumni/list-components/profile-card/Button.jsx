import React from "react";

function Button() {
  return (
    <button
      className="w-11/12 mx-auto bg-gradient-to-r opacity-70 from-sky-500 to-blue-600 hover:opacity-100
                 rounded-full py-1 text-xl font-semibold text-white shadow-lg
                 transition-all duration-300 transform hover:translate-y-[-2px]
                 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75
                 flex items-center justify-center
                 bg-size-200 bg-pos-0
                 hover:bg-pos-100 cursor-pointer
                 border border-transparent hover:border-purple-400/50">
      <span className="whitespace-nowrap">View Profile</span>
    </button>
  );
}

export default Button;
