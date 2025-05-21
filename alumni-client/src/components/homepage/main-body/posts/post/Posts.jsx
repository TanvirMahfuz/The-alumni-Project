import React from "react";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
function Posts({post}) {

  return (
  <div className=" bg-gray-600 my-4 p-4 rounded-md">
      <PostHeader author={post.author} createdAt={post.createdAt} />
      <PostBody description={post.description} images={post.images} />
      <PostFooter
        likes={post.likes}
        comments={post.comments}
        post={post}
      />
  </div>
  );
}

export default Posts;
