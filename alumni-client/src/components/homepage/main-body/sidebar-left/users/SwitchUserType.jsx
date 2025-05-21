import React from "react";

function SwitchUserType({userType,setUserType}) {
  return (
    <div className="m-2 grid grid-cols-2 border-b border-gray-900">
      <div
        className={`grid-cols-1 justify-center items-center cursor-pointer transition duration-200 rounded-tr-2xl rounded-tl-2xl ${
          userType === "all" ? "bg-gray-700 text-white" : "hover:bg-gray-500"
        } p-2 text-center`}
        onClick={() => setUserType("all")}>
        All
      </div>
      <div
        className={`grid-cols-1 justify-center items-center cursor-pointer transition duration-200 rounded-tr-2xl rounded-tl-2xl ${
          userType === "online" ? "bg-gray-700 text-white" : "hover:bg-gray-500"
        } p-2 text-center`}
        onClick={() => setUserType("online")}>
        Online
      </div>
    </div>
  );
}

export default SwitchUserType;
