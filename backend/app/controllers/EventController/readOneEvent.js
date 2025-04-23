import Event from "../../models/eventModel.js";
import mongoose from "mongoose";
/**
 * Service function to get a single event by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const readOneEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    // 2. Find event and populate organizer details
    const event = await Event.findById(id).populate(
      "organizer",
      "name email avatar"
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // 3. Send response
    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error fetching event:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching event",
      error: error.message,
    });
  }
};
