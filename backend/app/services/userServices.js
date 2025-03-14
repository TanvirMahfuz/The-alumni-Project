import User from "../models/userModel.js";

const createUser = async (user) => {
  const newUser = new User(user);
  const returnedUser = await newUser.save();
  if (!returnedUser) return null;
  return returnedUser;
};
const findOneUser = async (params) => {
  const newUser = await User.findOne(params);
  if (!newUser) return null;
  return newUser;
};
const findOneUserById = async (id) => {
  const newUser = await User.findById(id);
  if (!newUser) return null;
  return newUser;
};
const findAllUser = async () => {
  const newUser = await User.find();
  if (!newUser) return null;
  return newUser;
};
const updateUser = async (params, user) => {
  const newUser = await User.findOneAndUpdate(params, user);
  if (!newUser) return null;
  return newUser;
};
const addNewPost = async (postId, userId) => {
  console.log(postId, userId);
  const newUser = await User.findByIdAndUpdate(userId, {
    $push: { posts: postId },
  });
  if (!newUser) return null;
  return newUser;
};
const deleteUser = async (params) => {
  const newUser = await User.findOneAndDelete(params);
  if (!newUser) return null;
  return newUser;
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
