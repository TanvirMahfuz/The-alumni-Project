import React from "react";
import { Link } from "react-router-dom";
import { formatSmartDateTime } from "../../../../../../bin/DateTime.js";
function PostHeader({ author, createdAt }) {
  return (
    <div className="flex justify-start gap-4 items-center ">
      <div className="rounded-full h-13 w-13">
        <img
          src={author?.image?.length > 0 ? author.image : "/avatar.png"}
          alt="profile-picture"
          className="rounded-full  h-full w-full object-cover"
        />
      </div>
      <div>
        {author?._id ? (
          <Link to={`/profile/${author._id}`} className="text-[17px] font-[500] text-black dark:text-white hover:underline cursor-pointer">
            {author.name ?? "Full Name"}
          </Link>
        ) : (
          <span className="text-[17px] font-[500] text-gray-500 dark:text-gray-400">
            Deleted user
          </span>
        )}
        <p className="text-[13px] font-normal text-gray-400">
          {createdAt ? formatSmartDateTime(createdAt) : "time"}
        </p>
      </div>
    </div>
  );
}

export default PostHeader;
