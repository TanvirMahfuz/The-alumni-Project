import { create } from "zustand";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
export const useUserStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  allUsers: [],
  selectedUser: null,
  socket: null,
  onlineUsers: [],

  setUser: (user) => set({ authUser: user }), // fix key
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setAllUsers: (users) => set({ allUsers: users }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getAuthUser: async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) {
        throw new Error("Failed to fetch authenticated user");
      }

      const data = await res.json();

      if (!data.user) {
        throw new Error("No user found in response");
      }

      get().setUser(data.user);
      get().connectSocket();
    } catch (err) {
      console.error("getAuthUser error:", err.message);
    }
  },

  getOnlineUsers: async (userIds) => {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      console.warn("No userIds provided to getOnlineUsers");
      return;
    }
    const onlineUsers = await Promise.all(
      userIds.map(async (userId) => {
        const user = await fetch(`/api/user/info/${userId}`)
          .then((res) => res.json())
          .then((data) => data.user)
          .catch((err) => {
            console.log(err);
            return null;
          });
        return user;
      })
    );

    const validUsers = onlineUsers.filter(
      (user) => (user !== null) & (user._id !== get().authUser._id)
    );
    get().setOnlineUsers(validUsers);
  },
  getOneUser: async (userId) => {
    const user = await fetch(`/api/user/info/${userId}`)
      .then((res) => res.json())
      .then((data) => data.user)
      .catch((err) => console.log(err));
    return user;
  },
  getAllUsers: async () => {
    const allUsers = await fetch("/api/user/allUsers")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    allUsers.filter((user) => user._id !== get().authUser?._id);
    get().setAllUsers(allUsers);
  },

  connectSocket: () => {
    const { authUser } = get();
    console.log("socket already connected:", get().socket?.connected);
    console.log("socket:", get().socket);
    if (!authUser || get().socket?.connected) {
      return;
    }
    const socket = io("http://localhost:3000", {
      query: { userId: authUser._id },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
      get().getOnlineUsers(userIds);
    });
  },
  disconnectSocket: () => {
    console.log("disconnecting socket");
    if (get().socket?.connected) get().socket.disconnect();
  },
  logIn: async (email, password) => {
    try {
      const res = await fetch("/api/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      if (!data.user) {
        throw new Error("User data missing");
      }

      get().setUser(data.user);
      get().connectSocket();

      return true;
    } catch (err) {
      console.error("Login error:", err.message);
      return false;
    }
  },
  logOut: () => {
    try {
      const res = fetch("/api/auth/log-out").then((res) => res.json());
      get().disconnectSocket();
      get().setUser(null);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  },
  register: async (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return false;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();
      console.log("Registration response:", data);
      if (!res.ok || !data.user) {
        console.log("Registration failed:", data.message || "Unknown error");
        return false;
      }

      get().setUser(data.user);
      get().connectSocket();
      return true;
    } catch (err) {
      console.error("Error during registration:", err);
      return false;
    }
  },
}));
