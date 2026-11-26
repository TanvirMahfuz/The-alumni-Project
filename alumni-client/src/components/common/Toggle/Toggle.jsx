import React, { useState } from "react";

function Toggle({ isChecked, setIsChecked }) {

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="me-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        {isChecked ? "online" : "all"}
      </span>
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 peer-focus:ring-4 peer-focus:ring-blue-200 dark:peer-focus:ring-blue-900 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm ${
          isChecked
            ? "bg-[#2992FE] after:translate-x-full rtl:after:-translate-x-full after:border-white"
            : "bg-gray-200 dark:bg-gray-700 after:border-gray-300 dark:after:border-gray-600"
        }`}></div>
    </label>
  );
}

export default Toggle;
