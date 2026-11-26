import { getOnePost } from "../../services/postServices.js";
import { findOneUserById } from "../../services/userServices.js";

export const getCommentsController = async (req, res) => {
  try {
    let post = await getOnePost(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    for (let comment of post.comments) {
      comment.author = await findOneUserById(comment.author);
      if (!comment.author) {
        comment.author = null;
      }
    }
    return res.status(200).json({
      data: post,
      message: "working",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error fetching comments",
    });
  }
};
