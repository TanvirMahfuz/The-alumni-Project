import { Router } from "express";
const facultyRouter = Router();
import {
  createFaculty,
  updateFaculty,
  readAllFaculties,
  getFacultyById,
  deleteFaculty,
} from "../controllers/facultyController.js";

facultyRouter.post("/", createFaculty);
facultyRouter.put("/:id", updateFaculty);
facultyRouter.get("/", readAllFaculties);
facultyRouter.get("/:id", getFacultyById);
facultyRouter.delete("/:id", deleteFaculty);
export default facultyRouter;
