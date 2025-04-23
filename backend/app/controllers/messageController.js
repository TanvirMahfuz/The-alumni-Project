import { createMessage, getMessages } from "../services/messageServices.js";
import { getReceiverSocketId,io } from "../utility/sockets.js";
import  uploadFileToCloudinary  from "../utility/cloudinary64.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    let { receiverId, text, images, documents } = req.body;

    if (!text) text = "";
    if (!images) images = [];
    if (!documents) documents = "";

    if (text === "" && images.length === 0 && documents === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const uploadedImageUrls = [];

    for (const [index, base64Image] of images.entries()) {
      try {
        const cloudResult = await uploadFileToCloudinary(
          base64Image,
          `user-${senderId}-image-${Date.now()}-${index}`
        );
        if (cloudResult?.secure_url) {
          uploadedImageUrls.push(cloudResult.secure_url);
        } else {
          return res
            .status(500)
            .json({ error: "Failed to upload image to Cloudinary" });
        }
      } catch (uploadErr) {
        return res
          .status(500)
          .json({ error: "Image upload failed", details: uploadErr.message });
      }
    }

    const message = await createMessage({
      senderId,
      receiverId,
      text,
      images: uploadedImageUrls,
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
