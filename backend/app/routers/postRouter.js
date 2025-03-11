import Router from "express";
const postRouter = Router();
import isLoggedIn from "../middlewares/auth.middleware.js";
import * as postController from "../controllers/postController.js";
import upload from "../middlewares/multer.middleware.js";
postRouter.get("/allPosts", isLoggedIn, postController.getAllPostsController);
postRouter.get("/post/:id", isLoggedIn, postController.getPostByIdController);
postRouter.post(
  "/createPost",
  isLoggedIn,
  upload.array("images", 5),
  postController.createPostController
);
postRouter.put("/updatePost", isLoggedIn, postController.updatePostController);
postRouter.delete(
  "/deletePost",
  isLoggedIn,

  postController.deletePostController
);
postRouter.post("/likepost", isLoggedIn, postController.likePostController);
postRouter.post(
  "/addComments",
  isLoggedIn,
  postController.addCommentsController
);
postRouter.post(
  "/deleteComments",
  isLoggedIn,
  postController.deleteCommentsController
);
postRouter.get(
  "/comments/:id",
  isLoggedIn,
  postController.getCommentsController
);
export default postRouter;
