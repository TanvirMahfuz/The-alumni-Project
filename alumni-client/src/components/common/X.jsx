
import React from "react";
import { xMarkIcon } from "../../assets/icons";
const X = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute flex items-center justify-center bg-red-500 rounded-full p-1 h-8 w-8 right-[-5px] top-[-5px] text-white text-xl">
    {xMarkIcon}
  </button>
);

export default X;
