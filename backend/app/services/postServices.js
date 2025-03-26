import mongoose from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const createPost = async (data) => {
  console.log(data);
  try {
    const post = await new Post(data);
    post.save();
    return post;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const getAllPosts = async () => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const getPostById = async (id) => {
  try {
    console.log(data);
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const getOnePost = async (id) => {
  try {
    const post = await Post.findOne({_id: id});
    return post;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const getMultiplePosts = async (data) => {
  try {
    let allPosts = [];
    for (let i = 0; i < data.length; i++) {
      const post = await Post.findById(data[i]);
      allPosts.push(post);
    }
    return allPosts;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const updatePost = async (data) => {
  try {
    const post = await Post.findByIdAndUpdate(data.id, data.data);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const deletePost = async (data) => {
  try {
    const val = await Post.findByIdAndDelete(data.id);
    return val;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const likePost = async (data) => {
  try {
    const val = await Post.findByIdAndUpdate(data.id, {
      $push: {likes: data.userId},
    });
    return val;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const commentOnPost = async (data) => {
  try {
    console.log(data);
    let val = await Post.findByIdAndUpdate(
      data.id,
      {
        $push: {comments: data},
      },
      {new: true}
    );
    return val;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const deleteComment = async () => {
  try {
    const val = await Post.findByIdAndUpdate(data.id, {
      $pull: {comments: data.data},
    });
    return val;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
