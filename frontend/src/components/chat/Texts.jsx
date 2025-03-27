import React from "react";
import RegularText from "./RegularText";
function Texts({ messages,selectedChat }) {
  console.log(messages);
  return (
    <div className="overflow-auto h-full">
      {messages.map((message) => {
        if(message.text.length>0)
          return (
            <RegularText
              key={message._id}
              message={message}
              selectedChat={selectedChat}
            />
          );
      })}
    </div>
  );
}

export default Texts;
