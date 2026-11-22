import { getAllPosts } from "../../services/postServices.js";
import { findOneUserById } from "../../services/userServices.js";

export const getAllPostsController = async (req, res) => {
  try {
    let posts = await getAllPosts();
    posts = await Promise.all(
      posts.map(async (post) => {
        post.author = await findOneUserById(post.author);
        return post;
      })
    );

    if (!posts) {
      res.status(400).json({
        message: "Posts not found",
      });
    }
    res.status(200).json({
      message: "Posts found",
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Posts not found",
    });
  }
};
