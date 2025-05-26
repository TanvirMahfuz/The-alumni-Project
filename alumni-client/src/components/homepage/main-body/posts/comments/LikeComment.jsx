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
    <div className="w-full px-15 flex justify-between items-center">
      <div
        className="flex gap-1 rounded-xl px-4 py-2 hover:cursor-pointer bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={handleLike}>
        {liked ? likedSolidIcon : likeIcon}
        <div>{localPost?.likes?.length ?? "0"} Likes</div>
      </div>

      <div
        className={`flex gap-1 rounded-xl px-4 py-2 hover:cursor-pointer bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 `}
        onClick={handleClick}>
        {commentIcon}
        <div>{localPost?.comments?.length ?? "0"} comments</div>
      </div>
    </div>
  );
}

export default LikeComment;
