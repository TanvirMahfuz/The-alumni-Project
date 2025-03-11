import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
const defaultRouter = Router();
defaultRouter.get("/home", (req, res) => {
  res.send("Welcome to the home page");
});
defaultRouter.use("/user", userRouter);
defaultRouter.use("/post", postRouter);
export default defaultRouter;
