import recruitment from "../models/recruitmentModel.js";
import User from "../models/userModel.js";

export const createRecruitment = async (jobData, authorId) => {
  const jobPosting = new recruitment({
    // Changed JobPosting to recruitment
    ...jobData,
    author: authorId,
  });
  return await jobPosting.save(); // Changed jobPosting.save()
};

export const getRecruitmentById = async (id) => {
  return await recruitment
    .findById(id)
    .populate("author", "name email")
    .populate("applications.applicant", "name email");
};

export const getAllJobPostings = async () => {
  return await recruitment.find()// Changed JobPosting to recruitment

};

export const updateJobPosting = async (id, updateData, authorId) => {
  const jobPosting = await recruitment.findOne({ _id: id, author: authorId }); // Changed JobPosting to recruitment
  if (!jobPosting) {
    throw new Error("Job posting not found or unauthorized");
  }

  Object.assign(jobPosting, updateData);
  return await jobPosting.save();
};

export const deleteJobPosting = async (id, authorId) => {
  const jobPosting = await recruitment.findOne({ _id: id, author: authorId }); // Changed JobPosting to recruitment
  if (!jobPosting) {
    throw new Error("Job posting not found or unauthorized");
  }

  return await jobPosting.remove();
};

export const applyForJob = async (jobId, applicantId, applicationData) => {
  const { resume, coverLetter } = applicationData;

  return await recruitment.findByIdAndUpdate(
    // Changed JobPosting to recruitment
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
  const jobPosting = await recruitment.findOne({
    // Changed JobPosting to recruitment
    _id: jobId,
    author: authorId,
    "applications._id": applicationId,
  });

  if (!jobPosting) {
    throw new Error("Job posting or application not found, or unauthorized");
  }

  const application = jobPosting.applications.id(applicationId);
  application.status = newStatus;

  return await jobPosting.save();
};

export const searchJobPostings = async (searchTerm, filters = {}) => {
  return await recruitment
    .find({
      // Changed JobPosting to recruitment
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
    // Changed JobPosting to recruitment
    { expiresAt: { $lt: cutoffDate }, isActive: true },
    { $set: { isActive: false } }
  );
};
export const addResumeToApplication = async (jobId, applicantId) => {
  try {
    // Validate inputs
    if (!jobId || !applicantId) {
      throw new Error("Both jobId and applicantId are required");
    }

    // Find job posting and applicant in parallel
    const [jobPosting, applicant] = await Promise.all([
      recruitment.findById(jobId),
      User.findById(applicantId).select("+resume"), // Ensure resume is included
    ]);

    // Check if both exist
    if (!jobPosting) {
      throw new Error("Job posting not found");
    }
    if (!applicant) {
      throw new Error("Applicant not found");
    }
    if (!applicant.resume) {
      throw new Error("Applicant has no resume uploaded");
    }

    // Check if applicant already applied
    const existingApplicationIndex = jobPosting.applications.findIndex(
      (app) => app.applicant.toString() === applicantId.toString()
    );

    if (existingApplicationIndex !== -1) {
      // Update existing application
      jobPosting.applications[existingApplicationIndex] = {
        ...jobPosting.applications[existingApplicationIndex].toObject(),
        resume: applicant.resume,
        status: "updated", // or "updated" if you prefer
        updatedAt: new Date(), // Add update timestamp
      };

      console.log("Updated existing application with new resume");
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
      message: error.message,
      error: error,
    };
  }
};