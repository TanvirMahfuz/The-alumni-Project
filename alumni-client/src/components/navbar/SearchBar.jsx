// src/components/SearchBar.jsx
import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ selectedOption, setSelectedOption }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  const handleDropdownSelect = (value) => {
    setSelectedOption(value);
    setDropdownOpen(false);
  };

  function handleSearch() {
    if (inputRef.current) {
      const value = inputRef.current.value;
      const category = selectedOption !== "Category" ? selectedOption : "Name";
      navigate(`/search?category=${category.toLowerCase()}&value=${value}`);
    }
  }

  return (
    <div className="flex w-[300px] sm:w-auto relative items-center border-2 rounded-3xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Dropdown */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="rounded-3xl text-gray-700 dark:text-gray-300 ps-4 pe-2 py-1.5 flex items-center space-x-2 focus:outline-none">
        <span className="text-sm">{selectedOption}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Items */}
      {dropdownOpen && (
        <div className="text-sm absolute top-10 left-2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-101 border dark:border-gray-700">
          {["Name", "Company", "Session"].map((item) => (
            <button
              key={item}
              onClick={() => handleDropdownSelect(item)}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-gray-700">
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-[180px] lg:max-w-md rounded-3xl">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search ..."
          className="px-4 py-2 w-full pe-12 rounded-3xl focus:outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 rounded-full p-2 transition duration-300 hover:cursor-pointer hover:scale-110"
          onClick={handleSearch}>
          <FaSearch className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
