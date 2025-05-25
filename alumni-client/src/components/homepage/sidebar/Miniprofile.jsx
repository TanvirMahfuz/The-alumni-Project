import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore.js";
function Miniprofile() {
  const {authUser} = useUserStore();
  return (
    <div className="bg-gray-600 rounded-2xl shadow-md p-4">
      <div className="bg-gray-700 p-4 rounded-2xl">
        <div className="flex justify-start gap-4 items-center">
          <div className="rounded-full h-17 w-17 p-1 bg-gray-500 flex justify-center items-center overflow-hidden">
            <img
              src={
                authUser?.image && authUser.image.trim() !== ""
                  ? authUser.image
                  : "./avatar.png"
              }
              alt="profile-picture"
              className="rounded-full h-full w-full object-cover"
            />
          </div>
          <Link to="/profile">
            <p className="text-center text-xl font-semibold">
              {authUser?.name ?? "Full Name "}
            </p>
          </Link>
        </div>
        <div className="flex justify-around items-center gap-4 p-4">
          <div>
            <p className="text-center  text-3xl font-semibold">
              {authUser?.posts?.length ?? "0"}
            </p>
            <p>Posts</p>
          </div>
          <div>
            <p className="text-center text-3xl font-semibold">10</p>
            <p>Reacts</p>
          </div>
          <div>
            <p className="text-center text-3xl font-semibold">10</p>
            <p>Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Miniprofile;
