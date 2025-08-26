import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CatImage {
  url: string;
}

export default function CatWidget() {
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [loadingCat, setLoadingCat] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch cat image
  const fetchCatImage = async () => {
    try {
      setLoadingCat(true);
      setError(null);

      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search',
      );
      setCatImage({ url: response.data[0].url });
    } catch (err) {
      setError(
        `Error fetching cat image: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
    } finally {
      setLoadingCat(false);
    }
  };

  // Function to get new cat image
  const getNewCat = () => {
    fetchCatImage();
  };

  // Initial cat image fetch on component mount
  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div className="cat-section">
      <h3>Random Cat Image</h3>
      {loadingCat ? (
        <p>Loading cat...</p>
      ) : catImage ? (
        <div className="cat-info">
          <img
            src={catImage.url}
            alt="Random cat"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
          <button onClick={getNewCat} className="new-cat-btn">
            Get New Cat
          </button>
        </div>
      ) : (
        <p>No cat image available</p>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}
    </div>
  );
}
