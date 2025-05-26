import React from "react";
import { userGroupIcon, bellIcon } from "../../../assets/icons";
function SwitchUserVNotifications({ sidebarToggler, setSidebarToggler }) {
  return (
    <div className="flex justify-start bg-stone-100 dark:bg-gray-700 rounded-tr-2xl rounded-tl-2xl gap-4 items-center border-b border-gray-500 px-4 pt-2 mb-4 ">
      <div
        onClick={() => setSidebarToggler("users")}
        className={
          sidebarToggler === "users"
            ? `bg-stone-200 dark:bg-gray-600 rounded-tr-xl rounded-tl-xl px-3 py-1 transition-all ease-in-out duration-1000`
            : ""
        }>
        {userGroupIcon}
      </div>
      <div
        onClick={() => setSidebarToggler("notifications")}
        className={
          sidebarToggler === "notifications"
            ? `bg-stone-200 dark:bg-gray-600 rounded-tr-xl rounded-tl-2xl px-3 py-1 transition-all ease-in-out duration-1000`
            : ""
        }>
        {bellIcon}
      </div>
    </div>
  );
}

export default SwitchUserVNotifications;
