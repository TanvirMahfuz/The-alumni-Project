import { sendRecruitmentError } from "./errors.js";
import { getRecruitmentById } from "../../services/recruitmentServices.js";

// @desc    Get a single job posting
// @route   GET /api/recruitment/:id
// @access  Public
export const getJobPosting = async (req, res) => {
  try {
    const jobPosting = await getRecruitmentById(req.params.id);

    if (!jobPosting) {
      return res
        .status(404)
        .json({ success: false, message: "Job posting not found" });
    }

    res.status(200).json({
      success: true,
      data: jobPosting,
    });
  } catch (error) {
    console.error("Error getting job posting:", error);
    return sendRecruitmentError(res, error);
  }
};
