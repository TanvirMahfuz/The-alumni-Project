import {
  createPost,
  getAllPosts,
  getPostById,
  getOnePost,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
} from "../services/postServices.js";
import {findOneUserById,addNewPost} from "../services/userServices.js";
import uploadFileToCloudinary from "../utility/cloudinary.config.js";
const createPostController = async (req, res) => {
  try {
    let data = req.body;
    data.author = req.user._id;
    console.log(data);
    if (req.files) {
      const images = req.files.map((file) => ({
        path: file.path,
        filename: file.filename,
      }));
      try {
        const uploadedFiles = await Promise.all(
          images.map(async (image) => {
            const uploadedFile = await uploadFileToCloudinary(
              image.path,
              image.filename
            );
            return uploadedFile?.secure_url; // This will return secure_url directly
          })
        );
        data.images = uploadedFiles;
      } catch (error) {
        console.error("File upload error:", error.message);
      }
    }
    if (data.description.length <= 0 && data.images.length <= 0) {
      return res.status(400).json({
        message: "Post creation failed",
      });
    }
    const post = await createPost(data);
    if (!post) {
      return res.status(400).json({
        message: "Post creation failed",
      });
    }
   
    const user = await addNewPost(post._id, data.author );
    if (!user) {
      return res.status(400).json({
        message: "Post created but user not updated",
      });
    }
    return res.status(200).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post creation failed",
    });
  }
};
const getAllPostsController = async (req, res) => {
  try {
    let posts = await getAllPosts();
    posts = await Promise.all(
      posts.map(async (post) => {
        post.author = await findOneUserById(post.author);
        return post;
      })
    );

    if (!posts) {
      res.status(400).json({
        message: "Posts not found",
      });
    }
    res.status(200).json({
      message: "Posts found",
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Posts not found",
    });
  }
};
const getPostByIdController = async (req, res) => {
  try {
    const data = req.params.id;
    console.log(data);
    let post = await getOnePost(data);
    if (!post) {
      res.status(400).json({
        message: "Post not found",
      });
    }
    post.author = await findOneUserById(post.author);
    res.status(200).json({
      message: "Post found",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
const updatePostController = async (req, res) => {
  try {
    const data = req.body;
    const post = await updatePost(data);
    if (!post) {
      res.status(400).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Post updated",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
const deletePostController = async (req, res) => {
  try {
    const data = req.body;
    const post = await deletePost(data);
    if (!post) {
      res.status(400).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Post deleted",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
const likePostController = async (req, res) => {
  try {
    const data = req.body;
    const post = await likePost(data);
    if (!post) {
      res.status(400).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Post liked",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};

const addCommentsController = async (req, res) => {
  try {
    const data = req.body;
    let post = await commentOnPost({
      id: data.postId,
      content: data.comment,
      author: req.user._id,
    });
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Post liked",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
const deleteCommentsController = async (req, res) => {
  try {
    const data = req.body;
    const post = await deleteComments(data);
    if (!post) {
      res.status(400).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Post liked",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Post not found",
    });
  }
};
const getCommentsController = async (req, res) => {
  try {
    let post = await getOnePost(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    for (let comment of post.comments) {
      comment.author = await findOneUserById(comment.author);
      if (!comment.author) {
        comment.author = null;
      }
    }
    return res.status(200).json({
      data: post,
      message: "working",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
};
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
};
