import React from "react";
import ProfileHeader from "./profile-mini/ProfileHeader";
import { useUserStore } from "../../store/useUserStore";
function Profile() {
  const { authUser } = useUserStore();
  return (
    <div className=" ">
        <ProfileHeader />
    </div>
  );
}

export default Profile;
