import React from 'react';
import { Layout, Col, Row, Space } from 'antd';
import AppCarousel from './AppCarousel';
import AllCars from './AllCars';
import CarSearch from './CarSearch';

const { Content } = Layout;

const EntryPoint = () => {
    return (
        <Content style={{ padding: '0 2%', marginTop: 64 }}>
            {/* <Space direction='vertical' size="small"> */}
            <Row>
                <Col span={24} ><h3>Get Rental Cars at best possible rates in Assam</h3></Col>
            </Row>
            <Row>
            <Col span={24}>
                <CarSearch/>
            </Col>
            </Row>
            {/* </Space> */}
            <Row style={{marginTop: "4vh"}}>
            <Col span={24}><AppCarousel/></Col>
            </Row>
            <Row style ={{minHeight: '10vh', paddingLeft: 22, marginTop: 30}}>
                <Col span={24}> <h2>Available Rental Cars</h2></Col>
            </Row>
            
            <AllCars />
        </Content>
    )
  
}

export default EntryPoint;