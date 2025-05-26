import React from "react";
import { Link } from "react-router-dom";
function Header({ imgSrc, name, email }) {
  return (
    <div className="flex gap-4 items-center w-full">
      <div className="flex rounded-full bg-gray-500">
        <img
          src={imgSrc ?? "./avatar.png"}
          alt=""
          className="h-15 w-15 rounded-full object-cover"
        />
      </div>
      <div>
        <div className="flex flex-col">
          <p className="text-lg font-400 text-gray-800 font-semibold">
            {name ?? "Full Name"}
          </p>
          <Link className="text-[13px] text-gray-400 dark:text-gray-300">
            {email ?? "No email Added"}
          </Link>
        </div>
        {/* <h1 className="text-3xl text-white font-semibold">{name??"John Doe"}</h1> */}
        {/* <Link>{email??"example@gmail.com"}</Link> */}
      </div>
    </div>
  );
}

export default Header;
