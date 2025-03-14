import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import searchRouter from "./searchRouter.js";
const defaultRouter = Router();
defaultRouter.get("/home", (req, res) => {
  res.send("Welcome to the home page");
});
defaultRouter.use("/user", userRouter);
defaultRouter.use("/post", postRouter);
defaultRouter.use("/search", searchRouter);
export default defaultRouter;
