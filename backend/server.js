import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT =  5000;

// Enable CORS to allow requests from your frontend (Vite: http://localhost:5173)
app.use(cors());
app.use(express.json());

// Route to fetch 3D models from Firebase Storage
app.get("/models", async (req, res) => {
  try {
    const firebaseStorageURL =
      "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o/models%2Fstreet_rat_4k.gltf?alt=media";

    const response = await axios.get(firebaseStorageURL, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "model/gltf+json");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching model:", error.message);
    res.status(500).json({ error: "Failed to load model" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
