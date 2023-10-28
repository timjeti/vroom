import React from 'react';
import { ContactsFilled, UserOutlined, MailOutlined, PhoneOutlined, QuestionCircleOutlined, CheckOutlined  } from "@ant-design/icons";
import { Button, Row, Col, Form, Input, Card } from 'antd';
import { Typography } from "antd";
import { FaComment } from 'react-icons/fa6';
const { TextArea } = Input;

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AppContact = () => {
  const { Title } = Typography;
    return (
    <>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

    <Row> 
      <Col> 
      <Title level={3} color='black'> <FaComment/> Your Feedback Will Help Us Improve</Title>
      </Col>
    </Row>

    </div>

    <div
      style={{
        marginBottom: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>

    <Card style={{ width: 500 }}>
    <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={3}><ContactsFilled/> Contact Us</Title>
    </div>
    {/* <Row> */}
        {/* <Col span={12} offset={6}> */}
    <Form
    name="basic"
    className="login-form"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
  <Form.Item
      name="name"
      rules={[{ required: true, message: "Please input your name!" }]}
    >
      <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Full Name"
      />
    </Form.Item>

    <Form.Item
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
    >
      <Input
        prefix={<MailOutlined className="site-form-item-icon" />}
        placeholder="Email"
      />
    </Form.Item>

    <Form.Item
      name="phone"
      rules={[{ required: true, message: "Please input your phone!" }]}
    >
      <Input
        prefix={<PhoneOutlined className="site-form-item-icon" />}
        placeholder="Phone Number"
      />
    </Form.Item>

    <Form.Item
      name="query"
      rules={[{ required: true, message: "Please input your query!" }]}
    >
      <TextArea
        placeholder="Your Query"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
        <Button htmlType="submit" icon={<CheckOutlined />}>Submit</Button>
    </Form.Item>
  </Form>

        {/* </Col> */}
    {/* </Row> */}
  </Card>
  </div>
  </>
);





}
 
export default AppContact;