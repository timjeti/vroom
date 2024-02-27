import { React,  useState } from 'react';
import { Button, Row, Col, Form, Input, Tooltip } from 'antd';
import ImageUploadComponent from './ImageUploadComponent';
import { DeleteOutlined, RightCircleFilled } from '@ant-design/icons';
import CarApi from './CarApi';

// const onFinish = (values) => {
//     console.log('Success:', values);
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

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
            <Row gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }} style={{marginLeft:0, marginRight:2}}>
            <Col span={1} offset={0}>
                <Form.Item >
                <Tooltip title="Delete">
                    <Button  onClick={handleButtonClick} icon={<DeleteOutlined />}/>
                </Tooltip>
                </Form.Item>
            </Col>
            

            <Col span={9} offset={2}>
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
            <Col span={4}>
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
            <Col span={3}>
                <Form.Item
                name="photo"
                >
                <ImageUploadComponent oldCarId={car_id} isFirst={false} newCarId={setCarIdFromChld}/>
                </Form.Item>
            </Col>
            <Col span={2}>
                <Form.Item >
                <Tooltip title="Update">
                <Button  htmlType="submit" icon={<RightCircleFilled />}/>
                </Tooltip>
                </Form.Item>
            </Col>
            </Row>
        </Form>

        


    )
}
 
export default CarManagerRow;