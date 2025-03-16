import bcrypt from "bcryptjs";
import * as userServices from "../services/userServices.js";
import { getMultiplePosts } from "../services/postServices.js";
import jwt from "jsonwebtoken";
import uploadFileToCloudinary from "../utility/cloudinary.config.js";
import {json} from "express";
import mongoose from "mongoose";
export const getAllUsers = async (req, res) => {
  try {
    console.log(req.user, "request to see all users");
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
  console.log(req.user, "request to see all users");
  try {
    let user = await userServices.findOneUserById( new mongoose.Types.ObjectId(req.query.id));
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user,canEdit:user._id.toString() === req.user._id.toString()});
  } catch (error) {
    return res
      .status(500)
      .json({message: "Error fetching users", error: error.message});
  }
};
export const registerUser = async (req, res) => {
  try {
    let {password, confirmPassword, email, ...userData} = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({message: "Passwords do not match"});

    if (await userServices.findOneUser({email}))
      return res.status(400).json({message: "User already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);
    let cloudinaryImage = null;

    if (req.file) {
      try {
        const uploadedFile = await uploadFileToCloudinary(
          req.file.path,
          req.file.filename
        );
        cloudinaryImage = uploadedFile?.secure_url;
      } catch (error) {
        console.error("File upload error:", error.message);
      }
    }

    userData.image = cloudinaryImage;
    try {
      userData.contacts = JSON.parse(userData.contacts);
    } catch (error) {
      console.error("Error parsing contacts:", error.message);
    }
    try {
      userData.jobExperience = JSON.parse(userData.jobExperience);
    } catch (error) {
      console.error("Error parsing jobExperience:", error.message);
    }
    try {
      userData.projects = JSON.parse(userData.projects);
    } catch (error) {
      console.error("Error parsing projects:", error.message);
    }

    const newUser = await userServices.createUser({
      ...userData,
      email,
      password: hashedPassword,
    });

    if (!newUser)
      return res.status(500).json({message: "Error registering user"});

    const token = jwt.sign(
      {name: newUser.name, userMail: newUser.email},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );

    res
      .status(201)
      .cookie("token", token, {httpOnly: true, secure: true})
      .json({message: "User registered successfully", user: newUser});
  } catch (error) {
    res
      .status(500)
      .json({message: "Error registering user", error: error.message});
  }
};

export const updateUser = async (req, res) => {
  const {id, body} = req.body;
  const user = await userServices.findOneUser({_id: id});
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }
  const updatedUser = await userServices.updateUser({_id: id}, body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(500).json({message: "Error updating user"});
  }
  console.log(updatedUser);
  res
    .status(200)
    .json({message: "User updated successfully", user: updatedUser});
};
export const userPosts = async (req,res)=>{
  try{
        const user = await userServices.findOneUserById(
          new mongoose.Types.ObjectId(req.query.id)
        );
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        };
    const posts = await getMultiplePosts(user.posts);
    console.log(posts);
        return res
          .status(200)
          .json({
            posts,
            canEdit: user._id.toString() === req.user._id.toString(),
          });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
}