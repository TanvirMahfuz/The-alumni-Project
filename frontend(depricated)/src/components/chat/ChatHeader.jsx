import React from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
function ChatHeader({user}) {
  return (
    <div className="bg-gray-50 py-2 px-4 flex gap-4 items-center">
      <div className="w-15 h-15 rounded-full bg-amber-500">
        <img
          src={user.image}
          alt=""
          className="object-cover w-full h-full rounded-full"
        />
      </div>
      <Typography className="font-bold text-2xl">{user.name}</Typography>
    </div>
  );
}

export default ChatHeader;
