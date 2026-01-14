import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import { consume } from "./consumer"

consume()
console.log("🚀 Worker booted")

