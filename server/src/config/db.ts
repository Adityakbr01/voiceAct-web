import dns from "node:dns";
import mongoose from "mongoose";
import { config } from "./index.js";

// Force public DNS servers to resolve MongoDB Atlas SRV records reliably across Windows and ISPs
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB() {
  const conn = await mongoose.connect(config.mongoUri);
  console.log(`MongoDB: ${conn.connection.host}`);
}
