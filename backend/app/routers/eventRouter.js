import { Router } from "express";
import {
  createEvent,
  updateEvent,
  readOneEvent,
  readAllEvents,
  onBoard,
  onBoardUsers,
} from "../controllers/eventController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const eventRouter = Router();

eventRouter.get("/allEvent", isLoggedIn, readAllEvents);
eventRouter.get("/getOne/:id", isLoggedIn, readOneEvent);
eventRouter.get("/onBoardUsers/:eventId", isLoggedIn, onBoardUsers);


eventRouter.post("/create",isLoggedIn, createEvent);
eventRouter.post("/update/:id",isLoggedIn, createEvent);
eventRouter.post("/onBoard", isLoggedIn, onBoard);



export default eventRouter;
