import Router from "express";
const authRouter = Router();
import {isLoggedIn} from "../middlewares/auth.middleware.js";
import { login, logout,registerUser,checkUser } from "../utility/auth.js";


authRouter.post("/register",registerUser);

authRouter.get("/check",checkUser);

authRouter.post("/log-in", login);

authRouter.get("/log-out", logout);


export default authRouter;
