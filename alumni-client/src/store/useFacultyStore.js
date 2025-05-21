import { create } from "zustand";

export const useFacultyStore = create((set) => ({
  faculty: [],
  setFaculty: (faculty) => set({ faculty }),
  fetchFaculty: async () => {
    try {
      const response = await fetch("/api/faculty");
      const data = await response.json();
      set({ faculty: data.faculties });
      console.log(data);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  },
}));