import { sendRecruitmentError } from "./errors.js";
import { updateJobPosting } from "../../services/recruitmentServices.js";

// @desc    Update a job posting
// @route   PUT /api/recruitment/:id
// @access  Private/Employer
export const updateJobPostingController = async (req, res) => {
  try {
    const updatedJob = await updateJobPosting(
      req.params.id,
      req.body,
      req.user._id
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job posting:", error);
    return sendRecruitmentError(res, error);
  }
};
