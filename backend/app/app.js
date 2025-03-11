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
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000/", credentials: true}));
app.use((req, res, next) => {
  console.log(req.url); // Log all requests
  next();
});

// Use router for the /api/v1 path
app.use("/api/v1", userRouter); // Ensure this is applied correctly

// Basic route to check server
app.get("/demo", (req, res) => {
  res.json({msg: "Hello World!"});
});
import upload from "./middlewares/multer.middleware.js";
app.post("/demo", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json(req.body);
});
import uploadFileToCloudinary from "./utility/cloudinary.config.js";
app.post("/api/v1/upload", upload.array("photos", 5), async (req, res) => {
  if (req.files && req.files.length > 0) {
    console.log("Files details:", req.files);
    try {
      const uploadedFiles = await Promise.all(
        req.files.map(async (file) => {
          console.log("Uploading file:", file.path);
          return await uploadFileToCloudinary(file.path, file.filename);
        })
      );
      console.log(uploadedFiles);
    } catch (error) {
      console.error("Error uploading files:", error.message);
    }
    return res.send("Files uploaded successfully!");
  } else {
    return res.status(400).send("No files uploaded.");
  }
});

export default app;
