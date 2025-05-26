import React from "react";
import { FaSearch } from "react-icons/fa";

function Searchbutton() {
  return (
    <div>
      {/* <button className="bg-gray-600 px-2 py-1 rounded-xl hover:bg-gray-500 hover:cursor-pointer transition-colors duration-200">
        searchuhh
      </button> */}
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
        <FaSearch className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Searchbutton;
