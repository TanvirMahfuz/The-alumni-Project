import { create } from "zustand";

// Set API base URL based on environment
const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

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
      const data = await res.json();
      set({ allPosts: data.data });
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
      const res = await response.json();
      await get().getAllPosts();
      return res.data;
    } catch (error) {
      console.error("Error creating post:", error);
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
      const body = await response.json();
      console.log(body);
    } catch (error) {
      console.error("Error liking post:", error);
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
      const body = await response.json();
      console.log(body);
    } catch (error) {
      console.error("Remove like failed", error);
    }
  },
}));
