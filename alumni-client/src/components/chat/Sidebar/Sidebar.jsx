import React from "react";
import Searchbox from "../side-bar/Searchbox/Searchbox";
import Users from "../side-bar/Users/Users";
import Toggle from "../../common/Toggle/Toggle";
import { useUserStore } from "../../../store/useUserStore";
import EmptyState from "../../common/EmptyState/EmptyState.jsx";
import { FaUserFriends } from "react-icons/fa";

function Sidebar() {
    const [isChecked, setIsChecked] = React.useState(false); 

    const { onlineUsers, allUsers,getOnlineUsers,getAllUsers } = useUserStore();
    React.useEffect(() => {
      getOnlineUsers();
      getAllUsers();
    }, []);
  return (
    <div className="bg-stone-50 dark:bg-gray-900 md:shadow-md text-black dark:text-gray-100 h-full overflow-y-auto md:mt-2 md:rounded-2xl p-2">
      <h1 className="text-gray-700 dark:text-gray-200 text-2xl font-[500] p-2">
        Chats
      </h1>
      <Searchbox />

      <div className="flex justify-between items-center px-4 transition-all ease-in-out duration-300">
        <h1 className="text-gray-700 dark:text-gray-200 text-xl font-bold p-2">Users</h1>
        <Toggle {...{ isChecked, setIsChecked }} />
      </div>

      {(() => {
        const users = isChecked ? onlineUsers : allUsers;
        if (users?.length > 0) return <Users {...{ users }} />;
        return isChecked ? (
          <EmptyState
            compact
            icon={FaUserFriends}
            title="No one is online"
            message="Switch to “all” to message someone who's offline."
          />
        ) : (
          <EmptyState
            compact
            icon={FaUserFriends}
            title="No users to chat with"
            message="People who join will show up here."
          />
        );
      })()}
    </div>
  );
}

export default Sidebar;
