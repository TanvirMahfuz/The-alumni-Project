import React from "react";
import Sidebar from "../components/homepage/Sidebar";
import Events from "../components/homepage/event/Events.jsx";
import Mainbody from "../components/homepage/Mainbody";
import Alumni from "../components/homepage/alumni/AlumniList.jsx";
import Recruitment from "../components/homepage/recruitment/Recruitment.jsx";
import Faculty from "../components/homepage/faculty/Faculty.jsx";
import {
  documentIcon,
  eventIcon,
  facultyIcon,
  hiringIcon,
  homeIcon,
  userGroupIcon,
} from "../assets/icons.jsx";
const menuItems = [
  { id: 0, Icon: homeIcon, label: "Home" },
  { id: 1, Icon: userGroupIcon, label: "Alumni" },
  { id: 2, Icon: eventIcon, label: "Events" },
  { id: 3, Icon: hiringIcon, label: "Hiring" },
  { id: 4, Icon: facultyIcon, label: "Faculty" },

];
function Homepage() {
  const [selectedTag, setSelectedTag] = React.useState(0);
  console.log(selectedTag);

  return (
    <div className="h-screen w-screen grid grid-cols-1 lg:grid-cols-12 bg-[#f3f2f1]">
      <div className="hidden ps-3 lg:col-span-4 xl:col-span-3 lg:block ">
        <Sidebar {...{ menuItems, selectedTag, setSelectedTag }} />
      </div>
      <div className=" col-span-1 lg:col-span-8 xl:col-span-9">
        {selectedTag === 0 && <Mainbody />}
        {selectedTag === 1 && <Alumni />}
        {selectedTag === 2 && <Events />}
        {selectedTag === 3 && <Recruitment />}
        {selectedTag === 4 && <Faculty />}
      </div>
    </div>
  );
}

export default Homepage;
