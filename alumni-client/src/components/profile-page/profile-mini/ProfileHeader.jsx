// ProfileHeader.jsx
import React from "react";
import AvatarSection from "./AvatarSection";
import DetailsSection from "./DetailsSection";

function ProfileHeader() {
  return (
    <div className="w-full md:flex gap-4">
      <AvatarSection />
      <DetailsSection />
    </div>
  );
}

export default ProfileHeader;
