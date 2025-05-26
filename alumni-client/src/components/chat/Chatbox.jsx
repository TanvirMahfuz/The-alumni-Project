import React from "react";
import ChatHeader from "./chat-box/ChatHeader";
import ChatFooter from "./chat-box/ChatFooter";
import ChatBody from "./chat-box/ChatBody";

function Chatbox() {

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-90px)] m-4">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default Chatbox;
