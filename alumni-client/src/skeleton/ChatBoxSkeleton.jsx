import React from "react";
import { messagesIcon } from "../assets/icons";
function ChatBoxSkeleton() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="flex flex-col items-center justify-center gap-2 text-gray-300 text-2xl font-bold">
        {messagesIcon} <span>Select a user to start chatting</span>
      </h1>
    </div>
  );
}

export default ChatBoxSkeleton;
