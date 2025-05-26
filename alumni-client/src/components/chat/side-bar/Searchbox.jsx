import React from "react";

function Searchbox() {
  return (
    <div className="flex justify-end items-center space-x-2 p-4">
      <input
        type="text"
        className="w-full bg-[#f0efef] dark:bg-gray-800 text-gray-500 dark:text-white rounded-full p-2 px-5"
        placeholder="Search users"
      />
      <button className="bg-gray-200 dark:bg-gray-600 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default Searchbox;
