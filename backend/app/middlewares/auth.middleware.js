import jwt from "jsonwebtoken";
import { findOneUserById } from "../services/userServices.js";

export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded?._id ? await findOneUserById(decoded._id) : null;
    // Token is valid but the account no longer exists
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Must run after isLoggedIn
export const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Forbidden: admin only" });
};
