import { deletePost } from "../../services/postServices.js";

export const deletePostController = async (req, res) => {
  try {
    const data = req.body;
    const post = await deletePost(data);
    if (!post) {
      res.status(400).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Post deleted",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
