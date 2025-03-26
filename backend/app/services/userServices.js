import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import uploadFileToCloudinary from "../utility/cloudinary.config.js";

const createUser = async (user) => {
  const newUser = new User(user);
  const returnedUser = await newUser.save();
  if (!returnedUser) return null;
  return returnedUser;
};
const findOneUser = async (params) => {
  
  const newUser = await User.findOne(params).select("-password");
  if (!newUser) return null;
  return newUser;
};
const findOneUserById = async (id) => {
  const newUser = await User.findById(id).select("-password");
  if (!newUser) return null;
  return newUser;
};
const findAllUser = async () => {
  const newUser = await User.find().select("-password");
  if (!newUser) return null;
  return newUser;
};
const updateUser = async (params, user) => {
  const newUser = await User.findOneAndUpdate(params, user,{new:true}).select("-password");
  if (!newUser) return null;
  return newUser;
};
const addNewPost = async (postId, userId) => {
  console.log(postId, userId);
  const newUser = await User.findByIdAndUpdate(userId, {
    $push: { posts: postId },
  },{new:true}).select("-password");
  if (!newUser) return null;
  return newUser;
};
const deleteUser = async (params) => {
  const newUser = await User.findOneAndDelete(params);
  if (!newUser) return null;
  return newUser;
};

const getUserPostsById = async (posts) => {
  let allPosts = [];
  for (let i = 0; i < posts.length; i++) {
    const post = await (posts[i]);
    allPosts.push(post);
  }
  return res.status(200).json({
    posts: "user.posts",
  });
};
export {
  createUser,
  findOneUser,
  findAllUser,
  updateUser,
  deleteUser,
  findOneUserById,
  addNewPost,
};
