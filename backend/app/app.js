import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "./routers/api.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression"
import morgan from "morgan";


const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

const allowedOrigins = [
  "http://localhost:5173",
  "https://the-alumni-project-vrtg.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.startsWith("https://the-alumni-project-vrtg.vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

app.use("/api/v1", defaultRouter); 


export default app;
