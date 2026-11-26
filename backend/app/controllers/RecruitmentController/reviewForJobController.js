import { sendRecruitmentError } from "./errors.js";
import { addResumeToApplication } from "../../services/recruitmentServices.js";

// @desc    Apply for a job
// @route   POST /api/recruitment/:id/apply
// @access  Private/Applicant
export const reviewForJobController = async (req, res) => {
  try {
    // POST /:id/apply uses the URL param; POST /review sends { id } in the body
    const jobId = req.params.id || req.body.id;
    const result = await addResumeToApplication(jobId, req.user._id);
    if (!result.success) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }
    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.jobPosting,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    return sendRecruitmentError(res, error);
  }
};
