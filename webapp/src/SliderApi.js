import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from './properties';



export const addSlider = async (file) => {

    const formData = new FormData();
    formData.append('image', file);
    try{
        const response = await axios.post(`http://${properties.backendUrl}:${properties.backendPort}/slider/`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
      } catch (error) {
        console.error('File upload failed', error);
      }
    return;
}

export const deleteSlider = (slider_id) => {
    axios.delete(`http://${properties.backendUrl}:${properties.backendPort}/slider/${slider_id}`)
}

export const getSliders = () => {
    const response = axios.get(`http://${properties.backendUrl}:${properties.backendPort}/slider`)
    .then((response)=>{
        return response.data;
    })
}
