import React, { useEffect, useState } from 'react';

function ImageComponent({ carId }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch the image
    fetch(`http://localhost:4000/cars/upload/${carId}`, {
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
