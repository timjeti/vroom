import React from 'react';

import { Button, Row, Col, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AppContact = () => {

    return (

    <Row>
        <Col span={12} offset={6}>
        <Form
    name="basic"
    labelCol={{
      span: 5,
    }}
    wrapperCol={{
      span: 15,
    }}
    style={{
      paddingTop: 35,
      maxWidth: 800,
      border: '1px solid #d9d9d9'
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input your phone bumber!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Query"
      name="query"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input.TextArea/>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

        </Col>
    </Row>
    
);



}
 
export default AppContact;