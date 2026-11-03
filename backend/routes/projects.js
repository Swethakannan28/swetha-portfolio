import { Router } from "express";
import Project from "../models/Project.js";
import { dbReady } from "../config/db.js";

const router = Router();

const requireDb = (req, res, next) =>
  dbReady() ? next() : res.status(503).json({ success: false, message: "Database not connected" });

router.get("/", requireDb, async (req, res, next) => {
  try {
    const data = await Project.find().sort({ order: 1 }).select("-__v").lean();
    res.set("Cache-Control", "public, max-age=60");
    res.json({ success: true, count: data.length, data });
  } catch (e) {
    next(e);
  }
});

router.get("/:slug", requireDb, async (req, res, next) => {
  try {
    const data = await Project.findOne({ slug: req.params.slug.toLowerCase() }).select("-__v").lean();
    if (!data) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
});

export default router;
