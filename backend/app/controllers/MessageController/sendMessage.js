import mongoose from "mongoose";
import { createMessage } from "../../services/messageServices.js";
import { getReceiverSocketId, io } from "../../sockets/socket.js";
import uploadFileToCloudinary from "../../utility/cloudinaryUploadBase64.js";
import { uploadsEnabled, isFileData, rejectUpload } from "../../utility/uploads.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    let { receiverId, text, images, documents } = req.body;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid receiver" });
    }
    if (!text) text = "";
    if (!Array.isArray(images)) images = [];
    if (!documents) documents = "";

    if (!uploadsEnabled() && (images.length > 0 || documents !== "")) {
      return rejectUpload(res);
    }

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
          .json({ error: "Image upload failed" });
      }
    }

    const message = await createMessage({
      senderId,
      receiverId,
      text,
      images: uploadedImageUrls,
      documents,
    });

    if (!message) {
      return res.status(500).json({ error: "Failed to save message" });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    return res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Error sending message" });
  }
};
