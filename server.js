import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { swaggerDocs } from "./swaggerConfig.js"; // Import Swagger config

// Load biến môi trường từ file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Kết nối tới MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
};

// Khởi động Swagger
swaggerDocs(app, port); // Swagger được khởi động ở đây

// Start server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
