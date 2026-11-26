import { create } from "zustand";
import { API_BASE_URL } from "../config/api";


export const useSearchStore = create((set) => ({
  searchResults: [],
  isLoading: false,
  search: async (category, value) => {
    set({ isLoading: true });
    try {
      const res = await fetch(
        `${API_BASE_URL}/search?category=${encodeURIComponent(category)}&value=${encodeURIComponent(value)}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      set({
        searchResults: res.ok && Array.isArray(data.results) ? data.results : [],
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching search results:", err);
      set({ isLoading: false });
    }
  },
}));
