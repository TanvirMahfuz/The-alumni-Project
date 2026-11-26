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
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";

const recruitmentRouter = Router();

// Static paths must be registered before "/:id" or they get captured by it
recruitmentRouter.get("/", getJobPostings);
recruitmentRouter.get("/search", searchJobPostingsController);
recruitmentRouter.get("/my-jobs", isLoggedIn, getMyJobPostings);
recruitmentRouter.post("/create", isLoggedIn, createJobPosting);
recruitmentRouter.post("/review", isLoggedIn, reviewForJobController);
recruitmentRouter.post("/expire-old", isLoggedIn, isAdmin, expireOldJobs);

recruitmentRouter.get("/:id", getJobPosting);
recruitmentRouter.put("/:id", isLoggedIn, updateJobPostingController);
recruitmentRouter.delete("/:id", isLoggedIn, deleteJobPostingController);
recruitmentRouter.post("/:id/apply", isLoggedIn, reviewForJobController);
recruitmentRouter.put(
  "/:jobId/applications/:applicationId",
  isLoggedIn,
  updateApplicationStatusController
);

export default recruitmentRouter;
