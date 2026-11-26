import { getAllPosts } from "../../services/postServices.js";
import { findOneUserById } from "../../services/userServices.js";

export const getAllPostsController = async (req, res) => {
  try {
    let posts = await getAllPosts();
    if (!posts) {
      return res.status(500).json({ message: "Error fetching posts" });
    }
    posts = await Promise.all(
      posts.map(async (post) => {
        post.author = await findOneUserById(post.author);
        return post;
      })
    );
    return res.status(200).json({ message: "Posts found", data: posts });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error fetching posts" });
  }
};
