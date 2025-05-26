import React from "react";
import Profile from "../components/profile-page/Profile";
import ProfileBrief from "../components/profile-page/ProfileBrief";
import ProDem from "../components/profile-page/ProDem";
import Tabs from "../components/profile-page/Tabs";
function Profilepage() {

  return (
    <div className="w-full md:flex bg-white">
      <div className="w-full md:w-2/5">
        <ProfileBrief />
      </div>
      <div className="w-full md:w-3/5 ">
        <Tabs/>
      </div>
    
    </div>
  );
}

export default Profilepage;
