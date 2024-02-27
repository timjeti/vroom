import React, {useEffect, useState} from 'react';
import CarManager from './CarManager';
import AdminLayout from './AdminLayout';
import { Card } from 'antd';

const CarManagerHandler = () => {

//to resize the card size based on current screen width
const [maxCardSize, setMaxCardSize] = useState('default');
const resize = () => {
  const maxSize = window.innerWidth;
  
  if(maxSize < 570){
    setMaxCardSize('small');
    console.log(maxCardSize)
  }else{
    setMaxCardSize('default');
  }
};

useEffect(() => {
  window.addEventListener("resize", resize);
  return () => window.removeEventListener("resize", resize);
});

  return (
    <AdminLayout>
      <Card size={maxCardSize}>
        <CarManager/>
      </Card>
    </AdminLayout>
    
  );
};
export default CarManagerHandler;