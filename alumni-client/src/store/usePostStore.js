import { create } from "zustand";
import { API_BASE_URL, readError } from "../config/api";


export const usePostStore = create((set, get) => ({
  allPosts: [],
  selectedPost: null,
  completeComments: [],
  isCreatingPost: false,

  setAllPosts: (posts) => set({ allPosts: posts }),
  setSelectedPost: (postId) => set({ selectedPost: postId }),

  getAllPosts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/post`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      set({ allPosts: Array.isArray(data.data) ? data.data : [] });
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  },

  getCompleteComments: async (comments) => {
    if (!comments) return [];

    const completeComments = await Promise.all(
      comments.map(async (comment) => {
        try {
          const res = await fetch(
            `${API_BASE_URL}/user/info/${comment.author}`,
            {
              credentials: "include",
            }
          );
          if (!res.ok) return { ...comment, author: null };
          const data = await res.json();
          return { ...comment, author: data.user };
        } catch (err) {
          console.error("Error fetching comment author:", err);
          return { ...comment, author: null };
        }
      })
    );

    return completeComments;
  },

  createPost: async (post) => {
    set({ isCreatingPost: true });
    try {
      const response = await fetch(`${API_BASE_URL}/post/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        return { ok: false, message: await readError(response, "Failed to create post") };
      }
      const res = await response.json();
      await get().getAllPosts();
      return { ok: true, post: res.data };
    } catch (error) {
      console.error("Error creating post:", error);
      return { ok: false, message: "Could not reach the server" };
    } finally {
      set({ isCreatingPost: false });
    }
  },

  commentOnPost: async (postId, comment) => {
    try {
      const response = await fetch(`${API_BASE_URL}/post/addComments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ postId, comment }),
      });
      if (!response.ok) return null;
      const res = await response.json();
      return res.data;
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },

  likePost: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/post/likepost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      console.error("Error liking post:", error);
      return false;
    }
  },

  removeLikePost: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/post/removeLike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      console.error("Remove like failed", error);
      return false;
    }
  },
}));
