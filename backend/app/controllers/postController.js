import { createPostController } from "./PostController/createPostController.js";
import { getAllPostsController } from "./PostController/getAllPostsController.js";
import { getPostByIdController } from "./PostController/getPostByIdController.js";
import { updatePostController } from "./PostController/updatePostController.js";
import { deletePostController } from "./PostController/deletePostController.js";
import { likePostController } from "./PostController/likePostController.js";
import { addCommentsController } from "./PostController/addCommentsController.js";
import { deleteCommentsController } from "./PostController/deleteCommentsController.js";
import { getCommentsController } from "./PostController/getCommentsController.js";
import { removeLikeController } from "./PostController/removeLikeController.js";

export {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  likePostController,
  addCommentsController,
  deleteCommentsController,
  getCommentsController,
  removeLikeController,
};
