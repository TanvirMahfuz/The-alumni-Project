import jwt from "jsonwebtoken";
import {findOneUser} from "../services/userServices.js";
export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token received:", token);
  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "decoding failed" });
    }
    const newUser = await findOneUser({ _id: decoded._id });
    req.user = newUser
    next();
  } catch (error) {
    return res.status(401).json({message: "Unauthorized"});
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}