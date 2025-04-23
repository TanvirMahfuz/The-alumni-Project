import React from "react";
import { useGeneralStore } from "../../store/useGeneralStore.js";
import SearchMessageUsers from "./SearchMessageUsers.jsx";
import ChatUser from "./ChatUser.jsx";
const ChatUsers = ({ selectedUser}) => {
  const { allUsers, getUsers } = useGeneralStore();
  React.useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <div
      className={`col-span-12 md:col-span-4 h-screen overflow-auto ${
        selectedUser ? "hidden md:block" : ""
      }`}>
      <div className="flex flex-col gap-4 p-4">
        <SearchMessageUsers />
        {allUsers.map((user) => (
          <ChatUser
            key={user._id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatUsers;
