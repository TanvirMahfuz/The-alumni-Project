import Event from "../../models/eventModel.js";
import mongoose from "mongoose";
export const onBoard = async (req, res) => {
  try {
    const { eventId } = req.body;
    // Users can only onboard themselves
    const applicantId = req.user._id;
    // 1. Validate event ID
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
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
    if (event.onBoard.some((id) => id.equals(applicantId))) {
      return res.status(400).json({
        success: false,
        message: "Applicant already onboarded",
      });
    }
    // 5. Add applicant to event
    // Atomic update so past events (date validator) and concurrent joins are fine
    await Event.updateOne({ _id: eventId }, { $addToSet: { onBoard: applicantId } });
    return res.status(200).json({
      success: true,
      message: "Applicant onboarded successfully",
    });
  } catch (error) {
    console.error("Event onboarding failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Event onboarding failed",
    });
  }
}