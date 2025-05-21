import { create } from "zustand";
import { useUserStore } from "./useUserStore";
export const useChatStore = create((set, get) => ({
  authUser: useUserStore.getState().authUser,
  selectedChatUser: null,
  messages: [],
  isMessageLoading: false,

  setSelectedChatUser: (user) => set({ selectedChatUser: user }),
  setMessages: (messages) => set({ messages }),

  getMessages: async () => {
    if (!get().selectedChatUser) {
      console.warn("No get().selectedChatUser._id provided to getMessages");
      return;
    }
    const response = await fetch(
      `/api/chat/get-messages/${get().selectedChatUser._id}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    set({ messages: response });
  },

  sendMessage: async (messageData) => {
    const { selectedChatUser, messages,isMessageLoading } = get();
    set({ isMessageLoading: true });
    try {
      console.log("messageData", messageData);
      const response = await fetch("/api/chat/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      set({ isMessageLoading:false})
      console.log("message sent:", data);
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  subscribeToMessages: async () => {
    const { setSelectedChatUser } = get();
    console.log("subscribing to messages", setSelectedChatUser);

    if (!setSelectedChatUser) return;
    const socket = useUserStore.getState().socket;
    console.log("socket connected:", socket.id);
    socket.on("newMessage", (newMessage) => {
      if (newMessage.receiverId !== get().authUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unSubscribeFromMessages: async () => {
    const { setSelectedChatUser } = get();
    if (!setSelectedChatUser) return;
    const socket = useUserStore.getState().socket;
    socket.off("newMessage");
  },
}));


