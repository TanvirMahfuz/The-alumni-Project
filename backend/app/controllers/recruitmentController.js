import {
  createRecruitment,
  getRecruitmentById,
  getAllJobPostings,
  updateJobPosting,
  deleteJobPosting,
  applyForJob,
  updateApplicationStatus,
  searchJobPostings,
  getJobsByAuthor,
  expireOldJobPostings,
  addResumeToApplication,
} from "../services/recruitmentServices.js";

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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single job posting
// @route   GET /api/recruitment/:id
// @access  Public
export const getJobPosting = async (req, res) => {
  console.log("Received request to get job posting:", req.params.id);
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all job postings
// @route   GET /api/recruitment
// @access  Public
export const getJobPostings = async (req, res) => {
  try {

    const jobPostings = await getAllJobPostings();

    res.status(200).json({
      success: true,
      count: jobPostings.length,
      data: jobPostings,
    });
  } catch (error) {
    console.error("Error getting all job postings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

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
      return res
        .status(404)
        .json({
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a job posting
// @route   DELETE /api/recruitment/:id
// @access  Private/Employer
export const deleteJobPostingController = async (req, res) => {
  try {
    const deletedJob = await deleteJobPosting(req.params.id, req.user._id);

    if (!deletedJob) {
      return res
        .status(404)
        .json({
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
    res.status(500).json({ success: false, message: error.message });
  }
};

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
      return res
        .status(404)
        .json({
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

// @desc    Get jobs posted by current user
// @route   GET /api/recruitment/my-jobs
// @access  Private/Employer
export const getMyJobPostings = async (req, res) => {
  try {
    const jobs = await getJobsByAuthor(req.user._id);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error getting user's job postings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Expire old job postings (cron job)
// @route   POST /api/recruitment/expire-old
// @access  Private/Admin
export const expireOldJobs = async (req, res) => {
  try {
    const result = await expireOldJobPostings();

    res.status(200).json({
      success: true,
      message: `Expired ${result.nModified} job postings`,
    });
  } catch (error) {
    console.error("Error expiring old job postings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
