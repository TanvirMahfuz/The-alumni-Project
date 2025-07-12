import React from "react";
import { Link } from "react-router-dom";
function Header({ imgSrc, name, email }) {
  return (
    <div className="flex gap-4 items-center w-full">
      <div className="flex rounded-full bg-gray-200 dark:bg-gray-700">
        <img
          src={imgSrc ?? "./avatar.png"}
          alt=""
          className="h-15 w-15 rounded-full object-cover ring-2 ring-teal-300"
        />
      </div>
      <div>
        <div className="flex flex-col">
          <p className="text-lg font-400 text-gray-800 dark:text-gray-200 font-semibold">
            {name ?? "Full Name"}
          </p>
          <p className="text-[13px] text-gray-600 dark:text-gray-400 ">
            {email ?? "No email Added"}
          </p>
        </div>
        {/* <h1 className="text-3xl text-white font-semibold">{name??"John Doe"}</h1> */}
        {/* <Link>{email??"example@gmail.com"}</Link> */}
      </div>
    </div>
  );
}

export default Header;
