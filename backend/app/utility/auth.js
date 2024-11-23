import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as userServices from "../services/userServices.js";

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userServices.findOneUser({email});
    if (!user) {
      return res.status(401).json({message: "Invalid credentials"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: "Invalid credentials"});
    }
    const token = jwt.sign(
      {name: user.name, userMail: user.email},
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({message: "User logged in successfully", user});
  } catch (error) {
    res.status(500).json({message: "Error logging in", error: error.message});
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({message: "User logged out successfully"});
};
export {login, logout};
