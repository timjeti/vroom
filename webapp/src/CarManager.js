import { React,  useState, useEffect } from 'react';
import CarManagerRow from './CarManagerRow';
import { Row, Col, Divider } from 'antd';
import CarInitDb from './CarInitDb'
import { Button } from 'antd/es/radio';
import { PlusCircleFilled } from '@ant-design/icons';
import NewCar from './NewCar';
import LogOut from './LogOut';
import ImgUpload from './ImgUpload'
import { useDispatch } from 'react-redux';
import { footerCollapse } from './store';


export const logout = () => (
  
  <Row justify='start' align='end' >
    <Col>
      <LogOut/>
    </Col>
  </Row>

)

const CarManager = () => {

  const [showComponent, setShowComponent] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
      // Reset the collapse state to its default when the component is unmounted
      dispatch(footerCollapse(true));
      //Cleanup code below to reset footer state
      return () => {
        dispatch(footerCollapse(false)); // Assuming false is the default value
      };
    }, [dispatch]);

  const photoList = CarInitDb();

  const toggleComponent = () => {
      setShowComponent(!showComponent);
  };

      return (
      <>
      <div style={{marginTop:20, height:'80pc'}}>
      {logout()}
      <div style={{marginTop:20}}>
          <Divider orientation="left">Add Slider Image</Divider>
          <ImgUpload/>
        </div>
      </div>
      </>
      )

}

export default CarManager;