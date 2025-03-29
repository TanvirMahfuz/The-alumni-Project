import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useUserStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axios.get("/server/chat/messages/users");
      set({ users: res.data.users });
    } catch (error) {
      console.error("Error fetching users:", error);

    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async () => {
    const { selectedUser } = get();
    try {
      set({ isMessagesLoading: true });
      const res = await axios.get(
        "/server/chat/get-messages/" + selectedUser._id
      );
      console.log("getting messages:", res);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);

    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const { data } = await axios.post("/server/chat/send-message", messageData);
      set({ messages: [...messages, data] });
      console.log("message sent:", data);
    } catch (error) {
      console.error(error.message);

    }
  },
  subscribeToMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    console.log("socket connected:", socket.id);
    socket.on("newMessage", (newMessage) => {
      console.log("new message received:", newMessage);
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unSubscribeFromMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));
