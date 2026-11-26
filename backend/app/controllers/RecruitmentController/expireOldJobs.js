import { sendRecruitmentError } from "./errors.js";
import { expireOldJobPostings } from "../../services/recruitmentServices.js";

// @desc    Expire old job postings (cron job)
// @route   POST /api/recruitment/expire-old
// @access  Private/Admin
export const expireOldJobs = async (req, res) => {
  try {
    const result = await expireOldJobPostings();

    res.status(200).json({
      success: true,
      message: `Expired ${result.modifiedCount} job postings`,
    });
  } catch (error) {
    console.error("Error expiring old job postings:", error);
    return sendRecruitmentError(res, error);
  }
};
