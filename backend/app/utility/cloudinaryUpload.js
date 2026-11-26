import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { uploadsEnabled } from "./uploads.js";

const uploadFileToCloudinary = async (localFilePath, id) => {
  if (!uploadsEnabled()) return null;
  try {
    if (!localFilePath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: id,
      resource_type: "auto",
    });
    const optimizeUrl = cloudinary.url(id, {
      fetch_format: "auto",
      quality: "auto",
    });

    const autoCropUrl = cloudinary.url(id, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);
    return null;
  }
};

export default uploadFileToCloudinary;
