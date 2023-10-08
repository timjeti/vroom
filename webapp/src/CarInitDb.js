import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarInitDb(){
  const [cars, setCars] = useState('');

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = 'http://localhost:4000/cars'; // Replace with the actual API endpoint

    // Fetch car data from the API
    axios.get(apiUrl)
      .then((response) => {
        // Update the state with the fetched car data
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, [cars]); // passing cars so that every time new car is or it is removed, data gets reflected

  return cars;
}

export default CarInitDb;