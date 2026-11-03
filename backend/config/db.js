import dns from "node:dns";
import mongoose from "mongoose";

/**
 * MongoDB Atlas "mongodb+srv://" URIs need an SRV DNS lookup. Some networks/ISPs
 * (and some Windows setups) fail that lookup with `querySrv ECONNREFUSED`.
 * Pointing Node at Google's public DNS fixes it — this is the workaround you
 * already use, preserved here.
 */
const servers = (process.env.DNS_SERVERS || "8.8.8.8,8.8.4.4")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
dns.setServers(servers);
dns.setDefaultResultOrder?.("ipv4first");

let connecting = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠  MONGODB_URI is not set — the API will run without a database.");
    return false;
  }
  if (mongoose.connection.readyState === 1) return true;
  if (connecting) return connecting;

  mongoose.set("strictQuery", true);
  connecting = mongoose
    .connect(uri, { serverSelectionTimeoutMS: 10000 })
    .then(() => {
      console.log(`✅ MongoDB connected (${mongoose.connection.name})`);
      return true;
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
      return false;
    })
    .finally(() => {
      connecting = null;
    });
  return connecting;
}

export const dbReady = () => mongoose.connection.readyState === 1;
