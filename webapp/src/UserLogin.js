import React,{useState} from 'react';
import { Button, Card, Col, Form, Input, Row, col } from 'antd';
import { useDispatch } from 'react-redux';
import { userLoginReducer } from './store';
import { createUser, getImageUrl } from './UsersApi';
import { getUser } from './UsersApi';
import { useNavigate } from 'react-router-dom';
import { properties } from './properties';
import axios from 'axios';

const UserLogin = ({setCurrent, initialVal}) => {

    const [loginVal, setLoginVal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
        setLoginVal(values)
        dispatch(userLoginReducer(values))
        axios.get(`${properties.backendUrl}/users/${values.id}`)
        .then((response)=>{
            const user = response.data;
            //handling first time user & incomplete logins
            if(user === undefined || user === ""){
              createUser(values)
            }else{
              //skipping other steps for registered user 
              if(user.profile_details === 1){
                navigate('/usermanager', {
                  state:{
                    user
                  }
                })
              }
            }
            setCurrent(1)
        })
      };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
   
//   const [current, useCurrent] = useState(setCurrent)
  return (

   <div>

    <Row style={{marginBottom:"1vh"}}>
        <Col span={20} offset={2}>
          <Card cover={<img alt="user profile image" 
              src={getImageUrl("uploads/extras/login_banner.png")} style={{height: 250}}/>} >
          </Card>
          
        </Col>
    </Row>
  

    <Row>
      <Col span={20} offset={2}>
        <Card>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 10,
            }}
            // initialValues={{
            //   remember: true,
            // }}
            onFinish = {(values) => {onFinish(values)}}
            initialValues={initialVal === null? null : initialVal.payload}
            
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h2 style={{textAlign: "center", color:"#1E98FB"}}>Login Page</h2>
            <Form.Item
              label="Phone"
              name="id"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                {
                  required: true,
                  message: 'Enter the OTP received!',
                },
              ]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" style={{backgroundColor:"#1E98FB"}}>
                Continue
              </Button>
            </Form.Item>
        </Form>
      </Card>
      </Col>
  </Row>
  </div> 
)
};
export default UserLogin;
