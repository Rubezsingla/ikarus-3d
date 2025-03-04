import React, { useState, useEffect } from "react";
import axios from "axios";
import ModelViewer from "./ModelViewer";
import SearchBar from "./SearchBar";

const App = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/models")
      .then((response) => {
        setModels(response.data);
        setFilteredModels(response.data);
      })
      .catch((error) => console.error("Error fetching models:", error));
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredModels(models);
    } else {
      const filtered = models.filter((model) =>
        model.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredModels(filtered);
    }
  };

  return (
    <div className="container">
      <h1>3D Model Viewer</h1>
      <SearchBar onSearch={handleSearch} />
      {filteredModels.length > 0 ? (
        <ModelViewer modelUrl={filteredModels[0].url} />
      ) : (
        <p>No models found.</p>
      )}
    </div>
  );
};

export default App;