import React from "react";

import Sidebar from "../../components/chat/Sidebar/Sidebar";
import Chatbox from "../../components/chat/Chatbox/Chatbox";
import ChatBoxSkeleton from "../../skeleton/ChatBoxSkeleton";

import { useChatStore } from "../../store/useChatStore";
function Chatpage() {
  const { selectedChatUser } = useChatStore();
  return (
    // Mobile (< md): Messenger-style, the chat list OR the open conversation fills the screen.
    // Desktop: list and conversation side by side.
    <div className="h-[calc(100dvh-64px)] md:h-[calc(100dvh-90px)] w-full md:w-[calc(100vw-40px)] md:mx-4 md:mb-4 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
      <div className={`md:col-span-4 min-h-0 ${selectedChatUser ? "hidden md:block" : "block"}`}>
        <Sidebar />
      </div>

      <div className={`md:col-span-8 min-h-0 ${selectedChatUser ? "block" : "hidden md:block"}`}>
        {selectedChatUser ? <Chatbox /> : <ChatBoxSkeleton />}
      </div>
    </div>
  );
}

export default Chatpage;
