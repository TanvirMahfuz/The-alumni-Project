import React from "react";

function SwitchUserType({ userType, setUserType }) {
  const baseClass =
    "text-center p-2 cursor-pointer transition duration-200 rounded-tl-2xl rounded-tr-2xl";

  const activeClass = "bg-gray-200 text-gray-800 font-semibold";
  const inactiveClass =
    "bg-white text-gray-500 hover:bg-gray-100 ";

  return (
    <div className="m-2 grid grid-cols-2 border-b border-gray-300 dark:border-gray-600">
      <div
        className={`${baseClass} ${
          userType === "all" ? activeClass : inactiveClass
        }`}
        onClick={() => setUserType("all")}>
        All
      </div>
      <div
        className={`${baseClass} ${
          userType === "online" ? activeClass : inactiveClass
        }`}
        onClick={() => setUserType("online")}>
        Online
      </div>
    </div>
  );
}

export default SwitchUserType;
