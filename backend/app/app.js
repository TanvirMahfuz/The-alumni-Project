import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "./routers/api.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000/", credentials: true}));
app.use((req, res, next) => {
  console.log(req.url); // Log all requests
  next();
});

app.use("/api/v1", defaultRouter); 


export default app;
