import { updateApplicationStatus } from "../../services/recruitmentServices.js";

// @desc    Update application status
// @route   PUT /api/recruitment/:jobId/applications/:applicationId
// @access  Private/Employer
export const updateApplicationStatusController = async (req, res) => {
  try {
    const jobPosting = await updateApplicationStatus(
      req.params.jobId,
      req.params.applicationId,
      req.body.status,
      req.user._id
    );

    if (!jobPosting) {
      return res.status(404).json({
        success: false,
        message: "Application not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      data: jobPosting,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
