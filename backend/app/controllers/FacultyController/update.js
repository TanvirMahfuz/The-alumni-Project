import { Faculty } from "../../models/facultyModel.js";

export const updateFaculty = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      facultyId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    return res.status(200).json({
      message: "Faculty updated successfully",
      faculty: updatedFaculty,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
    
  }
}