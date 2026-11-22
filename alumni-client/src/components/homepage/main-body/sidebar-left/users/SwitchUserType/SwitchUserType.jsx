import React from "react";

function SwitchUserType({ userType, setUserType }) {
  const baseClass =
    "text-center p-2 cursor-pointer transition duration-300 rounded-tl-2xl rounded-tr-2xl select-none";

  const activeClass =
    "border-b-4 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold";
  const inactiveClass =
    "border-b-4 border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200";

  return (
    <div className="m-2 mt-10 grid grid-cols-2 border-b border-gray-300 dark:border-zinc-600">
      <div
        className={`${baseClass} ${
          userType === "all" ? activeClass : inactiveClass
        }`}
        onClick={() => setUserType("all")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setUserType("all")}
        aria-pressed={userType === "all"}>
        All
      </div>
      <div
        className={`${baseClass} ${
          userType === "online" ? activeClass : inactiveClass
        }`}
        onClick={() => setUserType("online")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setUserType("online")}
        aria-pressed={userType === "online"}>
        Online
      </div>
    </div>
  );
}

export default SwitchUserType;
