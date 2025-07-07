import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore.js";
function Miniprofile() {
  const { authUser } = useUserStore();
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative h-14 bg-cover bg-center">
        <img src="./bg-final.png" alt="" />
        <div className="absolute -bottom-25 left-6 h-24 w-24 rounded-full shadow-md overflow-hidden bg-white">
          <img
            src={authUser?.image.length>0 ? authUser.image : "./avatar.png"}
            alt="profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>


      <div className="pt-28 px-6 text-sm text-gray-700 space-y-2">
        <Link to="/profile">
          <p className="text-left text-2xl mb-2 font-semibold">
            {authUser?.name ?? "Full Name"}
          </p>
        </Link>
        <p className="text-gray-400 text-[13px] text-center sm:text-left">
          Junior Software Engineer
        </p>
        <div className="mt-1 text-sm text-gray-600 flex justify-center sm:justify-start items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
            />
          </svg>
          <p>Dynamic Solutions and Innovations</p>
        </div>

        {/* <!-- View Profile Button --> */}
        <div className="mt-6 mb-6">
          <Link
            to="/profile"
            className="block text-center bg-sky-500 text-white font-medium py-2.5 rounded-2xl hover:bg-sky-600 transition">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Miniprofile;
