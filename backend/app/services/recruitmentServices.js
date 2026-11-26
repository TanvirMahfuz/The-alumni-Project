import mongoose from "mongoose";
import recruitment from "../models/recruitmentModel.js";

// Errors with a status are mapped to that HTTP status by the controllers
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Fields clients must never set directly on a job posting
const stripProtected = ({ _id, author, applications, postedAt, __v, ...rest } = {}) =>
  rest;

const assertId = (id, label = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpError(400, `Invalid ${label}`);
  }
};
import User from "../models/userModel.js";

export const createRecruitment = async (jobData, authorId) => {
  const jobPosting = new recruitment({
    ...stripProtected(jobData),
    author: authorId,
  });
  return await jobPosting.save();
};

export const getRecruitmentById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await recruitment
    .findById(id)
    .populate("author", "name email")
    .populate("applications.applicant", "name email");
};

export const getAllJobPostings = async () => {
  return await recruitment.find();
};

export const updateJobPosting = async (id, updateData, authorId) => {
  assertId(id, "job ID");
  const jobPosting = await recruitment.findOne({ _id: id, author: authorId });
  if (!jobPosting) {
    throw new HttpError(404, "Job posting not found or unauthorized");
  }

  Object.assign(jobPosting, stripProtected(updateData));
  return await jobPosting.save();
};

export const deleteJobPosting = async (id, authorId) => {
  assertId(id, "job ID");
  // Document#remove() no longer exists in Mongoose 7+
  return await recruitment.findOneAndDelete({ _id: id, author: authorId });
};

export const applyForJob = async (jobId, applicantId, applicationData) => {
  const { resume, coverLetter } = applicationData;

  return await recruitment.findByIdAndUpdate(
    jobId,
    {
      $push: {
        applications: {
          applicant: applicantId,
          resume,
          coverLetter,
          status: "applied",
        },
      },
    },
    { new: true }
  );
};

export const updateApplicationStatus = async (
  jobId,
  applicationId,
  newStatus,
  authorId
) => {
  assertId(jobId, "job ID");
  assertId(applicationId, "application ID");
  const jobPosting = await recruitment.findOne({
    _id: jobId,
    author: authorId,
    "applications._id": applicationId,
  });

  if (!jobPosting) {
    throw new HttpError(
      404,
      "Job posting or application not found, or unauthorized"
    );
  }

  const application = jobPosting.applications.id(applicationId);
  application.status = newStatus;

  return await jobPosting.save();
};

export const searchJobPostings = async (searchTerm, filters = {}) => {
  return await recruitment
    .find({
      $text: { $search: searchTerm },
      ...filters,
      isActive: true,
    })
    .sort({ score: { $meta: "textScore" }, isUrgent: -1 })
    .limit(20);
};

export const getJobsByAuthor = async (authorId) => {
  return await recruitment
    .find({ author: authorId })
    .sort({ postedAt: -1 })
    .populate("applications.applicant", "name email");
};

export const expireOldJobPostings = async () => {
  const cutoffDate = new Date();
  return await recruitment.updateMany(
    { expiresAt: { $lt: cutoffDate }, isActive: true },
    { $set: { isActive: false } }
  );
};
export const addResumeToApplication = async (jobId, applicantId) => {
  try {
    // Validate inputs
    if (!jobId || !applicantId) {
      throw new HttpError(400, "Both jobId and applicantId are required");
    }
    assertId(jobId, "job ID");

    // Find job posting and applicant in parallel
    const [jobPosting, applicant] = await Promise.all([
      recruitment.findById(jobId),
      User.findById(applicantId).select("+resume"), // Ensure resume is included
    ]);

    // Check if both exist
    if (!jobPosting) {
      throw new HttpError(404, "Job posting not found");
    }
    if (!applicant) {
      throw new HttpError(404, "Applicant not found");
    }
    if (!applicant.resume) {
      throw new HttpError(400, "Applicant has no resume uploaded");
    }

    // Check if applicant already applied
    const existingApplicationIndex = jobPosting.applications.findIndex(
      (app) => app.applicant?.toString() === applicantId.toString()
    );

    if (existingApplicationIndex !== -1) {
      // Update existing application
      jobPosting.applications[existingApplicationIndex] = {
        ...jobPosting.applications[existingApplicationIndex].toObject(),
        resume: applicant.resume,
        status: "updated", // or "updated" if you prefer
        updatedAt: new Date(), // Add update timestamp
      };

    } else {
      // Add new application
      jobPosting.applications.push({
        applicant: applicantId,
        resume: applicant.resume,

        status: "updated",
        createdAt: new Date(),
      });
    }

    // Save the updated job posting
    const updatedJobPosting = await jobPosting.save();

    return {
      success: true,
      message:
        existingApplicationIndex !== -1
          ? "Application updated successfully"
          : "Application submitted successfully",
      jobPosting: updatedJobPosting,
    };
  } catch (error) {
    console.error("Error in addResumeToApplication:", error.message);
    return {
      success: false,
      status: error.status || 500,
      message: error.status ? error.message : "Error applying for job",
    };
  }
};