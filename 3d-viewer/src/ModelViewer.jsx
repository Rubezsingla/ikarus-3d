import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={2} />;
};

const ModelViewer = ({ modelUrl }) => {
  return (
    <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} />
      <Model modelUrl={modelUrl} />
      <OrbitControls enableZoom={true} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default ModelViewer;