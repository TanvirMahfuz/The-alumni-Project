import React from "react";

function Tag({ Icon, label, selected, onClick, imageSrc, isActive }) {
  return (
    <div
      className={`flex w-full justify-start items-center gap-2 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
        !selected && "hover:bg-gray-100"
      } text-lg ${selected ? "bg-gray-200" : ""}`}
      onClick={onClick}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={label}
          className="w-10 h-10 text-black bg-black rounded-full object-cover"
        />
      )}
      {Icon && <span className="icon text-lg text-black">{Icon}</span>}
      <p className="truncate text-black">{label}</p>
    </div>
  );
}

export default Tag;
