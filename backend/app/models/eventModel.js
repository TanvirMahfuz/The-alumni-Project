import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Event date must be in the future",
      },
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
      match: [
        /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i,
        "Please use valid 12-hour format (HH:MM AM/PM)",
      ],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organizer is required"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "Conference",
          "Workshop",
          "Concert",
          "Exhibition",
          "Networking",
          "Sports",
          "Other",
          "conference",
          "workshop",
          "seminar",
          "training",
          "meeting",
          "webinar",
          "hackathon",
          "contest",
        ],
        message: "Invalid event category",
      },
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default:""
    },
    onBoard: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for 24-hour format (useful for calculations)
eventSchema.virtual("militaryTime").get(function () {
  const [time, period] = this.time.split(" ");
  let [hours, minutes] = time.split(":");

  if (period === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  } else if (period === "AM" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
});

// Other indexes and virtuals remain the same...
eventSchema.index({ title: "text", description: "text" });
eventSchema.index({ date: 1, isFeatured: -1 });
eventSchema.index({ category: 1, isFree: 1 });

eventSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
