// AvatarSection.jsx
import React from "react";
import { useUserStore } from "../../../store/useUserStore";
function AvatarSection() {
  const { authUser } = useUserStore();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="rounded-full w-48 h-48 bg-gray-200 overflow-hidden border-4 border-white shadow-md">
        <img
          src={authUser?.image?.length>0 ? authUser.image: "./avatar.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-2xl text-white font-bold tracking-wide">
        {authUser?.name ?? "Name"}
      </div>
    </div>
  );
}

export default AvatarSection;
