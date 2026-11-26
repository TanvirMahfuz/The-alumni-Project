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

// Behind one reverse proxy (Vercel/Render/nginx): use X-Forwarded-For for the
// client IP so rate limiting is per user, not per proxy
app.set("trust proxy", 1);

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
  max: 500, // general traffic (chat/feed polling needs headroom)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Stricter limit on credential endpoints to slow down password guessing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts, please try again later" },
});
app.use(["/api/v1/auth/log-in", "/api/v1/auth/register"], authLimiter);

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

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler: anything thrown/forwarded (CORS rejections, bad JSON,
// oversized bodies) gets a JSON response instead of an HTML stack page
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (res.headersSent) return;
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Not allowed by CORS" });
  }
  const status = err.status || err.statusCode || 500;
  return res.status(status).json({
    message: status < 500 ? err.message : "Internal server error",
  });
});


export default app;
