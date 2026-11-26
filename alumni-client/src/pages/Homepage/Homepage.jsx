import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/homepage/sidebar/Sidebar";
import FloatingNav from "../../components/homepage/sidebar/FloatingNav/FloatingNav.jsx";
import Events from "../../components/homepage/event/Events.jsx";
import Mainbody from "../../components/homepage/Mainbody/Mainbody";
import Alumni from "../../components/homepage/alumni/AlumniList/AlumniList.jsx";
import Recruitment from "../../components/homepage/recruitment/Recruitment.jsx";
import Faculty from "../../components/homepage/faculty/Faculty.jsx";

import {
  documentIcon,
  eventIcon,
  facultyIcon,
  hiringIcon,
  homeIcon,
  userGroupIcon,
} from "../../assets/icons.jsx";
const menuItems = [
  { id: 0, Icon: homeIcon, label: "Home" },
  { id: 1, Icon: userGroupIcon, label: "Alumni" },
  { id: 2, Icon: eventIcon, label: "Events" },
  { id: 3, Icon: hiringIcon, label: "Hiring" },
  { id: 4, Icon: facultyIcon, label: "Faculty" },

];
function Homepage() {
  const [selectedTag, setSelectedTag] = React.useState(0);
  const location = useLocation();

  // The navbar Home button sends `state.home`; switch back to the feed tab
  React.useEffect(() => {
    if (location.state?.home) setSelectedTag(0);
  }, [location.state?.home]);

  return (
    <div className="h-screen w-screen grid grid-cols-1 lg:grid-cols-12 ">
      <div className="hidden ps-3 lg:col-span-4 xl:col-span-3 lg:block ">
        <Sidebar {...{ menuItems, selectedTag, setSelectedTag }} />
      </div>
      <div className=" col-span-1 lg:col-span-8 xl:col-span-9">
        {selectedTag === 0 && < Mainbody />}

        {selectedTag === 1 && <Alumni />}
        {selectedTag === 2 && <Events />}
        {selectedTag === 3 && <Recruitment />}
        {selectedTag === 4 && <Faculty />}
      </div>
      <FloatingNav {...{ menuItems, selectedTag, setSelectedTag }} />
    </div>
  );
}

export default Homepage;
