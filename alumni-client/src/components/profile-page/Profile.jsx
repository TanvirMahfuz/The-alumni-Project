import React from "react";
import ProfileHeader from "./profile-mini/ProfileHeader";
import UpdateProfile from "./updateProfile/UpdateProfile";
import { useUserStore } from "../../store/useUserStore";

function Profile() {
  const { authUser } = useUserStore();
  return (
    <div className=" ">
      <ProfileHeader />
      <UpdateProfile />
    </div>
  );
}

export default Profile;
