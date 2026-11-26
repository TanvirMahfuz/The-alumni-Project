import React from "react";
import { optionsIcon } from "../../../../assets/icons";
import { useChatStore } from "../../../../store/useChatStore";
import { useUserStore } from "../../../../store/useUserStore";
import { FaArrowLeft } from "react-icons/fa";
function ChatHeader() {
  const { selectedChatUser, setSelectedChatUser } = useChatStore();
  const { onlineUsers } = useUserStore();
  const isOnline = onlineUsers.some((u) => u?._id === selectedChatUser?._id);
  return (
    <div className="flex w-full justify-between items-center px-2 py-2 md:p-0 border-b border-gray-200 dark:border-gray-700 md:border-0">
      <div className="flex items-center gap-2 md:gap-0 md:space-x-2 min-w-0">
        {/* Mobile only: back to the chat list */}
        <button
          type="button"
          onClick={() => setSelectedChatUser(null)}
          aria-label="Back to chats"
          className="md:hidden p-2 -ml-1 rounded-full text-[#2992FE] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <FaArrowLeft className="size-5" />
        </button>
        <div className="rounded-full bg-gray-500 shrink-0">
          <img
            src={selectedChatUser?.image?.length>0? selectedChatUser.image : "/avatar.png"}
            alt=""
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover outline outline-offset-2 outline-[#2992FE]"
          />
        </div>
        <div className="min-w-0 ml-1 md:ml-0">
          <h1 className="font-semibold text-base md:text-lg text-gray-700 dark:text-gray-200 truncate">
            {selectedChatUser?.name ?? "Selected User"}
          </h1>
          <p className="text-xs md:text-base text-gray-400">{isOnline ? "online" : "offline"}</p>
        </div>
      </div>
      <div className="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer p-1 transition-all duration-300 rounded-full shrink-0">
        {optionsIcon}
      </div>
    </div>
  );
}

export default ChatHeader;
