import mongoose from "mongoose";

const recruitmentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applyLink: {
    type: String,
    required: [true, "Apply link is required"],
    trim: true,
  },
  applications: [
    {
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["updated", "ok", "rejected", "waiting"],
        default: "waiting",
      },
      resume: {
        type: String,
        required: true,
      },
      coverLetter: {
        type: String,
        default: "",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  position: {
    type: String,
    required: [true, "Position title is required"],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Job location is required"],
    trim: true,
  },
  salary: {
    type: String,
    required: [true, "Salary information is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Job type is required"],
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
    trim: true,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  perks: [
    {
      type: String,
      trim: true,
    },
  ],
  logo: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
    trim: true,
  },
  requirements: [
    {
      type: String,
      required: [true, "At least one requirement is needed"],
      trim: true,
    },
  ],
  benefits: [
    {
      type: String,
      trim: true,
    },
  ],
  applicationProcess: {
    type: String,
    required: [true, "Application process is required"],
    trim: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // Defaults to 30 days from now
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Indexes for better query performance
recruitmentSchema.index({
  position: "text",
  company: "text",
  description: "text",
});
recruitmentSchema.index({ isUrgent: 1, isActive: 1, expiresAt: 1 });

// Virtual for days remaining
recruitmentSchema.virtual("daysRemaining").get(function () {
  const diffTime = this.expiresAt - new Date();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Middleware to validate expiration
recruitmentSchema.pre("save", function (next) {
  if (this.expiresAt < new Date()) {
    this.isActive = false;
  }
  next();
});

const recruitment = mongoose.model("Recruitment", recruitmentSchema);

export default recruitment;
