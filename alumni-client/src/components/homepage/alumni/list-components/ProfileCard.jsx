import React from "react";

import JobBadge from "./profile-card/JobBadge";
import WorkBadge from "./profile-card/WorkBadge";
import Contacts from "./profile-card/Contacts";
import Header from "./profile-card/Header";
import Button from "./profile-card/Button";

function ProfileCard({user}) {
  return (
    <div className=" max-h-max min-w-96 flex flex-col items-center gap-4 rounded-2xl bg-gray-600 p-4 shadow-lg shadow-gray-500 border border-gray-400 transition-all duration-500">
      <Header imgSrc={user.image} name={user.name} email={user.email} />
      <Contacts />
      <JobBadge item={user.currentPost[0]} />
      <WorkBadge item={user.currentlyWorkingIn[0]} />
      <Button />
    </div>
  );
}

export default ProfileCard;
