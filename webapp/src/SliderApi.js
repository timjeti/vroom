import axios from 'axios';
import { properties } from './properties';
import Cookies from 'js-cookie';

const authToken = Cookies.get(`${properties.jwtidentifier}`)
const headers = {
    'Authorization': `Bearer ${authToken}`, // Include the token in the 'Authorization' header
    'Content-Type': 'application/json' // Set the content type to JSON
  };

export const addSlider = async (file) => {

    const formData = new FormData();
    formData.append('image', file);
    try{
        await axios.post(`${properties.backendUrl}/slider/`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
                'Authorization': `Bearer ${authToken}`
            },
        });
      } catch (error) {
        console.error('File upload failed', error);
      }
    return;
}

export const deleteSlider = (slider_id) => {
    axios.delete(`${properties.backendUrl}/slider/${slider_id}`, {headers})
}

export const getSliders = () => {
    axios.get(`${properties.backendUrl}/slider`, {headers})
    .then((response)=>{
        return response.data;
    })
}
