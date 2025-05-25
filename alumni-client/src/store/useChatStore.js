import { create } from "zustand";
import { useUserStore } from "./useUserStore";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEPLOYMENT_URL;

export const useChatStore = create((set, get) => ({
  authUser: useUserStore.getState().authUser,
  selectedChatUser: null,
  messages: [],
  isMessageLoading: false,

  setSelectedChatUser: (user) => set({ selectedChatUser: user }),
  setMessages: (messages) => set({ messages }),

  getMessages: async () => {
    if (!get().selectedChatUser) {
      console.warn("No selectedChatUser._id provided to getMessages");
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chat/get-messages/${get().selectedChatUser._id}`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },

  sendMessage: async (messageData) => {
    const { selectedChatUser, messages } = get();
    set({ isMessageLoading: true });
    try {
      console.log("messageData", messageData);
      const response = await fetch(`${API_BASE_URL}/api/chat/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...messageData,
          receiverId: selectedChatUser._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      set({ messages: [...messages, data] });
      console.log("message sent:", data);
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  subscribeToMessages: async () => {
    const socket = useUserStore.getState().socket;
    if (!socket) {
      console.warn("Socket not connected");
      return;
    }
    console.log("socket connected:", socket.id);

    socket.on("newMessage", (newMessage) => {
      // Only add message if current user is receiver
      if (newMessage.receiverId !== get().authUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unSubscribeFromMessages: async () => {
    const socket = useUserStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
