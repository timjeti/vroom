import React, {useState} from "react";
import { Card, Form, Cascader, DatePicker, Row, Col, Button, Space, TimePicker } from "antd";
import { locationData, carCodes } from "./Datasets";
import { DownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './CarSearch.css'

const CarSearch = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [pickUpTgl, setPickupTgl] = useState(false)
    const [retTgl, setRetTgl] = useState(false)
    const [pickUpLoc, setPickUpLoc] = useState('')
    const navigate = useNavigate()

    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    const handleSearch= (values) => {
        console.log(values)
        navigate('/carresults',{
            state: {
                pickUpLoc
            }
        })
    }

    const handlePickUpLocation= (value) => {
        // this logic needs to be fixed, since the number of cities can increase
        value[0] === 'guwahati' ? setPickUpLoc(carCodes.guwahati):setPickUpLoc(carCodes.guwahati)
        // console.log(value[0])
        // value !== null ? setPickupTgl(true) : setPickupTgl(false)
    }

    const handlePickUpTimeChange= (value) => {
        console.log(value)
        value !== null ? setPickupTgl(true) : setPickupTgl(false)
    }

    const handleReturnTimeChange= (value) => {
        console.log(value)
        value !== null ? setRetTgl(true) : setRetTgl(false)
    }

    

    const pickupTemplate = () => (

        <Form.Item label="Pick Up Time" name="start_time"
        rules={[
        {
        required: true,
        message: 'Please input pickup data and time',
        },
        ]}>
            <TimePicker />
        </Form.Item>
    )

    const returnTemplate = () => (
        <Form.Item label="Return Time"  name="return_time"
                        rules={[
                        {
                        required: true,
                        message: 'Please input return date and time',
                        },
                        ]}>
                <TimePicker/>

        </Form.Item>
    )

    return (
        <Card bordered={true} title="Search Our Cars">
            <Form layout="horizontal" onFinish={handleSearch}>
                <Row>
                    <Col span={24}>
                        <Form.Item name="pickup" label="Pick Up Location"
                        rules={[
                            {
                            required: true,
                            message: 'Please input pickup location',
                            },
                        ]}>
                            <Cascader options={locationData} onChange={handlePickUpLocation}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} >
                        <Form.Item label="Pick Up Date" name="start_date"
                        rules={[
                        {
                        required: true,
                        message: 'Please input pickup date',
                        },
                        ]}>
                            <DatePicker format="DD-MM-YYYY"/>
                        </Form.Item>
                    </Col>
                    <Col span={10} style={{marginLeft:5}}>
                        <Form.Item label="Return Date"  name="return_date"
                        rules={[
                        {
                        required: true,
                        message: 'Please input return date',
                        },
                        ]}>
                            <DatePicker format="DD-MM-YYYY"/>
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Row>
                    <Col span={10} >
                        {pickUpTgl? pickupTemplate():null}
                    </Col>

                    <Col span={10} style={{marginLeft:5}}>
                        {retTgl? returnTemplate():null}
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <Form.Item wrapperCol={{ offset: 23}}>
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} htmlType="submit">
                                Search
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>

    )


}

export default CarSearch;