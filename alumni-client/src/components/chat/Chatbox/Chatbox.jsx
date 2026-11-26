import React from "react";
import ChatHeader from "../chat-box/ChatHeader/ChatHeader";
import ChatFooter from "../chat-box/ChatFooter/ChatFooter";
import ChatBody from "../chat-box/ChatBody/ChatBody";

function Chatbox() {

  return (
    <div className="flex flex-col justify-between h-full md:m-4 bg-white dark:bg-[#1a1a1a] md:bg-transparent md:dark:bg-transparent">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default Chatbox;
