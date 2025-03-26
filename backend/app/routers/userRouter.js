import Router from "express";
const userRouter = Router();

import * as userController from "../controllers/userController.js";

userRouter.get("/info/:id", userController.getOneUser);

userRouter.get("/allUsers", userController.getAllUsers);

userRouter.get("/userPosts/:id", userController.userPosts);

export default userRouter;
