
import * as userServices from "../services/userServices.js";
import { getMultiplePosts } from "../services/postServices.js";
import { validateUserUpdate } from "../utility/updateValidation.js";
import uploadFileToCloudinary from "../utility/cloudinary.config.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.findAllUser();
    if (!users) {
      return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({message: "Error fetching users", error: error.message});
  }
};
export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userServices.findOneUserById(id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user});
  } catch (error) {
    return res
      .status(500)
      .json({message: "Error fetching users", error: error.message});
  }
};

export const updateUser = async (req, res) => {
  const proid = req.body._id;
  if (proid !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  
  const id = req.user._id
  const body = req.body;
  //validation
  const params = validateUserUpdate(id, body);

  if (!params) {
    return res.status(400).json({ message: "Invalid request" });
  }
  if (body.image){
    return res.status(400).json({ message: "Image not allowed yet" });
  }
  if(body.resume){
    console.log("Uploading resume to cloudinary");
    const uploadResult = await uploadFileToCloudinary(body.resume.base64, id);
    if (!uploadResult) {
      return res.status(500).json({ message: "Error uploading resume" });
    }
    params.resume = uploadResult.secure_url;
    console.log("Resume uploaded successfully", uploadResult.secure_url);
  }
  const updatedUser = await userServices.updateUser(id, params);
  if (!updatedUser) {
    return res.status(500).json({message: "Error updating user"});
  }

  res
    .status(200)
    .json({message: "User updated successfully", user: updatedUser});
};
export const userPosts = async (req,res)=>{
  try {
        const id = req.params.id;
        const user = await userServices.findOneUserById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        };

        const posts = await getMultiplePosts(user.posts);

        return res
          .status(200)
          .json({
            posts
          });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
}
