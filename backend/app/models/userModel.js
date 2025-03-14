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
    education: [
      {
        degree: {
          type: String,
          default: "0",
        },
        institute: {
          type: String,
          default: "0",
        },
        startDate: {
          type: String,
          default: "0",
        },
        endDate: {
          type: String,
          default: "0",
        },
      },
    ],
    contacts: {
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    currentPost: {
      title: {
        type: String,
        default: "0",
      },
      company: {
        type: String,
        default: "0",
      },
      startDate: {
        type: String,
        default: "0",
      },
      endDate: {
        type: String,
        default: "0",
      },
      description: {
        type: String,
        default: "0",
      },
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
        startDate: {
          type: String,
          default: "0",
        },
        endDate: {
          type: String,
          default: "0",
        },
        description: {
          type: String,
          default: "0",
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
          default: "0",
        },
        description: {
          type: String,
          default: "0",
        },
      },
    ],
    skills: [
      {
        title: {
          type: String,
          default: "0",
        },
        image: {
          type: String,
          default: "0",
        },
        level: {
          type: Number,
          default: "0",
        },
      },
    ],
    futureInterests: [
      {
        type: String,
        default: "0",
      },
    ],
    participatedIn: [
      {
        title: {
          type: String,
          default: "0",
        },
        institute: {
          type: String,
          default: "0",
        },
        startDate: {
          type: String,
          default: "0",
        },
        endDate: {
          type: String,
          default: "0",
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
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ]
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;
