import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined, CarFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { properties } from './properties';
import Cookies from 'js-cookie';
const { Title } = Typography;



const LoginForm = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isAuthenticated = localStorage.getItem('isAuthenticated')
  // const useState = () => {

  // }
  const onFinish = (values) => {
    console.log("Logging In");
    console.log("Received values of form: ", values);
    // if (values.remember) {
    //   localStorage.setItem("username", values.username);
    //   localStorage.setItem("password", values.password);
    // }
    // dispatch(setAuthenticated());
    const payload = {
      'username':values.username,
      'password':values.password,
    }
    fetch(`${properties.backendUrl}/auth/signin`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      .then(function (res) {
        if(res.status === 200){
            res.json().then((result) => {
            Cookies.set(`${properties.jwtidentifier}`, result.token)
            navigate('/carmanager')
          })
        }else{
          navigate('/admincontrol')
        }
        
        // alert("Wrong Credentials Provided")
      })
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Handle password recovery logic here");
    alert("This feature is disabled right now!")
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   console.log("Handle registration logic here");
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={3}><CarFilled/> Admin Panel</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          // rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            // type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Log in
          </Button>

          {/* Don't have an account{" "}
            <a href="" onClick={handleRegister}>
              sign up
            </a> */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;