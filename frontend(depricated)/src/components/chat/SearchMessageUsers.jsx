import React from "react";
import { Search } from "lucide-react";
function SearchMessageUsers() {
  return (
    <div className="flex  items-center">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-200 p-2 rounded-md w-10/12"
      />
      <button className="w-2/12 m-2 flex justify-center items-center">
        {<Search />}
      </button>
    </div>
  );
}

export default SearchMessageUsers;
