import React from "react";

import JobBadge from "../profile-card/JobBadge/JobBadge";
import WorkBadge from "../profile-card/WorkBadge/WorkBadge";
import Contacts from "../profile-card/Contacts/Contacts";
import Header from "../profile-card/Header/Header";
import Button from "../profile-card/Button/Button";

function ProfileCard({ user }) {
  // console.log(user);
  return (
    <div
      className=" max-h-max min-w-96 flex flex-col items-center gap-4 rounded-2xl bg-white dark:bg-gray-800
      p-4 shadow-lg  transition-all duration-500">
      <Header imgSrc={user.image} name={user.name} email={user.email} />
      <Contacts item={user.contacts} />
      <JobBadge item={user.currentPost[0]} />
      <WorkBadge item={user.currentlyWorkingIn[0]} />
      <Button id={user._id} />
    </div>
  );
}

export default ProfileCard;
