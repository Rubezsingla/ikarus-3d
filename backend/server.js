// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const MODELS_FILE = "./models.json";

// // Load models from JSON file
// const loadModels = () => {
//   try {
//     const data = fs.readFileSync(MODELS_FILE);
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// // Save models to JSON file
// const saveModels = (models) => {
//   fs.writeFileSync(MODELS_FILE, JSON.stringify(models, null, 2));
// };

// // GET /models - Fetch stored 3D models
// app.get("/models", (req, res) => {
//   const models = loadModels();
//   res.json(models);
// });

// // POST /upload - Upload a new model
// app.post("/upload", (req, res) => {
//   const { name, description, url } = req.body;
//   if (!name || !url) {
//     return res.status(400).json({ error: "Name and URL are required" });
//   }

//   const models = loadModels();
//   const newModel = { id: models.length + 1, name, description, url };
//   models.push(newModel);
//   saveModels(models);

//   res.json(newModel);
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Directory where models are stored
// const UPLOADS_DIR = path.join(__dirname, "uploads");
// const MODELS_FILE = "./models.json";

// // Ensure uploads directory exists
// if (!fs.existsSync(UPLOADS_DIR)) {
//   fs.mkdirSync(UPLOADS_DIR);
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, UPLOADS_DIR),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // Load models from JSON file
// const loadModels = () => {
//   try {
//     return JSON.parse(fs.readFileSync(MODELS_FILE));
//   } catch (error) {
//     return [];
//   }
// };

// // Save models to JSON file
// const saveModels = (models) => {
//   fs.writeFileSync(MODELS_FILE, JSON.stringify(models, null, 2));
// };

// // 📌 GET /models - Fetch stored 3D models
// app.get("/models", (req, res) => {
//   res.json(loadModels());
// });

// // 📌 POST /upload - Upload a GLB model file
// app.post("/upload", upload.single("model"), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   const { name, description } = req.body;
//   const fileUrl = `/uploads/${req.file.filename}`;

//   const models = loadModels();
//   const newModel = { id: models.length + 1, name, description, url: fileUrl };
//   models.push(newModel);
//   saveModels(models);

//   res.json(newModel);
// });

// // 📌 Serve uploaded models statically
// app.use("/uploads", express.static(UPLOADS_DIR));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Storage configuration for model uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Upload Endpoint (POST /upload)
app.post("/upload", upload.single("model"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Get Uploaded Models (GET /models)
app.get("/models", (req, res) => {
  fs.readdir("./uploads", (err, files) => {
    if (err) return res.status(500).json({ error: "Cannot read files" });
    const models = files.map((file) => ({ name: file, url: `/uploads/${file}` }));
    res.json(models);
  });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
