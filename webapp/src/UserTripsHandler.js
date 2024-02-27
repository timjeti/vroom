import React, {useState, useEffect} from 'react';
import UserTrips from './UserTrips';
import AdminLayout from './AdminLayout';
import { Card } from 'antd';


const UserTripsHandler = () => {

const [maxCardSize, setMaxCardSize] = useState('default');
const resize = () => {
  const maxSize = window.innerWidth;
  
  if(maxSize < 570){
    setMaxCardSize('small');
    console.log(maxCardSize)
  }else{
    setMaxCardSize('default');
  }
  // return maxCardSize
  
};

useEffect(() => {
  window.addEventListener("resize", resize);
  return () => window.removeEventListener("resize", resize);
});

  return (
    <AdminLayout>
      <Card size={maxCardSize}>
        <UserTrips/>
      </Card>
    </AdminLayout>
  );
};
export default UserTripsHandler;