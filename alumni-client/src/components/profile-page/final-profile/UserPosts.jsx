import React from "react";

import Post from "../../homepage/main-body/posts/post/Posts.jsx";
import { useProfileStore } from "../../../store/useProfileStore";
import { useUserStore } from "../../../store/useUserStore.js";
const demoPosts = [
  {
    _id: "64fa1b3ea9f8a500146c1a01",
    author: "64fa1b3ea9f8a500146c1aaa",
    images: [
      "https://example.com/images/sunset.jpg",
      "https://example.com/images/beach.jpg",
    ],
    description: "Had a wonderful evening at the beach! 🌅",
    comments: [
      {
        author: "64fa1b3ea9f8a500146c1aab",
        content: "Wow, looks amazing!",
        createdAt: "2025-07-09T12:00:00Z",
      },
      {
        author: "64fa1b3ea9f8a500146c1aac",
        content: "Wish I was there!",
        createdAt: "2025-07-09T12:05:00Z",
      },
    ],
    likes: ["64fa1b3ea9f8a500146c1aab", "64fa1b3ea9f8a500146c1aac"],
    createdAt: "2025-07-09T11:55:00Z",
    updatedAt: "2025-07-09T12:10:00Z",
  },
  {
    _id: "64fa1b3ea9f8a500146c1a02",
    author: "64fa1b3ea9f8a500146c1aac",
    images: [],
    description: "Started learning full-stack development with MERN! 💻🔥",
    comments: [],
    likes: ["64fa1b3ea9f8a500146c1aaa"],
    createdAt: "2025-07-08T09:30:00Z",
    updatedAt: "2025-07-08T09:30:00Z",
  },
  {
    _id: "64fa1b3ea9f8a500146c1a03",
    author: "64fa1b3ea9f8a500146c1aab",
    images: ["https://example.com/images/project-screenshot.png"],
    description: "Just deployed my first project on Vercel 🚀 Check it out!",
    comments: [
      {
        author: "64fa1b3ea9f8a500146c1aaa",
        content: "Congrats bro 🔥",
        createdAt: "2025-07-08T20:12:00Z",
      },
    ],
    likes: ["64fa1b3ea9f8a500146c1aaa", "64fa1b3ea9f8a500146c1aac"],
    createdAt: "2025-07-08T19:55:00Z",
    updatedAt: "2025-07-08T20:15:00Z",
  },
];

function UserPosts() {
  const { getUserPosts,isLoading,posts } = useProfileStore();
  const { authUser } = useUserStore();
  React.useEffect(() => {
    if (!authUser) return;
    getUserPosts(authUser._id);
  }, [getUserPosts]);
  return (
    <div className="mt-6 bg-white my-4 p-4 rounded-2xl">
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default UserPosts;
