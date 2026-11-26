import React, { useEffect, useRef } from "react";
import Text from "../chat-bubble/text/Text";
import VoiceMessage from "../chat-bubble/VoiceMessage/VoiceMessage";
import MultiImage from "../chat-bubble/MultiImage/MultiImage";
import { useChatStore } from "../../../../store/useChatStore";
import EmptyState from "../../../common/EmptyState/EmptyState.jsx";
import { FaRegCommentDots } from "react-icons/fa";

function ChatBody() {
  const chatBodyRef = useRef(null);
  const [loadedFor, setLoadedFor] = React.useState(null);

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

    const userId = selectedChatUser._id;
    clearMessages(); // 🧼 clear old messages immediately
    getMessages().finally(() => setLoadedFor(userId)); // 📥 fetch new messages
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
      className="flex flex-col gap-3 md:gap-4 p-3 md:p-4 overflow-y-auto flex-1 min-h-0"
      ref={chatBodyRef}>
      {isInitialLoading ? (
        <div className="flex justify-center items-center h-full py-6">
          <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : loadedFor === selectedChatUser?._id && !messages?.length ? (
        <EmptyState
          compact
          className="h-full"
          icon={FaRegCommentDots}
          title="No messages yet"
          message={`Say hi to ${selectedChatUser?.name ?? "them"} to start the conversation.`}
        />
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
