import Router from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const userRouter = Router();

import * as userController from "../controllers/userController.js";

userRouter.get("/info/:id", userController.getOneUser);

userRouter.get("/allUsers", userController.getAllUsers);

userRouter.get("/userPosts/:id", userController.userPosts);

userRouter.put("/updateUser",isLoggedIn, userController.updateUser);

export default userRouter;
