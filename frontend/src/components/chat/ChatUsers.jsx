import React from "react";

import SearchMessageUsers from "./SearchMessageUsers";
import ChatUser from "./ChatUser";
const ChatUsers = ({ selectedChat, setSelectedChat, users}) => {

  return <div className="flex flex-col gap-4 p-4">
      <SearchMessageUsers />
      {users.map((user) => (
        <ChatUser key={user._id} user={user} selectedChat = {selectedChat} setSelectedChat={setSelectedChat} />
      ))}
  </div>;
};

export default ChatUsers;
