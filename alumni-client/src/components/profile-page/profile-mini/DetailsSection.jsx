// DetailsSection.jsx
import React from "react";
import SkillesList from "./SkillsList";
import WorkingOnList from "./WorkingOnList";
import ContactList from "./ContactList";

function DetailsSection() {
  return (
    <div className="flex-1 flex flex-col p-4 text-white">
      <div className="mb-2 md:mb-1">
        <ContactList />
      </div>
      <div className="text-xl font-bold text-gray-200 mb-2">
        Bio section || Problem Solver || MERN Stack developer || Software
        Engineer
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-start">
        <div className=" px-3 py-2 rounded-lg backdrop-blur-sm md:max-w-sm">
          <h3 className="text-lg font-semibold border-b">Skills</h3>
          <SkillesList />
        </div>
        <div className=" px-3 py-2 rounded-lg backdrop-blur-sm ">
          <h3 className="text-lg font-semibold border-b">
            Currently Working On
          </h3>
          <WorkingOnList />
        </div>
      </div>
    </div>
  );
}

export default DetailsSection;
