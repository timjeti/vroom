import React from 'react';
import axios from 'axios';
import { properties } from './properties';

class CarApi {

    static addCar(data){
        axios.post(`http://${properties.backendUrl}:${properties.backendPort}/cars/`, data)
        return;
    }

    static deleteCar(car_id){
        axios.delete(`http://${properties.backendUrl}:${properties.backendPort}/cars/${car_id}`)
    }
}

export default  CarApi;