import React from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
function ChatUser({ index, user, setSelectedChat, selectedChat }) {
  return (
    <div
      key={index}
      onClick={() => setSelectedChat(user)}
    
      className={`flex items-center justify-between p-2 rounded-md ${selectedChat==user && "bg-gray-300"} hover:bg-gray-300 cursor-pointer`}>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full">
          <img
            src={user.image}
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="ml-2">
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Last Message
          </Typography>
        </div>
      </div>
      <div className="flex items-center">
        <Typography variant="small" color="gray" className="font-normal">
          12:30 PM
        </Typography>
        <Button variant="text" size="sm" color="blue-gray" className="ml-2">
          <i className="bi bi-three-dots-vertical"></i>
        </Button>
      </div>
    </div>
  );
}

export default ChatUser;
