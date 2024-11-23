import Router from "express";
const userRouter = Router();
import isLoggedIn from "../middlewares/auth.middleware.js";
import * as userUtility from "../utility/auth.js";
import * as userController from "../controllers/userController.js";

userRouter.get("/home", isLoggedIn, userController.getAllUsers);

userRouter.post("/user/register", userController.registerUser);

userRouter.post("/user/login", userUtility.login);

userRouter.post("/user/info", isLoggedIn, userController.getOneUser);

export default userRouter;
