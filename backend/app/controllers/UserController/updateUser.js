import * as userServices from "../../services/userServices.js";
import { validateUserUpdate } from "../../utility/updateValidation.js";
import uploadFileToCloudinary from "../../utility/cloudinaryUploadBase64.js";

export const updateUser = async (req, res) => {
  const proid = req.body._id;
  if (proid !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id = req.user._id;
  const body = req.body;
  //validation
  const params = validateUserUpdate(id, body);

  if (!params) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const hasBase64Image =
    (Array.isArray(body.image) &&
      body.image.length > 0 &&
      body.image[0]) ||
    (typeof body.image === "string" &&
      body.image.trim() !== "" &&
      !body.image.startsWith("https://res.cloudinary.com/dtpuispy4/"));

  if (hasBase64Image) {
    const imageToUpload = Array.isArray(body.image) ? body.image[0] : body.image;

    const uploadResult = await uploadFileToCloudinary(imageToUpload, id);
    if (!uploadResult) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    params.image = uploadResult.secure_url;
    console.log("Image uploaded successfully", uploadResult.secure_url);
  } else if (
    typeof body.image === "string" &&
    body.image.trim().startsWith("https://res.cloudinary.com/dtpuispy4/")
  ) {
    params.image = body.image;
  }

  if (
    body.resume &&
    body.resume.base64 &&
    !body.resume.base64.startsWith("https://res.cloudinary.com/dtpuispy4/")
  ) {
    console.log("Uploading resume to cloudinary");
    const uploadResult = await uploadFileToCloudinary(body.resume.base64, id);
    if (!uploadResult) {
      return res.status(500).json({ message: "Error uploading resume" });
    }
    params.resume = uploadResult.secure_url;
    console.log("Resume uploaded successfully", uploadResult.secure_url);
  }
  console.log("Params to update:", params);
  const updatedUser = await userServices.updateUser(id, params);
  if (!updatedUser) {
    return res.status(500).json({ message: "Error updating user" });
  }

  res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
};
