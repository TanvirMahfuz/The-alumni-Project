import React from "react";
import Input from "../../../../common/Input.jsx";
import { usePostStore } from "../../../../../store/usePostStore.js";
import { useUserStore } from "../../../../../store/useUserStore.js";
function CommentBox({ localPost, setLocalPost, author }) {
  const { authUser } = useUserStore();
  const [comment, setComment] = React.useState("");
  const { commentOnPost } = usePostStore();
  const handleSubmit = async () => {
    const newPost = await commentOnPost(localPost._id, comment);
    setLocalPost(newPost);
    setComment("");
  };
  return (
    <div className="flex m-2 p-2">
      <div className="rounded-full h-13 w-13">
        <img
          src={authUser?.image ?? "./avatar.png"}
          alt="profile-picture"
          className="rounded-full h-full w-full object-cover"
        />
      </div>

      <div className="w-9/10">
        <Input
          placeholder="write your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className=" flex justify-center items-center w-1/10">
        <button
          className="h-12 w-12 bg-[#F3F3F3] flex items-center justify-center dark:bg-gray-800 rounded-full cursor-pointer transition-all ease-in-out duration-300"
          onClick={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CommentBox;
