import { deleteComment } from "../../services/postServices.js";

// body: { id: <postId>, commentId: <commentId> }
export const deleteCommentsController = async (req, res) => {
  try {
    const post = await deleteComment(req.body, req.user._id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Comment not found or not allowed to delete it" });
    }
    return res.status(200).json({ message: "Comment deleted", data: post });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error deleting comment" });
  }
};
