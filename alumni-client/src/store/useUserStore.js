import { create } from "zustand";
import { io } from "socket.io-client";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

const SOCKET_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : "https://the-alumni-project.onrender.com";
//important note: socket io do not work with sub roots like /api/v1

export const useUserStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  allUsers: [],
  selectedUser: null,
  socket: null,
  isUpdating: false,

  setUser: (user) => set({ authUser: user }),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setAllUsers: (users) => set({ allUsers: users }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getAuthUser: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/check`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch authenticated user");

      const data = await res.json();
      if (!data.user) throw new Error("No user found in response");

      get().setUser(data.user);
      get().connectSocket();
    } catch (err) {
      console.error("getAuthUser error:", err.message);
    }
  },

  getOnlineUsers: async (userIds) => {
    if (!Array.isArray(userIds) || userIds.length === 0) return;

    const onlineUsers = await Promise.all(
      userIds.map(async (userId) => {
        try {
          const res = await fetch(`${API_BASE_URL}/user/info/${userId}`, {
            credentials: "include",
          });
          const data = await res.json();
          return data.user;
        } catch (err) {
          console.error(err);
          return null;
        }
      })
    );

    const validUsers = onlineUsers.filter(
      (user) => user && user._id !== get().authUser?._id
    );

    get().setOnlineUsers(validUsers);
  },

  getOneUser: async (userId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/info/${userId}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data.user;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  getAllUsers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/allUsers`, {
        credentials: "include",
      });
      const data = await res.json();
      // const filtered = data.filter((user) => user._id !== get().authUser?._id);
      get().setAllUsers(data);
    } catch (err) {
      console.error(err);
    }
  },

  connectSocket: () => {

      console.log("Connecting socket...");
      const { authUser, socket } = get();

      if (!authUser || socket?.connected) return;

      const newSocket = io(SOCKET_BASE_URL, {
        query: { userId: authUser._id },
        withCredentials: true,
        transports: ["websocket", "polling"], // fallback support
      });
      try {
        newSocket.connect();
        set({ socket: newSocket });
      }catch (error) {
          console.error("Failed to connect socket:", error);
        }
        newSocket.on("connection", () => {
          console.log("Socket connected");
        });

        newSocket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
          get().getOnlineUsers(userIds);
        });

        newSocket.on("connect_error", (err) => {
          console.error("Socket connection error:", err);
        });
      
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },

  logIn: async (email, password) => {
    set({ isUpdating: true });

    try {
      const res = await fetch(`${API_BASE_URL}/auth/log-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      if (!data.user) throw new Error("User data missing");

      get().setUser(data.user);
      get().connectSocket();
      set({ isUpdating: false })
      return true;
    } catch (err) {
      console.error("Login error:", err.message);
      set({ isUpdating: false });
      return false;
    }
  },

  logOut: async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/log-out`, {
        credentials: "include",
      });
      get().disconnectSocket();
      get().setUser(null);
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      return false;
    }
  },

  register: async (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return false;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.user) {
        console.log("Registration failed:", data.message || "Unknown error");
        return false;
      }

      get().setUser(data.user);
      get().connectSocket();
      return true;
    } catch (err) {
      console.error("Registration error:", err);
      return false;
    }
  },

  updateUser: async (userData) => {
    try {
      set({ isUpdating: true });
      const res = await fetch(`${API_BASE_URL}/user/updateUser`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      get().setUser(data.user);
      return true;
    } catch (err) {
      console.error("Update error:", err.message);
      alert("Failed to update profile: " + err.message);
      return false;
    } finally {
      set({ isUpdating: false });
    }
  },
}));
