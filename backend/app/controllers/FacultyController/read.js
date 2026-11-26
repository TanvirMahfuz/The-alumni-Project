import mongoose from "mongoose";
import { Faculty } from "../../models/facultyModel.js";

export const readAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    return res.status(200).json({
      message: "Faculties retrieved successfully",
      count: faculties.length,
      faculties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFacultyById = async (req, res) => {
  try {
    const facultyId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ message: "Invalid faculty ID" });
    }
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    return res.status(200).json({
      message: "Faculty member retrieved successfully",
      faculty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
