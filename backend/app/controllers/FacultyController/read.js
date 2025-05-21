import { Faculty } from "../../models/facultyModel.js";

export const readAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json({
      message: "Faculties retrieved successfully",
      count: faculties.length,
      faculties: faculties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFacultyById = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const faculty = await Faculty.findById({
      message: "Faculty member retrieved successfully",
      faculty: faculty,
    });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    return res.status(200).json(faculty);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}