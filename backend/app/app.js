import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import defaultRouter from "./routers/api.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression"
import morgan from "morgan";


const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://the-alumni-project-vrtg.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If you're using cookies or Authorization headers
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


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

// if (process.env.ENVIRONMENT === "development") {
//   app.use((req, res, next) => {
//     console.log("Origin:", req.headers.origin);
//     next();
//   });
// }


app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  return res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "unhealthy",
    database: connected ? "connected" : "disconnected",
  });
});

app.use("/api/v1", defaultRouter);


export default app;
