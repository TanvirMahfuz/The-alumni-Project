import { create } from "zustand";
import { API_BASE_URL, readError } from "../config/api";
import { useUserStore } from "./useUserStore";


export const useChatStore = create((set, get) => ({
  selectedChatUser: null,
  messages: [],
  isMessageLoading: false,
  isInitialLoading: false,

  setSelectedChatUser: (user) => set({ selectedChatUser: user }),
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),

  // Single entry point for appending a message. The same message can arrive twice:
  // from the send-message response and from the socket (e.g. when the conversation is
  // with your own account, or you're logged in elsewhere), in either order.
  addMessage: (message) => {
    if (!message?._id) return;
    set((state) =>
      state.messages.some((m) => m._id === message._id)
        ? state
        : { messages: [...state.messages, message] }
    );
  },

  getMessages: async () => {
    if (!get().selectedChatUser) return;
    set({ isInitialLoading: true });
    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/get-messages/${get().selectedChatUser._id}`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      set({ messages: Array.isArray(data) ? data : [] });
      set({ isInitialLoading: false });
      return
    } catch (error) {
      console.error("Error fetching messages:", error);
      set({ isInitialLoading: false });
      return;
    }
  },

  sendMessage: async (messageData) => {
    const { selectedChatUser } = get();
    if (!selectedChatUser) return false;
    set({ isMessageLoading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/chat/send-message`, {
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
        throw new Error(await readError(response, "Failed to send message"));
      }
      const data = await response.json();
      get().addMessage(data);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    } finally {
      set({ isMessageLoading: false });
    }
  },

  subscribeToMessages: async () => {
    const socket = useUserStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.on("newMessage", (newMessage) => {
      // Read the current user/chat at event time, not at store creation
      const authUser = useUserStore.getState().authUser;
      const openChat = get().selectedChatUser;
      if (!authUser || !openChat) return;
      // Only show messages that belong to the conversation that is open
      const belongsHere =
        newMessage.senderId === openChat._id &&
        newMessage.receiverId === authUser._id;
      if (!belongsHere) return;
      get().addMessage(newMessage);
    });
  },

  unSubscribeFromMessages: async () => {
    const socket = useUserStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
