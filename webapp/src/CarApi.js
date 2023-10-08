import React from 'react';
import axios from 'axios';

class CarApi {

    static addCar(data){
        axios.post('http://localhost:4000/cars/', data)
        return;
    }

    static deleteCar(car_id){
        axios.delete(`http://localhost:4000/cars/${car_id}`)
    }
}

export default  CarApi;