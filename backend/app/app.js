import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/api.js"; // Make sure this path is correct

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use((req, res, next) => {
  console.log(req.url); // Log all requests
  next();
});

// Use router for the /api/v1 path
app.use("/api/v1", userRouter); // Ensure this is applied correctly

// Basic route to check server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Export app for use in your server file
export default app;
