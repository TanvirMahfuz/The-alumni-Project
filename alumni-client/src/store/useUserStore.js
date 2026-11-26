import { create } from "zustand";
import { io } from "socket.io-client";
import { API_BASE_URL, SOCKET_URL, readError } from "../config/api";

export const useUserStore = create((set, get) => ({
  authUser: null,
  // true until the first /auth/check finishes, so routes don't redirect early
  isCheckingAuth: true,
  onlineUsers: [],
  allUsers: [],
  selectedUser: null,
  socket: null,
  isUpdating: false,
  authError: null,

  setUser: (user) => set({ authUser: user }),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setAllUsers: (users) => set({ allUsers: users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  clearAuthError: () => set({ authError: null }),

  getAuthUser: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/check`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not logged in");

      const data = await res.json();
      if (!data.user) throw new Error("No user found in response");

      get().setUser(data.user);
      get().connectSocket();
    } catch (err) {
      console.info("getAuthUser:", err.message);
    } finally {
      set({ isCheckingAuth: false });
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
          if (!res.ok) return null;
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
      if (!res.ok) return null;
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
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      get().setAllUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    // The server identifies the user from the auth cookie
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      get().getOnlineUsers(userIds);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) socket.disconnect();
    set({ socket: null, onlineUsers: [] });
  },

  logIn: async (email, password) => {
    set({ isUpdating: true, authError: null });

    try {
      const res = await fetch(`${API_BASE_URL}/auth/log-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(await readError(res, "Login failed"));
      }
      const data = await res.json();
      if (!data.user) throw new Error("Login failed");

      get().setUser(data.user);
      get().connectSocket();
      return true;
    } catch (err) {
      set({ authError: err.message });
      return false;
    } finally {
      set({ isUpdating: false });
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
      set({ authError: "Passwords do not match" });
      return false;
    }

    set({ isUpdating: true, authError: null });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (!res.ok) {
        throw new Error(await readError(res, "Registration failed"));
      }
      const data = await res.json();
      if (!data.user) throw new Error("Registration failed");

      get().setUser(data.user);
      get().connectSocket();
      return true;
    } catch (err) {
      set({ authError: err.message });
      return false;
    } finally {
      set({ isUpdating: false });
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

      if (!res.ok) {
        throw new Error(await readError(res, "Failed to update profile"));
      }

      const data = await res.json();
      get().setUser(data.user);
      return true;
    } catch (err) {
      alert(err.message);
      return false;
    } finally {
      set({ isUpdating: false });
    }
  },
}));
