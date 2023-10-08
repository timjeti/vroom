import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  const onFinish = (values) => {
    // Here, you can implement your login logic.
    // For simplicity, we'll check if the username and password are "admin".

    if (values.username === 'admin' && values.password === 'admin') {
      setLoggedIn(true);
      message.success('Login successful');
    } else {
      message.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Login Page</h1>
      {loggedIn ? (
        <p>Welcome !</p>
      ) : (
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{
            username: '',
            password: '',
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default LoginPage;
