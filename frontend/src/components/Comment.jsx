import { useEffect, useState } from "react";
import { Textarea, IconButton } from "@material-tailwind/react";
import axios from "axios";

export function Comment({ item, setItem }) {
  const [localItem, setLocalItem] = useState(item);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setLocalItem(item);
  }, [localItem]);

const onComment = async () => {
  if (!comment.trim()) return;

  try {
    const res = await axios.post("/api/api/v1/post/addComments", {
      postId: item._id,
      comment: comment,
    });

    const newComment = res.data.data.comments[res.data.data.comments.length - 1];

    if (!newComment.user || !newComment.user.profileImage) {
      console.warn("Profile image missing in new comment:", newComment);
    }

    const updatedItem = { ...item, comments: [...item.comments, newComment] };

    setLocalItem(updatedItem);
    setItem(updatedItem);
    setComment(""); // Clear input field
  } catch (err) {
    console.log("Error posting comment:", err.message);
  }
};


  return (

      <div className="col-span-10 flex w-full h-full items-center justify-center gap-2 rounded-[99px] border border-gray-300">
        <Textarea
          rows={1}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your Message"
          className="min-h-full w-full pl-4 bg-gray-300 sm:w-auto !border-0 focus:border-transparent resize-none"
          containerProps={{
            className: "grid h-full flex-1",
          }}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <IconButton
          variant="text"
          className="rounded-full"
          onClick={onComment}
          disabled={!comment.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </IconButton>
      </div>
  );
}
