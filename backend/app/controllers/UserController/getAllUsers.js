import * as userServices from "../../services/userServices.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.findAllUser();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
