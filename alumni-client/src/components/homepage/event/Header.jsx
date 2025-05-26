import React from "react";

function Header({ openForm, setOpenForm }) {
  return (
    <div className="flex justify-between items-center my-4 mx-4">
      <h1 className="text-3xl font-bold">Events</h1>

      <button
        className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 bg-blue-50 hover:bg-blue-100 transition-all"
        onClick={() => setOpenForm(true)}>
        <span className="">+ Create an Event</span>
      </button>
    </div>
  );
}

export default Header;
