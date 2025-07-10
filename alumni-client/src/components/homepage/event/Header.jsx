import React from "react";

function Header({ openForm, setOpenForm }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white ">
        Events
      </h1>

      <button
        type="button"
        onClick={() => setOpenForm(true)}
        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
        aria-label="Create new event">
        {/* Plus icon */}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create Event
      </button>
    </header>
  );
}

export default Header;
