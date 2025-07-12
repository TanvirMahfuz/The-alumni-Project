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


function UserPosts({ user }) {
  const { getUserPosts, isLoading, posts } = useProfileStore();

  React.useEffect(() => {
    if (!user) return;
    getUserPosts(user._id);
  }, [getUserPosts, user]);

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 my-4 p-4 rounded-2xl min-h-[100px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : posts?.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-gray-500 text-center">No posts found.</p>
      )}
    </div>
  );
}

export default UserPosts;

