import React from "react";
import {formatSmartDateTime} from "../../../../../bin/DateTime.js"
function PostHeader({  author , createdAt }) {
  return (

      <div className="flex justify-start gap-4 items-center ">
        <div className="rounded-full h-17 w-17  bg-gray-500 p-1">
          <img
            src={author?.image  && author.image.trim() !== "" ? author.image :"./avatar.png"}
            alt="profile-picture"
            className="rounded-full h-full w-full object-cover"
          />
        </div>
        <div >
          <p className="text-xl font-semibold">{author?.name??"Full Name"}</p>
          <p className="text-sm font-normal">{createdAt ? formatSmartDateTime(createdAt):"time"}</p>
        </div>
      </div>
  );
}

export default PostHeader;
