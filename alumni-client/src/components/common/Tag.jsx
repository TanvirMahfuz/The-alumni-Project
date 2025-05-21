import React from "react";

function Tag({ Icon, label, selected, onClick, imageSrc, isActive }) {
  return (
    <div
      className={`flex w-full justify-start items-center gap-2 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
        !selected && "hover:bg-gray-500"
      } text-lg ${selected ? "bg-gray-700" : ""}`}
      onClick={onClick}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={label}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      {Icon && <span className="icon text-lg">{Icon}</span>}
      <p className="truncate">{label}</p>
    </div>
  );
}

export default Tag;
