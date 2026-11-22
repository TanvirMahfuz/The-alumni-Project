import React from "react";

function TextAvatar({ image }) {
  return (
    <div className="h-full flex items-start justify-start">
      <img
        className="w-11 h-11 rounded-full object-cover "
        src={image || "./avatar.png"}
        alt="Sender"
      />
    </div>
  );
}

export default TextAvatar;
