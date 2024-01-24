import "dotenv/config";
import app from "./app";
import { connectDB } from "./db/index.js";

connectDB();
