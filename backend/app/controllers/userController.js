
import * as userServices from "../services/userServices.js";
import { getMultiplePosts } from "../services/postServices.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.findAllUser();
    if (!users) {
      return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({message: "Error fetching users", error: error.message});
  }
};
export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userServices.findOneUserById(id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user});
  } catch (error) {
    return res
      .status(500)
      .json({message: "Error fetching users", error: error.message});
  }
};
export const updateUser = async (req, res) => {
  const {id, body} = req.body;
  const user = await userServices.findOneUser({_id: id});
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }
  const updatedUser = await userServices.updateUser({_id: id}, body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(500).json({message: "Error updating user"});
  }
  console.log(updatedUser);
  res
    .status(200)
    .json({message: "User updated successfully", user: updatedUser});
};
export const userPosts = async (req,res)=>{

  try {
        const id = req.params.id;
        const user = await userServices.findOneUserById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        };

        const posts = await getMultiplePosts(user.posts);

        return res
          .status(200)
          .json({
            posts
          });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
}
