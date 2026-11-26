import mongoose from "mongoose";
import { getMessages } from "../../services/messageServices.js";

export const getMessagesByChat = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const messages = await getMessages(senderId, receiverId);
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Error fetching messages" });
  }
};
