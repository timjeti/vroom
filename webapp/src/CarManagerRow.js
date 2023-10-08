import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import ImgUpload from './ImgUpload';
import { RightCircleFilled } from '@ant-design/icons';

const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const CarManagerRow = ({car_path, car_name, car_price}) => {
    return (
        <Form 
            name="basic"

            wrapperCol={{
            span: 20,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row>

            <Col span={6}>
                <Form.Item 
                name="name"
                rules={[
                    {
                    required: true,
                    message: 'Please input car name!',
                    },
                ]}
                >
                <Input placeholder={car_name}/>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                name="car_price"
                rules={[
                    {
                    required: true,
                    message: 'Please input car rental price',
                    },
                ]}
                >
                <Input placeholder={car_price}/>
                </Form.Item >
            </Col>
            <Col span={3} offset={1}>
                <Form.Item
                name="photo"
                >
                <ImgUpload/>
                </Form.Item>
            </Col>
            <Col span={1} offset={0}>
                <Form.Item >
                <Button  htmlType="submit" icon={<RightCircleFilled />}>
                    
                </Button>
                </Form.Item>
            </Col>
            </Row>
        </Form>

        


    )
}
 
export default CarManagerRow;