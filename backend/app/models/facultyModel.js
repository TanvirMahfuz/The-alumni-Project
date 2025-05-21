import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  image: { type: String },
  email: { type: String, required: true },
  phone: [{ type: String }], // Array of strings for multiple phone numbers
  researchInterests: [{ type: String }], // Array of strings for research interests
  officeLocation: { type: String },
  isActive: { type: Boolean, default: true },
});

export const Faculty = mongoose.model("Faculty", facultySchema);

