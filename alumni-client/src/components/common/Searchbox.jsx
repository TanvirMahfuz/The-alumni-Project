import React from "react";

function Searchbox() {
  return <div className="md:w-1/2">
      <input
        type="text"
        className="bg-gray-600 w-full min-w-52 rounded-lg px-2 py-1"
        placeholder="Search"
      />
  </div>;
}

export default Searchbox;
