import React from "react";
import MiniProfile from "./sidebar/Miniprofile.jsx";
import Menublock from "./sidebar/Menublock.jsx";
import Companies from "./sidebar/Companies.jsx";
function Sidebar({ menuItems, selectedTag, setSelectedTag }) {
  return (
    <div className="space-y-4 m-4">
      <MiniProfile />
      <Menublock {...{ menuItems, selectedTag, setSelectedTag }} />
      {/* <Companies /> */}
    </div>
  );
}

export default Sidebar;
