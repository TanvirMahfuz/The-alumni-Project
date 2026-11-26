import { sendRecruitmentError } from "./errors.js";
import { createRecruitment } from "../../services/recruitmentServices.js";

// @desc    Create a new job posting
// @route   POST /api/recruitment
// @access  Private/Employer
export const createJobPosting = async (req, res) => {
  try {
    const jobPosting = await createRecruitment(req.body, req.user._id);
    res.status(201).json({
      success: true,
      data: jobPosting,
    });
  } catch (error) {
    console.error("Error creating job posting:", error);
    return sendRecruitmentError(res, error);
  }
};
