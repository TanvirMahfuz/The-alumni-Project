import { create } from "zustand";
import axios, { all } from "axios";
export const useGeneralStore = create((set, get) => ({
  allUsers: [],
  isUsersLoading: false,
  allPosts: [],
  isPostsLoading: false,
  selectedUser: null,
  isSelectedUserLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axios.get("/server/user/allUsers");
      const users = response.data;
      if (Array.isArray(users)) {
        set({ allUsers: users, isUsersLoading: false });
      } else {
        set({ isUsersLoading: false });
      }
    } catch (error) {
      set({ isUsersLoading: false });
      console.error("Error fetching users:", error);
    }
  },

  getPosts: async () => {
    set({ isPostsLoading: true });
    try {
      const response = await axios.get("/server/post/");
      const posts = response.data.data;
      if (Array.isArray(posts)) {
        set({ allPosts: posts, isPostsLoading: false });
      } else {
        set({ isPostsLoading: false });
      }
    } catch (error) {
      set({ isPostsLoading: false });
      console.error("Error fetching posts:", error);
    }
  },

  setSelectedUser:async (id) => {
    set({ isSelectedUserLoading: true });
    try {
      const response = await axios.get("/server/user/info/" + id)
      const user = response.data.user;
      set({ selectedUser: user});
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      set({ isSelectedUserLoading: false });
    }
  },
}));
