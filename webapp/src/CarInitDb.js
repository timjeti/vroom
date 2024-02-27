import { useEffect, useState } from 'react';
import { properties } from './properties';
import Cookies from 'js-cookie';

// const authToken = Cookies.get(`${properties.jwtidentifier}`)

function CarInitDb(){
  const [cars, setCars] = useState('');
  const apiUrl = `${properties.backendUrl}/cars`;

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