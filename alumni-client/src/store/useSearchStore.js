import { create } from "zustand";

// Set API base URL based on environment
const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

export const useSearchStore = create((set) => ({
  searchResults: [],
  isLoading: false,
  search: async (category, value) => {
    set({ isLoading: true });
    try {
      const res = await fetch(
        `${API_BASE_URL}/search?category=${category}&value=${value}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      set({ searchResults: data.results, isLoading: false });
    } catch (err) {
      console.error("Error fetching search results:", err);
      set({ isLoading: false });
    }
  },
}));
