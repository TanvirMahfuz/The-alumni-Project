import { Faculty } from "../../models/facultyModel.js";

export const createFaculty = async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    return res.status(201).json({
      message: "Faculty created successfully",
      faculty: newFaculty,  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
