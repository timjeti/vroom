import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from './properties';

function CarInitDb(){
  const [cars, setCars] = useState('');
  const apiUrl = `http://${properties.backendUrl}:${properties.backendPort}/cars`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, [apiUrl]);

  return cars;
}

export default CarInitDb;