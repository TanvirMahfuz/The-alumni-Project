import React from "react";
import { useChatStore } from "../../../store/useChatStore.js";
import { useUserStore } from "../../../store/useUserStore.js";

function Users({ users }) {

  const { selectedChatUser, setSelectedChatUser } = useChatStore();

  return (
    <div className="bg-gray-700 rounded-lg p-2 mt-2">
      {users !== undefined &&
        users.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              setSelectedChatUser(user);
            }}
            className={`flex mb-2 items-center gap-2 space-x-2 p-2 rounded-lg hover:bg-gray-500 cursor-pointer transition-all duration-400 border-b border-gray-500 ${
              selectedChatUser?._id === user._id ? "bg-gray-800" : ""
            }`}>
            <img
              src={user?.image ? user.image : "./avatar.png"}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <span>{user.name}</span>
          </div>
        ))}
    </div>
  );
}

export default Users;
