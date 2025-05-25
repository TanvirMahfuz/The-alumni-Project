import { create } from "zustand";

// Set API base URL based on environment
const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

export const useProfileStore = create((set) => ({
  profile: null,

  setProfile: (profile) => set({ profile }),

  getProfile: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        credentials: "include",
      });
      const data = await res.json();
      set({ profile: data.user });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  },
}));
