import Event from "../../models/eventModel.js";
import mongoose from "mongoose";
export const onBoard = async (req, res) => {
  try {
    console.log(req.body);
    const { eventId, applicantId } = req.body;
    // 1. Validate event ID
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }
    // 2. Validate applicant ID
    if (!mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid applicant ID format",
      });
    }
    // 3. Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    // 4. Check
    if (event.onBoard.includes(applicantId)) {
      return res.status(400).json({
        success: false,
        message: "Applicant already onboarded",
      });
    }
    // 5. Add applicant to event
    event.onBoard.push(applicantId);
    await event.save();
    return res.status(200).json({
      success: true,
      message: "Applicant onboarded successfully",
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