import { React,  useState } from 'react';
import {  Input, Modal } from 'antd';
import ImgUpload from './ImgUpload';
import ImageUploadComponent from './ImageUploadComponent';


const NewCar = ({model_status}) => {
  const [isModalOpen, setIsModalOpen] = useState(model_status);
  const [carName, setCarName] = useState('')
  const [carPrice, setCarPrice] = useState('')

  const handleOk = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Enter content title" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder='Enter Car Name' onChange={(e) => {setCarName(e.target.value)}}/>
        <Input placeholder='Enter Car Price'onChange={(e) => {setCarPrice(e.target.value)}}/>
        {/* <ImgUpload/> */}
        <ImageUploadComponent/>
        
      </Modal>
    </>
  );
};

export default NewCar;