import { sendRecruitmentError } from "./errors.js";
import { searchJobPostings } from "../../services/recruitmentServices.js";

// @desc    Search job postings
// @route   GET /api/recruitment/search
// @access  Public
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const searchJobPostingsController = async (req, res) => {
  try {
    if (!req.query.q || typeof req.query.q !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a search term" });
    }

    const { type, location } = req.query;
    const filters = {
      ...(typeof type === "string" && type && { type }),
      ...(typeof location === "string" &&
        location && {
          location: new RegExp(escapeRegex(location.slice(0, 100)), "i"),
        }),
    };

    const results = await searchJobPostings(req.query.q, filters);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error searching job postings:", error);
    return sendRecruitmentError(res, error);
  }
};
