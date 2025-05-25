import React from "react";
import { Link } from "react-router-dom";
function Header({imgSrc,name,email}) {
  return (
    <div className="flex gap-4 items-center w-full">
      <div className="rounded-full bg-gray-500">
        <img
          src={imgSrc && imgSrc.trim() !== "" ? imgSrc: "./avatar.png"}
          alt=""
          className="h-17 w-17 rounded-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl text-white font-semibold">
          {name ?? "John Doe"}
        </h1>
        <Link>{email ?? "example@gmail.com"}</Link>
      </div>
    </div>
  );
}

export default Header;
