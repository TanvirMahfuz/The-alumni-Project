import React from "react";
import ChatHeader from "./ChatHeader";
import InputBox from "./InputBox";
import Texts from "./Texts";
import axios from "axios";
function ChatGround({ selectedChat, setSelectedChat }) {
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get("/server/chat/get-messages/" + selectedChat._id);
      setMessages(data);
    };
    getMessages();
  }, [selectedChat]);
  return (
    <div className="bg-white h-screen flex flex-col justify-between">
      <ChatHeader user={selectedChat} />
      <Texts
        messages={messages}
        setMessages={setMessages}
        selectedChat={selectedChat}
      />
      <InputBox setMessages={setMessages} selectedChat={selectedChat} />
    </div>
  );
}

export default ChatGround;
