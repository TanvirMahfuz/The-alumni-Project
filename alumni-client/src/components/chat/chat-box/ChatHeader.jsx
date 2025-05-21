import React from "react";
import { optionsIcon } from "../../../assets/icons";
import { useChatStore } from "../../../store/useChatStore";
function ChatHeader() {
  const { selectedChatUser } = useChatStore();
  return (
    <div className="flex  w-full justify-between items-center ">
      <div className="flex items-center space-x-2">
        <div className="rounded-full p-1 bg-gray-500">
          <img
            src={selectedChatUser?.image ?? "./avatar.png"}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
      </div>
      <div>
          <h1 className="font-semibold text-lg">{selectedChatUser?.name??"Selected User"}</h1>
          <p className="text-gray-400">online</p>
      </div>

    </div>
    <div className="hover:bg-gray-600 cursor-pointer p-1 transition-all duration-300 rounded-full">{optionsIcon}</div>

  </div>
  );
}

export default ChatHeader;
