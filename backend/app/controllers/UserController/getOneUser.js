import * as userServices from "../../services/userServices.js";

export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userServices.findOneUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};
