import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore.js";

function Miniprofile() {
  const { authUser } = useUserStore();
  const profileImage =
    authUser?.image?.length > 0 ? authUser.image : "./avatar.png";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden transition-colors duration-300">
      {/* Header Background */}
      <div className="relative h-32 bg-cover bg-center">
        <img
          src="./bg-final.png"
          alt="Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute -bottom-12 left-6 h-24 w-24 rounded-full shadow-md overflow-hidden bg-white dark:bg-slate-700 border dark:border-slate-600">
          <img
            src={profileImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-16 px-6 text-sm text-gray-800 dark:text-gray-200 space-y-2">
        <Link to={`/profile/${authUser?._id}`}>
          <p className="text-left text-2xl mb-2 font-semibold text-gray-800 dark:text-white">
            {authUser?.name ?? "Guest User"}
          </p>
        </Link>

        <p className="text-gray-500 dark:text-gray-400 text-[13px] text-center sm:text-left">
          {authUser?.email ?? ""}
        </p>

        {authUser && (
          <div className="mt-1 text-sm flex justify-center sm:justify-start items-center gap-2 text-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375a1.125 1.125 0 011.125-1.125h2.25a1.125 1.125 0 011.125 1.125V21M3 3h12m-.75 4.5H21"
              />
            </svg>
            <p>{authUser?.currentPost?.title ?? "No title"}</p>
          </div>
        )}

        {/* View Profile Button */}
        <div className="mt-6 mb-6">
          <Link
            to={`/profile/${authUser?._id}`}
            className="block text-center bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-2xl transition-colors duration-200">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Miniprofile;
