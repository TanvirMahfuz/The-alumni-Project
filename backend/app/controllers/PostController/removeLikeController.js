import { removeLike } from "../../services/postServices.js";

export const removeLikeController = async (req, res) => {
  try {
    const data = req.body;
    // expected data = { id: <postId>, userId: <userId> }
    console.log(data);
    const post = await removeLike(data);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Like removed from post",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
