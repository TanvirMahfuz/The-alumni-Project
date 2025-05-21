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
      <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {isChecked ? "online" : "all"}
      </span>
      <div
        className={`relative w-11 h-6 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-500 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${
          isChecked
            ? "peer-checked:bg-white dark:peer-checked:bg-gray-800"
            : "bg-gray-200"
        }`}></div>
    </label>
  );
}

export default Toggle;
