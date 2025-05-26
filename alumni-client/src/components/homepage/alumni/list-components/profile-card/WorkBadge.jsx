import React from "react";
import { Link } from "react-router-dom";

function WorkBadge({ item }) {
  return (
    <div className="w-full ">
      <p className="text-lg text-black">Working on</p>
      <div className=" mx-1 px-2 border-l-4 border-yellow-400">
        <p className="text-lg text-gray-700">
          {item?.title ?? "Senior Software developer at X org"}
        </p>
        <p className="text-md text-gray-700">{item?.techStack ?? ""}</p>
        <p className="text-gray-700">{item?.description ?? "present"}</p>
      </div>
    </div>
  );
}

export default WorkBadge;
