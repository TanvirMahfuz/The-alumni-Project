import { searchJobPostings } from "../../services/recruitmentServices.js";

// @desc    Search job postings
// @route   GET /api/recruitment/search
// @access  Public
export const searchJobPostingsController = async (req, res) => {
  try {
    if (!req.query.q) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a search term" });
    }

    const filters = {
      ...(req.query.type && { type: req.query.type }),
      ...(req.query.location && {
        location: new RegExp(req.query.location, "i"),
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
    res.status(500).json({ success: false, message: error.message });
  }
};
