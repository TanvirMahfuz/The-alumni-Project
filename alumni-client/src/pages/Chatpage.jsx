import React from "react";

import Sidebar from "../components/chat/Sidebar";
import Chatbox from "../components/chat/Chatbox";
import ChatBoxSkeleton from "../skeleton/ChatBoxSkeleton";

import { useChatStore } from "../store/useChatStore";
function Chatpage() {
  const { selectedChatUser } = useChatStore();
  return (
    <div className="h-[calc(100vh-90px)] w-[calc(100vw-40px)] mx-4 mb-4 grid grid-cols-12 overflow-hidden">
      <div className="col-span-4 ">
        <Sidebar />
      </div>

      <div className="col-span-8">
        {selectedChatUser ? <Chatbox /> : <ChatBoxSkeleton />}
      </div>
    </div>
  );
}

export default Chatpage;
