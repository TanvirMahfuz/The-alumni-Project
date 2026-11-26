import { updatePost } from "../../services/postServices.js";

// body: { id: <postId>, data: { description?, images? } }
export const updatePostController = async (req, res) => {
  try {
    const post = await updatePost(req.body, req.user._id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or you are not its author" });
    }
    return res.status(200).json({ message: "Post updated", data: post });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error updating post" });
  }
};
