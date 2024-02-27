import React from 'react';
import AppCard from './AppCard';
import { Col, Row, Divider } from 'antd';
import CarInitDb from './CarInitDb';
import { useLocation } from 'react-router-dom';


const AllCars = () => {

    const photoList = CarInitDb();
    const {state} = useLocation();
    const searchCity = state === null ? null : state.pickUpLoc


      return (
        <Row justify="center" align="middle" style={{ minHeight: '80vh' }} gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
            
            { searchCity === null ? ( Array.isArray(photoList)? (
                  (photoList.map((photo, index) => (
                      <Col className="gutter-row"> <AppCard key={index} {...photo}/> 
                      <Divider orientation="left"/></Col>
                      
                  )))
                ) 
                :
                (
                  <p></p>
                ))
              :
                  (Array.isArray(photoList) ? (
                    photoList
                      .filter((photo) => photo.car_id.includes(searchCity))
                      .map((filteredPhoto, index) => (
                        <Col className="gutter-row" key={index}>
                          <AppCard {...filteredPhoto} />
                          <Divider orientation="left" />
                        </Col>
                      ))
                  ) : (
                    <p></p>
                  )
              )
            }
        </Row>
      )


}

export default AllCars;