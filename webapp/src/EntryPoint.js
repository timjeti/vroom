import React from 'react';
import { Layout, Col, Row } from 'antd';
import AppCarousel from './AppCarousel';
import AllCars from './AllCars';

const { Content } = Layout;

const EntryPoint = () => {
    return (
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Row>
                <Col span={24} ><h2>Get Rental Cars at best possible rates</h2></Col>
            </Row>
            <Row >
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