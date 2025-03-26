import { create } from "zustand";
import axios from "axios";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  onlineUsers: [],
  userPosts: [],
  isGettingUserPosts: false,

  checkAuth: async () => {
    try {
      const res = await axios.get("/server/auth/check");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log(error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post("/auth/sign-up", data);
      set({ authUser: res.data.user });
      console.log(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logIn: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axios.post("/server/auth/log-in", data);
      set({ authUser: res.data.user });
      return true;
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    try {
      await axios.post("/auth/log-out");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await axios.put("/auth/update-profile", data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  getUserPosts: async (id) => {
    set({ isGettingUserPosts: true });
    try {
      const response = await axios.get("/server/user/userPosts/" + id);
      const posts = response.data.posts;
      if (Array.isArray(posts)) {
        set({ userPosts: posts, isGettingUserPosts: false });
      } else {
        set({ isGettingUserPosts: false });
      }
    } catch (error) {
      set({ isGettingUserPosts: false });
      console.error("Error fetching posts:", error);
    }
  },
}));
