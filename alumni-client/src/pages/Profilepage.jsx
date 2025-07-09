import React from "react";
import Profile from "../components/profile-page/Profile";
import ProfileBrief from "../components/profile-page/ProfileBrief";
import ProDem from "../components/profile-page/final-profile/ProDem.jsx";
import Tabs from "../components/profile-page/Tabs";
function Profilepage() {

  return (
    <div className="w-full md:flex bg-white">
      {/* <Profile/> */}
      <ProDem />

      {/* <div className="w-full md:w-2/5">
        <ProfileBrief />
      </div>
      <div className="w-full md:w-3/5 ">
        <Tabs/>
      </div> */}
    
    </div>
  );
}

export default Profilepage;
