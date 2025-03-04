import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const initialModels = [
  { name: "Air Jordan", path: "/Models/Air.glb" },
  { name: "Jordan Hex", path: "/Models/two.glb" },
];

const ModelViewer = () => {
  const [model, setModel] = useState(null);
  const [modelList, setModelList] = useState(initialModels);
  const [selectedModel, setSelectedModel] = useState(initialModels[0].path);
  const [customURL, setCustomURL] = useState("");

  useEffect(() => {
    if (!selectedModel) return;
    const loader = new GLTFLoader();
    loader.load(
      selectedModel,
      (gltf) => setModel(gltf.scene),
      undefined,
      (error) => console.error("Error loading model:", error)
    );
  }, [selectedModel]);

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setModelList([...modelList, { name: file.name, path: objectURL }]);
      setSelectedModel(objectURL);
    }
  };

  // Handle direct URL input
  const handleURLSubmit = () => {
    if (customURL.trim() !== "") {
      setModelList([...modelList, { name: "Custom Model", path: customURL }]);
      setSelectedModel(customURL);
      setCustomURL("");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
        3D Model Viewer
      </h2>

      {/* Upload File */}
      <input type="file" accept=".glb,.gltf" onChange={handleUpload} style={inputStyle} />

      {/* URL Input */}
      <div style={urlInputContainer}>
        <input
          type="text"
          placeholder="Paste model URL (.glb/.gltf)..."
          value={customURL}
          onChange={(e) => setCustomURL(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleURLSubmit} style={buttonStyle}>
          Load
        </button>
      </div>

      {/* Model Selection Dropdown */}
      <select
        onChange={(e) => setSelectedModel(e.target.value)}
        style={dropdownStyle}
      >
        {modelList.map((m, index) => (
          <option key={index} value={m.path}>
            {m.name}
          </option>
        ))}
      </select>

      {/* 3D Model Display */}
      <div style={canvasContainer}>
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {model && <primitive object={model} scale={2} />}
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  fontSize: "14px",
  background: "#fff",
  color: "#333",
  fontWeight: "bold",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  margin: "10px",
};

const buttonStyle = {
  padding: "10px 15px",
  borderRadius: "10px",
  border: "none",
  background: "#ff6b6b",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s ease-in-out",
};

const dropdownStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  background: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};

const urlInputContainer = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginTop: "10px",
};

const canvasContainer = {
  width: "80%",
  maxWidth: "600px",
  height: "500px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "15px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
};

export default ModelViewer;
