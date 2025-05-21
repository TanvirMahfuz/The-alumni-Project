import React from "react";

function Notification({ imageSrc }) {
  return <div className="flex items-center space-x-2 p-2 border-b border-gray-500 hover:bg-gray-500 hover:cursor-pointer rounded-md">
    <div className="flex justify-center items-center h-15 w-15"><img src="./avatar.png" alt="" /></div>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nam.</div>
  </div>;
}

export default Notification;
