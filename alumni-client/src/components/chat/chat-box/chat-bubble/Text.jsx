import React from "react";
import { useUserStore } from "../../../../store/useUserStore";
import TextAvatar from "./text/TextAvatar.jsx";
import TextContent from "./text/TextContent";
import TextDropdown from "./text/TextDropDown.jsx";

function Text({ message }) {
  const { authUser } = useUserStore();
  const [textOwner, setTextOwner] = React.useState();

  React.useEffect(() => {
    async function fetchUser(id) {
      try {
        const res = await fetch(`/api/user/info/${id}`);
        const data = await res.json();
        setTextOwner(data.user);
      } catch (err) {
        console.log(err);
      }
    }

    if (message.senderId === authUser._id) {
      setTextOwner(authUser);
    } else {
      fetchUser(message.senderId);
    }
  }, [message]);

  const isSender = message.senderId === authUser._id;

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
