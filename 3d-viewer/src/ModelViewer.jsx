// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

// const Model = () => {
//   const { scene } = useGLTF(".\public\Models\street_rat_4k.gltf"); // Load model from public folder
//   return <primitive object={scene} scale={2} />;
// };

// const ModelViewer = () => {
//   return (
//     <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.3} />
      
//       <Suspense fallback={<LoadingIndicator />}>
//         <Model />
//       </Suspense>

//       <OrbitControls enableZoom={true} />
//       <Environment preset="sunset" />
//     </Canvas>
//   );
// };

// const LoadingIndicator = () => (
//   <mesh>
//     <sphereGeometry args={[0.2, 32, 32]} />
//     <meshStandardMaterial color="orange" />
//   </mesh>
// );

// export default ModelViewer;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const Model = ({ modelUrl }) => {
  if (!modelUrl) return null; // Avoid loading if no model URL

  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={2} />;
};

const ModelViewer = ({ modelUrl }) => {
  return (
    <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} />
      
      <Suspense fallback={<LoadingIndicator />}>
        <Model modelUrl={modelUrl} />
      </Suspense>

      <OrbitControls enableZoom={true} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

const LoadingIndicator = () => (
  <mesh>
    <sphereGeometry args={[0.2, 32, 32]} />
    <meshStandardMaterial color="orange" />
  </mesh>
);

export default ModelViewer;
