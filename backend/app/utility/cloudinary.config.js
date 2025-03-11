import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (localFilePath, id) => {
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
