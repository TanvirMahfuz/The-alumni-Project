import Event from "../../models/eventModel.js";

/**
 * Service function to get all events with optional filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const readAllEvents = async (req, res) => {
  try {

    const events = await Event.find()
    
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching events",
      error: error.message,
    });
  }
};
