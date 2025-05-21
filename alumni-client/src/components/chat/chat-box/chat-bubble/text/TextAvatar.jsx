import React from "react";

function TextAvatar({ image }) {
  return (
    <img
      className="w-8 h-8 rounded-full"
      src={image || "./avatar.png"}
      alt="Sender"
    />
  );
}

export default TextAvatar;
