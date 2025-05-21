import React from "react";
import avatar from "../../../../../assets/avatar.png";
import Notification from "./Notification";
function Notifications() {
  return <div className="m-2 py-2 space-y-1 overflow-y-auto max-h-screen">
      <Notification imageSrc={avatar} />
      <Notification/>
      <Notification/>
      <Notification/>
      <Notification/>
  </div>;
}

export default Notifications;

