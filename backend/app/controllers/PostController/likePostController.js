import { likePost } from "../../services/postServices.js";

export const likePostController = async (req, res) => {
  try {
    const data = req.body;
    //expected data = {id:#,userId:#}
    console.log(data);
    const post = await likePost(data);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Post liked",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
