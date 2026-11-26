import { getOnePost } from "../../services/postServices.js";
import { findOneUserById } from "../../services/userServices.js";

export const getPostByIdController = async (req, res) => {
  try {
    const post = await getOnePost(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.author = await findOneUserById(post.author);
    return res.status(200).json({ message: "Post found", data: post });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error fetching post" });
  }
};
