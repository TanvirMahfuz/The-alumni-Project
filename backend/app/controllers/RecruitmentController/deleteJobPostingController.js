import { sendRecruitmentError } from "./errors.js";
import { deleteJobPosting } from "../../services/recruitmentServices.js";

// @desc    Delete a job posting
// @route   DELETE /api/recruitment/:id
// @access  Private/Employer
export const deleteJobPostingController = async (req, res) => {
  try {
    const deletedJob = await deleteJobPosting(req.params.id, req.user._id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    return sendRecruitmentError(res, error);
  }
};
