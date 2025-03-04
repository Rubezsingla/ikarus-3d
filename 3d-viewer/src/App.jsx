// import { useEffect, useState, Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const ModelViewer = () => {
//   const [model, setModel] = useState(null);

//   useEffect(() => {
//     const loader = new GLTFLoader(); 
//     loader.load(
//       "/Models/Air.glb", // ✅ Public folder serves files from root
//       (gltf) => setModel(gltf.scene),
//       undefined,
//       (error) => console.error("Error loading model:", error)
//     );
//   }, []);

//   return (
//     <Canvas>
//       <Suspense fallback={null}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         {model && <primitive object={model} scale={2} />}
//         <OrbitControls />
//       </Suspense>
//     </Canvas>
//   );
// };

// export default ModelViewer;



import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelViewer = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/Models/Air.glb",
      (gltf) => setModel(gltf.scene),
      undefined,
      (error) => console.error("Error loading model:", error)
    );
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "white", color: "black" }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {model && <primitive object={model} scale={2} />}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
