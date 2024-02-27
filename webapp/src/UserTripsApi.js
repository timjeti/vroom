import axios from 'axios';
import { properties } from './properties';

export const deleteTrip = (tripId) => {
    axios.delete(`${properties.backendUrl}/trips/${tripId}`)
}

export const getTrip = (tripId) => {
    axios.get(`${properties.backendUrl}/trips/${tripId}`)
    .then((response)=>{
        return response.data;
    })
}

export const getTrips = (userId, setTripList) => {
    axios.get(`${properties.backendUrl}/trips/user/${userId}`)
    .then((response)=>{
        console.log(response.data)
        setTripList(response.data);
    })
}

export const getAllTrips = (setTripList) => {
    axios.get(`${properties.backendUrl}/trips`)
    .then((response)=>{
        console.log(response.data)
        setTripList(response.data);
    })
}

export const updateTrip = (tripId, data) => {
    axios.put(`${properties.backendUrl}/trips/${tripId}`, data)
}

export const createTrip = (data) => {
    axios.post(`${properties.backendUrl}/trips/`, data)
    return;
}