import mongoose from "mongoose";
import Post from "../models/postModel.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createPost = async (data) => {
  try {
    const post = new Post(data);
    await post.save();
    return post;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    return await Post.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const getPostById = async (id) => {
  try {
    if (!isValidId(id)) return null;
    return await Post.findById(id);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const getOnePost = getPostById;

// Fetch the given post ids, skipping any that no longer exist
export const getMultiplePosts = async (ids, user) => {
  try {
    const posts = await Post.find({ _id: { $in: ids } }).sort({ createdAt: -1 });
    return posts.map((post) => {
      post.author = user;
      return post;
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

// Only the post's author can update it; only description/images are editable
export const updatePost = async ({ id, data }, userId) => {
  try {
    if (!isValidId(id) || !data || typeof data !== "object") return null;
    const allowed = {};
    if (typeof data.description === "string") allowed.description = data.description;
    if (Array.isArray(data.images)) allowed.images = data.images;
    return await Post.findOneAndUpdate({ _id: id, author: userId }, allowed, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

// Only the post's author can delete it
export const deletePost = async ({ id }, userId) => {
  try {
    if (!isValidId(id)) return null;
    return await Post.findOneAndDelete({ _id: id, author: userId });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const likePost = async ({ id }, userId) => {
  try {
    if (!isValidId(id)) return null;
    return await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true }
    );
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const removeLike = async ({ id }, userId) => {
  try {
    if (!isValidId(id)) return null;
    return await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    );
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const commentOnPost = async ({ id, content, author }) => {
  try {
    if (!isValidId(id)) return null;
    return await Post.findByIdAndUpdate(
      id,
      { $push: { comments: { content, author } } },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

// The comment's author or the post's author may delete a comment
export const deleteComment = async ({ id, commentId }, userId) => {
  try {
    if (!isValidId(id) || !isValidId(commentId)) return null;
    return await Post.findOneAndUpdate(
      {
        _id: id,
        $or: [
          { author: userId },
          { comments: { $elemMatch: { _id: commentId, author: userId } } },
        ],
      },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
