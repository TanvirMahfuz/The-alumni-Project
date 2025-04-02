import { Router } from "express";
import {
  sendMessage,
  getMessagesByChat,
} from "../controllers/messageController.js";
import {isLoggedIn} from "../middlewares/auth.middleware.js";
const chatRouter = Router();

chatRouter.post("/send-message", isLoggedIn, sendMessage);
chatRouter.get("/get-messages/:id", isLoggedIn, getMessagesByChat);

export default chatRouter;
