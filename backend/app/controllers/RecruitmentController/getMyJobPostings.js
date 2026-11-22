import { getJobsByAuthor } from "../../services/recruitmentServices.js";

// @desc    Get jobs posted by current user
// @route   GET /api/recruitment/my-jobs
// @access  Private/Employer
export const getMyJobPostings = async (req, res) => {
  try {
    const jobs = await getJobsByAuthor(req.user._id);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error getting user's job postings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
