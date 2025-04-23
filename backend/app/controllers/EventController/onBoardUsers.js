import Event from "../../models/eventModel.js";
import mongoose from "mongoose";
import User from "../../models/userModel.js";
/**
 * Service function to onboard users for an event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
export const onBoardUsers = async (req, res) => {

  try {
    const eventId = req.params.eventId;
    // 1. Validate event ID
    console.log("eventId:", eventId);
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }
    // 2. Find the event
    let event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    let onBoardUsers = [];
    for (let i = 0; i < event.onBoard.length; i++) {
      // 1. validate user id
      if (!mongoose.Types.ObjectId.isValid(event.onBoard[i])) {
        console.log("Invalid user ID format:", event.onBoard[i]);
        continue;
      }
      const user = await User.findById(event.onBoard[i]).select("-password");
      if (user) {
        onBoardUsers.push(user);
      }
    }
    console.log(onBoardUsers);
    return res.status(200).json({
      success: true,
      message: "Onboarded users fetched successfully",
      data: onBoardUsers,
    }); 
  } catch (error) {
    console.error("Event creation failed:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.name,
    });
    
  }
}