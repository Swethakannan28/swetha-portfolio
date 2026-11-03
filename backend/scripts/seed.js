import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Project from "../models/Project.js";
import { projectsSeed } from "../data/projects.seed.js";

const ok = await connectDB();
if (!ok) {
  console.error("Cannot seed without a database connection.");
  process.exit(1);
}

for (const p of projectsSeed) {
  await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true, setDefaultsOnInsert: true });
  console.log(`• upserted ${p.slug}`);
}
console.log("Seed complete.");
await mongoose.disconnect();
