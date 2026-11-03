import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB, dbReady } from "./config/db.js";
import projectRoutes from "./routes/projects.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowed = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "100kb" }));
if (process.env.NODE_ENV !== "test") app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/api", rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false }));

app.get("/", (req, res) => res.json({ name: "Swetha Kannan portfolio API", status: "ok" }));
app.get("/api/health", (req, res) => res.json({ status: "ok", database: dbReady() ? "connected" : "disconnected", uptime: process.uptime() }));
app.use("/api/projects", projectRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.message === "Not allowed by CORS" ? 403 : 500).json({ success: false, message: err.message || "Server error" });
});

// Start listening immediately so the host sees a healthy service, then connect to MongoDB.
app.listen(PORT, async () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
  await connectDB();
});
