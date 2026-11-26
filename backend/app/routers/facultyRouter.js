import { Router } from "express";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createFaculty,
  updateFaculty,
  readAllFaculties,
  getFacultyById,
  deleteFaculty,
} from "../controllers/facultyController.js";

const facultyRouter = Router();

facultyRouter.get("/", readAllFaculties);
facultyRouter.get("/:id", getFacultyById);
facultyRouter.post("/", isLoggedIn, isAdmin, createFaculty);
facultyRouter.put("/:id", isLoggedIn, isAdmin, updateFaculty);
facultyRouter.delete("/:id", isLoggedIn, isAdmin, deleteFaculty);

export default facultyRouter;
