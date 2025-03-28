import React, { useEffect, useState } from "react";
import ChatUsers from "../components/chat/ChatUsers";
import ChatGround from "../components/chat/ChatGround";
import { X } from "lucide-react";

import { useAuthStore } from "../store/useUserStore";
import { useChatStore } from "../store/useChatStore";

function Chat() {
  const {selectedUser,setSelectedUser,removeUser} = useChatStore()
  const { authUser, onlineUsers ,connectSocket,socket } = useAuthStore();
  useEffect(()=>{
    connectSocket()
  },[authUser])
  
  return (
    <div className="grid grid-cols-12 bg-gray-100 max-h-screen">
      <ChatUsers
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <div className="col-span-12 md:col-span-8 h-screen overflow-auto">
        {selectedUser && (
          <div className="relative">
            <div
              className="absolute right-5 top-5  cursor-pointer"
              onClick={() => setSelectedUser(null)}>
              <X />
            </div>
            <ChatGround
              onlineUsers={onlineUsers ?? []}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
