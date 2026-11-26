import mongoose from "mongoose";
import User from "../models/userModel.js";

const createUser = async (user) => {
  const newUser = new User(user);
  const returnedUser = await newUser.save();
  return returnedUser || null;
};

const findOneUser = async (params) => {
  const user = await User.findOne(params).select("-password");
  return user || null;
};

const findOneUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const user = await User.findById(id).select("-password");
  return user || null;
};

const findAllUser = async () => {
  const users = await User.find().select("-password");
  return users || null;
};

const updateUser = async (id, params) => {
  return await User.findByIdAndUpdate(id, params, {
    new: true,
    runValidators: true,
  }).select("-password");
};

const addNewPost = async (postId, userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { posts: postId } },
    { new: true }
  ).select("-password");
  return user || null;
};

const removePostFromUser = async (postId, userId) => {
  return await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
};

const deleteUser = async (params) => {
  const user = await User.findOneAndDelete(params);
  return user || null;
};

export {
  createUser,
  findOneUser,
  findAllUser,
  updateUser,
  deleteUser,
  findOneUserById,
  addNewPost,
  removePostFromUser,
};
