import React, { useState,useEffect } from "react"; 
import Users from "./users/Users.jsx";
import Input from "../../../common/Input.jsx";
import SwitchUserType from "./users/SwitchUserType.jsx";
import Notifications from "./notifications/Notifications.jsx" 
import SwitchUserVNotifications from "../SwitchUserVNotifications.jsx";
import { useUserStore } from "../../../../store/useUserStore.js";

function SidebarLeft({ sidebarToggler, setSidebarToggler }) {
  const [userType, setUserType] = useState("all");
  const { onlineUsers, allUsers,getOnlineUsers,getAllUsers } = useUserStore();
  useEffect(() => {
    getOnlineUsers();
    getAllUsers();
  }, []);
  return (
    <div className="bg-gray-600 rounded-xl m-4 pb-2 transition-all ease-in-out duration-1000">
      <SwitchUserVNotifications {...{ sidebarToggler, setSidebarToggler }} />
      {sidebarToggler === "users" ? (
        <>
          <Input placeholder="Search" />
          <SwitchUserType userType={userType} setUserType={setUserType} />
          {userType === "all" ? (
            <Users users={allUsers} />
          ) : (
            <Users users={onlineUsers} />
          )}
        </>
      ) : (
        <>
          <Notifications />
        </>
      )}
    </div>
  );
}

export default SidebarLeft;
