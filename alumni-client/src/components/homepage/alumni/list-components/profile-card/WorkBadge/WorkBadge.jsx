import React from "react";
import { Link } from "react-router-dom";

function WorkBadge({ item }) {
  return (
    <div className="w-full ">
      <p className="text-md text-gray-500 dark:text-gray-200">Working on</p>
      <div className=" mx-1 px-2 border-l-4 border-yellow-400">
        <p className="text-lg text-gray-700  dark:text-gray-300 font-semibold">
          {item?.title ?? ""}
        </p>
        <p className="text-md text-gray-700 dark:text-gray-400">
          {item?.techStack ?? ""}
        </p>
        <p className="text-gray-700 dark:text-gray-400">
          {item?.description ?? "present"}
        </p>
      </div>
    </div>
  );
}

export default WorkBadge;
