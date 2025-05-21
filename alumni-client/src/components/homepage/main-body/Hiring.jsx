import React from "react";
import { hiringIcon } from "../../../assets/icons";
function Hiring() {
  return (
    <div className="flex items-center px-2 py-1 rounded-xl transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-700">
      <span>{hiringIcon}</span>
      <p>Hiring</p>
    </div>
  );
}

export default Hiring;
