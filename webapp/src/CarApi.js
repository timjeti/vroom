import axios from 'axios';
import { properties } from './properties';
import Cookies from 'js-cookie';

const authToken = Cookies.get(`${properties.jwtidentifier}`)

const headers = {
  'Authorization': `Bearer ${authToken}`, // Include the token in the 'Authorization' header
  'Content-Type': 'application/json' // Set the content type to JSON
};


class CarApi {

    cls_headers = {
      'Authorization': `Bearer ${authToken}`, 
      'Content-Type': 'application/json'
    };

    static addCar(data){
        axios.post(`${properties.backendUrl}/cars/`, data, { headers: {
          'Authorization': `Bearer ${authToken}`, 
          'Content-Type': 'application/json'
        },
       })
        return;
    }

    static deleteCar(car_id){
        axios.delete(`${properties.backendUrl}/cars/${car_id}`, { headers: {
          'Authorization': `Bearer ${authToken}`, 
          'Content-Type': 'application/json'
        },
      })
    }
}

export default  CarApi;


export const getCars = (setter) => {
    axios.get(`${properties.backendUrl}/cars`)
    .then((response)=>{
      setter(response.data);
    })
}

export const updateCar = (carId, data) => {
    axios.put(`${properties.backendUrl}/cars/${carId}`, data, {headers})
    return;
}

export const uploadCar = async (carId, isFirst, file, onSuccess, onError ) => {
    try {
      console.log("Up Details")
      console.log(carId)
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${properties.backendUrl}/cars/upload/${carId}?isFirst=${isFirst}`, {
        method: 'POST',
        body: formData,
        headers:{
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    } catch (error) {
      onError();
    }
  };