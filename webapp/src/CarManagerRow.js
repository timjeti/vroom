import { React,  useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import ImageUploadComponent from './ImageUploadComponent';
import { DeleteOutlined, RightCircleFilled } from '@ant-design/icons';
import CarApi from './CarApi';

const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const CarManagerRow = ({ car_id, car_name, car_price}) => {

    const [carId, setCarId] = useState('')
    const [carName, setCarName] = useState(car_name)
    const [carPrice, setCarPrice] = useState(car_price)

    const setCarIdFromChld  = (car_id) => {
      setCarId(car_id)
    }

    const onFinish = () => {
        CarApi.addCar({
            'car_id':carId,
            'car_name':carName,
            'car_price':Number(carPrice)
          })
        console.log("Car data updated successfully")
    }

    const onFinishFailed = () => {
        console.log("Clicked on finish failed")
    }

    const handleButtonClick = () => {
        
        CarApi.deleteCar(car_id)
        // refresh()
        console.log("Delete button clicked");
    }
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
            <Col span={1} offset={0}>
                <Form.Item >
                <Button  onClick={handleButtonClick} icon={<DeleteOutlined />}>
                </Button>
                </Form.Item>
            </Col>
            

            <Col span={6}>
                <Form.Item 
                name="name"
                rules={[
                    {
                    required: false,
                    message: 'Please input car name!',
                    },
                ]}
                >
                <Input defaultValue={car_name} onChange={(e) => {setCarName(e.target.value)}}/>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                name="car_price"
                rules={[
                    {
                    required: false,
                    message: 'Please input car rental price',
                    },
                ]}
                >
                <Input defaultValue={car_price} onChange={(e) => {setCarPrice(e.target.value)}}/>
                </Form.Item >
            </Col>
            <Col span={3} offset={1}>
                <Form.Item
                name="photo"
                >
                <ImageUploadComponent oldCarId={car_id} isFirst={false} passCarId={setCarIdFromChld}/>
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