import Router from "express";
const userRouter = Router();
import isLoggedIn from "../middlewares/auth.middleware.js";
import * as userUtility from "../utility/auth.js";
import * as userController from "../controllers/userController.js";
import upload from "../middlewares/multer.middleware.js";
userRouter.post(
  "/register",
  upload.single("profileImage"),
  userController.registerUser
);
userRouter.get("/currentUser", isLoggedIn, async (req, res) => res.status(200).json({data:req.user}));
userRouter.post("/login", userUtility.login);

userRouter.get("/info", isLoggedIn, userController.getOneUser);

userRouter.get("/logout", userUtility.logout);

userRouter.get("/allUsers", isLoggedIn, userController.getAllUsers);

userRouter.get("/userPosts", isLoggedIn, userController.userPosts);

export default userRouter;
