import Message from "../models/MessageModel.js";

export const createMessage = async (message) => {
  const newMessage = await Message.create(message);
  return newMessage;
};

export const getMessages = async (senderId, receiverId) => {
  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  });
  return messages;
};
