import { React,  useState, useEffect } from 'react';
import CarManagerRow from './CarManagerRow';
import { Row, Col, Divider } from 'antd';
import CarInitDb from './CarInitDb'
import { Button } from 'antd/es/radio';
import { PlusCircleFilled } from '@ant-design/icons';
import NewCar from './NewCar';
import LogOut from './LogOut';
import ImgUpload from './ImgUpload'

const CarManager = () => {

  const [showComponent, setShowComponent] = useState(false);

  const photoList = CarInitDb();

  const toggleComponent = () => {
      setShowComponent(!showComponent);
  };

      return (
      <>
        <Row justify='end' align='middle'>
          <Col span={3} >
            <LogOut/>
          </Col>
          
        </Row>
        <Divider orientation="left">Add or Update a Car</Divider>
        <Row style={{marginLeft:5, marginTop:10}}>
            
            {
              Array.isArray(photoList) ?
              (
                photoList.map((photo, index) => (
                    // console.log()
                    <Col span={24} > <CarManagerRow key={index} {...photo}/> </Col>
                ))
              )
              :
              (<p></p>)
            }
            
            {/* <Divider type="vertical" style={{ background:"#000", height:300 }} /> */}
            {/* <Col className="gutter-row"><AppCard imgpath={"./assets/photo2.jpg"}/></Col> */}
        </Row>
        <Row style={{marginLeft:5  }}>
          <Col span={12}>
            <Button onClick={toggleComponent}><PlusCircleFilled /> Add Car
            {showComponent && <NewCar model_status={showComponent}/>}
            </Button>
          </Col>
        </Row>

        <Divider orientation="left">Add Slider Image</Divider>
        <ImgUpload/>
      </>
      )

}

export default CarManager;