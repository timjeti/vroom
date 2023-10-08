import React from 'react';
import AppCard from './AppCard';
import { Col, Row } from 'antd';
import CarInitDb from './CarInitDb';

const AllCars = () => {

    const photoList = CarInitDb();

      return (
        <Row justify="center" align="middle" style={{ minHeight: '80vh' }} gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
            
            { Array.isArray(photoList)? (
                  (photoList.map((photo, index) => (
                      <Col className="gutter-row"> <AppCard key={index} {...photo}/> </Col>
                  )))
                ) 
                :
                (
                  <p></p>
                )
            }
                
            
            
            {/* <Divider type="vertical" style={{ background:"#000", height:300 }} /> */}
            {/* <Col className="gutter-row"><AppCard imgpath={"./assets/photo2.jpg"}/></Col> */}
        </Row>
      )


}

export default AllCars;