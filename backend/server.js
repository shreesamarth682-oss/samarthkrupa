import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryModule from "cloudinary";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Cloudinary config
const cloudinary = cloudinaryModule.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shree-samarth-krupa",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

// ✅ Upload Route
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Shree Samarth Krupa API");
});

// ✅ Other Routes
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
