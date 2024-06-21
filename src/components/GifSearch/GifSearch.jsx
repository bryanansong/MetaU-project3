import React, { useState, useEffect } from "react";
import "./GifSearch.css"; // You'll need to create this CSS file

const GifSearch = ({ selectedGifUrl, setSelectedGifUrl }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  //   const [selectedGifUrl, setSelectedGifUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY; // Replace with your actual Giphy API key
  const GIPHY_API_URL = `//api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=8`;

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(() => {
        fetchGifs();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setGifs([]);
    }
  }, [searchTerm]);

  const fetchGifs = async () => {
    try {
      const response = await fetch(GIPHY_API_URL).then((response) =>
        response.json()
      );
      setGifs(response.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGifSelect = (gifUrl) => {
    setSelectedGifUrl(gifUrl);
  };

  return (
    <div className="gif-search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for GIFs"
        className="search-input"
      />
      {isLoading && <p>Loading...</p>}
      <div className="gif-grid">
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className={`gif-item ${
              selectedGifUrl === gif.images.original.url ? "selected" : ""
            }`}
            onClick={() => handleGifSelect(gif.images.original.url)}
          >
            <img src={gif.images.original.url} alt={gif.title} />
          </div>
        ))}
      </div>
      {selectedGifUrl && (
        <div className="selected-gif">
          <h3>Selected GIF:</h3>
          <img src={selectedGifUrl} alt="Selected GIF" />
        </div>
      )}
    </div>
  );
};

export default GifSearch;
