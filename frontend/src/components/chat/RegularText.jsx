import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useUserStore.js";
import { useChatStore } from "../../store/useChatStore.js";
function RegularText({message}) {
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();
  const user = message.senderId === selectedUser._id ? selectedUser : authUser;
  return (
    <div
      className={`m-5 flex ${
        message.senderId === selectedUser._id ? "justify-start" : "justify-end"
      }`}
      >
      <div
        className={`flex items-start gap-2.5 min-w-1/2 ${
          message.senderId === selectedUser._id ? "" : "flex-row-reverse"
        }`}>
        <img
          className="w-8 h-8 rounded-full"
          src={user.image}
          alt="profile image"
        />
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {user.name}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              11:46
            </span>
          </div>
          <p className="text-sm font-normal p-2.5 text-gray-900 bg-gray-200 rounded-lg dark:text-white">
            {message.text}
          </p>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegularText;
