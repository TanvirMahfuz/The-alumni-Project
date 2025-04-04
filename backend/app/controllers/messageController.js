import { createMessage, getMessages } from "../services/messageServices.js";
import { getReceiverSocketId,io } from "../utility/sockets.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    let { receiverId, text, image, documents } = req.body;
    if (!text)text = "";
    if (!image) image = "";
    if (!documents) documents = "";
    if (text === "" && image === "" && documents === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const message = await createMessage({
      senderId,
      receiverId,
      text,
      image,
      documents,
    });
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      console.log("receiver socket found: ", receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", message);
    }
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMessagesByChat = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const messages = await getMessages(senderId, receiverId);
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
