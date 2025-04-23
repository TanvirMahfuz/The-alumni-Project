import React, { useRef, useEffect } from "react";
import RegularText from "./RegularText";

function Texts({ messages }) {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="overflow-auto h-full">
      {messages.map((message, index) =>
        message.text.length > 0 ? (
          <RegularText key={message._id || index} message={message} />
        ) : null
      )}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Texts;
