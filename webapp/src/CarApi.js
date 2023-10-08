import React from 'react';
import axios from 'axios';

const CarApi = (data, car_id) => {
    function addCar(){
        axios.post('http://localhost:4000', data)
    }

    function deleteCar(){
        axios.delete(`http://localhost:4000/${car_id}`)
    }
}

export default  CarApi;