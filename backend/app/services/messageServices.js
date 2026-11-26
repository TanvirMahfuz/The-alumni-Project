import Message from "../models/MessageModel.js";

export const createMessage = async (message) => {
  try {
    const newMessage = await Message.create(message);
  return newMessage;
  } catch (error) {
    console.log(error.message);
    return null
    
  }
  
};

export const getMessages = async (senderId, receiverId) => {
  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 });
  return messages;
};
