import { create } from "zustand";

// Set API base URL based on environment
const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

export const useProfileStore = create((set) => ({
  profile: null,
  posts: [],
  isLoading: false,
  setProfile: (profile) => set({ profile }),

  getProfile: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/info/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      set({ profile: data.user });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  },
  getUserPosts: async (id) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${API_BASE_URL}/user/userPosts/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      set({ posts: data.posts, isLoading: false });
      
    } catch (err) {
      console.error("Error fetching posts:", err);
      set({ isLoading: false });
    }
  },
}));
