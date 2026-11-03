import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    kicker: { type: String, trim: true },
    summary: { type: String, trim: true },
    stack: [{ type: String, trim: true }],
    highlights: [{ type: String, trim: true }],
    image: { type: String, trim: true },
    imageIsPlaceholder: { type: Boolean, default: true },
    links: {
      github: { type: String, default: "" },
      live: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
