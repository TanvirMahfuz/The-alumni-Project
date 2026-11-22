import * as userServices from "../../services/userServices.js";
import { getMultiplePosts } from "../../services/postServices.js";

export const userPosts = async (req, res) => {
  try {
    console.log("Inside userPosts");
    const id = req.params.id;
    console.log(id);
    const user = await userServices.findOneUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await getMultiplePosts(user.posts, user);
    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};
