import React, { useState, useEffect } from "react";
import Users from "./users/Users.jsx";
import Input from "../../../common/Input.jsx";
import SwitchUserType from "./users/SwitchUserType.jsx";
import Notifications from "./notifications/Notifications.jsx";
import SwitchUserVNotifications from "../SwitchUserVNotifications.jsx";
import { useUserStore } from "../../../../store/useUserStore.js";

function SidebarLeft({ sidebarToggler, setSidebarToggler }) {
  const [userType, setUserType] = useState("all");
  const { onlineUsers, allUsers, getOnlineUsers, getAllUsers } = useUserStore();

  useEffect(() => {
    getOnlineUsers();
    getAllUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl m-4 pb-2 transition-colors duration-1000 ease-in-out">
      {/* Uncomment if you want to use this */}
      {/* <SwitchUserVNotifications {...{ sidebarToggler, setSidebarToggler }} /> */}

      {sidebarToggler === "users" ? (
        <div className="pt-8 px-2">
          <Input
            placeholder="Search"
            className="mt-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg transition-colors"
          />
          <SwitchUserType userType={userType} setUserType={setUserType} />
          {userType === "all" ? (
            <Users users={allUsers} />
          ) : (
            <Users users={onlineUsers} />
          )}
        </div>
      ) : (
        <div className="px-4">
          <Notifications />
        </div>
      )}
    </div>
  );
}

export default SidebarLeft;
