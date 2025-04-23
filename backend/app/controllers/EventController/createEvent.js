import Event from "../../models/eventModel.js";
import { validateTime12hFormat } from "../../utility/validation.js";
import uploadFileToCloudinary from "../../utility/cloudinary64.js";
/**
 * Service function to create a new event
 * @param {Object} eventData - Event data to be created
 * @param {string} eventData.title - Event title
 * @param {Date} eventData.date - Event date
 * @param {string} eventData.time - Event time in 12h format (e.g., "09:30 AM")
 * @param {string} eventData.location - Event location
 * @param {string} eventData.image - Event image URL
 * @param {string} eventData.description - Event description
 * @param {mongoose.Types.ObjectId} eventData.organizer - Organizer's user ID
 * @param {string} eventData.category - Event category
 * @param {boolean} [eventData.isFree=false] - Whether the event is free
 * @param {boolean} [eventData.isFeatured=false] - Whether the event is featured
 * @param {Object} [eventData.actionButton] - Action button configuration
 * @returns {Promise<Object>} Created event object
 */
export const createEvent = async (req,res) => {
  try {
    const eventData = req.body;
    const requiredFields = [
      "title",
      "date",
      "time",
      "location",
    ];

    const missingFields = requiredFields.filter((field) => !eventData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Validate time format
    if (!validateTime12hFormat(eventData.time)) {
      throw new Error(
        'Invalid time format. Please use 12-hour format (e.g., "09:30 AM")'
      );
    }

    // Validate future date
    if (new Date(eventData.date) < new Date()) {
      throw new Error("Event date must be in the future");
    }
    const imgUrl = await uploadFileToCloudinary(
      eventData.image,
      req.user._id
    );
    if (!imgUrl) {
      throw new Error("Image upload failed");
    }
    eventData.image = imgUrl.secure_url;
    // Set defaults
    const newEvent = new Event({
      ...eventData,
      organizer: req.user._id,
    });
    console.log(newEvent);
    // Save to database
    const createdEvent = await newEvent.save();
    if (!createdEvent) {
      throw new Error("Event creation failed");
    }
    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: createdEvent,
    });
  } catch (error) {
    console.error("Event creation failed:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.name,
    });
  }
};