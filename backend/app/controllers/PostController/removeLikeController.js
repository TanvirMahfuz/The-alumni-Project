import { removeLike } from "../../services/postServices.js";

// body: { id: <postId> } — always removes the logged-in user's like
export const removeLikeController = async (req, res) => {
  try {
    const post = await removeLike(req.body, req.user._id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Like removed from post", data: post });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
