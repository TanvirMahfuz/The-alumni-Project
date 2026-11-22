import React from "react";
import ChatHeader from "../chat-box/ChatHeader/ChatHeader";
import ChatFooter from "../chat-box/ChatFooter/ChatFooter";
import ChatBody from "../chat-box/ChatBody/ChatBody";

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
