import React from "react";

function FakeInput({ setFormOpen }) {
  return (
    <div
      className="w-10/12 h-12 bg-[#F3F3F3] rounded-full flex items-center p-4 text-md text-gray-400 hover:cursor-pointer"
      onClick={() => setFormOpen(true)}>
      Share your ideas
    </div>
  );
}

export default FakeInput;
