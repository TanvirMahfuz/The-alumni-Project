export const deleteCommentsController = async (req, res) => {
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
