import { Router } from "express";
import {
  createJobPosting,
  getJobPosting,
  getJobPostings,
  updateJobPostingController, 
  deleteJobPostingController, 
  reviewForJobController, 
  updateApplicationStatusController,
  searchJobPostingsController, 
  getMyJobPostings, 
  expireOldJobs, 
} from "../controllers/recruitmentController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";


const recruitmentRouter = Router();

recruitmentRouter.post("/create", isLoggedIn, createJobPosting);
recruitmentRouter.get("/:id", getJobPosting);
recruitmentRouter.get("/", getJobPostings);
recruitmentRouter.put("/:id", isLoggedIn, updateJobPostingController); 
recruitmentRouter.delete("/:id", isLoggedIn, deleteJobPostingController);
recruitmentRouter.post("/review", isLoggedIn, reviewForJobController);

recruitmentRouter.post(
  "/:id/apply",
  isLoggedIn,
  reviewForJobController 
);

recruitmentRouter.put(
  "/:jobId/applications/:applicationId",
  isLoggedIn,
  updateApplicationStatusController 
);
recruitmentRouter.get("/search", searchJobPostingsController); 
recruitmentRouter.get("/my-jobs", isLoggedIn, getMyJobPostings); 
recruitmentRouter.post("/expire-old", expireOldJobs); 

export default recruitmentRouter;
