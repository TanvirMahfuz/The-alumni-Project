import React from "react";
import { useUserStore } from "../../../../../../store/useUserStore.js";
import { formatSmartDateTime } from "../../../../../../bin/DateTime.js";
function Header() {
  const { authUser } = useUserStore();
  return (
    <div className="flex justify-start gap-4 items-center">
      <div className="rounded-full h-17 w-17 bg-gray-500 p-1 overflow-hidden">
        <img
          src={authUser?.image || "./avatar.png"}
          alt="profile-picture"
          className="rounded-full h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "./avatar.png";
          }}
        />
      </div>
      <div>
        <p className="text-xl font-semibold">{authUser?.name || "Full Name"}</p>
        <p className="text-sm font-normal text-gray-500">
          {authUser?.createdAt ? formatSmartDateTime(Date.now()) : "New User"}
        </p>
      </div>
    </div>
  );
}

export default Header;
