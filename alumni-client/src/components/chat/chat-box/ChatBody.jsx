import React, { useEffect, useRef } from "react";
import Text from "./chat-bubble/Text";
import VoiceMessage from "./chat-bubble/VoiceMessage";
import { useChatStore } from "../../../store/useChatStore";
import MultiImage from "./chat-bubble/MultiImage";
function ChatBody() {
  const chatBodyRef = useRef(null);
  const {
    selectedChatUser,
    messages,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
    isMessageLoading,
  } = useChatStore();
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // run after messages are updated

  useEffect(() => {
    getMessages();
    subscribeToMessages();
    return () => unSubscribeFromMessages();
  }, [selectedChatUser?._id,subscribeToMessages,unSubscribeFromMessages]);

  return (
  <>
    <div className="flex flex-col gap-4 p-4 overflow-y-auto" ref={chatBodyRef}>
      {messages?.length > 0 &&
        messages.map((message, index) => 
        {
          if (message?.images?.length>0){
              console.log(message._id);
            return <div key={message._id}><MultiImage message={message}/></div>
          }else if (message?.text?.length>0){
            return <Text key={message?._id} message={message}/>
          }
        }
        )}
    </div>

    {isMessageLoading &&<div>loading</div> }
    </>
  );
}

export default ChatBody;
