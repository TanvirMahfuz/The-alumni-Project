import React from "react";
import { formatSmartDateTime } from "../../../../../bin/DateTime.js";
function TextContent({ isSender, name, text, createdAt }) {
  return (
    <div className="flex flex-col gap-1 max-w-[320px]">
      <div
        className={`flex ${
          isSender ? "justify-end" : "justify-start"
        } items-center space-x-2 rtl:space-x-reverse`}>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {name}
        </span>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {(createdAt && formatSmartDateTime(createdAt)) || "Just now"}
        </span>
      </div>
      <div
        className={`flex flex-col ${
          isSender ? "items-end" : "items-start"
        } leading-1.5 px-4 py-2 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700`}>
        <p className="text-sm font-normal text-gray-900 dark:text-white">
          {text}
        </p>
      </div>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Delivered
      </span>
    </div>
  );
}

export default TextContent;
