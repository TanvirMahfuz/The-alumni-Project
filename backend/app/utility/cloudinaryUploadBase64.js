import cloudinary from "../config/cloudinary.js";
import { uploadsEnabled } from "./uploads.js";

/**
 * Upload a base64 image to Cloudinary
 * @param {string} base64Data - base64 image string (e.g., data:image/png;base64,...)
 * @param {string} id - Optional public ID for the image
 * @returns {object|null} - Cloudinary upload response or null
 */
const uploadFileToCloudinary = async (base64Data, id) => {
  if (!uploadsEnabled()) return null;
  try {
    if (!base64Data) return null;

    const result = await cloudinary.uploader.upload(base64Data, {
      public_id: id,
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export default uploadFileToCloudinary;
