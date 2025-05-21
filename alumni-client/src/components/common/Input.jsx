import React, { useState, useEffect } from "react";
import { searchIcon } from "../../assets/icons";

function Input({
  type = "text",
  placeholder = "enter your input here",
  value,
  name,
  onChange,
  onClick,
  label,
}) {

  return (
    <div className="mx-4">
      {label && (
        <label className="block text-white text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onClick={onClick}
        className="shadow appearance-none border border-gray-900 rounded-xl w-full py-3 px-3 text-white text-lg bg-gray-800 leading-tight focus:outline-1 focus:shadow-outline"
      />

    </div>
  );
}

export default Input;
