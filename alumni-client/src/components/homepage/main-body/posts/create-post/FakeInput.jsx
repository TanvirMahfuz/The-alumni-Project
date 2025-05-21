import React from "react";

function FakeInput({ setFormOpen }) {
  return (
    <div
      className="w-10/12 h-15 bg-gray-700 rounded-xl flex items-center p-4 text-xl text-gray-400 hover:cursor-pointer hover:bg-gray-800"
      onClick={() => setFormOpen(true)}>
      Share your ideas
    </div>
  );
}

export default FakeInput;
