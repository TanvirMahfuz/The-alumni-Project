import { addResumeToApplication } from "../../services/recruitmentServices.js";

// @desc    Apply for a job
// @route   POST /api/recruitment/:id/apply
// @access  Private/Applicant
export const reviewForJobController = async (req, res) => {
  try {
    const updatedRecruitment = await addResumeToApplication(
      req.body.id,
      req.user._id
    );
    if (!updatedRecruitment) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found or unauthorized",
      });
    }
    res.status(201).json({
      success: true,
      data: updatedRecruitment,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
