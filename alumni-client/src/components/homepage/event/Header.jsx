import React from "react";

function Header({openForm,setOpenForm}) {
  return (
    <div className="flex justify-between items-center my-4 mx-4">
      <h1 className="text-3xl font-bold">Events</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => setOpenForm(true)}>
        Create Event
      </button>
    </div>
  );
}

export default Header;
