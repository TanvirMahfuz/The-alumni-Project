import React from "react";
import { useRecruitmentStore } from "../../../store/useRecruitmentStore.js";

function Header() {
  const { formOpen, setFormOpen } = useRecruitmentStore();

  const handleClick = () => {
    setFormOpen(!formOpen);
    console.log(formOpen);
  };

  return (
    <header className="flex mt-4 justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700  transition-colors duration-300">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white ">
        Job Openings
      </h1>

      <button
        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
        aria-label="Create new event"
        onClick={handleClick}>
        {" "}
        + Post a Job
      </button>
    </header>
  );
}

export default Header;
