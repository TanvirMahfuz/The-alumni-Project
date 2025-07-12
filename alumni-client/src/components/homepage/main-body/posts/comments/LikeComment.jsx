import React from "react";
import {
  commentIcon,
  likeIcon,
  likedSolidIcon,
} from "../../../../../assets/icons.jsx";
import { useUserStore } from "../../../../../store/useUserStore.js";
import { usePostStore } from "../../../../../store/usePostStore.js";

function LikeComment({
  localPost,
  setLocalPost,
  commentsOpen,
  setCommentsOpen,
}) {
  const { authUser } = useUserStore();
  const { likePost, removeLikePost } = usePostStore();
  const [liked, setLiked] = React.useState(
    localPost.likes.includes(authUser?._id)
  );

  const handleClick = () => {
    setCommentsOpen(!commentsOpen);
  };

  const handleLike = () => {
    if (!authUser) {
      console.warn("User not authenticated, cannot like.");
      return;
    }

    const alreadyLiked = localPost.likes.includes(authUser._id);

    if (alreadyLiked) {
      const newLikes = localPost.likes.filter((id) => id !== authUser._id);
      setLocalPost((prevPost) => ({ ...prevPost, likes: newLikes }));
      setLiked(false);
      removeLikePost({ id: localPost._id, userId: authUser._id });
    } else {
      setLocalPost((prevPost) => ({
        ...prevPost,
        likes: [...prevPost.likes, authUser._id],
      }));
      setLiked(true);
      likePost({ id: localPost._id, userId: authUser._id });
    }
  };

  React.useEffect(() => {
    setLiked(localPost.likes.includes(authUser?._id));
  }, [localPost.likes, authUser?._id]);

  return (
    <div className="w-full px-4 flex justify-between items-center">
      {/* Like Button */}
      <div
        className="flex gap-1 items-center rounded-xl px-4 py-2 
             text-gray-700 dark:text-gray-200 
             cursor-pointer transition group"
        onClick={handleLike}>
        <span className="transition-colors text-inherit group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {liked ? likedSolidIcon : likeIcon}
        </span>
        <div className="transition-colors text-inherit group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {`${localPost?.likes?.length ?? 0} ${
            (localPost?.likes?.length ?? 0) === 1 ? "Like" : "Likes"
          }`}
        </div>
      </div>
      <div
        className="flex gap-1 items-center rounded-xl px-4 py-2 
             text-gray-700 dark:text-gray-200 
             cursor-pointer transition group"
        onClick={handleClick}>
        <span className="transition-colors text-inherit group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {commentIcon}
        </span>
        <div className="transition-colors text-inherit group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {`${localPost?.comments?.length ?? 0} ${
            (localPost?.comments?.length ?? 0) === 1 ? "Comment" : "Comments"
          }`}
        </div>
      </div>
      {/* Comment Button */}
    </div>
  );
}

export default LikeComment;
