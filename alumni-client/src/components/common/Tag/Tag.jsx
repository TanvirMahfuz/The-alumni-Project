import React from "react";

function Tag({ Icon, label, selected, onClick, imageSrc, isActive }) {
  const isSelected = selected || isActive;

  return (
    <div
      className={`flex w-full justify-start items-center gap-2 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "bg-[#e8f2f8] dark:bg-slate-700"
            : "hover:bg-[#e8f2f8] dark:hover:bg-slate-700"
        }
      `}
      onClick={onClick}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={label}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      {Icon && <span className={`icon text-lg ${
          isSelected ? "text-[#2992FE]" : "text-gray-600 dark:text-white"
        }`}>{Icon}</span>}
      <p
        className={`truncate text-base font-medium ${
          isSelected ? "text-[#2992FE]" : "text-gray-600 dark:text-white"
        }`}>
        {label}
      </p>
    </div>
  );
}

export default Tag;
