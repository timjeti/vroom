import axios from 'axios';
import { properties } from './properties';

export const uploadProfile = async (userId, file, onSuccess, onError) => {
    var response;
    const formData = new FormData();
    formData.append('image', file);
    try{
        response = await fetch(`${properties.backendUrl}/users/profile/${userId}`, {
        method: 'POST',
        body: formData,
      });
        if (response.ok) {
            onSuccess();
          } else {
            onError();
          }
      } catch (error) {
        console.error('File upload failed', error);
        onError()
      }
    return response;
}

export const uploadIdentity = async (userId, file, onSuccess, onError) => {
    var response;
    const formData = new FormData();
    formData.append('image', file);
    try{
        response = await fetch(`${properties.backendUrl}/users/identity/${userId}`, {
        method: 'POST',
        body: formData,
      });
        if (response.ok) {
            onSuccess();
          } else {
            onError();
          }
      } catch (error) {
        console.error('File upload failed', error);
        onError()
      }
    return response;
}

export const deleteUser = (userId) => {
    axios.delete(`${properties.backendUrl}/users/${userId}`)
}

export const getUser = (userId, setter) => {
    axios.get(`${properties.backendUrl}/users/${userId}`)
    .then((response)=>{
      setter(response.data);
      console.log(response.data)
    })
}

export const getUsers = (setter) => {
    axios.get(`${properties.backendUrl}/users`)
    .then((response)=>{
      setter(response.data);
    })
}

export const createUser = (data) => {
    axios.post(`${properties.backendUrl}/users/`, data)
    return;
}

export const updateUser = (userId, data) => {
    axios.put(`${properties.backendUrl}/users/${userId}`, data)
    return;
}

export const createUserMeta = (data) => {
  axios.post(`${properties.backendUrl}/users/meta`, data)
  return;
}

export const getImageUrl = (path) => {
    return `${properties.backendUrl}/${path}`
}