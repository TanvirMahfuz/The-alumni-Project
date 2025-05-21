import React from "react";
import Input from "../../../../common/Input.jsx";
import { usePostStore } from "../../../../../store/usePostStore.js";
function CommentBox({ localPost, setLocalPost }) {
  const [comment, setComment] = React.useState("");
  const { commentOnPost } = usePostStore();
  const handleSubmit = async () => {
    const newPost= await commentOnPost(localPost._id,comment);
    setLocalPost(newPost);
    setComment("");
  };
  return (
    <div className="flex m-2 p-2 bg-gray-500  rounded-2xl">
      <div className="w-9/10">
        <Input
          placeholder="add your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className=" flex justify-center items-center w-1/10">
        <p
          className="px-2 py-1 rounded-lg hover:bg-gray-700 cursor-pointer transition-all ease-in-out duration-300"
          onClick={handleSubmit}>
          send
        </p>
      </div>
    </div>
  );
}

export default CommentBox;
