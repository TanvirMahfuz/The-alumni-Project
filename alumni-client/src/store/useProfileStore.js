import { create } from "zustand";
import { API_BASE_URL } from "../config/api";


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
