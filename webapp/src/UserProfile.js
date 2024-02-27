import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Card, Avatar, Space, Row, Col, Divider, Button, Upload } from 'antd';
import { UserOutlined,UploadOutlined } from '@ant-design/icons';
import './user-profie.css';
import UserHistoryList from './UserHistoryList'
// import { getUser } from './UsersApi';
import { properties } from './properties';
import axios from 'axios';
import { uploadProfile } from './UsersApi';


const UserProfile = () => {
    const [tripList, setTripList] = useState([])
    const {state} = useLocation();
    const user_phone = state.user.id
    const user_email = state.user.email
    const user_name = state.user.name
    const user_age = state.user.age
    const user_profile_path = state.user.profile_path

    const customRequest = ({file, onSuccess, onError}) => {
      uploadProfile(user_phone, file, onSuccess, onError)
    }
    
    useEffect(() => {
      axios.get(`${properties.backendUrl}/trips/user/${user_phone}`)
      .then((response)=>{
          console.log(response.data)
          setTripList(response.data);
    })
    }, [])
    return (
    <div style={{margin: 30}}>

    <Row>
      <Upload customRequest={customRequest}>
        <Button style={{outline: 'none', border:'none'}} icon={<UserOutlined  style={{color:"#52c41a", outline: 'none'}}/>}>

        </Button>
      </Upload>
    </Row>

    <Row>
      <Col span={24}>
      
        <div className="user-profile-card-container">
          <Card className="user-profile-card" hoverable>
            {user_profile_path === undefined? (<Avatar size={64} alt="User Profile" icon={<UserOutlined />} />)
             : (<Avatar size={64} alt="User Profile" src={`${properties.backendUrl}/${user_profile_path}`} />)}
            <div className="user-details">
              <h2>{user_name}</h2>
              <p>Age: {user_age}</p>
              {/* Add more user details as needed */}
            </div>
          </Card>
        </div>
    </Col>
    </Row>
    <Divider orientation="center">Your Trips</Divider>
      <Row>
      <Col span={24}>
        <div  style={{marginTop: 30}} >
          <UserHistoryList trips = {tripList}/>
        </div>
        </Col>
      </Row>
    </div>

    )
}

export default UserProfile;