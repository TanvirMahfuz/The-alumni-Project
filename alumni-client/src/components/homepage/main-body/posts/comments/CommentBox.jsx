import React from "react";
import Input from "../../../../common/Input.jsx";
import { usePostStore } from "../../../../../store/usePostStore.js";
import { useUserStore } from "../../../../../store/useUserStore.js";

function CommentBox({ localPost, setLocalPost }) {
  const { authUser } = useUserStore();
  const [comment, setComment] = React.useState("");
  const { commentOnPost } = usePostStore();

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    const newPost = await commentOnPost(localPost._id, comment);
    setLocalPost(newPost);
    setComment("");
  };

  return (
    <div className="flex items-start gap-3 m-2 p-2 bg-white dark:bg-zinc-800 rounded-xl transition-colors">
      {/* Profile Picture */}
      <div className="rounded-full h-12 w-12 shrink-0">
        <img
          src={authUser?.image ?? "./avatar.png"}
          alt="profile-picture"
          className="rounded-full h-full w-full object-cover"
        />
      </div>

      {/* Input Field */}
      <div className="flex-1">
        <Input
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-gray-100 dark:bg-zinc-700 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 py-2 rounded-full transition-colors"
        />
      </div>

      {/* Send Button */}
      <button
        aria-label="Send comment"
        onClick={handleSubmit}
        className="h-10 w-10 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full flex items-center justify-center transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-700 dark:text-white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default CommentBox;
