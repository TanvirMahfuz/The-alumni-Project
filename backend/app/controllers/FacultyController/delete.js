import { Faculty } from "../../models/facultyModel.js";

export const deleteFaculty = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const deletedFaculty = await Faculty.findByIdAndDelete(facultyId);
    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    return res.status(200).json({
      message: "Faculty deleted successfully",
      faculty: deletedFaculty,
    });
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};