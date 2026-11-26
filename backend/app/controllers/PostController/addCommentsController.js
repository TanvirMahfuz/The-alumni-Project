import { commentOnPost } from "../../services/postServices.js";

// body: { postId, comment }
export const addCommentsController = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (typeof comment !== "string" || comment.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }
    const post = await commentOnPost({
      id: postId,
      content: comment,
      author: req.user._id,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "comment add successfully", data: post });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error adding comment" });
  }
};
