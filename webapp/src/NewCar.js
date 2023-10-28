import { React,  useState } from 'react';
import {  Input, Modal } from 'antd';
import ImageUploadComponent from './ImageUploadComponent';
import CarApi from './CarApi';


const NewCar = ({model_status}) => {
  const [isModalOpen, setIsModalOpen] = useState(model_status);
  const [carName, setCarName] = useState('')
  const [carPrice, setCarPrice] = useState('')
  const [carId, setCarId] = useState('')

  const setCarIdFromChld  = (car_id) => {
    setCarId(car_id)
  }

  const handleOk = () => {
    
    setIsModalOpen(true);
    // setPayload()
    CarApi.addCar({
      'car_id':carId,
      'car_name':carName,
      'car_price':Number(carPrice)
    });
    console.log("Model close command recieved")
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    if(carName === '' || carPrice === '')
    CarApi.deleteCar(carId);
  };

  return (
    <>
      <Modal title="Enter content title" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder='Enter Car Name' onChange={(e) => {setCarName(e.target.value)}}/>
        <Input placeholder='Enter Car Price' onChange={(e) => {setCarPrice(e.target.value)}}/>
        <ImageUploadComponent isFirst={true} passCarId={setCarIdFromChld}/>
        
      </Modal>
    </>
  );
};

export default NewCar;