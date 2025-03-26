import Router from "express";
const searchRouter = Router();
import searchController from "../controllers/searchController.js";

searchRouter.get("/search", searchController);

export default searchRouter;
