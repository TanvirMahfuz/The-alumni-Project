import jwt from "jsonwebtoken";
import {findOneUser} from "../services/userServices.js";
export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await findOneUser({_id: decoded._id});
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