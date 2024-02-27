import React, { useState } from 'react';
import { Input, Modal, Space, Row, Col } from 'antd';
import { createUserMeta } from './UsersApi';
import UploadModal from './UploadModal';


const fetchCurrentDate = () => {

    const options = {
        timeZone: 'Asia/Kolkata', // Set the time zone to IST
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
        // hour12: false, 
      };
    
      const ISTDate = new Date().toLocaleString('en-US', options);

      return ISTDate;
}



const  UserDetailsModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [umodal, setUmodal] = useState(false)
    const [created, setCreated] = useState('')

    const setValues = (value, type) => {
      setCreated(fetchCurrentDate())
      if(type === "phone"){
        setPhone(value)
      }else if(type === "name"){
        setName(value)
      }else if(type === "email"){
        setEmail(value)
      }else if(type === "age"){
        setAge(value)
      }
    }
    
    const handleOk = (val) => {
        console.log(val)
        setIsModalOpen(true);
            createUserMeta({
                'phone':phone,
                'name':name,
                'email':email,
                'age':age,
                'created':created,
            });
        console.log("User Data has been pushed to server")
        setIsModalOpen(false);
        setUmodal(true)
        
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };


  
    // const [carId, setCarId] = useState('')
    return (
        <>
        {umodal? <UploadModal phone={phone}/> : null}
        <Modal title="Enter New User Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

          <Space direction='vertical' size="small" style={{display:'flex'}}>
            <Row>
              <Col span={23}>
                  <Input placeholder='Enter Customer Phone' name='phone' onChange={(e) => {setValues(e.target.value, "phone")}}/>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
                  <Input placeholder='Enter Name' name='name' onChange={(e) => {setValues(e.target.value, "name")}}/>
              </Col>
            </Row>
            <Row>
              <Col span={23}>
              <Input placeholder='Enter Email' name='email' onChange={(e) => {setValues(e.target.value, "email")}}/>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <Input placeholder='Enter Age' name='age' onChange={(e) => {setValues(e.target.value, "age")}}/>
                {/* <Input onChange={(e) => {setCarType(e.target.value)}}/>   */}
              </Col>
            </Row>
        </Space>
      </Modal>
    </>
    );
  };
//   onChange={(e) => {setCarName(e.target.value)}}
//   onChange={(e) => {setCarPrice(e.target.value)}}
  export default UserDetailsModal;