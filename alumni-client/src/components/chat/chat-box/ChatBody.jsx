import React, { useEffect, useRef } from "react";
import Text from "./chat-bubble/Text";
import VoiceMessage from "./chat-bubble/VoiceMessage";
import MultiImage from "./chat-bubble/MultiImage";
import { useChatStore } from "../../../store/useChatStore";

function ChatBody() {
  const chatBodyRef = useRef(null);

  const {
    selectedChatUser,
    messages,
    getMessages,
    clearMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
    isMessageLoading,
    isInitialLoading,
  } = useChatStore();

  // Scroll to bottom on message change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, selectedChatUser]);

  // Handle fetching + subscription on user change
  useEffect(() => {
    if (!selectedChatUser?._id) return;

    clearMessages(); // 🧼 clear old messages immediately
    getMessages(); // 📥 fetch new messages
    subscribeToMessages();

    return () => unSubscribeFromMessages();
  }, [
    selectedChatUser?._id,
    getMessages,
    clearMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  return (
    <div
      className="flex flex-col gap-4 p-4 overflow-y-auto flex-1"
      ref={chatBodyRef}>
      {isInitialLoading ? (
        <div className="flex justify-center items-center h-full py-6">
          <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        messages?.length > 0 &&
        messages.map((message) => {
          if (message?.images?.length > 0) {
            return (
              <div key={message._id}>
                <MultiImage message={message} />
              </div>
            );
          } else if (message?.text?.length > 0) {
            return <Text key={message._id} message={message} />;
          } else {
            return null;
          }
        })
      )}
    </div>
  );
  
}

export default ChatBody;
