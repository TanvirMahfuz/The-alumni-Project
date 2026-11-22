import { getOnePost } from "../../services/postServices.js";
import { findOneUserById } from "../../services/userServices.js";

export const getPostByIdController = async (req, res) => {
  try {
    const data = req.params.id;
    console.log(data);
    let post = await getOnePost(data);
    if (!post) {
      res.status(400).json({
        message: "Post not found",
      });
    }
    post.author = await findOneUserById(post.author);
    res.status(200).json({
      message: "Post found",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
