import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for a model..."
      value={query}
      onChange={handleInputChange}
      style={{
        padding: "10px",
        width: "100%",
        marginBottom: "10px",
        fontSize: "16px"
      }}
    />
  );
};

export default SearchBar;