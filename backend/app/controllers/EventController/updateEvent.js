import Event from "../../models/eventModel.js";
import { validateTime12hFormat } from "../../utility/validation.js";

/**
 * Service function to update an existing event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updates = req.body;

    // 1. Validate event ID
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    // 2. Find the existing event
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // 3. Verify ownership (only organizer can update)
    if (existingEvent.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only update your own events",
      });
    }

    // 4. Validate time format if being updated
    if (updates.time && !validateTime12hFormat(updates.time)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time format. Use 12-hour format (e.g., "09:30 AM")',
      });
    }

    // 5. Validate future date if being updated
    if (updates.date && new Date(updates.date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Event date must be in the future",
      });
    }

    // 6. Validate URL for paid events if isFree is being changed
    if (updates.isFree === false && !updates.url) {
      return res.status(400).json({
        success: false,
        message: "URL is required when changing to paid event",
      });
    }

    // 7. Prepare update object (prevent certain fields from being updated)
    const { organizer, _id, createdAt, ...allowedUpdates } = updates;
    const updateData = {
      ...allowedUpdates,
      updatedAt: new Date(),
    };

    // 8. Perform the update
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
      runValidators: true,
    });

    // 9. Return successful response
    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Event update failed:", error.message);

    // Handle specific error types
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered",
        field: Object.keys(error.keyPattern)[0],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during event update",
      error: error.message,
    });
  }
};
