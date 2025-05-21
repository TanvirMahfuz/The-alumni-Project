import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import searchRouter from "./searchRouter.js";
import authRouter from "./authRouter.js";
import chatRouter from "./chatRouter.js";
import recruitmentRouter from "./recruitmentRouter.js"
import eventRouter from "./eventRouter.js";
import facultyRouter from "./facultyRouter.js";
const defaultRouter = Router();
defaultRouter.get("/home", (req, res) => {
  res.send("Welcome to the home page");
});
defaultRouter.use("/user", userRouter);
defaultRouter.use("/post", postRouter);
defaultRouter.use("/search", searchRouter);
defaultRouter.use("/auth", authRouter);
defaultRouter.use("/chat", chatRouter);
defaultRouter.use("/recruitment", recruitmentRouter);
defaultRouter.use("/event", eventRouter);
defaultRouter.use("/faculty", facultyRouter);
export default defaultRouter;
