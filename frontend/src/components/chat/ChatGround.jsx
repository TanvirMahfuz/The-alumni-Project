import React from "react";
import ChatHeader from "./ChatHeader";
import InputBox from "./InputBox";
import Texts from "./Texts";
import { useChatStore } from "../../store/useChatStore.js";

function ChatGround({ onlineUsers }) {

  const {
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
    messages,
    getMessages
  } = useChatStore();

  React.useEffect(() => {
    getMessages();
      subscribeToMessages();
      return () => unSubscribeFromMessages();
  }, [selectedUser,subscribeToMessages,unSubscribeFromMessages]);
      
  return (
    <div className="bg-white h-screen flex flex-col justify-between">
      <ChatHeader user={selectedUser} />
      <Texts
        messages={messages}
        selectedUser={selectedUser}

      />
      <InputBox />
    </div>
  );
}

export default ChatGround;
