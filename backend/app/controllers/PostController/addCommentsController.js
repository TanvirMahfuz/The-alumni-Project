import { commentOnPost } from "../../services/postServices.js";

export const addCommentsController = async (req, res) => {
  try {
    const data = req.body;
    let post = await commentOnPost({
      id: data.postId,
      content: data.comment,
      author: req.user._id,
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "comment add successfully",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
