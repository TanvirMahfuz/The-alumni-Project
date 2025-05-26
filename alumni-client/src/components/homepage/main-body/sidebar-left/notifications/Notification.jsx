import React from "react";

function Notification({ imageSrc }) {
  return (
    <div className="flex items-center space-x-2 p-2 border-b border-gray-200 hover:bg-[#dfeef4] hover:cursor-pointer rounded-md">
      <div className="flex justify-center items-center h-20 w-20">
        <img src="./avatar.png" alt="" />
      </div>
      <div className="text-[15px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nam.
      </div>
    </div>
  );
}

export default Notification;
