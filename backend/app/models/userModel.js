import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "0",
    },
    bio: {
      type: String,
      default: "0",
    },
    contacts: [
      {
        github: {
          type: String,
          default: "0",
        },
        linkedin: {
          type: String,
          default: "0",
        },
        facebook: {
          type: String,
          default: "0",
        },
        portfolio: {
          type: String,
          default: "0",
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    currentPost: {
      type: String,
      default: "student",
    },
    jobExperience: [
      {
        title: {
          type: String,
          default: "0",
        },
        company: {
          type: String,
          default: "0",
        },
        years: {
          type: Number,
          default: 0,
        },
      },
    ],
    haveWorkedIn: {
      type: String,
      default: "0",
    },
    currentlyWorkingIn: {
      type: String,
      default: "0",
    },
    futureInterests: {
      type: String,
      default: "0",
    },
    availableForWork: {
      type: Boolean,
      default: false,
    },
    projects: [
      {
        projectName: {
          type: String,
          default: "0",
        },
        projectDescription: {
          type: String,
          default: "0",
        },
        projectLink: {
          type: String,
          default: "0",
        },
      },
    ],
    resume: {
      type: String,
      default: "0",
    },
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;
