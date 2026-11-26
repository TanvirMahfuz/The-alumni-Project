import { deletePost } from "../../services/postServices.js";
import { removePostFromUser } from "../../services/userServices.js";

// body: { id: <postId> }
export const deletePostController = async (req, res) => {
  try {
    const post = await deletePost(req.body, req.user._id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or you are not its author" });
    }
    await removePostFromUser(post._id, req.user._id);
    return res.status(200).json({ message: "Post deleted", data: post });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error deleting post" });
  }
};
