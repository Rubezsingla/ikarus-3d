// import { useState } from "react";
// import { storage, db, ref, uploadBytes, getDownloadURL, collection, addDoc } from "./firebaseConfig";

// const UploadModel = ({ onUpload }) => {
//   const [modelName, setModelName] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file || !modelName || !description) {
//       setMessage("Please fill all fields and select a file.");
//       return;
//     }

//     setUploading(true);
//     setMessage("");

//     try {
//       // Upload file to Firebase Storage
//       const fileRef = ref(storage, 'models/${file.name}');
//       await uploadBytes(fileRef, file);
//       const fileURL = await getDownloadURL(fileRef);

//       // Save metadata to Firestore
//       await addDoc(collection(db, "models"), {
//         name: modelName,
//         description,
//         url: fileURL,
//         uploadDate: new Date().toISOString(),
//       });

//       setMessage("Model uploaded successfully!");
//       setModelName("");
//       setDescription("");
//       setFile(null);

//       // Fetch updated models
//       if (onUpload) onUpload();
//     } catch (error) {
//       console.error("Error uploading model:", error);
//       setMessage("Upload failed. Try again.");
//     }

//     setUploading(false);
//   };

//   return (
//     <div>
//       <h2>Upload a 3D Model</h2>
//       <form onSubmit={handleUpload}>
//         <input
//           type="text"
//           placeholder="Model Name"
//           value={modelName}
//           onChange={(e) => setModelName(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Model Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <input
//           type="file"
//           accept=".glb,.gltf"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//         />
//         <button type="submit" disabled={uploading}>
//           {uploading ? "Uploading..." : "Upload Model"}
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default UploadModel;


import { useState } from "react";
import { storage, db } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const UploadModel = ({ onUpload }) => {
  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !modelName || !description) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const fileRef = ref(storage, `models/${file.name}`); // Fix string interpolation
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, "models"), {
        name: modelName,
        description,
        url: fileURL,
        uploadDate: new Date().toISOString(),
      });

      setMessage("Model uploaded successfully!");
      setModelName("");
      setDescription("");
      setFile(null);

      if (onUpload) onUpload();
    } catch (error) {
      console.error("Error uploading model:", error);
      setMessage("Upload failed. Try again.");
    }

    setUploading(false);
  };

  return (
    <div>
      <h2>Upload a 3D Model</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          required
        />
        <textarea
          placeholder="Model Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".glb,.gltf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Model"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadModel;
