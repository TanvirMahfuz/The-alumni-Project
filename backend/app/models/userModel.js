import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      default: "",
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
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    education: [
      {
        degree: {
          type: String,
          default: "",
        },
        institute: {
          type: String,
          default: "",
        },
        startDate: {
          type: String,
          default: "",
        },
        endDate: {
          type: String,
          default: "",
        },
      },
    ],
    contacts: {
      github: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    currentPost: {
      title: {
        type: String,
        default: "",
      },
      company: {
        type: String,
        default: "",
      },
      startDate: {
        type: String,
        default: "",
      },
      endDate: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
    },
    jobExperience: [
      {
        title: {
          type: String,
          default: "",
        },
        company: {
          type: String,
          default: "",
        },
        startDate: {
          type: String,
          default: "",
        },
        endDate: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    currentlyWorkingIn: [
      {
        title: {
          type: String,
          default: "none",
        },
        techStack: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    haveWorkedIn: [
      {
        title: {
          type: String,
          default: "none",
        },
        techStack: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    skills: [
      {
        title: {
          type: String,
          default: "",
        },
        image: {
          type: String,
          default: "",
        },
        level: {
          type: Number,
          default: "",
        },
      },
    ],
    futureInterests: {
      type: [String],
      default: [],
    },
    participatedIn: [
      {
        title: {
          type: String,
          default: "",
        },
        institute: {
          type: String,
          default: "",
        },
        startDate: {
          type: String,
          default: "",
        },
        endDate: {
          type: String,
          default: "",
        },
      },
    ],
    availableForWork: {
      type: Boolean,
      default: false,
    },
    projects: [
      {
        projectName: {
          type: String,
          default: "",
        },
        projectDescription: {
          type: String,
          default: "",
        },
        projectLink: {
          type: String,
          default: "",
        },
      },
    ],
    resume: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
