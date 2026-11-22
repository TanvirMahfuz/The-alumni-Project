import { getAllJobPostings } from "../../services/recruitmentServices.js";

// @desc    Get all job postings
// @route   GET /api/recruitment
// @access  Public
export const getJobPostings = async (req, res) => {
  try {
    const jobPostings = await getAllJobPostings();

    res.status(200).json({
      success: true,
      count: jobPostings.length,
      data: jobPostings,
    });
  } catch (error) {
    console.error("Error getting all job postings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
