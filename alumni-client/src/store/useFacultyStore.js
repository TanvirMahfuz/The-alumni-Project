import { create } from "zustand";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

export const useFacultyStore = create((set) => ({
  faculty: [],
  setFaculty: (faculty) => set({ faculty }),
  fetchFaculty: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/faculty`, {
        credentials: "include",
      });
      const data = await response.json();
      set({ faculty: data.faculties });
      console.log(data);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  },
}));
