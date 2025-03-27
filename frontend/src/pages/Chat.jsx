import React,{useEffect, useState} from "react";
import ChatUsers from "../components/chat/ChatUsers";
import ChatGround from "../components/chat/ChatGround";
import { X } from "lucide-react";
import { useGeneralStore } from "../store/useGeneralStore";

function Chat() {
  const [selectedChat, setSelectedChat] = React.useState(null);
  const { allUsers,getUsers } = useGeneralStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (

      <div className="grid grid-cols-12 bg-gray-100 max-h-screen">
        <div
          className={`col-span-12 md:col-span-4 h-screen overflow-auto ${selectedChat ? "hidden md:block" : ""}`}>
          <ChatUsers
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            users={allUsers}
          />
        </div>
        <div className="col-span-12 md:col-span-8 h-screen overflow-auto">
        {selectedChat && (
          <div className="relative">
            <div
              className="absolute right-5 top-5  cursor-pointer"
              onClick={() => setSelectedChat(null)}>
              <X />
            </div>
            <ChatGround
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
            </div>
          )}
        </div>
      </div>

  );
}

export default Chat;
