import React, { useState } from 'react';
import { Input, Modal, Row, Col, DatePicker, Space } from 'antd';
import { createTrip } from './UserTripsApi';
const { RangePicker } = DatePicker;



const  UserTripModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [phone, setPhone] = useState('')
    const [carId, setCarId] = useState('')
    const [city, setCity] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [price, setPrice] = useState('')

    
    const onOk = (value) => {
        console.log('onOk: ', value);
      };

    const setValues = (value, type) => {
      if(type === "carId"){
        setCarId(value)
      }else if(type === "phone"){
        setPhone(value)
      }else if(type === "city"){
        setCity(value)
      }else if(type === "price"){
        setPrice(value)
      }
    }

    const onChangeStart = (value, dateString) => {
      // console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
      setStart(dateString)
    };
    const onChangeEnd = (value, dateString) => {
      // console.log('Selected Time: ', value);
      // console.log('Formatted Selected Time: ', dateString);
      // setStart(dateString)
      setEnd(dateString)
    };

    const handleOk = (val) => {
      console.log(val)
      
    setIsModalOpen(true);
      createTrip({
            'phone':phone,
            'carId':carId,
            'phone':phone,
            'city':city,
            'price':price,
            'start':start,
            'end':end
          });
        console.log("Trip Data has been pushed to server")
        setIsModalOpen(false);
        //   setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    //   if(carName === '' || carPrice === '')
    //   CarApi.deleteCar(carId);
    };
    
  
    // const [carId, setCarId] = useState('')
    return (
        <Modal title="Enter Upcoming Trip Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
          <Space direction='vertical' size="small" style={{display:'flex'}}>
            <Row>
              <Col span={10}>
                <Input placeholder='Enter Customer Phone' name='phone' onChange={(e) => {setValues(e.target.value, "phone")}}/>
              </Col>

              <Col span={10} offset={1}>
                  <Input placeholder='Enter Location' name='city' onChange={(e) => {setValues(e.target.value, "city")}}/>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                  <Input placeholder='Enter Car Id' name='carId' onChange={(e) => {setValues(e.target.value, "carId")}}/>
              </Col>
              <Col span={10} offset={1}>
                  <Input placeholder='Enter Trip Amount' name='price' onChange={(e) => {setValues(e.target.value, "price")}}/>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <DatePicker format="DD-MM-YYYY" onChange={onChangeStart} onOk={onOk} name='start'/>
              </Col>
              <Col span={8}>
                <DatePicker format="DD-MM-YYYY" onChange={onChangeEnd} onOk={onOk} name='end'/>
              </Col>
            </Row>
        </Space>
        </Modal>
    );
  };
//   onChange={(e) => {setCarName(e.target.value)}}
//   onChange={(e) => {setCarPrice(e.target.value)}}
  export default UserTripModal;