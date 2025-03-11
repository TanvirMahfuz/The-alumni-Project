import {useEffect, useState} from "react";
import {Textarea, IconButton} from "@material-tailwind/react";
import axios from "axios";

export function Comment({item}) {
  const [comment, setComment] = useState("");

  const onComment = async () => {
    if (!comment.trim()) return;
    axios
      .post("/api/api/v1/post/addComments", {
        postId: item._id,
        comment: comment,
      })
      .then((res) => {
        console.log(res.data.data.comments);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setComment("");
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
      <Textarea
        rows={1}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your Message"
        className="min-h-full w-full sm:w-auto !border-0 focus:border-transparent resize-none"
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
