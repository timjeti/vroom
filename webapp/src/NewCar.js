import { React,  useState } from 'react';
import {  Input, Modal, Row, Col, Space, Select } from 'antd';
import ImageUploadComponent from './ImageUploadComponent';
import CarApi from './CarApi';


const NewCar = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [carName, setCarName] = useState('')
  const [carPrice, setCarPrice] = useState('')
  const [carId, setCarId] = useState('')
  const [carType, setCarType] = useState('')
  const [upModal, setUpModal] = useState(false)

  // const setCarIdFromChld  = (car_id) => {
  //   setCarId(car_id)
  // }

  const onImageUpload = (flag) => {
    if(!isModalOpen){
      CarApi.deleteCar(carId);
    }
  }

  const handleOk = () => {
    
    setIsModalOpen(true);
    // setPayload()
    CarApi.addCar({
      'car_id':carId,
      'car_name':carName,
      'car_price':carPrice,
      'car_type': carType
    });
    console.log("Model close command recieved")
    setIsModalOpen(false);
    setUpModal(true)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (value) => {
    setCarType(value)
  };

  return (
    <>
      {upModal? <ImageUploadComponent carId={carId}/> : null}
      <Modal title="Enter Car Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Space direction='vertical' size="middle" style={{display:'flex'}}>
          <Row>
            <Col span={23}>
                  <Input placeholder='Enter Car Name' onChange={(e) => {setCarName(e.target.value)}}/>
            </Col>
          </Row>
          <Row>
            <Col span={23}>
              <Input placeholder='Enter Car Number' onChange={(e) => {setCarId(e.target.value)}}/>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <Select placeholder='Enter Car Type' onChange={handleSelect}>
                <Select.Option value="Petrol">Petrol</Select.Option>
                <Select.Option value="Diesel">Diesel</Select.Option>
              </Select>
              {/* <Input onChange={(e) => {setCarType(e.target.value)}}/>   */}
            </Col>
            <Col span={11} offset={8}>
                <Input placeholder='Enter Car Price' onChange={(e) => {setCarPrice(e.target.value)}}/>
            </Col>
          </Row>
        </Space>

        
        
        
        
        {/* <ImageUploadComponent isFirst={true} carId={carId} onImageUpload={onImageUpload}/> */}
        
      </Modal>
    </>
  );
};

export default NewCar;