import * as userServices from "../../services/userServices.js";
import { validateUserUpdate } from "../../utility/updateValidation.js";
import uploadFileToCloudinary from "../../utility/cloudinaryUploadBase64.js";
import { hashPassword } from "../../services/authServices.js";
import User from "../../models/userModel.js";
import { uploadsEnabled, isFileData, rejectUpload } from "../../utility/uploads.js";

const CLOUDINARY_PREFIX = "https://res.cloudinary.com/dtpuispy4/";

export const updateUser = async (req, res) => {
  try {
    const proid = req.body._id;
    if (proid !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const id = req.user._id;
    const body = req.body;

    let params;
    try {
      params = validateUserUpdate(id, body);
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    if (!params) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const wantsImageUpload =
      isFileData(body.image) ||
      (Array.isArray(body.image) && body.image.some(isFileData));
    const wantsResumeUpload =
      isFileData(body.resume) || isFileData(body.resume?.base64);
    if (!uploadsEnabled() && (wantsImageUpload || wantsResumeUpload)) {
      return rejectUpload(res);
    }

    // Image and resume are resolved below; never trust the raw values
    delete params.image;
    delete params.resume;

    const hasBase64Image =
      uploadsEnabled() &&
      ((Array.isArray(body.image) && body.image.length > 0 && body.image[0]) ||
      (typeof body.image === "string" &&
        body.image.trim() !== "" &&
        !body.image.startsWith(CLOUDINARY_PREFIX)));

    if (hasBase64Image) {
      const imageToUpload = Array.isArray(body.image)
        ? body.image[0]
        : body.image;

      const uploadResult = await uploadFileToCloudinary(
        imageToUpload,
        `user-${id}-avatar`
      );
      if (!uploadResult) {
        return res.status(500).json({ message: "Error uploading image" });
      }
      params.image = uploadResult.secure_url;
    } else if (
      typeof body.image === "string" &&
      body.image.trim().startsWith(CLOUDINARY_PREFIX)
    ) {
      params.image = body.image.trim();
    }

    if (
      uploadsEnabled() &&
      body.resume &&
      typeof body.resume.base64 === "string" &&
      !body.resume.base64.startsWith(CLOUDINARY_PREFIX)
    ) {
      const uploadResult = await uploadFileToCloudinary(
        body.resume.base64,
        `user-${id}-resume`
      );
      if (!uploadResult) {
        return res.status(500).json({ message: "Error uploading resume" });
      }
      params.resume = uploadResult.secure_url;
    } else if (
      typeof body.resume === "string" &&
      body.resume.startsWith(CLOUDINARY_PREFIX)
    ) {
      params.resume = body.resume;
    }

    if (params.email && params.email !== req.user.email) {
      const taken = await User.exists({ email: params.email, _id: { $ne: id } });
      if (taken) {
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    if (params.password) {
      params.password = await hashPassword(params.password);
    }

    const updatedUser = await userServices.updateUser(id, params);
    if (!updatedUser) {
      return res.status(500).json({ message: "Error updating user" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};
