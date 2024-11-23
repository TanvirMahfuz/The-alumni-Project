import jwt from "jsonwebtoken";
import {findOneUser} from "../services/userServices.js";
const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await findOneUser({email: decoded.userMail});
    next();
  } catch (error) {
    return res.status(401).json({message: "Unauthorized"});
  }
};
export default isLoggedIn;
