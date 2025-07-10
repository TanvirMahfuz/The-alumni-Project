import React from "react";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
function Posts({ post }) {

  return (
    <div className="mt-6 bg-white my-4 p-4 rounded-2xl">
      <PostHeader author={post.author} createdAt={post.createdAt} />
      <PostBody description={post.description} images={post.images} />
      <PostFooter
        likes={post.likes}
        comments={post.comments}
        post={post}
        author={post.author}
      />
    </div>
  );
}

export default Posts;
