import React from "react";
import RegularText from "./RegularText";
function Texts({ messages }) {
  return (
    <div className="overflow-auto h-full">
      {messages.map((message) => {
        if (message.text.length > 0)
          return (
            <RegularText
              key={message._id}
              message={message}
            />
          );
      })}
    </div>
  );
}

export default Texts;
