import React from "react";
import { formatSmartDateTime } from "../../../../../bin/DateTime.js";
function TextContent({ isSender, name, text, createdAt }) {
  return (
    <div className="flex flex-col gap-1 max-w-[320px]">
      {/* <span className="text-sm font-semibold text-gray-900 ">{name}</span> */}
      {/* <div
        className={`flex ${
          isSender ? "justify-end flex-row-reverse" : "justify-start"
        } items-center space-x-2 rtl:space-x-reverse`}>
        <span className={`text-sm font-normal text-gray-500`}>
          {(createdAt && formatSmartDateTime(createdAt)) || "Just now"}
        </span>
      </div> */}
      <div
        className={`flex flex-col max-h-max  ${
          isSender ? "items-end bg-sky-400" : "items-start bg-gray-400"
        } px-4 py-3 border-gray-200 rounded-xl leading-5`}>
        <p className="text-md text-white font-light">{text}</p>
      </div>
      <div
        className={`flex gap-3 ${
          isSender ? "justify-between flex-row-reverse" : "justify-between"
        } items-center space-x-2 rtl:space-x-reverse`}>
        <span className="text-sm font-light text-gray-500">Delivered</span>
        <span className={`text-sm font-light text-gray-500 `}>
          {(createdAt && formatSmartDateTime(createdAt)) || "Just now"}
        </span>
      </div>
    </div>
  );
}

export default TextContent;
