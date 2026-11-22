import { getMessages } from "../../services/messageServices.js";

export const getMessagesByChat = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const messages = await getMessages(senderId, receiverId);
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
