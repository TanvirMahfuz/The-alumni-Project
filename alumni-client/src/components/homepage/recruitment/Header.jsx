import React from "react";
import { useRecruitmentStore } from "../../../store/useRecruitmentStore.js";

function Header() {
  const { formOpen, setFormOpen } = useRecruitmentStore();

  const handleClick = () => {
    setFormOpen(!formOpen);
    console.log(formOpen);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Job Openings</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        onClick={handleClick}>
        Post a Job
      </button>
    </div>
  );
}

export default Header;
