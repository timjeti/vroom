import React, {useEffect, useState} from 'react';
import CarManager from './CarManager';
import AdminLayout from './AdminLayout';
import CarsTable from './CarsTable';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { footerCollapse } from './store';
import './CardWrapper.css'

const CarsTableHandler = () => {
  const dispatch = useDispatch();
  //to resize the card size based on current screen width
  const [maxCardSize, setMaxCardSize] = useState('default');
  const resize = () => {
  const maxSize = window.innerWidth;

  if(maxSize < 570){
    setMaxCardSize('small');
    console.log(maxCardSize)
  }else{
    setMaxCardSize('default');
    console.log(maxCardSize)
  }
  // return maxCardSize

  };

  useEffect(() => {
    // Reset the collapse state to its default when the component is unmounted
    dispatch(footerCollapse(true));
    //Cleanup code below to reset footer state
    window.addEventListener("resize", resize);
    return () => {
      dispatch(footerCollapse(false)); // Assuming false is the default value
      window.removeEventListener("resize", resize);
    };
  }, [dispatch]);

  return (
    <AdminLayout>
      <Card className='card_wrapper' size={maxCardSize}>
        <CarsTable/>
      </Card>
    </AdminLayout>
  );
};
export default CarsTableHandler;