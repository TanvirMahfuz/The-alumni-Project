import { createPost, deletePost } from "../../services/postServices.js";
import { addNewPost } from "../../services/userServices.js";
import uploadFileToCloudinary from "../../utility/cloudinaryUploadBase64.js";
import { uploadsEnabled, isFileData, rejectUpload } from "../../utility/uploads.js";

export const createPostController = async (req, res) => {
  try {
    const { description, images } = req.body;
    const author = req.user._id;
    // Validate input
    if (!description && (!images || images.length === 0)) {
      console.log("Validation failed: No description and no images provided");
      return res.status(400).json({
        message: "Please provide a description or at least one image",
      });
    }

    if (!uploadsEnabled() && Array.isArray(images) && images.length > 0) {
      return rejectUpload(res);
    }

    // Prepare post data
    const postData = {
      author,
      description: description || "",
      images: [],
    };

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
      // Roll back the post so it doesn't exist without an owner reference
      await deletePost({ id: post._id }, author);
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
    return res.status(500).json({ message: "Post creation failed" });
  }
};
