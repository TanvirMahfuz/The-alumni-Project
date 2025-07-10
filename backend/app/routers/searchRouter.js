import Router from "express";
const searchRouter = Router();
import searchController from "../controllers/searchController.js";

searchRouter.get("/", searchController);

export default searchRouter;
