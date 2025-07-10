import React from "react";
import Searchbox from "./side-bar/Searchbox";
import Users from "./side-bar/Users";
import Toggle from "../../components/common/Toggle";
import { useUserStore } from "../../store/useUserStore";

function Sidebar() {
    const [isChecked, setIsChecked] = React.useState(false); 

    const { onlineUsers, allUsers,getOnlineUsers,getAllUsers } = useUserStore();
    React.useEffect(() => {
      getOnlineUsers();
      getAllUsers();
    }, []);
  return (
    <div className="bg-stone-50 shadow-md text-black h-[calc(100vh-90px)] overflow-y-auto mt-2 rounded-2xl p-2">
      <h1 className="text-gray-700 text-2xl font-[500] p-2">
        Chats
      </h1>
      <Searchbox />

      <div className="flex justify-between items-center px-4 transition-all ease-in-out duration-300">
        <h1 className="text-gray-700 text-xl font-bold p-2">Users</h1>
        <Toggle {...{ isChecked, setIsChecked }} />
      </div>

      {isChecked === false
        ? allUsers.length > 0 && <Users {...{ users: allUsers }} />
        : onlineUsers.length > 0 && <Users {...{ users: onlineUsers }} />}
    </div>
  );
}

export default Sidebar;
