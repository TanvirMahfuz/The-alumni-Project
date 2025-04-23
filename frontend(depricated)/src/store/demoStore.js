import { create } from "zustand";
import axios from "axios";

export const useDemoStore = create((set) => ({
  allUsers: [],
  loading: false,
  getUsers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/server/user/allUsers");
      const users = response.data;
      if (Array.isArray(users)) {
        set({ allUsers: users, loading: false });
      } else {
        set({ loading: false});
      }
    } catch (error) {
      set({ loading: false }); 
      console.error("Error fetching users:", error);
    }
  },
}));
