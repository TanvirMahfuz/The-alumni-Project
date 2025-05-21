import React from "react";

function Searchbox() {
  return( 
    <div className="flex justify-end items-center space-x-2 shadow-md rounded-2xl bg-gray-700 p-4">
        <input
          type="text"
          className="w-full bg-gray-800 text-white rounded-xl p-2"
          placeholder="username"
        />
        <button className="bg-gray-600 p-2 rounded-xl hover:bg-gray-700">search</button>
    </div>
    )
      

}

export default Searchbox;
