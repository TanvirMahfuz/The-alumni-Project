import React from "react";
import LikeComment from "../comments/LikeComment.jsx";
import CommentBox from "../comments/CommentBox.jsx";
import AllComment from "../comments/AllComment.jsx";
// import { usePostStore } from "../../../store/usePostStore.js";

function PostFooter({ post, author }) {
  const [commentsOpen, setCommentsOpen] = React.useState(false);
  const [localPost, setLocalPost] = React.useState(post);

  return (
    <>
      <LikeComment
        {...{ localPost, setLocalPost, commentsOpen, setCommentsOpen }}
      />
      {commentsOpen && (
        <>
          <AllComment comments={localPost.comments} />
          <CommentBox {...{ localPost, setLocalPost, author }} />
        </>
      )}
    </>
  );
}

export default PostFooter;
