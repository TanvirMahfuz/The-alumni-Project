import React from "react";
import { useUserStore } from "../../../../../store/useUserStore";
import { useChatStore } from "../../../../../store/useChatStore";
import TextAvatar from "../text/TextAvatar/TextAvatar.jsx";
import TextContent from "../text/TextContent/TextContent";
import TextDropdown from "../text/TextDropDown/TextDropDown.jsx";

function Text({ message }) {
  const { authUser } = useUserStore();
  const { selectedChatUser } = useChatStore();
  const isSender = message.senderId === authUser?._id;
  const textOwner = isSender ? authUser : selectedChatUser;


  return (
    <div
      className={`flex ${
        isSender ? "flex-row-reverse" : ""
      } items-start gap-2.5`}>
      <TextAvatar
        image={textOwner?.image?.length > 0 ? textOwner?.image : null}
      />
      <TextContent
        isSender={isSender}
        name={textOwner?.name}
        text={message?.text}
        createdAt={message?.createdAt}
      />
      <TextDropdown />
    </div>
  );
}

export default Text;
