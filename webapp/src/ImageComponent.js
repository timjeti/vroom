import React, { useEffect, useState } from 'react';
import { properties } from './properties';

function ImageComponent({ carId }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch the image
    fetch(`http://${properties.backendUrl}:${properties.backendPort}/cars/upload/${carId}`, {
      method: 'GET',
      headers: {
        // Add any headers required for your API request
      },
    })
      .then((response) => response.blob()) // Convert the response to a Blob
      .then((blob) => {
        // Create a URL for the Blob
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl); // Set the image source
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, [carId]);

  return (
    <>
      {imageSrc ? (
        <img src={imageSrc} alt="Fetched Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </>
  );
}

export default ImageComponent;
