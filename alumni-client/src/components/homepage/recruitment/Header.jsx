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
        className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 bg-blue-50 hover:bg-blue-100 transition-all"
        onClick={handleClick}>
        + Post a Job
      </button>
    </div>
  );
}

export default Header;
