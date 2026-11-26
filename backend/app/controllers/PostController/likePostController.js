import { likePost } from "../../services/postServices.js";

// body: { id: <postId> } — the liker is always the logged-in user
export const likePostController = async (req, res) => {
  try {
    const post = await likePost(req.body, req.user._id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Post liked", data: post });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
