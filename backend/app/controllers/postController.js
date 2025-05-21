import {
  createPost,
  getAllPosts,
  getPostById,
  getOnePost,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
  removeLike
} from "../services/postServices.js";
import {findOneUserById,addNewPost} from "../services/userServices.js";

import uploadFileToCloudinary from "../utility/cloudinary64.js";

const createPostController = async (req, res) => {
  try {
    const { description, images } = req.body;
    const author = req.user._id;
    console.log(req.body)
    // Validate input
    if (!description && (!images || images.length === 0)) {
      console.log("Validation failed: No description and no images provided");
      return res.status(400).json({
        message: "Please provide a description or at least one image",
      });
    }
    

    // Prepare post data
    const postData = {
      author,
      description: description || "",
      images: [],
    };

    console.log("Post data before validation:", postData);  

    // Upload images to Cloudinary if they exist
    if (images && images.length > 0) {
      try {
        const uploadPromises = images.map(async (image) => {
          // Assuming image is already in base64 format
          // If not, you'll need to convert it first
          if (!image.startsWith("data:")) {
            console.warn("Image is not in base64 format, skipping");
            return null;
          }
          return await uploadFileToCloudinary(image);
        });

        const uploadedUrls = await Promise.all(uploadPromises);

        // Filter out any failed uploads (null values)
        postData.images = uploadedUrls
          .filter((url) => url?.secure_url)
          .map((img) => img.secure_url);

        // If we had images but none uploaded successfully
        if (images.length > 0 && postData.images.length === 0) {
          return res.status(400).json({
            message: "Failed to upload any images to Cloudinary",
          });
        }
      } catch (error) {
        console.error("Image upload process failed:", error);
        return res.status(500).json({
          message: "Error processing image uploads",
        });
      }
    }

    // Final validation before creating post
    if (!postData.description && postData.images.length === 0) {
      return res.status(400).json({
        message: "Post creation failed - no valid content provided",
      });
    }

    // Create post in database
    const post = await createPost(postData);
    if (!post) {
      return res.status(400).json({
        message: "Post creation failed",
      });
    }

    // Update user with new post reference
    const user = await addNewPost(post._id, author);
    if (!user) {
      // Consider whether to delete the post if user update fails
      await deletePost(post._id); // You'd need to implement this
      return res.status(400).json({
        message: "Post creation rolled back due to user update failure",
      });
    }

    return res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({
      message: "Post creation failed",
      error: error.message,
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
    //expected data = {id:#,userId:#}
    console.log(data)
    const post = await likePost(data);
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
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const removeLikeController = async (req, res) => {
  try {
    const data = req.body;
    // expected data = { id: <postId>, userId: <userId> }
    console.log(data);
    const post = await removeLike(data); 
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Like removed from post",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
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
      message: "comment add successfully",
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
  removeLikeController,
};
